import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { MSP430G2230ID } from "../chips/MSP430G2230ID.circuit.tsx";

/**
 * TI MSP-TS430D8 8-pin target socket board reference circuit.
 *
 * J5 power selection:
 *   - short pins 2-3 for power from the MSP debug tool
 *   - short pins 1-2 for an externally powered target / VCC sensing
 *
 * J6 is normally shorted and can be opened to measure target supply current.
 * J4 is normally shorted and can be opened to disconnect the P1.2 LED.
 */
export const TargetSocket_MSPTS430D8 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled schMaxTraceDistance="50mm" {...props}>
    <MSP430G2230ID
      name="U1"
      manufacturerPartNumber="MSP-TS430D8"
      schX={1}
      schY={-1.5}
      schHeight="2.2mm"
      connections={{
        pin1: "J1.pin1",
        pin2: "J1.pin2",
        pin3: "J1.pin3",
        pin4: "J1.pin4",
        pin5: "J2.pin4",
        pin6: "J2.pin3",
        pin7: "J2.pin2",
        pin8: "J2.pin1",
      }}
    />

    {/* 14-pin MSP Spy-Bi-Wire debug connector */}
    <chip
      name="SBW"
      footprint="pinrow14_p2.54_nopinlabels_rows2"
      schX={-12.8}
      schY={7.3}
      schWidth="1.2mm"
      schHeight="1.8mm"
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [14, 12, 10, 8, 6, 4, 2],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [13, 11, 9, 7, 5, 3, 1],
        },
      }}
      connections={{
        pin1: "R5.pin2",
        pin2: "J5.pin3",
        pin4: "J5.pin1",
        pin7: "R2.pin1",
        pin9: "net.GND",
      }}
    />

    {/* Internal/external supply-selection header */}
    <pinheader
      name="J5"
      pinCount={3}
      gender="male"
      pitch="2.54mm"
      schX={-14.8}
      schY={6.1}
      schFacingDirection="right"
      pinLabels={["EXT", "VCC", "INT"]}
      connections={{
        pin2: "J3.pin1",
      }}
    />

    {/* External power connector */}
    <pinheader
      name="J3"
      pinCount={3}
      gender="male"
      pitch="2.54mm"
      schX={10.5}
      schY={6.3}
      schFacingDirection="left"
      pinLabels={["VCC", "GND", "GND"]}
      connections={{
        pin2: "net.GND",
        pin3: "net.GND",
      }}
    />

    {/* SBWTCK series resistor */}
    <resistor
      name="R2"
      resistance="330ohm"
      footprint="0805"
      schX={-5.5}
      schY={5.4}
      schOrientation="vertical"
      connections={{
        pin2: "J2.pin2",
      }}
    />

    {/* Reset pull-up and optional reset capacitor */}
    <resistor
      name="R5"
      resistance="47k"
      footprint="0805"
      schX={5.3}
      schY={5.4}
      schOrientation="vertical"
      connections={{
        pin1: "J3.pin1",
        pin2: "C8.pin1",
      }}
    />

    <capacitor
      name="C8"
      capacitance="2.2nF"
      footprint="0805"
      doNotPlace
      schX={5.3}
      schY={3.25}
      schOrientation="vertical"
      connections={{
        pin1: "J2.pin3",
        pin2: "net.GND",
      }}
    />

    {/* Removable jumper for target-current measurement */}
    <pinheader
      name="J6"
      pinCount={2}
      gender="male"
      pitch="2.54mm"
      schX={-12.8}
      schY={1.8}
      schFacingDirection="right"
      pinLabels={["VCC430", "VCC"]}
      connections={{
        pin1: "C7.pin1",
        pin2: "J3.pin1",
      }}
    />

    {/* Target supply decoupling */}
    <capacitor
      name="C7"
      capacitance="10uF"
      footprint="1210"
      schX={-11.8}
      schY={-1.0}
      schOrientation="vertical"
      connections={{
        pin1: "C5.pin1",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C5"
      capacitance="100nF"
      footprint="0805"
      schX={-9.8}
      schY={-1.0}
      schOrientation="vertical"
      connections={{
        pin1: "J1.pin1",
        pin2: "net.GND",
      }}
    />

    {/* Low-side device breakout */}
    <pinheader
      name="J1"
      displayName="FE4L"
      pinCount={4}
      gender="male"
      pitch="2.54mm"
      schX={-5.8}
      schY={-1.5}
      schFacingDirection="right"
      pinLabels={["VCC430", "P1_2", "P1_5", "P1_6"]}
    />

    {/* High-side device breakout */}
    <pinheader
      name="J2"
      displayName="FE4H"
      pinCount={4}
      gender="male"
      pitch="2.54mm"
      schX={8.0}
      schY={-1.5}
      schFacingDirection="left"
      pinLabels={["DVSS_8", "TST_7", "RST_6", "P1_7_5"]}
      connections={{
        pin1: "net.GND",
        pin2: "R2.pin2",
        pin3: "C8.pin1",
      }}
    />

    {/* P1.2 indicator LED and disconnect jumper */}
    <jumper
      name="J4"
      pinCount={2}
      footprint="pinrow2_p2.54_nopinlabels"
      schX={-2.6}
      schY={-5.0}
      schWidth="0.4mm"
      schHeight="0.7mm"
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [2],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [1],
        },
      }}
      connections={{
        pin1: "U1.pin2",
        pin2: "R3.pin2",
      }}
    />

    <resistor
      name="R3"
      resistance="330ohm"
      footprint="0805"
      schX={-5.3}
      schY={-5.0}
      connections={{
        pin1: "D1.pin1",
      }}
    />

    <led
      name="D1"
      color="green"
      footprint="led0603"
      schX={-8.0}
      schY={-5.0}
      schRotation={180}
      connections={{
        pin2: "net.GND",
      }}
    />
  </subcircuit>
);

export default TargetSocket_MSPTS430D8;
