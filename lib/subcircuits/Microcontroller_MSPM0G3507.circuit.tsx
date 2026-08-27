import type { SubcircuitProps } from "@tscircuit/props";
import { MSPM0G3507SPMR } from "../chips/MSPM0G3507SPMR.circuit.tsx";

export const Microcontroller_MSPM0G3507 = (props: SubcircuitProps) => (
  <subcircuit width={30} height={30} {...props}>
    <MSPM0G3507SPMR
      name="U1"
      schX={0}
      schY={0}
      pcbX={0}
      pcbY={0}
      connections={{
        VDD: "C2.pin1",
        VSS: "C2.pin2",
        NRST: "net.NRST",
        ROSC: "R2.pin1",
        PA0: "net.PA0",
        PA1: "net.PA1",
        SWDIO: "net.SWDIO",
        SWCLK: "net.SWCLK",
      }}
    />

    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0805"
      schOrientation="vertical"
      schX={-6.2}
      schY={4.4}
      pcbX={0}
      pcbY={9.5}
      pcbRotation={180}
      maxDecouplingTraceLength="6mm"
      connections={{ pin1: ["U1.VDD", "R1.pin2"], pin2: ["U1.VSS", "net.GND"] }}
    />
    <capacitor
      name="C2"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-5}
      schY={4.4}
      pcbX={0}
      pcbY={7.5}
      pcbRotation={180}
      maxDecouplingTraceLength="4mm"
      connections={{ pin1: "C1.pin1" }}
    />

    <capacitor
      name="C3"
      capacitance="0.47uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-4.5}
      schY={2.5}
      pcbX={8.5}
      pcbY={3.75}
      connections={{ pin1: "U1.VCORE", pin2: "net.GND" }}
    />

    <resistor
      name="R1"
      resistance="47k"
      footprint="0402"
      schRotation={90}
      schX={-6.2}
      schY={1.1}
      pcbX={3.5}
      pcbY={9.5}
      connections={{ pin1: "U1.NRST", pin2: "net.VDD" }}
    />
    <capacitor
      name="C4"
      capacitance="10nF"
      footprint="0402"
      schOrientation="vertical"
      schX={-6.2}
      schY={-0.8}
      pcbX={3.5}
      pcbY={11}
      connections={{ pin1: "R1.pin1", pin2: "net.GND" }}
    />

    <resistor
      name="R2"
      resistance="100k"
      footprint="0402"
      schX={4.5}
      schY={-2.4}
      pcbX={-3}
      pcbY={8}
      schRotation={270}
      connections={{ pin1: "U1.ROSC", pin2: "net.GND" }}
    />

    <resistor
      name="R3"
      resistance="4.7k"
      footprint="0402"
      schRotation={90}
      schX={6.4}
      schY={2.2}
      pcbX={4}
      pcbY={8}
      connections={{ pin1: "U1.PA1", pin2: "net.VDD" }}
    />
    <resistor
      name="R4"
      resistance="4.7k"
      footprint="0402"
      schRotation={90}
      schX={5.2}
      schY={1.4}
      pcbX={6.2}
      pcbY={8}
      connections={{ pin1: "U1.PA0", pin2: "net.VDD" }}
    />

    <pinheader
      name="J1"
      pinCount={2}
      gender="female"
      pitch="2.54mm"
      schPinStyle={{
        SWDIO: {
          marginTop: 0.1,
          marginBottom: 0.2,
        },
      }}
      schFacingDirection="left"
      schX={6}
      schY={-3.8}
      pcbX={-2}
      pcbY={-9.5}
      showSilkscreenPinLabels
      pinLabels={["SWDIO", "SWCLK"]}
      connections={{
        pin1: "U1.SWDIO",
        pin2: "U1.SWCLK",
      }}
    />
  </subcircuit>
);

export default Microcontroller_MSPM0G3507;
