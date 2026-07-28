import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TLC59116 } from "../chips/TLC59116.circuit";

export const LEDDriver_TLC59116 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <TLC59116
      name="U3"
      schX={-8}
      schY={0}
      connections={{
        pin2: "net.GND",
        pin3: "net.GND",
        pin4: "net.GND",
        pin5: "net.GND",
        pin10: "net.GND",
        pin26: "net.SCL",
        pin27: "net.SDA",
        pin25: "net.RESET",
        pin19: "net.V3_3",
      }}
    />

    <schematictext schX={-8} schY={0} text="TLC59116" fontSize={0.65} />
    <resistor
      name="REXT"
      resistance="931ohm"
      footprint="0402"
      schX={-12.0}
      schY={-4.2}
      schOrientation="vertical"
      connections={{
        pin1: "U3.pin1",
        pin2: "net.GND",
      }}
    />

    <led
      name="LED15"
      footprint="led0603"
      color="red"
      schX={-4.1}
      schY={4}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin23" }}
    />

    <led
      name="LED14"
      footprint="led0603"
      color="red"
      schX={-3}
      schY={3.3}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin22" }}
    />
    <led
      name="LED13"
      footprint="led0603"
      color="red"
      schX={-2}
      schY={4}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin21" }}
    />
    <led
      name="LED12"
      footprint="led0603"
      color="red"
      schX={-0.9}
      schY={3.3}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin20" }}
    />
    <led
      name="LED11"
      footprint="led0603"
      color="red"
      schX={0}
      schY={4}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin18" }}
    />
    <led
      name="LED10"
      footprint="led0603"
      color="red"
      schX={0.9}
      schY={3.3}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin17" }}
    />
    <led
      name="LED9"
      footprint="led0603"
      color="red"
      schX={2}
      schY={4}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin16" }}
    />
    <led
      name="LED8"
      footprint="led0603"
      color="red"
      schX={2.9}
      schY={3.3}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin15" }}
    />
    <led
      name="LED7"
      footprint="led0603"
      color="red"
      schX={4}
      schY={4}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin14" }}
    />
    <led
      name="LED6"
      footprint="led0603"
      color="red"
      schX={4.9}
      schY={3.3}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin13" }}
    />
    <led
      name="LED5"
      footprint="led0603"
      color="red"
      schX={6}
      schY={4}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin12" }}
    />
    <led
      name="LED4"
      footprint="led0603"
      color="red"
      schX={6.9}
      schY={3.3}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin11" }}
    />
    <led
      name="LED3"
      footprint="led0603"
      color="red"
      schX={8}
      schY={4}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin9" }}
    />
    <led
      name="LED2"
      footprint="led0603"
      color="red"
      schX={8.9}
      schY={3.3}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin8" }}
    />
    <led
      name="LED1"
      footprint="led0603"
      color="red"
      schX={10}
      schY={4}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin7" }}
    />
    <led
      name="LED0"
      footprint="led0603"
      color="red"
      schX={10.9}
      schY={3.3}
      schOrientation="vertical"
      connections={{ anode: "net.VIN_5V", cathode: "U3.pin6" }}
    />
  </subcircuit>
);

export default LEDDriver_TLC59116;
