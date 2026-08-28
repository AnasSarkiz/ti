import type { ChipProps } from "@tscircuit/props";
import "tscircuit";
import { TPS62086RLTR_FOOTPRINT } from "./jlcpcb-footprints";

export const TPS62086RLTR_PIN_LABELS = {
  pin1: ["EN"],
  pin2: ["PG"],
  pin3: ["FB"],
  pin4: ["VOS"],
  pin5: ["GND"],
  pin6: ["SW"],
  pin7: ["VIN"],
} as const;

export const TPS62086RLTR = (
  props: ChipProps<typeof TPS62086RLTR_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="TPS62086RLTR"
    supplierPartNumbers={{ jlcpcb: ["C2071344"] }}
    footprint={TPS62086RLTR_FOOTPRINT}
    pinLabels={TPS62086RLTR_PIN_LABELS}
    showPinAliases={false}
    schWidth={1.77}
    schHeight={1.4}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: ["VIN", "EN"] },
      rightSide: {
        direction: "top-to-bottom",
        pins: ["SW", "VOS", "FB", "PG", "GND"],
      },
    }}
    {...props}
  />
);

export default TPS62086RLTR;
