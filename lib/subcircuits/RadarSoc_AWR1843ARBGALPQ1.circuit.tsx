import type { SubcircuitProps } from "@tscircuit/props";
import { Fragment } from "react";
import { AWR1843ARBGALPQ1 } from "../chips/AWR1843ARBGALPQ1.circuit.tsx";
import { CHS01TA } from "../chips/CHS01TA.circuit.tsx";

const SOURCE_SCALE = 0.0254;
const POWER_SHEET_OFFSET_X = 45;

const toSchX = (sourceX: number, sheet: "io" | "power") =>
  (sourceX - 850) * SOURCE_SCALE +
  (sheet === "power" ? POWER_SHEET_OFFSET_X : 0);

const toSchY = (sourceY: number) => (sourceY - 550) * SOURCE_SCALE;

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
  { net: "AR_GPADC_1", balls: ["P18"] },
  { net: "AR_GPADC_2", balls: ["P17"] },
  { net: "AR_GPADC_3", balls: ["R18"] },
  { net: "AR_GPADC_4", balls: ["T18"] },
  { net: "AR_GPADC_5", balls: ["C9"] },
  { net: "AR_GPADC_6", balls: ["C10"] },
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

export const RADAR_SOC_INTERFACE_NETS = [
  ...AWR_NET_CONNECTIONS.map(({ net }) => net),
  "PMIC_CLK",
  "SOP0",
  "SOP1",
];

const IO_PORT_LABELS = [
  { net: "PMIC_CLK", sourceX: 1200, sourceY: 830 },
  { net: "SOP1", sourceX: 1370, sourceY: 630 },
  { net: "SOP0", sourceX: 1370, sourceY: 440 },
  { net: "AR_SCL", sourceX: 1030, sourceY: 240 },
  { net: "AR_MISO1", sourceX: 1030, sourceY: 270 },
  { net: "AR_MOSI1", sourceX: 1030, sourceY: 280 },
  { net: "AR_SDA", sourceX: 1030, sourceY: 250 },
  { net: "AR_QSPI_D0", sourceX: 1030, sourceY: 460 },
  { net: "AR_QSPI_D1", sourceX: 1030, sourceY: 450 },
  { net: "AR_QSPI_D2", sourceX: 1030, sourceY: 440 },
  { net: "AR_QSPI_D3", sourceX: 1030, sourceY: 430 },
  { net: "AR_RS232TX", sourceX: 470, sourceY: 460 },
  { net: "AR_RS232RX", sourceX: 470, sourceY: 450 },
  { net: "AR_TDO_SOP0", sourceX: 460, sourceY: 400 },
  { net: "AR_TCK", sourceX: 490, sourceY: 390 },
  { net: "AR_TMS", sourceX: 490, sourceY: 380 },
  { net: "AR_TDI", sourceX: 490, sourceY: 410 },
  { net: "AR_LVDS_CLK_N", sourceX: 450, sourceY: 330 },
  { net: "AR_LVDS_CLK_P", sourceX: 450, sourceY: 340 },
  { net: "AR_LVDS_FRCLK_N", sourceX: 440, sourceY: 300 },
  { net: "AR_LVDS_FRCLK_P", sourceX: 440, sourceY: 310 },
  { net: "AR_CS1", sourceX: 1030, sourceY: 360 },
  { net: "AR_BSS_LOGGER", sourceX: 1030, sourceY: 330 },
  { net: "AR_HOSTINTR1", sourceX: 1030, sourceY: 310 },
  { net: "AR_SPICLK1", sourceX: 1030, sourceY: 370 },
  { net: "AR_MSS_LOGGER", sourceX: 1030, sourceY: 340 },
  { net: "AR_QSPI_CLK", sourceX: 1030, sourceY: 400 },
  { net: "AR_QSPI_CS", sourceX: 1030, sourceY: 410 },
  { net: "AR_DP0", sourceX: 1070, sourceY: 880 },
  { net: "AR_DP1", sourceX: 1070, sourceY: 870 },
  { net: "AR_DP2", sourceX: 1070, sourceY: 860 },
  { net: "AR_DP3", sourceX: 1070, sourceY: 850 },
  { net: "AR_DP4", sourceX: 1070, sourceY: 840 },
  { net: "AR_DP5", sourceX: 1070, sourceY: 830 },
  { net: "AR_DP6", sourceX: 1070, sourceY: 820 },
  { net: "AR_DP7", sourceX: 1070, sourceY: 810 },
  { net: "AR_GPIO_0", sourceX: 1020, sourceY: 640 },
  { net: "AR_GPIO_1", sourceX: 1020, sourceY: 630 },
  { net: "AR_GPIO_2", sourceX: 1020, sourceY: 620 },
  { net: "AR_DMM_SYNC", sourceX: 550, sourceY: 620 },
  { net: "AR_DMM_CLK", sourceX: 550, sourceY: 630 },
  { net: "AR_SYNC_IN", sourceX: 560, sourceY: 800 },
  { net: "AR_SYNC_OUT_SOP1", sourceX: 520, sourceY: 790 },
  { net: "AR_PMIC_CLKOUT_SOP2", sourceX: 510, sourceY: 720 },
  { net: "AR_MCUCLKOUT", sourceX: 550, sourceY: 700 },
  { net: "AR_NERRIN", sourceX: 570, sourceY: 760 },
  { net: "AR_NERR_OUT", sourceX: 550, sourceY: 750 },
  { net: "AR_NRST", sourceX: 570, sourceY: 880 },
  { net: "AR_WARMRST", sourceX: 550, sourceY: 860 },
  { net: "AR_OSC_CLKOUT", sourceX: 430, sourceY: 830 },
  { net: "AR_LVDS_0_N", sourceX: 460, sourceY: 280 },
  { net: "AR_LVDS_0_P", sourceX: 460, sourceY: 270 },
  { net: "AR_LVDS_1_P", sourceX: 460, sourceY: 240 },
  { net: "AR_LVDS_1_N", sourceX: 460, sourceY: 250 },
] as const;

