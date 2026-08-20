import { ChipProps } from "tscircuit";

export const DRV8833_PIN_LABELS = {
  pin16: "AIN1",
  pin15: "AIN2",
  pin9: "BIN1",
  pin10: "BIN2",
  pin1: "NSLEEEP",
  pin13: "GND",
  pin11: "VCP",
  pin2: "AOUT1",
  pin4: "AOUT2",
  pin7: "BOUT1",
  pin5: "BOUT2",
  pin8: "NFAULT",
  pin14: "VINT",
  pin3: "AISEN",
  pin6: "BISEN",
  pin12: "VM",
};

export const DRV8833 = (props: ChipProps<any>) => (
  <chip
    {...props}
    pinLabels={DRV8833_PIN_LABELS}
    supplierPartNumbers={{
      jlcpcb: ["C50506"],
    }}
    schPinArrangement={{
      leftSide: ["AIN1", "AIN2", "BIN1", "BIN2", "NSLEEEP"],
      rightSide: [
        "VCP",
        "AOUT1",
        "AOUT2",
        "BOUT1",
        "BOUT2",
        "NFAULT",
        "VINT",
        "AISEN",
        "BISEN",
      ],
      bottomSide: ["GND"],
      topSide: ["VM"],
    }}
    schPinStyle={{
      AIN2: {
        marginBottom: 0.4,
      },
      BIN2: {
        marginBottom: 0.4,
      },
      VINT: {
        marginTop: 0.4,
      },
      BOUT1: {
        marginTop: 0.4,
      },
      AOUT1: {
        marginTop: 0.4,
      },
    }}
    footprint="dfn16_thermalpad2.74mmx2.74mm_pillpads_p0.65mm_w7mm_pw0.35mm_pl1.3mm_pin1location(leftside,bottom)"
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C50506.obj?uuid=534f03d8fe164fbab551f91e5a792e30",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C50506.step?uuid=534f03d8fe164fbab551f91e5a792e30",
      pcbRotationOffset: 90,
      modelOriginPosition: { x: 0, y: 0, z: -0.019205 },
    }}
  />
);
