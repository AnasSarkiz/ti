import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TPS7A20 } from "../chips/TPS7A20.circuit.tsx";

/** TPS7A20 3.3 V LDO typical application with 1 uF input/output capacitors. */
export const PowerManagement_TPS7A20 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <TPS7A20
      name="U1"
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
      schX={-2.5}
      schY={0.1}
      schOrientation="vertical"
      connections={{ pin1: "net.VIN", pin2: "net.GND" }}
    />

    <capacitor
      name="COUT"
      capacitance="1uF"
      footprint="0402"
      schX={2.5}
      schY={0.1}
      schOrientation="vertical"
      connections={{ pin1: "net.VOUT_3V3", pin2: "net.GND" }}
    />
  </subcircuit>
);

export default PowerManagement_TPS7A20;
