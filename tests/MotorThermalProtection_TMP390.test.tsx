import { expect, test } from "bun:test";
import { Circuit } from "@tscircuit/core";
import {
  TMP390AQDRLRQ1,
  TMP390AQDRLRQ1_PIN_LABELS,
} from "../lib/chips/TMP390AQDRLRQ1.circuit.tsx";
import {
  MotorThermalProtection_TMP390,
  TMP390_FIGURE_8_3_DEFAULTS,
} from "../lib/subcircuits/MotorThermalProtection_TMP390.circuit.tsx";

const renderMotorThermalProtection = async () => {
  const circuit = new Circuit();
  circuit.add(<MotorThermalProtection_TMP390 name="thermalProtection" />);
  await circuit.renderUntilSettled();
  return circuit.getCircuitJson();
};

test("TMP390-Q1 pin map and Figure 8-3 thresholds match the datasheet", () => {
  expect(TMP390AQDRLRQ1_PIN_LABELS).toEqual({
    pin1: "SETA",
    pin2: "SETB",
    pin3: "GND",
    pin4: "OUTB",
    pin5: "VDD",
    pin6: "OUTA",
  });

  expect(TMP390_FIGURE_8_3_DEFAULTS).toEqual({
    hotTripCelsius: 90,
    hotResetCelsius: 80,
    coldTripCelsius: -25,
    coldResetCelsius: -15,
    hysteresisCelsius: 10,
    rSetAOhms: 78_700,
    rSetBOhms: 215_000,
    outputPullupOhms: 10_000,
    bypassCapacitanceFarads: 0.1e-6,
    sensorSupplyVolts: 3,
    outputPullupSupplyVolts: 3.3,
  });
  expect(
    TMP390_FIGURE_8_3_DEFAULTS.hotTripCelsius -
      TMP390_FIGURE_8_3_DEFAULTS.hysteresisCelsius,
  ).toBe(TMP390_FIGURE_8_3_DEFAULTS.hotResetCelsius);
  expect(
    TMP390_FIGURE_8_3_DEFAULTS.coldTripCelsius +
      TMP390_FIGURE_8_3_DEFAULTS.hysteresisCelsius,
  ).toBe(TMP390_FIGURE_8_3_DEFAULTS.coldResetCelsius);
});

test("TMP390AQDRLRQ1 uses the datasheet DRL land pattern", async () => {
  const circuit = new Circuit();
  circuit.add(<TMP390AQDRLRQ1 name="U1" pcbX={0} pcbY={0} />);
  await circuit.renderUntilSettled();

  const pads = circuit
    .getCircuitJson()
    .filter(
      (element) => element.type === "pcb_smtpad" && element.shape === "rect",
    )
    .map((pad) => ({
      pin: pad.port_hints?.[0],
      x: pad.x,
      y: pad.y,
      width: pad.width,
      height: pad.height,
    }));

  expect(pads).toEqual([
    { pin: "pin1", x: -0.74, y: 0.5, width: 0.67, height: 0.3 },
    { pin: "pin2", x: -0.74, y: 0, width: 0.67, height: 0.3 },
    { pin: "pin3", x: -0.74, y: -0.5, width: 0.67, height: 0.3 },
    { pin: "pin4", x: 0.74, y: -0.5, width: 0.67, height: 0.3 },
    { pin: "pin5", x: 0.74, y: 0, width: 0.67, height: 0.3 },
    { pin: "pin6", x: 0.74, y: 0.5, width: 0.67, height: 0.3 },
  ]);
});

test("MotorThermalProtection_TMP390 uses the datasheet component values", async () => {
  const circuitJson = await renderMotorThermalProtection();
  const sourceComponents = circuitJson.filter(
    (element) => element.type === "source_component",
  );
  const component = (name: string) => {
    const match = sourceComponents.find((element) => element.name === name);
    expect(match).toBeDefined();
    return match!;
  };

  expect(component("U1").manufacturer_part_number).toBe("TMP390AQDRLRQ1");
  expect(component("C1")).toMatchObject({ capacitance: 0.1e-6 });
  expect(component("R1")).toMatchObject({ resistance: 78_700 });
  expect(component("R2")).toMatchObject({ resistance: 215_000 });
  expect(component("R3")).toMatchObject({ resistance: 10_000 });
  expect(component("R4")).toMatchObject({ resistance: 10_000 });
});

test("MotorThermalProtection_TMP390 exposes and connects every interface net", async () => {
  const circuitJson = await renderMotorThermalProtection();
  const sourceComponents = circuitJson.filter(
    (element) => element.type === "source_component",
  );
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  );

  const componentId = (name: string) => {
    const component = sourceComponents.find((element) => element.name === name);
    expect(component).toBeDefined();
    return component!.source_component_id;
  };
  const portKey = (componentName: string | null, portName: string) => {
    const sourceComponentId = componentName ? componentId(componentName) : null;
    const port = sourcePorts.find(
      (element) =>
        element.source_component_id === sourceComponentId &&
        element.name === portName,
    );
    expect(port).toBeDefined();
    return port!.subcircuit_connectivity_map_key;
  };
  const schematicPortCenter = (
    componentName: string | null,
    portName: string,
  ) => {
    const sourceComponentId = componentName ? componentId(componentName) : null;
    const sourcePort = sourcePorts.find(
      (element) =>
        element.source_component_id === sourceComponentId &&
        element.name === portName,
    );
    expect(sourcePort).toBeDefined();
    const schematicPort = circuitJson.find(
      (element) =>
        element.type === "schematic_port" &&
        element.source_port_id === sourcePort!.source_port_id,
    );
    expect(schematicPort).toBeDefined();
    if (!schematicPort || schematicPort.type !== "schematic_port") {
      throw new Error(`Missing schematic port ${componentName}.${portName}`);
    }
    return schematicPort.center;
  };
  const expectSameNet = (
    expected: [string | null, string],
    ...members: Array<[string | null, string]>
  ) => {
    const expectedKey = portKey(...expected);
    for (const member of members) {
      expect(portKey(...member)).toBe(expectedKey);
    }
  };

  expectSameNet([null, "VDD"], ["U1", "VDD"], ["C1", "pin1"]);
  expectSameNet([null, "VDDIO"], ["R3", "pin1"], ["R4", "pin1"]);
  expectSameNet(
    [null, "GND"],
    ["U1", "GND"],
    ["C1", "pin2"],
    ["R1", "pin2"],
    ["R2", "pin2"],
  );
  expectSameNet(["U1", "SETA"], ["R1", "pin1"]);
  expectSameNet(["U1", "SETB"], ["R2", "pin1"]);
  expectSameNet([null, "OUTA"], ["U1", "OUTA"], ["R3", "pin2"]);
  expectSameNet([null, "OUTB"], ["U1", "OUTB"], ["R4", "pin2"]);

  const groundY = schematicPortCenter(null, "GND").y;
  expect(schematicPortCenter("R1", "pin2").y).toBeCloseTo(groundY);
  expect(schematicPortCenter("R2", "pin2").y).toBeCloseTo(groundY);
  expect(schematicPortCenter("U1", "OUTA").y).toBeCloseTo(
    schematicPortCenter(null, "OUTA").y,
  );
  expect(schematicPortCenter("U1", "OUTB").y).toBeCloseTo(
    schematicPortCenter(null, "OUTB").y,
  );

  expect(
    circuitJson.filter(
      (element) =>
        element.type.startsWith("schematic_") &&
        element.type.endsWith("_error"),
    ),
  ).toEqual([]);
});
