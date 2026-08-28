import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TMP103AYFF } from "../chips/TMP103AYFF.circuit.tsx";

/**
 * TMP103 temperature-sensing subcircuit from TI TIDA-00399, sheet 8.
 * RPU1 and RPU2 are the reference design's optional (DNP) I2C pull-ups.
 * @see https://www.ti.com/tool/TIDA-00399
 */
export const TemperatureSensor_TMP103_TIDA00399 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props}>
    <TMP103AYFF
      name="UTMP"
      schX={1.2}
      schY={0}
      connections={{
        GND: "net.GND",
      }}
    />

    <resistor
      name="RPU1"
      resistance="10kohm"
      footprint="0402"
      doNotPlace
      schX={-1.4}
      schY={2}
      schRotation={90}
      connections={{ pin1: "UTMP.SCL", pin2: "RPU2.pin2" }}
    />
    <resistor
      name="RPU2"
      resistance="10kohm"
      footprint="0402"
      doNotPlace
      schX={-0.2}
      schY={2}
      schRotation={90}
      connections={{
        pin1: "UTMP.SDA",
        pin2: ["UTMP.V_PLUS", "net.V3P3"],
      }}
    />
  </subcircuit>
);

export default TemperatureSensor_TMP103_TIDA00399;
