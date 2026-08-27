import type { SubcircuitProps } from "@tscircuit/props";
import { Fragment } from "react";
import {
  AWR1843ARBGALPQ1,
  AWR1843ARBGALPQ1_BALLS,
} from "../chips/AWR1843ARBGALPQ1.circuit.tsx";
import { CHS01TA } from "../chips/CHS01TA.circuit.tsx";
import { RadarClockSection_FW4000044Q } from "./RadarClock_FW4000044Q.circuit.tsx";

const SOURCE_X_SCALE = 0.01778;
const IO_SOURCE_Y_SCALE = 0.0254;
const POWER_SOURCE_Y_SCALE = 0.01778;
const IO_PULLUP_SOURCE_Y_SCALE = 0.035;
const IO_PULLUP_SOURCE_CENTER_Y = 375;
const NATIVE_SCHEMATIC_PIN_PITCH = 0.2;
const NATIVE_SCHEMATIC_BOX_VERTICAL_PADDING = 0.8;
export const RADAR_SOC_IO_SHEET_NAME = "aop_io";
export const RADAR_SOC_POWER_SHEET_NAME = "aop_power";
const RADAR_CLOCK_SECTION_NAME = "aop_io_40mhz_crystal";

const toSchX = (sourceX: number) => (sourceX - 850) * SOURCE_X_SCALE;

const toIoSchY = (sourceY: number) => (sourceY - 550) * IO_SOURCE_Y_SCALE;

const toPowerSchY = (sourceY: number) => (sourceY - 550) * POWER_SOURCE_Y_SCALE;

const toIoPullupSchY = (sourceY: number) =>
  toIoSchY(IO_PULLUP_SOURCE_CENTER_Y) +
  (sourceY - IO_PULLUP_SOURCE_CENTER_Y) * IO_PULLUP_SOURCE_Y_SCALE;

type AwrBall = (typeof AWR1843ARBGALPQ1_BALLS)[number]["ball"];

interface AwrPinPlacement {
  ball: AwrBall;
  sourceY: number;
}

interface AwrSchematicBoxDefinition {
  key: string;
  schematicName: string;
  sheet: "io" | "power";
  sourceCenterX: number;
  sourceCenterY: number;
  sourceWidth: number;
  sourceHeight: number;
  minimumSchematicHeight?: number;
  leftSide: readonly AwrPinPlacement[];
  rightSide: readonly AwrPinPlacement[];
}

const getAwrBallDefinition = (ball: AwrBall) => {
  const ballDefinition = AWR1843ARBGALPQ1_BALLS.find(
    (candidate) => candidate.ball === ball,
  );
  if (!ballDefinition) {
    throw new Error(`Missing AWR1843AoP ball definition for ${ball}`);
  }
  return ballDefinition;
};

const getAwrSchematicBoxPinLabels = (placements: readonly AwrPinPlacement[]) =>
  Object.fromEntries(
    placements.map(({ ball }) => {
      const ballDefinition = getAwrBallDefinition(ball);
      return [`pin${ballDefinition.pinNumber}`, [ballDefinition.signal, ball]];
    }),
  );

type AwrPinStyle = Record<
  string,
  { marginBottom?: number; marginTop?: number }
>;

const addAwrPinMargin = ({
  pinStyle,
  ball,
  marginName,
  margin,
}: {
  pinStyle: AwrPinStyle;
  ball: AwrBall;
  marginName: "marginBottom" | "marginTop";
  margin: number;
}) => {
  if (margin <= 0) return;
  const pinKey = `pin${getAwrBallDefinition(ball).pinNumber}`;
  pinStyle[pinKey] = {
    ...pinStyle[pinKey],
    [marginName]: (pinStyle[pinKey]?.[marginName] ?? 0) + margin,
  };
};

const getAwrSchematicBoxPinStyle = (box: AwrSchematicBoxDefinition) => {
  const pinStyle: AwrPinStyle = {};
  const sourceYScale =
    box.sheet === "io" ? IO_SOURCE_Y_SCALE : POWER_SOURCE_Y_SCALE;
  const sourceTop = box.sourceCenterY + box.sourceHeight / 2;
  const sourceBottom = box.sourceCenterY - box.sourceHeight / 2;

  box.leftSide.slice(0, -1).forEach((placement, index) => {
    const nextPlacement = box.leftSide[index + 1];
    if (!nextPlacement) return;
    const marginBottom =
      (placement.sourceY - nextPlacement.sourceY) * sourceYScale - 0.2;
    addAwrPinMargin({
      pinStyle,
      ball: placement.ball,
      marginName: "marginBottom",
      margin: marginBottom,
    });
  });

  const firstLeftPin = box.leftSide[0];
  const lastLeftPin = box.leftSide.at(-1);
  if (firstLeftPin && lastLeftPin) {
    addAwrPinMargin({
      pinStyle,
      ball: firstLeftPin.ball,
      marginName: "marginTop",
      margin: (sourceTop - firstLeftPin.sourceY) * sourceYScale,
    });
    addAwrPinMargin({
      pinStyle,
      ball: lastLeftPin.ball,
      marginName: "marginBottom",
      margin: (lastLeftPin.sourceY - sourceBottom) * sourceYScale,
    });
  }

  box.rightSide.slice(1).forEach((placement, index) => {
    const previousPlacement = box.rightSide[index];
    if (!previousPlacement) return;
    const marginTop =
      (previousPlacement.sourceY - placement.sourceY) * sourceYScale - 0.2;
    addAwrPinMargin({
      pinStyle,
      ball: placement.ball,
      marginName: "marginTop",
      margin: marginTop,
    });
  });

  const firstRightPin = box.rightSide[0];
  const lastRightPin = box.rightSide.at(-1);
  if (firstRightPin && lastRightPin) {
    addAwrPinMargin({
      pinStyle,
      ball: firstRightPin.ball,
      marginName: "marginTop",
      margin: (sourceTop - firstRightPin.sourceY) * sourceYScale,
    });
    addAwrPinMargin({
      pinStyle,
      ball: lastRightPin.ball,
      marginName: "marginBottom",
      margin: (lastRightPin.sourceY - sourceBottom) * sourceYScale,
    });
  }

  return pinStyle;
};

