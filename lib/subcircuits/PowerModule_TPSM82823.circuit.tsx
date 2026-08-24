import { TPSM82823 } from "../chips/TPSM82823.circuit.tsx";
import type { SubcircuitProps } from "@tscircuit/props";

export const PowerModule_TPSM82823 = (props: SubcircuitProps) => (
  <subcircuit width={100} height={100} {...props}>
    <TPSM82823
      schX={0}
      schY={0}
      name="U1"
      connections={{
        pin1: "net.Vin",
        pin2: "net.Vin",
        pin3: "net.Vin",
        pin4: "net.PG",
        pin5: "net.Vout",
        pin6: "net.Vout",
        pin7: "net.Vout",
        pin8: "net.FB",
        pin9: "net.GND",
        pin10: "net.GND",
      }}
    />

    <capacitor
      schX={-2.5}
      schY={0.4}
      name="C1"
      schRotation={-90}
      capacitance="4.7µF"
      footprint="0402"
    />
    <trace from="net.Vin" to=".C1 > .pin1" />
    <trace from=".C1 > .pin2" to="net.GND" />

    <resistor
      name="R1"
      resistance="200k"
      footprint="0402"
      schX={2}
      schY={0.25}
      schRotation={90}
    />
    <trace from=".R1 > .pin2" to="net.Vout" />
    <trace from=".R1 > .pin1" to="net.FB" />

    <resistor
      name="R2"
      resistance="100k"
      footprint="0402"
      schX={2}
      schY={-1.1}
      schRotation={90}
    />
    <trace from=".R2 > .pin1" to="net.GND" />
    <trace from=".R2 > .pin2" to="net.FB" />

    <capacitor
      name="C3"
      capacitance="120pF"
      footprint="0402"
      schX={3.5}
      schY={0.25}
      schRotation={90}
    />
    <trace from=".C3 > .pin1" to="net.FB" />
    <trace from=".C3 > .pin2" to="net.Vout" />

    <capacitor
      name="C2"
      capacitance="20µF"
      footprint="0805"
      schX={5.7}
      schY={0.2}
      schRotation={90}
    />
    <trace from=".C2 > .pin2" to="net.Vout" />
    <trace from=".C2 > .pin1" to="net.GND" />

    <resistor
      name="R3"
      resistance="100k"
      footprint="0402"
      schX={4.5}
      schY={0.25}
      schRotation={90}
    />
    <trace from=".R3 > .pin2" to="net.Vout" />
    <trace from=".R3 > .pin1" to="net.PG" />
  </subcircuit>
);

export default PowerModule_TPSM82823;
