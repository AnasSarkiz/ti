import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: ["VCC", "VCC1"],
  pin2: "GND1_1",
  pin3: "INA",
  pin4: "INB",
  pin5: "INC",
  pin6: "OUTD",
  pin7: "NC",
  pin8: "GND1_2",
  pin9: "GND2_1",
  pin10: "SEL",
  pin11: "IND",
  pin12: "OUTC",
  pin13: "OUTB",
  pin14: "OUTA",
  pin15: "GND2_2",
  pin16: ["VISO", "VCC2"],
} as const;

/** ISOW7841 reinforced 3/1 digital isolator with integrated isolated power. */
export const ISOW7841DWR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="ISOW7841DWR"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/isow7841.pdf"
    footprint="soic16_p1.27mm_w11.4mm_pw0.6mm_pl1.9mm_pillpads"
    schWidth="3.4mm"
    schHeight="2.4mm"
    pinLabels={pinLabels}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      rightSide: {
        direction: "bottom-to-top",
        pins: [9, 10, 11, 12, 13, 14, 15, 16],
      },
    }}
    noConnect={["pin7"]}
    {...props}
  />
);

export default ISOW7841DWR;
