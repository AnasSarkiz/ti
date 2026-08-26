/// <reference types="node" />

import assert from "node:assert/strict";
import { test } from "node:test";
import { Circuit } from "@tscircuit/core";
import {
  DRV8210,
  DRV8210DSGR,
  MotorDriver_DRV8210,
  TiChipComponents,
  TiSubcircuitComponents,
} from "../index.ts";

type TestCircuit = InstanceType<typeof Circuit>;

function getPort(circuit: TestCircuit, componentName: string, pin: string) {
  const component = circuit.db.source_component.getWhere({
    name: componentName,
  });
  assert.ok(component, componentName);
  const port = circuit.db.source_port
    .list({ source_component_id: component.source_component_id })
    .find((candidate) => candidate.port_hints?.includes(pin));
  assert.ok(port, componentName + "." + pin);
  return port;
}

function getConnectedIds(circuit: TestCircuit, start: string) {
  const connected = new Set([start]);
  let previousSize = 0;
  while (connected.size !== previousSize) {
    previousSize = connected.size;
    for (const trace of circuit.db.source_trace.list()) {
      const ids = [
        ...trace.connected_source_port_ids,
        ...trace.connected_source_net_ids,
      ];
      if (ids.some((id) => connected.has(id))) {
        for (const id of ids) connected.add(id);
      }
    }
  }
  return connected;
}

function getSchematicPort(
  circuit: TestCircuit,
  component: string,
  pin: string,
) {
  const port = circuit.db.schematic_port.getWhere({
    source_port_id: getPort(circuit, component, pin).source_port_id,
  });
  assert.ok(port, component + "." + pin + " schematic port");
  return port;
}

function assertPinNet(
  circuit: TestCircuit,
  componentName: string,
  pin: string,
  netName: string,
) {
  const net = circuit.db.source_net.getWhere({ name: netName });
  assert.ok(net, netName);
  assert.ok(
    getConnectedIds(
      circuit,
      getPort(circuit, componentName, pin).source_port_id,
    ).has(net.source_net_id),
    componentName + "." + pin + " must connect to " + netName,
  );
}

function assertNoErrors(circuit: TestCircuit) {
  assert.deepEqual(
    circuit
      .getCircuitJson()
      .filter((element) => element.type.endsWith("_error")),
    [],
  );
}

test("DRV8210 exports the DSG pinout, nine pads, and a compact pin-spaced symbol", async () => {
  assert.equal(TiChipComponents.DRV8210, DRV8210);
  assert.equal(TiSubcircuitComponents.MotorDriver_DRV8210, MotorDriver_DRV8210);

  for (const Chip of [DRV8210DSGR, DRV8210]) {
    const circuit = new Circuit();
    circuit.add(
      <board width={12} height={12} routingDisabled>
        <Chip name="U1" />
      </board>,
    );
    await circuit.renderUntilSettled();
    assertNoErrors(circuit);

    const expected = [
      "VM",
      "OUT1",
      "OUT2",
      "GND",
      "IN2",
      "IN1",
      "MODE",
      "VCC",
      "EP",
    ];
    expected.forEach((name, index) => {
      assert.equal(getPort(circuit, "U1", name).pin_number, index + 1);
    });
    assert.equal(getPort(circuit, "U1", "EN").pin_number, 5);
    assert.equal(getPort(circuit, "U1", "PH").pin_number, 6);
    assert.equal(getPort(circuit, "U1", "PAD").pin_number, 9);
    assert.deepEqual(
      circuit.db.source_component.getWhere({ name: "U1" })
        ?.supplier_part_numbers,
      { jlcpcb: ["C3681199"] },
    );
    assert.equal(circuit.db.pcb_smtpad.list().length, 9);
    for (const pin of expected) {
      assert.equal(
        circuit.db.pcb_port.list({
          source_port_id: getPort(circuit, "U1", pin).source_port_id,
        }).length,
        1,
      );
    }
    const thermalPort = circuit.db.pcb_port.getWhere({
      source_port_id: getPort(circuit, "U1", "EP").source_port_id,
    });
    assert.ok(thermalPort);
    const pad = circuit.db.pcb_smtpad.getWhere({
      pcb_port_id: thermalPort.pcb_port_id,
    });
    assert.ok(pad && pad.shape === "rect");
    assert.ok(Math.abs(pad.width - 1.8) < 0.001);
    assert.ok(Math.abs(pad.height - 0.9) < 0.001);

    const symbolId = getSchematicPort(
      circuit,
      "U1",
      "VM",
    ).schematic_component_id;
    assert.ok(symbolId);
    const symbol = circuit.db.schematic_component.get(symbolId);
    assert.ok(symbol);
    assert.equal(symbol.size.width, 2.8);
    assert.equal(symbol.size.height, 1.5);
    for (const [first, second, axis] of [
      ["IN1", "IN2", "y"],
      ["IN2", "MODE", "y"],
      ["VM", "OUT1", "y"],
      ["OUT1", "OUT2", "y"],
      ["GND", "EP", "x"],
    ] as const) {
      const spacing = Math.abs(
        getSchematicPort(circuit, "U1", first).center[axis] -
          getSchematicPort(circuit, "U1", second).center[axis],
      );
      assert.ok(
        Math.abs(spacing - 0.5) < 1e-6,
        first + "/" + second + " spacing",
      );
    }
  }
});

