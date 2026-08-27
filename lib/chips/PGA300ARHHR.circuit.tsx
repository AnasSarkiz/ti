import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["NU1"],
  pin2: ["DVDD_MEM"],
  pin3: ["DVDD"],
  pin4: ["GATE", "NU2"],
  pin5: ["VDD", "PWR"],
  pin6: ["DACCAP"],
  pin7: ["NU3"],
  pin8: ["VOUT", "OUT"],
  pin9: ["AVDD"],
  pin10: ["GND"],
  pin11: ["FBN", "FB_NEG"],
  pin12: ["FBP", "FB_POS"],
  pin13: ["COMP"],
  pin14: ["VBRGN", "BRG_NEG"],
  pin15: ["VBRGP", "BRG_POS"],
  pin16: ["REFCAP"],
  pin17: ["VINPN", "INP_NEG"],
  pin18: ["VINPP", "INP_POS"],
  pin19: ["NU4"],
  pin20: ["NU5"],
  pin21: ["VINTP", "INT_POS"],
  pin22: ["VINTN", "INT_NEG"],
  pin23: ["AVSS"],
  pin24: ["NU6"],
  pin25: ["NU7"],
  pin26: ["NU8"],
  pin27: ["NU9"],
  pin28: ["NU10"],
  pin29: ["NU11"],
  pin30: ["NU12"],
  pin31: ["NU13"],
  pin32: ["DVSS"],
  pin33: ["NU14"],
  pin34: ["NU15"],
  pin35: ["NU16"],
  pin36: ["NU17"],
  pin37: ["PAD", "EP"],
} as const;

const footprinterPinLabels = {
  ...pinLabels,
  pin37: [...pinLabels.pin37, "thermalpad"],
} as const;

export const PGA300ARHHR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={footprinterPinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C2861776"],
      }}
      manufacturerPartNumber="PGA300ARHHR"
      footprint="qfn36_thermalpad4.6mmx4.6mm_p0.5001mm_h7.2101mm_pw0.28mm_pl0.905mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2861776.obj?uuid=1c7c5a260fc047fdbc1b4b0613abc7ae",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2861776.step?uuid=1c7c5a260fc047fdbc1b4b0613abc7ae",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.02 },
      }}
      {...props}
    />
  );
};
