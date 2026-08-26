import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { MSP430G2332IPW20 } from "../chips/MSP430G2332IPW20.circuit.tsx";
import { TPS78230DRVR } from "../chips/TPS78230DRVR.circuit.tsx";

const threeVoltNetName = "​3V";
const threeVoltNetSelector = "net.​3V";

export const Microcontroller_MSP430G2332 = (props: SubcircuitProps) => (
  <subcircuit
    routingDisabled
    schAutoLayoutEnabled={false}
    schTraceAutoLabelEnabled={false}
    schMaxTraceDistance={100}
    {...props}
  >
    <net name="GND" isGroundNet />
    <net name={threeVoltNetName} isPowerNet />
    <net name="VINT" isPowerNet />
    <net name="TEST" />
    <capacitor
      name="C16"
      capacitance="1uF"
      schX={-0.7}
      schY={-7.2}
      schRotation={90}
    />
    <capacitor
      name="C8"
      capacitance="1uF"
      schX={-11.7}
      schY={-0.4}
      schRotation={270}
    />
    <capacitor
      name="C9"
      capacitance="1uF"
      schX={-7.9}
      schY={0.1}
      schRotation={270}
    />
    <capacitor
      name="C14"
      capacitance="1uF"
      schX={-5.6}
      schY={-6}
      schRotation={270}
    />
    <capacitor
      name="C15"
      capacitance="1uF"
      schX={-8.5}
      schY={-6.8}
      schRotation={90}
    />
    <capacitor
      name="C12"
      capacitance="1uF"
      schX={-8.1}
      schY={-3.3}
      schRotation={90}
    />
    <capacitor
      name="C11"
      capacitance="1uF"
      schX={-11.1}
      schY={-2.6}
      schRotation={90}
    />
    <capacitor
      name="C13"
      capacitance="1uF"
      schX={-7.1}
      schY={-3.2}
      schRotation={90}
    />
    <resistor
      name="R10"
      resistance="1k"
      schX={2.9}
      schY={-1.25}
      schRotation={0}
    />
    <resistor
      name="R11"
      resistance="1k"
      schX={-13.2}
      schY={-2.1}
      schRotation={0}
    />
    <resistor
      name="R15"
      resistance="1k"
      schX={-8.9}
      schY={-3.1}
      schRotation={90}
    />
    <resistor
      name="R19"
      resistance="1k"
      schX={2.5}
      schY={-5.9}
      schRotation={180}
    />
    <resistor
      name="R20"
      resistance="1k"
      schX={-0.7}
      schY={-6.3}
      schRotation={90}
    />
    <resistor
      name="R12"
      resistance="1k"
      schX={2.9}
      schY={-2.05}
      schRotation={0}
    />
    <resistor
      name="R16"
      resistance="1k"
      schX={2.9}
      schY={-2.85}
      schRotation={0}
    />
    <resistor
      name="R17"
      resistance="1k"
      schX={2.9}
      schY={-3.65}
      schRotation={0}
    />
    <resistor
      name="R14"
      resistance="1k"
      schX={-12}
      schY={-2.6}
      schRotation={90}
    />
    <resistor
      name="R13"
      resistance="1k"
      schX={-9.3}
      schY={-2.7}
      schRotation={0}
    />
    <resistor
      name="R18"
      resistance="1k"
      schX={-7.7}
      schY={-5.5}
      schRotation={90}
    />

    <diode
      name="D2"
      manufacturerPartNumber="D2"
      schX={4.1}
      schY={-2.08}
      schRotation={0}
    />
    <diode
      name="D1"
      manufacturerPartNumber="D1"
      schX={4.1}
      schY={-1.28}
      schRotation={0}
    />
    <diode
      name="D4"
      manufacturerPartNumber="D4"
      schX={4.1}
      schY={-3.68}
      schRotation={0}
    />
    <diode
      name="D3"
      manufacturerPartNumber="D3"
      schX={4.1}
      schY={-2.88}
      schRotation={0}
    />

    <transistor
      name="Q5"
      manufacturerPartNumber="Q5"
      type="npn"
      schX={3.4}
      schY={-5.9}
      schRotation={270}
    />
    <TPS78230DRVR
      name="U2"
      schX={-9.7}
      schY={0.5}
      schWidth={1.2}
      schHeight={1.2}
      schPinArrangement={{
        leftSide: { pins: [6, 4, 2], direction: "top-to-bottom" },
        rightSide: { pins: [1, 7, 3, 5], direction: "top-to-bottom" },
      }}
      schPinStyle={{
        pin4: { marginTop: 0.2 },
        pin2: { marginTop: 0.2 },
        pin7: { marginTop: 0.2 },
      }}
    />
    <MSP430G2332IPW20
      name="U4"
      schX={-1.9}
      schY={-3.5}
      schWidth={4.4}
      schHeight={2.8}
      schPinArrangement={{
        leftSide: {
          pins: [2, 3, 4, 5, 6, 7, 14, 15, 16, 17, 1],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: [8, 9, 10, 11, 12, 13, 19, 18, 20],
          direction: "top-to-bottom",
        },
      }}
      schPinStyle={{
        pin16: { marginTop: 0.2 },
        pin1: { marginTop: 0.2 },
        pin20: { marginTop: 0.8 },
      }}
    />
    <chip
      name="J6"
      manufacturerPartNumber="J6"
      pinLabels={{ pin1: "1", pin2: "2" }}
      schPinArrangement={{
        rightSide: { pins: [2, 1], direction: "top-to-bottom" },
      }}
      schPinStyle={{}}
      schWidth={0.5}
      schHeight={0.6}
      schX={-2.9}
      schY={-6.8}
    />
    <chip
      name="RT1"
      manufacturerPartNumber="RT1"
      pinLabels={{ pin2: "2", pin1: "1" }}
      schPinArrangement={{
        topSide: { pins: [2], direction: "left-to-right" },
        bottomSide: { pins: [1], direction: "left-to-right" },
      }}
      schPinStyle={{}}
      schWidth={0.5}
      schHeight={0.5}
      schX={-7.7}
      schY={-6.7}
    />
    <trace from=".D2 > .anode" to=".R12 > .pin2" />
    <trace from=".D2 > .cathode" to=".D1 > .cathode" />
    <trace from=".D2 > .cathode" to=".D4 > .cathode" />
    <trace from=".D2 > .cathode" to=".D3 > .cathode" />
    <trace from=".D2 > .cathode" to=".C16 > .pin1" />
    <trace from=".D2 > .cathode" to=".Q5 > .emitter" />
    <trace from=".Q5 > .collector" to="net.VINT" />
    <trace from=".D2 > .cathode" to=".U2 > .pin3" />
    <trace from=".D2 > .cathode" to=".U2 > .pin5" />
    <trace from=".D2 > .cathode" to=".U2 > .pin7" />
    <trace from=".D2 > .cathode" to=".C8 > .pin2" />
    <trace from=".D2 > .cathode" to=".RT1 > .pin1" />
    <trace from=".D2 > .cathode" to=".R15 > .pin1" />
    <trace from=".D2 > .cathode" to=".C9 > .pin2" />
    <trace from=".D2 > .cathode" to=".C14 > .pin2" />
    <trace from=".D2 > .cathode" to=".C15 > .pin1" />
    <trace from=".D2 > .cathode" to=".C12 > .pin1" />
    <trace from=".D2 > .cathode" to=".C11 > .pin1" />
    <trace from=".D2 > .cathode" to=".C13 > .pin1" />
    <trace from=".D2 > .cathode" to=".R14 > .pin1" />
    <trace from=".D2 > .cathode" to=".U4 > .pin20" />
    <trace from=".D1 > .anode" to=".R10 > .pin2" />
    <trace from=".R10 > .pin1" to=".U4 > .pin8" />
    <trace from=".D4 > .anode" to=".R17 > .pin2" />
    <trace from=".D3 > .anode" to=".R16 > .pin2" />
    <trace from=".J6 > .pin2" to=".C16 > .pin2" />
    <trace from=".J6 > .pin2" to=".R20 > .pin1" />
    <trace from=".Q5 > .base" to=".R19 > .pin1" />
    <trace from=".U2 > .pin1" to=".C9 > .pin1" />
    <trace from=".U2 > .pin1" to=".C14 > .pin1" />
    <trace from=".U2 > .pin1" to=".R20 > .pin2" />
    <trace from=".U2 > .pin1" to=".R18 > .pin2" />
    <trace from=".U2 > .pin1" to=".U4 > .pin1" />
    <trace from=".U2 > .pin4" to=".U2 > .pin6" />
    <trace from=".U2 > .pin4" to=".C8 > .pin1" />
    <trace from=".U2 > .pin4" to=".R11 > .pin1" />
    <trace from=".RT1 > .pin2" to=".C15 > .pin2" schDisplayLabel="VREF" />
    <trace from=".RT1 > .pin2" to=".R18 > .pin1" schDisplayLabel="VREF" />
    <trace from=".RT1 > .pin2" to=".U4 > .pin5" schDisplayLabel="VREF" />
    <trace from=".R11 > .pin2" to=".C11 > .pin2" />
    <trace from=".R11 > .pin2" to=".R14 > .pin2" />
    <trace from=".R11 > .pin2" to=".U4 > .pin2" />
    <trace from=".C12 > .pin2" to=".U4 > .pin3" />
    <trace from=".C12 > .pin2" to=".R13 > .pin2" />
    <trace from=".R15 > .pin2" to=".R13 > .pin2" />
    <trace from=".R19 > .pin2" to=".U4 > .pin18" />
    <trace from=".R12 > .pin1" to=".U4 > .pin9" />
    <trace from=".R16 > .pin1" to=".U4 > .pin10" />
    <trace from=".R17 > .pin1" to=".U4 > .pin7" schDisplayLabel="LED" />
    <trace from=".C13 > .pin2" to=".U4 > .pin4" />
    <trace from=".C9 > .pin2" to="net.GND" />
    <trace from=".U2 > .pin1" to={threeVoltNetSelector} />
    <netlabel
      net="TEST"
      connectsTo=".U4 > .pin17"
      schX={-4.5}
      schY={-4.3}
      anchorSide="right"
    />
    <netlabel
      net="TEST"
      connectsTo=".J6 > .pin1"
      schX={-2.25}
      schY={-6.9}
      anchorSide="left"
    />
  </subcircuit>
);

export default Microcontroller_MSP430G2332;
