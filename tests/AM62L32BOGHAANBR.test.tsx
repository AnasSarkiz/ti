import { expect, test } from "bun:test";
import { Circuit, type AnyCircuitElement } from "tscircuit";
import { AM62L32BOGHAANBR } from "../lib/chips/AM62L32BOGHAANBR.circuit";

type ElementOfType<T extends AnyCircuitElement["type"]> = Extract<
  AnyCircuitElement,
  { type: T }
>;

const getElementsByType = <T extends AnyCircuitElement["type"]>(
  circuitJson: AnyCircuitElement[],
  type: T,
): ElementOfType<T>[] =>
  circuitJson.filter(
    (element): element is ElementOfType<T> => element.type === type,
  );

test("AM62L32BOGHAANBR uses the TI escape-routing land pattern", async () => {
  const circuit = new Circuit();
  circuit.add(<AM62L32BOGHAANBR name="U1" pcbX={1.25} pcbY={-2.5} />);
  await circuit.renderUntilSettled();

  const circuitJson = circuit.getCircuitJson();
  const pads = getElementsByType(circuitJson, "pcb_smtpad");

  expect(pads).toHaveLength(373);
  expect(
    pads.every(
      (pad) =>
        pad.shape === "circle" &&
        pad.radius === 0.127 &&
        pad.soldermask_margin === 0.0254,
    ),
  ).toBe(true);

  const sourceComponent = getElementsByType(
    circuitJson,
    "source_component",
  ).find((element) => element.name === "U1");
  expect(sourceComponent).toBeDefined();

  const sourcePorts = getElementsByType(circuitJson, "source_port");
  const pcbPorts = getElementsByType(circuitJson, "pcb_port");

  const expectedPinHints = Array.from(
    { length: 373 },
    (_, index) => `pin${index + 1}`,
  );
  expect(
    pads
      .map((pad) => pad.port_hints?.[0])
      .sort((left, right) => Number(left?.slice(3)) - Number(right?.slice(3))),
  ).toEqual(expectedPinHints);

  const getPadForPin = (pinHint: string) => {
    const sourcePort = sourcePorts.find(
      (element) =>
        element.source_component_id === sourceComponent?.source_component_id &&
        element.port_hints?.includes(pinHint),
    );
    const pcbPort = pcbPorts.find(
      (element) => element.source_port_id === sourcePort?.source_port_id,
    );
    return pads.find((pad) => pad.pcb_port_id === pcbPort?.pcb_port_id);
  };

  expect(getPadForPin("pin1")).toMatchObject({ x: -4.25, y: 3 });
  expect(getPadForPin("pin373")).toMatchObject({ x: 6.75, y: -8 });
}, 20_000);
