import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["I2C_SDA", "SDA"],
  pin2: ["GND"],
  pin3: ["I2C_ADDR", "ADDR"],
  pin4: ["DRDY_INT"],
  pin5: ["VDD"],
  pin6: ["I2C_SCL", "SCL"],
  pin7: ["EP"],
} as const;

export const HDC2080DMBR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C918141"],
      }}
      manufacturerPartNumber="HDC2080DMBR"
      footprint="dfn6_thermalpad1.6mmx2.4mm_thermalpadcenteroffsety5um_p1mm_w3.8mm_pw0.5mm_pl0.8mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C918141.obj?uuid=147a8567fdf74261a93df005666d6810",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C918141.step?uuid=147a8567fdf74261a93df005666d6810",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.00012700000002041634, z: -0.01 },
      }}
      {...props}
    />
  );
};
