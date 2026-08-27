import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["VCC"],
  pin2: ["OUT"],
  pin3: ["GND"],
} as const;

const pinAttributes = {
  pin1: { requiresPower: true },
  pin3: { requiresGround: true },
} as const;

export const DRV5013ADQDBZRQ1 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
        jlcpcb: ["C114255"],
      }}
      manufacturerPartNumber="DRV5013ADQDBZRQ1"
      footprint="sot23w_p0.9813mm_pw0.6494mm_pin1location(rightside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C114255.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C114255.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
        pcbRotationOffset: 180,
        modelOriginPosition: {
          x: 0.000012700000070253736,
          y: -0.000012699999956566899,
          z: 0.050795,
        },
      }}
      {...props}
    />
  );
};
export const DRV5013Q1 = DRV5013ADQDBZRQ1;

export default DRV5013ADQDBZRQ1;
