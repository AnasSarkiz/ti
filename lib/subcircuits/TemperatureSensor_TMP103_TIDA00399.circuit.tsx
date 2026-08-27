import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";

const TMP103_PIN_LABELS = {
  pin1: ["SDA"],
  pin2: ["SCL"],
  pin3: ["GND"],
  pin4: ["V_PLUS", "VCC"],
} as const;

/**
 * TMP103 temperature-sensing subcircuit from TI TIDA-00399, sheet 8.
 * RPU1 and RPU2 are the reference design's optional (DNP) I2C pull-ups.
 * @see https://www.ti.com/tool/TIDA-00399
 */
export const TemperatureSensor_TMP103_TIDA00399 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props}>
    <chip
      name="UTMP"
      manufacturerPartNumber="TMP103AYFF"
      pinLabels={TMP103_PIN_LABELS}
      showPinAliases={false}
      schX={1.2}
      schY={0}
      schWidth={1.4}
      schHeight={0.6}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["SCL", "SDA"] },
        rightSide: { direction: "top-to-bottom", pins: ["V_PLUS", "GND"] },
      }}
      connections={{
        GND: "net.GND",
      }}
    />

    <resistor
      name="RPU1"
      resistance="10kohm"
      doNotPlace
      schX={-1.4}
      schY={2}
      schRotation={90}
      connections={{ pin1: "UTMP.SCL", pin2: "RPU2.pin2" }}
    />
    <resistor
      name="RPU2"
      resistance="10kohm"
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
