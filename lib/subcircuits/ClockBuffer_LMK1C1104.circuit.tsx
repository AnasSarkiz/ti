import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { LMK1C1104PWR } from "../chips/LMK1C1104PWR.circuit.tsx";

/**
 * Reusable 1:4 LVCMOS clock buffer core adapted from the LMK1C1104EVM.
 * Reference: https://www.ti.com/tool/LMK1C1104EVM
 */
export const ClockBuffer_LMK1C1104 = (props: SubcircuitProps) => (
  <subcircuit schMaxTraceDistance="12mm" autorouterEffortLevel="10x" {...props}>
    <net name="GND" isGroundNet />

    <LMK1C1104PWR
      name="U1"
      schX={0}
      schY={0}
      pcbX={0}
      pcbY={0}
      connections={{
        pin1: "R2.pin2",
        pin2: "net.OE",
        pin3: "R9.pin1",
        pin4: "net.GND",
        pin5: "R11.pin1",
        pin6: "net.VDD",
        pin7: "R27.pin1",
        pin8: "R25.pin1",
      }}
    />

    {/* The EVM biases CLKIN at half-supply through a 100-ohm/100-ohm
        Thevenin termination and feeds it through a zero-ohm link. */}
    <resistor
      name="R1"
      resistance="100ohm"
      tolerance="1%"
      footprint="0603"
      manufacturerPartNumber="CRCW0603100RFKEA"
      schX={-2.5}
      schY={2.2}
      schOrientation="vertical"
      pcbX={-2}
      pcbY={2.8}
      connections={{ pin1: "net.VDD", pin2: "R2.pin2" }}
    />
    <resistor
      name="R2"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      manufacturerPartNumber="RC0603JR-070RL"
      schX={-4.2}
      schY={0.5}
      pcbX={-4.3}
      pcbY={1.2}
      connections={{ pin1: "net.CLK_IN" }}
    />
    <resistor
      name="R3"
      resistance="100ohm"
      tolerance="1%"
      footprint="0603"
      manufacturerPartNumber="CRCW0603100RFKEA"
      schX={-2.5}
      schY={-1.8}
      schOrientation="vertical"
      pcbX={1.2}
      pcbY={2.8}
      connections={{ pin1: "R2.pin2", pin2: "net.GND" }}
    />

    {/* Local supply bypassing retained from the EVM power filter. */}
    <capacitor
      name="C2"
      capacitance="1uF"
      maxVoltageRating="10V"
      footprint="0603"
      manufacturerPartNumber="C0603X105J8RAC7867"
      schX={0.8}
      schY={3.1}
      schOrientation="vertical"
      pcbX={1.5}
      pcbY={-2.8}
      pcbRotation={90}
      connections={{ pin1: "net.VDD", pin2: "net.GND" }}
    />
    <capacitor
      name="C3"
      capacitance="0.1uF"
      maxVoltageRating="10V"
      footprint="0402"
      manufacturerPartNumber="C0402C104K8RACAUTO"
      schX={2.1}
      schY={3.1}
      schOrientation="vertical"
      pcbX={0}
      pcbY={-2.8}
      pcbRotation={90}
      connections={{ pin1: "net.VDD", pin2: "net.GND" }}
    />

    {/* One source-side zero-ohm option is retained on each clock output. */}
    <resistor
      name="R9"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      manufacturerPartNumber="RC0603JR-070RL"
      schX={3.6}
      schY={0.825}
      pcbX={4.3}
      pcbY={2.1}
      connections={{ pin2: "net.Y0" }}
    />
    <resistor
      name="R25"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      manufacturerPartNumber="RC0603JR-070RL"
      schX={3.6}
      schY={0.05}
      pcbX={4.3}
      pcbY={0.7}
      connections={{ pin2: "net.Y1" }}
    />
    <resistor
      name="R11"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      manufacturerPartNumber="RC0603JR-070RL"
      schX={3.6}
      schY={-0.7}
      pcbX={4.3}
      pcbY={-0.7}
      connections={{ pin2: "net.Y2" }}
    />
    <resistor
      name="R27"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      manufacturerPartNumber="RC0603JR-070RL"
      schX={3.6}
      schY={-1.45}
      pcbX={4.3}
      pcbY={-2.1}
      connections={{ pin2: "net.Y3" }}
    />
  </subcircuit>
);

export default ClockBuffer_LMK1C1104;
