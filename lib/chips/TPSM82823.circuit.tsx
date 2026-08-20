import { ChipProps } from "tscircuit";

export const TPSM82823_PIN_LABELS = {
  pin1: "VIN",
  pin2: "EN",
  pin3: "GND",
  pin4: "PG",
  pin5: "FB",
  pin6: "VOUT",
};

export const TPSM82823 = (props: ChipProps<any>) => (
  <chip
    {...props}
    pinLabels={TPSM82823_PIN_LABELS}
    // supplierPartNumbers={{
    //   jlcpcb: ["C5196953"],
    // }}
    schPinStyle={{
      GND: {
        marginTop: 1.3,
      },
      VOUT: {
        marginBottom: 1.3,
      },
      EN: {
        marginTop: 0.3,
      },
      PG: {
        marginTop: 0.3,
      },
    }}
    footprint="dfn10_p0.5mm_w2.78mm_pw0.25mm_pl1.065mm_pin1location(leftside,bottom)"
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C5196953.obj?uuid=f8dc55bb8e7e4af3a65abaa0221e33c1",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C5196953.step?uuid=f8dc55bb8e7e4af3a65abaa0221e33c1",
      pcbRotationOffset: 90,
      modelOriginPosition: { x: 0, y: 0.000012699999999199463, z: -0.01 },
    }}
  />
);
