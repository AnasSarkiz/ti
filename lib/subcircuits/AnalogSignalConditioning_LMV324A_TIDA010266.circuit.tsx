import "tscircuit";
import { LMV324AIPWR } from "../chips/LMV324AIPWR.circuit.tsx";
import { TIDA010266InlineNetPorts } from "../utils/tida010266/TIDA010266InlineNetPorts.tsx";
import type { TIDA010266SectionedSubcircuitProps } from "../utils/tida010266/TIDA010266.types.ts";

const filterOpAmpSymbol = (unitName: "U2B" | "U2C") => (
  <symbol>
    <schematicpath
      points={[
        { x: -1.1, y: 1 },
        { x: 1.1, y: 0 },
        { x: -1.1, y: -1 },
        { x: -1.1, y: 1 },
      ]}
      strokeWidth={0.04}
    />
    <schematictext text="-" schX={-0.82} schY={0.48} fontSize={0.3} />
    <schematictext text="+" schX={-0.82} schY={-0.48} fontSize={0.3} />
    <schematictext text={unitName} schX={0.5} schY={-0.55} fontSize={0.22} />
    <schematictext text="LMV324AIPWR" schX={0.5} schY={-0.8} fontSize={0.18} />
    <port
      name="pin6"
      pinNumber={6}
      schX={-1.5}
      schY={0.48}
      direction="left"
      schStemLength={0.5}
    />
    <port
      name="pin5"
      pinNumber={5}
      schX={-1.5}
      schY={-0.48}
      direction="left"
      schStemLength={0.5}
    />
    <port
      name="pin7"
      pinNumber={7}
      schX={1.5}
      schY={0}
      direction="right"
      schStemLength={0.5}
    />
    <port
      name="pin4"
      pinNumber={4}
      schX={0}
      schY={1.45}
      direction="up"
      schStemLength={1.05}
    />
    <port
      name="pin11"
      pinNumber={11}
      schX={0}
      schY={-1.45}
      direction="down"
      schStemLength={1.05}
    />
  </symbol>
);

export type AnalogSignalConditioning_LMV324A_TIDA010266Props =
  TIDA010266SectionedSubcircuitProps & {
    inputReferenceSectionName?: string;
    pressureSectionName?: string;
    inputReferenceSheetName?: string;
    pressureSheetName?: string;
    inputReferenceSchXOffset?: number;
    inputReferenceSchYOffset?: number;
    pressureSchXOffset?: number;
    pressureSchYOffset?: number;
  };

/**
 * TIDA-010266 U2 quad-amplifier functions: 1.25 V reference buffer,
 * two-stage oscillometric band-pass filter, and sensor current-bias loop.
 */
