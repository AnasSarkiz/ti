import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const SN65LVDS31D_PIN_LABELS = {
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

export const SN65LVDS31D = (
  props: ChipProps<typeof SN65LVDS31D_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="SN65LVDS31D"
    pinLabels={SN65LVDS31D_PIN_LABELS}
    showPinAliases={false}
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
    {...props}
  />
);

export default SN65LVDS31D;