const getAwrSchematicBoxHeight = (box: AwrSchematicBoxDefinition) => {
  const sourceYScale =
    box.sheet === "io" ? IO_SOURCE_Y_SCALE : POWER_SOURCE_Y_SCALE;
  const maximumSidePinCount = Math.max(
    box.leftSide.length,
    box.rightSide.length,
  );
  const nativePinStackHeight =
    Math.max(0, maximumSidePinCount - 1) * NATIVE_SCHEMATIC_PIN_PITCH +
    NATIVE_SCHEMATIC_BOX_VERTICAL_PADDING;

  return Math.max(
    box.sourceHeight * sourceYScale,
    nativePinStackHeight,
    box.minimumSchematicHeight ?? 0,
  );
};

const AWR_SCHEMATIC_BOXES: readonly AwrSchematicBoxDefinition[] = [
  {
    key: "io-control",
    schematicName: "U2A",
    sheet: "io",
    sourceCenterX: 865,
    sourceCenterY: 755,
    sourceWidth: 170,
    sourceHeight: 290,
    minimumSchematicHeight: 9.4,
    leftSide: [
      { ball: "U11", sourceY: 880 },
      { ball: "U13", sourceY: 860 },
      { ball: "A14", sourceY: 830 },
      { ball: "U12", sourceY: 800 },
      { ball: "M3", sourceY: 790 },
      { ball: "U14", sourceY: 760 },
      { ball: "U15", sourceY: 750 },
      { ball: "V10", sourceY: 720 },
      { ball: "V13", sourceY: 700 },
      { ball: "A7", sourceY: 670 },
      { ball: "B7", sourceY: 660 },
      { ball: "U3", sourceY: 630 },
      { ball: "U4", sourceY: 620 },
    ],
    rightSide: [
      { ball: "U7", sourceY: 880 },
      { ball: "U6", sourceY: 870 },
      { ball: "V5", sourceY: 860 },
      { ball: "U5", sourceY: 850 },
      { ball: "V3", sourceY: 840 },
      { ball: "M1", sourceY: 830 },
      { ball: "L2", sourceY: 820 },
      { ball: "L1", sourceY: 810 },
      { ball: "C3", sourceY: 800 },
      { ball: "B3", sourceY: 790 },
      { ball: "C4", sourceY: 780 },
      { ball: "A3", sourceY: 770 },
      { ball: "B4", sourceY: 760 },
      { ball: "A4", sourceY: 750 },
      { ball: "C5", sourceY: 740 },
      { ball: "B5", sourceY: 730 },
      { ball: "P18", sourceY: 710 },
      { ball: "P17", sourceY: 690 },
      { ball: "R18", sourceY: 670 },
      { ball: "T18", sourceY: 650 },
      { ball: "C9", sourceY: 630 },
      { ball: "C10", sourceY: 610 },
      { ball: "M2", sourceY: 590 },
      { ball: "L3", sourceY: 570 },
      { ball: "K3", sourceY: 550 },
    ],
  },
  {
    key: "io-serial",
    schematicName: "U2B",
    sheet: "io",
    sourceCenterX: 795,
    sourceCenterY: 355,
    sourceWidth: 230,
    sourceHeight: 250,
    leftSide: [
      { ball: "U16", sourceY: 460 },
      { ball: "V16", sourceY: 450 },
      { ball: "U9", sourceY: 410 },
      { ball: "U10", sourceY: 400 },
      { ball: "T3", sourceY: 390 },
      { ball: "U8", sourceY: 380 },
      { ball: "R1", sourceY: 340 },
      { ball: "R2", sourceY: 330 },
      { ball: "T1", sourceY: 310 },
      { ball: "T2", sourceY: 300 },
      { ball: "N1", sourceY: 280 },
      { ball: "N2", sourceY: 270 },
      { ball: "P1", sourceY: 250 },
      { ball: "P2", sourceY: 240 },
    ],
    rightSide: [
      { ball: "H3", sourceY: 460 },
      { ball: "G2", sourceY: 450 },
      { ball: "J3", sourceY: 440 },
      { ball: "K2", sourceY: 430 },
      { ball: "J2", sourceY: 410 },
      { ball: "H2", sourceY: 400 },
      { ball: "D2", sourceY: 370 },
      { ball: "C2", sourceY: 360 },
      { ball: "E2", sourceY: 340 },
      { ball: "D3", sourceY: 330 },
      { ball: "B2", sourceY: 310 },
      { ball: "F2", sourceY: 280 },
      { ball: "D1", sourceY: 270 },
      { ball: "G1", sourceY: 250 },
      { ball: "G3", sourceY: 240 },
    ],
  },
  {
    key: "power",
    schematicName: "U2C",
    sheet: "power",
    sourceCenterX: 290,
    sourceCenterY: 810,
    sourceWidth: 180,
    sourceHeight: 440,
    leftSide: [
      { ball: "E1", sourceY: 1010 },
      { ball: "J1", sourceY: 1000 },
      { ball: "V4", sourceY: 990 },
      { ball: "V8", sourceY: 980 },
      { ball: "V15", sourceY: 970 },
      { ball: "V2", sourceY: 950 },
      { ball: "A16", sourceY: 930 },
      { ball: "V9", sourceY: 910 },
      { ball: "H1", sourceY: 890 },
      { ball: "V11", sourceY: 870 },
      { ball: "K1", sourceY: 860 },
      { ball: "B1", sourceY: 850 },
      { ball: "F1", sourceY: 840 },
      { ball: "U2", sourceY: 830 },
      { ball: "J16", sourceY: 800 },
      { ball: "J17", sourceY: 790 },
      { ball: "J18", sourceY: 780 },
      { ball: "H16", sourceY: 760 },
      { ball: "H17", sourceY: 750 },
      { ball: "H18", sourceY: 740 },
      { ball: "M16", sourceY: 720 },
      { ball: "M17", sourceY: 710 },
      { ball: "M18", sourceY: 700 },
      { ball: "C15", sourceY: 680 },
      { ball: "C18", sourceY: 670 },
      { ball: "A12", sourceY: 650 },
      { ball: "C11", sourceY: 640 },
      { ball: "V12", sourceY: 620 },
      { ball: "V6", sourceY: 610 },
      { ball: "A5", sourceY: 600 },
    ],
    rightSide: [
      { ball: "V14", sourceY: 1010 },
      { ball: "V7", sourceY: 1000 },
      { ball: "C1", sourceY: 990 },
      { ball: "G16", sourceY: 950 },
      { ball: "G17", sourceY: 940 },
      { ball: "G18", sourceY: 930 },
      { ball: "A10", sourceY: 890 },
      { ball: "A9", sourceY: 880 },
    ],
  },
  {
    key: "ground-left",
    schematicName: "U2D",
    sheet: "power",
    sourceCenterX: 160,
    sourceCenterY: 295,
    sourceWidth: 40,
    sourceHeight: 390,
    leftSide: [],
    rightSide: [
      { ball: "A1", sourceY: 470 },
      { ball: "A2", sourceY: 460 },
      { ball: "E3", sourceY: 450 },
      { ball: "F3", sourceY: 440 },
      { ball: "N3", sourceY: 430 },
      { ball: "P3", sourceY: 420 },
      { ball: "R3", sourceY: 410 },
      { ball: "T4", sourceY: 400 },
      { ball: "T5", sourceY: 390 },
      { ball: "T6", sourceY: 380 },
      { ball: "T7", sourceY: 370 },
      { ball: "T8", sourceY: 360 },
      { ball: "T9", sourceY: 350 },
      { ball: "T10", sourceY: 340 },
      { ball: "T11", sourceY: 330 },
      { ball: "T12", sourceY: 320 },
      { ball: "T13", sourceY: 310 },
      { ball: "T14", sourceY: 300 },
      { ball: "T15", sourceY: 290 },
      { ball: "T16", sourceY: 280 },
      { ball: "U1", sourceY: 270 },
      { ball: "V1", sourceY: 260 },
      { ball: "A6", sourceY: 250 },
      { ball: "A8", sourceY: 240 },
      { ball: "A11", sourceY: 230 },
      { ball: "A13", sourceY: 220 },
      { ball: "A15", sourceY: 210 },
      { ball: "A17", sourceY: 200 },
      { ball: "A18", sourceY: 190 },
      { ball: "B6", sourceY: 180 },
      { ball: "B8", sourceY: 170 },
      { ball: "B9", sourceY: 160 },
      { ball: "T17", sourceY: 150 },
      { ball: "U17", sourceY: 140 },
      { ball: "U18", sourceY: 130 },
      { ball: "V17", sourceY: 120 },
      { ball: "V18", sourceY: 110 },
    ],
  },
  {
    key: "ground-right",
    schematicName: "U2E",
    sheet: "power",
    sourceCenterX: 340,
    sourceCenterY: 290,
    sourceWidth: 40,
    sourceHeight: 400,
    leftSide: [],
    rightSide: [
      { ball: "B10", sourceY: 470 },
      { ball: "B11", sourceY: 460 },
      { ball: "B12", sourceY: 450 },
      { ball: "B13", sourceY: 440 },
      { ball: "B14", sourceY: 430 },
      { ball: "B15", sourceY: 420 },
      { ball: "B16", sourceY: 410 },
      { ball: "B17", sourceY: 400 },
      { ball: "B18", sourceY: 390 },
      { ball: "C6", sourceY: 380 },
      { ball: "C7", sourceY: 370 },
      { ball: "C8", sourceY: 360 },
      { ball: "C12", sourceY: 350 },
      { ball: "C13", sourceY: 340 },
      { ball: "C14", sourceY: 330 },
      { ball: "C16", sourceY: 320 },
      { ball: "C17", sourceY: 310 },
      { ball: "D16", sourceY: 300 },
      { ball: "D17", sourceY: 290 },
      { ball: "D18", sourceY: 280 },
      { ball: "E16", sourceY: 270 },
      { ball: "E17", sourceY: 260 },
      { ball: "E18", sourceY: 250 },
      { ball: "F16", sourceY: 240 },
      { ball: "F17", sourceY: 230 },
      { ball: "F18", sourceY: 220 },
      { ball: "K16", sourceY: 210 },
      { ball: "K17", sourceY: 200 },
      { ball: "K18", sourceY: 190 },
      { ball: "L16", sourceY: 180 },
      { ball: "L17", sourceY: 170 },
      { ball: "L18", sourceY: 160 },
      { ball: "N16", sourceY: 150 },
      { ball: "N17", sourceY: 140 },
      { ball: "N18", sourceY: 130 },
      { ball: "P16", sourceY: 120 },
      { ball: "R16", sourceY: 110 },
      { ball: "R17", sourceY: 100 },
    ],
  },
];

