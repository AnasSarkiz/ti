import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";

const TPS25910RSA_PIN_LABELS = {
  pin1: ["IN1"],
  pin2: ["IN2"],
  pin3: ["IN3"],
  pin4: ["GATE"],
  pin5: ["GND1"],
  pin6: ["GND2"],
  pin7: ["ILIM"],
  pin8: ["GND3"],
  pin9: ["GND4"],
  pin10: ["OUT1"],
  pin11: ["OUT2"],
  pin12: ["OUT3"],
  pin13: ["GND5"],
  pin14: ["GND6"],
  pin15: ["FLT_NOT"],
  pin16: ["EN_NOT"],
  pin17: ["PWPD"],
} as const;

/**
 * TIDA-00890 sheet-3 VBUS input-protection stage.
 *
 * Includes the TPS25910 eFuse, CSD17313Q2 external FET, VBUS clamp and
 * discharge, fault/enable pull-ups, current limit, slew capacitor, and input
 * bulk capacitor exactly as shown in TI's reference.
 * @see https://www.ti.com/tool/TIDA-00890
 */
export const InputPowerProtection_TPS25910_TIDA00890 = (
  props: SubcircuitProps,
) => (
  <subcircuit routingDisabled schMaxTraceDistance="3.6mm" {...props}>
    <chip
      name="U7"
      manufacturerPartNumber="TPS25910RSA"
      pinLabels={TPS25910RSA_PIN_LABELS}
      showPinAliases={false}
      schX={3.15}
      schY={0.03}
      schWidth={2}
      schHeight={1.8}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [
            "EN_NOT",
            "FLT_NOT",
            "OUT1",
            "OUT2",
            "OUT3",
            "GND6",
            "GND5",
            "GND4",
          ],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["IN1", "IN2", "IN3", "GATE", "GND1", "GND2", "GND3", "ILIM"],
        },
        bottomSide: { direction: "left-to-right", pins: ["PWPD"] },
      }}
    />

    <mosfet
      name="Q1"
      manufacturerPartNumber="CSD17313Q2"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
      schX={-1.4}
      schY={0.82}
    />

    <resistor
      name="R25"
      resistance="1Mohm"
      schX={-6.2}
      schY={0.87}
      schRotation={270}
    />
    <diode
      name="D6"
      manufacturerPartNumber="ESD5Z6.0T1G"
      variant="zener"
      schX={-4.6}
      schY={0.87}
      schRotation={90}
    />

    <resistor
      name="R23"
      resistance="200kohm"
      schX={0.35}
      schY={2.5}
      schRotation={90}
    />
    <resistor
      name="R24"
      resistance="10kohm"
      schX={1.55}
      schY={2.5}
      schRotation={90}
    />
    <resistor name="R34" resistance="0ohm" doNotPlace schX={1.15} schY={0.65} />

    <resistor
      name="R26"
      resistance="47kohm"
      schX={5.45}
      schY={-0.97}
      schRotation={270}
    />
    <capacitor
      name="C11"
      capacitance="47nF"
      schX={6.45}
      schY={-0.17}
      schOrientation="vertical"
    />
    <capacitor
      name="C10"
      capacitance="47uF"
      schX={7.75}
      schY={0.4}
      schOrientation="vertical"
    />

    {/* Type-C VBUS input rail, discharge resistor, and ESD clamp. */}
    <netlabel
      net="VBUS_IN"
      connectsTo={["R25.pin1", "D6.cathode", "Q1.drain"]}
      schX={-4.8}
      schY={2.3}
      anchorSide="bottom"
    />
    <netlabel
      net="GND"
      connectsTo="R25.pin2"
      schX={-6.2}
      schY={-0.85}
      anchorSide="top"
    />
    <netlabel
      net="GND"
      connectsTo="D6.anode"
      schX={-4.6}
      schY={-0.85}
      anchorSide="top"
    />

    {/* Q1 gate and protected VBUS output follow the reference left-to-right. */}
    <trace from="Q1.gate" to="U7.GATE" />
    <trace from="Q1.source" to="U7.OUT3" />
    <trace from="U7.OUT1" to="U7.OUT2" />
    <trace from="U7.OUT2" to="U7.OUT3" />

    {/* Pull-ups and logic nets use TI's displayed names. */}
    <netlabel
      net="V5_COM"
      connectsTo={["R23.pin2", "R24.pin2"]}
      schX={0.95}
      schY={3.0}
      anchorSide="bottom"
    />
    <netlabel
      net="USB_ID"
      connectsTo={["R23.pin1", "U7.EN_NOT"]}
      schX={0}
      schY={1.95}
      anchorSide="right"
    />
    <trace from="R24.pin1" to="U7.FLT_NOT" />
    <trace from="R24.pin1" to="R34.pin2" />
    <trace from="R34.pin1" to="net.VCONN_FLT" schDisplayLabel="VCONN_FLT" />

    {/* U7 input, gate, current-limit, and local ground rails. */}
    <netlabel
      net="V5_COM"
      connectsTo={["U7.IN1", "U7.IN2", "U7.IN3", "C10.pin1"]}
      schX={4.65}
      schY={3.0}
      anchorSide="bottom"
    />
    <trace from="U7.GATE" to="C11.pin1" />
    <trace from="U7.ILIM" to="R26.pin1" />

    <trace from="U7.GND1" to="U7.GND2" />
    <trace from="U7.GND2" to="U7.GND3" />
    <trace from="U7.GND3" to="R26.pin2" />
    <trace from="R26.pin2" to="C11.pin2" />
    <trace from="C11.pin2" to="C10.pin2" />
    <netlabel
      net="GND"
      connectsTo="R26.pin2"
      schX={5.45}
      schY={-1.65}
      anchorSide="top"
    />

    <trace from="U7.GND4" to="U7.GND5" />
    <trace from="U7.GND5" to="U7.GND6" />
    <trace from="U7.PWPD" to="R26.pin2" />
    <netlabel
      net="GND"
      connectsTo="U7.GND5"
      schX={1.55}
      schY={-1.9}
      anchorSide="top"
    />
  </subcircuit>
);

export default InputPowerProtection_TPS25910_TIDA00890;