test("PWM application keeps its seven nets separate and external blocks off the PCB", async () => {
  const circuit = new Circuit();
  circuit.add(
    <board width={16} height={12} routingDisabled>
      <MotorDriver_DRV8210 name="Driver" />
    </board>,
  );
  await circuit.renderUntilSettled();
  assertNoErrors(circuit);

  for (const [pin, net] of [
    ["IN1", "PWM1"],
    ["IN2", "PWM2"],
    ["OUT1", "OUT1"],
    ["OUT2", "OUT2"],
    ["VM", "VM"],
    ["VCC", "VCC"],
    ["MODE", "GND"],
    ["GND", "GND"],
    ["EP", "GND"],
  ]) {
    assertPinNet(circuit, "U1", pin, net);
  }
  assertPinNet(circuit, "C1", "pin1", "VM");
  assertPinNet(circuit, "C2", "pin1", "VCC");
  for (const name of ["C1", "C2"]) {
    assertPinNet(circuit, name, "pin2", "GND");
    const capacitor = circuit.db.source_component.getWhere({ name });
    assert.ok(capacitor?.ftype === "simple_capacitor");
    assert.equal(capacitor.capacitance, 1e-7);
  }

  const nets = circuit.db.source_net.list();
  assert.equal(nets.length, 7);
  for (const net of nets) {
    const connected = getConnectedIds(circuit, net.source_net_id);
    assert.equal(
      nets.filter((candidate) => connected.has(candidate.source_net_id)).length,
      1,
      net.name + " is shorted to another net",
    );
  }

  for (const title of ["Controller", "BDC"]) {
    assert.ok(circuit.db.schematic_text.getWhere({ text: title }));
    const group = circuit.db.source_group.getWhere({ name: title });
    assert.ok(group);
    const box = circuit.db.schematic_component.getWhere({
      source_group_id: group.source_group_id,
    });
    assert.ok(box?.is_schematic_group && box.is_box_with_pins);
    const ports = circuit.db.schematic_port.list({
      schematic_component_id: box.schematic_component_id,
    });
    assert.equal(ports.length, 2);
    assert.ok(
      Math.abs(Math.abs(ports[0].center.y - ports[1].center.y) - 0.5) < 1e-6,
    );
    for (const port of ports) {
      const signal = port.display_pin_label;
      assert.ok(signal);
      const driverPin =
        signal === "PWM1" ? "IN1" : signal === "PWM2" ? "IN2" : signal;
      assert.ok(
        Math.abs(
          port.center.y - getSchematicPort(circuit, "U1", driverPin).center.y,
        ) < 1e-6,
        title + "." + signal + " must align with U1." + driverPin,
      );
      assert.equal(
        circuit.db.pcb_port.list({ source_port_id: port.source_port_id })
          .length,
        0,
        title + " must not create physical PCB ports",
      );
    }
  }
  assert.deepEqual(
    circuit.db.source_component
      .list()
      .map((component) => component.name)
      .sort(),
    ["C1", "C2", "U1"],
  );
  assert.equal(circuit.db.pcb_component.list().length, 3);
});