const AWR_NET_CONNECTIONS = [
  { net: "AR_1P0_RF1", balls: ["J16", "J17", "J18"] },
  { net: "AR_1P0_RF2", balls: ["G16", "G17", "G18", "H16", "H17", "H18"] },
  {
    net: "AR_1P2",
    balls: [
      "A5",
      "C1",
      "E1",
      "J1",
      "V4",
      "V6",
      "V7",
      "V8",
      "V12",
      "V14",
      "V15",
    ],
  },
  { net: "AR_1V4_APLL", balls: ["A10"] },
  { net: "AR_1V4_SYNTH", balls: ["A9"] },
  {
    net: "AR_1V8",
    balls: [
      "A12",
      "B1",
      "C11",
      "C15",
      "C18",
      "F1",
      "H1",
      "K1",
      "M16",
      "M17",
      "M18",
      "U2",
      "V11",
    ],
  },
  { net: "AR_BSS_LOGGER", balls: ["D3"] },
  { net: "AR_CS1", balls: ["C2"] },
  { net: "AR_DMM_CLK", balls: ["U3"] },
  { net: "AR_DMM_SYNC", balls: ["U4"] },
  { net: "AR_DP0", balls: ["U7"] },
  { net: "AR_DP1", balls: ["U6"] },
  { net: "AR_DP2", balls: ["V5"] },
  { net: "AR_DP3", balls: ["U5"] },
  { net: "AR_DP4", balls: ["V3"] },
  { net: "AR_DP5", balls: ["M1"] },
  { net: "AR_DP6", balls: ["L2"] },
  { net: "AR_DP7", balls: ["L1"] },
  { net: "AR_GPIO_0", balls: ["M2"] },
  { net: "AR_GPIO_1", balls: ["L3"] },
  { net: "AR_GPIO_2", balls: ["K3"] },
  { net: "AR_HOSTINTR1", balls: ["B2"] },
  { net: "AR_LVDS_0_N", balls: ["N1"] },
  { net: "AR_LVDS_0_P", balls: ["N2"] },
  { net: "AR_LVDS_1_N", balls: ["P1"] },
  { net: "AR_LVDS_1_P", balls: ["P2"] },
  { net: "AR_LVDS_CLK_N", balls: ["R2"] },
  { net: "AR_LVDS_CLK_P", balls: ["R1"] },
  { net: "AR_LVDS_FRCLK_N", balls: ["T2"] },
  { net: "AR_LVDS_FRCLK_P", balls: ["T1"] },
  { net: "AR_MCUCLKOUT", balls: ["V13"] },
  { net: "AR_MISO1", balls: ["D1"] },
  { net: "AR_MOSI1", balls: ["F2"] },
  { net: "AR_MSS_LOGGER", balls: ["E2"] },
  { net: "AR_NERR_OUT", balls: ["U15"] },
  { net: "AR_NERRIN", balls: ["U14"] },
  { net: "AR_NRST", balls: ["U11"] },
  { net: "AR_OSC_CLKOUT", balls: ["A14"] },
  { net: "AR_PMIC_CLKOUT_SOP2", balls: ["V10"] },
  { net: "AR_QSPI_CLK", balls: ["H2"] },
  { net: "AR_QSPI_CS", balls: ["J2"] },
  { net: "AR_QSPI_D0", balls: ["H3"] },
  { net: "AR_QSPI_D1", balls: ["G2"] },
  { net: "AR_QSPI_D2", balls: ["J3"] },
  { net: "AR_QSPI_D3", balls: ["K2"] },
  { net: "AR_RS232RX", balls: ["V16"] },
  { net: "AR_RS232TX", balls: ["U16"] },
  { net: "AR_SCL", balls: ["G3"] },
  { net: "AR_SDA", balls: ["G1"] },
  { net: "AR_SPICLK1", balls: ["D2"] },
  { net: "AR_SYNC_IN", balls: ["U12"] },
  { net: "AR_SYNC_OUT_SOP1", balls: ["M3"] },
  { net: "AR_TCK", balls: ["T3"] },
  { net: "AR_TDI", balls: ["U9"] },
  { net: "AR_TDO_SOP0", balls: ["U10"] },
  { net: "AR_TMS", balls: ["U8"] },
  { net: "AR_VBGAP", balls: ["A16"] },
  { net: "AR_VPP", balls: ["V2"] },
  { net: "AR_WARMRST", balls: ["U13"] },
  { net: "AR_XTAL_N", balls: ["B7"] },
  { net: "AR_XTAL_P", balls: ["A7"] },
  {
    net: "GND",
    balls: [
      "A1",
      "A2",
      "A6",
      "A8",
      "A11",
      "A13",
      "A15",
      "A17",
      "A18",
      "B6",
      "B8",
      "B9",
      "B10",
      "B11",
      "B12",
      "B13",
      "B14",
      "B15",
      "B16",
      "B17",
      "B18",
      "C6",
      "C7",
      "C8",
      "C12",
      "C13",
      "C14",
      "C16",
      "C17",
      "D16",
      "D17",
      "D18",
      "E3",
      "E16",
      "E17",
      "E18",
      "F3",
      "F16",
      "F17",
      "F18",
      "K16",
      "K17",
      "K18",
      "L16",
      "L17",
      "L18",
      "N3",
      "N16",
      "N17",
      "N18",
      "P3",
      "P16",
      "R3",
      "R16",
      "R17",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
      "T13",
      "T14",
      "T15",
      "T16",
      "T17",
      "U1",
      "U17",
      "U18",
      "V1",
      "V17",
      "V18",
    ],
  },
  { net: "PMIC_3V3", balls: ["V9"] },
] as const;