export const AnalogSignalConditioning_LMV324A_TIDA010266 = ({
  inputReferenceSectionName,
  pressureSectionName,
  inputReferenceSheetName,
  pressureSheetName,
  inputReferenceSchXOffset = 0,
  inputReferenceSchYOffset = 0,
  pressureSchXOffset = 0,
  pressureSchYOffset = 0,
  ...props
}: AnalogSignalConditioning_LMV324A_TIDA010266Props) => {
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;
  const inputSheetName = inputReferenceSheetName ?? props.schSheetName;
  const sensorSheetName = pressureSheetName ?? props.schSheetName;
  const usesDistributedLayout = Boolean(
    inputReferenceSectionName ||
      pressureSectionName ||
      inputReferenceSheetName ||
      pressureSheetName,
  );
  const compactInputOffset = usesDistributedLayout
    ? { x: 0, y: 0 }
    : { x: -9, y: -9 };
  const compactPressureOffset = usesDistributedLayout
    ? { x: 0, y: 0 }
    : { x: 14.5, y: 11.5 };
  const inputX = (x: number) =>
    x + inputReferenceSchXOffset + compactInputOffset.x;
  const inputY = (y: number) =>
    y + inputReferenceSchYOffset + compactInputOffset.y;
  const pressureX = (x: number) =>
    x + pressureSchXOffset + compactPressureOffset.x;
  const pressureY = (y: number) =>
    y + pressureSchYOffset + compactPressureOffset.y;

  return (
    <subcircuit
      {...props}
      schTraceAutoLabelEnabled={false}
      schMaxTraceDistance="8mm"
    >
      <LMV324AIPWR
        name="U2"
        noSchematicRepresentation
        connections={{
          V_POS: "net.V3_3",
          V_NEG: "net.GND",
          IN_POS_A: "net.VREF_DIV",
          IN_NEG_B: "net.FILTER_1_INV",
          OUT_C: "net.OSCILLATIONS",
          IN_NEG_C: "net.FILTER_2_INV",
          OUT_D: "net.SENSOR_DRIVE",
          IN_NEG_D: "net.IBIAS_FB",
          IN_POS_D: "net.IBIAS_SET",
        }}
      />

      {/* U2 is one physical quad op-amp with four schematic units. */}
      <schematicsymbol
        name="U2A"
        displayName="U2A"
        chipRef=".U2"
        symbolName="opamp_no_power_left"
        schRotation={180}
        schSectionName={inputReferenceSectionName ?? props.schSectionName}
        schSheetName={inputSheetName}
        schX={inputX(4.5)}
        schY={inputY(15)}
        connections={{
          inp1: ".U2 > .IN_POS_A",
          inp2: ".U2 > .IN_NEG_A",
          out: ".U2 > .OUT_A",
        }}
      />
      {/* The released drawing flips the input order and loops the output back
          to the inverting input. U2 remains the sole electrical/PCB package. */}
      <group schSheetName={inputSheetName}>
        <schematicline
          x1={inputX(4.47)}
          y1={inputY(15.22)}
          x2={inputX(4.47)}
          y2={inputY(16.05)}
          strokeWidth={0.025}
          color="#008000"
        />
        <schematictext
          text="3.3V"
          schX={inputX(4.47)}
          schY={inputY(16.25)}
          fontSize={0.18}
          color="#840000"
        />
        <schematictext
          text="4"
          schX={inputX(4.3)}
          schY={inputY(15.42)}
          fontSize={0.14}
          color="#840000"
        />
        <schematicline
          x1={inputX(5)}
          y1={inputY(15)}
          x2={inputX(5.4)}
          y2={inputY(15)}
          strokeWidth={0.025}
          color="#008000"
        />
        <schematicline
          x1={inputX(5.4)}
          y1={inputY(15)}
          x2={inputX(5.4)}
          y2={inputY(15.8)}
          strokeWidth={0.025}
          color="#008000"
        />
        <schematicline
          x1={inputX(5.4)}
          y1={inputY(15.8)}
          x2={inputX(3.75)}
          y2={inputY(15.8)}
          strokeWidth={0.025}
          color="#008000"
        />
        <schematicline
          x1={inputX(3.75)}
          y1={inputY(15.8)}
          x2={inputX(3.75)}
          y2={inputY(15.14)}
          strokeWidth={0.025}
          color="#008000"
        />
        <schematicline
          x1={inputX(3.75)}
          y1={inputY(15.14)}
          x2={inputX(4)}
          y2={inputY(15.14)}
          strokeWidth={0.025}
          color="#008000"
        />
      </group>
      <chip
        name="U2B"
        manufacturerPartNumber="LMV324AIPWR U2B"
        doNotPlace
        schSheetName={props.schSheetName}
        schX={0}
        schY={0}
        connections={{
          pin4: "net.V3_3",
          pin5: "net.VREF_1_25",
          pin6: "net.FILTER_1_INV",
          pin7: "net.FILTER_1_OUT",
          pin11: "net.GND",
        }}
        pinLabels={{
          pin4: "V+",
          pin5: "+",
          pin6: "-",
          pin7: "OUT",
          pin11: "V-",
        }}
        symbol={filterOpAmpSymbol("U2B")}
      />
      <chip
        name="U2C"
        manufacturerPartNumber="LMV324AIPWR U2C"
        doNotPlace
        schSheetName={props.schSheetName}
        schX={10}
        schY={0}
        connections={{
          pin4: "net.V3_3",
          pin5: "net.VREF_1_25",
          pin6: "net.FILTER_2_INV",
          pin7: "net.OSCILLATIONS",
          pin11: "net.GND",
        }}
        pinLabels={{
          pin4: "V+",
          pin5: "+",
          pin6: "-",
          pin7: "OUT",
          pin11: "V-",
        }}
        symbol={filterOpAmpSymbol("U2C")}
      />
      <netlabel net="V3_3" connectsTo=".U2B > .pin4" inline />
      <netlabel
        net="GND"
        connectsTo=".U2B > .pin11"
        anchorSide="top"
        schX={0}
        schY={-1.45}
      />
      <netlabel net="V3_3" connectsTo=".U2C > .pin4" inline />
      <netlabel
        net="GND"
        connectsTo=".U2C > .pin11"
        anchorSide="top"
        schX={10}
        schY={-1.45}
      />
      <schematicsymbol
        name="U2D"
        displayName="U2D"
        chipRef=".U2"
        symbolName="opamp_no_power_left"
        schRotation={180}
        schSectionName={pressureSectionName ?? props.schSectionName}
        schSheetName={sensorSheetName}
        schX={pressureX(-19)}
        schY={pressureY(-16.5)}
        connections={{
          inp1: ".U2 > .IN_POS_D",
          inp2: ".U2 > .IN_NEG_D",
          out: ".U2 > .OUT_D",
        }}
      />
      <group schSheetName={sensorSheetName}>
        <schematicline
          x1={pressureX(-19.03)}
          y1={pressureY(-16.28)}
          x2={pressureX(-19.03)}
          y2={pressureY(-15.55)}
          strokeWidth={0.025}
          color="#008000"
        />
        <schematictext
          text="3.3V"
          schX={pressureX(-19.03)}
          schY={pressureY(-15.35)}
          fontSize={0.18}
          color="#840000"
        />
      </group>

      <resistor
        name="R4"
        schSectionName={inputReferenceSectionName ?? props.schSectionName}
        schSheetName={inputSheetName}
        resistance="10k"
        footprint="0603"
        schX={inputX(1.5)}
        schY={inputY(15.8)}
        schOrientation="vertical"
        connections={{ pin1: "net.VREF_2_5", pin2: "net.VREF_DIV" }}
      />
      <resistor
        name="R6"
        schSectionName={inputReferenceSectionName ?? props.schSectionName}
        schSheetName={inputSheetName}
        resistance="10k"
        footprint="0603"
        schX={inputX(1.5)}
        schY={inputY(14.2)}
        schOrientation="vertical"
        connections={{ pin1: "net.VREF_DIV", pin2: "net.GND" }}
      />
      <netlabel
        net="GND"
        connectsTo=".R6 > .pin2"
        anchorSide="top"
        schX={inputX(1.5)}
        schY={inputY(13.9)}
      />

      <capacitor
        name="C11"
        schSectionName={props.schSectionName}
        capacitance="4.7uF"
        maxVoltageRating="16V"
        footprint="0603"
        schX={-7}
        schY={0.6}
        connections={{ pin1: "net.PRESSURE", pin2: "net.FILTER_1_HP" }}
      />
      <resistor
        name="R16"
        schSectionName={props.schSectionName}
        resistance="20k"
        footprint="0603"
        schX={-5}
        schY={0.6}
        connections={{ pin1: "net.FILTER_1_HP", pin2: "net.FILTER_1_INV" }}
      />
      <resistor
        name="R9"
        schSectionName={props.schSectionName}
        resistance="270k"
        footprint="0603"
        schX={0}
        schY={3.2}
        connections={{
          pin1: "net.FILTER_1_INV",
          pin2: "net.FILTER_1_OUT",
        }}
      />
      <capacitor
        name="C9"
        schSectionName={props.schSectionName}
        capacitance="100nF"
        maxVoltageRating="25V"
        footprint="0603"
        schX={0}
        schY={2.3}
        connections={{
          pin1: "net.FILTER_1_INV",
          pin2: "net.FILTER_1_OUT",
        }}
      />

      <capacitor
        name="C12"
        schSectionName={props.schSectionName}
        capacitance="4.7uF"
        maxVoltageRating="16V"
        footprint="0603"
        schX={4}
        schY={0.3}
        connections={{
          pin1: "net.FILTER_1_OUT",
          pin2: "net.FILTER_2_HP",
        }}
      />
      <resistor
        name="R17"
        schSectionName={props.schSectionName}
        resistance="20k"
        footprint="0603"
        schX={6.5}
        schY={0.6}
        connections={{
          pin1: "net.FILTER_2_HP",
          pin2: "net.FILTER_2_INV",
        }}
      />
      <resistor
        name="R10"
        schSectionName={props.schSectionName}
        resistance="270k"
        footprint="0603"
        schX={10}
        schY={3.2}
        connections={{ pin1: "net.FILTER_2_INV", pin2: "net.OSCILLATIONS" }}
      />
      <capacitor
        name="C10"
        schSectionName={props.schSectionName}
        capacitance="100nF"
        maxVoltageRating="25V"
        footprint="0603"
        schX={10}
        schY={2.3}
        connections={{ pin1: "net.FILTER_2_INV", pin2: "net.OSCILLATIONS" }}
      />

      <resistor
        name="R18"
        schSectionName={pressureSectionName ?? props.schSectionName}
        schSheetName={sensorSheetName}
        resistance="45.3k"
        footprint="0603"
        schX={pressureX(-23)}
        schY={pressureY(-15.8)}
        schOrientation="vertical"
        connections={{ pin1: "net.VREF_2_5", pin2: "net.IBIAS_SET" }}
      />
      <resistor
        name="R21"
        schSectionName={pressureSectionName ?? props.schSectionName}
        schSheetName={sensorSheetName}
        resistance="4.99k"
        footprint="0603"
        schX={pressureX(-23)}
        schY={pressureY(-18.2)}
        schOrientation="vertical"
        connections={{ pin1: "net.IBIAS_SET", pin2: "net.GND" }}
      />
      <netlabel
        net="GND"
        connectsTo=".R21 > .pin2"
        anchorSide="top"
        schX={pressureX(-23)}
        schY={pressureY(-18.5)}
      />
      <port
        {...({ schSheetName: sensorSheetName } as Record<string, unknown>)}
        name="SENSOR_DRIVE"
        schX={originX + pressureX(-18.5)}
        schY={originY + pressureY(-16.5)}
        direction="right"
        connectsTo="net.SENSOR_DRIVE"
      />
      <trace from=".U2 > .OUT_D" to=".SENSOR_DRIVE" schDisplayLabel=" " />
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "V3_3",
            connectsTo: ".U2 > .V_POS",
            schX: 0,
            schY: 5,
            direction: "up",
            schSheetName: props.schSheetName,
          },
          {
            name: "GND",
            connectsTo: [".U2 > .V_NEG", ".R21 > .pin2"],
            inlineLabelConnectsTo: false,
            schX: 0,
            schY: -5.5,
            direction: "down",
            schSheetName: props.schSheetName,
          },
          {
            name: "VREF_2_5",
            connectsTo: [".R4 > .pin1", ".R18 > .pin1"],
            inlineLabelConnectsTo: ".R18 > .pin1",
            schX: inputX(1.5),
            schY: inputY(16.1),
            direction: "left",
            schSheetName: inputSheetName,
          },
          {
            name: "VREF_1_25",
            connectsTo: [
              ".U2 > .OUT_A",
              ".U2 > .IN_NEG_A",
              ".U2 > .IN_POS_B",
              ".U2 > .IN_POS_C",
              ".U2B > .pin5",
              ".U2C > .pin5",
            ],
            inlineLabelConnectsTo: [".U2 > .IN_POS_B", ".U2 > .IN_POS_C"],
            schX: inputX(5),
            schY: inputY(15),
            direction: "left",
            schSheetName: inputSheetName,
          },
          {
            name: "PRESSURE",
            connectsTo: ".C11 > .pin1",
            schX: -8,
            schY: 0.6,
            direction: "left",
            schSheetName: props.schSheetName,
          },
          {
            name: "FILTER_1_HP",
            connectsTo: [".C11 > .pin2", ".R16 > .pin1"],
            inlineLabelConnectsTo: ".C11 > .pin2",
            schX: -6,
            schY: 0.6,
            direction: "left",
            schSheetName: props.schSheetName,
          },
          {
            name: "FILTER_1_INV",
            connectsTo: [
              ".R16 > .pin2",
              ".R9 > .pin1",
              ".C9 > .pin1",
              ".U2 > .IN_NEG_B",
              ".U2B > .pin6",
            ],
            inlineLabelConnectsTo: ".R16 > .pin2",
            schX: -3,
            schY: 1,
            direction: "left",
            schSheetName: props.schSheetName,
          },
          {
            name: "FILTER_1_OUT",
            connectsTo: [
              ".U2 > .OUT_B",
              ".R9 > .pin2",
              ".C9 > .pin2",
              ".C12 > .pin1",
              ".U2B > .pin7",
            ],
            inlineLabelConnectsTo: ".U2B > .pin7",
            schX: 2.4,
            schY: 1,
            direction: "right",
            schSheetName: props.schSheetName,
          },
          {
            name: "FILTER_2_HP",
            connectsTo: [".C12 > .pin2", ".R17 > .pin1"],
            inlineLabelConnectsTo: ".C12 > .pin2",
            schX: 5,
            schY: 0.3,
            direction: "right",
            schSheetName: props.schSheetName,
          },
          {
            name: "FILTER_2_INV",
            connectsTo: [
              ".R17 > .pin2",
              ".R10 > .pin1",
              ".C10 > .pin1",
              ".U2 > .IN_NEG_C",
              ".U2C > .pin6",
            ],
            inlineLabelConnectsTo: ".R17 > .pin2",
            schX: 7.4,
            schY: 1,
            direction: "right",
            schSheetName: props.schSheetName,
          },
          {
            name: "OSCILLATIONS",
            connectsTo: [
              ".U2 > .OUT_C",
              ".R10 > .pin2",
              ".C10 > .pin2",
              ".U2C > .pin7",
            ],
            schX: 11.5,
            schY: 1,
            direction: "right",
            schSheetName: props.schSheetName,
          },
          {
            name: "IBIAS_FB",
            connectsTo: ".U2 > .IN_NEG_D",
            schX: pressureX(-19.6),
            schY: pressureY(-16.4),
            direction: "left",
            schSheetName: sensorSheetName,
          },
          {
            name: "IBIAS_SET",
            connectsTo: [".U2 > .IN_POS_D", ".R18 > .pin2", ".R21 > .pin1"],
            schX: pressureX(-19.6),
            schY: pressureY(-16.7),
            direction: "left",
            schSheetName: sensorSheetName,
          },
        ]}
      />
    </subcircuit>
  );
};

export default AnalogSignalConditioning_LMV324A_TIDA010266;
