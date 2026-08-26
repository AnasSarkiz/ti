import type { SubcircuitProps } from "@tscircuit/props";
import { Fragment } from "react";
import "tscircuit";
import { LP5892QRRFRQ1 } from "../chips/LP5892QRRFRQ1.circuit.tsx";

const RED_OUTPUTS = [
  "R0",
  "R1",
  "R2",
  "R3",
  "R4",
  "R5",
  "R6",
  "R7",
  "R8",
  "R9",
  "R10",
  "R11",
  "R12",
  "R13",
  "R14",
  "R15",
] as const;

const GREEN_OUTPUTS = [
  "G0",
  "G1",
  "G2",
  "G3",
  "G4",
  "G5",
  "G6",
  "G7",
  "G8",
  "G9",
  "G10",
  "G11",
  "G12",
  "G13",
  "G14",
  "G15",
] as const;

const BLUE_OUTPUTS = [
  "B0",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "B8",
  "B9",
  "B10",
  "B11",
  "B12",
  "B13",
  "B14",
  "B15",
] as const;

const LINE_OUTPUTS = [
  "LINE0",
  "LINE1",
  "LINE2",
  "LINE3",
  "LINE4",
  "LINE5",
  "LINE6",
  "LINE7",
  "LINE8",
  "LINE9",
  "LINE10",
  "LINE11",
  "LINE12",
  "LINE13",
  "LINE14",
  "LINE15",
] as const;

const DIGITAL_INTERFACE_NETS = ["SCLK", "SIN", "SOUT"] as const;
const POWER_NETS = ["VCC", "VR", "VG", "VB"] as const;
const MATRIX_NETS = [
  ...RED_OUTPUTS,
  ...GREEN_OUTPUTS,
  ...BLUE_OUTPUTS,
  ...LINE_OUTPUTS,
] as const;
const EXPOSED_NET_NAMES = [
  ...POWER_NETS,
  "GND",
  ...DIGITAL_INTERFACE_NETS,
  ...MATRIX_NETS,
] as const;

const THERMAL_VIA_OFFSETS = [-2.4, -1.2, 0, 1.2, 2.4] as const;

type MatrixNet = (typeof MATRIX_NETS)[number];
type PowerNet = (typeof POWER_NETS)[number];

const PIN_BY_NET = {
  SCLK: 60,
  SIN: 59,
  SOUT: 58,
  R0: 1,
  R1: 4,
  R2: 11,
  R3: 14,
  R4: 17,
  R5: 21,
  R6: 24,
  R7: 27,
  R8: 32,
  R9: 35,
  R10: 38,
  R11: 41,
  R12: 44,
  R13: 47,
  R14: 54,
  R15: 57,
  G0: 2,
  G1: 5,
  G2: 12,
  G3: 15,
  G4: 18,
  G5: 22,
  G6: 25,
  G7: 28,
  G8: 31,
  G9: 34,
  G10: 37,
  G11: 40,
  G12: 43,
  G13: 46,
  G14: 53,
  G15: 56,
  B0: 3,
  B1: 6,
  B2: 13,
  B3: 16,
  B4: 19,
  B5: 23,
  B6: 26,
  B7: 29,
  B8: 30,
  B9: 33,
  B10: 36,
  B11: 39,
  B12: 42,
  B13: 45,
  B14: 52,
  B15: 55,
  LINE0: 76,
  LINE1: 75,
  LINE2: 74,
  LINE3: 73,
  LINE4: 72,
  LINE5: 71,
  LINE6: 70,
  LINE7: 69,
  LINE8: 68,
  LINE9: 67,
  LINE10: 66,
  LINE11: 65,
  LINE12: 64,
  LINE13: 63,
  LINE14: 62,
  LINE15: 61,
} as const satisfies Record<
  MatrixNet | (typeof DIGITAL_INTERFACE_NETS)[number],
  number
>;

const RED_PINS = RED_OUTPUTS.map((netName) => PIN_BY_NET[netName]);
const GREEN_PINS = GREEN_OUTPUTS.map((netName) => PIN_BY_NET[netName]);
const BLUE_PINS = BLUE_OUTPUTS.map((netName) => PIN_BY_NET[netName]);
const LINE_PINS = LINE_OUTPUTS.map((netName) => PIN_BY_NET[netName]);
const LEFT_PINS = [60, 59, 58, 20, ...LINE_PINS] as const;
const RIGHT_PINS = RED_PINS;
const HORIZONTAL_PINS = [
  ...BLUE_PINS,
  48,
  49,
  50,
  51,
  9,
  10,
  8,
  ...GREEN_PINS,
  7,
  77,
] as const;
const SUBCIRCUIT_PIN_STYLE = {
  ...Object.fromEntries(
    LEFT_PINS.slice(1).map((pin) => [`pin${pin}`, { marginTop: 0.15 }]),
  ),
  ...Object.fromEntries(
    RIGHT_PINS.slice(1).map((pin) => [`pin${pin}`, { marginTop: 0.2 }]),
  ),
  ...Object.fromEntries(
    HORIZONTAL_PINS.map((pin) => [`pin${pin}`, { marginRight: 0.2 }]),
  ),
  pin20: { marginTop: 0.4 },
  pin76: { marginTop: 0.4 },
};

