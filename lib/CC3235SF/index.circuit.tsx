import type { ChipProps } from "tscircuit";
import type { SubcircuitProps } from "@tscircuit/props";

const rtcPinLabels = {
  pin1: "RF1",
  pin2: "GND",
  pin3: "RF2",
  pin4: "VC2",
  pin5: "RFC",
  pin6: "VC1",
} as const;
const RTC6608OSP = (props: ChipProps<typeof rtcPinLabels>) => (
  <chip
    {...props}
    footprint="sot23_6"
    manufacturerPartNumber="RTC6608OSP"
    pinLabels={rtcPinLabels}
  />
);

export default (props: SubcircuitProps) => (
  <subcircuit width={100} height={100} {...props}>
    <RTC6608OSP
      name="U3"
      schX={-6}
      schY={5}
      pcbX={-24}
      pcbY={8}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["RF1", "RF2", "GND"] },
        rightSide: { direction: "top-to-bottom", pins: ["VC1", "VC2", "RFC"] },
      }}
      schPinStyle={{
        RF1: {
          marginBottom: 0.3,
        },
        RF2: { marginBottom: 0.3 },
        VC1: { marginBottom: 0.3 },
        VC2: { marginBottom: 0.3 },
      }}
      connections={{
        RF1: "C31.pin2",
        RF2: "C32.pin2",
        GND: "net.GND",
        RFC: "C33.pin1",
        VC2: "R12.pin2",
        VC1: "R13.pin2",
      }}
    />
    <capacitor
      name="C31"
      capacitance="68pF"
      footprint="0402"
      schX={-8.3}
      schY={5.5}
      pcbX={-29}
      pcbY={9}
      connections={{ pin1: "net.RF_BLE" }}
    />
    <capacitor
      name="C32"
      capacitance="68pF"
      footprint="0402"
      schX={-9.8}
      schY={4.7}
      pcbX={-29}
      pcbY={6}
      connections={{ pin1: "net.RF_BG" }}
    />
    <capacitor
      name="C33"
      capacitance="68pF"
      footprint="0402"
      schX={-3.3}
      schY={4.5}
      pcbX={-19}
      pcbY={8}
    />
    <resistor
      name="R12"
      resistance="100k"
      footprint="0402"
      schRotation={90}
      schX={-0.7}
      schY={4.3}
      pcbX={-15}
      pcbY={9}
      connections={{ pin1: "net.GND" }}
    />
    <capacitor
      name="C34"
      capacitance="100pF"
      footprint="0402"
      schOrientation="vertical"
      schX={0.5}
      schY={4.3}
      pcbX={-15}
      pcbY={6}
      connections={{ pin1: "R12.pin2", pin2: "net.GND" }}
    />
    <resistor
      name="R13"
      resistance="100k"
      footprint="0402"
      schRotation={90}
      schX={2.3}
      schY={4.3}
      pcbX={-11}
      pcbY={9}
      connections={{ pin1: "net.GND" }}
    />
    <capacitor
      name="C35"
      capacitance="100pF"
      footprint="0402"
      schOrientation="vertical"
      schX={3.5}
      schY={4.3}
      pcbX={-11}
      pcbY={6}
      connections={{ pin1: "R13.pin2", pin2: "net.GND" }}
    />

    <chip
      name="FL1"
      footprint="qfn4"
      manufacturerPartNumber="DEA202450BT-1294C1-H"
      pinLabels={{ pin1: "IN", pin2: "GND", pin3: "OUT", pin4: "GND" }}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["IN"] },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["OUT", "pin2", "pin4"],
        },
      }}
      schX={-2.5}
      schY={0.8}
      pcbX={-8}
      pcbY={2}
      schPinStyle={{
        OUT: {
          marginBottom: 0.3,
        },
        IN: { marginBottom: 0.7 },
      }}
      connections={{
        IN: "net.RF_BG",
        OUT: "U4.LBP",
        pin2: "net.GND",
        pin4: "net.GND",
      }}
    />

    <chip
      name="U4"
      footprint="sot23_6"
      manufacturerPartNumber="DPX165950DT-8148A1"
      pinLabels={{
        pin1: "LBP",
        pin2: "GND",
        pin3: "HBP",
        pin4: "GND",
        pin5: "CP",
        pin6: "GND",
      }}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["LBP", "HBP"] },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["CP", "pin2", "pin4", "pin6"],
        },
      }}
      schX={4}
      schY={0}
      pcbX={-1}
      pcbY={2}
      schPinStyle={{
        LBP: { marginTop: -0.4 },
        HBP: { marginTop: 0.3 },
        CP: { marginBottom: 0.3 },
      }}
      connections={{
        HBP: "C39.pin2",
        CP: "C36.pin1",
        pin2: "net.GND",
        pin4: "net.GND",
        pin6: "net.GND",
      }}
    />
    <capacitor
      name="C36"
      capacitance="8.2pF"
      footprint="0402"
      schX={7}
      schY={0.4}
      pcbX={5}
      pcbY={2}
      connections={{ pin2: "C37.pin1" }}
    />
    <capacitor
      name="C37"
      capacitance="2.2pF"
      footprint="0402"
      schX={8.5}
      schY={0.4}
      pcbX={8}
      pcbY={2}
      connections={{ pin2: "L5.pin2" }}
    />
    <inductor
      name="L5"
      inductance={3.9e-9}
      footprint="0402"
      schRotation={90}
      schX={9.7}
      schY={-0.6}
      pcbX={11}
      pcbY={2}
      connections={{ pin1: "net.GND", pin2: "E1.FEED" }}
    />

    <chip
      name="E1"
      footprint="sot23_6"
      pinLabels={{
        pin6: "FEED",
        pin1: "GND",
        pin2: "NC",
        pin3: "NC",
        pin4: "NC",
        pin5: "NC",
      }}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["FEED"] },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["GND", "pin2", "pin3", "pin4", "pin5"],
        },
      }}
      schX={11.5}
      schY={0.5}
      pcbX={15}
      pcbY={2}
      connections={{
        FEED: "net.GND",
        GND: "net.GND",
      }}
    />

    <RTC6608OSP
      name="U5"
      schX={-6}
      schY={-2.4}
      pcbX={-24}
      pcbY={-8}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["GND", "RF2", "RF1"] },
        rightSide: { direction: "top-to-bottom", pins: ["RFC", "VC2", "VC1"] },
      }}
      schPinStyle={{
        GND: {
          marginBottom: 0.3,
        },
        RF2: { marginBottom: 0.3 },
        RFC: { marginBottom: 0.3 },
        VC2: { marginBottom: 0.3 },
      }}
      connections={{
        GND: "net.GND",
        RF2: "C40.pin2",
        RF1: "C41.pin2",
        RFC: "C38.pin1",
        VC2: "C43.pin1",
        VC1: "C42.pin1",
      }}
    />
    <capacitor
      name="C40"
      capacitance="4.7pF"
      footprint="0402"
      schX={-9.8}
      schY={-2}
      pcbX={-29}
      pcbY={-7}
      connections={{ pin1: "net.A_RX" }}
    />
    <capacitor
      name="C41"
      capacitance="4.7pF"
      footprint="0402"
      schX={-10.3}
      schY={-3.5}
      pcbX={-29}
      pcbY={-10}
      connections={{ pin1: "net.A_TX" }}
    />
    <capacitor
      name="C38"
      capacitance="1.6pF"
      footprint="0402"
      schX={-3.3}
      schY={-1.8}
      pcbX={-19}
      pcbY={-8}
      connections={{ pin2: "L6.pin2" }}
    />
    <inductor
      name="L6"
      inductance={2.7e-9}
      footprint="0402"
      schRotation={90}
      schX={-2.2}
      schY={-2.6}
      pcbX={-16}
      pcbY={-8}
      connections={{ pin1: "net.GND" }}
    />
    <capacitor
      name="C42"
      capacitance="100pF"
      footprint="0402"
      schOrientation="vertical"
      schX={-4}
      schY={-4.2}
      pcbX={-20}
      pcbY={-12}
      connections={{ pin2: "net.GND", pin1: "net.SOP0" }}
    />
    <capacitor
      name="C43"
      capacitance="100pF"
      footprint="0402"
      schOrientation="vertical"
      schX={-3}
      schY={-4.2}
      pcbX={-16}
      pcbY={-12}
      connections={{ pin2: "net.GND", pin1: "net.SOP1" }}
    />

    <chip
      name="FL2"
      footprint="sot23_3"
      manufacturerPartNumber="DEA165538BT-2236B1-H"
      pinLabels={{ pin1: "IN", pin2: "GND", pin3: "OUT" }}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["IN"] },
        rightSide: { direction: "top-to-bottom", pins: ["OUT", "GND"] },
      }}
      schPinStyle={{
        OUT: {
          marginBottom: 0.3,
        },
        IN: { marginBottom: 0.7 },
      }}
      schX={-0.3}
      schY={-2.2}
      pcbX={-11}
      pcbY={-8}
      connections={{
        IN: "L6.pin2",
        OUT: "C39.pin1",
        GND: "net.GND",
      }}
    />
    <capacitor
      name="C39"
      capacitance="1.9pF"
      footprint="0402"
      schX={2}
      schY={-1.8}
      pcbX={-7}
      pcbY={-8}
    />
  </subcircuit>
);
