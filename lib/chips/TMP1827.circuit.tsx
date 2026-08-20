import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

/**
 * Simplified three-pin application symbol matching the TI TMP1827
 * multi-drop schematic. The physical package contains additional pins.
 */
export const TMP1827 = (props: ChipProps) => (
  <chip
    manufacturerPartNumber="TMP1827NGRR"
    supplierPartNumbers={{ jlcpcb: ["C22364248"] }}
    footprint="dfn8_p0.5mm_w2.91mm_pw0.28mm_pl0.58mm"
    schWidth="2mm"
    schHeight="2mm"
    pinLabels={{
      pin1: "VDD",
      pin2: ["ONEWIRE_SDQ", "SDQ"],
      pin3: "ADDR",
      pin4: "GND",
      pin5: "IO3",
      pin6: "IO0",
      pin7: "IO1",
      pin8: ["IO2_ALERT", "ALERT"],
    }}
    schPinArrangement={{
      topSide: {
        direction: "left-to-right",
        pins: [2],
      },
      rightSide: {
        direction: "left-to-right",
        pins: [1],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [4],
      },
    }}
    schPinStyle={{
      pin1: { marginBottom: 1 },
    }}
    {...props}
  />
);

export default TMP1827;
