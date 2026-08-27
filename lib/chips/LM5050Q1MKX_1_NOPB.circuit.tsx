import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["VS"],
  pin2: ["GND"],
  pin3: ["OFF"],
  pin4: ["IN"],
  pin5: ["GATE"],
  pin6: ["OUT"],
} as const;

const pinAttributes = {
  pin2: { requiresGround: true },
} as const;

export const LM5050Q1MKX_1_NOPB = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
        jlcpcb: ["C701909"],
      }}
      manufacturerPartNumber="LM5050Q1MKX-1/NOPB"
      footprint="sot_h1.7434mm_pl1.1304mm_pin1location(rightside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C701909.obj?uuid=229b69761e2c45dba6a83d8866dec72d",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C701909.step?uuid=229b69761e2c45dba6a83d8866dec72d",
        pcbRotationOffset: 180,
        modelOriginPosition: {
          x: 0.000025399999913133797,
          y: -0.0000889000000370288,
          z: -0.048939,
        },
      }}
      {...props}
    />
  );
};
export const LM5050Q1 = LM5050Q1MKX_1_NOPB;

export default LM5050Q1MKX_1_NOPB;
