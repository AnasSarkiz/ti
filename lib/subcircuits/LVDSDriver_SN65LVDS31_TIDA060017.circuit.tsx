import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";

const SN65LVDS31_PIN_LABELS = {
  pin1: ["1A", "IN1"],
  pin2: ["1Y", "OUT1_P"],
  pin3: ["1Z", "OUT1_N"],
  pin4: ["G", "ENABLE"],
  pin5: ["2Z", "OUT2_N"],
  pin6: ["2Y", "OUT2_P"],
  pin7: ["2A", "IN2"],
  pin8: ["GND"],
  pin9: ["3A", "IN3"],
  pin10: ["3Y", "OUT3_P"],
  pin11: ["3Z", "OUT3_N"],
  pin12: ["G_NOT", "ENABLE_NOT"],
  pin13: ["4Z", "OUT4_N"],
  pin14: ["4Y", "OUT4_P"],
  pin15: ["4A", "IN4"],
  pin16: ["VCC"],
} as const;

/**
 * Four-channel LVDS line-driver half of TI TIDA-060017.
 *
 * Reproduces U1, R1-R4, and the VCC1 bypass bank (C1/C3/C4) from
 * "TIDA-060017 Schematic(SN65LVDS31_33)", omitting only test headers.
 * @see https://www.ti.com/tool/TIDA-060017
 */
export const LVDSDriver_SN65LVDS31_TIDA060017 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props}>
    <chip
      name="U1"
      manufacturerPartNumber="SN65LVDS31D"
      pinLabels={SN65LVDS31_PIN_LABELS}
      showPinAliases={false}
      schX={0}
      schY={0}
      schWidth={1.96}
      schHeight={1.8}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: ["1A", "1Y", "1Z", "G", "2Z", "2Y", "2A", "GND"],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["VCC", "4A", "4Y", "4Z", "G_NOT", "3Z", "3Y", "3A"],
        },
      }}
      connections={{
        IN1: "net.IN1",
        OUT1_P: "net.DIFF1_P",
        OUT1_N: "net.DIFF1_N",
        ENABLE: "net.ENABLE",
        OUT2_N: "net.DIFF2_N",
        OUT2_P: "net.DIFF2_P",
        GND: "net.GND",
        OUT3_P: "net.DIFF3_P",
        OUT3_N: "net.DIFF3_N",
        ENABLE_NOT: "net.ENABLE_NOT",
        OUT4_N: "net.DIFF4_N",
        OUT4_P: "net.DIFF4_P",
        VCC: "net.VCC1_3V3",
      }}
    />

    {[
      ["R1", "net.IN1", -3.4, 1.35, false],
      ["R2", "U1.IN2", -3.4, -1.5, true],
      ["R3", "U1.IN3", 3.4, -1.5, true],
      ["R4", "U1.IN4", 5.2, -1.5, true],
    ].map(([name, signalTarget, schX, schY, signalOnTop]) => (
      <resistor
        key={name}
        name={name as string}
        resistance="49.9ohm"
        schX={schX as number}
        schY={schY as number}
        schRotation={90}
        connections={
          signalOnTop
            ? { pin1: "net.GND", pin2: signalTarget as string }
            : { pin1: signalTarget as string, pin2: "net.GND" }
        }
      />
    ))}

    <capacitor
      name="C1"
      capacitance="10uF"
      schX={-1.4}
      schY={-3.2}
      schOrientation="vertical"
      connections={{ pin1: "net.VCC1_3V3", pin2: "net.GND" }}
    />
    <capacitor
      name="C3"
      capacitance="0.01uF"
      schX={0}
      schY={-3.2}
      schOrientation="vertical"
      connections={{ pin1: "net.VCC1_3V3", pin2: "net.GND" }}
    />
    <capacitor
      name="C4"
      capacitance="0.01uF"
      schX={1.4}
      schY={-3.2}
      schOrientation="vertical"
      connections={{ pin1: "net.VCC1_3V3", pin2: "net.GND" }}
    />
  </subcircuit>
);

export default LVDSDriver_SN65LVDS31_TIDA060017;
