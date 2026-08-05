import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: ["NC", "A1"],
  pin2: ["DIG_LDO_OUT", "A2"],
  pin3: ["DIG_LDO_OUT", "A3"],
  pin4: ["XTALM_FREFM", "XTALM", "FREFM", "A4"],
  pin5: ["MLDO_OUT", "A5"],
  pin6: ["N_SHUTD", "nSHUTD", "SHUTD", "A6"],
  pin7: ["CL1_5_LDO_OUT", "A7"],
  pin8: ["ADC_PPA_LDO_OUT", "A8"],
  pin9: ["MLDO_OUT", "A9"],
  pin10: ["NC_RF_GND", "A10"],
  pin11: ["NC_RF_GND", "A11"],
  pin12: ["DCO_LDO_OUT", "A12"],
  pin13: ["NC", "A13"],
  pin14: ["NC", "A14"],
  pin15: ["NC", "A15"],
  pin16: ["NC", "A16"],
  pin17: ["VDD_IO", "A17"],
  pin18: ["NC", "A18"],
  pin19: ["NC", "A19"],
  pin20: ["NC", "A20"],
  pin21: ["NC", "A21"],
  pin22: ["NC", "A22"],
  pin23: ["NC", "A23"],
  pin24: ["VSS", "GND", "A24"],
  pin25: ["SLOW_CLK", "A25"],
  pin26: ["HCI_RX", "UART_HCI_RX", "A26"],
  pin27: ["NC", "A27"],
  pin28: ["VSS", "GND", "A28"],
  pin29: ["HCI_CTS", "UART_HCI_CTS", "A29"],
  pin30: ["NC", "A30"],
  pin31: ["NC", "A31"],
  pin32: ["HCI_RTS", "UART_HCI_RTS", "A32"],
  pin33: ["HCI_TX", "UART_HCI_TX", "A33"],
  pin34: ["VDD_IO", "A34"],
  pin35: ["AUD_FSYNC", "PCM_AUD_FSYNC", "A35"],
  pin36: ["NC", "A36"],
  pin37: ["NC", "A37"],
  pin38: ["VDD_IO", "A38"],
  pin39: ["NC", "A39"],
  pin40: ["NC", "A40"],
  pin41: ["SRAM_LDO_OUT", "B1"],
  pin42: ["MLDO_OUT", "B2"],
  pin43: ["VSS_FREF", "GND", "B3"],
  pin44: ["XTALP_FREFP", "XTALP", "FREFP", "B4"],
  pin45: ["MLDO_IN", "B5"],
  pin46: ["CL1_5_LDO_IN", "B6"],
  pin47: ["MLDO_OUT", "B7"],
  pin48: ["BT_RF", "RF_BT", "B8"],
  pin49: ["NC_RF_GND", "B9"],
  pin50: ["NC_RF_GND", "B10"],
  pin51: ["VSS_DCO", "GND", "B11"],
  pin52: ["NC", "B12"],
  pin53: ["NC", "B13"],
  pin54: ["NC", "B14"],
  pin55: ["DIG_LDO_OUT", "B15"],
  pin56: ["NC", "B16"],
  pin57: ["NC", "B17"],
  pin58: ["VDD_IO", "B18"],
  pin59: ["VDD_IO", "B19"],
  pin60: ["NC", "B20"],
  pin61: ["VDD_IO", "B21"],
  pin62: ["VDD_IO", "B22"],
  pin63: ["NC", "B23"],
  pin64: ["TX_DBG", "DEBUG_TX", "B24"],
  pin65: ["VDD_IO", "B25"],
  pin66: ["DIG_LDO_OUT", "B26"],
  pin67: ["DIG_LDO_OUT", "B27"],
  pin68: ["NC", "B28"],
  pin69: ["NC", "B29"],
  pin70: ["NC", "B30"],
  pin71: ["NC", "B31"],
  pin72: ["AUD_CLK", "PCM_AUD_CLK", "B32"],
  pin73: ["AUD_OUT", "PCM_AUD_OUT", "B33"],
  pin74: ["AUD_IN", "PCM_AUD_IN", "B34"],
  pin75: ["DIG_LDO_OUT", "B35"],
  pin76: ["DIG_LDO_OUT", "B36"],
  pin77: ["EPAD", "EP_GND", "D1", "thermalpad"],
} as const;

/**
 * CC2564C VQFNP-MR schematic symbol.
 *
 * The package uses TI terminal names A1-A40 and B1-B36, plus exposed pad D1.
 * Only application-relevant terminals are drawn around the symbol, while every
 * physical terminal remains selectable by pin number and its TI terminal alias.
 *
 * The component also includes the RVM package footprint used for PCB placement.
 */