test("external signal traces have inline labels and no wire crossings", async () => {
  const circuit = new Circuit();
  circuit.add(
    <board width={16} height={12} routingDisabled>
      <MotorDriver_DRV8210 name="Driver" />
    </board>,
  );
  await circuit.renderUntilSettled();
  assertNoErrors(circuit);

  type Point = { x: number; y: number };
  const orientation = (a: Point, b: Point, c: Point) =>
    (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const traces = circuit.db.schematic_trace.list();

  for (const [name, label] of [
    ["CONTROLLER_PWM1", "PWM1"],
    ["CONTROLLER_PWM2", "PWM2"],
    ["MOTOR_OUT1", "OUT1"],
    ["MOTOR_OUT2", "OUT2"],
  ]) {
    const sourceTrace = circuit.db.source_trace.getWhere({ name });
    assert.ok(sourceTrace);
    assert.equal(sourceTrace.connected_source_port_ids.length, 2);
    assert.ok(
      circuit.db.schematic_text
        .list()
        .some(
          (text) =>
            text.text === label &&
            text.source_trace_id === sourceTrace.source_trace_id,
        ),
      label + " must be an inline trace label",
    );
    assert.equal(
      circuit.db.schematic_net_label.list({ text: label }).length,
      0,
      label + " must not use an anchored net label",
    );

    const signalTraces = traces.filter(
      (trace) =>
        trace.subcircuit_connectivity_map_key ===
        sourceTrace.subcircuit_connectivity_map_key,
    );
    assert.ok(signalTraces.length > 0, label + " must have a routed wire");
    const otherEdges = traces
      .filter(
        (trace) =>
          trace.subcircuit_connectivity_map_key !==
          sourceTrace.subcircuit_connectivity_map_key,
      )
      .flatMap((trace) => trace.edges);
    for (const edge of signalTraces.flatMap((trace) => trace.edges)) {
      assert.ok(!edge.is_crossing, label + " has a crossing marker");
      for (const other of otherEdges) {
        const crosses =
          orientation(edge.from, edge.to, other.from) *
            orientation(edge.from, edge.to, other.to) <
            -1e-9 &&
          orientation(other.from, other.to, edge.from) *
            orientation(other.from, other.to, edge.to) <
            -1e-9;
        assert.ok(!crosses, label + " crosses another net");
      }
    }
  }
});

test("a parent circuit can connect to all seven external driver signals", async () => {
  const circuit = new Circuit();
  const signals = ["IN1", "IN2", "OUT1", "OUT2", "VM", "VCC", "GND"];
  circuit.add(
    <board width={32} height={16} routingDisabled>
      <MotorDriver_DRV8210 name="Driver" pcbX={-4} />
      <chip
        name="U2"
        footprint="pinrow7"
        pcbX={6}
        pcbY={5}
        schX={8}
        pinLabels={Object.fromEntries(
          signals.map((signal, index) => ["pin" + (index + 1), signal]),
        )}
        connections={Object.fromEntries(
          signals.map((signal) => [signal, ".Driver .U1 > ." + signal]),
        )}
      />
    </board>,
  );
  await circuit.renderUntilSettled();
  assertNoErrors(circuit);
  for (const signal of signals) {
    assert.ok(
      getConnectedIds(
        circuit,
        getPort(circuit, "U1", signal).source_port_id,
      ).has(getPort(circuit, "U2", signal).source_port_id),
    );
  }
});