const AWR_GPADC_TEST_CONNECTIONS = [
  { net: "AR_GPADC_1", ball: "P18", testpoint: "TP9" },
  { net: "AR_GPADC_2", ball: "P17", testpoint: "TP8" },
  { net: "AR_GPADC_3", ball: "R18", testpoint: "TP7" },
  { net: "AR_GPADC_4", ball: "T18", testpoint: "TP6" },
  { net: "AR_GPADC_5", ball: "C9", testpoint: "TP3" },
  { net: "AR_GPADC_6", ball: "C10", testpoint: "TP2" },
] as const;

export const RADAR_SOC_INTERFACE_NETS = [
  ...AWR_NET_CONNECTIONS.map(({ net }) => net),
  ...AWR_GPADC_TEST_CONNECTIONS.map(({ net }) => net),
  "PMIC_CLK",
  "SOP0",
  "SOP1",
];

export const RADAR_SOC_INTERFACE_ENDPOINTS: Record<string, string> = {
  ...Object.fromEntries(
    AWR_NET_CONNECTIONS.map(({ net, balls }) => [
      net,
      `.aop_io_sheet_content > .U2 > .${balls[0]}`,
    ]),
  ),
  ...Object.fromEntries(
    AWR_GPADC_TEST_CONNECTIONS.map(({ net, ball }) => [
      net,
      `.aop_io_sheet_content > .U2 > .${ball}`,
    ]),
  ),
  PMIC_CLK: ".aop_io_sheet_content > .R103 > .pin2",
  SOP0: ".aop_io_sheet_content > .R159 > .pin2",
  SOP1: ".aop_io_sheet_content > .R171 > .pin2",
};

