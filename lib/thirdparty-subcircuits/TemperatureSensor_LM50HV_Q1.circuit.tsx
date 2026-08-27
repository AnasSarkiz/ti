import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { LM50HVQDBZRQ1 } from "../chips/LM50HVQDBZRQ1.circuit.tsx";

/**
 * Datasheet-derived LM50HV-Q1 remote temperature-sensor wiring circuit.
 *
 * The Rearview Mirror Module temperature-sensor block has no attached TI
 * reference design. This implementation therefore follows LM50-Q1/LM50HV-Q1
 * datasheet Figure 8-3 (filter for a noisy wiring environment).
 * Reference: https://www.ti.com/lit/ds/symlink/lm50-q1.pdf
 */
export const TemperatureSensor_LM50HV_Q1 = (props: SubcircuitProps) => (
  <subcircuit schMaxTraceDistance="4mm" {...props}>
    <net name="VS" isPowerNet />
    <net name="TEMP_SENSE" />
    <net name="GND" isGroundNet />

    <capacitor
      name="C_BYPASS"
      capacitance="0.1uF"
      maxVoltageRating="50V"
      footprint="0603"
      schX={-3.5}
      schY={0}
      schOrientation="vertical"
      connections={{ pin1: "net.VS", pin2: "net.GND" }}
    />

    <LM50HVQDBZRQ1
      name="U1"
      schX={0}
      schY={0}
      connections={{
        VS: "net.VS",
        VO: "net.TEMP_SENSE",
        GND: "net.GND",
      }}
    />

    <capacitor
      name="C_LOAD"
      capacitance="1uF"
      maxVoltageRating="50V"
      footprint="0603"
      schX={3.5}
      schY={-1.25}
      schOrientation="vertical"
      connections={{ pin1: "net.TEMP_SENSE", pin2: "net.GND" }}
    />
  </subcircuit>
);

export default TemperatureSensor_LM50HV_Q1;
