import type { ChipProps } from "tscircuit";

const pinLabels = {
  pin1: "VCCA",
  pin2: ["IO_A1", "A1"],
  pin3: ["IO_A2", "A2"],
  pin4: ["IO_A3", "A3"],
  pin5: ["IO_A4", "A4"],
  pin6: "NC1",
  pin7: "GND",
  pin8: "OE",
  pin9: "NC2",
  pin10: ["IO_B4", "B4"],
  pin11: ["IO_B3", "B3"],
  pin12: ["IO_B2", "B2"],
  pin13: ["IO_B1", "B1"],
  pin14: "VCCB",
  pin15: "EP",
} as const;

export const TXB0104RGYR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    {...props}
    pinLabels={pinLabels}
    pinAttributes={{
      A1: {
        requiresPower: true,
      },
      A2: {
        requiresPower: true,
      },
      A3: {
        requiresPower: true,
      },
      A4: {
        requiresPower: true,
      },
      B1: {
        requiresPower: true,
      },
      B2: {
        requiresPower: true,
      },
      B3: {
        requiresPower: true,
      },
      B4: {
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
        pins: ["OE", "A1", "A2", "A3", "A4"],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: ["B1", "B2", "B3", "B4"],
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
      jlcpcb: ["C400708"],
    }}
    manufacturerPartNumber="TXB0104RGYR"
    footprint="qfn14_leftpins2_toppins5_rightpins2_bottompins5_thermalpad2.05mmx2.05mm_py1.5mm_h4.5mm_pw0.28mm_pl0.8mm"
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C400708.obj?uuid=cc9a7c4d6c3844ba9e2ed6c3b0f8d939",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C400708.step?uuid=cc9a7c4d6c3844ba9e2ed6c3b0f8d939",
      pcbRotationOffset: 0,
      modelOriginPosition: { x: 0, y: 0, z: -0.02 },
    }}
    {...props}
  />
);

export default TXB0104RGYR;