const IO_RESISTORS = [
  {
    name: "R85",
    resistance: "10k",
    sourceX: 1390,
    sourceY: 740,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R84",
    resistance: "10k",
    sourceX: 1390,
    sourceY: 550,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R59",
    resistance: "10k",
    sourceX: 120,
    sourceY: 480,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R23",
    resistance: "10k",
    sourceX: 120,
    sourceY: 460,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R22",
    resistance: "10k",
    sourceX: 120,
    sourceY: 440,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R3",
    resistance: "10k",
    sourceX: 120,
    sourceY: 270,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R8",
    resistance: "10k",
    sourceX: 120,
    sourceY: 380,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R7",
    resistance: "10k",
    sourceX: 120,
    sourceY: 360,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R21",
    resistance: "10k",
    sourceX: 120,
    sourceY: 420,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R4",
    resistance: "100k",
    sourceX: 120,
    sourceY: 320,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R75",
    resistance: "1k",
    sourceX: 120,
    sourceY: 300,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R103",
    resistance: "0",
    sourceX: 1340,
    sourceY: 780,
    rotation: 90,
    doNotPlace: true,
  },
  {
    name: "R9",
    resistance: "100k",
    sourceX: 120,
    sourceY: 400,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R5",
    resistance: "100k",
    sourceX: 120,
    sourceY: 340,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R83",
    resistance: "10k",
    sourceX: 1390,
    sourceY: 360,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R2",
    resistance: "0",
    sourceX: 1600,
    sourceY: 360,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R176",
    resistance: "7.87k",
    sourceX: 1530,
    sourceY: 740,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R172",
    resistance: "82.5k",
    sourceX: 1480,
    sourceY: 700,
    rotation: 90,
    doNotPlace: false,
  },
  {
    name: "R171",
    resistance: "750",
    sourceX: 1480,
    sourceY: 590,
    rotation: 90,
    doNotPlace: false,
  },
  {
    name: "R170",
    resistance: "82.5k",
    sourceX: 1480,
    sourceY: 510,
    rotation: 90,
    doNotPlace: false,
  },
  {
    name: "R174",
    resistance: "7.87k",
    sourceX: 1520,
    sourceY: 360,
    rotation: 180,
    doNotPlace: false,
  },
  {
    name: "R159",
    resistance: "750",
    sourceX: 1480,
    sourceY: 400,
    rotation: 90,
    doNotPlace: false,
  },
  {
    name: "R158",
    resistance: "82.5k",
    sourceX: 1480,
    sourceY: 320,
    rotation: 90,
    doNotPlace: false,
  },
] as const;

const IO_TESTPOINTS = [
  { name: "TP14", sourceX: 320, sourceY: 480 },
  { name: "TP9", sourceX: 1100, sourceY: 740 },
  { name: "TP8", sourceX: 1100, sourceY: 720 },
  { name: "TP7", sourceX: 1100, sourceY: 700 },
  { name: "TP6", sourceX: 1100, sourceY: 680 },
  { name: "TP3", sourceX: 1100, sourceY: 660 },
  { name: "TP2", sourceX: 1100, sourceY: 640 },
  { name: "TP17", sourceX: 530, sourceY: 810 },
] as const;

