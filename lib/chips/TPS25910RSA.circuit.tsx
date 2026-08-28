import type { ChipProps } from "@tscircuit/props";
import "tscircuit";
import { TPS25910RSA_FOOTPRINT } from "./jlcpcb-footprints";

export const TPS25910RSA_PIN_LABELS = {
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

export const TPS25910RSA = (
  props: ChipProps<typeof TPS25910RSA_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="TPS25910RSA"
    supplierPartNumbers={{ jlcpcb: ["C2649427"] }}
    footprint={TPS25910RSA_FOOTPRINT}
    pinLabels={TPS25910RSA_PIN_LABELS}
    showPinAliases={false}
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
    {...props}
  />
);

export default TPS25910RSA;
