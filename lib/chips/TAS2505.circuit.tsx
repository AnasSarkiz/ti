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
    footprint={
      <footprint>
        <smtpad
          portHints={["pin25"]}
          pcbX="-0.000127mm"
          pcbY="-0.000127mm"
          width="2.7999944mm"
          height="2.7999944mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin24"]}
          pcbX="-1.950085mm"
          pcbY="-1.250061mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin23"]}
          pcbX="-1.950085mm"
          pcbY="-0.749935mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin22"]}
          pcbX="-1.950085mm"
          pcbY="-0.250063mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin21"]}
          pcbX="-1.950085mm"
          pcbY="0.249809mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin20"]}
          pcbX="-1.950085mm"
          pcbY="0.749935mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin19"]}
          pcbX="-1.950085mm"
          pcbY="1.249807mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin18"]}
          pcbX="-1.250061mm"
          pcbY="1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin17"]}
          pcbX="-0.750189mm"
          pcbY="1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin16"]}
          pcbX="-0.250063mm"
          pcbY="1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin15"]}
          pcbX="0.249809mm"
          pcbY="1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin14"]}
          pcbX="0.749935mm"
          pcbY="1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin13"]}
          pcbX="1.249807mm"
          pcbY="1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin12"]}
          pcbX="1.950085mm"
          pcbY="1.249807mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin11"]}
          pcbX="1.950085mm"
          pcbY="0.749935mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin10"]}
          pcbX="1.950085mm"
          pcbY="0.249809mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin9"]}
          pcbX="1.950085mm"
          pcbY="-0.250063mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin8"]}
          pcbX="1.950085mm"
          pcbY="-0.749935mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin7"]}
          pcbX="1.950085mm"
          pcbY="-1.250061mm"
          width="0.6999986mm"
          height="0.299974mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin6"]}
          pcbX="1.249807mm"
          pcbY="-1.949831mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin5"]}
          pcbX="0.749935mm"
          pcbY="-1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin4"]}
          pcbX="0.249809mm"
          pcbY="-1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin3"]}
          pcbX="-0.250063mm"
          pcbY="-1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin2"]}
          pcbX="-0.750189mm"
          pcbY="-1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin1"]}
          pcbX="-1.250061mm"
          pcbY="-1.950085mm"
          width="0.299974mm"
          height="0.6999986mm"
          shape="rect"
        />
      </footprint>
    }
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C2861514.obj?uuid=f9f49049b1e946aebac8a4ca9e490364",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C2861514.step?uuid=f9f49049b1e946aebac8a4ca9e490364",
      pcbRotationOffset: 90,
      modelOriginPosition: {
        x: -0.000012700000070253736,
        y: -0.0001269999999067295,
        z: -0.02,
      },
    }}
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
