import type { ChipProps } from "tscircuit";

const pinLabels = {
  pin1: ["IO_B2", "B2"],
  pin2: "GND",
  pin3: "VCCA",
  pin4: ["IO_A2", "A2"],
  pin5: ["IO_A1", "A1"],
  pin6: "OE",
  pin7: "VCCB",
  pin8: ["IO_B1", "B1"],
} as const;

export const TXS0102DCUR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    pinLabels={pinLabels}
    pinAttributes={{
      A1: {
        requiresPower: true,
      },
      A2: {
        requiresPower: true,
      },
      B1: {
        requiresPower: true,
      },
      B2: {
        requiresPower: true,
      },
      GND: {
        requiresGround: true,
      },
      OE: {
        mustBeConnected: true,
      },
    }}
    schPinArrangement={{
      topSide: {
        direction: "left-to-right",
        pins: ["VCCA", "VCCB"],
      },
      leftSide: {
        direction: "top-to-bottom",
        pins: ["OE", "A1", "A2"],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: ["B1", "B2"],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: ["GND"],
      },
    }}
    schPinStyle={{
      VCCA: {
        marginRight: 0.5,
      },
      VCCB: {
        marginLeft: 0.5,
      },
      OE: {
        marginBottom: 0.7,
      },
      A1: {
        marginTop: 0.15,
      },
      B1: {
        marginTop: 1,
      },
    }}
    schWidth={2}
    schHeight={3}
    supplierPartNumbers={{
      jlcpcb: ["C53434"],
    }}
    manufacturerPartNumber="TXS0102DCUR"
    footprint="dfn8_p0.508mm_w3.8001mm_pw0.25mm_pl0.7mm_pin1location(leftside,bottom)"
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C53434.obj?uuid=49b0213b4b994294a133f584e9799a83",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C53434.step?uuid=49b0213b4b994294a133f584e9799a83",
      pcbRotationOffset: 270,
      modelOriginPosition: {
        x: 0.00011430000006384944,
        y: 0.00012700000002041634,
        z: 0.000795,
      },
    }}
    {...props}
  />
);

export default TXS0102DCUR;
