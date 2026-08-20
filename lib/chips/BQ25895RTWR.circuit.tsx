import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["VBUS"],
  pin2: ["USB_D_POS", "D_POS"],
  pin3: ["USB_D_NEG", "D_NEG"],
  pin4: ["STAT"],
  pin5: ["I2C_SCL", "SCL"],
  pin6: ["I2C_SDA", "SDA"],
  pin7: ["INT"],
  pin8: ["OTG"],
  pin9: ["CE"],
  pin10: ["ILIM"],
  pin11: ["TS"],
  pin12: ["QON"],
  pin13: ["BAT1"],
  pin14: ["BAT2"],
  pin15: ["SYS1"],
  pin16: ["SYS2"],
  pin17: ["PGND1"],
  pin18: ["PGND2"],
  pin19: ["SW1"],
  pin20: ["SW2"],
  pin21: ["BTST"],
  pin22: ["REGN"],
  pin23: ["PMID"],
  pin24: ["DSEL"],
  pin25: ["PAD"],
} as const;

export const BQ25895RTWR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C80200"],
      }}
      manufacturerPartNumber="BQ25895RTWR"
      footprint="qfn24_thermalpad2.7mmx2.7mm_h4.65mm_pw0.28mm_pl0.63mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C80200.obj?uuid=c257e46ac27a4c7bbfb959941bf66bd1",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C80200.step?uuid=c257e46ac27a4c7bbfb959941bf66bd1",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0.000012699999842880061, z: 0 },
      }}
      {...props}
    />
  );
};
