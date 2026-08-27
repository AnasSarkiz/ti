import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { DRV5013ADQDBZRQ1 } from "../chips/DRV5013ADQDBZRQ1.circuit.tsx";

/**
 * TIDA-01389 Altium component origins, cropped around the HALL ENCODER block.
 *
 * The crop origin is the midpoint between U5 and U6 (3087 mil, 2624 mil).
 * Relative positions and rotations are unchanged from the supplied PcbDoc.
 */
const pcbPlacement = {
  U5: { pcbX: -4.953, pcbY: 0, pcbRotation: 0 },
  U6: { pcbX: 4.953, pcbY: 0, pcbRotation: 180 },
  C13: { pcbX: -8.001, pcbY: 0.95001, pcbRotation: 180 },
  C14: { pcbX: 8.001, pcbY: -0.95001, pcbRotation: 0 },
  R14: { pcbX: 8.001, pcbY: 0.94999, pcbRotation: 0 },
  R15: { pcbX: -8.001, pcbY: -0.94999, pcbRotation: 180 },
} as const;

/**
 * TIDA-01389 SchDoc placement normalized about (180, 210).
 *
 * Altium component centers/origins:
 * U6 (180, 280), U5 (180, 140), C13 (60, 270), C14 (60, 130),
 * R14 (270, 310), R15 (270, 170). One Altium grid unit is represented
 * by 0.02 schematic units. R14/R15 are nudged for terminal alignment with
 * tscircuit's resistor symbol geometry.
 */
const schematicPlacement = {
  U6: { schX: 0, schY: 1.4 },
  U5: { schX: 0, schY: -1.4 },
  C13: { schX: -2.5, schY: 1.2, schRotation: 270 },
  C14: { schX: -2.5, schY: -1.6, schRotation: 270 },
  R14: { schX: 2.2, schY: 2.1, schRotation: 90 },
  R15: { schX: 2.2, schY: -0.7, schRotation: 90 },
} as const;

/** Exact DBZ0003A_N copper from the TIDA-01389 Altium footprint. */
const Dbz0003aFootprint = () => (
  <footprint>
    <smtpad
      portHints={["pin1", "VCC"]}
      pcbX="-1.2mm"
      pcbY="-0.95mm"
      width="0.6mm"
      height="1mm"
      shape="rect"
    />
    <smtpad
      portHints={["pin2", "OUT"]}
      pcbX="-1.2mm"
      pcbY="0.95mm"
      width="0.6mm"
      height="1mm"
      shape="rect"
    />
    <smtpad
      portHints={["pin3", "GND"]}
      pcbX="1.2mm"
      pcbY="0mm"
      width="0.6mm"
      height="1mm"
      shape="rect"
    />
    <silkscreenpath
      route={[
        { x: -0.9, y: -1.1 },
        { x: 0.9, y: -1.1 },
        { x: 0.9, y: 1.1 },
        { x: -0.9, y: 1.1 },
      ]}
    />
    <courtyardrect width="3.85mm" height="3.5mm" />
  </footprint>
);

/** Exact 0402L pad geometry used by C13/C14 and R14/R15 in Altium. */
const Altium0402Footprint = () => (
  <footprint>
    <smtpad
      portHints={["pin1"]}
      pcbX="-0.5mm"
      pcbY="0mm"
      width="0.5mm"
      height="0.6mm"
      shape="rect"
    />
    <smtpad
      portHints={["pin2"]}
      pcbX="0.5mm"
      pcbY="0mm"
      width="0.5mm"
      height="0.6mm"
      shape="rect"
    />
    <courtyardrect width="1.8mm" height="0.7mm" />
  </footprint>
);

const HallSensor = ({
  name,
  schX,
  schY,
  pcbX,
  pcbY,
  pcbRotation,
}: {
  name: "U5" | "U6";
  schX: number;
  schY: number;
  pcbX: number;
  pcbY: number;
  pcbRotation: number;
}) => (
  <DRV5013ADQDBZRQ1
    name={name}
    schX={schX}
    schY={schY}
    schWidth={2.4}
    schHeight={1.2}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: [1] },
      rightSide: { direction: "top-to-bottom", pins: [2, 3] },
    }}
    schPinStyle={{
      pin2: { marginBottom: 0.32 },
    }}
    showPinAliases={false}
    pcbX={pcbX}
    pcbY={pcbY}
    pcbRotation={pcbRotation}
    footprint={<Dbz0003aFootprint />}
  />
);