const spread = (index: number, count: number, start: number, end: number) =>
  count === 1 ? start : start + (index * (end - start)) / (count - 1);

const MatrixNetLabel = ({
  netName,
  schX,
  schY,
  anchorSide,
}: {
  netName: MatrixNet;
  schX: number;
  schY: number;
  anchorSide: "left" | "right" | "top" | "bottom";
}) => (
  <netlabel
    net={netName}
    connectsTo={`.U1 > .pin${PIN_BY_NET[netName]}`}
    schX={schX}
    schY={schY}
    anchorSide={anchorSide}
  />
);

const SupplyBypass = ({
  netName,
  capacitorNumber,
  localCapacitance = "1uF",
  schX,
  pcbLocalX,
  pcbLocalY,
  pcbBulkX,
  pcbBulkY,
}: {
  netName: PowerNet;
  capacitorNumber: number;
  localCapacitance?: "0.1uF" | "1uF";
  schX: number;
  pcbLocalX: number;
  pcbLocalY: number;
  pcbBulkX: number;
  pcbBulkY: number;
}) => {
  const localCapacitor = `C${capacitorNumber}`;
  const bulkCapacitor = `C${capacitorNumber + 1}`;

  return (
    <>
      <capacitor
        name={localCapacitor}
        capacitance={localCapacitance}
        maxVoltageRating="10V"
        footprint="0402"
        schX={schX - 0.7}
        schY={7.2}
        schOrientation="vertical"
        schSectionName={`bypass-${netName}`}
        pcbX={pcbLocalX}
        pcbY={pcbLocalY}
        pcbRotation={90}
      />
      <capacitor
        name={bulkCapacitor}
        capacitance="10uF"
        maxVoltageRating="10V"
        footprint="0603"
        schX={schX + 0.7}
        schY={7.2}
        schOrientation="vertical"
        schSectionName={`bypass-${netName}`}
        pcbX={pcbBulkX}
        pcbY={pcbBulkY}
        pcbRotation={90}
      />
      <netlabel
        net={netName}
        connectsTo={[`.${localCapacitor} > .pin1`, `.${bulkCapacitor} > .pin1`]}
        schX={schX}
        schY={7.95}
        anchorSide="bottom"
      />
      <netlabel
        net="GND"
        connectsTo={[`.${localCapacitor} > .pin2`, `.${bulkCapacitor} > .pin2`]}
        schX={schX}
        schY={6.45}
        anchorSide="top"
      />
    </>
  );
};

/**
 * LP5892-Q1 48-current-source by 16-line common-cathode RGB matrix interface.
 *
 * The support network follows TI's LP5892-Q1 typical application and layout
 * guidance, with bulk-capacitor values adapted from the related LP5891Q1EVM.
 * The 23-kohm IREF resistor is TI's 3-mA design example; firmware must still
 * configure the current and brightness registers appropriately.
 * Parent boards must enable `isViaInPadAllowed` for the exposed-pad thermal
 * via array and use an appropriate filled, plugged, or tented via process.
 *
 * @see https://www.ti.com/lit/ds/symlink/lp5892-q1.pdf
 * @see https://www.ti.com/lit/pdf/snvu836
 */
