import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { DRV5013ADQDBZRQ1 } from "../chips/DRV5013ADQDBZRQ1.circuit.tsx";

/**
 * PR #116 established this TIDA-01389 source scale. Every component center
 * below uses one source-to-schematic transform, with the Hall-encoder box
 * center as the origin:
 *
 *   schX = (sourceX - 185) * 0.018278145
 *   schY = (sourceY - 215) * 0.018278145
 *
 * Child-group coordinates are the transformed global point minus the
 * transformed child center. This is only an algebraic change of origin; no
 * component is manually re-laid out.
 */
const SOURCE_SCALE = 0.018278145;
const SOURCE_ORIGIN = { x: 185, y: 215 } as const;

type Point = { x: number; y: number };

const sourceToSchematic = (x: number, y: number): Point => ({
  x: (x - SOURCE_ORIGIN.x) * SOURCE_SCALE,
  y: (y - SOURCE_ORIGIN.y) * SOURCE_SCALE,
});

const HALL_ENCODER_CENTER = sourceToSchematic(185, 215);
const CONNECTOR_CENTER = sourceToSchematic(160, 525);

/**
 * The native tscircuit text extents are slightly larger than Altium's. Keep
 * the source lower edges (and their title spacing) fixed, then extend only the
 * outer sides and top by source-grid clearance so no native label touches a
 * dashed section boundary. Component centers remain unchanged.
 */
const SECTION_SIDE_CLEARANCE = 10;
const SECTION_TOP_CLEARANCE = 20;

const inChild = (x: number, y: number, childCenter: Point): Point => {
  const transformed = sourceToSchematic(x, y);
  return {
    x: transformed.x - childCenter.x,
    y: transformed.y - childCenter.y,
  };
};

const inHallEncoder = (x: number, y: number) =>
  inChild(x, y, HALL_ENCODER_CENTER);
const inConnector = (x: number, y: number) => inChild(x, y, CONNECTOR_CENTER);
const asSchematicPosition = ({ x, y }: Point) => ({ schX: x, schY: y });

type HallSensorChannelProps = SubcircuitProps & {
  sensorName: "U5" | "U6";
  capacitorName: "C13" | "C14";
  pullupName: "R14" | "R15";
  sensorCenter: Point;
  capacitorCenter: Point;
  pullupCenter: Point;
  supplyRouteY: number;
  outputNetName: "HALL_1" | "HALL_2";
};

/**
 * Each Hall-device and decoupling-capacitor ground pin uses an ordinary trace
 * to the local ground net so tscircuit renders its native ground symbol.
 */
const HallSensorChannel = ({
  sensorName,
  capacitorName,
  pullupName,
  sensorCenter,
  capacitorCenter,
  pullupCenter,
  supplyRouteY,
  outputNetName,
  ...props
}: HallSensorChannelProps) => (
  <subcircuit schMaxTraceDistance="1mm" routingDisabled {...props}>
    <net name="GND" isGroundNet />
    <net name="VCC" isPowerNet />
    <net name={outputNetName} />

    <DRV5013ADQDBZRQ1
      name={sensorName}
      schX={sensorCenter.x}
      schY={sensorCenter.y}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: [1] },
        rightSide: { direction: "top-to-bottom", pins: [2, 3] },
      }}
    />
    <capacitor
      name={capacitorName}
      capacitance="0.1uF"
      footprint="0402"
      schX={capacitorCenter.x}
      schY={capacitorCenter.y}
      schOrientation="vertical"
    />
    <resistor
      name={pullupName}
      resistance="10kohm"
      footprint="0402"
      schX={pullupCenter.x}
      schY={pullupCenter.y}
      schRotation="90deg"
    />

    <trace
      name={`${sensorName}_VCC`}
      from={`${capacitorName}.pin1`}
      to={`${sensorName}.VCC`}
      schematicRouteHints={[
        inHallEncoder(60, supplyRouteY),
        inHallEncoder(100, supplyRouteY),
      ]}
    />
    <trace from={`${capacitorName}.pin1`} to="net.VCC" />
    <trace name={`${sensorName}_GND`} from={`${sensorName}.GND`} to="net.GND" />
    <trace
      name={`${capacitorName}_GND`}
      from={`${capacitorName}.pin2`}
      to="net.GND"
    />
    <trace
      name={`${outputNetName}_PULLUP_NODE`}
      from={`${sensorName}.OUT`}
      to={`${pullupName}.pin1`}
      schematicRouteHints={[
        inHallEncoder(260, supplyRouteY),
        inHallEncoder(270, supplyRouteY),
      ]}
    />
    <trace from={`${pullupName}.pin1`} to={`net.${outputNetName}`} />
    <trace from={`${pullupName}.pin2`} to="net.VCC" />

    <port name="VCC" direction="left" connectsTo="net.VCC" />
    <port name="GND" direction="left" connectsTo="net.GND" />
    <port name="HALL" direction="right" connectsTo={`net.${outputNetName}`} />
  </subcircuit>
);

