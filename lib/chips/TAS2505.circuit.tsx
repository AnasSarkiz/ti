import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "SPI_SEL",
  pin2: ["N_RST", "RST"],
  pin3: "AINL",
  pin4: "AINR",
  pin5: "HPOUT",
  pin6: "AVSS",
  pin7: "AVDD",
  pin8: "LDO_SEL",
  pin9: "SPKM",
  pin10: "SPKVDD",
  pin11: "SPKVSS",
  pin12: "SPKP",
  pin13: "DIN",
  pin14: "WCLK",
  pin15: "BCLK",
  pin16: "MCLK",
  pin17: "MISO",
  pin18: ["GPIO_DOUT", "GPIO", "DOUT"],
  pin19: ["SCL_SSZ", "I2C_SCL_SPI_SSZ", "SCL", "SSZ"],
  pin20: ["SDA_MOSI", "I2C_SDA_SPI_MOSI", "SDA", "MOSI"],
  pin21: "SCLK",
  pin22: "IOVDD",
  pin23: "DVDD",
  pin24: "DVSS",
  pin25: ["IOVSS", "EP", "thermalpad"],
} as const;

/** TAS2505 low-power mono class-D speaker amplifier and headphone driver. */
export const TAS2505 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="TAS2505IRGER"
    supplierPartNumbers={{ jlcpcb: ["C2861514"] }}
    footprint="qfn24_w4_h4_p0.5mm_thermalpad"
    schWidth="7mm"
    schHeight="9.5mm"
    pinLabels={pinLabels}
    schPinArrangement={{
      topSide: {
        direction: "left-to-right",
        pins: [6, 7, 8, 11, 10],
      },
      leftSide: {
        direction: "top-to-bottom",
        pins: [18, 20, 19, 16, 14, 13, 15, 2, 3, 4, 17, 21, 1],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [12, 9, 5],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [23, 24, 22, 25],
      },
    }}
    schPinStyle={{
      pin18: { marginBottom: 0.2 },
      pin20: { marginBottom: 0.2 },
      pin19: { marginBottom: 0.4 },
      pin16: { marginBottom: 0.2 },
      pin14: { marginBottom: 0.2 },
      pin13: { marginBottom: 0.2 },
      pin15: { marginBottom: 0.5 },
      pin2: { marginBottom: 0.5 },
      pin3: { marginBottom: 0.2 },
      pin4: { marginBottom: 0.5 },
      pin17: { marginBottom: 0.2 },
      pin21: { marginBottom: 0.2 },
      pin12: { marginBottom: 0.2 },
      pin9: { marginBottom: 3.2 },
      pin6: { marginRight: 0.15 },
      pin7: { marginRight: 0.15 },
      pin8: { marginRight: 0.15 },
      pin11: { marginRight: 0.15 },
      pin23: { marginRight: 0.2 },
      pin24: { marginRight: 0.2 },
      pin22: { marginRight: 0.2 },
    }}
    {...props}
  />
);

export default TAS2505;
