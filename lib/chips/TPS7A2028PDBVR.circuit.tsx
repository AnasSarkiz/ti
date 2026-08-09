import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "VIN",
  pin2: "GND",
  pin3: "VEN",
  pin4: "NC",
  pin5: "VOUT",
} as const;

/** TPS7A20 2.8 V fixed-output regulator in the 5-pin SOT-23 package. */
export const TPS7A2028PDBVR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="TPS7A2028PDBVR"
    supplierPartNumbers={{ jlcpcb: ["C2869847"] }}
    footprint="sot25_w2.3mm_pw0.53mm_pl1.05mm_pin1location(leftside,bottom)"
    schWidth="1.5mm"
    schHeight="2.5mm"
    pinLabels={pinLabels}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [1, 3],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [5],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [2],
      },
    }}
    schPinStyle={{
      pin1: { marginBottom: 1 },
      pin5: { marginBottom: 1.2 },
    }}
    noConnect={["pin4"]}
    {...props}
  />
);

export default TPS7A2028PDBVR;
