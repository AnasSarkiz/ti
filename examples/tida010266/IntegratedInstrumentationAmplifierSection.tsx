import "tscircuit";
import type { GroupProps } from "@tscircuit/props";
import { TIDA010266InlineNetPorts } from "../../lib/utils/tida010266/TIDA010266InlineNetPorts.tsx";

type IntegratedInstrumentationAmplifierSectionProps = GroupProps & {
  schSectionName?: string;
};

/** TIDA-010266 R11-R15 network around the MSPM0 internal OPA0/OPA1. */
export const IntegratedInstrumentationAmplifierSection = (
  props: IntegratedInstrumentationAmplifierSectionProps,
) => {
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;

  return (
    <group {...props}>
      <chip
        name="OPA0"
        manufacturerPartNumber="MSPM0 Internal OPA0"
        doNotPlace
        pinLabels={{
          pin1: "+",
          pin2: "-",
          pin3: "OUT",
        }}
        schX={-2.2}
        schY={-0.4}
        symbol={
          <symbol>
            <schematicpath
              points={[
                { x: -1.35, y: 1.15 },
                { x: 1.35, y: 0 },
                { x: -1.35, y: -1.15 },
                { x: -1.35, y: 1.15 },
              ]}
              strokeWidth={0.04}
            />
            <schematictext text="-" schX={-1.02} schY={0.55} fontSize={0.3} />
            <schematictext text="+" schX={-1.02} schY={-0.55} fontSize={0.3} />
            <schematictext
              text="Internal OPA0"
              schX={0}
              schY={-1.48}
              fontSize={0.22}
            />
            <port
              name="pin2"
              pinNumber={2}
              schX={-1.85}
              schY={0.55}
              direction="left"
              schStemLength={0.6}
            />
            <port
              name="pin1"
              pinNumber={1}
              schX={-1.85}
              schY={-0.55}
              direction="left"
              schStemLength={0.6}
            />
            <port
              name="pin3"
              pinNumber={3}
              schX={1.85}
              schY={0}
              direction="right"
              schStemLength={0.6}
            />
          </symbol>
        }
      />
      <trace from=".OPA0 > .pin2" to="net.OPA0_IN0_NEG" />
      <trace from=".OPA0 > .pin1" to="net.OPA0_IN0_POS" />

      <chip
        name="OPA1"
        manufacturerPartNumber="MSPM0 Internal OPA1"
        doNotPlace
        pinLabels={{
          pin1: "+",
          pin2: "-",
          pin3: "OUT",
        }}
        schX={3.2}
        schY={-0.4}
        symbol={
          <symbol>
            <schematicpath
              points={[
                { x: -1.35, y: 1.15 },
                { x: 1.35, y: 0 },
                { x: -1.35, y: -1.15 },
                { x: -1.35, y: 1.15 },
              ]}
              strokeWidth={0.04}
            />
            <schematictext text="-" schX={-1.02} schY={0.55} fontSize={0.3} />
            <schematictext text="+" schX={-1.02} schY={-0.55} fontSize={0.3} />
            <schematictext
              text="Internal OPA1"
              schX={0}
              schY={-1.48}
              fontSize={0.22}
            />
            <port
              name="pin2"
              pinNumber={2}
              schX={-1.85}
              schY={0.55}
              direction="left"
              schStemLength={0.6}
            />
            <port
              name="pin1"
              pinNumber={1}
              schX={-1.85}
              schY={-0.55}
              direction="left"
              schStemLength={0.6}
            />
            <port
              name="pin3"
              pinNumber={3}
              schX={1.85}
              schY={0}
              direction="right"
              schStemLength={0.6}
            />
          </symbol>
        }
      />
      <trace from=".OPA1 > .pin2" to="net.OPA1_IN0_NEG" />
      <trace from=".OPA1 > .pin3" to="net.OPA1_OUT" />
      <port
        name="OPA0_OUT_PORT"
        schX={originX + 6.5}
        schY={originY - 0.4}
        direction="right"
      />
      <trace
        from=".OPA0 > .pin3"
        to=".OPA0_OUT_PORT"
        schDisplayLabel="OPA0_OUT"
      />
      <port
        name="OPA0_OUT_R12"
        schX={originX - 5}
        schY={originY + 1.6}
        direction="left"
      />
      <trace
        from=".R12 > .pin2"
        to=".OPA0_OUT_R12"
        schDisplayLabel="OPA0_OUT"
      />
      <port
        name="OPA0_OUT_R15"
        schX={originX - 2.5}
        schY={originY + 1.4}
        direction="left"
      />
      <trace
        from=".R15 > .pin1"
        to=".OPA0_OUT_R15"
        schDisplayLabel="OPA0_OUT"
      />
      <port
        name="OPA1_IN0_POS_PORT"
        schX={originX + 7}
        schY={originY - 0.95}
        direction="right"
      />
      <trace
        from=".OPA1 > .pin1"
        to=".OPA1_IN0_POS_PORT"
        schDisplayLabel="OPA1_IN0_POS"
      />
      <resistor
        name="R14"
        schSectionName={props.schSectionName}
        resistance="20k"
        footprint="0603"
        schX={-5.4}
        schY={0.8}
        connections={{ pin1: "net.VREF_1_25", pin2: "net.OPA0_IN0_NEG" }}
      />
      <resistor
        name="R12"
        schSectionName={props.schSectionName}
        resistance="499"
        footprint="0603"
        schX={-2.2}
        schY={1.6}
        connections={{ pin1: "net.OPA0_IN0_NEG" }}
      />
      <resistor
        name="R11"
        schSectionName={props.schSectionName}
        resistance="20k"
        footprint="0603"
        schX={0.5}
        schY={2.6}
        connections={{ pin1: "net.OPA0_IN0_NEG", pin2: "net.OPA1_IN0_NEG" }}
      />
      <resistor
        name="R15"
        schSectionName={props.schSectionName}
        resistance="499"
        footprint="0603"
        schX={0.5}
        schY={1.4}
        connections={{ pin2: "net.OPA1_IN0_NEG" }}
      />
      <resistor
        name="R13"
        schSectionName={props.schSectionName}
        resistance="20k"
        footprint="0603"
        schX={4.6}
        schY={1.6}
        connections={{ pin1: "net.OPA1_IN0_NEG", pin2: "net.OPA1_OUT" }}
      />
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "VREF_1_25",
            connectsTo: ".R14 > .pin1",
            schX: -6.5,
            schY: 0.8,
            direction: "left",
          },
          {
            name: "OPA0_IN0_NEG",
            connectsTo: [
              ".OPA0 > .pin2",
              ".R14 > .pin2",
              ".R12 > .pin1",
              ".R11 > .pin1",
            ],
            schX: -3.8,
            schY: 0.15,
            direction: "left",
          },
          {
            name: "OPA0_IN0_POS",
            connectsTo: ".OPA0 > .pin1",
            schX: -3.8,
            schY: -0.95,
            direction: "left",
          },
          {
            name: "OPA1_IN0_NEG",
            connectsTo: [
              ".OPA1 > .pin2",
              ".R11 > .pin2",
              ".R15 > .pin2",
              ".R13 > .pin1",
            ],
            schX: 1.6,
            schY: 0.15,
            direction: "left",
          },
          {
            name: "OPA1_OUT",
            connectsTo: [".OPA1 > .pin3", ".R13 > .pin2"],
            schX: 5,
            schY: -0.4,
            direction: "right",
          },
        ]}
      />
    </group>
  );
};

export default IntegratedInstrumentationAmplifierSection;
