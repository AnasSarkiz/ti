import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "VDD",
  pin2: "V4",
  pin3: "V3",
  pin4: "V2",
  pin5: "V1",
  pin6: "VSS",
  pin7: "CD",
  pin8: "OUT",
  pin9: "PAD",
} as const;

export const BQ294700DSG = (props: ChipProps<typeof pinLabels>) => (
  <chip manufacturerPartNumber="BQ294700DSG" pinLabels={pinLabels} {...props} />
);

export default BQ294700DSG;