const POWER_CAPACITORS = [
  {
    name: "C68",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1400,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C67",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1350,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C66",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1300,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C56",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 680,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C57",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 730,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C58",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 790,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C60",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 930,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C61",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 980,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C63",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1100,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C64",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1140,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C80",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 650,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF1",
  },
  {
    name: "C81",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 700,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF1",
  },
  {
    name: "C84",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 900,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF2",
  },
  {
    name: "C85",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 950,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF2",
  },
  {
    name: "C87",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1110,
    sourceY: 475,
    rotation: 270,
    supply: "PMIC_3V3",
  },
  {
    name: "C88",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1170,
    sourceY: 475,
    rotation: 270,
    supply: "PMIC_3V3",
  },
  {
    name: "C94",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 910,
    sourceY: 235,
    rotation: 270,
    supply: "AR_1P2",
  },
  {
    name: "C95",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 970,
    sourceY: 235,
    rotation: 270,
    supply: "AR_1P2",
  },
  {
    name: "C96",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1020,
    sourceY: 235,
    rotation: 270,
    supply: "AR_1P2",
  },
  {
    name: "C97",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1070,
    sourceY: 235,
    rotation: 270,
    supply: "AR_1P2",
  },
  {
    name: "C98",
    capacitance: "0.22uF",
    footprint: "0402",
    sourceX: 1120,
    sourceY: 235,
    rotation: 270,
    supply: "AR_1P2",
  },
  {
    name: "C70",
    capacitance: "10uF",
    footprint: "0805",
    sourceX: 1420,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF2",
  },
  {
    name: "C65",
    capacitance: "10uF",
    footprint: "0805",
    sourceX: 1250,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C62",
    capacitance: "10uF",
    footprint: "0805",
    sourceX: 1050,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C59",
    capacitance: "10uF",
    footprint: "0805",
    sourceX: 880,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C55",
    capacitance: "10uF",
    footprint: "0805",
    sourceX: 630,
    sourceY: 725,
    rotation: 270,
    supply: "AR_1V8",
  },
  {
    name: "C78",
    capacitance: "10uF",
    footprint: "0805",
    sourceX: 540,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF1",
  },
  {
    name: "C82",
    capacitance: "10uF",
    footprint: "0805",
    sourceX: 790,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF2",
  },
  {
    name: "C91",
    capacitance: "0.1uF",
    footprint: "0402",
    sourceX: 690,
    sourceY: 235,
    rotation: 270,
    supply: "AR_1P2",
  },
  {
    name: "C92",
    capacitance: "0.1uF",
    footprint: "0402",
    sourceX: 760,
    sourceY: 235,
    rotation: 270,
    supply: "AR_1P2",
  },
  {
    name: "C102",
    capacitance: "2.2uF",
    footprint: "0603",
    sourceX: 1050,
    sourceY: 475,
    rotation: 270,
    supply: "PMIC_3V3",
  },
  {
    name: "C103",
    capacitance: "2.2uF",
    footprint: "0603",
    sourceX: 850,
    sourceY: 235,
    rotation: 270,
    supply: "AR_1P2",
  },
  {
    name: "C89",
    capacitance: "1uF",
    footprint: "0603",
    sourceX: 1330,
    sourceY: 245,
    rotation: 270,
    supply: "AR_1V4_SYNTH",
  },
  {
    name: "C90",
    capacitance: "1uF",
    footprint: "0603",
    sourceX: 1460,
    sourceY: 245,
    rotation: 270,
    supply: "AR_1V4_APLL",
  },
  {
    name: "C79",
    capacitance: "2.2uF",
    footprint: "0603",
    sourceX: 600,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF1",
  },
  {
    name: "C83",
    capacitance: "2.2uF",
    footprint: "0603",
    sourceX: 850,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF2",
  },
  {
    name: "C74",
    capacitance: "2.2uF",
    footprint: "0603",
    sourceX: 1470,
    sourceY: 475,
    rotation: 270,
    supply: "AR_1P0_RF2",
  },
  {
    name: "C69",
    capacitance: "0.047uF",
    footprint: "0402",
    sourceX: 1290,
    sourceY: 475,
    rotation: 270,
    supply: "AR_VBGAP",
  },
] as const;

const getAwrBallSheet = (ball: AwrBall) => {
  const box = AWR_SCHEMATIC_BOXES.find(({ leftSide, rightSide }) =>
    [...leftSide, ...rightSide].some((placement) => placement.ball === ball),
  );
  if (!box) {
    throw new Error(`Missing AWR1843AoP schematic unit for ${ball}`);
  }
  return box.sheet;
};

const renderAwrSchematicBoxes = (sheet: "io" | "power") =>
  AWR_SCHEMATIC_BOXES.filter((box) => box.sheet === sheet).map((box) => {
    const placements = [...box.leftSide, ...box.rightSide];
    const toSheetSchY = box.sheet === "io" ? toIoSchY : toPowerSchY;
    return (
      <Fragment key={box.key}>
        <schematicbox
          name={box.schematicName}
          chipRef=".U2"
          pinLabels={getAwrSchematicBoxPinLabels(placements)}
          schPinArrangement={{
            leftSide: box.leftSide.map(
              ({ ball }) => getAwrBallDefinition(ball).pinNumber,
            ),
            rightSide: box.rightSide.map(
              ({ ball }) => getAwrBallDefinition(ball).pinNumber,
            ),
          }}
          schPinStyle={getAwrSchematicBoxPinStyle(box)}
          schX={toSchX(box.sourceCenterX)}
          schY={toSheetSchY(box.sourceCenterY)}
          width={box.sourceWidth * SOURCE_X_SCALE}
          height={getAwrSchematicBoxHeight(box)}
        />
      </Fragment>
    );
  });

const renderAwrNetConnections = (sheet: "io" | "power") =>
  AWR_NET_CONNECTIONS.map((connection) => (
    <Fragment key={`${sheet}-${connection.net}`}>
      {connection.balls
        .filter((ball) => getAwrBallSheet(ball) === sheet)
        .map((ball) => (
          <Fragment key={`${connection.net}-${ball}`}>
            <trace
              name={`U2_${connection.net}_${ball}`}
              from={`.U2 > .${ball}`}
              to={`net.${connection.net}`}
            />
          </Fragment>
        ))}
    </Fragment>
  ));

