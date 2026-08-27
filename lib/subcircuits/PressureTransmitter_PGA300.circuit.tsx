import type { SubcircuitProps } from "@tscircuit/props";
import { PGA300ARHHR } from "../chips/PGA300ARHHR.circuit.tsx";

/**
 * PGA300 4–20 mA pressure-transmitter front end from TI reference design
 * TIDA-00788 (schematic TIDROY6).
 */
export const PressureTransmitter_PGA300 = (props: SubcircuitProps) => (
  <subcircuit
    width={100}
    height={100}
    schTraceAutoLabelEnabled={false}
    schMaxTraceDistance={100}
    {...props}
  >
    <PGA300ARHHR
      name="U1"
      schX={-4.2}
      schY={0}
      schWidth={3.8}
      schHeight={8}
      showPinAliases={false}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: ["VBRGN", "VBRGP", "VINPP", "VINPN", "VINTP", "VINTN", "PAD"],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [
            "GATE",
            "VDD",
            "DVDD_MEM",
            "AVSS",
            "DVSS",
            "GND",
            "AVDD",
            "DVDD",
            "REFCAP",
            "VOUT",
            "COMP",
            "FBN",
            "DACCAP",
            "FBP",
          ],
        },
      }}
      schPinStyle={{
        VBRGN: { marginTop: 0.69 },
        VBRGP: { marginTop: 0.3 },
        VINPP: { marginTop: 0.45 },
        VINPN: { marginTop: 0.31 },
        VINTP: { marginTop: 1.21 },
        VINTN: { marginTop: 0.27 },
        PAD: { marginTop: 0.75 },
        VDD: { marginTop: 0.25 },
        DVDD_MEM: { marginTop: 0.27 },
        AVSS: { marginTop: 0.04 },
        DVSS: { marginTop: 0.04 },
        GND: { marginTop: 0.03 },
        AVDD: { marginTop: 0.04 },
        DVDD: { marginTop: 0.27 },
        REFCAP: { marginTop: 0.26 },
        VOUT: { marginTop: 1.69 },
        COMP: { marginTop: 0.26 },
        FBN: { marginTop: 0.26 },
        DACCAP: { marginTop: 0.53 },
        FBP: { marginTop: 0.51 },
      }}
      noConnect={[
        "NU1",
        "NU3",
        "NU4",
        "NU5",
        "NU6",
        "NU7",
        "NU8",
        "NU9",
        "NU10",
        "NU11",
        "NU12",
        "NU13",
        "NU14",
        "NU15",
        "NU16",
        "NU17",
        "VBRGN",
        "VINTP",
        "VINTN",
        "FBN",
      ]}
    />

    <netlabel
      net="VBRGP"
      connectsTo="U1.VBRGP"
      schX={-12.1}
      schY={1.4}
      anchorSide="right"
    />
    <netlabel
      net="VINPP"
      connectsTo="R2.pin1"
      schX={-12.1}
      schY={0.95}
      anchorSide="right"
    />
    <netlabel
      net="VINPN"
      connectsTo="R3.pin1"
      schX={-12.1}
      schY={0.15}
      anchorSide="right"
    />
    <netlabel
      net="Vdd"
      connectsTo="R4.pin2"
      schX={13.7}
      schY={1.7}
      anchorSide="left"
    />
    <netlabel
      net="Ireturn"
      connectsTo="D3.pin2"
      schX={13.7}
      schY={-0.42}
      anchorSide="left"
    />
    <netlabel
      net="GND"
      connectsTo="U1.GND"
      schX={-0.7}
      schY={1.895}
      anchorSide="left"
    />
    <netlabel
      net="GND"
      connectsTo="U1.PAD"
      schX={-7.4}
      schY={-3.2}
      anchorSide="top"
    />
    <netlabel
      net="GND"
      connectsTo="C1.pin2"
      schX={1.45}
      schY={-0.85}
      anchorSide="top"
    />
    <netlabel
      net="GND"
      connectsTo="C2.pin2"
      schX={0.35}
      schY={-0.85}
      anchorSide="top"
    />
    <netlabel
      net="GND"
      connectsTo="C3.pin2"
      schX={-0.75}
      schY={-0.85}
      anchorSide="top"
    />
    <netlabel
      net="GND"
      connectsTo="R1.pin2"
      schX={5.49}
      schY={-2.25}
      anchorSide="top"
    />

    <resistor
      name="R2"
      resistance="75k"
      footprint="0402"
      schX={-10.1}
      schY={0.95}
    />
    <resistor
      name="R3"
      resistance="75k"
      footprint="0402"
      schX={-10.1}
      schY={0.15}
    />
    <capacitor
      name="C6"
      capacitance="10nF"
      footprint="0402"
      schX={-8.45}
      schY={0.55}
      schOrientation="vertical"
    />

    <capacitor
      name="C1"
      capacitance="100nF"
      footprint="0402"
      schX={1.45}
      schY={0.55}
      schOrientation="vertical"
    />
    <capacitor
      name="C2"
      capacitance="100nF"
      footprint="0402"
      schX={0.35}
      schY={0.2}
      schOrientation="vertical"
    />
    <capacitor
      name="C3"
      capacitance="100nF"
      footprint="0402"
      schX={-0.75}
      schY={-0.15}
      schOrientation="vertical"
    />

    <transistor
      name="Q1"
      type="npn"
      manufacturerPartNumber="BCP56-16"
      supplierPartNumbers={{ jlcpcb: ["C41375109"] }}
      footprint={
        <footprint>
          <smtpad
            portHints={["base", "pin3"]}
            pcbX={-2.3}
            pcbY={-3}
            width={1.2}
            height={1.8}
            shape="rect"
          />
          <smtpad
            portHints={["collector", "pin2"]}
            pcbX={0}
            pcbY={-3}
            width={1.2}
            height={1.8}
            shape="rect"
          />
          <smtpad
            portHints={["emitter", "pin1"]}
            pcbX={2.3}
            pcbY={-3}
            width={1.2}
            height={1.8}
            shape="rect"
          />
          <smtpad
            portHints={["collector", "pin2"]}
            pcbX={0}
            pcbY={3}
            width={3.3}
            height={1.8}
            shape="rect"
          />
          <silkscreenrect
            pcbX={0}
            pcbY={0}
            width={6.5}
            height={3.5}
            filled={false}
          />
        </footprint>
      }
      schX={5.2}
      schY={0.5}
      schRotation={-90}
    />
    <resistor
      name="R1"
      resistance="150"
      footprint="0603"
      schX={5.49}
      schY={-1.1}
      schOrientation="vertical"
    />

    <capacitor
      name="C5"
      capacitance="100nF"
      footprint="0402"
      schX={-0.7}
      schY={-2.815}
    />
    <capacitor
      name="C4"
      capacitance="100nF"
      footprint="0402"
      schX={6.4}
      schY={-0.25}
      schOrientation="vertical"
    />

    <resistor
      name="R_L1"
      displayName="L1"
      resistance="600"
      footprint="0603"
      schX={7.3}
      schY={3.05}
    />
    <resistor
      name="R_L2"
      displayName="L2"
      resistance="600"
      footprint="0603"
      schX={7.3}
      schY={-3.5}
    />
    <diode
      name="D1"
      variant="tvs"
      manufacturerPartNumber="SM6T30CA"
      supplierPartNumbers={{ jlcpcb: ["C133691"] }}
      footprint="smb"
      schX={8.25}
      schY={0.3}
      schOrientation="vertical"
    />
    <diode
      name="D2"
      manufacturerPartNumber="RF071M2S"
      supplierPartNumbers={{ jlcpcb: ["C84978"] }}
      footprint="sod123f"
      schX={9.2}
      schY={1.7}
      schOrientation="pos_right"
    />
    <resistor
      name="R4"
      resistance="200"
      footprint="0603"
      schX={10.3}
      schY={1.7}
    />
    <diode
      name="D3"
      variant="tvs"
      manufacturerPartNumber="SM6T36CA"
      supplierPartNumbers={{ jlcpcb: ["C133688"] }}
      footprint="smb"
      schX={10.9}
      schY={0.3}
      schOrientation="vertical"
    />

    <trace
      from="U1.GATE"
      to="U1.AVSS"
      schematicRouteHints={[
        { x: -0.95, y: 2.675 },
        { x: -0.95, y: 1.725 },
      ]}
    />
    <trace from="U1.AVSS" to="U1.DVSS" />
    <trace from="U1.DVSS" to="U1.GND" />

    <trace
      from="U1.DVDD_MEM"
      to="U1.DVDD"
      schematicRouteHints={[
        { x: -0.7, y: 1.925 },
        { x: -0.7, y: 0.325 },
      ]}
    />
    <trace from="U1.DVDD" to="C2.pin1" />
    <trace from="U1.AVDD" to="C1.pin1" />
    <trace from="U1.REFCAP" to="C3.pin1" />

    <trace
      from="U1.VINPP"
      to="R2.pin2"
      schematicRouteHints={[
        { x: -7.2, y: 0.35 },
        { x: -7.2, y: 0.95 },
      ]}
    />
    <trace from="R2.pin2" to="C6.pin1" />
    <trace from="U1.VINPN" to="R3.pin2" />
    <trace from="R3.pin2" to="C6.pin2" />

    <trace
      from="U1.VDD"
      to="Q1.pin1"
      schematicRouteHints={[
        { x: 2.7, y: 3.05 },
        { x: 5.2, y: 3.05 },
      ]}
    />
    <trace
      from="U1.VDD"
      to="R_L1.pin1"
      schematicRouteHints={[
        { x: 2.7, y: 3.05 },
        { x: 7, y: 3.05 },
      ]}
    />
    <trace
      from="Q1.pin1"
      to="C4.pin1"
      schematicRouteHints={[
        { x: 6.4, y: 3.05 },
        { x: 6.4, y: 0.25 },
      ]}
    />
    <trace
      from="U1.VOUT"
      to="Q1.pin2"
      schematicRouteHints={[
        { x: 3.6, y: -0.85 },
        { x: 3.6, y: 0.5 },
      ]}
    />
    <trace from="Q1.pin3" to="R1.pin1" />
    <trace from="U1.COMP" to="R1.pin2" />

    <trace from="U1.DACCAP" to="C5.pin1" />
    <trace
      from="U1.FBP"
      to="C5.pin2"
      schematicRouteHints={[
        { x: 0.4, y: -3.525 },
        { x: 0.4, y: -2.815 },
      ]}
    />
    <trace
      from="U1.FBP"
      to="R_L2.pin1"
      schematicRouteHints={[
        { x: -1.5, y: -3.525 },
        { x: 7, y: -3.525 },
      ]}
    />
    <trace
      from="C4.pin2"
      to="C5.pin2"
      schematicRouteHints={[
        { x: 6.4, y: -3.525 },
        { x: 0.4, y: -3.525 },
        { x: 0.4, y: -2.815 },
      ]}
    />

    <trace
      from="R_L1.pin2"
      to="D2.pin2"
      schematicRouteHints={[
        { x: 8.25, y: 3.05 },
        { x: 8.25, y: 1.7 },
      ]}
    />
    <trace from="D1.pin1" to="D2.pin2" />
    <trace from="D2.pin1" to="R4.pin1" />
    <trace
      from="R_L2.pin2"
      to="D1.pin2"
      schematicRouteHints={[
        { x: 8.25, y: -3.525 },
        { x: 8.25, y: -0.22 },
      ]}
    />
    <trace
      from="D1.pin2"
      to="D3.pin2"
      schematicRouteHints={[
        { x: 8.25, y: -1.2 },
        { x: 10.9, y: -1.2 },
        { x: 10.9, y: -0.22 },
      ]}
    />
    <trace
      from="R4.pin2"
      to="D3.pin1"
      schematicRouteHints={[
        { x: 10.9, y: 1.7 },
        { x: 10.9, y: 0.82 },
      ]}
    />

    <schematictext
      text="BCP56-16"
      schX={6.0}
      schY={1.0}
      fontSize={0.2}
      anchor="left"
    />
    <schematictext
      text="RF071M2S"
      schX={9.2}
      schY={1.25}
      fontSize={0.2}
      anchor="center"
    />
    <schematictext
      text="SM6T30CA"
      schX={8.9}
      schY={0.65}
      fontSize={0.2}
      anchor="left"
    />
    <schematictext
      text="25.6V"
      schX={8.9}
      schY={0.35}
      fontSize={0.2}
      anchor="left"
    />
    <schematictext
      text="SM6T36CA"
      schX={11.5}
      schY={0.65}
      fontSize={0.2}
      anchor="left"
    />
    <schematictext
      text="36V"
      schX={11.5}
      schY={0.35}
      fontSize={0.2}
      anchor="left"
    />
  </subcircuit>
);

export default PressureTransmitter_PGA300;
