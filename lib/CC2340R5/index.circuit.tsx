import type { ChipProps } from "tscircuit";
import type { SubcircuitProps } from "@tscircuit/props";

const pinLabels = {
  pin1: "VDDR",
  pin2: "DIO8",
  pin3: "DIO9",
  pin4: "DIO10",
  pin5: "DIO11",
  pin6: "DIO12",
  pin7: "DIO13",
  pin8: "VDDS",
  pin9: "DIO14",
  pin10: "DIO15",
  pin11: "DIO16_SWDIO",
  pin12: "DIO17_SWDCK",
  pin13: "DIO18",
  pin14: "DIO19",
  pin15: "DIO20_A11",
  pin16: "DIO21_A10",
  pin17: "VDDS",
  pin18: "DIO22_A9",
  pin19: "DIO23_A8",
  pin20: "DIO24_A7",
  pin21: "DIO25_A6",
  pin22: "DIO0_A5",
  pin23: "DIO1_A4",
  pin24: "DIO2_A3",
  pin25: "nRST",
  pin26: "DIO3_X32_P",
  pin27: "DIO4_X32_N",
  pin28: "VDDD",
  pin29: "DIO5_A2",
  pin30: "DCDC",
  pin31: "VDDS",
  pin32: "DIO6_A1",
  pin33: "DIO7_A0",
  pin34: "VDDR",
  pin35: "X48_P",
  pin36: "X48_N",
  pin37: "NC",
  pin38: "VDDS",
  pin39: "ANT",
  pin40: "RFGND",
  pin41: "EGP",
} as const;

export const CC2340R5 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    {...props}
    footprint="qfn40_p0.4mm_thermalpad"
    manufacturerPartNumber="CC2340R53E0RKP"
    pinLabels={pinLabels}
    pinAttributes={{
      nRST: { mustBeConnected: true, requiresPower: true },
      EGP: { requiresGround: true },
      RFGND: { requiresGround: true },
    }}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [
          "DIO16_SWDIO",
          "DIO17_SWDCK",
          "nRST",
          "DCDC",
          "pin1",
          "pin34",
          "DIO3_X32_P",
          "DIO4_X32_N",
          "NC",
          "VDDD",
          "EGP",
        ],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [
          "pin8",
          "pin17",
          "pin31",
          "pin38",
          "ANT",
          "RFGND",
          "X48_P",
          "X48_N",
        ],
      },
    }}
    schPinStyle={{
      nRST: {
        marginBottom: 0.2,
      },
      DCDC: {
        marginBottom: 0.2,
      },
      DIO3_X32_P: {
        marginTop: 0.2,
      },
      pin8: {
        marginTop: 0,
      },
      ANT: {
        marginTop: 0.5,
      },
      RFGND: {
        marginTop: 0.2,
      },
      X48_P: {
        marginTop: 0.5,
      },
    }}
  />
);

