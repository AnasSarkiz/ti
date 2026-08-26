import type { SubcircuitProps } from "@tscircuit/props";
import { FW4000044Q } from "../chips/FW4000044Q.circuit.tsx";

/**
 * TIDEP-01024 AOP_IO 40 MHz crystal section (Y1, C14, and C71).
 *
 * Coordinate transform from PROC106A1_AOP_IO.SchDoc:
 *   schX = (sourceX - 275) * 0.0254
 *   schY = (sourceY - 870) * 0.0254
 */
export const RadarClock_FW4000044Q = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <schematictext
      text="40MHz CRYSTAL"
      schX={-1.9}
      schY={1.55}
      fontSize={0.46}
      anchor="center"
    />

    <FW4000044Q name="Y1" schX={0} schY={0} />
    <capacitor
      name="C14"
      capacitance="4.7pF"
      footprint="0201"
      schX={-2.921}
      schY={-0.381}
      schRotation={270}
    />
    <capacitor
      name="C71"
      capacitance="4.7pF"
      footprint="0201"
      schX={2.667}
      schY={-0.381}
      schRotation={270}
    />

    <trace
      name="XTAL_P"
      path={[".Y1 > .XTAL_P", ".C14 > .pin1", "net.AR_XTAL_P"]}
      schDisplayLabel="AR_XTAL_P"
    />
    <trace
      name="XTAL_N"
      path={[".Y1 > .XTAL_N", ".C71 > .pin1", "net.AR_XTAL_N"]}
      schDisplayLabel="AR_XTAL_N"
    />
    <trace name="XTAL_CASE_GND_LEFT" from=".Y1 > .CASE_1" to=".C14 > .pin2" />
    <trace name="XTAL_CASE_GND_RIGHT" from=".Y1 > .CASE_2" to=".C71 > .pin2" />

    <netlabel
      net="GND"
      schX={-2.921}
      schY={-1.27}
      anchorSide="top"
      connectsTo=".C14 > .pin2"
    />
    <netlabel
      net="GND"
      schX={2.667}
      schY={-1.27}
      anchorSide="top"
      connectsTo=".C71 > .pin2"
    />

    <schematictext
      text="Avoid stubs on XTAL pins."
      schX={0}
      schY={-1.78}
      fontSize={0.24}
      anchor="center"
    />
    <port name="INTERFACE_AR_XTAL_P" connectsTo="net.AR_XTAL_P" />
    <port name="INTERFACE_AR_XTAL_N" connectsTo="net.AR_XTAL_N" />
    <port name="INTERFACE_GND" connectsTo="net.GND" />
  </subcircuit>
);

export default RadarClock_FW4000044Q;
