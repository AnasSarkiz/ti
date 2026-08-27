import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { SN74LVC1G34DBVR } from "../chips/SN74LVC1G34DBVR.circuit.tsx";

/**
 * SN74LVC1G34 datasheet Figure 8-1 "Buffer Function" application.
 * @see https://www.ti.com/lit/gpn/SN74LVC1G34
 */
export const LogicBuffer_SN74LVC1G34 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props}>
    <SN74LVC1G34DBVR
      name="U1"
      schX={0}
      schY={0}
      connections={{
        pin2: "net.MCU_OR_LOGIC_IN",
        pin4: "net.MCU_OR_LOGIC_OUT",
        pin5: "net.VCC",
        pin3: "net.GND",
      }}
    />
    <schematictext
      text="Buffer Function"
      schX={-0.55}
      schY={1.3}
      fontSize={0.2}
    />
  </subcircuit>
);

export default LogicBuffer_SN74LVC1G34;
