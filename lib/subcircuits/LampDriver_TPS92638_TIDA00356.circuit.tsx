import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TPS92638QPWPRQ1 } from "../chips/TPS92638QPWPRQ1.circuit.tsx";

const outputLedMap = [
  { name: "D5", x: 13.6, y: -0.5 },
  { name: "D7", x: 12.4, y: -1 },
  { name: "D9", x: 11.2, y: -1.5 },
  { name: "D11", x: 10, y: -2 },
  { name: "D4", x: 8.2, y: -0.5 },
  { name: "D6", x: 6.8, y: -1 },
  { name: "D8", x: 5.6, y: -1.5 },
  { name: "D10", x: 4, y: -2 },
] as const;

/** Eight-channel lamp-driver circuit from TIDA-00356 sheet 2. */
export const LampDriver_TPS92638_TIDA00356 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled schMaxTraceDistance="8mm" {...props}>
    <net name="GND" isGroundNet />

    <diode
      name="D3"
      manufacturerPartNumber="1N5819HW-7-F"
      datasheetUrl="https://www.diodes.com/assets/Datasheets/ds30217.pdf"
      footprint="sod123"
      schottky
      schX={-4.8}
      schY={5}
      connections={{ anode: "net.VBATT_12V", cathode: "U9.SUPPLY" }}
    />
    <capacitor
      name="C39"
      capacitance="0.01uF"
      maxVoltageRating="50V"
      footprint="0603"
      schX={-2.8}
      schY={5}
      schOrientation="vertical"
      connections={{ pin1: "U9.SUPPLY", pin2: "net.GND" }}
    />

    <pinheader
      name="J3"
      gender="male"
      pinCount={3}
      pitch="1.27mm"
      manufacturerPartNumber="GRPB031VWVN-RC"
      schFacingDirection="right"
      schRotation={180}
      schX={-9.5}
      schY={1.5}
      connections={{ pin1: "net.GND", pin2: "net.LED_EN", pin3: "net.V3" }}
    />
    <resistor
      name="R9"
      resistance="10kohm"
      tolerance="5%"
      footprint="0402"
      schX={-4.3}
      schY={3}
      schOrientation="vertical"
      connections={{ pin1: "net.V3_LDO", pin2: "net.LED_SW" }}
    />
    <testpoint
      name="TP2"
      manufacturerPartNumber="5002"
      footprintVariant="through_hole"
      holeDiameter="1mm"
      padDiameter="1.8mm"
      doNotPlace
      schX={-3.3}
      schY={-0.4}
      connections={{ pin1: "net.LED_SW" }}
    />

    <TPS92638QPWPRQ1
      name="U9"
      schX={0}
      schY={0}
      noConnect={["pin8", "pin10"]}
      connections={{
        EN: "net.LED_EN",
        PWM1: "net.LED_SW",
        PWM2: "net.LED_SW",
        PWM3: "net.LED_SW",
        PWM4: "net.LED_SW",
        STOP: "R10.pin1",
        REF: "R11.pin1",
        TEMP: "R12.pin1",
        GND: "net.GND",
        PAD: "net.GND",
        IOUT1: "D5.anode",
        IOUT2: "D7.anode",
        IOUT3: "D9.anode",
        IOUT4: "D11.anode",
        IOUT5: "D4.anode",
        IOUT6: "D6.anode",
        IOUT7: "D8.anode",
        IOUT8: "D10.anode",
      }}
    />

    <resistor
      name="R10"
      resistance="10kohm"
      tolerance="5%"
      footprint="0402"
      schX={-5}
      schY={-4.2}
      schOrientation="vertical"
      connections={{ pin2: "net.GND" }}
    />
    <resistor
      name="R11"
      resistance="12.1kohm"
      tolerance="1%"
      footprint="0603"
      schX={-4}
      schY={-4.2}
      schOrientation="vertical"
      connections={{ pin2: "net.GND" }}
    />
    <resistor
      name="R12"
      resistance="100kohm"
      tolerance="1%"
      footprint="0805"
      schX={-3}
      schY={-4.2}
      schOrientation="vertical"
      connections={{ pin2: "net.GND" }}
    />

    {outputLedMap.map(({ name, x, y }) => (
      <led
        key={name}
        name={name}
        manufacturerPartNumber="LW-E6SG-AAAB-JKPL-1-Z"
        datasheetUrl="https://look.ams-osram.com/m/18d196d4ddcc4d7a/original/LW-E6SG.pdf"
        footprint="led2835"
        color="white"
        schX={x}
        schY={y}
        schOrientation="vertical"
        connections={{ cathode: "net.GND" }}
      />
    ))}
  </subcircuit>
);

export default LampDriver_TPS92638_TIDA00356;
