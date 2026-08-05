import type { SubcircuitProps } from "@tscircuit/props";
import { BQ24074RGTR } from "../chips/BQ24074RGTR.circuit.tsx";

export const BatteryManagement_BQ24074 = (props: SubcircuitProps) => (
  <subcircuit width={100} height={100} {...props}>
    <chip
      name="J1"
      footprint="pinrow2"
      manufacturerPartNumber="Adapter"
      pinLabels={{
        pin1: "DC_PLUS",
        pin2: "GND",
      }}
      schX={-5.5}
      schY={1.35}
      schPinArrangement={{
        rightSide: {
          direction: "top-to-bottom",
          pins: ["pin1", "pin2"],
        },
      }}
      connections={{
        pin1: "net.IN",
        pin2: "net.GND",
      }}
    />

    <BQ24074RGTR
      name="U1"
      schX={0}
      schY={0}
      schWidth={3.1}
      schHeight={4.3}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: ["IN", "VSS", "TS", "BAT"],
        },
        topSide: {
          direction: "left-to-right",
          pins: ["N_PGOOD", "N_CHG"],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["OUT", "EN2", "EN1", "TMR", "N_CE"],
        },
        bottomSide: {
          direction: "left-to-right",
          pins: ["ITERM", "ILIM", "ISET"],
        },
      }}
      schPinStyle={{
        TS: {
          topMargin: 1.2,
        },
        N_CHG: {
          leftMargin: 0.7,
        },
        EN2: {
          topMargin: 0.9,
        },
        ILIM: {
          leftMargin: 0.45,
        },
        ISET: {
          leftMargin: 0.45,
        },
      }}
      connections={{
        IN: "net.IN",
        VSS: "net.GND",
        TS: "net.TS",
        BAT: "net.BAT",
        BAT2: "net.BAT",
        N_PGOOD: "net.N_PGOOD_LED",
        N_CHG: "net.N_CHG_LED",
        OUT: "net.OUT",
        OUT2: "net.OUT",
        EN2: "net.OUT",
        EN1: "net.GND",
        TMR: "net.GND",
        N_CE: "net.GND",
        ITERM: "net.ITERM",
        ILIM: "net.ILIM",
        ISET: "net.ISET",
        EP: "net.GND",
      }}
    />

    <capacitor
      name="C1"
      capacitance="1uF"
      footprint="0603"
      schX={-2.75}
      schY={0.75}
      schRotation="270deg"
      connections={{
        pin1: "net.IN",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C2"
      capacitance="4.7uF"
      footprint="0603"
      schX={3.2}
      schY={0.6}
      schRotation="270deg"
      connections={{
        pin1: "net.OUT",
        pin2: "net.GND",
      }}
    />

    <chip
      name="BT1"
      footprint="pinrow3"
      manufacturerPartNumber="Battery Pack"
      pinLabels={{
        pin1: "TEMP",
        pin2: "PACK_PLUS",
        pin3: "PACK_MINUS",
      }}
      schX={-6.0}
      schY={-2.9}
      schPinArrangement={{
        rightSide: {
          direction: "top-to-bottom",
          pins: ["pin1", "pin2", "pin3"],
        },
      }}
      connections={{
        pin1: "net.TS",
        pin2: "net.BAT",
        pin3: "net.GND",
      }}
    />

    <capacitor
      name="C3"
      capacitance="4.7uF"
      footprint="0603"
      schX={-2.35}
      schY={-2.7}
      schRotation="270deg"
      connections={{
        pin1: "net.BAT",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R1"
      resistance="4.12k"
      footprint="0603"
      schX={-1.1}
      schY={-3.75}
      schRotation="270deg"
      connections={{
        pin1: "net.ITERM",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R2"
      resistance="1.18k"
      footprint="0603"
      schX={0}
      schY={-3.75}
      schRotation="270deg"
      connections={{
        pin1: "net.ILIM",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R3"
      resistance="1.13k"
      footprint="0603"
      schX={1.1}
      schY={-3.75}
      schRotation="270deg"
      connections={{
        pin1: "net.ISET",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R4"
      resistance="1.5k"
      footprint="0603"
      schX={-0.8}
      schY={6.35}
      schRotation="270deg"
      connections={{
        pin1: "net.OUT",
        pin2: "net.N_PGOOD_LED_A",
      }}
    />
    <led
      name="D1"
      color="green"
      footprint="0603"
      schX={-0.8}
      schY={4.4}
      schRotation="270deg"
      connections={{
        anode: "net.N_PGOOD_LED_A",
        cathode: "net.N_PGOOD_LED",
      }}
    />

    <resistor
      name="R5"
      resistance="1.5k"
      footprint="0603"
      schX={0.8}
      schY={6.35}
      schRotation="270deg"
      connections={{
        pin1: "net.OUT",
        pin2: "net.N_CHG_LED_A",
      }}
    />
    <led
      name="D2"
      color="red"
      footprint="0603"
      schX={0.8}
      schY={4.4}
      schRotation="270deg"
      connections={{
        anode: "net.N_CHG_LED_A",
        cathode: "net.N_CHG_LED",
      }}
    />

    <trace from="U1.OUT" to="net.OUT" />
  </subcircuit>
);

export default BatteryManagement_BQ24074;
