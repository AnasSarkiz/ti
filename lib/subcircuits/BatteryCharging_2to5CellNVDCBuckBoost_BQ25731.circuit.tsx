import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { BQ25731RSN } from "../chips/BQ25731RSN.circuit.tsx";

export const BatteryCharging_2to5CellNVDCBuckBoost_BQ25731 = (
  props: SubcircuitProps,
) => (
  <subcircuit routingDisabled schAutoLayoutEnabled={false} {...props}>
    <net name="GND" isPowerNet isGroundNet={true} />
    <net name="BAT" isPowerNet isGroundNet={false} />
    <net name="PPHV" isPowerNet isGroundNet={false} />
    <net name="REGN" isPowerNet isGroundNet={false} />
    <net name="VDDA" isPowerNet isGroundNet={false} />
    <net name="NET_01" isPowerNet isGroundNet={false} />
    <net name="NET_03" isPowerNet isGroundNet={false} />
    <net name="NET_05" isPowerNet isGroundNet={false} />
    <net name="NET_08" isPowerNet isGroundNet={false} />
    <capacitor
      name="C1"
      capacitance="0.01uF"
      schRotation={180}
      schX={-15}
      schY={3.4}
    />
    <capacitor
      name="C2"
      capacitance="0.01uF"
      schRotation={270}
      schX={-12}
      schY={9}
    />
    <capacitor
      name="C3"
      capacitance="0.01uF"
      schRotation={270}
      schX={13.4}
      schY={9.8}
    />
    <capacitor
      name="C4"
      capacitance="68uF"
      schRotation={270}
      schX={28.4}
      schY={9.74}
    />
    <capacitor
      name="C5"
      capacitance="0.018uF"
      schRotation={180}
      schX={14.4}
      schY={3.6}
    />
    <capacitor
      name="C6"
      capacitance="0.018uF"
      schRotation={180}
      schX={14.4}
      schY={2}
    />
    <capacitor
      name="C20"
      capacitance="10uF"
      schRotation={270}
      schX={26.2}
      schY={9.8}
    />
    <capacitor
      name="C21"
      capacitance="1000pF"
      schRotation={270}
      schX={-11.2}
      schY={9}
    />
    <capacitor
      name="C22"
      capacitance="0.047uF"
      schRotation={90}
      schX={-4.2}
      schY={9}
    />
    <capacitor
      name="C23"
      capacitance="0.047uF"
      schRotation={90}
      schX={5}
      schY={9}
    />
    <capacitor
      name="C24"
      capacitance="1uF"
      schRotation={270}
      schX={-26.8}
      schY={8.2}
    />
    <capacitor
      name="C25"
      capacitance="150pF"
      schRotation={180}
      schX={-8}
      schY={7.2}
    />
    <capacitor
      name="C26"
      capacitance="150pF"
      schRotation={0}
      schX={9.2}
      schY={7.2}
    />
    <capacitor
      name="C27"
      capacitance="0.47uF"
      schRotation={270}
      schX={-11.4}
      schY={5.4}
    />
    <capacitor
      name="C28"
      capacitance="0.033uF"
      schRotation={180}
      schX={-13.6}
      schY={4.4}
    />
    <capacitor
      name="C29"
      capacitance="0.033uF"
      schRotation={270}
      schX={-17.4}
      schY={3.8}
    />
    <capacitor
      name="C30"
      capacitance="0.068uF"
      schRotation={270}
      schX={5.6}
      schY={2.2}
    />
    <capacitor
      name="C31"
      capacitance="0.1uF"
      schRotation={180}
      schX={23}
      schY={8}
    />
    <capacitor
      name="C32"
      capacitance="1uF"
      schRotation={270}
      schX={-11.4}
      schY={0.6}
    />
    <capacitor
      name="C33"
      capacitance="33pF"
      schRotation={0}
      schX={-7.6}
      schY={0}
    />
    <capacitor
      name="C34"
      capacitance="2.2uF"
      schRotation={0}
      schX={8.4}
      schY={0}
    />
    <capacitor
      name="C35"
      capacitance="4700pF"
      schRotation={180}
      schX={-8.8}
      schY={-1.2}
    />
    <capacitor
      name="C36"
      capacitance="680pF"
      schRotation={0}
      schX={8.4}
      schY={-1.6}
    />
    <capacitor
      name="C37"
      capacitance="15pF"
      schRotation={0}
      schX={6.8}
      schY={-2.6}
    />
    <capacitor
      name="C38"
      capacitance="100pF"
      schRotation={90}
      schX={-18.2}
      schY={-2.6}
    />
    <capacitor
      name="C39"
      capacitance="100pF"
      schRotation={90}
      schX={10}
      schY={-5.8}
    />
    <capacitor
      name="C40"
      capacitance="100pF"
      schRotation={90}
      schX={8}
      schY={-5.8}
    />
    <capacitor
      name="C50"
      capacitance="22uF"
      schRotation={270}
      schX={-25}
      schY={9.8}
    />
    <capacitor
      name="C51"
      capacitance="22uF"
      schRotation={270}
      schX={-23}
      schY={9.8}
    />
    <capacitor
      name="C52"
      capacitance="22uF"
      schRotation={270}
      schX={-21}
      schY={9.8}
    />
    <capacitor
      name="C53"
      capacitance="22uF"
      schRotation={270}
      schX={-19}
      schY={9.8}
    />
    <capacitor
      name="C55"
      capacitance="22uF"
      schRotation={270}
      schX={15}
      schY={9.8}
    />
    <capacitor
      name="C56"
      capacitance="22uF"
      schRotation={270}
      schX={16.8}
      schY={9.8}
    />
    <capacitor
      name="C57"
      capacitance="22uF"
      schRotation={270}
      schX={18.6}
      schY={9.8}
    />
    <capacitor
      name="C58"
      capacitance="22uF"
      schRotation={270}
      schX={20.4}
      schY={9.8}
    />
    <capacitor
      name="C100"
      capacitance="15uF"
      schRotation={270}
      schX={-28.6}
      schY={8.94}
    />
    <resistor
      name="R1"
      resistance="0.005"
      schRotation={0}
      schX={-15}
      schY={10.4}
    />
    <resistor
      name="R2"
      resistance="0.005"
      schRotation={0}
      schX={23}
      schY={10.4}
    />
    <resistor
      name="R3"
      resistance="1.80"
      schRotation={90}
      schX={-26.8}
      schY={9.6}
    />
    <resistor
      name="R4"
      resistance="1.00"
      schRotation={0}
      schX={-12.6}
      schY={6.4}
    />
    <resistor
      name="R5"
      resistance="4.99"
      schRotation={90}
      schX={-14.2}
      schY={6.4}
    />
    <resistor
      name="R6"
      resistance="4.99"
      schRotation={90}
      schX={-15.8}
      schY={5.2}
    />
    <resistor
      name="R7"
      resistance="10"
      schRotation={180}
      schX={19.2}
      schY={2.8}
    />
    <resistor
      name="R8"
      resistance="10.0"
      schRotation={0}
      schX={-16.6}
      schY={1.2}
    />
    <resistor
      name="R9"
      resistance="10"
      schRotation={180}
      schX={19.6}
      schY={1.2}
    />
    <resistor
      name="R11"
      resistance="360k"
      schRotation={90}
      schX={13}
      schY={-1.6}
    />
    <resistor
      name="R12"
      resistance="40.2k"
      schRotation={0}
      schX={-6.2}
      schY={-1.2}
    />
    <resistor
      name="R13"
      resistance="15.0k"
      schRotation={0}
      schX={6.2}
      schY={-1}
    />
    <resistor
      name="R14"
      resistance="220k"
      schRotation={90}
      schX={-16.2}
      schY={-3.2}
    />
    <resistor
      name="R15"
      resistance="100k"
      schRotation={90}
      schX={-6.2}
      schY={-6.4}
    />
    <resistor
      name="R16"
      resistance="191k"
      schRotation={90}
      schX={11.8}
      schY={-6}
    />
    <resistor
      name="R17"
      resistance="30.1k"
      schRotation={270}
      schX={6.6}
      schY={-6.8}
    />
    <resistor
      name="R18"
      resistance="360k"
      schRotation={90}
      schX={14.8}
      schY={-3.2}
    />
    <resistor
      name="R20"
      resistance="100k"
      schRotation={0}
      schX={13.8}
      schY={-5}
    />
    <resistor
      name="R110"
      resistance="383k"
      schRotation={0}
      schX={-14.6}
      schY={-0.8}
    />
    <inductor
      name="L1"
      inductance="4.7uH"
      schRotation={0}
      schX={0.4}
      schY={10.4}
    />
    <mosfet
      name="Q1"
      manufacturerPartNumber="CSD18511Q5AR"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="left"
      symbolSourceSide="right"
      symbolGateSide="bottom"
      schRotation={270}
      schX={-9.4}
      schY={10.09}
    />
    <mosfet
      name="Q2"
      manufacturerPartNumber="CSD18511Q5AR"
      channelType="n"
      mosfetMode="enhancement"
      schRotation={90}
      schX={11.4}
      schY={10.71}
    />
    <mosfet
      name="Q3"
      manufacturerPartNumber="CSD18511Q5AR"
      channelType="n"
      mosfetMode="enhancement"
      schRotation={0}
      schX={-7.14}
      schY={9.2}
    />
    <mosfet
      name="Q4"
      manufacturerPartNumber="CSD18511Q5AR"
      channelType="n"
      mosfetMode="enhancement"
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="right"
      schRotation={0}
      schX={8.34}
      schY={9.2}
    />
    <solderjumper
      name="P1"
      pinCount={2}
      schRotation={90}
      schX={14.8}
      schY={-1}
    />
    <solderjumper
      name="P3"
      pinCount={2}
      schRotation={0}
      schX={17.2}
      schY={-5}
    />
    <BQ25731RSN
      name="U1"
      schPinArrangement={{
        leftSide: {
          pins: [30, 32, 29, 31, 1, 2, 3, 7, 6, 16, 11, 13, 12, 4, 5, 15, 14],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: [25, 23, 26, 24, 22, 21, 20, 19, 28, 17, 18, 8, 9, 10, 33, 27],
          direction: "top-to-bottom",
        },
      }}
      schPinStyle={{
        pin32: { marginTop: 0.6 },
        pin29: { marginTop: 0.6 },
        pin31: { marginTop: 0.6 },
        pin1: { marginTop: 0.6 },
        pin2: { marginTop: 0.6 },
        pin3: { marginTop: 0.6 },
        pin7: { marginTop: 0.6 },
        pin6: { marginTop: 1.4 },
        pin16: { marginTop: 0.6 },
        pin11: { marginTop: 1 },
        pin13: { marginTop: 0.6 },
        pin12: { marginTop: 0.6 },
        pin4: { marginTop: 0.6 },
        pin5: { marginTop: 0.6 },
        pin15: { marginTop: 0.6 },
        pin14: { marginTop: 0.6 },
        pin23: { marginTop: 0.6 },
        pin26: { marginTop: 0.6 },
        pin24: { marginTop: 0.6 },
        pin22: { marginTop: 0.6 },
        pin21: { marginTop: 0.6 },
        pin20: { marginTop: 0.6 },
        pin19: { marginTop: 0.6 },
        pin28: { marginTop: 1 },
        pin17: { marginTop: 1.4 },
        pin18: { marginTop: 1.4 },
        pin8: { marginTop: 1 },
        pin9: { marginTop: 0.6 },
        pin10: { marginTop: 0.6 },
        pin33: { marginTop: 0.6 },
        pin27: { marginTop: 0.2 },
      }}
      schWidth={6.8}
      schHeight={16}
      schX={0.4}
      schY={0.4}
    />
    <netlabel
      net="GND"
      connectsTo=".U1 > .pin27"
      schX={5.4}
      schY={-7.2}
      anchorSide="left"
    />
    <trace from=".C2 > .pin2" to=".C24 > .pin2" />
    <trace from=".C2 > .pin2" to=".C34 > .pin2" />
    <trace from=".C2 > .pin2" to=".C32 > .pin2" />
    <trace from=".C2 > .pin2" to=".R17 > .pin2" />
    <trace from=".C2 > .pin2" to=".C21 > .pin2" />
    <trace from=".C2 > .pin2" to=".C36 > .pin2" />
    <trace from=".C2 > .pin2" to=".C33 > .pin1" />
    <trace from=".C2 > .pin2" to=".C37 > .pin2" />
    <trace from=".C2 > .pin2" to=".C26 > .pin1" />
    <trace from=".C2 > .pin2" to=".C3 > .pin2" />
    <trace from=".C2 > .pin2" to=".C28 > .pin1" />
    <trace from=".C2 > .pin2" to=".C29 > .pin2" />
    <trace from=".C2 > .pin2" to=".U1 > .pin33" />
    <trace from=".C2 > .pin2" to=".U1 > .pin27" />
    <trace from=".C2 > .pin2" to=".U1 > .pin14" />
    <trace from=".C2 > .pin2" to=".C27 > .pin2" />
    <trace from=".C2 > .pin2" to=".C4 > .pin2" />
    <trace from=".C2 > .pin2" to=".C20 > .pin2" />
    <trace from=".C2 > .pin2" to=".C25 > .pin1" />
    <trace from=".C2 > .pin2" to=".Q3 > .source" />
    <trace from=".C2 > .pin2" to=".Q4 > .source" />
    <trace from=".C2 > .pin2" to=".P3 > .pin2" />
    <trace from=".C2 > .pin2" to=".C52 > .pin2" />
    <trace from=".C2 > .pin2" to=".C51 > .pin2" />
    <trace from=".C2 > .pin2" to=".C50 > .pin2" />
    <trace from=".C2 > .pin2" to=".C53 > .pin2" />
    <trace from=".C2 > .pin2" to=".C55 > .pin2" />
    <trace from=".C2 > .pin2" to=".C56 > .pin2" />
    <trace from=".C2 > .pin2" to=".C57 > .pin2" />
    <trace from=".C2 > .pin2" to=".C58 > .pin2" />
    <trace from=".C2 > .pin2" to=".C39 > .pin1" />
    <trace from=".C2 > .pin2" to=".C40 > .pin1" />
    <trace from=".C2 > .pin2" to=".C38 > .pin1" />
    <trace from=".C2 > .pin2" to=".R14 > .pin1" />
    <trace from=".C2 > .pin2" to=".R15 > .pin1" />
    <trace from=".C2 > .pin2" to=".R16 > .pin1" />
    <trace from=".C2 > .pin2" to=".C35 > .pin2" />
    <trace from=".C2 > .pin2" to=".C5 > .pin1" />
    <trace from=".C2 > .pin2" to=".C6 > .pin1" />
    <trace from=".C2 > .pin2" to=".C100 > .pin2" />
    <trace from=".C31 > .pin1" to=".R9 > .pin1" />
    <trace from=".C31 > .pin1" to=".C4 > .pin1" />
    <trace from=".C31 > .pin1" to=".C20 > .pin1" />
    <trace from=".C31 > .pin1" to=".R2 > .pin2" />
    <trace from=".R9 > .pin2" to=".U1 > .pin19" />
    <trace from=".R9 > .pin2" to=".C30 > .pin2" />
    <trace from=".R9 > .pin2" to=".C6 > .pin2" />
    <trace from=".R7 > .pin2" to=".U1 > .pin20" />
    <trace from=".R7 > .pin2" to=".C30 > .pin1" />
    <trace from=".R7 > .pin2" to=".C5 > .pin2" />
    <trace from=".U1 > .pin5" to=".R15 > .pin2" />
    <trace from=".U1 > .pin6" to=".C38 > .pin2" />
    <trace from=".U1 > .pin6" to=".R14 > .pin2" />
    <trace from=".U1 > .pin6" to=".R110 > .pin1" />
    <trace from=".R1 > .pin1" to=".R6 > .pin2" />
    <trace from=".R1 > .pin1" to=".R4 > .pin1" />
    <trace from=".R1 > .pin1" to=".R3 > .pin2" />
    <trace from=".R1 > .pin1" to=".C52 > .pin1" />
    <trace from=".R1 > .pin1" to=".C51 > .pin1" />
    <trace from=".R1 > .pin1" to=".C50 > .pin1" />
    <trace from=".R1 > .pin1" to=".C53 > .pin1" />
    <trace from=".R1 > .pin1" to=".C100 > .pin1" />
    <trace from=".C34 > .pin1" to=".R8 > .pin1" />
    <trace from=".C34 > .pin1" to=".U1 > .pin28" />
    <trace from=".C32 > .pin1" to=".R8 > .pin2" />
    <trace from=".C32 > .pin1" to=".U1 > .pin7" />
    <trace from=".C32 > .pin1" to=".P1 > .pin2" />
    <trace from=".C32 > .pin1" to=".R110 > .pin2" />
    <trace from=".C32 > .pin1" to=".R11 > .pin2" />
    <trace from=".C2 > .pin1" to=".R1 > .pin2" />
    <trace from=".C2 > .pin1" to=".R5 > .pin2" />
    <trace from=".C2 > .pin1" to=".C21 > .pin1" />
    <trace from=".C2 > .pin1" to=".Q1 > .drain" />
    <trace from=".C22 > .pin1" to=".U1 > .pin30" />
    <trace from=".C22 > .pin2" to=".U1 > .pin32" />
    <trace from=".C22 > .pin2" to=".Q1 > .source" />
    <trace from=".C22 > .pin2" to=".Q3 > .drain" />
    <trace from=".C22 > .pin2" to=".L1 > .pin1" />
    <trace from=".C23 > .pin1" to=".U1 > .pin25" />
    <trace from=".C23 > .pin2" to=".U1 > .pin23" />
    <trace from=".C23 > .pin2" to=".Q2 > .source" />
    <trace from=".C23 > .pin2" to=".Q4 > .drain" />
    <trace from=".C23 > .pin2" to=".L1 > .pin2" />
    <trace from=".C24 > .pin1" to=".R3 > .pin1" />
    <trace from=".C26 > .pin2" to=".U1 > .pin26" />
    <trace from=".C26 > .pin2" to=".Q4 > .gate" />
    <trace from=".C31 > .pin2" to=".R7 > .pin1" />
    <trace from=".C31 > .pin2" to=".C3 > .pin1" />
    <trace from=".C31 > .pin2" to=".U1 > .pin22" />
    <trace from=".C31 > .pin2" to=".Q2 > .drain" />
    <trace from=".C31 > .pin2" to=".C55 > .pin1" />
    <trace from=".C31 > .pin2" to=".C56 > .pin1" />
    <trace from=".C31 > .pin2" to=".C57 > .pin1" />
    <trace from=".C31 > .pin2" to=".C58 > .pin1" />
    <trace from=".C31 > .pin2" to=".R2 > .pin1" />
    <trace from=".C36 > .pin1" to=".R13 > .pin2" />
    <trace from=".C37 > .pin1" to=".U1 > .pin17" />
    <trace from=".C37 > .pin1" to=".R13 > .pin1" />
    <trace from=".P1 > .pin1" to=".R18 > .pin2" />
    <trace from=".R5 > .pin1" to=".C28 > .pin2" />
    <trace from=".R5 > .pin1" to=".U1 > .pin2" />
    <trace from=".R5 > .pin1" to=".C1 > .pin1" />
    <trace from=".R6 > .pin1" to=".C29 > .pin1" />
    <trace from=".R6 > .pin1" to=".U1 > .pin3" />
    <trace from=".R6 > .pin1" to=".C1 > .pin2" />
    <trace from=".R12 > .pin1" to=".C35 > .pin1" />
    <trace from=".R12 > .pin2" to=".C33 > .pin2" />
    <trace from=".R12 > .pin2" to=".U1 > .pin16" />
    <trace from=".R17 > .pin1" to=".U1 > .pin10" />
    <trace from=".R20 > .pin2" to=".P3 > .pin1" />
    <trace from=".U1 > .pin1" to=".R4 > .pin2" />
    <trace from=".U1 > .pin1" to=".C27 > .pin1" />
    <trace from=".U1 > .pin8" to=".C39 > .pin2" />
    <trace from=".U1 > .pin8" to=".R16 > .pin2" />
    <trace from=".U1 > .pin9" to=".C40 > .pin2" />
    <trace from=".U1 > .pin18" to=".R20 > .pin1" />
    <trace from=".U1 > .pin18" to=".R18 > .pin1" />
    <trace from=".U1 > .pin18" to=".R11 > .pin1" />
    <trace from=".U1 > .pin24" to=".Q2 > .gate" />
    <trace from=".U1 > .pin29" to=".C25 > .pin2" />
    <trace from=".U1 > .pin29" to=".Q3 > .gate" />
    <trace from=".U1 > .pin31" to=".Q1 > .gate" />
    <trace from=".C2 > .pin2" to="net.GND" />
    <trace from=".C31 > .pin1" to="net.BAT" />
    <trace from=".R1 > .pin1" to="net.PPHV" />
    <trace from=".C34 > .pin1" to="net.REGN" />
    <trace from=".C32 > .pin1" to="net.VDDA" />
    <trace from=".C2 > .pin1" to="net.NET_01" />
    <trace from=".C22 > .pin2" to="net.NET_03" />
    <trace from=".C23 > .pin2" to="net.NET_05" />
    <trace from=".C31 > .pin2" to="net.NET_08" />
  </subcircuit>
);

export default BatteryCharging_2to5CellNVDCBuckBoost_BQ25731;
