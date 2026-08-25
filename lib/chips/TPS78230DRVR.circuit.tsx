import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "OUT",
  pin2: "NC",
  pin3: "GND",
  pin4: "EN",
  pin5: "GND",
  pin6: "IN",
  pin7: "EP",
} as const;

export const TPS78230DRVR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="TPS78230DRVR"
    pinLabels={pinLabels}
    {...props}
  />
);

export default TPS78230DRVR;
