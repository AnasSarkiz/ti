/// <reference types="node" />

import assert from "node:assert/strict";
import { test } from "node:test";
import { Circuit } from "@tscircuit/core";
import { Microcontroller_MSPM0L1306 } from "../lib/subcircuits/Microcontroller_MSPM0L1306.circuit.tsx";

test("MSPM0L1306 keeps ROSC, NRST, and SWD traces aligned", async () => {
  const circuit = new Circuit({ platform: { pcbDisabled: true } });
  circuit.add(<Microcontroller_MSPM0L1306 />);
  await circuit.renderUntilSettled();

  const getPort = (name: string, pin: string) => {
    const component = circuit.db.source_component.getWhere({ name });
    assert.ok(component);
    const port = circuit.db.source_port
      .list({ source_component_id: component.source_component_id })
      .find((port) => port.port_hints?.includes(pin));
    assert.ok(port);
    const schematic = circuit.db.schematic_port.getWhere({
      source_port_id: port.source_port_id,
    });
    assert.ok(schematic);
    return { source: port, schematic };
  };

  const close = (a: number, b: number) => Math.abs(a - b) < 1e-6;
  const rosc = getPort("U1", "ROSC");
  const r2Left = getPort("R2", "pin1");
  const r2Right = getPort("R2", "pin2");
  assert.ok(close(rosc.schematic.center.y, r2Left.schematic.center.y));
  assert.ok(close(r2Left.schematic.center.y, r2Right.schematic.center.y));
  assert.ok(rosc.schematic.center.x < r2Left.schematic.center.x);
  assert.ok(r2Left.schematic.center.x < r2Right.schematic.center.x);
  assert.equal(
    rosc.source.subcircuit_connectivity_map_key,
    r2Left.source.subcircuit_connectivity_map_key,
  );
  const ground = circuit.db.source_net.getWhere({ name: "GND" });
  assert.ok(ground);
  assert.equal(
    r2Right.source.subcircuit_connectivity_map_key,
    ground.subcircuit_connectivity_map_key,
  );

  const nrst = getPort("U1", "NRST");
  const c4Top = getPort("C4", "pin1");
  const c4Ground = getPort("C4", "pin2");
  assert.ok(c4Top.schematic.center.y < nrst.schematic.center.y);
  assert.equal(
    c4Top.source.subcircuit_connectivity_map_key,
    nrst.source.subcircuit_connectivity_map_key,
  );
  assert.equal(
    c4Ground.source.subcircuit_connectivity_map_key,
    ground.subcircuit_connectivity_map_key,
  );
  const nrstEdges = circuit.db.schematic_trace
    .list()
    .filter(
      (trace) =>
        trace.subcircuit_connectivity_map_key ===
        nrst.source.subcircuit_connectivity_map_key,
    )
    .flatMap((trace) => trace.edges);
  const horizontalResetEdges = nrstEdges.filter(
    (edge) => !close(edge.from.x, edge.to.x),
  );
  assert.ok(horizontalResetEdges.length > 0);
  for (const edge of horizontalResetEdges) {
    assert.ok(close(edge.from.y, nrst.schematic.center.y));
    assert.ok(close(edge.to.y, nrst.schematic.center.y));
  }
  const resetXs = horizontalResetEdges.flatMap((edge) => [
    edge.from.x,
    edge.to.x,
  ]);
  assert.ok(close(Math.min(...resetXs), c4Top.schematic.center.x));
  assert.ok(close(Math.max(...resetXs), nrst.schematic.center.x));

  for (const [signal, pin] of [
    ["SWDIO", "pin1"],
    ["SWCLK", "pin2"],
  ]) {
    const mcu = getPort("U1", signal);
    const header = getPort("J1", pin);
    const key = mcu.source.subcircuit_connectivity_map_key;
    assert.ok(key);
    assert.equal(header.source.subcircuit_connectivity_map_key, key);
    assert.ok(close(mcu.schematic.center.y, header.schematic.center.y));
    const traces = circuit.db.schematic_trace
      .list()
      .filter((trace) => trace.subcircuit_connectivity_map_key === key);
    assert.equal(traces.length, 1);
    const edges = traces[0].edges;
    assert.ok(edges.length > 0);
    for (const edge of edges) {
      assert.ok(close(edge.from.y, mcu.schematic.center.y));
      assert.ok(close(edge.to.y, mcu.schematic.center.y));
    }
    const xs = edges.flatMap((edge) => [edge.from.x, edge.to.x]);
    assert.ok(close(Math.min(...xs), mcu.schematic.center.x));
    assert.ok(close(Math.max(...xs), header.schematic.center.x));
    assert.ok(header.schematic.schematic_component_id);
    const box = circuit.db.schematic_component.get(
      header.schematic.schematic_component_id,
    );
    assert.ok(box);
    assert.deepEqual(box.size, { width: 1.6, height: 1.1 });
    assert.equal(header.schematic.side_of_component, "left");
  }

  assert.deepEqual(
    circuit
      .getCircuitJson()
      .filter((element) => element.type.endsWith("_error")),
    [],
  );
});
