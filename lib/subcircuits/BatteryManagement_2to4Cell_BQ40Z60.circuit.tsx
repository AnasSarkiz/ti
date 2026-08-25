import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { BQ294700DSG } from "../chips/BQ294700DSG.circuit.tsx";
import { BQ40Z60RHB } from "../chips/BQ40Z60RHB.circuit.tsx";

export const BatteryManagement_2to4Cell_BQ40Z60 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props}>
    <net name="GND" isGroundNet />
    <net name="PGND" isGroundNet />
    <net name={"\u200B4P"} isPowerNet />
    <net name="VDD" isPowerNet />
    <net name="BAT" isPowerNet />
    <net name="VSYS" isPowerNet />
    <net name="VCC" isPowerNet />
    <net name="REGN" isPowerNet />
    <net name="PH" isPowerNet />
    <net name="HIDRV" />
    <net name="LODRV" />
    <net name="ACFET" />
    <net name="GPIO1" />

    <capacitor
      name="C3"
      capacitance="0.1uF"
      schX={-12.4}
      schY={8.4}
      schRotation={0}
    />
    <capacitor
      name="C6"
      capacitance="0.1uF"
      schX={-12.4}
      schY={6.7}
      schRotation={0}
    />
    <capacitor
      name="C8"
      capacitance="0.1uF"
      schX={-12.4}
      schY={5.4}
      schRotation={0}
    />
    <capacitor
      name="C9"
      capacitance="0.1uF"
      schX={-12.4}
      schY={4.1}
      schRotation={0}
    />
    <capacitor
      name="C11"
      capacitance="0.1uF"
      schX={-12.4}
      schY={2.8}
      schRotation={0}
    />
    <capacitor
      name="C4"
      capacitance="0.1uF"
      schX={-5.8}
      schY={6.9}
      schRotation={90}
    />
    <capacitor
      name="C10"
      capacitance="0.1uF"
      schX={-6.2}
      schY={4.7}
      schRotation={270}
    />
    <capacitor
      name="C1"
      capacitance="0.1uF"
      schX={1.9}
      schY={9.8}
      schRotation={180}
    />
    <capacitor
      name="C2"
      capacitance="0.1uF"
      schX={3}
      schY={9.8}
      schRotation={0}
    />
    <capacitor
      name="C21"
      capacitance="0.1uF"
      schX={-10.4}
      schY={-0.8}
      schRotation={0}
    />
    <capacitor
      name="C22"
      capacitance="0.1uF"
      schX={-10.4}
      schY={-2.2}
      schRotation={0}
    />
    <capacitor
      name="C23"
      capacitance="0.1uF"
      schX={-10.4}
      schY={-3.6}
      schRotation={0}
    />
    <capacitor
      name="C26"
      capacitance="0.1uF"
      schX={-11.4}
      schY={-5.3}
      schRotation={270}
    />
    <capacitor
      name="C20"
      capacitance="2.2uF"
      schX={1.4}
      schY={0.6}
      schRotation={180}
    />
    <capacitor
      name="C27"
      capacitance="1.5uF"
      schX={1}
      schY={-3.9}
      schRotation={90}
    />
    <capacitor
      name="C18"
      capacitance="1uF"
      schX={1.4}
      schY={1.6}
      schRotation={180}
    />
    <capacitor
      name="C19"
      capacitance="0.1uF"
      schX={-10.4}
      schY={0.6}
      schRotation={0}
    />
    <capacitor
      name="C36"
      capacitance="100pF"
      schX={-10.2}
      schY={-5.3}
      schRotation={270}
    />
    <resistor
      name="R12"
      resistance="1k"
      schX={-14.5}
      schY={7.1}
      schRotation={0}
    />
    <resistor
      name="R13"
      resistance="1k"
      schX={-14.5}
      schY={5.8}
      schRotation={0}
    />
    <resistor
      name="R16"
      resistance="1k"
      schX={-14.5}
      schY={4.5}
      schRotation={0}
    />
    <resistor
      name="R19"
      resistance="1k"
      schX={-14.5}
      schY={3.2}
      schRotation={0}
    />
    <resistor
      name="R4"
      resistance="100"
      schX={-14.5}
      schY={8.8}
      schRotation={0}
    />
    <resistor
      name="R5"
      resistance="5.1k"
      schX={-7}
      schY={7.8}
      schRotation={0}
    />
    <resistor
      name="R11"
      resistance="5.1k"
      schX={2.2}
      schY={7}
      schRotation={270}
    />
    <resistor
      name="R10"
      resistance="5.1k"
      schX={0.1}
      schY={7}
      schRotation={270}
    />
    <resistor
      name="R2"
      resistance="10M"
      schX={-0.8}
      schY={8}
      schRotation={270}
    />
    <resistor
      name="R3"
      resistance="10M"
      schX={3.2}
      schY={8}
      schRotation={270}
    />
    <resistor
      name="R25"
      resistance="10"
      schX={-9.8}
      schY={2.6}
      schRotation={0}
    />
    <resistor
      name="R43"
      resistance="0.005"
      schX={-14}
      schY={-5.4}
      schRotation={270}
    />
    <resistor name="R30" resistance="100" schX={-12} schY={1} schRotation={0} />
    <resistor
      name="R32"
      resistance="100"
      schX={-12}
      schY={-0.4}
      schRotation={0}
    />
    <resistor
      name="R35"
      resistance="100"
      schX={-12}
      schY={-1.8}
      schRotation={0}
    />
    <resistor
      name="R37"
      resistance="100"
      schX={-12}
      schY={-3.2}
      schRotation={0}
    />
    <resistor
      name="R33"
      resistance="100"
      schX={6.6}
      schY={-0.8}
      schRotation={0}
    />
    <resistor
      name="R42"
      resistance="100"
      schX={7.7}
      schY={-3.9}
      schRotation={0}
    />
    <resistor
      name="R41"
      resistance="100"
      schX={6.5}
      schY={-3.9}
      schRotation={0}
    />
    <resistor
      name="R34"
      resistance="1k"
      schX={7.8}
      schY={-0.8}
      schRotation={0}
    />
    <resistor
      name="R40"
      resistance="100"
      schX={5.6}
      schY={-3}
      schRotation={0}
    />
    <resistor
      name="R39"
      resistance="100"
      schX={4.4}
      schY={-3}
      schRotation={0}
    />
    <resistor
      name="R22"
      resistance="5.1k"
      schX={-6.6}
      schY={3.4}
      schRotation={270}
    />
    <resistor
      name="R26"
      resistance="26.1k"
      schX={5.2}
      schY={2}
      schRotation={0}
    />
    <resistor
      name="R27"
      resistance="9.53k"
      schX={6.2}
      schY={2}
      schRotation={0}
    />
    <resistor
      name="R28"
      resistance="20.5k"
      schX={7.2}
      schY={2}
      schRotation={0}
    />
    <resistor
      name="R29"
      resistance="78.7k"
      schX={8.2}
      schY={2}
      schRotation={0}
    />
    <resistor
      name="R1"
      resistance="20"
      schX={-2.8}
      schY={9}
      schRotation={270}
    />
    <resistor
      name="R9"
      resistance="1M"
      schX={-1.4}
      schY={7.2}
      schRotation={270}
    />
    <resistor
      name="R17"
      resistance="499k"
      schX={-1.4}
      schY={4.6}
      schRotation={180}
    />
    <resistor
      name="R18"
      resistance="20k"
      schX={-5.4}
      schY={4.6}
      schRotation={90}
    />
    <resistor
      name="R38"
      resistance="0"
      schX={-12.8}
      schY={-5}
      schRotation={180}
    />
    <resistor
      name="R44"
      resistance="0"
      schX={-12.8}
      schY={-6}
      schRotation={180}
    />
    <diode
      name="D2"
      manufacturerPartNumber="MMSZ5232BS-7-F"
      variant="zener"
      schX={7.2}
      schY={-1.66}
      schRotation={90}
    />
    <diode
      name="D5"
      manufacturerPartNumber="MMSZ5232BS-7-F"
      variant="zener"
      schX={7.1}
      schY={-4.76}
      schRotation={90}
    />
    <diode
      name="D4"
      manufacturerPartNumber="MMSZ5232BS-7-F"
      variant="zener"
      schX={5}
      schY={-4.76}
      schRotation={90}
    />
    <diode
      name="D1"
      manufacturerPartNumber="BAT54HT1G"
      variant="schottky"
      schX={-8.48}
      schY={2.6}
      schRotation={0}
    />
    <mosfet
      name="Q7"
      manufacturerPartNumber="BSS138"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
      schX={-4.47}
      schY={5.4}
    />
    <mosfet
      name="Q2"
      manufacturerPartNumber="CSD17308Q3"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="right"
      symbolSourceSide="left"
      symbolGateSide="bottom"
      schX={0.2}
      schY={8.53}
    />
    <mosfet
      name="Q3"
      manufacturerPartNumber="CSD17308Q3"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="left"
      symbolSourceSide="right"
      symbolGateSide="bottom"
      schX={2.2}
      schY={8.53}
    />
    <mosfet
      name="Q1"
      manufacturerPartNumber="FDN358P"
      channelType="p"
      mosfetMode="enhancement"
      symbolDrainSide="left"
      symbolSourceSide="right"
      symbolGateSide="bottom"
      schX={-1.8}
      schY={9.53}
    />
    <mosfet
      name="Q6"
      manufacturerPartNumber="BSS138"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="right"
      schX={-1.73}
      schY={5.6}
    />
    <chip
      name="J3"
      manufacturerPartNumber="J3"
      pinLabels={{ pin5: "5", pin4: "4", pin1: "1", pin2: "2", pin3: "3" }}
      schPinArrangement={{
        rightSide: { pins: [1, 2, 3, 4, 5], direction: "top-to-bottom" },
      }}
      schPinStyle={{}}
      schWidth={0.8}
      schHeight={1.2}
      schX={-15.5}
      schY={0.6}
    />
    <chip
      name="J6"
      manufacturerPartNumber="J6"
      pinLabels={{ pin4: "4", pin1: "1", pin2: "2", pin3: "3" }}
      schPinArrangement={{
        leftSide: { pins: [4, 3, 2, 1], direction: "top-to-bottom" },
      }}
      schPinStyle={{}}
      schWidth={0.8}
      schHeight={1}
      schX={12.6}
      schY={-3.3}
    />
    <chip
      name="J4"
      manufacturerPartNumber="J4"
      pinLabels={{
        pin1: "1",
        pin2: "2",
        pin3: "3",
        pin4: "4",
        pin5: "5",
        pin6: "6",
      }}
      schPinArrangement={{
        leftSide: { pins: [1, 3, 5], direction: "top-to-bottom" },
        rightSide: { pins: [2, 4, 6], direction: "top-to-bottom" },
      }}
      schPinStyle={{}}
      schWidth={0.8}
      schHeight={0.8}
      schX={8.4}
      schY={0.6}
    />
    <BQ294700DSG
      name="U1"
      schPinArrangement={{
        leftSide: { pins: [1, 2, 3, 4], direction: "top-to-bottom" },
        rightSide: { pins: [8, 7, 6, 5], direction: "top-to-bottom" },
        bottomSide: { pins: [9], direction: "left-to-right" },
      }}
      schPinStyle={{
        pin2: { marginTop: 0.2 },
        pin3: { marginTop: 0.2 },
        pin4: { marginTop: 0.2 },
        pin7: { marginTop: 0.2 },
        pin6: { marginTop: 0.2 },
        pin5: { marginTop: 0.2 },
      }}
      schWidth={1.6}
      schHeight={1.6}
      schX={-9}
      schY={7.2}
    />
    <chip
      name="F1"
      manufacturerPartNumber="SFH-1412B"
      pinLabels={{ pin1: "Fuse", pin4: "Heater", pin3: "Fuse", pin2: "2" }}
      schPinArrangement={{
        leftSide: { pins: [1], direction: "top-to-bottom" },
        rightSide: { pins: [3], direction: "top-to-bottom" },
        topSide: { pins: [2], direction: "left-to-right" },
        bottomSide: { pins: [4], direction: "left-to-right" },
      }}
      schPinStyle={{}}
      schWidth={1.2}
      schHeight={0.8}
      schX={-4.6}
      schY={8.6}
    />
    <BQ40Z60RHB
      name="U2"
      schPinArrangement={{
        leftSide: {
          pins: [3, 4, 5, 6, 21, 14, 15, 8, 7, 10, 11, 12, 13, 24, 9, 33],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: [
            31, 1, 2, 32, 30, 29, 22, 20, 19, 18, 27, 28, 26, 25, 23, 16, 17,
          ],
          direction: "top-to-bottom",
        },
      }}
      schPinStyle={{
        pin21: { marginTop: 0.2 },
        pin14: { marginTop: 0.2 },
        pin8: { marginTop: 0.2 },
        pin10: { marginTop: 0.4 },
        pin24: { marginTop: 0.4 },
        pin32: { marginTop: 0.2 },
        pin29: { marginTop: 0.2 },
        pin20: { marginTop: 0.2 },
        pin27: { marginTop: 0.2 },
        pin23: { marginTop: 0.2 },
        pin16: { marginTop: 0.2 },
      }}
      schWidth={2.2}
      schHeight={5.2}
      schX={-1.9}
      schY={-1.2}
    />
    <chip
      name="J7"
      manufacturerPartNumber="J7"
      pinLabels={{ pin1: "1", pin2: "2" }}
      schPinArrangement={{
        leftSide: { pins: [1, 2], direction: "top-to-bottom" },
      }}
      schPinStyle={{}}
      schWidth={0.8}
      schHeight={0.8}
      schX={10.6}
      schY={-0.9}
    />
    <resistor
      name="RT4"
      manufacturerPartNumber="RT4"
      resistance="10k"
      symbolName="resistor"
      schX={-4.7}
      schY={-3.07}
      schRotation={270}
    />
    <resistor
      name="RT1"
      manufacturerPartNumber="RT1"
      resistance="10k"
      symbolName="resistor"
      schX={-8}
      schY={-2.47}
      schRotation={270}
    />
    <resistor
      name="RT2"
      manufacturerPartNumber="RT2"
      resistance="10k"
      symbolName="resistor"
      schX={-6.9}
      schY={-2.67}
      schRotation={270}
    />
    <resistor
      name="RT3"
      manufacturerPartNumber="RT3"
      resistance="10k"
      symbolName="resistor"
      schX={-5.8}
      schY={-2.87}
      schRotation={270}
    />

    <trace from=".C3 > .pin1" to=".R4 > .pin2" />
    <trace from=".C3 > .pin1" to=".U1 > .pin1" />
    <trace from=".C3 > .pin2" to=".C11 > .pin2" />
    <trace from=".C3 > .pin2" to=".C4 > .pin1" />
    <trace from=".C3 > .pin2" to=".C10 > .pin2" />
    <trace from=".C3 > .pin2" to=".J3 > .pin5" />
    <trace from=".C3 > .pin2" to=".R43 > .pin1" />
    <trace from=".C3 > .pin2" to=".C20 > .pin1" />
    <trace from=".C3 > .pin2" to=".C27 > .pin1" />
    <trace from=".C3 > .pin2" to=".J4 > .pin2" />
    <trace from=".C3 > .pin2" to=".J4 > .pin4" />
    <trace from=".C3 > .pin2" to=".J4 > .pin6" />
    <trace from=".C3 > .pin2" to=".R29 > .pin2" />
    <trace from=".C3 > .pin2" to=".U1 > .pin6" />
    <trace from=".C3 > .pin2" to=".U1 > .pin9" />
    <trace from=".C3 > .pin2" to=".C18 > .pin1" />
    <trace from=".C3 > .pin2" to=".Q7 > .source" />
    <trace from=".C3 > .pin2" to=".R17 > .pin2" />
    <trace from=".C3 > .pin2" to=".Q6 > .source" />
    <trace from=".C3 > .pin2" to=".R18 > .pin1" />
    <trace from=".C3 > .pin2" to=".RT4 > .pin2" />
    <trace from=".C3 > .pin2" to=".RT1 > .pin2" />
    <trace from=".C3 > .pin2" to=".RT2 > .pin2" />
    <trace from=".C3 > .pin2" to=".RT3 > .pin2" />
    <trace from=".C3 > .pin2" to=".U2 > .pin9" />
    <trace from=".C3 > .pin2" to=".U2 > .pin33" />
    <trace from=".C3 > .pin2" to=".R38 > .pin2" />
    <trace from=".C6 > .pin1" to=".R12 > .pin2" />
    <trace from=".C6 > .pin1" to=".U1 > .pin2" />
    <trace from=".C6 > .pin2" to=".C8 > .pin1" />
    <trace from=".C6 > .pin2" to=".R13 > .pin2" />
    <trace from=".C6 > .pin2" to=".U1 > .pin3" />
    <trace from=".C8 > .pin2" to=".C9 > .pin1" />
    <trace from=".C8 > .pin2" to=".R16 > .pin2" />
    <trace from=".C8 > .pin2" to=".U1 > .pin4" />
    <trace from=".C9 > .pin2" to=".C11 > .pin1" />
    <trace from=".C9 > .pin2" to=".R19 > .pin2" />
    <trace from=".C9 > .pin2" to=".U1 > .pin5" />
    <trace from=".C4 > .pin2" to=".U1 > .pin7" />
    <trace from=".J3 > .pin1" to=".R4 > .pin1" />
    <trace from=".J3 > .pin1" to=".R12 > .pin1" />
    <trace from=".J3 > .pin1" to=".R25 > .pin1" />
    <trace from=".J3 > .pin1" to=".R30 > .pin1" />
    <trace from=".J3 > .pin1" to=".R1 > .pin1" />
    <trace from=".J3 > .pin1" to=".F1 > .pin1" />
    <trace from=".R43 > .pin2" to=".D2 > .anode" />
    <trace from=".R43 > .pin2" to=".D5 > .anode" />
    <trace from=".R43 > .pin2" to=".J6 > .pin1" />
    <trace from=".R43 > .pin2" to=".D4 > .anode" />
    <trace from=".R43 > .pin2" to=".U2 > .pin24" />
    <trace from=".R43 > .pin2" to=".J7 > .pin2" />
    <trace from=".R43 > .pin2" to=".R44 > .pin2" />
    <trace from=".R13 > .pin1" to=".J3 > .pin2" />
    <trace from=".R13 > .pin1" to=".R32 > .pin1" />
    <trace from=".R16 > .pin1" to=".J3 > .pin3" />
    <trace from=".R16 > .pin1" to=".R35 > .pin1" />
    <trace from=".R19 > .pin1" to=".J3 > .pin4" />
    <trace from=".R19 > .pin1" to=".R37 > .pin1" />
    <trace from=".R5 > .pin2" to=".C10 > .pin1" />
    <trace from=".R5 > .pin2" to=".R22 > .pin2" />
    <trace from=".R5 > .pin2" to=".Q7 > .gate" />
    <trace from=".R5 > .pin2" to=".R18 > .pin2" />
    <trace from=".R5 > .pin1" to=".U1 > .pin8" />
    <trace from=".C1 > .pin2" to=".Q2 > .drain" />
    <trace from=".C1 > .pin2" to=".Q3 > .drain" />
    <trace from=".C1 > .pin1" to=".C2 > .pin1" />
    <trace from=".C2 > .pin2" to=".R3 > .pin1" />
    <trace from=".C2 > .pin2" to=".Q3 > .source" />
    <trace from=".R11 > .pin2" to=".U2 > .pin30" />
    <trace from=".R11 > .pin1" to=".R3 > .pin2" />
    <trace from=".R11 > .pin1" to=".Q3 > .gate" />
    <trace from=".R10 > .pin2" to=".U2 > .pin32" />
    <trace from=".R10 > .pin1" to=".R2 > .pin2" />
    <trace from=".R10 > .pin1" to=".Q2 > .gate" />
    <trace from=".R25 > .pin2" to=".D1 > .anode" />
    <trace from=".C26 > .pin1" to=".U2 > .pin8" />
    <trace from=".C26 > .pin1" to=".C36 > .pin1" />
    <trace from=".C26 > .pin1" to=".R38 > .pin1" />
    <trace from=".C26 > .pin2" to=".U2 > .pin7" />
    <trace from=".C26 > .pin2" to=".C36 > .pin2" />
    <trace from=".C26 > .pin2" to=".R44 > .pin1" />
    <trace from=".C20 > .pin2" to=".U2 > .pin2" />
    <trace from=".R33 > .pin2" to=".D2 > .cathode" />
    <trace from=".R33 > .pin2" to=".R34 > .pin1" />
    <trace from=".R33 > .pin1" to=".U2 > .pin14" />
    <trace from=".R42 > .pin2" to=".J6 > .pin2" />
    <trace from=".R42 > .pin1" to=".R41 > .pin2" />
    <trace from=".R42 > .pin1" to=".D5 > .cathode" />
    <trace from=".R41 > .pin1" to=".U2 > .pin17" />
    <trace from=".R34 > .pin2" to=".J7 > .pin1" />
    <trace from=".J6 > .pin3" to=".R40 > .pin2" />
    <trace from=".R40 > .pin1" to=".R39 > .pin2" />
    <trace from=".R40 > .pin1" to=".D4 > .cathode" />
    <trace from=".R39 > .pin1" to=".U2 > .pin16" />
    <trace from=".R22 > .pin1" to=".U2 > .pin21" />
    <trace from=".C27 > .pin2" to=".U2 > .pin23" />
    <trace from=".J4 > .pin1" to=".R28 > .pin2" />
    <trace from=".J4 > .pin1" to=".R29 > .pin1" />
    <trace from=".J4 > .pin3" to=".R27 > .pin2" />
    <trace from=".J4 > .pin3" to=".R28 > .pin1" />
    <trace from=".J4 > .pin5" to=".R26 > .pin2" />
    <trace from=".J4 > .pin5" to=".R27 > .pin1" />
    <trace from=".R26 > .pin1" to=".U2 > .pin18" />
    <trace from=".R1 > .pin2" to=".Q1 > .drain" />
    <trace from=".R1 > .pin2" to=".F1 > .pin3" />
    <trace from=".R9 > .pin2" to=".Q1 > .gate" />
    <trace from=".R9 > .pin2" to=".Q6 > .drain" />
    <trace from=".Q2 > .source" to=".Q1 > .source" />
    <trace from=".Q2 > .source" to=".R9 > .pin1" />
    <trace from=".Q2 > .source" to=".R2 > .pin1" />
    <trace from=".RT1 > .pin1" to=".U2 > .pin10" />
    <trace from=".RT2 > .pin1" to=".U2 > .pin11" />
    <trace from=".RT3 > .pin1" to=".U2 > .pin12" />
    <trace from=".RT4 > .pin1" to=".U2 > .pin13" />
    <trace from=".D1 > .cathode" to=".C18 > .pin2" />
    <trace from=".D1 > .cathode" to=".U2 > .pin1" />
    <trace from=".Q7 > .drain" to=".F1 > .pin4" />
    <trace from=".R17 > .pin1" to=".Q6 > .gate" />
    <trace from=".C19 > .pin1" to=".R30 > .pin2" />
    <trace from=".C19 > .pin1" to=".U2 > .pin3" />
    <trace from=".C19 > .pin2" to=".C21 > .pin1" />
    <trace from=".C19 > .pin2" to=".R32 > .pin2" />
    <trace from=".C19 > .pin2" to=".U2 > .pin4" />
    <trace from=".C21 > .pin2" to=".C22 > .pin1" />
    <trace from=".C21 > .pin2" to=".R35 > .pin2" />
    <trace from=".C21 > .pin2" to=".U2 > .pin5" />
    <trace from=".C22 > .pin2" to=".C23 > .pin1" />
    <trace from=".C22 > .pin2" to=".R37 > .pin2" />
    <trace from=".C22 > .pin2" to=".U2 > .pin6" />
    <trace from=".J3 > .pin1" to="net.​4P" />
    <trace from=".U1 > .pin1" to="net.VDD" />
    <trace from=".U2 > .pin1" to="net.BAT" />
    <trace from=".C2 > .pin2" to="net.VSYS" />
    <trace from=".U2 > .pin22" to="net.VCC" />
    <trace from=".U2 > .pin23" to="net.REGN" />
    <trace from=".U2 > .pin26" to="net.PH" />
    <trace from=".U2 > .pin27" to="net.HIDRV" />
    <trace from=".U2 > .pin25" to="net.LODRV" />
    <trace from=".U2 > .pin29" to="net.ACFET" />
    <trace from=".U2 > .pin15" to="net.GPIO1" />
    <trace from=".C3 > .pin2" to="net.GND" />
    <trace from=".C23 > .pin2" to="net.GND" />
    <trace from=".R43 > .pin2" to="net.PGND" />
  </subcircuit>
);

export default BatteryManagement_2to4Cell_BQ40Z60;
