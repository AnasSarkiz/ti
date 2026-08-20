import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TMP1827 } from "../chips/TMP1827.circuit.tsx";

export const TemperatureSensor_TMP1827 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <schematictext
      schX={2}
      schY={5}
      text="TMP1827 Multi-Drop Bus"
      fontSize={0.4}
    />

    <resistor
      name="RPU"
      resistance="3k"
      footprint="0402"
      pcbX={-4}
      pcbY={0}
      schX={-2.5}
      schY={3.4}
      schOrientation="vertical"
    />

    <TMP1827
      name="U2"
      pcbX={0}
      pcbY={0}
      schX={2}
      schY={0}
      noConnect={["ADDR", "IO3", "IO0", "IO1", "IO2_ALERT"]}
    />

    <TMP1827
      name="U3"
      pcbX={4}
      pcbY={0}
      schX={6}
      schY={0}
      noConnect={["ADDR", "IO3", "IO0", "IO1", "IO2_ALERT"]}
    />
    <trace
      name="vdd_pullup_to_u2"
      from="RPU.pin1"
      to="U2.VDD"
      pcbStraightLine
    />
    <trace name="vdd_u2_to_u3" from="U2.VDD" to="U3.VDD" pcbStraightLine />
    <trace name="vdd_external" from="RPU.pin1" to="net.VDD" />

    <trace
      name="sdq_pullup_to_u2"
      from="RPU.pin2"
      to="U2.SDQ"
      pcbStraightLine
    />
    <trace name="sdq_u2_to_u3" from="U2.SDQ" to="U3.SDQ" pcbStraightLine />
    <trace name="sdq_external" from="RPU.pin2" to="net.SDQ_BUS" />

    <trace name="ground_u2_to_u3" from="U2.GND" to="U3.GND" pcbStraightLine />
    <trace name="ground_external" from="U2.GND" to="net.GND" />
    <schematictext schX={2} schY={0} text="TMP1827" fontSize={0.2} />
    <schematictext schX={2} schY={-2.2} text="VDD Powered" fontSize={0.2} />
    <schematictext schX={6} schY={-2.2} text="BUS Powered" fontSize={0.2} />

    <schematictext schX={6} schY={0} text="TMP1827" fontSize={0.2} />
  </subcircuit>
);

export default TemperatureSensor_TMP1827;
