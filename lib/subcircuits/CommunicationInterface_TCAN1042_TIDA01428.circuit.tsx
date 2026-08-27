import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TCAN1042HGVDRBQ1 } from "../chips/TCAN1042HGVDRBQ1.circuit.tsx";

const commonModeChokeSymbol = (
  <symbol>
    <port
      name="pin4"
      pinNumber={4}
      schX={-0.65}
      schY={1.2}
      direction="up"
      schStemLength={0.7}
    />
    <port
      name="pin3"
      pinNumber={3}
      schX={0.65}
      schY={1.2}
      direction="up"
      schStemLength={0.7}
    />
    <schematicpath
      svgPath="M -0.65 0.5 L -0.5 0.5 C -0.5 0.22 -0.2 0.22 -0.2 0.5 C -0.2 0.22 0.1 0.22 0.1 0.5 C 0.1 0.22 0.4 0.22 0.4 0.5 L 0.65 0.5"
      strokeWidth={0.04}
      strokeColor="#840000"
    />
    <schematiccircle
      center={{ x: -0.35, y: 0.4 }}
      radius={0.06}
      strokeWidth={0.025}
      color="#840000"
      fillColor="#840000"
      isFilled
    />
    <schematicline
      x1={-0.55}
      y1={0.1}
      x2={0.55}
      y2={0.1}
      strokeWidth={0.035}
      color="#840000"
    />
    <schematicline
      x1={-0.55}
      y1={-0.1}
      x2={0.55}
      y2={-0.1}
      strokeWidth={0.035}
      color="#840000"
    />
    <schematicpath
      svgPath="M -0.65 -0.5 L -0.5 -0.5 C -0.5 -0.22 -0.2 -0.22 -0.2 -0.5 C -0.2 -0.22 0.1 -0.22 0.1 -0.5 C 0.1 -0.22 0.4 -0.22 0.4 -0.5 L 0.65 -0.5"
      strokeWidth={0.04}
      strokeColor="#840000"
    />
    <schematiccircle
      center={{ x: -0.35, y: -0.4 }}
      radius={0.06}
      strokeWidth={0.025}
      color="#840000"
      fillColor="#840000"
      isFilled
    />
    <port
      name="pin1"
      pinNumber={1}
      schX={-0.65}
      schY={-1.2}
      direction="down"
      schStemLength={0.7}
    />
    <port
      name="pin2"
      pinNumber={2}
      schX={0.65}
      schY={-1.2}
      direction="down"
      schStemLength={0.7}
    />
    <schematictext
      text="4"
      schX={-0.8}
      schY={0.95}
      schRotation={90}
      fontSize={0.16}
      anchor="center"
      color="#840000"
    />
    <schematictext
      text="3"
      schX={0.8}
      schY={0.95}
      schRotation={90}
      fontSize={0.16}
      anchor="center"
      color="#840000"
    />
    <schematictext
      text="1"
      schX={-0.8}
      schY={-0.95}
      schRotation={90}
      fontSize={0.16}
      anchor="center"
      color="#840000"
    />
    <schematictext
      text="2"
      schX={0.8}
      schY={-0.95}
      schRotation={90}
      fontSize={0.16}
      anchor="center"
      color="#840000"
    />
    <schematictext
      text="{NAME}"
      schX={0.85}
      schY={0.42}
      fontSize={0.22}
      anchor="left"
    />
  </symbol>
);

/**
 * CAN FD interface topology from the TIDA-01428 reference design.
 * Reference: https://www.ti.com/tool/TIDA-01428
 */
export const CommunicationInterface_TCAN1042_TIDA01428 = (
  props: SubcircuitProps,
) => (
  <subcircuit schMaxTraceDistance="8mm" {...props}>
    <net name="GND" isGroundNet />

    <resistor
      name="R21"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      schX={-5}
      schY={2}
      schOrientation="vertical"
      connections={{
        pin1: "net.V5P0",
        pin2: ["U6.VCC", "C28.pin1"],
      }}
    />
    <capacitor
      name="C28"
      capacitance="0.1uF"
      maxVoltageRating="25V"
      footprint="0603"
      schX={-5}
      schY={-2}
      schOrientation="vertical"
      connections={{ pin2: "net.GND" }}
    />
    <resistor
      name="R22"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      schX={-3.8}
      schY={2}
      schOrientation="vertical"
      connections={{
        pin1: "net.V3P3",
        pin2: ["U6.VIO", "C29.pin1"],
      }}
    />
    <capacitor
      name="C29"
      capacitance="0.1uF"
      maxVoltageRating="25V"
      footprint="0603"
      schX={-3.8}
      schY={-2}
      schOrientation="vertical"
      connections={{ pin2: "net.GND" }}
    />

    <TCAN1042HGVDRBQ1
      name="U6"
      schX={0}
      schY={0}
      connections={{
        TXD: "net.CAN_TXD",
        STB: "net.CAN_STB",
        RXD: "net.CAN_RXD",
        CANH: "L7.pin4",
        CANL: "L7.pin1",
        GND: "net.GND",
        PAD: "net.GND",
      }}
    />

    <chip
      name="L7"
      manufacturerPartNumber="B82789C0104H001"
      datasheetUrl="https://www.tdk-electronics.tdk.com/inf/30/db/ind_2008/b82789c0.pdf"
      footprint="soic4"
      symbol={commonModeChokeSymbol}
      schX={5}
      schY={0.6}
      connections={{
        pin3: "net.CANH",
        pin2: "net.CANL",
      }}
    />

    <chip
      name="U7"
      manufacturerPartNumber="TPD2E007DCKR"
      datasheetUrl="https://www.ti.com/lit/ds/symlink/tpd2e007.pdf"
      footprint="sot23"
      pinLabels={{ pin1: "IO1", pin2: "IO2", pin3: "GND" }}
      pinAttributes={{
        IO1: { requiresPower: true, providesPower: true },
        IO2: { requiresPower: true, providesPower: true },
        GND: { requiresGround: true },
      }}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: [2, 1] },
        rightSide: { direction: "top-to-bottom", pins: [3] },
      }}
      doNotPlace
      schX={8}
      schY={0.6}
      connections={{ IO1: "net.CANL", IO2: "net.CANH", GND: "net.GND" }}
    />

    <resistor
      name="R23"
      resistance="60.4ohm"
      tolerance="1%"
      footprint="1206"
      schX={10.8}
      schY={1.4}
      schOrientation="vertical"
      connections={{ pin1: "net.CANH", pin2: "R24.pin1" }}
    />
    <resistor
      name="R24"
      resistance="60.4ohm"
      tolerance="1%"
      footprint="1206"
      schX={10.8}
      schY={-1}
      schOrientation="vertical"
      connections={{ pin2: "net.CANL" }}
    />
    <capacitor
      name="C27"
      capacitance="4700pF"
      maxVoltageRating="50V"
      footprint="0603"
      schX={10}
      schY={0.5}
      connections={{ pin2: "R24.pin1", pin1: "net.GND" }}
    />
    <capacitor
      name="C26"
      capacitance="56pF"
      maxVoltageRating="50V"
      footprint="0603"
      schX={12.8}
      schY={1.4}
      schOrientation="vertical"
      connections={{ pin1: "net.CANH", pin2: "net.GND" }}
    />
    <capacitor
      name="C30"
      capacitance="56pF"
      maxVoltageRating="50V"
      footprint="0603"
      schX={12.8}
      schY={-2}
      schOrientation="vertical"
      connections={{ pin1: "net.CANL", pin2: "net.GND" }}
    />
  </subcircuit>
);

export default CommunicationInterface_TCAN1042_TIDA01428;
