import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const TPS7E8133QDBVRQ1_PIN_LABELS = {
  pin1: "IN",
  pin2: "GND",
  pin3: "EN",
  pin4: "NC",
  pin5: "OUT",
} as const;

/** Fixed 3.3 V automotive LDO in the five-pin DBV SOT-23 package. */
export const TPS7E8133QDBVRQ1 = (
  props: ChipProps<typeof TPS7E8133QDBVRQ1_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="TPS7E8133QDBVRQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/tps7e81-q1.pdf"
    footprint="sot23_5"
    schWidth="2mm"
    schHeight="2mm"
    pinLabels={TPS7E8133QDBVRQ1_PIN_LABELS}
    pinAttributes={{
      IN: {
        requiresPower: true,
        shouldHaveDecouplingCapacitor: true,
        recommendedDecouplingCapacitorCapacitance: "1uF",
      },
      EN: { requiresPower: true },
      OUT: { providesPower: true },
      GND: { requiresGround: true },
    }}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: [1, 3] },
      rightSide: { direction: "top-to-bottom", pins: [5, 4] },
      bottomSide: { direction: "left-to-right", pins: [2] },
    }}
    schPinStyle={{
      pin1: { marginBottom: 1 },
      pin5: { marginBottom: 1 },
    }}
    noConnect={["pin4"]}
    {...props}
  />
);

export const TPS7E81Q1 = TPS7E8133QDBVRQ1;

export default TPS7E8133QDBVRQ1;
