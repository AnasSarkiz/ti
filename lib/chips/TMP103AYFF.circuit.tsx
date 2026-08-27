import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const TMP103AYFF_PIN_LABELS = {
  pin1: ["SDA"],
  pin2: ["SCL"],
  pin3: ["GND"],
  pin4: ["V_PLUS", "VCC"],
} as const;

export const TMP103AYFF = (props: ChipProps<typeof TMP103AYFF_PIN_LABELS>) => (
  <chip
    manufacturerPartNumber="TMP103AYFF"
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
