import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { BQ24073RGTR } from "../chips/BQ24073RGTR.circuit.tsx";

export const BatteryManagement_BQ24073 = (props: SubcircuitProps) => (
  <subcircuit width={100} height={100} {...props}>
    <chip
      name="J1"
      displayName="ADAPTER"
      manufacturerPartNumber="DC INPUT"
      footprint="pinrow2"
      schX={-6.2}
      schY={1.8}
      schWidth="0.9mm"
      schHeight="1mm"
      pinLabels={{
        pin1: "DC_PLUS",
        pin2: "GND",
      }}
      schPinArrangement={{
        rightSide: {
          direction: "top-to-bottom",
          pins: [1, 2],
        },
      }}
      schPinStyle={{
        pin1: { marginBottom: 0.2 },
      }}
      connections={{
        pin1: "net.IN",
        pin2: "net.GND",
      }}
    />

    <BQ24073RGTR
      name="U1"
      displayName=""
      manufacturerPartNumber=""
      schX={0}
      schY={0}
      connections={{
        TS: "net.TS",
        BAT: "net.BAT",
        BAT2: "net.BAT",
        N_CE: "net.N_CE",
        EN2: "net.EN2",
        EN1: "net.EN1",
        N_PGOOD: "net.N_PGOOD",
        VSS: "net.GND",
        N_CHG: "net.N_CHG",
        OUT: "C2.pin1",
        OUT2: "net.OUT",
        ILIM: "net.ILIM",
        IN: "net.IN",
        TMR: "net.TMR",
        TD: "net.TD",
        ISET: "net.ISET",
        EP: "net.GND",
      }}
    />

    <schematictext
      text="BQ24073"
      schX={0}
      schY={-0.35}
      fontSize={0.28}
      anchor="center"
    />

    <capacitor
      name="C1"
      capacitance="1uF"
      footprint="0603"
      schX={-3.2}
      schY={0.9}
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
      schX={3.3}
      schY={0.9}
      schRotation="270deg"
      connections={{
        pin2: "net.GND",
      }}
    />

    {/* <chip
        name="BT1"
        displayName="LI-ION BATTERY PACK"
        manufacturerPartNumber="BATTERY PACK WITH 10K NTC"
        footprint="pinrow3"
        schX={-6}
        schY={-3}
        schWidth="2.8mm"
        schHeight="2.4mm"
        pinLabels={{
          pin1: "TEMP",
          pin2: "PACK_PLUS",
          pin3: "PACK_MINUS",
        }}
        schPinArrangement={{
          rightSide: {
            direction: "top-to-bottom",
            pins: [1, 2, 3],
          },
        }}
        connections={{
          pin1: "net.TS",
          pin2: "net.BAT",
          pin3: "net.GND",
        }}
      /> */}
    <resistor
      name="R_temp"
      resistance="46.4k"
      footprint="0603"
      schX={-6.5}
      schY={-3}
      schRotation="270deg"
      connections={{
        pin2: "net.GND",
        pin1: "U1.pin1",
      }}
    />
    <battery
      name="VBAT"
      footprint={"kicad:Battery/BatteryHolder_TruPower_BH-331P_3xAA"}
      schX={-5}
      schY={-3}
      schRotation="270deg"
      connections={{
        pin2: "net.GND",
        pin1: "U1.pin2",
      }}
    />

    <capacitor
      name="C3"
      capacitance="4.7uF"
      footprint="0603"
      schX={-2.8}
      schY={-2.8}
      schRotation="270deg"
      connections={{
        pin1: "net.BAT",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R1"
      resistance="46.4k"
      footprint="0603"
      schX={-0.95}
      schY={-4.3}
      schRotation="270deg"
      connections={{
        pin1: "net.TMR",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R2"
      resistance="1.18k"
      footprint="0603"
      schX={0}
      schY={-4.3}
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
      schY={-4.3}
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
      schY={6.4}
      schRotation="270deg"
      connections={{
        pin1: "R5.pin1",
        pin2: "D1.anode",
      }}
    />

    <led
      name="D1"
      color="green"
      footprint="0603"
      schX={-0.8}
      schY={4.5}
      schRotation="270deg"
      connections={{
        cathode: "net.N_PGOOD",
      }}
    />

    <resistor
      name="R5"
      resistance="1.5k"
      footprint="0603"
      schX={0.8}
      schY={6.4}
      schRotation="270deg"
      connections={{
        pin2: "D2.anode",
      }}
    />

    <led
      name="D2"
      color="red"
      footprint="0603"
      schX={0.8}
      schY={4.5}
      schRotation="270deg"
      connections={{
        cathode: "net.N_CHG",
      }}
    />
  </subcircuit>
);

export default BatteryManagement_BQ24073;
