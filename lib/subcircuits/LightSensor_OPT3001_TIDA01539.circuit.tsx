import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { OPT3001IDNPRQ1 } from "../chips/OPT3001IDNPRQ1.circuit.tsx";

type SensorUnitProps = {
  reference: "U4" | "U5";
  capacitorReference: "C9" | "C10";
  address: "1000100" | "1000101";
  interruptNet: "OPT_B" | "OPT_F";
  addressNet: "GND" | "V3P3";
  y: number;
};

const SensorUnit = ({
  reference,
  capacitorReference,
  address,
  interruptNet,
  addressNet,
  y,
}: SensorUnitProps) => (
  <subcircuit
    name={`${reference}Sensor`}
    routingDisabled
    schMaxTraceDistance="1.5mm"
    schX={0}
    schY={y}
  >
    <net name="GND" isGroundNet />
    <OPT3001IDNPRQ1
      name={reference}
      schX={0}
      schY={0}
      connections={{
        VDD: "net.V3P3",
        ADDR: `net.${addressNet}`,
        GND: "net.GND",
        PAD: "net.GND",
        SCL: "net.SCL",
        SDA: "net.SDA",
        INT: `net.${interruptNet}`,
      }}
    />
    <capacitor
      name={capacitorReference}
      capacitance="0.1uF"
      maxVoltageRating="16V"
      footprint="0603"
      schX={-3}
      schY={0}
      schOrientation="vertical"
      connections={{ pin1: "net.V3P3", pin2: "net.GND" }}
    />

    <schematictext
      schX={0}
      schY={2.1}
      text={`I2C Addr: ${address}`}
      fontSize={0.2}
    />
  </subcircuit>
);

/** Ambient-light sensor circuits from TIDA-01539 sheet 2. */
export const LightSensor_OPT3001_TIDA01539 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props}>
    <SensorUnit
      reference="U4"
      capacitorReference="C9"
      address="1000100"
      interruptNet="OPT_B"
      addressNet="GND"
      y={3.2}
    />
    <SensorUnit
      reference="U5"
      capacitorReference="C10"
      address="1000101"
      interruptNet="OPT_F"
      addressNet="V3P3"
      y={-3.2}
    />
  </subcircuit>
);

export default LightSensor_OPT3001_TIDA01539;
