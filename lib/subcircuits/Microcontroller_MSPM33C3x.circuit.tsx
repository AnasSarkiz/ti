import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { MSPM33C3x } from "../chips/MSPM33C3x.circuit.tsx";

export const Microcontroller_MSPM33C3x = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <MSPM33C3x
      name="U1"
      pcbX={0}
      pcbY={0}
      schX={0}
      schY={0}
      connections={{
        VDD: "net.V3_3",
        NRST: "net.NRST",
        SWDIO: "net.SWDIO",
        SWCLK: "net.SWCLK",
      }}
    />

    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0603"
      pcbX={-5}
      pcbY={1}
      schX={-5.5}
      schY={1.0}
      schOrientation="vertical"
      connections={{
        pin1: "net.V3_3",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C2"
      capacitance="100nF"
      footprint="0402"
      pcbX={-5}
      pcbY={-1}
      schX={-3.9}
      schY={1.0}
      schOrientation="vertical"
      connections={{
        pin1: "net.V3_3",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C3"
      capacitance="2.2uF"
      footprint="0603"
      pcbX={-3}
      pcbY={5}
      schX={-2.7}
      schY={-0.3}
      schOrientation="vertical"
      connections={{
        pin1: "U1.VCORE",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R1"
      resistance="47k"
      footprint="0402"
      pcbX={-5}
      pcbY={3}
      schX={-6.3}
      schY={0.0}
      schOrientation="vertical"
      connections={{
        pin1: "net.V3_3",
        pin2: "net.NRST",
      }}
    />

    <capacitor
      name="C4"
      capacitance="10nF"
      footprint="0402"
      pcbX={-7}
      pcbY={3}
      schX={-6.3}
      schY={-3}
      schOrientation="vertical"
      connections={{
        pin1: "net.NRST",
        pin2: "net.GND",
      }}
    />
    <trace name="route_vss_to_ground" from="U1.VSS" to="C2.pin2" />
  </subcircuit>
);

export default Microcontroller_MSPM33C3x;
