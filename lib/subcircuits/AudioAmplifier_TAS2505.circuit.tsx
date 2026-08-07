import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TAS2505 } from "../chips/TAS2505.circuit.tsx";

/** TAS2505 typical application with host, analog, speaker and headphone I/O. */
export const AudioAmplifier_TAS2505 = (props: SubcircuitProps) => (
  <subcircuit schMaxTraceDistance="12mm" {...props}>
    <TAS2505
      name="U1"
      schX={0}
      schY={0}
      pcbX={0}
      pcbY={0}
      connections={{
        pin1: "net.GND",
        pin2: "net.nRST",
        pin3: "C5.pin2",
        pin4: "C6.pin2",
        pin5: "C11.pin1",
        pin6: "net.GND",
        pin7: "net.V1_8A",
        pin8: "net.GND",
        pin9: "J_SPK.pin2",
        pin10: "net.SVDD",
        pin11: "net.GND",
        pin12: "J_SPK.pin1",
        pin13: "net.DIN",
        pin14: "net.WCLK",
        pin15: "net.BCLK",
        pin16: "net.MCLK",
        pin18: "net.GPIO_DOUT",
        pin19: "net.SCL_SSZ",
        pin21: "net.GND",
        pin24: "net.GND",
      }}
      noConnect={["pin17", "pin25"]}
    />

    {/* Thermal-pad via: overlapping copper ties the exposed pad into GND while
        giving the router a legal escape onto the bottom layer. */}
    <via
      name="V_EP_GND"
      pcbX={0}
      pcbY={0}
      outerDiameter="0.6mm"
      holeDiameter="0.3mm"
      connectsTo="net.GND"
    />
    <trace from="U1.pin20" to="R1.pin2" pcbStraightLine />
    <trace from="U1.pin22" to="C9.pin1" pcbStraightLine />
    <trace from="U1.pin23" to="C7.pin1" pcbStraightLine />

    <schematictext schX={0} schY={0} text="TAS2505" fontSize={0.65} />

    {/* Host processor interface I2C pull-ups */}
    <resistor
      name="R1"
      resistance="2.7k"
      footprint="0402"
      schX={-7.4}
      schY={6.3}
      schOrientation="vertical"
      connections={{ pin1: "R2.pin1", pin2: "net.SDA_MOSI" }}
    />

    <resistor
      name="R2"
      resistance="2.7k"
      footprint="0402"
      schX={-5.9}
      schY={6.3}
      schOrientation="vertical"
      connections={{ pin2: "net.SCL_SSZ" }}
    />

    {/* Analog supply decoupling */}
    <capacitor
      name="C1"
      capacitance="22uF"
      footprint="1206"
      schX={-3.1}
      schY={6.5}
      schOrientation="vertical"
      connections={{ pin1: "net.V1_8A", pin2: "net.GND" }}
    />

    <capacitor
      name="C2"
      capacitance="0.1uF"
      footprint="0402"
      schX={-1.7}
      schY={6.5}
      schOrientation="vertical"
      connections={{ pin1: "net.V1_8A", pin2: "net.GND" }}
    />

    {/* Speaker supply decoupling */}
    <capacitor
      name="C3"
      capacitance="0.1uF"
      footprint="0402"
      schX={2}
      schY={6.5}
      schOrientation="vertical"
      connections={{ pin1: "net.SVDD", pin2: "net.GND" }}
    />

    <capacitor
      name="C4"
      capacitance="22uF"
      footprint="1206"
      schX={3.4}
      schY={6.5}
      schOrientation="vertical"
      connections={{ pin1: "net.SVDD", pin2: "net.GND" }}
    />

    {/* AC-coupled stereo analog input */}
    <pinheader
      name="J_AIN"
      displayName="ANALOG INPUT"
      pinCount={2}
      gender="female"
      pitch="2.54mm"
      schFacingDirection="right"
      schX={-10.7}
      schY={-3.5}
      pinLabels={["AINL", "AINR"]}
    />

    <capacitor
      name="C5"
      capacitance="0.1uF"
      footprint="0402"
      schX={-7.2}
      schY={-2.9}
      connections={{ pin1: "J_AIN.pin1" }}
    />

    <capacitor
      name="C6"
      capacitance="0.1uF"
      footprint="0402"
      schX={-7.2}
      schY={-4.1}
      connections={{ pin1: "J_AIN.pin2" }}
    />

    {/* Digital core and I/O supply decoupling */}
    <capacitor
      name="C7"
      capacitance="0.1uF"
      footprint="0402"
      schX={-2.5}
      schY={-6.7}
      schOrientation="vertical"
      connections={{ pin1: "net.V1_8D", pin2: "net.GND" }}
    />

    <capacitor
      name="C8"
      capacitance="10uF"
      footprint="0805"
      schX={-1}
      schY={-6.7}
      schOrientation="vertical"
      connections={{ pin1: "net.V1_8D", pin2: "net.GND" }}
    />

    <capacitor
      name="C9"
      capacitance="0.1uF"
      footprint="0402"
      schX={1.3}
      schY={-6.7}
      schOrientation="vertical"
      connections={{ pin1: "net.IOVDD", pin2: "net.GND" }}
    />

    <capacitor
      name="C10"
      capacitance="10uF"
      footprint="0805"
      schX={2.8}
      schY={-6.7}
      schOrientation="vertical"
      connections={{ pin1: "net.IOVDD", pin2: "net.GND" }}
    />

    {/* Differential speaker output */}
    <pinheader
      name="J_SPK"
      displayName="Speaker"
      pinCount={2}
      gender="female"
      pitch="2.54mm"
      schFacingDirection="left"
      schX={7.3}
      schY={1.8}
      pinLabels={["SPKP", "SPKM"]}
    />

    {/* AC-coupled mono headphone output */}
    <capacitor
      name="C11"
      capacitance="47uF"
      footprint="1206"
      schX={5}
      schY={-1.9}
      connections={{ pin2: "J_HP.pin1" }}
    />

    <pinheader
      name="J_HP"
      displayName="headphone Jack"
      pinCount={2}
      gender="female"
      pitch="2.54mm"
      schFacingDirection="left"
      schX={7.3}
      schY={-2}
      pinLabels={["HPOUT", "GND"]}
      connections={{ pin2: "net.GND" }}
    />
  </subcircuit>
);

export default AudioAmplifier_TAS2505;
