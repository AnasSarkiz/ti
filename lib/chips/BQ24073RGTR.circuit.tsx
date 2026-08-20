import type { ChipProps } from "@tscircuit/props";
import "tscircuit";
import { BQ24072RGTR_PIN_LABELS } from "./BQ24072RGTR.circuit.tsx";

export const BQ24073RGTR = (
  props: ChipProps<typeof BQ24072RGTR_PIN_LABELS>,
) => (
  <chip
    pinLabels={BQ24072RGTR_PIN_LABELS}
    manufacturerPartNumber="BQ24073RGTR"
    supplierPartNumbers={{
      jlcpcb: ["C15220"],
    }}
    footprint="qfn16_thermalpad1.7mmx1.7mm_pillpads_h4.05mm_pw0.28mm_pl0.85mm"
    schWidth="3.4mm"
    schHeight="5.2mm"
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [13, 8, 1, 2],
      },
      topSide: {
        direction: "left-to-right",
        pins: [7, 9],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [10, 5, 6, 15, 4],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [14, 12, 16],
      },
    }}
    {...props}
  />
);

export default BQ24073RGTR;
