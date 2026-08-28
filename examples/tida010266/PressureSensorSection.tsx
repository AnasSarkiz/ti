import "tscircuit";
import type { GroupProps } from "@tscircuit/props";
import { SMPP2_03 } from "../../lib/chips/SMPP2_03.circuit.tsx";
import { TIDA010266InlineNetPorts } from "../../lib/utils/tida010266/TIDA010266InlineNetPorts.tsx";

type PressureSensorSectionProps = GroupProps & { schSectionName?: string };

/** TIDA-010266 U7/R22 Omron bridge-pressure-sensor stage. */
export const PressureSensorSection = (props: PressureSensorSectionProps) => {
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;

  return (
    <group {...props}>
      <SMPP2_03
        name="U7"
        schSectionName={props.schSectionName}
        schX={1.5}
        schY={0}
        connections={{
          VOUT_POS: "net.BRIDGE_POS",
          VOUT_NEG: "net.BRIDGE_NEG",
          GND: "net.IBIAS_FB",
        }}
      />
      <resistor
        name="R22"
        schSectionName={props.schSectionName}
        resistance="2.49k"
        tolerance="0.1%"
        footprint="0603"
        schX={5.3}
        schY={-1.6}
        schOrientation="vertical"
        connections={{ pin1: "net.IBIAS_FB", pin2: "net.GND" }}
      />
      <port
        name="SENSOR_DRIVE"
        schX={originX - 0.5}
        schY={originY + 0.45}
        direction="left"
        connectsTo="net.SENSOR_DRIVE"
      />
      <trace
        path={[".SENSOR_DRIVE", ".U7 > .ICC", ".U7 > .N_SUB"]}
        schDisplayLabel=" "
      />
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "BRIDGE_POS",
            connectsTo: ".U7 > .VOUT_POS",
            schX: 7.2,
            schY: 0.45,
            direction: "right",
          },
          {
            name: "BRIDGE_NEG",
            connectsTo: ".U7 > .VOUT_NEG",
            schX: 7.2,
            schY: 0,
            direction: "right",
          },
          {
            name: "IBIAS_FB",
            connectsTo: [".U7 > .GND", ".R22 > .pin1"],
            schX: 7.2,
            schY: -0.45,
            direction: "right",
          },
          {
            name: "GND",
            connectsTo: ".R22 > .pin2",
            schX: 5.3,
            schY: -2.8,
            direction: "down",
          },
        ]}
      />
    </group>
  );
};

export default PressureSensorSection;
