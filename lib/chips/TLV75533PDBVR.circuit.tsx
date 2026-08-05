import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "IN",
  pin2: "GND",
  pin3: "EN",
  pin4: "NC",
  pin5: "OUT",
} as const;

/** TLV755P 3.3 V fixed-output regulator in the 5-pin SOT-23 package. */
export const TLV75533PDBVR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="TLV75533PDBVR"
    supplierPartNumbers={{ jlcpcb: ["C404027"] }}
    footprint="sot23_5"
    schWidth="3mm"
    schHeight="3mm"
    pinLabels={pinLabels}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [1, 3],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [5, 2],
      },
    }}
    schPinStyle={{
      pin1: { marginBottom: 1.5 },
      pin5: { marginBottom: 1.5 },
    }}
    noConnect={["pin4"]}
    {...props}
  />
);

export default TLV75533PDBVR;
