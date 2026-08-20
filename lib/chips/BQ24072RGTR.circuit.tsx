import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const BQ24072RGTR_PIN_LABELS = {
  pin1: ["TS"],
  pin2: ["BAT", "BAT1"],
  pin3: ["BAT2"],
  pin4: ["N_CE", "CE"],
  pin5: ["EN2"],
  pin6: ["EN1"],
  pin7: ["N_PGOOD", "PGOOD"],
  pin8: ["VSS", "GND"],
  pin9: ["N_CHG", "CHG"],
  pin10: ["OUT", "OUT1"],
  pin11: ["OUT2"],
  pin12: ["ILIM"],
  pin13: ["IN"],
  pin14: ["TMR"],
  pin15: ["TD"],
  pin16: ["ISET"],
  pin17: ["EP", "thermalpad"],
} as const;

export const BQ24072RGTR = (
  props: ChipProps<typeof BQ24072RGTR_PIN_LABELS>,
) => (
  <chip
    pinLabels={BQ24072RGTR_PIN_LABELS}
    manufacturerPartNumber="BQ24072RGTR"
    supplierPartNumbers={{
      jlcpcb: ["C140288"],
    }}
    footprint="qfn16_thermalpad1.6mmx1.6mm_pillpads_pw0.28mm_pl0.8mm"
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
    schPinStyle={{
      pin13: { marginBottom: 0.7 },
      pin8: { marginBottom: 1 },
      pin1: { marginBottom: 0.7 },
      pin2: { marginBottom: 1 },
      pin10: { marginBottom: 1.2 },
      pin5: { marginBottom: 0.2 },
      pin6: { marginBottom: 0.2 },
      pin15: { marginBottom: 0.2 },
      pin4: { marginBottom: 1.2 },
      pin7: { marginRight: 0.8 },
      pin14: { marginRight: 0.6 },
      pin12: { marginRight: 0.9 },
    }}
    {...props}
  />
);

export default BQ24072RGTR;
