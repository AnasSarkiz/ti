import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["A12"],
  pin2: ["A11"],
  pin3: ["C2"],
  pin4: ["A21"],
  pin5: ["A22"],
  pin6: ["C1"],
} as const;

export const BAT54CDW_7_F = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C134406"],
      }}
      manufacturerPartNumber="BAT54CDW-7-F"
      footprint="dfn6_p0.65mm_w2.6998mm_pw0.4mm_pl0.9mm_pin1location(rightside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C134406.obj?uuid=c48363a009b446bc89c236a3f3be363d",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C134406.step?uuid=c48363a009b446bc89c236a3f3be363d",
        pcbRotationOffset: 90,
        modelOriginPosition: {
          x: 0.0001015999999935957,
          y: 0.00008889999999439624,
          z: 0,
        },
      }}
      {...props}
    />
  );
};
