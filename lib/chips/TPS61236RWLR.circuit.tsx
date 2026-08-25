import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "PGND",
  pin2: "SW",
  pin3: "VIN",
  pin4: "CC",
  pin5: "AGND",
  pin6: "FB",
  pin7: "EN",
  pin8: "INACT",
  pin9: "VOUT",
} as const;

export const TPS61236RWLR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="TPS61236RWLR"
    pinLabels={pinLabels}
    {...props}
  />
);

export default TPS61236RWLR;
