import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TPS7A2028PDBVR } from "../chips/TPS7A2028PDBVR.circuit.tsx";

/** TPS7A2028 2.8 V LDO typical application with 1 uF input/output capacitors. */
export const PowerManagement_TPS7A2028 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <TPS7A2028PDBVR
      name="U1"
      schX={0}
      schY={0}
      connections={{
        pin1: "net.VIN",
        pin2: "net.GND",
        pin3: "net.EN",
        pin5: "net.VOUT_2V8",
      }}
    />

    <capacitor
      name="C1"
      capacitance="1uF"
      footprint="0402"
      schX={-2.5}
      schY={0.1}
      schOrientation="vertical"
      connections={{ pin1: "net.VIN", pin2: "net.GND" }}
    />

    <capacitor
      name="C2"
      capacitance="1uF"
      footprint="0402"
      schX={2.5}
      schY={0.1}
      schOrientation="vertical"
      connections={{ pin1: "net.VOUT_2V8", pin2: "net.GND" }}
    />
  </subcircuit>
);

export default PowerManagement_TPS7A2028;
