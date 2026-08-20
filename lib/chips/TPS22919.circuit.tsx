import type { ChipProps } from "@tscircuit/props";
import tps22919SpiceModel from "./spice-models/TPS22919-spice-model.json";

const pinLabels = {
  pin1: ["IN"],
  pin2: ["GND"],
  pin3: ["ON"],
  pin4: ["NC"],
  pin5: ["QOD"],
  pin6: ["OUT"],
} as const;

export const TPS22919 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C2149796"],
      }}
      manufacturerPartNumber="TPS22919DCKR"
      spiceModel={
        <spicemodel
          source={tps22919SpiceModel.source}
          spicePinMapping={{
            GND: "GND",
            ON: "ON",
            QOD: "QOD",
            VIN: "IN",
            VOUT: "OUT",
          }}
        />
      }
      footprint="dfn6_p0.65mm_w2.4999mm_pw0.42mm_pl0.6mm_pin1location(rightside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2149796.obj?uuid=a5d40c04f23243b2af27dc3bf34f18d3",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2149796.step?uuid=a5d40c04f23243b2af27dc3bf34f18d3",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.000012700000013410317, y: 0, z: -0.1 },
      }}
      {...props}
    />
  );
};
