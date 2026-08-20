import { ChipProps } from "tscircuit";

export const TPS6293_PIN_LABELS = {
  pin1: "VIN",
  pin2: "EN",
  pin3: "SS",
  pin4: "RT",
  pin5: "GND",
  pin6: "FB",
  pin7: "SW",
  pin8: "BST",
};

export const TPS6293 = (props: ChipProps<any>) => (
  <chip
    {...props}
    pinLabels={TPS6293_PIN_LABELS}
    // supplierPartNumbers={{
    //   jlcpcb: ["C3200405"],
    // }}
    schPinStyle={{
      VIN: {
        marginBottom: 0.2,
      },
      EN: {
        marginBottom: 0.2,
      },
      SS: {
        marginBottom: 0.2,
      },
      BST: {
        marginBottom: 0.2,
      },
      SW: {
        marginBottom: 0.2,
      },
      FB: {
        marginBottom: 0.2,
      },
    }}
    footprint="dfn8_p0.5001mm_w1.9604mm_pw0.28mm_pl0.68mm_pin1location(rightside,bottom)"
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C3200405.obj?uuid=36a9e7915d7846da9e342bb5ad15102b",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C3200405.step?uuid=36a9e7915d7846da9e342bb5ad15102b",
      pcbRotationOffset: 0,
      modelOriginPosition: { x: 0, y: -0.0022879000000165517, z: -0.135 },
    }}
  />
);
