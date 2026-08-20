import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["IN"],
  pin2: ["GND"],
  pin3: ["EN"],
  pin4: ["NC"],
  pin5: ["OUT"],
} as const;

export const TPS7A0230PDBVR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C3747031"],
      }}
      manufacturerPartNumber="TPS7A0230PDBVR"
      footprint="sot25_w2.2mm_pl1mm_pin1location(rightside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C3747031.obj?uuid=8c971aea3af54c53b74baeb1f489d393",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C3747031.step?uuid=8c971aea3af54c53b74baeb1f489d393",
        pcbRotationOffset: 90,
        modelOriginPosition: {
          x: -0.000012699999956566899,
          y: 0.00006349999989652133,
          z: -0.7,
        },
      }}
      {...props}
    />
  );
};