/**
 * TIDEP-01024 AWR1843AoP I/O and AOP power sheets.
 *
 * One U2 component renders all five Altium units so the 180-ball package is
 * electrically and physically represented only once.
 *
 * Coordinate transform on each native schematic sheet:
 *   schX = (AltiumX - 850) * 0.01778
 *   schY = (AltiumY - 550) * 0.0254 on AOP_IO
 *   schY = (AltiumY - 550) * 0.01778 on AOP_PWR
 * AOP_IO and AOP_PWR retain their original independent coordinate systems.
 * The native sheet is A4 while TI's source sheet is ANSI B. X is scaled to fit
 * the wider source inside A4. AOP_IO keeps full mil-to-mm Y spacing. AOP_PWR
 * uses the same A4 fit as X because its functional boxes are taller.
 * The left AOP_IO resistor bank stays anchored at source Y=375 and uses a
 * 0.035 Y scale so adjacent native resistor reference/value bounds do not
 * overlap; component ordering and all source X coordinates remain unchanged.
 */
export const RadarSoc_AWR1843ARBGALPQ1 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <schematicsheet
      name={RADAR_SOC_IO_SHEET_NAME}
      displayName="AWR1843AoP I/O"
      sheetIndex={0}
    />
    <schematicsheet
      name={RADAR_SOC_POWER_SHEET_NAME}
      displayName="AWR1843AoP Power"
      sheetIndex={1}
    />

    <group
      name="aop_io_sheet_content"
      schSheetName={RADAR_SOC_IO_SHEET_NAME}
      schX={0}
      schY={0}
    >
      <schematicsection name={RADAR_CLOCK_SECTION_NAME} />
      <schematictext
        text="AOP IO"
        schX={0}
        schY={12.2}
        fontSize={0.6}
        anchor="center"
      />

      <group name="radar_clock" schX={-10.2235} schY={8.128}>
        <RadarClockSection_FW4000044Q
          schSectionName={RADAR_CLOCK_SECTION_NAME}
          showTitle
        />
      </group>

      <AWR1843ARBGALPQ1
        name="U2"
        noSchematicRepresentation
        noConnect={["A3", "A4", "B3", "B4", "B5", "C3", "C4", "C5"]}
      />

      {renderAwrSchematicBoxes("io")}
      {renderAwrNetConnections("io")}

      {IO_RESISTORS.map((resistor) => (
        <resistor
          key={resistor.name}
          name={resistor.name}
          resistance={resistor.resistance}
          footprint="0201"
          schX={toSchX(resistor.sourceX)}
          schY={
            resistor.sourceX === 120
              ? toIoPullupSchY(resistor.sourceY)
              : toIoSchY(resistor.sourceY)
          }
          schRotation={resistor.rotation}
          doNotPlace={resistor.doNotPlace}
        />
      ))}
      <capacitor
        name="C130"
        capacitance="0.1uF"
        footprint="0402"
        schX={toSchX(270)}
        schY={toIoPullupSchY(455)}
        schRotation={270}
      />
      <CHS01TA name="S3" schX={toSchX(1600)} schY={toIoSchY(740)} />

      {IO_TESTPOINTS.map((testpoint) => (
        <testpoint
          key={testpoint.name}
          name={testpoint.name}
          footprintVariant="pad"
          padShape="circle"
          width="1mm"
          height="1mm"
          schX={toSchX(testpoint.sourceX)}
          schY={
            testpoint.name === "TP14"
              ? toIoPullupSchY(testpoint.sourceY)
              : toIoSchY(testpoint.sourceY)
          }
        />
      ))}

      {[
        ".R59 > .pin2",
        ".R23 > .pin2",
        ".R22 > .pin2",
        ".R21 > .pin2",
        ".R9 > .pin1",
        ".R8 > .pin2",
        ".R7 > .pin2",
        ".R5 > .pin1",
        ".R4 > .pin1",
        ".R75 > .pin1",
      ].map((port, index, railPorts) =>
        index === railPorts.length - 1 ? null : (
          <Fragment key={`io-pullup-${index}`}>
            <trace from={port} to={railPorts[index + 1]} />
          </Fragment>
        ),
      )}
      <netlabel
        net="PMIC_3V3"
        schX={toSchX(70)}
        schY={toIoPullupSchY(490)}
        anchorSide="bottom"
        connectsTo=".R59 > .pin2"
      />
      <trace name="NRST_R59_C130" from=".R59 > .pin1" to=".C130 > .pin2" />
      <trace name="NRST_C130_TP14" from=".C130 > .pin2" to=".TP14 > .pin1" />
      <trace name="NRST_INTERFACE" from=".TP14 > .pin1" to="net.AR_NRST" />
      <trace name="WARMRST_PULLUP" from=".R23 > .pin1" to="net.AR_WARMRST" />
      <trace name="NERRIN_PULLUP" from=".R22 > .pin1" to="net.AR_NERRIN" />
      <trace name="NERROUT_PULLUP" from=".R21 > .pin1" to="net.AR_NERR_OUT" />
      <trace name="CS1_PULLUP" from=".R9 > .pin2" to="net.AR_CS1" />
      <trace name="SCL_PULLUP" from=".R8 > .pin1" to="net.AR_SCL" />
      <trace name="SDA_PULLUP" from=".R7 > .pin1" to="net.AR_SDA" />
      <trace name="RS232RX_PULLUP" from=".R5 > .pin2" to="net.AR_RS232RX" />
      <trace name="RS232TX_PULLUP" from=".R4 > .pin2" to="net.AR_RS232TX" />
      <trace name="SPICLK1_PULLUP" from=".R75 > .pin2" to="net.AR_SPICLK1" />
      <trace
        name="HOSTINTR1_PULLDOWN"
        from=".R3 > .pin1"
        to="net.AR_HOSTINTR1"
      />
      <netlabel
        net="GND"
        schX={toSchX(70)}
        schY={toIoPullupSchY(260)}
        anchorSide="top"
        connectsTo=".R3 > .pin2"
      />
      <netlabel
        net="GND"
        schX={toSchX(270)}
        schY={toIoPullupSchY(430)}
        anchorSide="top"
        connectsTo=".C130 > .pin1"
      />
      <netlabel
        net="GND"
        schX={toSchX(1480)}
        schY={toIoSchY(670)}
        anchorSide="top"
        connectsTo=".R172 > .pin1"
      />
      <netlabel
        net="GND"
        schX={toSchX(1480)}
        schY={toIoSchY(480)}
        anchorSide="top"
        connectsTo=".R170 > .pin1"
      />
      <netlabel
        net="GND"
        schX={toSchX(1480)}
        schY={toIoSchY(290)}
        anchorSide="top"
        connectsTo=".R158 > .pin1"
      />

      {AWR_GPADC_TEST_CONNECTIONS.map(({ ball, testpoint }) => (
        <Fragment key={`${ball}-${testpoint}`}>
          <trace from={`.${testpoint} > .pin1`} to={`.U2 > .${ball}`} />
        </Fragment>
      ))}
      <trace
        name="OSC_CLKOUT_TEST"
        from=".TP17 > .pin1"
        to="net.AR_OSC_CLKOUT"
      />

      <trace from=".R103 > .pin1" to=".R85 > .pin1" />
      <netlabel
        net="AR_PMIC_CLKOUT_SOP2"
        schX={toSchX(1220)}
        schY={toIoSchY(740)}
        anchorSide="right"
        connectsTo=".R85 > .pin1"
      />
      <netlabel
        net="PMIC_CLK"
        schX={toSchX(1200)}
        schY={toIoSchY(830)}
        anchorSide="right"
        connectsTo=".R103 > .pin2"
      />
      <trace from=".R85 > .pin2" to=".R176 > .pin2" />
      <trace from=".R176 > .pin2" to=".R172 > .pin2" />
      <trace from=".R176 > .pin1" to=".S3 > .pin1" />
      <netlabel
        net="PMIC_3V3"
        schX={toSchX(1640)}
        schY={toIoSchY(780)}
        anchorSide="bottom"
        connectsTo=".S3 > .pin2"
      />

      <netlabel
        net="AR_SYNC_OUT_SOP1"
        schX={toSchX(1220)}
        schY={toIoSchY(550)}
        anchorSide="right"
        connectsTo=".R84 > .pin1"
      />
      <trace from=".R84 > .pin2" to=".R171 > .pin1" />
      <trace from=".R171 > .pin1" to=".R170 > .pin2" />
      <netlabel
        net="SOP1"
        schX={toSchX(1370)}
        schY={toIoSchY(630)}
        anchorSide="right"
        connectsTo=".R171 > .pin2"
      />

      <netlabel
        net="AR_TDO_SOP0"
        schX={toSchX(1220)}
        schY={toIoSchY(360)}
        anchorSide="right"
        connectsTo=".R83 > .pin1"
      />
      <trace from=".R83 > .pin2" to=".R174 > .pin2" />
      <trace from=".R174 > .pin2" to=".R159 > .pin1" />
      <trace from=".R159 > .pin1" to=".R158 > .pin2" />
      <netlabel
        net="SOP0"
        schX={toSchX(1370)}
        schY={toIoSchY(440)}
        anchorSide="right"
        connectsTo=".R159 > .pin2"
      />
      <trace from=".R174 > .pin1" to=".R2 > .pin1" />
      <netlabel
        net="PMIC_3V3"
        schX={toSchX(1640)}
        schY={toIoSchY(380)}
        anchorSide="bottom"
        connectsTo=".R2 > .pin2"
      />
    </group>

    <group
      name="aop_power_sheet_content"
      schSheetName={RADAR_SOC_POWER_SHEET_NAME}
      schX={0}
      schY={0}
    >
      <schematictext
        text="AOP POWER"
        schX={0}
        schY={12.2}
        fontSize={0.6}
        anchor="center"
      />
      <schematictext
        text="DECOUPLING CAPS"
        schX={5}
        schY={9.7}
        fontSize={0.46}
        anchor="center"
      />

      {renderAwrSchematicBoxes("power")}
      {renderAwrNetConnections("power")}

      {POWER_CAPACITORS.map((capacitor) => (
        <Fragment key={capacitor.name}>
          <capacitor
            name={capacitor.name}
            capacitance={capacitor.capacitance}
            footprint={capacitor.footprint}
            schX={toSchX(capacitor.sourceX)}
            schY={toPowerSchY(capacitor.sourceY)}
            schRotation={capacitor.rotation}
          />
          <trace
            name={`${capacitor.name}_SUPPLY`}
            from={`.${capacitor.name} > .${
              capacitor.name === "C91" || capacitor.name === "C92"
                ? "pin2"
                : "pin1"
            }`}
            to={`net.${capacitor.supply}`}
          />
          <trace
            name={`${capacitor.name}_GND`}
            from={`.${capacitor.name} > .${
              capacitor.name === "C91" || capacitor.name === "C92"
                ? "pin1"
                : "pin2"
            }`}
            to="net.GND"
          />
        </Fragment>
      ))}
    </group>
  </subcircuit>
);

export default RadarSoc_AWR1843ARBGALPQ1;
