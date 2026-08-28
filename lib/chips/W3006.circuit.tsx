import type { ChipProps } from "@tscircuit/props";
import "tscircuit";
import { W3006_FOOTPRINT } from "./jlcpcb-footprints";

export const W3006_PIN_LABELS = {
  pin1: "FEED",
  pin2: "NC",
} as const;

export const W3006 = (props: ChipProps<typeof W3006_PIN_LABELS>) => (
  <chip
    manufacturerPartNumber="W3006"
    supplierPartNumbers={{ jlcpcb: ["C5123155"] }}
    footprint={W3006_FOOTPRINT}
    pinLabels={W3006_PIN_LABELS}
    showPinAliases={false}
    noConnect={["NC"]}
    schWidth={1.2}
    schHeight={0.4}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: ["FEED"] },
      rightSide: { direction: "top-to-bottom", pins: ["NC"] },
    }}
    {...props}
  />
);

export default W3006;
