import "tscircuit";
import { ATL431LIBIDBZR } from "../chips/ATL431LIBIDBZR.circuit.tsx";
import { TIDA010266InlineNetPorts } from "../utils/tida010266/TIDA010266InlineNetPorts.tsx";
import type { TIDA010266SectionedSubcircuitProps } from "../utils/tida010266/TIDA010266.types.ts";

/** TIDA-010266 U3/R3/C2/C3 precision 2.5 V shunt-reference stage. */
export const VoltageReference_ATL431LI_TIDA010266 = (
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
      <ATL431LIBIDBZR
        name="U3"
        schSectionName={props.schSectionName}
        schX={0}
        schY={0}
        connections={{
          CATHODE: "net.VREF_2_5",
          REF: "net.VREF_2_5",
          ANODE: "net.GND",
        }}
      />
      <resistor
        name="R3"
        schSectionName={props.schSectionName}
        resistance="330"
        footprint="0603"
        schX={0}
        schY={2.3}
        schOrientation="vertical"
        connections={{ pin1: "net.V3_3", pin2: "net.VREF_2_5" }}
      />
      {[
        ["C2", 2],
        ["C3", 3.4],
      ].map(([name, schX]) => (
        <capacitor
          key={name}
          name={name as string}
          schSectionName={props.schSectionName}
          capacitance="4.7uF"
          maxVoltageRating="16V"
          footprint="0603"
          schX={schX as number}
          schY={-0.35}
          schOrientation="vertical"
          connections={{ pin1: "net.VREF_2_5", pin2: "net.GND" }}
        />
      ))}
      <netlabel net="GND" connectsTo=".U3 > .ANODE" anchorSide="top" />
      <port
        name="GND"
        schX={originX}
        schY={originY - 2.4}
        direction="down"
        connectsTo="net.GND"
      />
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "V3_3",
            connectsTo: ".R3 > .pin1",
            inlineLabelConnectsTo: false,
            schX: 0,
            schY: 3.2,
            direction: "up",
          },
          {
            name: "VREF_2_5",
            connectsTo: [
              ".U3 > .CATHODE",
              ".U3 > .REF",
              ".R3 > .pin2",
              ".C2 > .pin1",
              ".C3 > .pin1",
            ],
            inlineLabelConnectsTo: false,
            schX: 3.5,
            schY: 0.35,
            direction: "right",
          },
        ]}
      />
    </subcircuit>
  );
};

export default VoltageReference_ATL431LI_TIDA010266;