export const OutputUserInterface_LEDMatrix_LP5892_Q1 = (
  props: SubcircuitProps,
) => (
  <subcircuit
    exposedNets={[...EXPOSED_NET_NAMES]}
    schMaxTraceDistance="3mm"
    autorouterEffortLevel="10x"
    {...props}
  >
    <net name="GND" isGroundNet />
    {POWER_NETS.map((netName) => (
      <Fragment key={netName}>
        <net name={netName} isPowerNet />
      </Fragment>
    ))}
    {[...DIGITAL_INTERFACE_NETS, ...MATRIX_NETS].map((netName) => (
      <Fragment key={netName}>
        <net name={netName} />
      </Fragment>
    ))}

    <LP5892QRRFRQ1
      name="U1"
      schX={0}
      schY={0}
      schWidth="9.4mm"
      schHeight="8mm"
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [...LEFT_PINS],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [...RIGHT_PINS],
        },
        topSide: {
          direction: "left-to-right",
          pins: [...BLUE_PINS, 48, 49, 50, 51, 9, 10, 8],
        },
        bottomSide: {
          direction: "left-to-right",
          pins: [...GREEN_PINS, 7, 77],
        },
      }}
      schPinStyle={SUBCIRCUIT_PIN_STYLE}
      pcbX={0}
      pcbY={0}
    />

    {/* TI requires the exposed pad on GND and recommends an array of thermal
        vias. Assigning these vias explicitly keeps their copper on GND. */}
    {THERMAL_VIA_OFFSETS.flatMap((pcbX, xIndex) =>
      THERMAL_VIA_OFFSETS.map((pcbY, yIndex) => (
        <Fragment key={`thermal-via-${xIndex}-${yIndex}`}>
          <via
            name={`V_EP_${xIndex}_${yIndex}`}
            pcbX={pcbX}
            pcbY={pcbY}
            holeDiameter="0.2mm"
            outerDiameter="0.6mm"
            connectsTo="net.GND"
          />
        </Fragment>
      )),
    )}

    {DIGITAL_INTERFACE_NETS.map((netName, index) => (
      <Fragment key={netName}>
        <netlabel
          net={netName}
          connectsTo={`.U1 > .pin${PIN_BY_NET[netName]}`}
          schX={-5.7}
          schY={3.575 - index * 0.35}
          anchorSide="right"
        />
      </Fragment>
    ))}

    {LINE_OUTPUTS.map((netName, index) => (
      <MatrixNetLabel
        key={netName}
        netName={netName}
        schX={-5.7}
        schY={1.675 - index * 0.35}
        anchorSide="right"
      />
    ))}

    {RED_OUTPUTS.map((netName, index) => (
      <MatrixNetLabel
        key={netName}
        netName={netName}
        schX={5.7}
        schY={3 - index * 0.4}
        anchorSide="left"
      />
    ))}

    {BLUE_OUTPUTS.map((netName, index) => (
      <MatrixNetLabel
        key={netName}
        netName={netName}
        schX={spread(index, BLUE_OUTPUTS.length, -4.5, 1.5)}
        schY={5}
        anchorSide="bottom"
      />
    ))}

    {GREEN_OUTPUTS.map((netName, index) => (
      <MatrixNetLabel
        key={netName}
        netName={netName}
        schX={spread(index, GREEN_OUTPUTS.length, -3.5, 2.5)}
        schY={-5}
        anchorSide="top"
      />
    ))}

    <netlabel
      net="VB"
      connectsTo={[".U1 > .pin48", ".U1 > .pin49"]}
      schX={2.1}
      schY={5}
      anchorSide="bottom"
    />
    <netlabel
      net="VG"
      connectsTo={[".U1 > .pin50", ".U1 > .pin51"]}
      schX={2.9}
      schY={5}
      anchorSide="bottom"
    />
    <netlabel
      net="VR"
      connectsTo={[".U1 > .pin9", ".U1 > .pin10"]}
      schX={3.7}
      schY={5}
      anchorSide="bottom"
    />
    <netlabel
      net="VCC"
      connectsTo=".U1 > .pin8"
      schX={4.3}
      schY={5}
      anchorSide="bottom"
    />
    <netlabel
      net="GND"
      connectsTo={[".U1 > .pin7", ".U1 > .pin77"]}
      schX={3.1}
      schY={-5}
      anchorSide="top"
    />

    <resistor
      name="R_IREF"
      resistance="23kohm"
      tolerance="1%"
      footprint="0402"
      schX={-6.2}
      schY={2.275}
      pcbX={-3.6}
      pcbY={-6}
      pcbRotation={90}
      connections={{ pin2: ".U1 > .pin20" }}
    />
    <netlabel
      net="GND"
      connectsTo=".R_IREF > .pin1"
      schX={-7.2}
      schY={2.275}
      anchorSide="right"
    />

    <SupplyBypass
      netName="VCC"
      capacitorNumber={1}
      localCapacitance="0.1uF"
      schX={-5.4}
      pcbLocalX={-5.6}
      pcbLocalY={1.2}
      pcbBulkX={-7.4}
      pcbBulkY={1.7}
    />
    <SupplyBypass
      netName="VR"
      capacitorNumber={3}
      schX={-1.8}
      pcbLocalX={-5.6}
      pcbLocalY={-1.2}
      pcbBulkX={-7.4}
      pcbBulkY={-1.7}
    />
    <SupplyBypass
      netName="VG"
      capacitorNumber={5}
      schX={1.8}
      pcbLocalX={5.6}
      pcbLocalY={1.2}
      pcbBulkX={7.4}
      pcbBulkY={1.7}
    />
    <SupplyBypass
      netName="VB"
      capacitorNumber={7}
      schX={5.4}
      pcbLocalX={5.6}
      pcbLocalY={-1.2}
      pcbBulkX={7.4}
      pcbBulkY={-1.7}
    />

    <schematictext
      text="Connect R0-R15, G0-G15, B0-B15 and LINE0-LINE15 to a common-cathode RGB LED matrix."
      schX={0}
      schY={-6.5}
      fontSize={0.24}
      anchor="top_center"
      color="#555555"
    />
  </subcircuit>
);

export default OutputUserInterface_LEDMatrix_LP5892_Q1;
