import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "R",
  pin2: ["N_RE", "RE"],
  pin3: "DE",
  pin4: "D",
  pin5: "GND",
  pin6: "Y",
  pin7: "Z",
  pin8: "B",
  pin9: "A",
  pin10: "VCC",
} as const;

/** SN65HVD1473 3.3 V, 20 Mbps, full-duplex RS-485 transceiver. */
export const SN65HVD1473DGSR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="SN65HVD1473DGSR"
    supplierPartNumbers={{ jlcpcb: ["C2863381"] }}
    datasheetUrl="https://www.ti.com/lit/ds/symlink/sn65hvd1473.pdf"
    footprint="soic10_p0.5mm_w5.8mm_pw0.3mm_pl1.35mm_pillpads"
    schWidth="4mm"
    schHeight="6mm"
    pinLabels={pinLabels}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [4, 3, 2, 1],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [6, 7, 8, 9],
      },
      topSide: {
        direction: "left-to-right",
        pins: [10],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [5],
      },
    }}
    {...props}
  />
);

export default SN65HVD1473DGSR;
