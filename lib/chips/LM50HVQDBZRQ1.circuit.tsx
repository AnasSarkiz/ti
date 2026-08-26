import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const LM50HVQDBZRQ1_PIN_LABELS = {
  pin1: ["VS", "V_PLUS"],
  pin2: ["VO", "TEMP_SENSE"],
  pin3: "GND",
} as const;

/** Automotive Grade-0 analog temperature sensor in the DBZ SOT-23 package. */
export const LM50HVQDBZRQ1 = (
  props: ChipProps<typeof LM50HVQDBZRQ1_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="LM50HVQDBZRQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/lm50-q1.pdf"
    footprint="sot23_3"
    pinLabels={LM50HVQDBZRQ1_PIN_LABELS}
    pinAttributes={{
      VS: {
        mustBeConnected: true,
        requiresPower: true,
        shouldHaveDecouplingCapacitor: true,
        recommendedDecouplingCapacitorCapacitance: "0.1uF",
      },
      VO: { mustBeConnected: true, providesPower: true },
      GND: { requiresGround: true },
    }}
    schWidth="2.8mm"
    schHeight="2.4mm"
    schPinArrangement={{
      topSide: { direction: "left-to-right", pins: [1] },
      rightSide: { direction: "top-to-bottom", pins: [2] },
      bottomSide: { direction: "left-to-right", pins: [3] },
    }}
    {...props}
  />
);

export const LM50HVQ1 = LM50HVQDBZRQ1;

export default LM50HVQDBZRQ1;
