import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { MSP430F5229IRGCR } from "../chips/MSP430F5229IRGCR.circuit.tsx";

export const BluetoothAudioHost_MSP430F5229 = (props: SubcircuitProps) => (
  <subcircuit {...props} schTraceAutoLabelEnabled schMaxTraceDistance="3mm">
    {/* Reference-design page frame and title block */}

    <MSP430F5229IRGCR
      name="U10"
      displayName=""
      schX={-4.8}
      schY={0.2}
      connections={{
        pin1: "net.CB0",
        pin2: "net.CB1",
        pin3: "net.CB2",
        pin11: "net.VCC_5229",
        pin12: "net.XIN_32K",
        pin13: "net.XOUT_32K",
        pin14: "net.GND",
        pin15: "net.VCC_5229",
        pin16: "net.GND",
        pin17: "net.VCORE",
        pin18: "net.MSP_MCLK_3V3",
        pin19: "net.LED1",
        pin20: "net.LED2",
        pin21: "net.LED3",
        pin22: "net.HCI_RTS_1V8_CC",
        pin23: "net.HCI_CTS_1V8_CC",
        pin24: "net.CBOUT",
        pin25: "net.nSHUTDOWN_1V8_CC",
        pin26: "net.AUDIO_nRESET_1V8_5229",
        pin34: "net.I2C_SDA_1V8_5229",
        pin35: "net.I2C_SCL_1V8_5229",
        pin37: "net.HCI_RX_1V8_CC",
        pin38: "net.HCI_TX_1V8_CC",
        pin39: "net.GND",
        pin40: "net.DVIO_1V8_5229",

        pin56: "net.MSP430_RESET",
        pin59: "net.TEST_SBWTCK_5229",
        pin60: "net.TDO_5229",
        pin61: "net.TDI_5229",
        pin62: "net.TMS_5229",
        pin63: "net.TCK_5229",
        pin64: "net.nRST_SBWTDIO_5229",
        pin65: "net.GND",
      }}
      noConnect={[
        "pin4",
        "pin5",
        "pin6",
        "pin7",
        "pin8",
        "pin9",
        "pin10",
        "pin27",
        "pin29",
        "pin33",
        "pin36",
        "pin41",
        "pin42",
        "pin43",
        "pin44",
        "pin47",
        "pin48",
        "pin49",
        "pin50",
        "pin51",
        "pin52",
        "pin53",
        "pin54",
        "pin55",
        "pin57",
        "pin58",
      ]}
    />

    {/* 32.768 kHz clock */}
    <crystal
      name="Y2"
      footprint="kicad:Crystal/Crystal_SMD_3215-2Pin_3.2x1.5mm"
      frequency="32.768kHz"
      loadCapacitance={0}
      schX={-14.0}
      schY={0.4}
      schOrientation="vertical"
      connections={{
        pin1: "net.XIN_32K",
        pin2: "net.XOUT_32K",
      }}
    />

    <capacitor
      name="C47"
      capacitance="12pF"
      maxVoltageRating="50V"
      footprint="0402"
      schX={-11.6}
      schY={1.5}
      schOrientation="vertical"
      connections={{
        pin1: "net.XIN_32K",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C46"
      capacitance="12pF"
      maxVoltageRating="50V"
      footprint="0402"
      schX={-14.0}
      schY={-1.6}
      schOrientation="vertical"
      connections={{
        pin1: "net.XOUT_32K",
        pin2: "net.GND",
      }}
    />

    {/* MSP430 reset button */}
    <resistor
      name="R12"
      resistance="47k"
      footprint="0402"
      schX={-3.5}
      schY={9.5}
      schOrientation="vertical"
      connections={{
        pin1: "net.DVIO_1V8_5229",
        pin2: "net.MSP430_RESET",
      }}
    />

    <capacitor
      name="C44"
      capacitance="2.2nF"
      footprint="0402"
      schX={-1.8}
      schY={8.1}
      schOrientation="vertical"
      connections={{
        pin1: "net.MSP430_RESET",
        pin2: "net.GND",
      }}
    />

    <pushbutton
      name="S1"
      displayName="MSP430 RESET"
      footprint="smdpushbutton"
      schX={0.2}
      schY={8.8}
      connections={{
        pin1: "net.MSP430_RESET",
        pin2: "net.GND",
      }}
    />

    {/* SBW/JTAG reset pull-up */}
    <resistor
      name="R28"
      resistance="47k"
      footprint="0402"
      schX={7.7}
      schY={0.0}
      connections={{
        pin1: "net.nRST_SBWTDIO_5229",
        pin2: "net.VCC_5229",
      }}
    />

    <capacitor
      name="C43"
      capacitance="2.2nF"
      footprint="0402"
      schX={6.2}
      schY={-1.0}
      schOrientation="vertical"
      connections={{
        pin1: "net.nRST_SBWTDIO_5229",
        pin2: "net.GND",
      }}
    />

    {/* MSP430 JTAG connector */}
    <chip
      name="J2"
      footprint="kicad:Connector_IDC/IDC-Header_2x07_P2.54mm_Vertical"
      schX={8.0}
      schY={8.0}
      manufacturerPartNumber="MSP430 JTAG"
      schWidth="1.5mm"
      schHeight="3mm"
      pinLabels={{
        pin1: "TDO",
        pin2: "VCC",
        pin3: "TDI",
        pin4: "SENSE",
        pin5: "TMS",
        pin6: "NC6",
        pin7: "TCK",
        pin8: "TEST_SBWTCK",
        pin9: "GND",
        pin10: "NC10",
        pin11: "nRST_SBWTDIO",
        pin12: "NC12",
      }}
      schPinArrangement={{
        leftSide: {
          direction: "bottom-to-top",
          pins: [2, 4, 6, 8, 10, 12, 14],
        },
        rightSide: {
          direction: "bottom-to-top",
          pins: [1, 3, 5, 7, 9, 11, 13],
        },
      }}
      schPinStyle={{
        pin1: { marginBottom: 0.2 },
        pin2: { marginBottom: 0.2 },
        pin3: { marginBottom: 0.2 },
        pin4: { marginBottom: 0.2 },
        pin5: { marginBottom: 0.2 },
        pin6: { marginBottom: 0.2 },
        pin7: { marginBottom: 0.2 },
        pin8: { marginBottom: 0.2 },
        pin9: { marginBottom: 0.2 },
        pin10: { marginBottom: 0.2 },
        pin11: { marginBottom: 0.2 },
        pin12: { marginBottom: 0.2 },
        pin13: { marginBottom: 0.2 },
        pin14: { marginBottom: 0.2 },
      }}
      noConnect={["pin6", "pin10", "pin12"]}
      connections={{
        pin1: "net.TDO_5229",
        pin2: "net.JTAG_PWR_3V3",
        pin3: "net.TDI_5229",
        pin4: "net.JTAG_SENSE",
        pin5: "net.TMS_5229",
        pin7: "net.TCK_5229",
        pin8: "net.TEST_SBWTCK_5229",
        pin9: "net.GND",
        pin11: "net.nRST_SBWTDIO_5229",
      }}
    />

    <pinheader
      name="J6"
      footprint="kicad:Connector_PinHeader_2.54mm/PinHeader_1x02_P2.54mm_Vertical"
      displayName="JTAG SENSE"
      pinCount={2}
      gender="male"
      pitch="2.54mm"
      schX={2.0}
      schY={6.8}
      pinLabels={["VCC_5229", "JTAG_SENSE"]}
      connections={{
        pin1: "net.VCC_5229",
        pin2: "net.JTAG_SENSE",
      }}
    />

    {/* 1.8 V and source selection */}
    <chip
      name="J5"
      footprint="kicad:Connector_PinHeader_2.54mm/PinHeader_1x02_P2.54mm_Vertical"
      manufacturerPartNumber="VDD_1V8"
      schX={3}
      schY={0}
      connections={{
        pin1: "net.VDD_1V8_LDO",
        pin2: "net.DVIO_1V8_5229",
      }}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [1, 2],
        },
      }}
    />

    <chip
      name="S3"
      footprint="kicad:Button_Switch_THT/SW_CuK_JS202011AQN_DPDT_Angled"
      manufacturerPartNumber="POS 2 SW"
      schX={8.2}
      schY={3.5}
      schWidth="1.5mm"
      schHeight="1.5mm"
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [2],
        },
        topSide: {
          direction: "left-to-right",
          pins: [1],
        },
        bottomSide: {
          direction: "left-to-right",
          pins: [3],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [4, 5, 6],
        },
      }}
      connections={{
        pin1: "net.VDD_2V8_LDO",
        pin2: "net.VCC_5229",
        pin3: "net.JTAG_PWR_3V3",
      }}
      noConnect={["pin4", "pin5", "pin6"]}
    />

    {/* Debug and clock headers */}
    <chip
      name="J15"
      footprint="kicad:Connector_PinHeader_2.54mm/PinHeader_1x02_P2.54mm_Vertical"
      manufacturerPartNumber="DEBUG"
      schX={2.0}
      schY={2.2}
      connections={{
        pin1: "U10.pin46",
        pin2: "U10.pin45",
      }}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [1, 2],
        },
      }}
    />

    <chip
      name="J17"
      footprint="kicad:Connector_PinHeader_2.54mm/PinHeader_1x01_P2.54mm_Vertical"
      displayName="SMCLK"
      schX={-3.25}
      schY={-8}
      connections={{
        pin1: "U10.pin28",
      }}
      schPinArrangement={{
        topSide: {
          direction: "left-to-right",
          pins: [1],
        },
      }}
    />

    {/* Scan switch, DNI in source design */}
    <chip
      name="S4"
      footprint="kicad:Button_Switch_SMD/SW_SP3T_PCM13"
      displayName="ScanSW DNI"
      manufacturerPartNumber="SCAN-SWITCH"
      doNotPlace
      schX={-1.8}
      schY={-7}
      schWidth="1.5mm"
      schHeight="1.5mm"
      pinLabels={{
        pin1: "S1",
        pin2: "S2",
        pin3: "S3",
        pin4: "S0",
      }}
      schPinArrangement={{
        topSide: {
          direction: "left-to-right",
          pins: [2, 3],
        },
        bottomSide: {
          direction: "left-to-right",
          pins: [4, 1],
        },
      }}
      schPinStyle={{
        pin1: { marginRight: 0.2 },
        pin2: { marginRight: 0.2 },
        pin3: { marginRight: 0.2 },
        pin4: { marginRight: 0.2 },
      }}
      connections={{
        pin1: "net.DVIO_1V8_5229",
        pin2: "U10.pin31",
        pin3: "U10.pin32",
        pin4: "U10.pin30",
      }}
    />

    {/* Slow clock level divider */}
    <resistor
      name="R10"
      resistance="10k"
      footprint="0402"
      schX={-4.8}
      schY={-7.7}
      schOrientation="vertical"
      connections={{
        pin1: "net.MSP_MCLK_3V3",
        pin2: "net.SLOW_CLK_1V8_CC",
      }}
    />

    <resistor
      name="R11"
      resistance="18k"
      footprint="0402"
      schX={-5.7}
      schY={-8.9}
      schOrientation="vertical"
      connections={{
        pin1: "net.SLOW_CLK_1V8_CC",
        pin2: "net.GND",
      }}
    />

    {/* Status LEDs */}
    <resistor
      name="R6"
      resistance="470ohm"
      footprint="0402"
      schX={0.3}
      schY={-7.8}
      schOrientation="vertical"
      connections={{
        pin1: "net.LED1",
        pin2: "net.LED1_A",
      }}
    />

    <led
      name="D2"
      displayName="YLW"
      color="yellow"
      footprint="led0603"
      schX={0.3}
      schY={-9.0}
      schOrientation="vertical"
      connections={{
        anode: "net.LED1_A",
        cathode: "net.GND",
      }}
    />

    <resistor
      name="R7"
      resistance="470ohm"
      footprint="0402"
      schX={2.3}
      schY={-7.8}
      schOrientation="vertical"
      connections={{
        pin1: "net.LED2",
        pin2: "net.LED2_A",
      }}
    />

    <led
      name="D3"
      displayName="RED"
      color="red"
      footprint="led0603"
      schX={2.3}
      schY={-9.0}
      schOrientation="vertical"
      connections={{
        anode: "net.LED2_A",
        cathode: "net.GND",
      }}
    />

    <resistor
      name="R15"
      resistance="470ohm"
      footprint="0402"
      schX={4.3}
      schY={-7.8}
      schOrientation="vertical"
      connections={{
        pin1: "net.LED3",
        pin2: "net.LED3_A",
      }}
    />

    <led
      name="D5"
      displayName="GRN"
      color="green"
      footprint="led0603"
      schX={4.3}
      schY={-9.0}
      schOrientation="vertical"
      connections={{
        anode: "net.LED3_A",
        cathode: "net.GND",
      }}
    />

    {/* Capacitive-touch electrodes and feedback resistors */}
    <testpoint
      name="PAD1"
      doNotPlace
      displayName="PREVIOUS / VOL_UP"
      schX={8.0}
      schY={-3.6}
      connections={{
        pin1: "net.CB0",
      }}
    />

    <testpoint
      name="PAD2"
      doNotPlace
      displayName="NEXT / VOL_DOWN"
      schX={8.0}
      schY={-4.8}
      connections={{
        pin1: "net.CB1",
      }}
    />

    <testpoint
      name="PAD3"
      displayName="PAUSE_PLAY - DNI"
      doNotPlace
      schX={8.0}
      schY={-6.0}
      connections={{
        pin1: "net.CB2",
      }}
    />

    <resistor
      name="R31"
      resistance="75k"
      footprint="0402"
      schX={11.7}
      schY={-5.8}
      connections={{
        pin1: "net.CB0",
        pin2: "net.CBOUT",
      }}
    />

    <resistor
      name="R32"
      resistance="75k"
      footprint="0402"
      schX={11.7}
      schY={-6.8}
      connections={{
        pin1: "net.CB1",
        pin2: "net.CBOUT",
      }}
    />

    <resistor
      name="R33"
      resistance="75k"
      footprint="0402"
      schX={11.7}
      schY={-7.8}
      connections={{
        pin1: "net.CB2",
        pin2: "net.CBOUT",
      }}
    />

    {/* Supply decoupling */}
    <capacitor
      name="C37"
      capacitance="10uF"
      footprint="0805"
      schX={-15.3}
      schY={-8.9}
      schOrientation="vertical"
      connections={{
        pin1: "net.DVIO_1V8_5229",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C39"
      capacitance="1uF"
      maxVoltageRating="6.3V"
      footprint="0402"
      schX={-12.5}
      schY={-8.9}
      schOrientation="vertical"
      connections={{
        pin1: "net.VCC_5229",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C41"
      capacitance="470nF"
      maxVoltageRating="6.3V"
      footprint="0402"
      schX={-9.7}
      schY={-8.9}
      schOrientation="vertical"
      connections={{
        pin1: "net.VCORE",
        pin2: "net.GND",
      }}
    />
  </subcircuit>
);

export default BluetoothAudioHost_MSP430F5229;
