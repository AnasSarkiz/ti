import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["I2C_ADDR1", "A1"],
  pin2: ["I2C_ADDR0", "A0"],
  pin3: ["N_ALERT"],
  pin4: ["I2C_SDA", "SDA"],
  pin5: ["I2C_SCL", "SCL"],
  pin6: ["VS"],
  pin7: ["GND"],
  pin8: ["VBUS"],
  pin9: ["IN_NEG", "INN"],
  pin10: ["IN_POS", "INP"],
} as const;

export const INA237AQDGSRQ1 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C2866496"],
      }}
      manufacturerPartNumber="INA237AQDGSRQ1"
      footprint="dfn10_p0.5mm_w6mm_pw0.3mm_pl1.3mm_pin1location(leftside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2866496.obj?uuid=854098f5cce54b6caab82164a7d3deef",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2866496.step?uuid=854098f5cce54b6caab82164a7d3deef",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012699999999199463, y: 0, z: -0.149083 },
      }}
      {...props}
    />
  );
};