const POWER_PORT_LABELS = [
  { net: "GND", sourceX: 630, sourceY: 690 },
  { net: "GND", sourceX: 880, sourceY: 690 },
  { net: "GND", sourceX: 1050, sourceY: 690 },
  { net: "GND", sourceX: 1250, sourceY: 690 },
  { net: "GND", sourceX: 1290, sourceY: 440 },
  { net: "GND", sourceX: 1420, sourceY: 440 },
  { net: "GND", sourceX: 540, sourceY: 440 },
  { net: "GND", sourceX: 790, sourceY: 440 },
  { net: "GND", sourceX: 1050, sourceY: 440 },
  { net: "GND", sourceX: 1330, sourceY: 210 },
  { net: "GND", sourceX: 1460, sourceY: 210 },
  { net: "GND", sourceX: 850, sourceY: 200 },
  { net: "GND", sourceX: 760, sourceY: 200 },
  { net: "GND", sourceX: 690, sourceY: 200 },
  { net: "PMIC_3V3", sourceX: 1050, sourceY: 530 },
  { net: "AR_1V8", sourceX: 630, sourceY: 770 },
  { net: "AR_1V8", sourceX: 880, sourceY: 780 },
  { net: "AR_1V8", sourceX: 1050, sourceY: 780 },
  { net: "AR_VBGAP", sourceX: 1290, sourceY: 530 },
  { net: "AR_1P0_RF2", sourceX: 1420, sourceY: 530 },
  { net: "AR_1P0_RF1", sourceX: 540, sourceY: 530 },
  { net: "AR_1P0_RF2", sourceX: 790, sourceY: 530 },
  { net: "AR_1V4_SYNTH", sourceX: 1330, sourceY: 300 },
  { net: "AR_1V4_APLL", sourceX: 1460, sourceY: 300 },
  { net: "AR_1P2", sourceX: 690, sourceY: 310 },
  { net: "GND", sourceX: 400, sourceY: 90 },
  { net: "GND", sourceX: 220, sourceY: 100 },
  { net: "AR_1V8", sourceX: 140, sourceY: 720 },
  { net: "AR_1V8", sourceX: 140, sourceY: 650 },
  { net: "AR_1V8", sourceX: 140, sourceY: 680 },
  { net: "AR_1P0_RF1", sourceX: 140, sourceY: 800 },
  { net: "AR_1P0_RF2", sourceX: 140, sourceY: 760 },
  { net: "AR_1P0_RF2", sourceX: 440, sourceY: 950 },
  { net: "AR_1V4_APLL", sourceX: 420, sourceY: 900 },
  { net: "AR_1V4_SYNTH", sourceX: 470, sourceY: 880 },
  { net: "AR_1P2", sourceX: 120, sourceY: 620 },
  { net: "AR_1V8", sourceX: 140, sourceY: 870 },
  { net: "AR_1P2", sourceX: 440, sourceY: 1010 },
  { net: "AR_1P2", sourceX: 140, sourceY: 1010 },
  { net: "PMIC_3V3", sourceX: 140, sourceY: 910 },
  { net: "AR_VBGAP", sourceX: 90, sourceY: 930 },
  { net: "AR_1V8", sourceX: 1250, sourceY: 780 },
] as const;

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
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R23",
    resistance: "10k",
    sourceX: 120,
    sourceY: 460,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R22",
    resistance: "10k",
    sourceX: 120,
    sourceY: 440,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R3",
    resistance: "10k",
    sourceX: 120,
    sourceY: 270,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R8",
    resistance: "10k",
    sourceX: 120,
    sourceY: 380,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R7",
    resistance: "10k",
    sourceX: 120,
    sourceY: 360,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R21",
    resistance: "10k",
    sourceX: 120,
    sourceY: 420,
    rotation: 0,
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
    rotation: 270,
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
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R172",
    resistance: "82.5k",
    sourceX: 1480,
    sourceY: 700,
    rotation: 270,
    doNotPlace: false,
  },
  {
    name: "R171",
    resistance: "750",
    sourceX: 1480,
    sourceY: 590,
    rotation: 270,
    doNotPlace: false,
  },
  {
    name: "R170",
    resistance: "82.5k",
    sourceX: 1480,
    sourceY: 510,
    rotation: 270,
    doNotPlace: false,
  },
  {
    name: "R174",
    resistance: "7.87k",
    sourceX: 1520,
    sourceY: 360,
    rotation: 0,
    doNotPlace: false,
  },
  {
    name: "R159",
    resistance: "750",
    sourceX: 1480,
    sourceY: 400,
    rotation: 270,
    doNotPlace: false,
  },
  {
    name: "R158",
    resistance: "82.5k",
    sourceX: 1480,
    sourceY: 320,
    rotation: 270,
    doNotPlace: false,
  },
] as const;

