import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TLV755P } from "../chips/TLV755P.circuit.tsx";

/** TLV755P 3.3 V LDO typical application with 1 uF input/output capacitors. */
export const PowerManagement_TLV755P = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <TLV755P
      name="U1"
      displayName="TLV755P"
      schX={0}
      schY={0}
      connections={{
        pin1: "net.VIN",
        pin2: "net.GND",
        pin3: "net.EN",
        pin5: "net.VOUT_3V3",
      }}
    />

    <capacitor
      name="CIN"
      capacitance="1uF"
      footprint="0402"
      schX={-3.4}
      schY={0.4}
      schOrientation="vertical"
      connections={{ pin1: "net.VIN", pin2: "net.GND" }}
    />

    <capacitor
      name="COUT"
      capacitance="1uF"
      footprint="0402"
      schX={3.4}
      schY={0.4}
      schOrientation="vertical"
      connections={{ pin1: "net.VOUT_3V3", pin2: "net.GND" }}
    />

    <schematicline x1={-2.7} y1={-1.3} x2={-2.7} y2={-1.5} strokeWidth={0.02} />

    <schematicline x1={-2.7} y1={-1.3} x2={-2.3} y2={-1.3} strokeWidth={0.02} />
    <schematicline x1={-3.1} y1={-1.5} x2={-2.7} y2={-1.5} strokeWidth={0.02} />
    <schematictext text="ON" schX={-2.5} schY={-1.1} fontSize={0.2} />
    <schematictext text="OFF" schX={-3} schY={-1.4} fontSize={0.2} />
  </subcircuit>
);

export default PowerManagement_TLV755P;