/**
 * The two-channel Hall encoder box from TIDA-01389. U6 generates HALL_1 and
 * U5 generates HALL_2. TIDA-01389 is used because the Window Module Position
 * Feedback reference-design tab is empty, while TI identifies this closely
 * related window-lift design as the official two-sensor position encoder.
 */
export const HallEncoder_DRV5013 = (props: SubcircuitProps) => {
  const u6 = inHallEncoder(180, 280);
  const u5 = inHallEncoder(180, 140);
  const c13 = inHallEncoder(60, 275);
  const c14 = inHallEncoder(60, 135);
  const r14 = inHallEncoder(270, 310);
  const r15 = inHallEncoder(270, 170);

  return (
    <subcircuit schMaxTraceDistance="12mm" routingDisabled {...props}>
      <net name="GND" isGroundNet />
      <net name="VCC" isPowerNet />
      <net name="HALL_1" />
      <net name="HALL_2" />

      <schematicbox
        name="HALL_ENCODER_SECTION"
        {...asSchematicPosition(inHallEncoder(185, 225))}
        width={(290 + 2 * SECTION_SIDE_CLEARANCE) * SOURCE_SCALE}
        height={(270 + SECTION_TOP_CLEARANCE) * SOURCE_SCALE}
        strokeStyle="dashed"
      />
      <schematictext
        {...asSchematicPosition(inHallEncoder(190, 60))}
        text="HALL ENCODER"
        fontSize={0.3}
      />

      <HallSensorChannel
        name="hall1"
        schX={0}
        schY={0}
        sensorName="U6"
        capacitorName="C13"
        pullupName="R14"
        sensorCenter={u6}
        capacitorCenter={c13}
        pullupCenter={r14}
        supplyRouteY={290}
        outputNetName="HALL_1"
      />
      <HallSensorChannel
        name="hall2"
        schX={0}
        schY={0}
        sensorName="U5"
        capacitorName="C14"
        pullupName="R15"
        sensorCenter={u5}
        capacitorCenter={c14}
        pullupCenter={r15}
        supplyRouteY={150}
        outputNetName="HALL_2"
      />
      <trace from=".hall1 > .VCC" to="net.VCC" />
      <trace from=".hall1 > .GND" to="net.GND" />
      <trace from=".hall1 > .HALL" to="net.HALL_1" />
      <trace from=".hall2 > .VCC" to="net.VCC" />
      <trace from=".hall2 > .GND" to="net.GND" />
      <trace from=".hall2 > .HALL" to="net.HALL_2" />

      <port name="HALL_VCC" direction="left" connectsTo="net.VCC" />
      <port name="HALL_GND" direction="left" connectsTo="net.GND" />
      <port name="HALL_1" direction="right" connectsTo="net.HALL_1" />
      <port name="HALL_2" direction="right" connectsTo="net.HALL_2" />
    </subcircuit>
  );
};

