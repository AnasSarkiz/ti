import type { ConnectorProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
} as const;

export const A_282834_2 = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C592983"],
      }}
      manufacturerPartNumber="282834-2"
      footprint="radial_p2.54mm_od1.7mm_id1.2mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C592983.obj?uuid=a1cd7eb4237342e0b980b4e6ce5486ef",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C592983.step?uuid=a1cd7eb4237342e0b980b4e6ce5486ef",
        pcbRotationOffset: 0,
        modelOriginPosition: {
          x: 0,
          y: 0.0005968999998913205,
          z: 0.09999300000000044,
        },
      }}
      {...props}
    />
  );
};
