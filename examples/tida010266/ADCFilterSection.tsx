import "tscircuit";
import type { GroupProps } from "@tscircuit/props";
import { TIDA010266InlineNetPorts } from "../../lib/utils/tida010266/TIDA010266InlineNetPorts.tsx";

type ADCFilterSectionProps = GroupProps & { schSectionName?: string };

/** TIDA-010266 R19/R20/C17/C18 200-ohm, 100-pF ADC input filters. */
export const ADCFilterSection = (props: ADCFilterSectionProps) => {
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;

  return (
    <group {...props}>
      <resistor
        name="R19"
        schSectionName={props.schSectionName}
        resistance="200"
        footprint="0603"
        schX={-2.7}
        schY={0.9}
        connections={{ pin1: "net.PRESSURE", pin2: "net.ADC_PRESSURE" }}
      />
      <capacitor
        name="C17"
        schSectionName={props.schSectionName}
        capacitance="100pF"
        maxVoltageRating="100V"
        footprint="0603"
        schX={-1}
        schY={0.1}
        schOrientation="vertical"
        connections={{ pin1: "net.ADC_PRESSURE", pin2: "net.GND" }}
      />
      <resistor
        name="R20"
        schSectionName={props.schSectionName}
        resistance="200"
        footprint="0603"
        schX={2.7}
        schY={0.9}
        connections={{ pin1: "net.OSCILLATIONS", pin2: "net.ADC_OSCILLATIONS" }}
      />
      <capacitor
        name="C18"
        schSectionName={props.schSectionName}
        capacitance="100pF"
        maxVoltageRating="100V"
        footprint="0603"
        schX={4.4}
        schY={0.1}
        schOrientation="vertical"
        connections={{ pin1: "net.ADC_OSCILLATIONS", pin2: "net.GND" }}
      />
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "PRESSURE",
            connectsTo: ".R19 > .pin1",
            schX: -4,
            schY: 0.9,
            direction: "left",
          },
          {
            name: "ADC_PRESSURE",
            connectsTo: [".R19 > .pin2", ".C17 > .pin1"],
            schX: 0,
            schY: 0.9,
            direction: "right",
          },
          {
            name: "OSCILLATIONS",
            connectsTo: ".R20 > .pin1",
            schX: 1.4,
            schY: 0.9,
            direction: "left",
          },
          {
            name: "ADC_OSCILLATIONS",
            connectsTo: [".R20 > .pin2", ".C18 > .pin1"],
            schX: 5.5,
            schY: 0.9,
            direction: "right",
          },
          {
            name: "GND",
            connectsTo: [".C17 > .pin2", ".C18 > .pin2"],
            schX: 1.7,
            schY: -1.5,
            direction: "down",
          },
        ]}
      />
    </group>
  );
};

export default ADCFilterSection;