export default (props: SubcircuitProps) => (
  <subcircuit width={100} height={100} {...props}>
    <CC2340R5
      name="U1"
      schX={0}
      schY={0}
      pcbX={0}
      pcbY={0}
      connections={{
        DIO16_SWDIO: "net.WMCU_SWDIO",
        DIO17_SWDCK: "net.WMCU_SWDCK",
        nRST: "C92.pin1",
        DCDC: "L1.pin2",
        pin8: "net.VDDR",
        pin17: "net.VDDR",
        pin31: "net.VDDR",
        pin38: "net.VDDR",
        pin1: "U1.pin34",
        pin34: "C107.pin1",
        DIO3_X32_P: "C81.pin1",
        DIO4_X32_N: "C91.pin1",
        VDDD: "C9.pin1",
        EGP: "net.GND",
        VDDS: "net.VDDS",
        ANT: "net.ANT_RF",
        RFGND: "net.GND",
        X48_P: "C53.pin1",
        X48_N: "C52.pin1",
      }}
    />

    <resistor
      name="R1"
      resistance="100k"
      footprint="0402"
      schRotation={90}
      schX={-8}
      schY={4}
      pcbX={-9}
      pcbY={8}
      connections={{ pin1: "net.WMCU_RESET", pin2: "net.VDDS" }}
    />
    <capacitor
      name="C92"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-8}
      schY={2.2}
      pcbX={-6}
      pcbY={8}
      connections={{ pin1: "net.WMCU_RESET", pin2: "net.GND" }}
    />

    <resistor
      name="B1"
      resistance="0"
      footprint="0402"
      schX={0.5}
      schY={3.3}
      pcbX={-3}
      pcbY={8}
      connections={{ pin1: "net.WMCU_VDD", pin2: "net.VDDS" }}
    />

    <capacitor
      name="C104"
      capacitance="10uF"
      footprint="0805"
      schOrientation="vertical"
      schX={2}
      schY={3.5}
      pcbX={12}
      pcbY={8}
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />
    <capacitor
      name="C99"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={3.5}
      schY={3.5}
      pcbX={0}
      pcbY={8}
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />
    <capacitor
      name="C101"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={5}
      schY={3.5}
      pcbX={3}
      pcbY={8}
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />
    <capacitor
      name="C102"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={6.5}
      schY={3.5}
      pcbX={6}
      pcbY={8}
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />
    <capacitor
      name="C103"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={8}
      schY={3.5}
      pcbX={9}
      pcbY={8}
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />

    <inductor
      name="L1"
      inductance={10e-6}
      footprint="0805"
      schX={-5.5}
      schY={0.6}
      pcbX={-9}
      pcbY={0}
      connections={{ pin1: "net.VDDR", pin2: "U1.DCDC" }}
    />
    <capacitor
      name="C105"
      capacitance="10uF"
      footprint="0805"
      schOrientation="vertical"
      schX={-8}
      schY={-1}
      pcbX={-13}
      pcbY={0}
      connections={{ pin1: "net.VDDR", pin2: "net.GND" }}
    />
    <capacitor
      name="C106"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-4.3}
      schY={-1}
      pcbX={-9}
      pcbY={-3}
      connections={{ pin1: "L1.pin1", pin2: "net.GND" }}
    />
    <capacitor
      name="C107"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-5.8}
      schY={-1}
      pcbX={-13}
      pcbY={-3}
      connections={{ pin1: "C106.pin1", pin2: "net.GND" }}
    />

    <capacitor
      name="C9"
      capacitance="1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-2}
      schY={-4.5}
      pcbX={-5}
      pcbY={-6}
      connections={{ pin2: "net.GND" }}
    />

    <resistor
      name="R6"
      resistance="0"
      footprint="0402"
      doNotPlace
      schX={-9.5}
      schY={-3.8}
      pcbX={-13}
      pcbY={-8}
      connections={{ pin1: "net.DIO3", pin2: "net.X32P" }}
    />
    <capacitor
      name="C81"
      capacitance="12pF"
      footprint="0402"
      schOrientation="vertical"
      schX={-7.7}
      schY={-4.5}
      pcbX={-10}
      pcbY={-8}
      connections={{ pin1: "net.X32P", pin2: "net.GND" }}
    />
    <crystal
      name="Y1"
      frequency="32.768kHz"
      loadCapacitance="9pF"
      footprint="0402"
      schX={-6}
      schY={-3.8}
      pcbX={-7}
      pcbY={-8}
      connections={{ pin1: "net.X32P", pin2: "net.X32N" }}
    />
    <capacitor
      name="C91"
      capacitance="15pF"
      footprint="0402"
      schOrientation="vertical"
      schX={-4.3}
      schY={-4.5}
      pcbX={-4}
      pcbY={-8}
      connections={{ pin1: "net.X32N", pin2: "net.GND" }}
    />
    <resistor
      name="R7"
      resistance="0"
      footprint="0402"
      doNotPlace
      schX={-3.3}
      schY={-3.8}
      pcbX={-1}
      pcbY={-8}
      connections={{ pin1: "C91.pin1", pin2: "net.DIO4" }}
    />

    <capacitor
      name="C52"
      capacitance="8pF"
      footprint="0402"
      schOrientation="vertical"
      doNotPlace
      schX={1}
      schY={-4.5}
      pcbX={2}
      pcbY={-8}
      connections={{ pin1: "U1.X48_N", pin2: "net.GND" }}
    />
    <crystal
      name="Y2"
      frequency="48MHz"
      pinVariant="four_pin"
      loadCapacitance="8pF"
      footprint="qfn4"
      schX={2.5}
      schY={-3.8}
      pcbX={5}
      pcbY={-8}
    />
    <capacitor
      name="C53"
      capacitance="8pF"
      footprint="0402"
      schOrientation="vertical"
      doNotPlace
      schX={4}
      schY={-4.5}
      pcbX={8}
      pcbY={-8}
      connections={{ pin1: "U1.X48_P", pin2: "net.GND" }}
    />
    <trace from="Y2.pin1" to="net.X48P" />
    <trace from="Y2.pin3" to="net.X48N" />
    <trace from="Y2.pin2" to="net.GND" />
    <trace from="Y2.pin4" to="net.GND" />

    <capacitor
      name="C33"
      capacitance="1.5pF"
      footprint="0402"
      schOrientation="vertical"
      schX={3.5}
      schY={-1.2}
      pcbX={6}
      pcbY={0}
      connections={{ pin1: "net.ANT_RF", pin2: "net.GND" }}
    />
    <inductor
      name="L33"
      inductance={2.8e-9}
      footprint="0402"
      schX={4.6}
      schY={0.4}
      pcbX={9}
      pcbY={0}
      connections={{ pin1: "net.ANT_RF", pin2: "net.RF_B" }}
    />
    <capacitor
      name="C34"
      capacitance="1.5pF"
      footprint="0402"
      schOrientation="vertical"
      schX={5.6}
      schY={-1.2}
      pcbX={12}
      pcbY={0}
      connections={{ pin1: "net.RF_B", pin2: "net.GND" }}
    />
    <diode
      name="CR10"
      symbolName="gunn_diode_vert"
      footprint="sod882"
      schRotation={-90}
      schX={6.6}
      schY={-1.2}
      pcbX={15}
      pcbY={-2}
      connections={{ pin1: "net.RF_B", pin2: "net.GND" }}
    />
    <capacitor
      name="CA1"
      capacitance="15pF"
      footprint="0402"
      schOrientation="vertical"
      doNotPlace
      schX={8}
      schY={1.2}
      pcbX={25}
      pcbY={2}
      connections={{ pin1: "J7.pin1", pin2: "CA2.pin1" }}
    />
    <capacitor
      name="CA2"
      capacitance="15pF"
      footprint="0402"
      schOrientation="vertical"
      schX={7.6}
      schY={-1.6}
      pcbX={15}
      pcbY={0}
      connections={{ pin1: "net.RF_B", pin2: "net.RF_D" }}
    />
    <inductor
      name="Z51"
      inductance={2e-9}
      footprint="0402"
      schX={9.6}
      schY={-2.8}
      pcbX={18}
      pcbY={0}
      connections={{ pin1: "net.RF_D", pin2: "net.RF_E" }}
    />
    <capacitor
      name="Z60"
      capacitance="1.2pF"
      footprint="0402"
      schOrientation="vertical"
      schX={8.4}
      schY={-4.2}
      pcbX={15}
      pcbY={-4}
      connections={{ pin1: "net.RF_D", pin2: "net.GND" }}
    />
    <capacitor
      name="Z62"
      capacitance="0.7pF"
      footprint="0402"
      schOrientation="vertical"
      schX={11}
      schY={-4.2}
      pcbX={18}
      pcbY={-4}
      connections={{ pin1: "net.RF_E", pin2: "net.GND" }}
    />

    <chip
      name="J7"
      footprint="sma"
      manufacturerPartNumber="SMA-10V21-TGG"
      pinLabels={{ pin1: "RF", pin2: "GND" }}
      schX={10}
      schY={2.5}
      pcbX={30}
      pcbY={4}
      connections={{ RF: "net.SMA_RF", GND: "net.GND" }}
    />
    <chip
      name="ANT1"
      footprint="sot23"
      pinLabels={{ pin1: "FEED", pin2: "GND", pin3: "GND" }}
      schX={12.2}
      schY={-2.8}
      pcbX={22}
      pcbY={0}
      connections={{ FEED: "net.RF_E", pin2: "net.GND", pin3: "net.GND" }}
    />
  </subcircuit>
);
