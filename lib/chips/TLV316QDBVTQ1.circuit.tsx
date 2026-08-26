import type { OpAmpProps } from "@tscircuit/props";
import "tscircuit";

/** Automotive TLV316-Q1 rail-to-rail operational amplifier. */
export const TLV316QDBVTQ1 = (props: OpAmpProps) => (
  <opamp
    manufacturerPartNumber="TLV316QDBVTQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/tlv316-q1.pdf"
    footprint="sot23_5"
    {...props}
  />
);

export const TLV316 = TLV316QDBVTQ1;

export default TLV316QDBVTQ1;
