import { CC3235SF12RGKR } from "../chips/CC3235SF12RGKR.circuit.tsx";
import type { SubcircuitProps } from "@tscircuit/props";

export const WirelessMCU_CC3235SF = (props: SubcircuitProps) => (
  <subcircuit width={100} height={100} {...props} schMaxTraceDistance={10}>
    <CC3235SF12RGKR
      name="U2"
      schX={0}
      schY={0}
      schWidth={3.5}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [
            "VIN_IO1",
            "VIN_1O2",
            "VIN_DCDC_DIG",
            "VIN_DCDC_PA",
            "VIN_DCDC_ANA",
            "DCDC_ANA_SW",
            "VDD_ANA1",
            "LDO_IN1",
            "LDO_IN2",
            "DCDC_PA_SW_P",
            "DCDC_PA_SW_N",
            "DCDC_PA_OUT",
            "VDD_PA_IN",
            "DCDC_DIG_SW",
            "VDD_DIG1",
            "VDD_DIG2",
            "DCDC_ANA2_SW_P",
            "DCDC_ANA2_SW_N",
            "VDD_ANA2",
            "VDD_RAM",
            "VDD_PLL",
            "NC",
            "SOP0",
            "SOP1",
            "SOP2",
            "TCK",
            "TMS",
            "TDI",
            "TDO",
          ],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [
            "N_RESET",
            "RF_BG",
            "A_TX",
            "A_RX",
            "FLASH_SPI_CS",
            "FLASH_SPI_DIN",
            "FLASH_SPI_DOUT",
            "FLASH_SPI_CLK",
            "GPIO0",
            "GPIO1",
            "GPIO2",
            "GPIO3",
            "GPIO4",
            "GPIO5",
            "GPIO6",
            "GPIO7",
            "GPIO8",
            "GPIO9",
            "GPIO10",
            "GPIO11",
            "GPIO12",
            "GPIO13",
            "GPIO14",
            "GPIO15",
            "GPIO16",
            "GPIO17",
            "GPIO22",
            "GPIO28",
            "GPIO30",
            "RTC_XTAL_P",
            "RTC_XTAL_N",
            "WLAN_XTAL_P",
            "WLAN_XTAL_N",
            "GND1",
            "GND2",
            "EP",
          ],
        },
      }}
      schPinStyle={{
        LDO_IN2: {
          marginBottom: 0.3,
        },
        VDD_PLL: {
          marginBottom: 0.4,
        },
        NC: {
          marginBottom: 0.1,
        },
        SOP2: {
          marginBottom: 0.1,
        },
        FLASH_SPI_CLK: {
          marginBottom: 0.3,
        },
        GPIO7: {
          marginBottom: 0.1,
        },
        GPIO15: {
          marginBottom: 0.1,
        },
        GPIO30: {
          marginBottom: 0.2,
        },
        RTC_XTAL_N: {
          marginBottom: 0.1,
        },
        WLAN_XTAL_N: {
          marginBottom: 0.1,
        },
      }}
      connections={{
        VIN_IO1: "net.VBAT_CC",
        VIN_1O2: "net.VBAT_CC",
        VIN_DCDC_DIG: "net.VBAT_CC",
        VIN_DCDC_PA: "net.VBAT_CC",
        VIN_DCDC_ANA: "net.VBAT_CC",
        LDO_IN1: "net.VBAT_CC",
        LDO_IN2: "net.VBAT_CC",
        VDD_ANA1: "net.VDD_ANA",
        VDD_DIG1: "net.VDD_DIG",
        VDD_DIG2: "net.VDD_DIG",
        VDD_PA_IN: "net.VDD_PA",
        DCDC_PA_OUT: "net.VDD_PA",
        VDD_RAM: "net.VDD_RAM",
        VDD_PLL: "net.VDD_PLL",
        VDD_ANA2: "net.VDD_ANA2",
        DCDC_ANA2_SW_P: "net.VDD_ANA2",
        DCDC_ANA2_SW_N: "net.VDD_ANA2",
        N_RESET: "net.CC_nRESET",
        RF_BG: "net.RF_BG",
        A_TX: "net.A_TX",
        A_RX: "net.A_RX",
        FLASH_SPI_CS: "net.SFL_CS",
        FLASH_SPI_DIN: "net.SFL_DIN",
        FLASH_SPI_DOUT: "net.SFL_DOUT",
        FLASH_SPI_CLK: "net.SFL_CLK",
        SOP0: "net.SOP0",
        SOP1: "net.SOP1",
        SOP2: "net.SOP2",
        TDO: "net.P17_JTAG_TDO",
        TDI: "net.P16_JTAG_TDI",
        TMS: "net.P20_JTAG_TMS",
        TCK: "net.P19_JTAG_TCK",
        GPIO0: "net.P50_GPIO_00",
        GPIO1: "net.P55_GPIO_01",
        GPIO2: "net.P57_GPIO_02",
        GPIO3: "net.P58_GPIO_03",
        GPIO4: "net.P59_GPIO_04",
        GPIO5: "net.P60_GPIO_05",
        GPIO6: "net.P61_GPIO_06",
        GPIO7: "net.P62_GPIO_07",
        GPIO8: "net.P63_GPIO_08",
        GPIO9: "net.P64_GPIO_09",
        GPIO10: "net.P01_GPIO_10",
        GPIO11: "net.P02_GPIO_11",
        GPIO12: "net.P03_GPIO_12",
        GPIO13: "net.P04_GPIO_13",
        GPIO14: "net.P05_GPIO_14",
        GPIO15: "net.P06_GPIO_15",
        GPIO16: "net.P07_GPIO_16",
        GPIO17: "net.P08_GPIO_17",
        GPIO22: "net.P15_GPIO_22",
        GPIO28: "net.P18_GPIO_28",
        GPIO30: "net.P53_GPIO_30",
        GND1: "net.GND",
        GND2: "net.GND",
        EP: "net.GND",
      }}
    />

    <capacitor
      schRotation={270}
      name="C1"
      capacitance="100uF"
      footprint="1210"
      schX={-0.91}
      schY={7.8}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C2"
      capacitance="100uF"
      footprint="1210"
      schX={0.5}
      schY={7.8}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C3"
      capacitance="4.7uF"
      footprint="0603"
      schX={-11.61}
      schY={7}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C4"
      capacitance="4.7uF"
      footprint="0603"
      schX={-9.19}
      schY={7}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C5"
      capacitance="0.6pF"
      footprint="0402"
      schX={-8.18}
      schY={7}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C6"
      capacitance="4.7uF"
      footprint="0603"
      schX={-6.97}
      schY={7}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C7"
      capacitance="0.5pF"
      footprint="0402"
      schX={-5.96}
      schY={7}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C8"
      capacitance="0.1uF"
      footprint="0402"
      schX={-4.75}
      schY={7}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C9"
      capacitance="0.1uF"
      footprint="0402"
      schX={-3.54}
      schY={7}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />

    <inductor
      name="L1"
      inductance="2.2uH"
      footprint="0603"
      schX={-9.41}
      schY={5.65}
    />
    <trace name="ANA_SW_L1" from=".U2 .DCDC_ANA_SW" to=".L1 .pin1" />
    <trace name="L1_ANA" from=".L1 .pin2" to="net.VDD_ANA" />
    <capacitor
      schRotation={270}
      name="C12"
      capacitance="10uF"
      footprint="0805"
      schX={-10.76}
      schY={3.53}
      connections={{ pin1: "net.VDD_ANA", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C13"
      capacitance="0.1uF"
      footprint="0402"
      schX={-9.95}
      schY={3.53}
      connections={{ pin1: "net.VDD_ANA", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C14"
      capacitance="0.2pF"
      footprint="0402"
      schX={-9.14}
      schY={3.53}
      connections={{ pin1: "net.VDD_ANA", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C15"
      capacitance="0.1uF"
      footprint="0402"
      schX={-8.13}
      schY={3.53}
      connections={{ pin1: "net.VDD_ANA", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C16"
      capacitance="0.6pF"
      footprint="0402"
      schX={-7.12}
      schY={3.53}
      connections={{ pin1: "net.VDD_ANA", pin2: "net.GND" }}
    />

    <inductor
      name="L2"
      inductance="1uH"
      footprint="0603"
      schX={-6.78}
      schY={2.42}
    />
    <trace name="PA_SWP_L2" from=".U2 .DCDC_PA_SW_P" to=".L2 .pin1" />
    <trace name="PA_SWN_L2" from=".U2 .DCDC_PA_SW_N" to=".L2 .pin2" />
    <capacitor
      schRotation={270}
      name="C17"
      capacitance="22uF"
      footprint="0805"
      schX={-11.16}
      schY={0.5}
      connections={{ pin1: "net.VDD_PA", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C18"
      capacitance="22uF"
      footprint="0805"
      schX={-10.35}
      schY={0.5}
      connections={{ pin1: "net.VDD_PA", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C19"
      capacitance="1uF"
      footprint="0603"
      schX={-9.35}
      schY={0.5}
      connections={{ pin1: "net.VDD_PA", pin2: "net.GND" }}
    />

    <inductor
      name="L3"
      inductance="2.2uH"
      footprint="0603"
      schX={-6.38}
      schY={0.4}
    />
    <trace name="DIG_SW_L3" from=".U2 .DCDC_DIG_SW" to=".L3 .pin1" />
    <trace name="L3_DIG" from=".L3 .pin2" to="net.VDD_DIG" />
    <capacitor
      schRotation={270}
      name="C20"
      capacitance="10uF"
      footprint="0805"
      schX={-7.53}
      schY={-1.12}
      connections={{ pin1: "net.VDD_DIG", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C21"
      capacitance="0.1uF"
      footprint="0402"
      schX={-6.72}
      schY={-1.12}
      connections={{ pin1: "net.VDD_DIG", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C22"
      capacitance="0.1uF"
      footprint="0402"
      schX={-5.71}
      schY={-1.12}
      connections={{ pin1: "net.VDD_DIG", pin2: "net.GND" }}
    />

    <capacitor
      schRotation={270}
      name="C29"
      capacitance="0.6pF"
      footprint="0402"
      schX={-5.71}
      schY={-5.15}
      connections={{ pin1: "net.VDD_ANA2", pin2: "net.GND" }}
    />

    <resistor
      schRotation={270}
      name="R5"
      resistance="0"
      footprint="0402"
      schX={-12.74}
      schY={-1.92}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.VDD_PLL" }}
    />
    <capacitor
      schRotation={270}
      name="C23"
      capacitance="10uF"
      footprint="0805"
      schX={-12.58}
      schY={-3.33}
      connections={{ pin1: "net.VDD_PLL", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C24"
      capacitance="0.1uF"
      footprint="0402"
      schX={-9.54}
      schY={-3.53}
      connections={{ pin1: "net.VDD_PLL", pin2: "net.GND" }}
    />
    <inductor
      name="L4"
      inductance="10uH"
      footprint="0805"
      schX={-9.2}
      schY={-1.82}
    />
    <trace name="PLL_L4" from=".L4 .pin1" to="net.VDD_PLL" />
    <trace name="L4_RAM" from=".L4 .pin2" to="net.VDD_RAM" />
    <capacitor
      schRotation={270}
      name="C25"
      capacitance="0.1uF"
      footprint="0402"
      schX={-8.74}
      schY={-3.53}
      connections={{ pin1: "net.VDD_RAM", pin2: "net.GND" }}
    />

    <resistor
      schRotation={270}
      name="R1"
      resistance="100k"
      footprint="0402"
      schX={2.8}
      schY={9}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.CC_nRESET" }}
    />
    <capacitor
      schRotation={270}
      name="C10"
      capacitance="0.01uF"
      footprint="0402"
      schX={2.97}
      schY={7}
      connections={{ pin1: "net.CC_nRESET", pin2: "net.GND" }}
    />

    <chip
      name="U1"
      manufacturerPartNumber="MX25R3235FM1IL0"
      footprint="soic8"
      schX={12.11}
      schY={4.94}
      pinLabels={{
        pin1: "CS",
        pin2: "SO",
        pin3: "WP",
        pin4: "GND",
        pin5: "SI",
        pin6: "SCLK",
        pin7: "RESET",
        pin8: "VCC",
      }}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: ["VCC", "CS", "SCLK", "SI", "SO", "WP", "RESET"],
        },
        rightSide: { direction: "top-to-bottom", pins: ["GND"] },
      }}
      connections={{
        VCC: "net.VBAT_CC",
        CS: "net.SFL_CS",
        SCLK: "net.SFL_CLK",
        SI: "net.SFL_DOUT",
        SO: "net.SFL_DIN",
        WP: "net.VBAT_CC",
        RESET: "net.VBAT_CC",
        GND: "net.GND",
      }}
    />
    <capacitor
      schRotation={270}
      name="C11"
      capacitance="0.1uF"
      footprint="0402"
      schX={8.22}
      schY={4.94}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.GND" }}
    />
    <resistor
      schRotation={270}
      name="R2"
      resistance="100k"
      footprint="0402"
      schX={7.24}
      schY={5.14}
      connections={{ pin1: "net.VBAT_CC", pin2: "net.SFL_CS" }}
    />
    <resistor
      schRotation={270}
      name="R3"
      resistance="100k"
      footprint="0402"
      schX={8.8}
      schY={2.72}
      connections={{ pin1: "net.SFL_CLK", pin2: "net.GND" }}
    />
    <resistor
      schRotation={270}
      name="R4"
      resistance="100k"
      footprint="0402"
      schX={9.66}
      schY={2.72}
      connections={{ pin1: "net.SFL_DOUT", pin2: "net.GND" }}
    />

    <crystal
      name="Y1"
      frequency="32.768kHz"
      loadCapacitance="10pF"
      footprint="0402"
      schX={12.61}
      schY={-2.8}
    />
    <trace name="RTCP_Y1" from=".U2 .RTC_XTAL_P" to=".Y1 .pin1" />
    <trace name="RTCN_Y1" from=".U2 .RTC_XTAL_N" to=".Y1 .pin2" />
    <capacitor
      schRotation={270}
      name="C27"
      capacitance="10pF"
      footprint="0402"
      schX={13.88}
      schY={-4.14}
      connections={{ pin1: ".Y1 .pin1", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C26"
      capacitance="10pF"
      footprint="0402"
      schX={11.86}
      schY={-4.14}
      connections={{ pin1: ".Y1 .pin2", pin2: "net.GND" }}
    />

    <crystal
      name="Y2"
      frequency="40MHz"
      loadCapacitance="6.2pF"
      pinVariant="four_pin"
      footprint="qfn4"
      schX={8.8}
      schY={-5.4}
    />
    <trace name="WLANP_Y2" from=".U2 .WLAN_XTAL_P" to=".Y2 .pin1" />
    <trace name="WLANN_Y2" from=".U2 .WLAN_XTAL_N" to=".Y2 .pin3" />
    <trace name="Y2_GND1" from=".Y2 .pin2" to="net.GND" />
    <trace name="Y2_GND2" from=".Y2 .pin4" to="net.GND" />
    <capacitor
      schRotation={270}
      name="C28"
      capacitance="6.2pF"
      footprint="0402"
      schX={11.05}
      schY={-4.54}
      connections={{ pin1: ".Y2 .pin1", pin2: "net.GND" }}
    />
    <capacitor
      schRotation={270}
      name="C30"
      capacitance="6.2pF"
      footprint="0402"
      schX={7.22}
      schY={-5.15}
      connections={{ pin1: ".Y2 .pin3", pin2: "net.GND" }}
    />

    <pinheader name="J1" pinCount={3} schX={-11.8} schY={-7.65} />
    <resistor
      schRotation={270}
      name="R6"
      resistance="270"
      footprint="0402"
      schX={-9.51}
      schY={-6}
      connections={{ pin1: "net.VBAT_CC", pin2: ".J1 .pin1" }}
    />
    <resistor
      schRotation={270}
      name="R9"
      resistance="100k"
      footprint="0402"
      schX={-10.32}
      schY={-8.99}
      connections={{ pin1: ".J1 .pin3", pin2: "net.GND" }}
    />
    <trace name="J1_SOP2" from=".J1 .pin2" to="net.SOP2" />

    <pinheader name="J2" pinCount={3} schX={-9.7} schY={-7.65} />
    <resistor
      schRotation={270}
      name="R7"
      resistance="69.8k"
      footprint="0402"
      schX={-8.3}
      schY={-6}
      connections={{ pin1: "net.VBAT_CC", pin2: ".J2 .pin1" }}
    />
    <resistor
      schRotation={270}
      name="R10"
      resistance="69.8k"
      footprint="0402"
      schX={-9.06}
      schY={-8.99}
      connections={{ pin1: ".J2 .pin3", pin2: "net.GND" }}
    />
    <trace name="J2_SOP0" from=".J2 .pin2" to="net.SOP0" />

    <pinheader name="J3" pinCount={3} schX={-7.5} schY={-7.65} />
    <resistor
      schRotation={270}
      name="R8"
      resistance="69.8k"
      footprint="0402"
      schX={-7.09}
      schY={-6}
      connections={{ pin1: "net.VBAT_CC", pin2: ".J3 .pin1" }}
    />
    <resistor
      schRotation={270}
      name="R11"
      resistance="69.8k"
      footprint="0402"
      schX={-7.85}
      schY={-8.99}
      connections={{ pin1: ".J3 .pin3", pin2: "net.GND" }}
    />
    <trace name="J3_SOP1" from=".J3 .pin2" to="net.SOP1" />

    <testpoint
      name="TP1"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1mm"
      schX={12.27}
      schY={0.48}
    />
    <testpoint
      name="TP2"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1mm"
      schX={12.27}
      schY={0.08}
    />
    <testpoint
      name="TP3"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1mm"
      schX={12.27}
      schY={-0.33}
    />
    <testpoint
      name="TP4"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1mm"
      schX={12.27}
      schY={-0.73}
    />
    <testpoint
      name="TP5"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1mm"
      schX={12.27}
      schY={-1.13}
    />
    <trace name="TP1_nRST" from=".TP1 .pin1" to="net.CC_nRESET" />
    <trace name="TP2_G01" from=".TP2 .pin1" to="net.P55_GPIO_01" />
    <trace name="TP3_G02" from=".TP3 .pin1" to="net.P57_GPIO_02" />
    <trace name="TP4_SOP0" from=".TP4 .pin1" to="net.SOP0" />
    <trace name="TP5_SOP2" from=".TP5 .pin1" to="net.SOP2" />
  </subcircuit>
);

export default WirelessMCU_CC3235SF;
