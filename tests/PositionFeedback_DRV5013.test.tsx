import { beforeAll, describe, expect, test } from "bun:test";
import type {
  AnyCircuitElement,
  SchematicBox,
  SchematicComponent,
  SchematicPort,
  SourcePort,
} from "circuit-json";
import { getSourcePortConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map";
import { Circuit } from "@tscircuit/core";
import { PositionFeedback_DRV5013 } from "../lib/subcircuits/PositionFeedback_DRV5013.circuit.tsx";

const SOURCE_SCALE = 0.018278145;
const SOURCE_ORIGIN = { x: 185, y: 215 } as const;

const fromSource = (x: number, y: number) => ({
  x: (x - SOURCE_ORIGIN.x) * SOURCE_SCALE,
  y: (y - SOURCE_ORIGIN.y) * SOURCE_SCALE,
});

let circuitJson: AnyCircuitElement[];
type SourceComponent = Extract<AnyCircuitElement, { type: "source_component" }>;
type SourceNet = Extract<AnyCircuitElement, { type: "source_net" }>;
let sourceComponents: SourceComponent[];
let sourcePorts: SourcePort[];
let schematicComponents: SchematicComponent[];
let schematicPorts: SchematicPort[];
let schematicBoxes: SchematicBox[];

beforeAll(async () => {
  const circuit = new Circuit();
  circuit.add(<PositionFeedback_DRV5013 name="positionFeedback" />);
  await circuit.renderUntilSettled();
  circuitJson = circuit.getCircuitJson();
  sourceComponents = circuitJson.filter(
    (element): element is SourceComponent =>
      element.type === "source_component",
  );
  sourcePorts = circuitJson.filter(
    (element): element is SourcePort => element.type === "source_port",
  );
  schematicComponents = circuitJson.filter(
    (element): element is SchematicComponent =>
      element.type === "schematic_component",
  );
  schematicPorts = circuitJson.filter(
    (element): element is SchematicPort => element.type === "schematic_port",
  );
  schematicBoxes = circuitJson.filter(
    (element): element is SchematicBox => element.type === "schematic_box",
  );
});

const component = (name: string) => {
  const found = sourceComponents.find((element) => element.name === name);
  if (!found) throw new Error(`Missing source component ${name}`);
  return found;
};

const port = (componentName: string, pinNumber: number) => {
  const owner = component(componentName);
  const found = sourcePorts.find(
    (element) =>
      element.source_component_id === owner.source_component_id &&
      element.pin_number === pinNumber,
  );
  if (!found) throw new Error(`Missing ${componentName} pin ${pinNumber}`);
  return found;
};

const schematicComponent = (name: string) => {
  const owner = component(name);
  const found = schematicComponents.find(
    (element) => element.source_component_id === owner.source_component_id,
  );
  if (!found) throw new Error(`Missing schematic component ${name}`);
  return found;
};

const schematicPort = (componentName: string, pinNumber: number) => {
  const sourcePort = port(componentName, pinNumber);
  const found = schematicPorts.find(
    (element) => element.source_port_id === sourcePort.source_port_id,
  );
  if (!found)
    throw new Error(`Missing schematic port ${componentName}.${pinNumber}`);
  return found;
};

const capacitance = (name: string) => {
  const found = component(name);
  if (found.ftype !== "simple_capacitor") {
    throw new Error(`${name} is not a capacitor`);
  }
  return found.capacitance;
};

const resistance = (name: string) => {
  const found = component(name);
  if (found.ftype !== "simple_resistor") {
    throw new Error(`${name} is not a resistor`);
  }
  return found.resistance;
};

describe("TIDA-01389 position feedback extraction", () => {
  test("preserves source designators, values, device MPNs, and centers", () => {
    const expected = {
      U6: { xy: [180, 280], mpn: "DRV5013ADQDBZRQ1" },
      U5: { xy: [180, 140], mpn: "DRV5013ADQDBZRQ1" },
      C13: { xy: [60, 275] },
      C14: { xy: [60, 135] },
      R14: { xy: [270, 310] },
      R15: { xy: [270, 170] },
      J1: { xy: [150, 475] },
      J2: { xy: [190, 475] },
      J4: { xy: [200, 610] },
      R9: { xy: [100, 530] },
    } as const;

    for (const [name, source] of Object.entries(expected)) {
      const sourceComponent = component(name);
      const center = schematicComponent(name).center;
      const [x, y] = source.xy;
      const transformed = fromSource(x, y);
      if ("mpn" in source) {
        expect(sourceComponent.manufacturer_part_number).toBe(source.mpn);
      }
      expect(center.x).toBeCloseTo(transformed.x, 5);
      expect(center.y).toBeCloseTo(transformed.y, 5);
    }

    expect(capacitance("C13")).toBe(0.1e-6);
    expect(capacitance("C14")).toBe(0.1e-6);
    expect(resistance("R14")).toBe(10_000);
    expect(resistance("R15")).toBe(10_000);
    expect(resistance("R9")).toBe(0);

    for (const pullup of ["R14", "R15"]) {
      const centerY = schematicComponent(pullup).center.y;
      expect(schematicPort(pullup, 1).center.y).toBeLessThan(centerY);
      expect(schematicPort(pullup, 2).center.y).toBeGreaterThan(centerY);
    }
  });

  test("uses the data-sheet DBZ pin numbers and names", () => {
    for (const sensor of ["U5", "U6"]) {
      expect(port(sensor, 1).port_hints).toContain("VCC");
      expect(port(sensor, 2).port_hints).toContain("OUT");
      expect(port(sensor, 3).port_hints).toContain("GND");
    }

    for (const name of ["U5", "U6"]) {
      const center = schematicComponent(name).center;
      expect(schematicPort(name, 1).center.x).toBeLessThan(center.x);
      expect(schematicPort(name, 2).center.x).toBeGreaterThan(center.x);
      expect(schematicPort(name, 3).center.x).toBeGreaterThan(center.x);
      expect(schematicPort(name, 2).center.y).toBeGreaterThan(
        schematicPort(name, 3).center.y,
      );
    }

    expect(schematicPort("J1", 1).center.x).toBeLessThan(
      schematicComponent("J1").center.x,
    );
    expect(schematicPort("J2", 1).center.x).toBeGreaterThan(
      schematicComponent("J2").center.x,
    );
    expect(schematicPort("J4", 1).center.x).toBeLessThan(
      schematicComponent("J4").center.x,
    );
    expect(schematicPort("J4", 2).center.y).toBeGreaterThan(
      schematicPort("J4", 1).center.y,
    );
  });

  test("renders both source sections with dashed clearance boundaries", () => {
    expect(schematicBoxes).toHaveLength(2);
    for (const box of schematicBoxes) {
      expect(box.is_dashed).toBeTrue();
    }
  });

  test("uses an inline V_BAT label and native trace-to-ground connections", () => {
    for (const [name, label] of [["J4_VBAT", "V_BAT"]] as const) {
      const sourceTrace = circuitJson.find(
        (element) => element.type === "source_trace" && element.name === name,
      );
      expect(sourceTrace).toBeDefined();
      if (!sourceTrace || sourceTrace.type !== "source_trace") continue;

      expect(sourceTrace.connected_source_port_ids).toHaveLength(2);
      expect(
        circuitJson.some(
          (element) =>
            element.type === "schematic_text" &&
            element.text === label &&
            element.source_trace_id === sourceTrace.source_trace_id,
        ),
      ).toBeTrue();
    }

    for (const name of [
      "U6_GND",
      "C13_GND",
      "U5_GND",
      "C14_GND",
      "J2_GND",
      "J4_GND",
    ]) {
      const sourceTrace = circuitJson.find(
        (element) => element.type === "source_trace" && element.name === name,
      );
      expect(sourceTrace).toBeDefined();
      if (!sourceTrace || sourceTrace.type !== "source_trace") continue;

      expect(sourceTrace.connected_source_port_ids).toHaveLength(1);
      expect(sourceTrace.connected_source_net_ids).toHaveLength(1);
      const groundNet = circuitJson.find(
        (element) =>
          element.type === "source_net" &&
          element.source_net_id === sourceTrace.connected_source_net_ids[0],
      );
      expect(groundNet).toMatchObject({ name: "GND", is_ground: true });
    }

    expect(
      circuitJson.filter(
        (element) =>
          element.type === "schematic_net_label" && element.text === "GND",
      ),
    ).toHaveLength(5);
    expect(
      circuitJson.some(
        (element) =>
          element.type === "schematic_net_label" && element.text === "V_BAT",
      ),
    ).toBeFalse();
  });

  test("connects both Hall outputs and both supply rails end to end", () => {
    const connectivity =
      getSourcePortConnectivityMapFromCircuitJson(circuitJson);
    const areConnected = (pins: ReadonlyArray<readonly [string, number]>) =>
      connectivity.areAllIdsConnected(
        pins.map(([name, pinNumber]) => port(name, pinNumber).source_port_id),
      );

    expect(
      areConnected([
        ["U6", 2],
        ["R14", 1],
        ["J2", 6],
      ]),
    ).toBeTrue();
    expect(
      areConnected([
        ["J4", 1],
        ["J2", 1],
      ]),
    ).toBeTrue();

    const vBatNet = circuitJson.find(
      (element): element is SourceNet =>
        element.type === "source_net" && element.name === "V_BAT",
    );
    expect(vBatNet).toBeDefined();
    expect(
      connectivity.areAllIdsConnected([
        port("J4", 2).source_port_id,
        vBatNet!.source_net_id,
      ]),
    ).toBeTrue();
    expect(
      areConnected([
        ["U5", 2],
        ["R15", 1],
        ["J2", 7],
      ]),
    ).toBeTrue();
    expect(
      areConnected([
        ["U6", 1],
        ["U5", 1],
        ["C13", 1],
        ["C14", 1],
        ["R14", 2],
        ["R15", 2],
        ["R9", 2],
      ]),
    ).toBeTrue();
    expect(
      areConnected([
        ["R9", 1],
        ["J1", 1],
      ]),
    ).toBeTrue();
    expect(
      areConnected([
        ["U6", 3],
        ["U5", 3],
        ["C13", 2],
        ["C14", 2],
        ["J2", 1],
      ]),
    ).toBeTrue();

    const outputPorts = sourcePorts
      .filter(
        (element) =>
          element.source_component_id == null &&
          (element.name === "HALL_1" || element.name === "HALL_2"),
      )
      .map((element) => element.name);
    expect(outputPorts).toEqual(["HALL_1", "HALL_2", "HALL_1", "HALL_2"]);
  });

  test("renders without circuit errors", () => {
    const errors = circuitJson.filter((element) =>
      element.type.endsWith("_error"),
    );
    expect(errors).toEqual([]);
  });
});
