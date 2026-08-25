import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TLV9152IDR } from "../chips/TLV9152IDR.circuit.tsx";
import { TPS61288RQQR } from "../chips/TPS61288RQQR.circuit.tsx";

export const USBC_PowerDeliveryProgrammablePowerSupply_TPS61288 = (
  props: SubcircuitProps,
) => (
  <subcircuit routingDisabled {...props}>
    <net name="GND" isGroundNet />
    <capacitor
      name="C29"
      capacitance="1uF"
      schX={-6.2}
      schY={-1.1}
      schRotation={270}
    />
    <capacitor
      name="C10"
      capacitance="1uF"
      schX={-10.6}
      schY={6.57}
      schRotation={270}
    />
    <capacitor
      name="C11"
      capacitance="1uF"
      schX={-9.8}
      schY={6.5}
      schRotation={270}
    />
    <capacitor
      name="C2"
      capacitance="1uF"
      schX={-6.4}
      schY={8.9}
      schRotation={270}
    />
    <capacitor
      name="C13"
      capacitance="1uF"
      schX={-6.2}
      schY={6.1}
      schRotation={270}
    />
    <capacitor
      name="C9"
      capacitance="1uF"
      schX={-4.5}
      schY={6.8}
      schRotation={0}
    />
    <capacitor
      name="C14"
      capacitance="1uF"
      schX={-4.4}
      schY={5.5}
      schRotation={90}
    />
    <capacitor
      name="C1"
      capacitance="1uF"
      schX={0.6}
      schY={8.9}
      schRotation={270}
    />
    <capacitor
      name="C3"
      capacitance="1uF"
      schX={4.2}
      schY={8.3}
      schRotation={270}
    />
    <capacitor
      name="C4"
      capacitance="1uF"
      schX={4.8}
      schY={8.3}
      schRotation={270}
    />
    <capacitor
      name="C5"
      capacitance="1uF"
      schX={5.6}
      schY={8.3}
      schRotation={270}
    />
    <capacitor
      name="C6"
      capacitance="1uF"
      schX={6.4}
      schY={8.3}
      schRotation={270}
    />
    <capacitor
      name="C7"
      capacitance="1uF"
      schX={7}
      schY={8.3}
      schRotation={270}
    />
    <capacitor
      name="C8"
      capacitance="1uF"
      schX={7.8}
      schY={8.3}
      schRotation={270}
    />
    <capacitor
      name="C26"
      capacitance="1uF"
      schX={-10.6}
      schY={-0.63}
      schRotation={270}
    />
    <capacitor
      name="C27"
      capacitance="1uF"
      schX={-9.8}
      schY={-0.7}
      schRotation={270}
    />
    <capacitor
      name="C22"
      capacitance="1uF"
      schX={-5}
      schY={2.3}
      schRotation={270}
    />
    <capacitor
      name="C25"
      capacitance="1uF"
      schX={-4.5}
      schY={-0.4}
      schRotation={0}
    />
    <capacitor
      name="C31"
      capacitance="1uF"
      schX={-4.4}
      schY={-1.7}
      schRotation={90}
    />
    <capacitor
      name="C23"
      capacitance="1uF"
      schX={0.6}
      schY={1.7}
      schRotation={270}
    />
    <capacitor
      name="C16"
      capacitance="1uF"
      schX={4.2}
      schY={1.5}
      schRotation={90}
    />
    <capacitor
      name="C17"
      capacitance="1uF"
      schX={5}
      schY={1.5}
      schRotation={90}
    />
    <capacitor
      name="C18"
      capacitance="1uF"
      schX={5.8}
      schY={1.5}
      schRotation={90}
    />
    <capacitor
      name="C19"
      capacitance="1uF"
      schX={6.6}
      schY={1.5}
      schRotation={90}
    />
    <capacitor
      name="C20"
      capacitance="1uF"
      schX={7.4}
      schY={1.5}
      schRotation={90}
    />
    <capacitor
      name="C21"
      capacitance="1uF"
      schX={8.2}
      schY={1.5}
      schRotation={90}
    />
    <capacitor
      name="C24"
      capacitance="1uF"
      schX={-1.1}
      schY={-8.4}
      schRotation={180}
    />
    <capacitor
      name="C32"
      capacitance="1uF"
      schX={9.2}
      schY={8.5}
      schRotation={270}
    />
    <capacitor
      name="C33"
      capacitance="1uF"
      schX={9.6}
      schY={1.5}
      schRotation={270}
    />
    <capacitor
      name="C12"
      capacitance="1uF"
      schX={1.8}
      schY={6.1}
      schRotation={270}
    />
    <capacitor
      name="C28"
      capacitance="1uF"
      schX={1.8}
      schY={-1.1}
      schRotation={270}
    />
    <capacitor
      name="C15"
      capacitance="1uF"
      schX={0.6}
      schY={5.7}
      schRotation={270}
    />
    <capacitor
      name="C30"
      capacitance="1uF"
      schX={0.6}
      schY={-1.5}
      schRotation={270}
    />
    <resistor
      name="R12"
      resistance="1k"
      schX={-6.2}
      schY={-0.4}
      schRotation={270}
    />
    <resistor
      name="R4"
      resistance="1k"
      schX={-6.2}
      schY={6.8}
      schRotation={270}
    />
    <resistor
      name="R2"
      resistance="1k"
      schX={3.4}
      schY={9.2}
      schRotation={90}
    />
    <resistor
      name="R5"
      resistance="1k"
      schX={3.4}
      schY={6.6}
      schRotation={270}
    />
    <resistor name="R1" resistance="1k" schX={8.8} schY={9.6} schRotation={0} />
    <resistor name="R8" resistance="1k" schX={3.4} schY={2} schRotation={270} />
    <resistor
      name="R14"
      resistance="1k"
      schX={3.4}
      schY={-0.6}
      schRotation={270}
    />
    <resistor name="R7" resistance="1k" schX={9.2} schY={2.6} schRotation={0} />
    <resistor
      name="R17"
      resistance="1k"
      schX={6.2}
      schY={5.5}
      schRotation={180}
    />
    <resistor
      name="R18"
      resistance="1k"
      schX={6.2}
      schY={4.4}
      schRotation={180}
    />
    <resistor
      name="R9"
      resistance="1k"
      schX={0.4}
      schY={-8.4}
      schRotation={0}
    />
    <resistor
      name="R10"
      resistance="1k"
      schX={2.4}
      schY={-6.6}
      schRotation={0}
    />
    <resistor
      name="R15"
      resistance="1k"
      schX={-2.6}
      schY={-7}
      schRotation={0}
    />
    <resistor
      name="R16"
      resistance="1k"
      schX={-2.6}
      schY={-6.2}
      schRotation={0}
    />
    <resistor
      name="ATOG2"
      resistance="1k"
      schX={-3.8}
      schY={-2.6}
      schRotation={180}
    />
    <resistor
      name="ATOG1"
      resistance="1k"
      schX={-3.8}
      schY={4.6}
      schRotation={180}
    />
    <resistor
      name="R6"
      resistance="1k"
      schX={0.6}
      schY={6.4}
      schRotation={90}
    />
    <resistor
      name="R13"
      resistance="1k"
      schX={0.6}
      schY={-0.8}
      schRotation={90}
    />
    <resistor
      name="R3"
      resistance="1k"
      schX={3.4}
      schY={7.8}
      schRotation={90}
    />
    <resistor
      name="R11"
      resistance="1k"
      schX={3.4}
      schY={0.6}
      schRotation={90}
    />
    <inductor
      name="L1"
      inductance="1uH"
      schX={-7.4}
      schY={7.64}
      schRotation={0}
    />
    <inductor
      name="L2"
      inductance="1uH"
      schX={-7.4}
      schY={0.44}
      schRotation={0}
    />

    <testpoint name="TP_SW1" schX={-6.2} schY={7.88} />
    <testpoint name="TP_SW2" schX={-6.2} schY={0.68} />

    <TPS61288RQQR
      name="U1"
      schX={-2.4}
      schY={7}
      schWidth={2}
      schHeight={2.4}
      schPinArrangement={{
        leftSide: { pins: [7, 4, 9, 8, 6, 11], direction: "top-to-bottom" },
        rightSide: { pins: [5, 1, 2, 10, 3], direction: "top-to-bottom" },
      }}
      schPinStyle={{
        pin4: { marginTop: 0.2 },
        pin8: { marginTop: 0.2 },
        pin6: { marginTop: 0.2 },
        pin11: { marginTop: 0.2 },
        pin1: { marginTop: 0.2 },
        pin2: { marginTop: 0.2 },
        pin10: { marginTop: 0.6 },
      }}
    />
    <TPS61288RQQR
      name="U2"
      schX={-2.4}
      schY={-0.2}
      schWidth={2}
      schHeight={2.4}
      schPinArrangement={{
        leftSide: { pins: [7, 4, 9, 8, 6, 11], direction: "top-to-bottom" },
        rightSide: { pins: [5, 1, 2, 10, 3], direction: "top-to-bottom" },
      }}
      schPinStyle={{
        pin4: { marginTop: 0.2 },
        pin8: { marginTop: 0.2 },
        pin6: { marginTop: 0.2 },
        pin11: { marginTop: 0.2 },
        pin1: { marginTop: 0.2 },
        pin2: { marginTop: 0.2 },
        pin10: { marginTop: 0.6 },
      }}
    />
    <chip
      name="JOUT_P1"
      manufacturerPartNumber="691214110002"
      pinLabels={{ pin1: "1", pin2: "2" }}
      schPinArrangement={
        { leftSide: { pins: [1, 2], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.5}
      schHeight={0.6}
      schX={10.8}
      schY={8.1}
    />
    <chip
      name="J1"
      manufacturerPartNumber="108-0740-001"
      pinLabels={{ pin1: "1" }}
      schPinArrangement={
        { rightSide: { pins: [1], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.3}
      schHeight={0.3}
      schX={-13.4}
      schY={7.4}
    />
    <chip
      name="J2"
      manufacturerPartNumber="108-0740-001"
      pinLabels={{ pin1: "1" }}
      schPinArrangement={
        { rightSide: { pins: [1], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.3}
      schHeight={0.3}
      schX={-13.4}
      schY={5.6}
    />
    <chip
      name="J3"
      manufacturerPartNumber="5003"
      pinLabels={{ pin1: "1" }}
      schPinArrangement={
        { rightSide: { pins: [1], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.3}
      schHeight={0.3}
      schX={-13.48}
      schY={-1.6}
    />
    <chip
      name="J4"
      manufacturerPartNumber="5003"
      pinLabels={{ pin1: "1" }}
      schPinArrangement={
        { rightSide: { pins: [1], direction: "top-to-bottom" } } as any
      }
      schPinStyle={{}}
      schWidth={0.3}
      schHeight={0.3}
      schX={-13.48}
      schY={-2.4}
    />
    <TLV9152IDR name="U3A" schX={0.2} schY={-6.6} />
    <trace from=".C29 > .pin1" to=".R12 > .pin2" />
    <trace from=".C29 > .pin2" to=".C10 > .pin2" />
    <trace from=".C29 > .pin2" to=".C11 > .pin2" />
    <trace from=".C29 > .pin2" to=".C2 > .pin1" />
    <trace from=".C29 > .pin2" to=".C13 > .pin2" />
    <trace from=".C29 > .pin2" to=".U1 > .pin3" />
    <trace from=".C29 > .pin2" to=".C1 > .pin2" />
    <trace from=".C29 > .pin2" to=".C3 > .pin2" />
    <trace from=".C29 > .pin2" to=".C4 > .pin2" />
    <trace from=".C29 > .pin2" to=".C5 > .pin2" />
    <trace from=".C29 > .pin2" to=".C6 > .pin2" />
    <trace from=".C29 > .pin2" to=".C7 > .pin2" />
    <trace from=".C29 > .pin2" to=".C8 > .pin2" />
    <trace from=".C29 > .pin2" to=".C26 > .pin2" />
    <trace from=".C29 > .pin2" to=".C27 > .pin2" />
    <trace from=".C29 > .pin2" to=".C22 > .pin1" />
    <trace from=".C29 > .pin2" to=".U2 > .pin3" />
    <trace from=".C29 > .pin2" to=".C23 > .pin2" />
    <trace from=".C29 > .pin2" to=".C16 > .pin1" />
    <trace from=".C29 > .pin2" to=".C17 > .pin1" />
    <trace from=".C29 > .pin2" to=".C18 > .pin1" />
    <trace from=".C29 > .pin2" to=".C19 > .pin1" />
    <trace from=".C29 > .pin2" to=".C20 > .pin1" />
    <trace from=".C29 > .pin2" to=".C21 > .pin1" />
    <trace from=".C29 > .pin2" to=".ATOG2 > .pin1" />
    <trace from=".C29 > .pin2" to=".U3A > .negative_supply" />
    <trace from=".C29 > .pin2" to=".JOUT_P1 > .pin2" />
    <trace from=".C29 > .pin2" to=".ATOG1 > .pin1" />
    <trace from=".C29 > .pin2" to=".J2 > .pin1" />
    <trace from=".C29 > .pin2" to=".J3 > .pin1" />
    <trace from=".C29 > .pin2" to=".J4 > .pin1" />
    <trace from=".C29 > .pin2" to=".C32 > .pin2" />
    <trace from=".C29 > .pin2" to=".C33 > .pin2" />
    <trace from=".R12 > .pin1" to=".L2 > .pin2" />
    <trace from=".R12 > .pin1" to=".TP_SW2 > .pin1" />
    <trace from=".R12 > .pin1" to=".C25 > .pin1" />
    <trace from=".R12 > .pin1" to=".U2 > .pin4" />
    <trace from=".R12 > .pin1" to=".U2 > .pin9" />
    <trace from=".C10 > .pin1" to=".C11 > .pin1" />
    <trace from=".C10 > .pin1" to=".L1 > .pin1" />
    <trace from=".C10 > .pin1" to=".C2 > .pin2" />
    <trace from=".C10 > .pin1" to=".U1 > .pin7" />
    <trace from=".C10 > .pin1" to=".C26 > .pin1" />
    <trace from=".C10 > .pin1" to=".C27 > .pin1" />
    <trace from=".C10 > .pin1" to=".L2 > .pin1" />
    <trace from=".C10 > .pin1" to=".C22 > .pin2" />
    <trace from=".C10 > .pin1" to=".U2 > .pin7" />
    <trace from=".C10 > .pin1" to=".J1 > .pin1" />
    <trace from=".L1 > .pin2" to=".R4 > .pin1" />
    <trace from=".L1 > .pin2" to=".TP_SW1 > .pin1" />
    <trace from=".L1 > .pin2" to=".C9 > .pin1" />
    <trace from=".L1 > .pin2" to=".U1 > .pin4" />
    <trace from=".L1 > .pin2" to=".U1 > .pin9" />
    <trace from=".R4 > .pin2" to=".C13 > .pin1" />
    <trace from=".C9 > .pin2" to=".U1 > .pin8" />
    <trace from=".C14 > .pin1" to=".U1 > .pin10" />
    <trace from=".C14 > .pin1" to=".R5 > .pin2" />
    <trace from=".C14 > .pin1" to=".ATOG1 > .pin2" />
    <trace from=".C14 > .pin1" to=".C12 > .pin2" />
    <trace from=".C14 > .pin1" to=".C15 > .pin2" />
    <trace from=".C14 > .pin2" to=".U1 > .pin11" />
    <trace from=".C14 > .pin2" to=".U1 > .pin6" />
    <trace from=".U1 > .pin2" to=".R18 > .pin2" />
    <trace from=".U1 > .pin2" to=".C12 > .pin1" />
    <trace from=".U1 > .pin2" to=".R6 > .pin2" />
    <trace from=".U1 > .pin1" to=".R5 > .pin1" />
    <trace from=".U1 > .pin1" to=".R17 > .pin2" />
    <trace from=".U1 > .pin1" to=".R3 > .pin1" />
    <trace from=".U1 > .pin5" to=".C1 > .pin1" />
    <trace from=".U1 > .pin5" to=".R2 > .pin2" />
    <trace from=".U1 > .pin5" to=".C3 > .pin1" />
    <trace from=".U1 > .pin5" to=".C4 > .pin1" />
    <trace from=".U1 > .pin5" to=".C5 > .pin1" />
    <trace from=".U1 > .pin5" to=".C6 > .pin1" />
    <trace from=".U1 > .pin5" to=".C7 > .pin1" />
    <trace from=".U1 > .pin5" to=".C8 > .pin1" />
    <trace from=".U1 > .pin5" to=".R1 > .pin1" />
    <trace from=".U1 > .pin5" to=".R15 > .pin1" />
    <trace from=".U1 > .pin5" to=".U3A > .positive_supply" />
    <trace from=".R2 > .pin1" to=".R3 > .pin2" />
    <trace from=".R1 > .pin2" to=".R7 > .pin2" />
    <trace from=".R1 > .pin2" to=".JOUT_P1 > .pin1" />
    <trace from=".R1 > .pin2" to=".C32 > .pin1" />
    <trace from=".R1 > .pin2" to=".C33 > .pin1" />
    <trace from=".C25 > .pin2" to=".U2 > .pin8" />
    <trace from=".C31 > .pin1" to=".U2 > .pin10" />
    <trace from=".C31 > .pin1" to=".R14 > .pin2" />
    <trace from=".C31 > .pin1" to=".ATOG2 > .pin2" />
    <trace from=".C31 > .pin1" to=".C28 > .pin2" />
    <trace from=".C31 > .pin1" to=".C30 > .pin2" />
    <trace from=".C31 > .pin2" to=".U2 > .pin11" />
    <trace from=".C31 > .pin2" to=".U2 > .pin6" />
    <trace from=".U2 > .pin2" to=".R18 > .pin1" />
    <trace from=".U2 > .pin2" to=".C28 > .pin1" />
    <trace from=".U2 > .pin2" to=".R13 > .pin2" />
    <trace from=".U2 > .pin1" to=".R14 > .pin1" />
    <trace from=".U2 > .pin1" to=".R17 > .pin1" />
    <trace from=".U2 > .pin1" to=".R10 > .pin2" />
    <trace from=".U2 > .pin1" to=".R11 > .pin1" />
    <trace from=".U2 > .pin5" to=".C23 > .pin1" />
    <trace from=".U2 > .pin5" to=".R8 > .pin1" />
    <trace from=".U2 > .pin5" to=".C16 > .pin2" />
    <trace from=".U2 > .pin5" to=".C17 > .pin2" />
    <trace from=".U2 > .pin5" to=".C18 > .pin2" />
    <trace from=".U2 > .pin5" to=".C19 > .pin2" />
    <trace from=".U2 > .pin5" to=".C20 > .pin2" />
    <trace from=".U2 > .pin5" to=".C21 > .pin2" />
    <trace from=".U2 > .pin5" to=".R7 > .pin1" />
    <trace from=".U2 > .pin5" to=".R16 > .pin1" />
    <trace from=".R8 > .pin2" to=".R11 > .pin2" />
    <trace from=".R9 > .pin2" to=".R10 > .pin1" />
    <trace from=".R9 > .pin2" to=".U3A > .output" />
    <trace from=".R9 > .pin1" to=".C24 > .pin1" />
    <trace from=".C24 > .pin2" to=".R15 > .pin2" />
    <trace from=".C24 > .pin2" to=".U3A > .inverting_input" />
    <trace from=".R16 > .pin2" to=".U3A > .non_inverting_input" />
    <trace from=".C15 > .pin1" to=".R6 > .pin1" />
    <trace from=".C30 > .pin1" to=".R13 > .pin1" />
    <trace from=".C29 > .pin2" to="net.GND" />
  </subcircuit>
);

export default USBC_PowerDeliveryProgrammablePowerSupply_TPS61288;
