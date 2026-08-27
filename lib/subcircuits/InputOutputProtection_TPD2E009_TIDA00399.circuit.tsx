import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TPD2E009DRTR } from "../chips/TPD2E009DRTR.circuit.tsx";

/**
 * TPD2E009 differential-line ESD protection from TIDA-00399 sheet 9.
 * @see https://www.ti.com/tool/TIDA-00399
 */
export const InputOutputProtection_TPD2E009_TIDA00399 = (
  props: SubcircuitProps,
) => (
  <subcircuit routingDisabled {...props}>
    <TPD2E009DRTR
      name="UESD"
      schX={0}
      schY={0}
      connections={{
        pin1: "net.SATA_P",
        pin2: "net.SATA_N",
        pin3: "net.GND",
      }}
    />
  </subcircuit>
);

export default InputOutputProtection_TPD2E009_TIDA00399;
