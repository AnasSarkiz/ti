import type { SubcircuitProps } from "@tscircuit/props";
import tps63802Trans from "./TPS63802_PSPICE_TRANS/TPS63802_TRANS.json";
import { TPS63802DLAR } from "./TPS63802DLAR";

export const TPS63802 = (props: SubcircuitProps) => (
  <subcircuit width={100} height={100} {...props}>
    <TPS63802DLAR
      name="U1"
      schX={0}
      schY={0}
      schWidth={2.5}
      schHeight={6}
      showPinAliases={false}
      schPinArrangement={{
        topSide: { pins: ["L1", "L2"], direction: "left-to-right" },
        leftSide: {
          pins: ["VIN", "EN", "MODE", "GND"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["VOUT", "PG", "FB", "AGND"],
          direction: "top-to-bottom",
        },
      }}
      schPinStyle={{
        L2: { marginLeft: 1 },
        VIN: { marginBottom: 1 },
        EN: { marginBottom: 1 },
        MODE: { marginBottom: 1 },
        VOUT: { marginBottom: 1 },
        PG: { marginBottom: 1 },
        FB: { marginBottom: 1 },
      }}
      spiceModel={
        <spicemodel
          source={tps63802Trans.source}
          spicePinMapping={{
            AGND: "AGND",
            EN: "EN",
            FB: "FB",
            GND: "GND",
            L1: "L1",
            L2: "L2",
            MODE: "MODE",
            PG: "PG",
            VIN: "VIN",
            VOUT: "VOUT",
          }}
        />
      }
    />

    <inductor
      name="L1"
      inductance={4.7e-7}
      footprint="0603"
      schX={0}
      schY={4}
      schOrientation="horizontal"
    />

    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0603"
      schX={-4}
      schY={1.1}
      schOrientation="vertical"
    />

    <capacitor
      name="C2"
      capacitance="22uF"
      footprint="0805"
      schX={6}
      schY={0.5}
      schOrientation="vertical"
    />

    <resistor
      name="R1"
      resistance="511k"
      footprint="0603"
      schX={3.8}
      schY={1}
      schOrientation="vertical"
    />

    <resistor
      name="R2"
      resistance="91k"
      footprint="0603"
      schX={3.8}
      schY={-1.2}
      schOrientation="vertical"
    />

    <resistor
      name="R3"
      resistance="100k"
      footprint="0603"
      schX={2.7}
      schY={1.4}
      schOrientation="vertical"
    />

    <netlabel
      net="VIN"
      connection="U1.VIN"
      schX={-5.7}
      schY={1.8}
      anchorSide="right"
    />
    <schematictext
      text="VIN 1.3V-5.5V"
      schX={-6}
      schY={2.2}
      fontSize={0.18}
      anchor="center"
    />
    <netlabel
      net="VOUT"
      connection="U1.pin6"
      schX={7}
      schY={1.8}
      anchorSide="left"
    />
    <schematictext
      text="VOUT = 3.3V"
      schX={7.5}
      schY={2.2}
      fontSize={0.18}
      anchor="center"
    />

    <trace from="U1.L1" to="L1.pin1" />
    <trace from="U1.L2" to="L1.pin2" />

    <trace from="U1.VIN" to="C1.pin1" />
    <trace from="U1.VIN" to="U1.EN" />
    <trace from="U1.VIN" to="R3.pin1" />

    <trace from="U1.VOUT" to="C2.pin1" />
    <trace from="R1.pin1" to="U1.VOUT" />

    <trace from="U1.PG" to="R3.pin2" />
    <trace from="U1.FB" to="R1.pin2" />
    <trace from="U1.FB" to="R2.pin1" />

    <trace from="U1.MODE" to="net.GND" />
    <trace from="U1.GND" to="net.GND" />
    <trace from="U1.AGND" to="net.GND" />
    <trace from="C1.pin2" to="net.GND" />
    <trace from="C2.pin2" to="net.GND" />
    <trace from="R2.pin2" to="net.GND" />

    <voltageprobe name="VOUT" connectsTo="U1.VOUT" />
    <analogsimulation duration="5ms" timePerStep="5us" spiceEngine="ngspice" />
  </subcircuit>
);

export default TPS63802;
