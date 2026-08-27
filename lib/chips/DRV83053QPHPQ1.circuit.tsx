import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["EN_GATE"],
  pin2: ["INHA"],
  pin3: ["INLA"],
  pin4: ["INHB"],
  pin5: ["INLB"],
  pin6: ["INHC"],
  pin7: ["INLC"],
  pin8: ["nFAULT"],
  pin9: ["nSCS"],
  pin10: ["SDI"],
  pin11: ["SDO"],
  pin12: ["SCLK"],
  pin13: ["PWRGD"],
  pin14: ["GND3"],
  pin15: ["AVDD"],
  pin16: ["SO1"],
  pin17: ["SO2"],
  pin18: ["SO3"],
  pin19: ["SN3"],
  pin20: ["SP3"],
  pin21: ["SN2"],
  pin22: ["SP2"],
  pin23: ["SN1"],
  pin24: ["SP1"],
  pin25: ["GLC"],
  pin26: ["SLC"],
  pin27: ["SHC"],
  pin28: ["GHC"],
  pin29: ["GHB"],
  pin30: ["SHB"],
  pin31: ["SLB"],
  pin32: ["GLB"],
  pin33: ["GLA"],
  pin34: ["SLA"],
  pin35: ["SHA"],
  pin36: ["GHA"],
  pin37: ["VCP_LSD"],
  pin38: ["VCPH"],
  pin39: ["CP2H"],
  pin40: ["CP2L"],
  pin41: ["PVDD"],
  pin42: ["CP1L"],
  pin43: ["CP1H"],
  pin44: ["VDRAIN"],
  pin45: ["GND2"],
  pin46: ["DVDD"],
  pin47: ["WAKE"],
  pin48: ["VREG"],
  pin49: ["PAD", "GND1", "thermalpad"],
} as const;

const pinAttributes = {
  pin1: { requiresPower: true },
  pin2: { requiresPower: true },
  pin3: { requiresPower: true },
  pin4: { requiresPower: true },
  pin5: { requiresPower: true },
  pin6: { requiresPower: true },
  pin7: { requiresPower: true },
  pin9: { requiresPower: true },
  pin10: { requiresPower: true },
  pin11: { providesPower: true },
  pin12: { requiresPower: true },
  pin16: { providesPower: true },
  pin17: { providesPower: true },
  pin18: { providesPower: true },
  pin19: { requiresPower: true },
  pin20: { requiresPower: true },
  pin21: { requiresPower: true },
  pin22: { requiresPower: true },
  pin23: { requiresPower: true },
  pin24: { requiresPower: true },
  pin25: { providesPower: true },
  pin26: { requiresPower: true },
  pin27: { requiresPower: true },
  pin28: { providesPower: true },
  pin29: { providesPower: true },
  pin30: { requiresPower: true },
  pin31: { requiresPower: true },
  pin32: { providesPower: true },
  pin33: { providesPower: true },
  pin34: { requiresPower: true },
  pin35: { requiresPower: true },
  pin36: { providesPower: true },
  pin47: { requiresPower: true },
} satisfies NonNullable<ChipProps["pinAttributes"]>;

export const DRV83053QPHPQ1 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    pinLabels={pinLabels}
    pinAttributes={pinAttributes}
    supplierPartNumbers={{ jlcpcb: ["C701115"] }}
    manufacturerPartNumber="DRV83053QPHPQ1"
    footprint="qfp48_w7.2mm_h7.2mm_p0.5mm_pw0.3mm_pl1.45mm_legsoutside_thermalpad5.17mmx5.17mm"
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C701115.obj?uuid=f0220855bd3041998a0835a0b1f707e8",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C701115.step?uuid=f0220855bd3041998a0835a0b1f707e8",
      pcbRotationOffset: 0,
      modelOriginPosition: { x: 0, y: 0, z: -0.6 },
    }}
    {...props}
  />
);
export const DRV83053Q1 = DRV83053QPHPQ1;

export default DRV83053QPHPQ1;
