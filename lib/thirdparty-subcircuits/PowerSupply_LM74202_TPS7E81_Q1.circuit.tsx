import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { LM74202QPWPRQ1 } from "../chips/LM74202QPWPRQ1.circuit.tsx";
import { TPS7E8133QDBVRQ1 } from "../chips/TPS7E8133QDBVRQ1.circuit.tsx";

const bidirectionalTvsSymbol = (
  <symbol>
    <port
      name="pin2"
      pinNumber={2}
      schX={0}
      schY={1.2}
      direction="up"
      schStemLength={0.68}
    />
    <schematicpath
      points={[
        { x: -0.34, y: 0.52 },
        { x: 0.34, y: 0.52 },
        { x: 0, y: 0 },
        { x: -0.34, y: 0.52 },
      ]}
      strokeWidth={0.025}
      strokeColor="#840000"
      fillColor="#840000"
      isFilled
    />
    <schematicpath
      points={[
        { x: -0.34, y: -0.52 },
        { x: 0.34, y: -0.52 },
        { x: 0, y: 0 },
        { x: -0.34, y: -0.52 },
      ]}
      strokeWidth={0.025}
      strokeColor="#840000"
      fillColor="#840000"
      isFilled
    />
    <schematicpath
      points={[
        { x: -0.52, y: -0.3 },
        { x: -0.3, y: 0 },
        { x: 0, y: 0 },
      ]}
      strokeWidth={0.035}
      strokeColor="#840000"
    />
    <schematicpath
      points={[
        { x: 0, y: 0 },
        { x: 0.3, y: 0 },
        { x: 0.52, y: 0.3 },
      ]}
      strokeWidth={0.035}
      strokeColor="#840000"
    />
    <port
      name="pin1"
      pinNumber={1}
      schX={0}
      schY={-1.2}
      direction="down"
      schStemLength={0.68}
    />
    <schematictext
      text="{NAME}"
      schX={0.12}
      schY={-0.78}
      fontSize={0.22}
      anchor="left"
    />
  </symbol>
);

/**
 * Datasheet-derived power supply for the Rearview Mirror Module.
 *
 * The module block has no attached TI reference design. The battery-protection
 * stage follows the LM74202-Q1 datasheet Simplified Schematic on page 1, using
 * component values from Figure 39. The fixed 3.3 V regulator follows the
 * TPS7E81-Q1 datasheet Figure 7-5.
 * References:
 * - https://www.ti.com/lit/ds/symlink/lm74202-q1.pdf
 * - https://www.ti.com/lit/ds/symlink/tps7e81-q1.pdf
 */
export const PowerSupply_LM74202_TPS7E81_Q1 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled schMaxTraceDistance="5mm" {...props}>
    <net name="VIN" isPowerNet />
    <net name="VOUT" isPowerNet />
    <net name="V3P3" isPowerNet />
    <net name="ON_OFF_CONTROL" />
    <net name="HEALTH_MONITOR" />
    <net name="LOAD_MONITOR" />
    <net name="GND" isGroundNet />

    <diode
      name="TVS"
      manufacturerPartNumber="SMBJ28CA"
      footprint="do214aa"
      variant="tvs"
      schX={-9.5}
      schY={-1.6}
      symbol={bidirectionalTvsSymbol}
      connections={{ pin1: "net.GND", pin2: "net.VIN" }}
    />
    <capacitor
      name="CIN"
      capacitance="1uF"
      polarized
      maxVoltageRating="50V"
      footprint="1206"
      schX={-7.8}
      schY={1.2}
      schOrientation="vertical"
      connections={{ pin1: "net.VIN", pin2: "net.GND" }}
    />
    <resistor
      name="R1"
      resistance="97.6kohm"
      tolerance="1%"
      footprint="0603"
      schX={-6.2}
      schY={1.4}
      schOrientation="vertical"
      connections={{ pin1: "net.VIN", pin2: "U1.OVP" }}
    />
    <resistor
      name="R2"
      resistance="5.11kohm"
      tolerance="1%"
      footprint="0603"
      schX={-6.2}
      schY={-1.4}
      schOrientation="vertical"
      connections={{ pin1: "U1.OVP", pin2: "net.GND" }}
    />

    <LM74202QPWPRQ1
      name="U1"
      schX={0}
      schY={0}
      connections={{
        IN: "net.VIN",
        UVLO: "net.VIN",
        MODE: "net.GND",
        SHDN: "net.ON_OFF_CONTROL",
        RTN: "net.GND",
        GND: "net.GND",
        IMON: "net.LOAD_MONITOR",
        FLT: "net.HEALTH_MONITOR",
        OUT: "net.VOUT",
      }}
    />

    <capacitor
      name="CdVdT"
      capacitance="12nF"
      maxVoltageRating="16V"
      footprint="0603"
      schX={-3.8}
      schY={-3.8}
      schOrientation="vertical"
      connections={{ pin1: "U1.DVDT", pin2: "net.GND" }}
    />
    <resistor
      name="RFLTb"
      resistance="100kohm"
      tolerance="1%"
      footprint="0603"
      schX={5}
      schY={1.3}
      schOrientation="vertical"
      connections={{ pin1: "net.VOUT", pin2: "net.HEALTH_MONITOR" }}
    />
    <resistor
      name="RIMON"
      resistance="20kohm"
      tolerance="1%"
      footprint="0603"
      schX={6.7}
      schY={-2}
      schOrientation="vertical"
      connections={{ pin1: "net.LOAD_MONITOR", pin2: "net.GND" }}
    />
    <resistor
      name="RILIM"
      resistance="5.36kohm"
      tolerance="1%"
      footprint="0603"
      schX={5.5}
      schY={-2.8}
      schOrientation="vertical"
      connections={{ pin1: "U1.ILIM", pin2: "net.GND" }}
    />
    <capacitor
      name="COUT"
      capacitance="47uF"
      polarized
      maxVoltageRating="35V"
      footprint="electrolytic_d6.3mm_p2.5mm"
      schX={9.5}
      schY={1}
      schOrientation="vertical"
      connections={{ pin1: "net.VOUT", pin2: "net.GND" }}
    />

    <capacitor
      name="C_LDO_IN"
      capacitance="1uF"
      maxVoltageRating="50V"
      footprint="1206"
      schX={11.5}
      schY={-1.6}
      schOrientation="vertical"
      connections={{ pin1: "net.VOUT", pin2: "net.GND" }}
    />
    <TPS7E8133QDBVRQ1
      name="U2"
      schX={14}
      schY={0}
      connections={{
        IN: "net.VOUT",
        EN: "net.ON_OFF_CONTROL",
        GND: "net.GND",
        OUT: "net.V3P3",
      }}
    />
    <capacitor
      name="C_LDO_OUT"
      capacitance="2.2uF"
      maxVoltageRating="16V"
      footprint="0603"
      schX={16.8}
      schY={-1.6}
      schOrientation="vertical"
      connections={{ pin1: "net.V3P3", pin2: "net.GND" }}
    />
  </subcircuit>
);

export default PowerSupply_LM74202_TPS7E81_Q1;
