import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { ISOW7841DWR } from "../chips/ISOW7841DWR.circuit.tsx";
import { SN65HVD1473DGSR } from "../chips/SN65HVD1473DGSR.circuit.tsx";

const tvsPinLabels = {
  pin1: "LINE_1",
  pin2: "LINE_2",
  pin3: "GND",
} as const;

/**
 * Isolated, full-duplex RS-485 interface adapted from TI reference design
 * TIDA-00892: https://www.ti.com/tool/TIDA-00892
 */
export const IsolatedRS485_ISOW7841 = (props: SubcircuitProps) => (
  <subcircuit schMaxTraceDistance="35mm" autorouterEffortLevel="10x" {...props}>
    <pinheader
      name="J1"
      displayName="HOST"
      pinCount={6}
      gender="male"
      pitch="2mm"
      manufacturerPartNumber="M22-2510605"
      supplierPartNumbers={{
        digikey: ["952-1315-ND"],
        mouser: ["855-M22-2510605"],
      }}
      holeDiameter="0.8mm"
      platedDiameter="1.3mm"
      datasheetUrl="https://www.harwin.com/products/M22-2510605"
      pinLabels={["VIN", "INA", "INB", "INC", "OUTD", "GND1"]}
      showSilkscreenPinLabels
      schFacingDirection="right"
      schX={-17}
      schY={0}
      pcbX={-15.5}
      pcbY={0}
      pcbRotation={270}
      connections={{ pin1: "net.VIN", pin6: "net.GND1" }}
    />

    <ISOW7841DWR
      name="U1"
      schX={-9}
      schY={0}
      pcbX={-6.659}
      pcbY={0.109}
      connections={{
        pin1: "net.VIN",
        pin2: "net.GND1",
        pin3: "J1.pin2",
        pin4: "J1.pin3",
        pin5: "J1.pin4",
        pin6: "J1.pin5",
        pin8: "net.GND1",
        pin9: "net.GND2",
        pin10: "net.SEL",
        pin11: "U2.pin1",
        pin12: "U2.pin2",
        pin13: "U2.pin3",
        pin14: "U2.pin4",
        pin15: "net.GND2",
        pin16: "net.VOUT",
      }}
    />

    {/* Preserve the reference board's copper-free isolation channel. */}
    <keepout
      shape="rect"
      pcbX={-6.85}
      pcbY={0.109}
      width="0.2mm"
      height="13.3mm"
      layers={["top", "bottom"]}
    />

    <SN65HVD1473DGSR
      name="U2"
      schX={0}
      schY={0}
      pcbX={-3.662}
      pcbY={-0.272}
      layer="bottom"
      connections={{
        pin5: "net.GND2",
        pin6: "net.D_P",
        pin7: "net.D_N",
        pin8: "net.R_N",
        pin9: "net.R_P",
        pin10: "net.VOUT",
      }}
    />

    {/* Primary-side supply bypassing. */}
    <capacitor
      name="C1"
      capacitance="10uF"
      maxVoltageRating="35V"
      footprint="0805"
      schX={-13}
      schY={6.5}
      schOrientation="vertical"
      pcbX={-11.815}
      pcbY={2.788}
      pcbRotation={270}
      layer="bottom"
      connections={{ pin1: "net.VIN", pin2: "net.GND1" }}
    />
    <capacitor
      name="C6"
      capacitance="0.1uF"
      maxVoltageRating="25V"
      footprint="0402"
      schX={-11.5}
      schY={6.5}
      schOrientation="vertical"
      pcbX={-13.2}
      pcbY={5.5}
      layer="bottom"
      connections={{ pin1: "net.VIN", pin2: "net.GND1" }}
    />

    {/* Isolated-side supply bypassing. */}
    <capacitor
      name="C2"
      capacitance="10uF"
      maxVoltageRating="35V"
      footprint="0805"
      schX={-5}
      schY={6.5}
      schOrientation="vertical"
      pcbX={-1.909}
      pcbY={3.538}
      pcbRotation={270}
      layer="bottom"
      connections={{ pin1: "net.VOUT", pin2: "net.GND2" }}
    />
    <capacitor
      name="C7"
      capacitance="0.1uF"
      maxVoltageRating="25V"
      footprint="0402"
      schX={-3.5}
      schY={6.5}
      schOrientation="vertical"
      pcbX={-4.212}
      pcbY={3.954}
      pcbRotation={270}
      layer="bottom"
      connections={{ pin1: "net.VOUT", pin2: "net.GND2" }}
    />
    <capacitor
      name="C3"
      capacitance="0.01uF"
      maxVoltageRating="50V"
      footprint="0603"
      schX={-2}
      schY={6.5}
      schOrientation="vertical"
      pcbX={-4.5}
      pcbY={-5.8}
      pcbRotation={270}
      layer="bottom"
      connections={{ pin1: "net.VOUT", pin2: "net.GND2" }}
    />

    {/* SEL is grounded by R2; R1 is the unpopulated alternate VOUT strap. */}
    <resistor
      name="R1"
      resistance="0ohm"
      tolerance="5%"
      footprint="0201"
      doNotPlace
      schX={-6.6}
      schY={-6}
      schOrientation="vertical"
      pcbX={0.417}
      pcbY={-3.891}
      connections={{ pin1: "net.VOUT", pin2: "net.SEL" }}
    />
    <resistor
      name="R2"
      resistance="0ohm"
      tolerance="5%"
      footprint="0201"
      schX={-4.8}
      schY={-6}
      schOrientation="vertical"
      pcbX={0.417}
      pcbY={-5.052}
      connections={{ pin1: "net.SEL", pin2: "net.GND2" }}
    />

    {/* Driver pair with source termination and series damping. */}
    <resistor
      name="R3"
      resistance="120ohm"
      tolerance="1%"
      footprint="0805"
      schX={4.4}
      schY={2.2}
      schOrientation="vertical"
      pcbX={1.637}
      pcbY={1.985}
      pcbRotation={270}
      layer="bottom"
      connections={{ pin1: "net.D_P", pin2: "net.D_N" }}
    />
    <resistor
      name="R6"
      resistance="10ohm"
      tolerance="5%"
      footprint="0603"
      schX={7}
      schY={2.8}
      pcbX={4.771}
      pcbY={3.106}
      layer="bottom"
      connections={{ pin1: "net.D_P", pin2: "net.D_O_P" }}
    />
    <resistor
      name="R5"
      resistance="10ohm"
      tolerance="5%"
      footprint="0603"
      schX={7}
      schY={1.6}
      pcbX={4.941}
      pcbY={1.166}
      layer="bottom"
      connections={{ pin1: "net.D_N", pin2: "net.D_O_N" }}
    />

    {/* Receiver pair with line termination and series damping. */}
    <resistor
      name="R4"
      resistance="120ohm"
      tolerance="1%"
      footprint="0805"
      schX={4.4}
      schY={-2.2}
      schOrientation="vertical"
      pcbX={2.145}
      pcbY={-2.028}
      pcbRotation={270}
      layer="bottom"
      connections={{ pin1: "net.R_N", pin2: "net.R_P" }}
    />
    <resistor
      name="R8"
      resistance="10ohm"
      tolerance="5%"
      footprint="0603"
      schX={7}
      schY={-1.6}
      pcbX={4.941}
      pcbY={-1.21}
      layer="bottom"
      connections={{ pin1: "net.R_N", pin2: "net.R_I_N" }}
    />
    <resistor
      name="R7"
      resistance="10ohm"
      tolerance="5%"
      footprint="0603"
      schX={7}
      schY={-2.8}
      pcbX={4.941}
      pcbY={-2.847}
      layer="bottom"
      connections={{ pin1: "net.R_P", pin2: "net.R_I_P" }}
    />

    <chip
      name="D1"
      manufacturerPartNumber="CDSOT23-SM712"
      supplierPartNumbers={{
        jlcpcb: ["C404012"],
        digikey: ["CDSOT23-SM712CT-ND"],
        mouser: ["652-CDSOT23-SM712"],
      }}
      datasheetUrl="https://www.bourns.com/docs/product-datasheets/cdsot23-sm712.pdf"
      footprint="sot23"
      pinLabels={tvsPinLabels}
      schWidth="2.5mm"
      schHeight="2.2mm"
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: [1, 2] },
        bottomSide: { direction: "left-to-right", pins: [3] },
      }}
      schX={10.3}
      schY={2.2}
      pcbX={6.941}
      pcbY={2.366}
      pcbRotation={180}
      connections={{
        pin1: "net.D_O_P",
        pin2: "net.D_O_N",
        pin3: "net.GND2",
      }}
    />
    <chip
      name="D2"
      manufacturerPartNumber="CDSOT23-SM712"
      supplierPartNumbers={{
        jlcpcb: ["C404012"],
        digikey: ["CDSOT23-SM712CT-ND"],
        mouser: ["652-CDSOT23-SM712"],
      }}
      datasheetUrl="https://www.bourns.com/docs/product-datasheets/cdsot23-sm712.pdf"
      footprint="sot23"
      pinLabels={tvsPinLabels}
      schWidth="2.5mm"
      schHeight="2.2mm"
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: [1, 2] },
        bottomSide: { direction: "left-to-right", pins: [3] },
      }}
      schX={10.3}
      schY={-2.2}
      pcbX={6.941}
      pcbY={-2.028}
      connections={{
        pin1: "net.R_I_N",
        pin2: "net.R_I_P",
        pin3: "net.GND2",
      }}
    />

    <pinheader
      name="J2"
      displayName="ISOLATED RS-485"
      pinCount={6}
      gender="male"
      pitch="2mm"
      manufacturerPartNumber="M22-2510605"
      supplierPartNumbers={{
        digikey: ["952-1315-ND"],
        mouser: ["855-M22-2510605"],
      }}
      holeDiameter="0.8mm"
      platedDiameter="1.3mm"
      datasheetUrl="https://www.harwin.com/products/M22-2510605"
      pinLabels={["VOUT", "Y", "Z", "B", "A", "GND2"]}
      showSilkscreenPinLabels
      schFacingDirection="left"
      schX={15}
      schY={0}
      pcbX={13.972}
      pcbY={0}
      pcbRotation={270}
      connections={{
        pin1: "net.VOUT",
        pin2: "net.D_O_P",
        pin3: "net.D_O_N",
        pin4: "net.R_I_N",
        pin5: "net.R_I_P",
        pin6: "net.GND2",
      }}
    />

    {/* High-voltage capacitive coupling to the chassis/reference plane. */}
    <capacitor
      name="C4"
      capacitance="4700pF"
      maxVoltageRating="2kV"
      footprint="1210"
      schX={6.5}
      schY={-6.2}
      schOrientation="vertical"
      pcbX={10.5}
      pcbY={5.2}
      connections={{ pin1: "net.GND2", pin2: "net.CHASSIS_GND" }}
    />
    <capacitor
      name="C5"
      capacitance="4700pF"
      maxVoltageRating="2kV"
      footprint="1210"
      schX={8.5}
      schY={-6.2}
      schOrientation="vertical"
      pcbX={10.226}
      pcbY={-4.113}
      connections={{ pin1: "net.GND2", pin2: "net.CHASSIS_GND" }}
    />
    <testpoint
      name="TP1"
      displayName="CHASSIS GND / KEYSTONE 5019"
      manufacturerPartNumber="5019"
      supplierPartNumbers={{
        digikey: ["5019KCT-ND"],
        mouser: ["534-5019"],
      }}
      footprintVariant="pad"
      padShape="rect"
      width="3.8mm"
      height="2.03mm"
      schX={11}
      schY={-6.2}
      pcbX={10.227}
      pcbY={0.001}
      pcbRotation={180}
      connections={{ pin1: "net.CHASSIS_GND" }}
    />
  </subcircuit>
);

export default IsolatedRS485_ISOW7841;
