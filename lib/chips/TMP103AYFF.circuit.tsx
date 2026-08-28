import type { ChipProps } from "@tscircuit/props";
import "tscircuit";
import { TMP103AYFF_FOOTPRINT } from "./jlcpcb-footprints";

export const TMP103AYFF_PIN_LABELS = {
  pin1: ["SDA"],
  pin2: ["V_PLUS", "VCC"],
  pin3: ["SCL"],
  pin4: ["GND"],
} as const;

export const TMP103AYFF = (props: ChipProps<typeof TMP103AYFF_PIN_LABELS>) => (
  <chip
    manufacturerPartNumber="TMP103AYFF"
    supplierPartNumbers={{ jlcpcb: ["C165141"] }}
    footprint={TMP103AYFF_FOOTPRINT}
    pinLabels={TMP103AYFF_PIN_LABELS}
    showPinAliases={false}
    schWidth={1.4}
    schHeight={0.6}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: ["SCL", "SDA"] },
      rightSide: { direction: "top-to-bottom", pins: ["V_PLUS", "GND"] },
    }}
    {...props}
  />
);

export default TMP103AYFF;