export const CC2564C = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="CC2564CRVMR"
    schWidth="6.5mm"
    schHeight="10mm"
    pinLabels={pinLabels}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [26, 33, 32, 29, 35, 72, 74, 73, 25, 6, 64, 14, 44, 4],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [
          48, 65, 61, 62, 59, 58, 38, 34, 17, 46, 45, 47, 42, 9, 5, 41, 8, 7,
          12, 2, 3, 55, 67, 66, 76, 75,
        ],
      },
    }}
    supplierPartNumbers={{
      jlcpcb: ["C2151624"],
    }}
    footprint={
      <footprint>
        <smtpad
          portHints={["pin1"]}
          pcbX="2.70002mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin2"]}
          pcbX="2.100072mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin3"]}
          pcbX="1.49987mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin4"]}
          pcbX="0.899922mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin5"]}
          pcbX="0.299974mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin6"]}
          pcbX="-0.299974mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin7"]}
          pcbX="-0.899922mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin8"]}
          pcbX="-1.500124mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin9"]}
          pcbX="-2.100072mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin10"]}
          pcbX="-2.70002mm"
          pcbY="3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin11"]}
          pcbX="-3.800094mm"
          pcbY="2.70002mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin12"]}
          pcbX="-3.800094mm"
          pcbY="2.100072mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin13"]}
          pcbX="-3.800094mm"
          pcbY="1.500124mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin14"]}
          pcbX="-3.800094mm"
          pcbY="0.900176mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin15"]}
          pcbX="-3.800094mm"
          pcbY="0.300228mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin16"]}
          pcbX="-3.800094mm"
          pcbY="-0.299974mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin17"]}
          pcbX="-3.800094mm"
          pcbY="-0.899922mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin18"]}
          pcbX="-3.800094mm"
          pcbY="-1.49987mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin19"]}
          pcbX="-3.800094mm"
          pcbY="-2.099818mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin20"]}
          pcbX="-3.800094mm"
          pcbY="-2.699766mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin21"]}
          pcbX="-2.70002mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin22"]}
          pcbX="-2.100072mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin23"]}
          pcbX="-1.49987mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin24"]}
          pcbX="-0.899922mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin25"]}
          pcbX="-0.299974mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin26"]}
          pcbX="0.299974mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin27"]}
          pcbX="0.899922mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin28"]}
          pcbX="1.500124mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin29"]}
          pcbX="2.100072mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin30"]}
          pcbX="2.70002mm"
          pcbY="-3.800094mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin31"]}
          pcbX="3.800094mm"
          pcbY="-2.699512mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin32"]}
          pcbX="3.800094mm"
          pcbY="-2.099564mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin33"]}
          pcbX="3.800094mm"
          pcbY="-1.499362mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin34"]}
          pcbX="3.800094mm"
          pcbY="-0.899414mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin35"]}
          pcbX="3.800094mm"
          pcbY="-0.299466mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin36"]}
          pcbX="3.800094mm"
          pcbY="0.300482mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin37"]}
          pcbX="3.800094mm"
          pcbY="0.90043mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin38"]}
          pcbX="3.800094mm"
          pcbY="1.500632mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin39"]}
          pcbX="3.800094mm"
          pcbY="2.10058mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin40"]}
          pcbX="3.800094mm"
          pcbY="2.700528mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin41"]}
          pcbX="2.3999952mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin42"]}
          pcbX="1.8000218mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin43"]}
          pcbX="1.200023mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin44"]}
          pcbX="0.5999988mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin45"]}
          pcbX="0mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin46"]}
          pcbX="-0.5999988mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin47"]}
          pcbX="-1.200023mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin48"]}
          pcbX="-1.8000218mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin49"]}
          pcbX="-2.3999952mm"
          pcbY="3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin50"]}
          pcbX="-3.10007mm"
          pcbY="2.4003mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin51"]}
          pcbX="-3.10007mm"
          pcbY="1.800352mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin52"]}
          pcbX="-3.10007mm"
          pcbY="1.20015mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin53"]}
          pcbX="-3.10007mm"
          pcbY="0.600202mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin54"]}
          pcbX="-3.10007mm"
          pcbY="0.000254mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin55"]}
          pcbX="-3.10007mm"
          pcbY="-0.599694mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin56"]}
          pcbX="-3.10007mm"
          pcbY="-1.199642mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin57"]}
          pcbX="-3.10007mm"
          pcbY="-1.79959mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin58"]}
          pcbX="-3.10007mm"
          pcbY="-2.399538mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin59"]}
          pcbX="-2.3999698mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin60"]}
          pcbX="-1.799971mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin61"]}
          pcbX="-1.1999976mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin62"]}
          pcbX="-0.5999988mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin63"]}
          pcbX="0mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin64"]}
          pcbX="0.5999988mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin65"]}
          pcbX="1.1999976mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin66"]}
          pcbX="1.799971mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin67"]}
          pcbX="2.3999698mm"
          pcbY="-3.10007mm"
          width="0.2999994mm"
          height="0.4500118mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin68"]}
          pcbX="3.10007mm"
          pcbY="-2.399792mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin69"]}
          pcbX="3.10007mm"
          pcbY="-1.79959mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin70"]}
          pcbX="3.10007mm"
          pcbY="-1.199642mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin71"]}
          pcbX="3.10007mm"
          pcbY="-0.599694mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin72"]}
          pcbX="3.10007mm"
          pcbY="0.000254mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin73"]}
          pcbX="3.10007mm"
          pcbY="0.600202mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin74"]}
          pcbX="3.10007mm"
          pcbY="1.200404mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin75"]}
          pcbX="3.10007mm"
          pcbY="1.800352mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin76"]}
          pcbX="3.10007mm"
          pcbY="2.4003mm"
          width="0.4500118mm"
          height="0.2999994mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin77"]}
          pcbX="0mm"
          pcbY="-0.1697482mm"
          width="2.999994mm"
          height="2.999994mm"
          shape="rect"
        />
        <silkscreenpath
          route={[
            { x: 4.064990600000101, y: 3.426485399999933 },
            { x: 3.4249105999999756, y: 4.064025399999991 },
            { x: 3.3131506000000854, y: 4.064025399999991 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: 3.021990399999936, y: -4.064000000000078 },
            { x: 3.1749999999999545, y: -4.064000000000078 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: -4.064000000000078, y: -3.0218634000000293 },
            { x: -4.064000000000078, y: -4.064000000000078 },
            { x: -3.0219903999998223, y: -4.064000000000078 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: -3.0219903999998223, y: 4.064000000000078 },
            { x: -4.064000000000078, y: 4.064000000000078 },
            { x: -4.064000000000078, y: 3.0221173999998427 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: 4.064000000000078, y: 3.022472999999991 },
            { x: 4.064000000000078, y: 4.064000000000078 },
            { x: 3.021990399999936, y: 4.064000000000078 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: 3.021990399999936, y: -4.064000000000078 },
            { x: 4.064000000000078, y: -4.064000000000078 },
            { x: 4.064000000000078, y: -3.0215078000001085 },
          ]}
        />
        <silkscreenpath
          route={[
            { x: 3.3020000000001346, y: 4.44500000000005 },
            { x: 3.2976725799386486, y: 4.41212998127196 },
            { x: 3.2849852262805825, y: 4.38149999999996 },
            { x: 3.264802561210786, y: 4.355197438789219 },
            { x: 3.238499999999931, y: 4.335014773719308 },
            { x: 3.2078700187280447, y: 4.322327420061129 },
            { x: 3.1749999999999545, y: 4.317999999999984 },
            { x: 3.1421299812720918, y: 4.322327420061129 },
            { x: 3.111499999999978, y: 4.335014773719308 },
            { x: 3.0851974387893506, y: 4.355197438789219 },
            { x: 3.06501477371944, y: 4.38149999999996 },
            { x: 3.0523274200612605, y: 4.41212998127196 },
            { x: 3.048000000000002, y: 4.44500000000005 },
            { x: 3.0523274200612605, y: 4.477870018727913 },
            { x: 3.06501477371944, y: 4.508500000000026 },
            { x: 3.0851974387893506, y: 4.534802561210654 },
            { x: 3.111499999999978, y: 4.554985226280564 },
            { x: 3.1421299812720918, y: 4.567672579938744 },
            { x: 3.1749999999999545, y: 4.572000000000003 },
            { x: 3.2078700187280447, y: 4.567672579938744 },
            { x: 3.238499999999931, y: 4.554985226280564 },
            { x: 3.264802561210786, y: 4.534802561210654 },
            { x: 3.2849852262805825, y: 4.508500000000026 },
            { x: 3.2976725799386486, y: 4.477870018727913 },
            { x: 3.3020000000001346, y: 4.44500000000005 },
          ]}
        />
        <silkscreentext
          text="{NAME}"
          pcbX="0.0004572mm"
          pcbY="5.5721778mm"
          anchorAlignment="center"
          fontSize="1mm"
        />
        <courtyardoutline
          outline={[
            { x: -4.31354280000005, y: 4.822177799999963 },
            { x: 4.3144571999999926, y: 4.822177799999963 },
            { x: 4.3144571999999926, y: -4.313822200000004 },
            { x: -4.31354280000005, y: -4.313822200000004 },
            { x: -4.31354280000005, y: 4.822177799999963 },
          ]}
        />
      </footprint>
    }
    schPinStyle={{
      pin26: { marginBottom: 0.15 },
      pin33: { marginBottom: 0.15 },
      pin32: { marginBottom: 0.15 },
      pin29: { marginBottom: 0.5 },
      pin35: { marginBottom: 0.15 },
      pin72: { marginBottom: 0.15 },
      pin74: { marginBottom: 0.15 },
      pin73: { marginBottom: 0.5 },
      pin25: { marginBottom: 0.5 },
      pin14: { marginBottom: 0.5 },
      pin48: { marginBottom: 0.5 },
      pin17: { marginBottom: 0.5 },
      pin45: { marginBottom: 0.5 },
      pin5: { marginBottom: 0.5 },
      pin12: { marginBottom: 0.5 },
    }}
    {...props}
  />
);

export default CC2564C;