const IO_TESTPOINTS = [
  { name: "TP14", sourceX: 320, sourceY: 480 },
  { name: "TP8", sourceX: 1000, sourceY: 700 },
  { name: "TP7", sourceX: 1000, sourceY: 690 },
  { name: "TP6", sourceX: 1000, sourceY: 680 },
  { name: "TP3", sourceX: 1000, sourceY: 670 },
  { name: "TP2", sourceX: 1000, sourceY: 660 },
  { name: "TP9", sourceX: 1000, sourceY: 710 },
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

const renderInterfaceLabels = () => (
  <>
    {IO_PORT_LABELS.map((label) => (
      <Fragment key={`io-${label.net}-${label.sourceX}-${label.sourceY}`}>
        <netlabel
          net={label.net}
          schX={toSchX(label.sourceX, "io")}
          schY={toSchY(label.sourceY)}
          anchorSide={label.sourceX < 850 ? "right" : "left"}
        />
      </Fragment>
    ))}
    {POWER_PORT_LABELS.map((label) => (
      <Fragment key={`power-${label.net}-${label.sourceX}-${label.sourceY}`}>
        <netlabel
          net={label.net}
          schX={toSchX(label.sourceX, "power")}
          schY={toSchY(label.sourceY)}
          anchorSide={label.net === "GND" ? "top" : "bottom"}
        />
      </Fragment>
    ))}
  </>
);

/**
 * TIDEP-01024 AWR1843AoP I/O and AOP power sheets.
 *
 * One U2 component renders all five Altium units so the 180-ball package is
 * electrically and physically represented only once.
 *
 * Coordinate transform:
 *   schX = (AltiumX - 850) * 0.0254 + sheetOffsetX
 *   schY = (AltiumY - 550) * 0.0254
 * AOP_IO uses sheetOffsetX=0; AOP_PWR uses sheetOffsetX=45 mm.
 */
export const RadarSoc_AWR1843ARBGALPQ1 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <schematictext
      text="AOP IO"
      schX={0}
      schY={12.2}
      fontSize={0.6}
      anchor="center"
    />
    <schematictext
      text="AOP POWER"
      schX={45}
      schY={12.2}
      fontSize={0.6}
      anchor="center"
    />
    <schematictext
      text="DECOUPLING CAPS"
      schX={50}
      schY={9.7}
      fontSize={0.46}
      anchor="center"
    />

    <AWR1843ARBGALPQ1
      name="U2"
      noConnect={["A3", "A4", "B3", "B4", "B5", "C3", "C4", "C5"]}
    />

    {AWR_NET_CONNECTIONS.map((connection) => (
      <Fragment key={connection.net}>
        {connection.balls.map((ball) => (
          <Fragment key={`${connection.net}-${ball}`}>
            <trace
              name={`U2_${connection.net}_${ball}`}
              from={`.U2 > .${ball}`}
              to={`net.${connection.net}`}
            />
          </Fragment>
        ))}
      </Fragment>
    ))}

    {IO_RESISTORS.map((resistor) => (
      <resistor
        key={resistor.name}
        name={resistor.name}
        resistance={resistor.resistance}
        footprint="0201"
        schX={toSchX(resistor.sourceX, "io")}
        schY={toSchY(resistor.sourceY)}
        schRotation={resistor.rotation}
        doNotPlace={resistor.doNotPlace}
      />
    ))}
    <capacitor
      name="C130"
      capacitance="0.1uF"
      footprint="0402"
      schX={toSchX(270, "io")}
      schY={toSchY(455)}
      schRotation={270}
    />
    <CHS01TA name="S3" schX={toSchX(1600, "io")} schY={toSchY(740)} />

    {IO_TESTPOINTS.map((testpoint) => (
      <testpoint
        key={testpoint.name}
        name={testpoint.name}
        footprintVariant="pad"
        padShape="circle"
        width="1mm"
        height="1mm"
        schX={toSchX(testpoint.sourceX, "io")}
        schY={toSchY(testpoint.sourceY)}
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
    ].map((port, index) => (
      <Fragment key={`io-pullup-${index}`}>
        <trace name={`IO_PULLUP_RAIL_${index}`} from={port} to="net.PMIC_3V3" />
      </Fragment>
    ))}
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
    <trace name="HOSTINTR1_PULLDOWN" from=".R3 > .pin1" to="net.AR_HOSTINTR1" />
    {[
      ".R3 > .pin2",
      ".C130 > .pin1",
      ".R172 > .pin1",
      ".R170 > .pin1",
      ".R158 > .pin1",
    ].map((port, index) => (
      <Fragment key={`io-ground-${index}`}>
        <trace name={`IO_GROUND_${index}`} from={port} to="net.GND" />
      </Fragment>
    ))}

    <trace name="GPADC1_TEST" from=".TP9 > .pin1" to="net.AR_GPADC_1" />
    <trace name="GPADC2_TEST" from=".TP8 > .pin1" to="net.AR_GPADC_2" />
    <trace name="GPADC3_TEST" from=".TP7 > .pin1" to="net.AR_GPADC_3" />
    <trace name="GPADC4_TEST" from=".TP6 > .pin1" to="net.AR_GPADC_4" />
    <trace name="GPADC5_TEST" from=".TP3 > .pin1" to="net.AR_GPADC_5" />
    <trace name="GPADC6_TEST" from=".TP2 > .pin1" to="net.AR_GPADC_6" />
    <trace name="OSC_CLKOUT_TEST" from=".TP17 > .pin1" to="net.AR_OSC_CLKOUT" />

    <trace name="SOP2_SOURCE" from=".R103 > .pin1" to=".R85 > .pin1" />
    <trace
      name="SOP2_SOURCE_INTERFACE"
      from=".R85 > .pin1"
      to="net.AR_PMIC_CLKOUT_SOP2"
    />
    <trace name="PMIC_CLK_DNP" from=".R103 > .pin2" to="net.PMIC_CLK" />
    <trace
      name="SOP2_DIVIDER_R85_R176"
      from=".R85 > .pin2"
      to=".R176 > .pin2"
    />
    <trace
      name="SOP2_DIVIDER_R176_R172"
      from=".R176 > .pin2"
      to=".R172 > .pin2"
    />
    <trace name="SOP2_SWITCH" from=".R176 > .pin1" to=".S3 > .pin1" />
    <trace name="SOP2_SWITCH_SUPPLY" from=".S3 > .pin2" to="net.PMIC_3V3" />

    <trace name="SOP1_SOURCE" from=".R84 > .pin1" to="net.AR_SYNC_OUT_SOP1" />
    <trace
      name="SOP1_DIVIDER_R84_R171"
      from=".R84 > .pin2"
      to=".R171 > .pin1"
    />
    <trace
      name="SOP1_DIVIDER_R171_R170"
      from=".R171 > .pin1"
      to=".R170 > .pin2"
    />
    <trace name="SOP1_STRAP" from=".R171 > .pin2" to="net.SOP1" />

    <trace name="SOP0_SOURCE" from=".R83 > .pin1" to="net.AR_TDO_SOP0" />
    <trace
      name="SOP0_DIVIDER_R83_R174"
      from=".R83 > .pin2"
      to=".R174 > .pin2"
    />
    <trace
      name="SOP0_DIVIDER_R174_R159"
      from=".R174 > .pin2"
      to=".R159 > .pin1"
    />
    <trace
      name="SOP0_DIVIDER_R159_R158"
      from=".R159 > .pin1"
      to=".R158 > .pin2"
    />
    <trace name="SOP0_STRAP" from=".R159 > .pin2" to="net.SOP0" />
    <trace name="SOP0_SUPPLY" from=".R174 > .pin1" to=".R2 > .pin1" />
    <trace name="SOP0_SUPPLY_LINK" from=".R2 > .pin2" to="net.PMIC_3V3" />

    {POWER_CAPACITORS.map((capacitor) => (
      <Fragment key={capacitor.name}>
        <capacitor
          name={capacitor.name}
          capacitance={capacitor.capacitance}
          footprint={capacitor.footprint}
          schX={toSchX(capacitor.sourceX, "power")}
          schY={toSchY(capacitor.sourceY)}
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

    {renderInterfaceLabels()}
    {RADAR_SOC_INTERFACE_NETS.map((net) => (
      <Fragment key={`port-${net}`}>
        <port name={`INTERFACE_${net}`} connectsTo={`net.${net}`} />
      </Fragment>
    ))}
  </subcircuit>
);

export default RadarSoc_AWR1843ARBGALPQ1;
