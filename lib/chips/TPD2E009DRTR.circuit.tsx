import type { ChipProps } from "@tscircuit/props";
import "tscircuit";
import { TPD2E009DRTR_FOOTPRINT } from "./jlcpcb-footprints";

export const TPD2E009DRTR_PIN_LABELS = {
  pin1: "D1",
  pin2: "D2",
  pin3: "GND",
} as const;

export const TPD2E009DRTR = (
  props: ChipProps<typeof TPD2E009DRTR_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="TPD2E009DRTR"
    supplierPartNumbers={{ jlcpcb: ["C3040101"] }}
    footprint={TPD2E009DRTR_FOOTPRINT}
    pinLabels={TPD2E009DRTR_PIN_LABELS}
    showPinAliases={false}
    schWidth={1.2}
    schHeight={0.8}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: ["pin1"] },
      rightSide: { direction: "top-to-bottom", pins: ["pin2"] },
      bottomSide: { direction: "left-to-right", pins: ["pin3"] },
    }}
    {...props}
  />
);

export default TPD2E009DRTR;
