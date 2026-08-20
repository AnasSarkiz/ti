import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["I2C_SDA", "SDA"],
  pin2: ["I2C_ADDR", "ADDR"],
  pin3: ["ALERT"],
  pin4: ["I2C_SCL", "SCL"],
  pin5: ["VDD"],
  pin6: ["RESET"],
  pin7: ["I2C_ADDR1", "ADDR1"],
  pin8: ["GND"],
  pin9: ["EP"],
} as const;

export const HDC3022DEJR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C17434731"],
      }}
      manufacturerPartNumber="HDC3022DEJR"
      footprint="dfn8_thermalpad1.3mmx1.8mm_thermalpadcenteroffsetx15um_thermalpadcenteroffsety15um_p0.5mm_w3.3mm_pw0.25mm_pl0.7mm_pin1location(leftside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C17434731.obj?uuid=4fe394664bd94e70a2dc8a4c049fcf3b",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C17434731.step?uuid=4fe394664bd94e70a2dc8a4c049fcf3b",
        pcbRotationOffset: 0,
        modelOriginPosition: {
          x: -0.015252700000019104,
          y: 0.00012700000002041634,
          z: -0.01,
        },
      }}
      {...props}
    />
  );
};
