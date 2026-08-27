import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TPS61236RWLR } from "../chips/TPS61236RWLR.circuit.tsx";

const threeVoltNetName = "V3_0";

export const BoostConverter_TPS61236 = (props: SubcircuitProps) => (
  <subcircuit
    routingDisabled
    schAutoLayoutEnabled={false}
    schX={5.5}
    schY={-3.5}
    {...props}
  >
    <net name="GND" isGroundNet />
    <net name={threeVoltNetName} isPowerNet />
    <net name="VCUR" />
    <net name="VCOM" />
    <capacitor
      name="C2"
      capacitance="1uF"
      schX={-0.9}
      schY={4.8}
      schRotation={270}
    />
    <capacitor
      name="C4"
      capacitance="1uF"
      schX={0.9}
      schY={4.8}
      schRotation={270}
    />
    <capacitor
      name="C3"
      capacitance="1uF"
      schX={0.1}
      schY={4.8}
      schRotation={270}
    />
    <capacitor
      name="C5"
      capacitance="1uF"
      schX={-2.7}
      schY={4.6}
      schRotation={270}
    />
    <capacitor
      name="C1"
      capacitance="1uF"
      schX={-10.3}
      schY={4.2}
      schRotation={270}
    />
    <capacitor
      name="C7"
      capacitance="1uF"
      schX={-11.5}
      schY={1}
      schRotation={270}
    />
    <capacitor
      name="C6"
      capacitance="1uF"
      schX={-9.7}
      schY={2.2}
      schRotation={270}
    />
    <resistor
      name="R4"
      resistance="1k"
      schX={-10.5}
      schY={2.3}
      schRotation={90}
    />
    <resistor
      name="R3"
      resistance="1k"
      schX={-11.5}
      schY={2.5}
      schRotation={90}
    />
    <resistor
      name="R2"
      resistance="1k"
      schX={-2.3}
      schY={3.7}
      schRotation={180}
    />
    <resistor
      name="R1"
      resistance="1k"
      schX={-3.5}
      schY={4.5}
      schRotation={90}
    />
    <resistor
      name="R6"
      resistance="1k"
      schX={-3.5}
      schY={3.1}
      schRotation={90}
    />
    <resistor
      name="R5"
      resistance="1k"
      connections={{ pin1: `net.${threeVoltNetName}` }}
      schX={-8.7}
      schY={2.6}
      schRotation={90}
    />
    <resistor
      name="R7"
      resistance="1k"
      schX={-11.5}
      schY={1.7}
      schRotation={90}
    />
    <inductor
      name="L1"
      inductance="1uH"
      schX={-6.7}
      schY={6.95}
      schRotation={0}
    />

    <mosfet
      name="Q2"
      manufacturerPartNumber="Q2"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
      connections={{ gate: "net.VCUR" }}
      schX={-12.45}
      schY={1.38}
    />
    <mosfet
      name="Q1"
      manufacturerPartNumber="Q1"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="right"
      connections={{ gate: "net.VCOM" }}
      schX={-1.55}
      schY={2.98}
    />
    <TPS61236RWLR
      name="U1"
      schX={-6.4}
      schY={4.3}
      schWidth={2.2}
      schHeight={2.8}
      schPinArrangement={{
        leftSide: { pins: [3, 7, 4, 8], direction: "top-to-bottom" },
        rightSide: { pins: [9, 2, 6, 5, 1], direction: "top-to-bottom" },
      }}
      schPinStyle={{
        pin7: { marginTop: 0.4 },
        pin4: { marginTop: 0.4 },
        pin8: { marginTop: 0.4 },
        pin2: { marginTop: 0.4 },
        pin6: { marginTop: 0.4 },
        pin5: { marginTop: 0.4 },
      }}
    />
    <chip
      name="J1"
      manufacturerPartNumber=""
      pinLabels={{ pin1: "1" }}
      schPinArrangement={
        { rightSide: { pins: [1], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.3}
      schHeight={0.3}
      schX={-11.38}
      schY={5}
    />
    <chip
      name="J3"
      manufacturerPartNumber=""
      pinLabels={{ pin1: "1" }}
      schPinArrangement={
        { rightSide: { pins: [1], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.3}
      schHeight={0.3}
      schX={-11.38}
      schY={3.7}
    />
    <chip
      name="J2"
      manufacturerPartNumber=""
      pinLabels={{ pin1: "1" }}
      schPinArrangement={
        { leftSide: { pins: [1], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.3}
      schHeight={0.3}
      schX={2.78}
      schY={5.3}
    />
    <chip
      name="J4"
      manufacturerPartNumber=""
      pinLabels={{ pin1: "1" }}
      schPinArrangement={
        { leftSide: { pins: [1], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.3}
      schHeight={0.3}
      schX={2.78}
      schY={4.3}
    />
    <trace from=".C2 > .pin1" to=".C4 > .pin1" />
    <trace from=".C2 > .pin1" to=".C3 > .pin1" />
    <trace from=".C2 > .pin1" to=".C5 > .pin1" />
    <trace from=".C2 > .pin1" to=".U1 > .pin9" />
    <trace from=".C2 > .pin1" to=".R1 > .pin2" />
    <trace from=".C2 > .pin1" to=".J2 > .pin1" />
    <trace from=".C2 > .pin2" to=".C4 > .pin2" />
    <trace from=".C2 > .pin2" to=".C3 > .pin2" />
    <trace from=".C2 > .pin2" to=".U1 > .pin1" />
    <trace from=".C2 > .pin2" to=".U1 > .pin5" />
    <trace from=".C2 > .pin2" to=".C1 > .pin2" />
    <trace from=".C2 > .pin2" to=".J3 > .pin1" />
    <trace from=".C2 > .pin2" to=".R4 > .pin1" />
    <trace from=".C2 > .pin2" to=".Q2 > .source" />
    <trace from=".C2 > .pin2" to=".Q1 > .source" />
    <trace from=".C2 > .pin2" to=".R6 > .pin1" />
    <trace from=".C2 > .pin2" to=".J4 > .pin1" />
    <trace from=".C2 > .pin2" to=".C7 > .pin2" />
    <trace from=".C2 > .pin2" to=".C6 > .pin2" />
    <trace from=".C5 > .pin2" to=".U1 > .pin6" />
    <trace from=".C5 > .pin2" to=".R2 > .pin2" />
    <trace from=".C5 > .pin2" to=".R1 > .pin1" />
    <trace from=".C5 > .pin2" to=".R6 > .pin2" />
    <trace from=".U1 > .pin2" to=".L1 > .pin2" />
    <trace from=".U1 > .pin3" to=".C1 > .pin1" />
    <trace from=".U1 > .pin3" to=".J1 > .pin1" />
    <trace from=".U1 > .pin3" to=".L1 > .pin1" />
    <trace from=".U1 > .pin4" to=".R4 > .pin2" />
    <trace from=".U1 > .pin4" to=".R3 > .pin2" />
    <trace from=".U1 > .pin4" to=".C6 > .pin1" />
    <trace from=".U1 > .pin8" to=".R5 > .pin2" />
    <trace from=".R3 > .pin1" to=".Q2 > .drain" />
    <trace from=".R3 > .pin1" to=".R7 > .pin2" />
    <trace from=".Q1 > .drain" to=".R2 > .pin1" />
    <trace from=".C7 > .pin1" to=".R7 > .pin1" />
    <trace from=".C2 > .pin2" to="net.GND" />
  </subcircuit>
);

export default BoostConverter_TPS61236;
