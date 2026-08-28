import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { CC2564C } from "../chips/CC2564C.circuit.tsx";
import { LFB212G45SG8C341_FOOTPRINT } from "../chips/jlcpcb-footprints.tsx";

const cc2564cNoConnectPins = [
  "pin1",
  "pin13",
  "pin14",
  "pin15",
  "pin16",
  "pin18",
  "pin19",
  "pin20",
  "pin21",
  "pin22",
  "pin23",
  "pin27",
  "pin30",
  "pin31",
  "pin36",
  "pin37",
  "pin39",
  "pin40",
  "pin52",
  "pin53",
  "pin54",
  "pin56",
  "pin57",
  "pin60",
  "pin63",
  "pin68",
  "pin69",
  "pin70",
  "pin71",
] as const;

/**
 * CC2564C dual-mode Bluetooth controller reference schematic.
 *
 * The layout follows the functional U1A section of TI's reference schematic.
 * NC and ground-only terminals that belong to the U1B symbol section remain
 * electrically defined on the raw chip but are intentionally not drawn here.
 */
export const BluetoothController_CC2564C = (props: SubcircuitProps) => (
  <subcircuit schMaxTraceDistance="8mm" {...props}>
    <CC2564C
      name="U1A"
      schX={0}
      schY={0}
      connections={{
        pin2: "net.DIG_LDO_OUT",
        pin3: "net.DIG_LDO_OUT",
        pin4: "net.XTALM",
        pin5: "net.MLDO_OUT",
        pin6: "net.nSHUTDOWN_1V8",
        pin7: "net.CL1_5_LDO_OUT",
        pin8: "net.ADC_PPA_LDO_OUT",
        pin9: "net.MLDO_OUT",
        pin10: "net.GND",
        pin11: "net.GND",
        pin12: "net.DCO_LDO_OUT",
        pin17: "net.VDD_IO",
        pin24: "net.GND",
        pin26: "net.CC_HCI_TX_1V8",
        pin28: "net.GND",
        pin29: "net.CC_HCI_CTS_1V8",
        pin32: "net.CC_HCI_RTS_1V8",
        pin33: "net.CC_HCI_RX_1V8",
        pin34: "net.VDD_IO",
        pin35: "net.CC_AUD_FSYNC_1V8",
        pin38: "net.VDD_IO",
        pin41: "net.SRAM_LDO_OUT",
        pin42: "net.MLDO_OUT",
        pin43: "net.GND",
        pin44: "net.XTALP",
        pin45: "net.VBAT",
        pin46: "net.VBAT",
        pin47: "net.MLDO_OUT",
        pin48: "net.BT_RF",
        pin49: "net.GND",
        pin50: "net.GND",
        pin51: "net.GND",
        pin55: "net.DIG_LDO_OUT",
        pin58: "net.VDD_IO",
        pin59: "net.VDD_IO",
        pin61: "net.VDD_IO",
        pin62: "net.VDD_IO",
        pin64: "net.TX_DBG",
        pin65: "net.VDD_IO",
        pin66: "net.DIG_LDO_OUT",
        pin67: "net.DIG_LDO_OUT",
        pin72: "net.CC_AUD_CLK_1V8",
        pin73: "net.CC_AUD_OUT_1V8",
        pin74: "net.CC_AUD_IN_1V8",
        pin75: "net.DIG_LDO_OUT",
        pin76: "net.DIG_LDO_OUT",
        pin77: "net.GND",
      }}
      noConnect={[...cc2564cNoConnectPins]}
    />

    {/* 32.768 kHz slow-clock oscillator */}
    <chip
      name="Y1"
      footprint="kicad:Oscillator/Oscillator_SMD_Abracon_ASV-4Pin_7.0x5.1mm"
      manufacturerPartNumber="ASH7K-32.768KHZ-T"
      schX={-10.8}
      schY={3.7}
      schWidth="1.5mm"
      schHeight="1mm"
      pinLabels={{
        pin1: "E_D",
        pin2: "GND",
        pin3: "OUT",
        pin4: "VCC",
      }}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: [1, 2] },
        rightSide: { direction: "top-to-bottom", pins: [4, 3] },
      }}
      connections={{
        pin1: "net.XO_ENABLE",
        pin2: "net.GND",
        pin3: "U1A.pin25",

        pin4: "net.VCC_1V8_32K",
      }}
    />
    <resistor
      name="R1"
      resistance="10k"
      footprint="0402"
      schX={-13.2}
      schY={4.7}
      schOrientation="vertical"
      connections={{
        pin1: "net.VCC_1V8_32K",
        pin2: "net.XO_ENABLE",
      }}
    />
    <capacitor
      name="C18"
      capacitance="0.1uF"
      footprint="0402"
      schX={-7.9}
      schY={3.7}
      schOrientation="vertical"
      connections={{
        pin1: "net.VCC_1V8_32K",
        pin2: "net.GND",
      }}
    />

    {/* 26 MHz fast-clock crystal */}
    <crystal
      name="Y2"
      footprint="kicad:Crystal/Crystal_SMD_2016-4Pin_2.0x1.6mm"
      manufacturerPartNumber="NX2016SA-26.000M-STD-CZS-246"
      frequency="26MHz"
      loadCapacitance="8pF"
      pinVariant="four_pin"
      schX={-10.2}
      schY={-5.2}
      schOrientation="horizontal"
      connections={{
        pin1: "net.XTALP",
        pin2: "net.GND",
        pin3: "net.XTALM",
        pin4: "net.GND",
      }}
    />
    <capacitor
      name="C19"
      capacitance="10pF"
      footprint="0402"
      schX={-8.9}
      schY={-6.9}
      schOrientation="vertical"
      connections={{
        pin1: "net.XTALP",
        pin2: "net.GND",
      }}
    />
    <capacitor
      name="C20"
      capacitance="10pF"
      footprint="0402"
      schX={-7.1}
      schY={-6.9}
      schOrientation="vertical"
      connections={{
        pin1: "net.XTALM",
        pin2: "net.GND",
      }}
    />
    <testpoint
      name="TP1"
      footprint="kicad:TestPoint/TestPoint_THTPad_D1.0mm_Drill0.5mm"
      schX={-5.2}
      schY={-2.05}
      connections={{ pin1: "net.TX_DBG" }}
    />

    {/* Bluetooth RF filter and antenna match */}
    <capacitor
      name="C1"
      capacitance="22pF"
      footprint="0402"
      schX={5.3}
      schY={8.5}
      schOrientation="horizontal"
      connections={{
        pin1: "net.BT_RF",
        pin2: "net.RF_FILTER_IN",
      }}
    />
    <chip
      name="FL1"
      footprint={LFB212G45SG8C341_FOOTPRINT}
      manufacturerPartNumber="LFB212G45SG8C341"
      supplierPartNumbers={{ jlcpcb: ["C2650941"] }}
      schX={8}
      schY={8.6}
      schWidth="1.5mm"
      schHeight="1.5mm"
      pinLabels={{ pin1: "GND", pin2: "OUT", pin3: "GND", pin4: "IN" }}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: [4] },
        rightSide: { direction: "top-to-bottom", pins: [2, 1, 3] },
      }}
      schPinStyle={{
        pin4: { marginTop: 0.2 },
        pin2: { marginBottom: 0.4 },
      }}
      connections={{
        pin1: "net.GND",
        pin2: "L1.pin1",
        pin3: "net.GND",
        pin4: "net.RF_FILTER_IN",
      }}
    />
    <inductor
      name="L1"
      inductance="33nH"
      footprint="0402"
      schX={10.5}
      schY={9}
      connections={{
        pin2: "net.ANT_FEED",
      }}
    />
    <capacitor
      name="C2"
      capacitance="0.5pF"
      footprint="0402"
      doNotPlace
      schX={11.2}
      schY={6.8}
      schOrientation="vertical"
      connections={{
        pin1: "net.ANT_FEED",
        pin2: "net.GND",
      }}
    />
    <chip
      name="ANT1"
      footprint="kicad:RF_Antenna/Texas_SWRA117D_2.4GHz_Left"
      manufacturerPartNumber="IIFA_CC2420"
      connections={{
        pin1: "net.ANT_FEED",
        pin2: "net.GND",
      }}
      symbol={
        <symbol>
          <schematictext
            text="{NAME}"
            schX={13.5}
            schY={9.5}
            fontSize={0.22}
            anchor="center"
          />

          <schematicline
            x1={13.5}
            y1={8.2}
            x2={13.5}
            y2={8.8}
            strokeWidth={0.02}
          />

          <schematicline
            x1={13.5}
            y1={8.5}
            x2={14}
            y2={8.8}
            strokeWidth={0.02}
          />

          <schematicline
            x1={13.5}
            y1={8.5}
            x2={13}
            y2={8.8}
            strokeWidth={0.02}
          />
          <schematicline
            x1={12.9}
            y1={8.2}
            x2={14.1}
            y2={8.2}
            strokeWidth={0.02}
          />

          <port
            name="pin1"
            schX={12.9}
            schY={7.4}
            direction="down"
            schStemLength={0.8}
            pinNumber={1}
          />

          <port
            name="pin2"
            schX={14.1}
            schY={7.4}
            direction="down"
            schStemLength={0.8}
            pinNumber={2}
          />
        </symbol>
      }
    />

    {/* VDD_IO decoupling, 1.62 V to 1.92 V */}
    <capacitor
      name="C3"
      capacitance="0.1uF"
      footprint="0402"
      schX={5.7}
      schY={4.1}
      schOrientation="vertical"
      connections={{ pin1: "net.VDD_IO", pin2: "net.GND" }}
    />
    <capacitor
      name="C4"
      capacitance="0.1uF"
      footprint="0402"
      schX={7.3}
      schY={4.1}
      schOrientation="vertical"
      connections={{ pin1: "net.VDD_IO", pin2: "net.GND" }}
    />
    <capacitor
      name="C5"
      capacitance="0.1uF"
      footprint="0402"
      schX={8.9}
      schY={4.1}
      schOrientation="vertical"
      connections={{ pin1: "net.VDD_IO", pin2: "net.GND" }}
    />
    <capacitor
      name="C6"
      capacitance="0.1uF"
      footprint="0402"
      schX={10.5}
      schY={4.1}
      schOrientation="vertical"
      connections={{ pin1: "net.VDD_IO", pin2: "net.GND" }}
    />

    {/* VBAT inputs and MLDO output */}
    <capacitor
      name="C7"
      capacitance="1uF"
      footprint="0402"
      schX={6.5}
      schY={0.45}
      schOrientation="vertical"
      connections={{ pin1: "net.MLDO_OUT", pin2: "net.GND" }}
    />
    <capacitor
      name="C8"
      capacitance="1uF"
      footprint="0402"
      schX={8.2}
      schY={0.45}
      schOrientation="vertical"
      connections={{ pin1: "net.MLDO_OUT", pin2: "net.GND" }}
    />
    <capacitor
      name="C9"
      capacitance="1uF"
      footprint="0402"
      schX={10.5}
      schY={0.45}
      schOrientation="vertical"
      connections={{ pin1: "net.VBAT", pin2: "net.GND" }}
    />

    {/* Individual internal-LDO outputs */}
    <capacitor
      name="C10"
      capacitance="0.1uF"
      footprint="0402"
      schX={6.2}
      schY={-2.85}
      schOrientation="vertical"
      connections={{ pin1: "net.DCO_LDO_OUT", pin2: "net.GND" }}
    />
    <capacitor
      name="C11"
      capacitance="0.1uF"
      footprint="0402"
      schX={7.8}
      schY={-2.85}
      schOrientation="vertical"
      connections={{ pin1: "net.CL1_5_LDO_OUT", pin2: "net.GND" }}
    />
    <capacitor
      name="C12"
      capacitance="0.1uF"
      footprint="0402"
      schX={9.4}
      schY={-2.85}
      schOrientation="vertical"
      connections={{ pin1: "net.ADC_PPA_LDO_OUT", pin2: "net.GND" }}
    />
    <capacitor
      name="C13"
      capacitance="0.1uF"
      footprint="0402"
      schX={11}
      schY={-2.85}
      schOrientation="vertical"
      connections={{ pin1: "net.SRAM_LDO_OUT", pin2: "net.GND" }}
    />

    {/* DIG_LDO_OUT decoupling */}
    <capacitor
      name="C14"
      capacitance="0.1uF"
      footprint="0402"
      schX={6.2}
      schY={-6}
      schOrientation="vertical"
      connections={{ pin1: "net.DIG_LDO_OUT", pin2: "net.GND" }}
    />
    <capacitor
      name="C15"
      capacitance="0.47uF"
      footprint="0402"
      schX={7.8}
      schY={-6}
      schOrientation="vertical"
      connections={{ pin1: "net.DIG_LDO_OUT", pin2: "net.GND" }}
    />
    <capacitor
      name="C16"
      capacitance="0.47uF"
      footprint="0402"
      schX={9.4}
      schY={-6}
      schOrientation="vertical"
      connections={{ pin1: "net.DIG_LDO_OUT", pin2: "net.GND" }}
    />
    <capacitor
      name="C17"
      capacitance="0.1uF"
      footprint="0402"
      schX={11}
      schY={-6}
      schOrientation="vertical"
      connections={{ pin1: "net.DIG_LDO_OUT", pin2: "net.GND" }}
    />
  </subcircuit>
);

export default BluetoothController_CC2564C;
