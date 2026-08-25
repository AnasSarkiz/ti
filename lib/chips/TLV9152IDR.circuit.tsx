import type { OpAmpProps } from "@tscircuit/props";
import "tscircuit";

type TLV9152IDRProps = Omit<OpAmpProps, "name"> & { name?: string };

export const TLV9152IDR = ({
  name = "TLV9152IDR",
  ...props
}: TLV9152IDRProps) => (
  <opamp
    name={name}
    manufacturerPartNumber="TLV9152IDR"
    symbolName="opamp_with_power"
    {...props}
  />
);

export default TLV9152IDR;
