import type { ChipProps } from "@tscircuit/props";
import bq24074SpiceModel from "./spice-models/BQ24074-spice-model.encrypted.json";

const pinLabels = {
  pin1: ["TS"],
  pin2: ["BAT", "BAT1"],
  pin3: ["BAT2"],
  pin4: ["N_CE"],
  pin5: ["EN2"],
  pin6: ["EN1"],
  pin7: ["N_PGOOD"],
  pin8: ["VSS"],
  pin9: ["N_CHG"],
  pin10: ["OUT", "OUT1"],
  pin11: ["OUT2"],
  pin12: ["ILIM"],
  pin13: ["IN"],
  pin14: ["TMR"],
  pin15: ["ITERM"],
  pin16: ["ISET"],
  pin17: ["EP"],
} as const;

export const BQ24074RGTR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C54313"],
      }}
      manufacturerPartNumber="BQ24074RGTR"
      spiceModel={
        <spicemodel
          source={bq24074SpiceModel.source}
          spicePinMapping={{
            TS: "TS",
            BAT: "BAT",
            N_CE: "N_CE",
            EN2: "EN2",
            EN1: "EN1",
            N_PGOOD: "N_PGOOD",
            VSS: "VSS",
            N_CHG: "N_CHG",
            OUT: "OUT",
            ILIM: "ILIM",
            IN: "IN",
            TMR: "TMR",
            ITERM: "ITERM",
            ISET: "ISET",
            EP: "EP",
          }}
        />
      }
      footprint="qfn16_thermalpad1.7mmx1.7mm_pillpads_h4.05mm_pw0.28mm_pl0.85mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C54313.obj?uuid=6e50ae26fe4f4c2a8ee6b5b5bc616dea",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C54313.step?uuid=6e50ae26fe4f4c2a8ee6b5b5bc616dea",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0.000012699999999199463, z: 0 },
      }}
      {...props}
    />
  );
};
