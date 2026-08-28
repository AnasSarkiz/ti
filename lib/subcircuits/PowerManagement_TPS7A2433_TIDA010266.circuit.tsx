import "tscircuit";
import { TPS7A2433DBVR } from "../chips/TPS7A2433DBVR.circuit.tsx";
import { TIDA010266InlineNetPorts } from "../utils/tida010266/TIDA010266InlineNetPorts.tsx";
import type { TIDA010266SectionedSubcircuitProps } from "../utils/tida010266/TIDA010266.types.ts";

/** TIDA-010266 U1/C1/C5 3.3 V input regulator stage. */
export const PowerManagement_TPS7A2433_TIDA010266 = (
  props: TIDA010266SectionedSubcircuitProps,
) => {
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;

  return (
    <subcircuit
      {...props}
      schTraceAutoLabelEnabled={false}
      schMaxTraceDistance="1000mm"
    >
      <TPS7A2433DBVR
        name="U1"
        schSectionName={props.schSectionName}
        schX={0}
        schY={0}
        connections={{
          IN: "net.VIN",
          EN: "net.VIN",
          OUT: "net.V3_3",
        }}
      />
      <capacitor
        name="C5"
        schSectionName={props.schSectionName}
        capacitance="1uF"
        maxVoltageRating="50V"
        footprint="0805"
        schX={-3.2}
        schY={-0.4}
        schOrientation="vertical"
        connections={{ pin1: "net.VIN" }}
      />
      <capacitor
        name="C1"
        schSectionName={props.schSectionName}
        capacitance="4.7uF"
        maxVoltageRating="16V"
        footprint="0603"
        schX={3.2}
        schY={-0.4}
        schOrientation="vertical"
        connections={{ pin1: "net.V3_3" }}
      />
      <netlabel net="GND" connectsTo=".U1 > .GND" anchorSide="top" />
      <netlabel net="GND" connectsTo=".C5 > .pin2" anchorSide="top" />
      <netlabel net="GND" connectsTo=".C1 > .pin2" anchorSide="top" />
      <port
        name="GND"
        schX={originX}
        schY={originY - 2}
        direction="down"
        connectsTo="net.GND"
      />
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "VIN",
            connectsTo: [".U1 > .IN", ".U1 > .EN", ".C5 > .pin1"],
            inlineLabelConnectsTo: false,
            schX: -2.2,
            schY: 0.7,
            direction: "left",
          },
          {
            name: "V3_3",
            connectsTo: [".U1 > .OUT", ".C1 > .pin1"],
            inlineLabelConnectsTo: false,
            schX: 2.2,
            schY: 0.7,
            direction: "right",
          },
        ]}
      />
    </subcircuit>
  );
};

export default PowerManagement_TPS7A2433_TIDA010266;
