/// <reference types="node" />

import assert from "node:assert/strict";
import { test } from "node:test";
import { Circuit } from "@tscircuit/core";
import {
  AWR1843ARBGALPQ1,
  AWR1843ARBGALPQ1_BALLS,
  RADAR_FRONT_END_INTERFACE_NETS,
  RadarClock_FW4000044Q,
  RadarFrontEndProcessing_TIDEP01024,
  RadarQspiFlash_MX25V1635FZNQ,
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
  assert.ok(port, `${componentName}.${pin}`);
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

function assertPinsConnected(
  circuit: TestCircuit,
  a: [component: string, pin: string],
  b: [component: string, pin: string],
) {
  const aPort = getPort(circuit, ...a);
  const bPort = getPort(circuit, ...b);
  assert.ok(
    getConnectedIds(circuit, aPort.source_port_id).has(bPort.source_port_id),
    `${a.join(".")} must connect to ${b.join(".")}`,
  );
}

function assertPinNet(
  circuit: TestCircuit,
  component: string,
  pin: string,
  netName: string,
) {
  const net = circuit.db.source_net.getWhere({ name: netName });
  assert.ok(net, netName);
  assert.ok(
    getConnectedIds(
      circuit,
      getPort(circuit, component, pin).source_port_id,
    ).has(net.source_net_id),
    `${component}.${pin} must connect to ${netName}`,
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

test("radar exports the exact 180-ball ALP device", async () => {
  assert.equal(TiChipComponents.AWR1843ARBGALPQ1, AWR1843ARBGALPQ1);
  assert.equal(
    TiSubcircuitComponents.RadarFrontEndProcessing_TIDEP01024,
    RadarFrontEndProcessing_TIDEP01024,
  );
  assert.equal(AWR1843ARBGALPQ1_BALLS.length, 180);
  assert.equal(
    new Set(AWR1843ARBGALPQ1_BALLS.map(({ ball }) => ball)).size,
    180,
  );

  const circuit = new Circuit();
  circuit.add(
    <board routingDisabled schematicDisabled>
      <AWR1843ARBGALPQ1 name="U2" />
    </board>,
  );
  await circuit.renderUntilSettled();
  assertNoErrors(circuit);

  const component = circuit.db.source_component.getWhere({ name: "U2" });
  assert.ok(component);
  assert.equal(
    circuit.db.source_port.list({
      source_component_id: component.source_component_id,
    }).length,
    180,
  );
  assert.equal(circuit.db.pcb_smtpad.list().length, 180);
  assert.equal(getPort(circuit, "U2", "A1").pin_number, 1);
  assert.equal(getPort(circuit, "U2", "J2").pin_number, 86);
  assert.equal(getPort(circuit, "U2", "V18").pin_number, 180);
});

test("40 MHz radar clock matches the TI crystal connectivity", async () => {
  const circuit = new Circuit({
    platform: { pcbDisabled: true, routingDisabled: true },
  });
  circuit.add(<RadarClock_FW4000044Q />);
  await circuit.renderUntilSettled();
  assertNoErrors(circuit);

  assert.deepEqual(
    circuit.db.source_component
      .list()
      .map(({ name }) => name)
      .sort(),
    ["C14", "C71", "Y1"],
  );
  assertPinsConnected(circuit, ["Y1", "XTAL_P"], ["C14", "pin1"]);
  assertPinsConnected(circuit, ["Y1", "XTAL_N"], ["C71", "pin1"]);
  assertPinNet(circuit, "Y1", "XTAL_P", "AR_XTAL_P");
  assertPinNet(circuit, "Y1", "XTAL_N", "AR_XTAL_N");
  assertPinNet(circuit, "Y1", "CASE_1", "GND");
  assertPinNet(circuit, "Y1", "CASE_2", "GND");
});

test("QSPI flash preserves the five series paths and two named power islands", async () => {
  const circuit = new Circuit({
    platform: { pcbDisabled: true, routingDisabled: true },
  });
  circuit.add(<RadarQspiFlash_MX25V1635FZNQ />);
  await circuit.renderUntilSettled();
  assertNoErrors(circuit);

  assert.deepEqual(
    circuit.db.source_component
      .list()
      .map(({ name }) => name)
      .sort(),
    [
      "C100",
      "C101",
      "R43",
      "R44",
      "R45",
      "R46",
      "R47",
      "R48",
      "R49",
      "R6",
      "U9",
    ].sort(),
  );
  assertPinsConnected(circuit, ["U9", "CS"], ["R43", "pin1"]);
  assertPinsConnected(circuit, ["U9", "SCLK"], ["R47", "pin2"]);
  assertPinsConnected(circuit, ["U9", "SI_SIO0"], ["R6", "pin2"]);
  assertPinsConnected(circuit, ["U9", "SO_SIO1"], ["R46", "pin2"]);
  assertPinsConnected(circuit, ["U9", "WP_SIO2"], ["R48", "pin2"]);
  assertPinsConnected(circuit, ["U9", "HOLD_SIO3"], ["R49", "pin2"]);
  assertPinNet(circuit, "R47", "pin1", "AR_QSPI_CLK");
  assertPinNet(circuit, "R6", "pin1", "AR_QSPI_D0");
  assertPinNet(circuit, "R46", "pin1", "AR_QSPI_D1");
  assertPinNet(circuit, "R43", "pin2", "PMIC_3V3");
  assertPinNet(circuit, "U9", "VCC", "PMIC_3V3");
  assertPinNet(circuit, "U9", "GND", "GND");
  assertPinNet(circuit, "U9", "EP_GND", "GND");
});

test("composite includes one SoC, one clock, and one QSPI flash", {
  timeout: 30_000,
}, async () => {
  const circuit = new Circuit({
    platform: {
      pcbDisabled: true,
      routingDisabled: true,
      schematicDisabled: true,
    },
  });
  circuit.add(<RadarFrontEndProcessing_TIDEP01024 />);
  await circuit.renderUntilSettled();
  assertNoErrors(circuit);

  const names = circuit.db.source_component.list().map(({ name }) => name);
  assert.equal(names.filter((name) => name === "U2").length, 1);
  assert.equal(names.filter((name) => name === "Y1").length, 1);
  assert.equal(names.filter((name) => name === "U9").length, 1);
  for (const expected of ["C14", "C71", "C100", "C101", "R43", "R49"]) {
    assert.ok(names.includes(expected), expected);
  }

  for (const interfaceName of RADAR_FRONT_END_INTERFACE_NETS) {
    assert.ok(
      circuit.db.source_port.getWhere({ name: interfaceName }),
      interfaceName,
    );
  }

  const sclPort = circuit.db.source_port.getWhere({ name: "AR_SCL" });
  const supplyPort = circuit.db.source_port.getWhere({ name: "PMIC_3V3" });
  const groundPort = circuit.db.source_port.getWhere({ name: "GND" });
  assert.ok(sclPort);
  assert.ok(supplyPort);
  assert.ok(groundPort);
  assert.ok(
    getConnectedIds(circuit, sclPort.source_port_id).has(
      getPort(circuit, "U2", "G3").source_port_id,
    ),
  );
  assert.ok(
    getConnectedIds(circuit, supplyPort.source_port_id).has(
      getPort(circuit, "U9", "VCC").source_port_id,
    ),
  );
  assert.ok(
    getConnectedIds(circuit, groundPort.source_port_id).has(
      getPort(circuit, "Y1", "CASE_1").source_port_id,
    ),
  );
});
