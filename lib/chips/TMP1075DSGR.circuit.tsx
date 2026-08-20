import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["I2C_SDA", "SDA"],
  pin2: ["I2C_SCL", "SCL"],
  pin3: ["ALERT"],
  pin4: ["GND"],
  pin5: ["I2C_ADDR2", "A2"],
  pin6: ["I2C_ADDR1", "A1"],
  pin7: ["I2C_ADDR0", "A0"],
  pin8: ["V_POS", "V_PLUS"],
  pin9: ["EP"],
} as const;

export const TMP1075DSGR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C2870250"],
      }}
      manufacturerPartNumber="TMP1075DSGR"
      footprint="dfn8_thermalpad0.9mmx1.6mm_p0.5mm_w2.42mm_pw0.25mm_pl0.52mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2870250.obj?uuid=2be2baea8d8242eebd2ce617314d92a1",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2870250.step?uuid=2be2baea8d8242eebd2ce617314d92a1",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  );
};
