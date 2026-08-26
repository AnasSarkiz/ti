import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { DAC101C081QISD_NOPB } from "../chips/DAC101C081QISD_NOPB.circuit.tsx";
import { TLV316QDBVTQ1 } from "../chips/TLV316QDBVTQ1.circuit.tsx";

/**
 * DAC and electrochromic-mirror driver topology from TIDA-01539 sheet 2.
 * Native tscircuit symbols and connection-based routing keep the schematic
 * readable while retaining the reference design's parts and nets.
 * Reference: https://www.ti.com/tool/TIDA-01539
 */
export const ElectrochromicMirrorDriver_TIDA01539 = (
  props: SubcircuitProps,
) => (
  <subcircuit routingDisabled schMaxTraceDistance="8mm" {...props}>
    <net name="GND" isGroundNet />

    <DAC101C081QISD_NOPB
      name="U1"
      schX={-8.5}
      schY={0}
      connections={{
        ADDR0: "net.V3P3",
        SCL: "net.SCL",
        SDA: "net.SDA",
        GND: "net.GND",
        VA: "net.V3P3",
        VOUT: "net.DACOUT",
      }}
    />
    <capacitor
      name="C3"
      capacitance="0.1uF"
      maxVoltageRating="16V"
      footprint="0603"
      schX={-5.8}
      schY={-0.5}
      schOrientation="vertical"
      connections={{ pin1: "net.V3P3", pin2: "net.GND" }}
    />
    <capacitor
      name="C4"
      capacitance="4.7uF"
      maxVoltageRating="16V"
      footprint="0603"
      schX={-4.5}
      schY={-0.5}
      schOrientation="vertical"
      connections={{ pin1: "net.V3P3", pin2: "net.GND" }}
    />

    <resistor
      name="R3"
      resistance="499ohm"
      tolerance="1%"
      footprint="0603"
      schX={-2.8}
      schY={1}
      schOrientation="vertical"
      connections={{ pin2: "C6.pin1", pin1: "U2.inverting_input" }}
    />
    <capacitor
      name="C6"
      capacitance="4700pF"
      maxVoltageRating="50V"
      footprint="0603"
      schX={-2.8}
      schY={-0.8}
      schOrientation="vertical"
      connections={{ pin2: "net.DACOUT" }}
    />
    <resistor
      name="R1"
      resistance="10.1kohm"
      tolerance="0.5%"
      footprint="0603"
      schX={-0.8}
      schY={3.2}
      connections={{ pin1: "U2.inverting_input", pin2: "net.EC_PLUS" }}
    />
    <capacitor
      name="C1"
      capacitance="10pF"
      maxVoltageRating="10V"
      footprint="0603"
      schX={-0.8}
      schY={4.4}
      schRotation="180deg"
      connections={{ pin1: "net.EC_PLUS", pin2: "U2.inverting_input" }}
    />
    <TLV316QDBVTQ1
      name="U2"
      schX={0}
      schY={0}
      connections={{
        non_inverting_input: "net.DACOUT",
        output: "Q2.base",
        positive_supply: "net.V3P3",
        negative_supply: "net.GND",
      }}
    />
    <capacitor
      name="C2"
      capacitance="4.7uF"
      maxVoltageRating="16V"
      footprint="0603"
      schX={0.6}
      schY={2.5}
      connections={{ pin1: "net.V3P3", pin2: "net.GND" }}
    />
    <capacitor
      name="C5"
      capacitance="0.1uF"
      maxVoltageRating="16V"
      footprint="0603"
      schX={0.6}
      schY={1.5}
      connections={{ pin1: "net.V3P3", pin2: "net.GND" }}
    />

    <transistor
      name="Q2"
      type="npn"
      manufacturerPartNumber="NJVMJD122T4G"
      datasheetUrl="https://www.onsemi.com/pdf/datasheet/mjd122-d.pdf"
      footprint="to252_3"
      schX={3.8}
      schY={0}
      schRotation="270deg"
      connections={{
        collector: "net.VSUP",
        emitter: "net.EC_PLUS",
      }}
    />
    <capacitor
      name="C11"
      capacitance="22uF"
      polarized
      maxVoltageRating="35V"
      footprint="electrolytic_d6.3mm_p2.5mm"
      schX={5.4}
      schY={1.8}
      connections={{ pin1: "net.VSUP", pin2: "net.GND" }}
    />

    <resistor
      name="R2"
      resistance="4.7kohm"
      tolerance="1%"
      footprint="0603"
      schX={8.5}
      schY={2.4}
      schOrientation="vertical"
      connections={{ pin1: "net.V3P3", pin2: "net.DISC" }}
    />
    <transistor
      name="Q1"
      type="npn"
      manufacturerPartNumber="FMMT495TA"
      datasheetUrl="https://www.diodes.com/assets/Datasheets/FMMT495.pdf"
      footprint="sot23"
      schX={8.5}
      schY={0}
      schRotation="270deg"
      connections={{
        base: "net.DISC",
        collector: "net.EC_PLUS",
        emitter: "net.GND",
      }}
    />
  </subcircuit>
);

export default ElectrochromicMirrorDriver_TIDA01539;