/** Hall-related pins and VCC feed from the TIDA-01389 I/O connector box. */
export const PositionFeedbackConnector_TIDA01389 = (props: SubcircuitProps) => {
  const j1 = inConnector(150, 475);
  const j2 = inConnector(190, 475);
  const j4 = inConnector(200, 610);
  const r9 = inConnector(100, 530);

  return (
    <subcircuit schMaxTraceDistance="10mm" routingDisabled {...props}>
      <net name="GND" isGroundNet />
      <net name="VCC" isPowerNet />
      <net name="V_BAT" isPowerNet={false} />
      <net name="HALL_1" />
      <net name="HALL_2" />

      <schematicbox
        name="POSITION_FEEDBACK_CONNECTOR_SECTION"
        {...asSchematicPosition(inConnector(160, 535))}
        width={(240 + 2 * SECTION_SIDE_CLEARANCE) * SOURCE_SCALE}
        height={(230 + SECTION_TOP_CLEARANCE) * SOURCE_SCALE}
        strokeStyle="dashed"
      />
      <schematictext
        {...asSchematicPosition(inConnector(160, 390))}
        text="INPUTS AND OUTPUTS"
        fontSize={0.3}
      />

      <pinheader
        name="J1"
        pinCount={10}
        gender="female"
        pitch="2.54mm"
        schX={j1.x}
        schY={j1.y}
        schFacingDirection="left"
      />
      <pinheader
        name="J2"
        pinCount={10}
        gender="female"
        pitch="2.54mm"
        schX={j2.x}
        schY={j2.y}
        schFacingDirection="right"
      />
      <pinheader
        name="J4"
        pinCount={2}
        gender="female"
        pitch="3.81mm"
        schX={j4.x}
        schY={j4.y}
        schFacingDirection="left"
        schPinArrangement={{
          leftSide: { direction: "bottom-to-top", pins: [1, 2] },
        }}
      />

      <resistor
        name="R9"
        resistance="0ohm"
        footprint="0603"
        schX={r9.x}
        schY={r9.y}
        schRotation="180deg"
      />
      <trace
        name="VCC_CONNECTOR_FEED"
        from="R9.pin1"
        to="J1.pin1"
        schematicRouteHints={[inConnector(120, 530), inConnector(120, 520)]}
      />
      <trace from="R9.pin2" to="net.VCC" />
      <trace name="J2_GND" from="J2.pin1" to="net.GND" />
      <trace from="J2.pin6" to="net.HALL_1" />
      <trace from="J2.pin7" to="net.HALL_2" />
      <trace name="J4_GND" from="J4.pin1" to="net.GND" />
      <trace
        name="J4_VBAT"
        path={["J4.pin2", ".V_BAT", "net.V_BAT"]}
        schDisplayLabel="V_BAT"
        schematicRouteHints={[inConnector(130, 610)]}
      />

      <port name="VCC" direction="left" connectsTo="net.VCC" />
      <port
        name="V_BAT"
        direction="right"
        connectsTo="net.V_BAT"
        {...asSchematicPosition(inConnector(130, 610))}
      />
      <port name="GND" direction="left" connectsTo="net.GND" />
      <port name="HALL_1" direction="right" connectsTo="net.HALL_1" />
      <port name="HALL_2" direction="right" connectsTo="net.HALL_2" />
    </subcircuit>
  );
};

/**
 * Complete TIDA-01389 two-channel Hall position-feedback subsystem.
 *
 * Local schematic subcircuit scopes let the native solver place GND and V_BAT
 * text inline on their physical traces. Explicit parent traces preserve the
 * shared end-to-end nets across those scopes. DRV8703 and H-bridge circuitry
 * are intentionally excluded and remain the separate scope of PR #116.
 */
export const PositionFeedback_DRV5013 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props}>
    <net name="GND" isGroundNet />
    <net name="VCC" isPowerNet />
    <net name="V_BAT" isPowerNet />
    <net name="HALL_1" />
    <net name="HALL_2" />
    <HallEncoder_DRV5013
      name="hallEncoder"
      schX={HALL_ENCODER_CENTER.x}
      schY={HALL_ENCODER_CENTER.y}
    />
    <PositionFeedbackConnector_TIDA01389
      name="connector"
      schX={CONNECTOR_CENTER.x}
      schY={CONNECTOR_CENTER.y}
    />
    <trace from=".hallEncoder > .HALL_VCC" to="net.VCC" />
    <trace from=".hallEncoder > .HALL_GND" to="net.GND" />
    <trace from=".hallEncoder > .HALL_1" to="net.HALL_1" />
    <trace from=".hallEncoder > .HALL_2" to="net.HALL_2" />
    <trace from=".connector > .VCC" to="net.VCC" />
    <trace from=".connector > .V_BAT" to="net.V_BAT" />
    <trace from=".connector > .GND" to="net.GND" />
    <trace from=".connector > .HALL_1" to="net.HALL_1" />
    <trace from=".connector > .HALL_2" to="net.HALL_2" />
    <port name="VCC" direction="left" connectsTo="net.VCC" />
    <port name="V_BAT" direction="left" connectsTo="net.V_BAT" />
    <port name="GND" direction="left" connectsTo="net.GND" />
    <port name="HALL_1" direction="right" connectsTo="net.HALL_1" />
    <port name="HALL_2" direction="right" connectsTo="net.HALL_2" />
  </subcircuit>
);

export default PositionFeedback_DRV5013;
