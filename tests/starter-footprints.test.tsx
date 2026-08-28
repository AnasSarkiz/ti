/// <reference types="node" />

import assert from "node:assert/strict";
import { test } from "node:test";
import { Circuit } from "@tscircuit/core";
import ConsumerWirelessModule from "../examples/ConsumerWirelessModule.circuit.tsx";
import {
  SN65LVDS31D,
  SN74LVC1G34DBVR,
  TMP103AYFF,
  TPD2E009DRTR,
  TPS25910RSA,
  TPS62086RLTR,
  W3006,
} from "../index.ts";

const starterChips = [
  ["TPS62086RLTR", TPS62086RLTR, 7, "C2071344"],
  ["TPS25910RSA", TPS25910RSA, 17, "C2649427"],
  ["SN65LVDS31D", SN65LVDS31D, 16, "C352934"],
  ["TPD2E009DRTR", TPD2E009DRTR, 3, "C3040101"],
  ["SN74LVC1G34DBVR", SN74LVC1G34DBVR, 5, "C840096"],
  ["TMP103AYFF", TMP103AYFF, 4, "C165141"],
  ["W3006", W3006, 2, "C5123155"],
] as const;

const passiveComponentTypes = new Set([
  "simple_resistor",
  "simple_capacitor",
  "simple_inductor",
  "simple_diode",
]);

for (const [name, Chip, expectedPadCount, lcscPartNumber] of starterChips) {
  test(`${name} renders its imported JLCPCB footprint`, async () => {
    const circuit = new Circuit({
      platform: {
        routingDisabled: true,
        partsEngineDisabled: true,
        drcChecksDisabled: true,
      },
    });
    circuit.add(
      <board width={20} height={20} routingDisabled>
        <Chip name="U1" />
      </board>,
    );
    await circuit.renderUntilSettled();

    assert.deepEqual(
      circuit
        .getCircuitJson()
        .filter((element) => element.type.endsWith("_error")),
      [],
    );
    assert.equal(circuit.db.pcb_smtpad.list().length, expectedPadCount);
    assert.deepEqual(
      circuit.db.source_component.getWhere({ name: "U1" })
        ?.supplier_part_numbers,
      { jlcpcb: [lcscPartNumber] },
    );
  });
}

test("TMP103 ball numbers match the TI YFF pin assignment", async () => {
  const circuit = new Circuit({ platform: { pcbDisabled: true } });
  circuit.add(<TMP103AYFF name="U1" />);
  await circuit.renderUntilSettled();

  const component = circuit.db.source_component.getWhere({ name: "U1" });
  assert.ok(component);
  const pinNumber = (label: string) =>
    circuit.db.source_port
      .list({ source_component_id: component.source_component_id })
      .find((port) => port.port_hints?.includes(label))?.pin_number;

  assert.equal(pinNumber("SDA"), 1);
  assert.equal(pinNumber("V_PLUS"), 2);
  assert.equal(pinNumber("SCL"), 3);
  assert.equal(pinNumber("GND"), 4);
});

test("the Consumer Wireless Module carries chip and passive footprints into PCB data", async () => {
  const circuit = new Circuit({
    platform: {
      routingDisabled: true,
      partsEngineDisabled: true,
      drcChecksDisabled: true,
    },
  });
  circuit.add(<ConsumerWirelessModule />);
  await circuit.renderUntilSettled();

  for (const [name, , expectedPadCount, lcscPartNumber] of starterChips) {
    const sourceComponent = circuit.db.source_component
      .list()
      .find((component) =>
        component.supplier_part_numbers?.jlcpcb?.includes(lcscPartNumber),
      );
    assert.ok(sourceComponent, `${name} is missing from the starter design`);

    const pcbComponent = circuit.db.pcb_component.getWhere({
      source_component_id: sourceComponent.source_component_id,
    });
    assert.ok(pcbComponent, `${name} did not produce a PCB component`);
    assert.equal(
      circuit.db.pcb_smtpad.list({
        pcb_component_id: pcbComponent.pcb_component_id,
      }).length,
      expectedPadCount,
    );
  }

  const passiveComponents = circuit.db.source_component
    .list()
    .filter((component) => passiveComponentTypes.has(component.ftype));
  assert.equal(passiveComponents.length, 27);

  for (const sourceComponent of passiveComponents) {
    const pcbComponent = circuit.db.pcb_component.getWhere({
      source_component_id: sourceComponent.source_component_id,
    });
    assert.ok(
      pcbComponent,
      `${sourceComponent.name} did not produce a PCB component`,
    );
    assert.equal(
      circuit.db.pcb_smtpad.list({
        pcb_component_id: pcbComponent.pcb_component_id,
      }).length,
      2,
      `${sourceComponent.name} should have a two-pad footprint`,
    );
  }

  assert.equal(circuit.db.pcb_smtpad.list().length, 108);

  const missingFootprints = circuit
    .getCircuitJson()
    .filter((element) => element.type === "pcb_missing_footprint_error");
  assert.equal(missingFootprints.length, 2);
  const missingFootprintMessages = missingFootprints
    .map((error) => error.message)
    .join("\n");
  assert.match(missingFootprintMessages, /Q1/);
  assert.match(missingFootprintMessages, /J5/);
});
