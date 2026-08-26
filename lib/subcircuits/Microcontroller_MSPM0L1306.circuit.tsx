import type { SubcircuitProps } from "@tscircuit/props";
import { MSPM0L1306SRHBR } from "../../imports/MSPM0L1306SRHBR.tsx";

/**
 * TI MSPM0L1306 basic application circuit from datasheet Figure 9-1.
 *
 * VDD supports 1.62 V to 3.6 V. VPU is a separate 1.62 V to 5.5 V rail for
 * the PA0 and PA1 open-drain pull-ups. R2 is only required when SYSOSC FCL is
 * enabled; otherwise PA2 remains available as GPIO.
 */
export const Microcontroller_MSPM0L1306 = (props: SubcircuitProps) => (
  <subcircuit width={40} height={30} schMaxTraceDistance="6mm" {...props}>
    <MSPM0L1306SRHBR
      name="U1"
      schX={0}
      schY={0}
      pcbX={0}
      pcbY={0}
      connections={{
        VSS_PAD: "net.GND",
      }}
    />

    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0805"
      schOrientation="vertical"
      schX={-4.5}
      schY={1.3}
      pcbX={-4.4}
      pcbY={1.5}
      connections={{
        pin1: ["U1.VDD", "C2.pin1", "net.VDD"],
        pin2: ["U1.VSS", "C2.pin2", "net.GND"],
      }}
    />
    <capacitor
      name="C2"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-3.5}
      schY={1.3}
      pcbX={-4.4}
      pcbY={0}
    />

    <capacitor
      name="C3"
      capacitance="0.47uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-3.5}
      schY={-0.6}
      pcbX={-4.4}
      pcbY={-1.5}
      connections={{ pin1: "U1.VCORE", pin2: "net.GND" }}
    />

    <resistor
      name="R1"
      resistance="47k"
      footprint="0402"
      schRotation={90}
      schX={-5.5}
      schY={0.1}
      pcbX={-4.4}
      pcbY={3}
      connections={{
        pin1: ["U1.NRST", "C4.pin1", "net.NRST"],
        pin2: "net.VDD",
      }}
    />
    <capacitor
      name="C4"
      capacitance="10nF"
      footprint="0402"
      schOrientation="vertical"
      schX={-5.5}
      schY={-2.05}
      pcbX={-4.4}
      pcbY={4.5}
      connections={{ pin2: "net.GND" }}
    />

    <resistor
      name="R2"
      resistance="100k"
      footprint="0402"
      schX={4}
      schY={2.05}
      pcbX={4.4}
      pcbY={1.5}
      schRotation={0}
      connections={{ pin1: "U1.ROSC" }}
    />
    <netlabel
      net="GND"
      connectsTo="R2.pin2"
      schX={4.8}
      schY={1.55}
      anchorSide="top"
    />

    <resistor
      name="R3"
      resistance="4.7k"
      footprint="0402"
      schRotation={90}
      schX={7.2}
      schY={0.6}
      pcbX={4.4}
      pcbY={4.5}
      connections={{ pin1: ["U1.PA1", "net.PA1"], pin2: "R4.pin2" }}
    />
    <resistor
      name="R4"
      resistance="4.7k"
      footprint="0402"
      schRotation={90}
      schX={6.2}
      schY={0.6}
      pcbX={4.4}
      pcbY={3}
      connections={{ pin1: ["U1.PA0", "net.PA0"], pin2: "net.VPU" }}
    />

    <connector
      name="J1"
      footprint="pinrow2_p2.54_female"
      schX={5}
      schY={-2.2}
      pcbX={9}
      pcbY={0}
      pinLabels={{ pin1: ["SWDIO"], pin2: ["SWCLK"] }}
      schWidth={1.6}
      schHeight={1.1}
      // Add 0.3 mm to the default 0.2 mm pitch to match U1's SWD pins.
      schPinStyle={{ pin2: { marginTop: 0.3 } }}
      schPinArrangement={{
        leftSide: { pins: ["pin1", "pin2"], direction: "top-to-bottom" },
      }}
      connections={{
        pin1: "U1.SWDIO",
        pin2: "U1.SWCLK",
      }}
    />
  </subcircuit>
);

export default Microcontroller_MSPM0L1306;
