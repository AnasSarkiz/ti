import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "VSUP",
  pin2: "EN",
  pin3: "GND",
  pin4: "LIN",
  pin5: "RXD",
  pin6: "TXD",
  pin7: ["nRST", "RST"],
  pin8: "VCC",
  pin9: ["PAD", "GND_PAD"],
} as const;

/** TLIN1028-Q1 LIN transceiver with integrated 3.3 V LDO, DDA PowerPAD package. */
export const TLIN10283DDARQ1 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="TLIN10283DDARQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/tlin1028-q1.pdf"
    footprint="kicad:Package_SO/Texas_HSOP-8-1EP_3.9x4.9mm_P1.27mm"
    schWidth={3.556}
    schHeight={3.048}
    pinLabels={pinLabels}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [8, 2, 5, 6, 7],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [1, 4, 3, 9],
      },
    }}
    schPinStyle={{
      pin8: { marginBottom: 0.308 },
      pin2: { marginBottom: 0.308 },
      pin5: { marginBottom: 0.308 },
      pin6: { marginBottom: 0.308 },
      pin9: { marginTop: 0.308 },
      pin3: { marginTop: 0.816 },
      pin4: { marginTop: 0.308 },
    }}
    {...props}
  />
);

export default TLIN10283DDARQ1;