/**
 * Position-feedback subsection extracted from the TIDA-01389 reference.
 *
 * Scope: the complete two-channel HALL ENCODER box only. VCC/GND are supplied
 * by the seat module and HALL_1/HALL_2 continue to the MCU. The reference
 * design's connectors, LDO, protection/filter, DRV8703 and H-bridge are outside
 * this functional block.
 */
export const PositionFeedback_DRV5013_TIDA01389 = (props: SubcircuitProps) => (
  <subcircuit
    width="22mm"
    height="8mm"
    minTraceWidth="0.254mm"
    schMaxTraceDistance="1mm"
    {...props}
  >
    <net name="GND" isGroundNet />
    <net name="VCC" isPowerNet />

    <group name="ReferenceCropBreakouts">
      <breakoutpoint connection="net.VCC" pcbX={-10.5} pcbY={-1.52442} />
      <breakoutpoint connection=".R14 > .pin1" pcbX={10.5} pcbY={0} />
      <breakoutpoint connection=".R15 > .pin1" pcbX={10.5} pcbY={0.73661} />
    </group>

    <HallSensor name="U6" {...schematicPlacement.U6} {...pcbPlacement.U6} />
    <capacitor
      name="C13"
      capacitance="0.1uF"
      manufacturerPartNumber="GRM155R61H104ME14D"
      footprint={<Altium0402Footprint />}
      {...schematicPlacement.C13}
      {...pcbPlacement.C13}
    />
    <resistor
      name="R14"
      resistance="10kohm"
      manufacturerPartNumber="CRCW040210K0JNED"
      footprint={<Altium0402Footprint />}
      {...schematicPlacement.R14}
      {...pcbPlacement.R14}
    />

    <trace name="U6_VCC" from=".U6 > .VCC" to="net.VCC" schDisplayLabel="VCC" />
    <trace
      name="C13_VCC"
      from=".C13 > .pin1"
      to="net.VCC"
      schDisplayLabel="VCC"
    />
    <trace
      name="R14_VCC"
      from=".R14 > .pin2"
      to="net.VCC"
      schDisplayLabel="VCC"
    />
    <trace
      name="HALL_1_OUTPUT"
      path={[".U6 > .OUT", ".R14 > .pin1", "net.HALL_1"]}
      schDisplayLabel="HALL_1"
    />
    <trace name="U6_GND" from=".U6 > .GND" to="net.GND" schDisplayLabel="GND" />
    <trace
      name="C13_GND"
      from=".C13 > .pin2"
      to="net.GND"
      schDisplayLabel="GND"
    />

    <HallSensor name="U5" {...schematicPlacement.U5} {...pcbPlacement.U5} />
    <capacitor
      name="C14"
      capacitance="0.1uF"
      manufacturerPartNumber="GRM155R61H104ME14D"
      footprint={<Altium0402Footprint />}
      {...schematicPlacement.C14}
      {...pcbPlacement.C14}
    />
    <resistor
      name="R15"
      resistance="10kohm"
      manufacturerPartNumber="CRCW040210K0JNED"
      footprint={<Altium0402Footprint />}
      {...schematicPlacement.R15}
      {...pcbPlacement.R15}
    />

    <trace name="U5_VCC" from=".U5 > .VCC" to="net.VCC" schDisplayLabel="VCC" />
    <trace
      name="C14_VCC"
      from=".C14 > .pin1"
      to="net.VCC"
      schDisplayLabel="VCC"
    />
    <trace
      name="R15_VCC"
      from=".R15 > .pin2"
      to="net.VCC"
      schDisplayLabel="VCC"
    />
    <trace
      name="HALL_2_OUTPUT"
      path={[".U5 > .OUT", ".R15 > .pin1", "net.HALL_2"]}
      schDisplayLabel="HALL_2"
    />
    <trace name="U5_GND" from=".U5 > .GND" to="net.GND" schDisplayLabel="GND" />
    <trace
      name="C14_GND"
      from=".C14 > .pin2"
      to="net.GND"
      schDisplayLabel="GND"
    />
  </subcircuit>
);

export default PositionFeedback_DRV5013_TIDA01389;
