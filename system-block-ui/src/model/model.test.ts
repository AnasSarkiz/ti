import { describe, expect, test } from "bun:test";
import {
  createSubcircuitCatalog,
  generateTsx,
  getSubcircuitDefinition,
  resolveConnection,
  resolveDesignConnections,
  SUBCIRCUIT_CATALOG,
} from "./index";
import type {
  BlockInstance,
  PortDefinition,
  SubcircuitDefinition,
} from "./types";
import { ConnectionResolutionError } from "./types";

const definition = (id: string): SubcircuitDefinition => {
  const result = getSubcircuitDefinition(id);
  if (!result) throw new Error(`Missing test definition: ${id}`);
  return result;
};

const block = (id: string, definitionId: string): BlockInstance => ({
  id,
  definitionId,
});

describe("automatic connection resolution", () => {
  test("fans one 1.8 V rail out to every TAS2505 supply endpoint", () => {
    const ldo = definition("power-management-tps7a2018");
    const amplifier = definition("audio-amplifier-tas2505");
    const resolved = resolveConnection({
      kind: "Power",
      from: { block: block("ldo", ldo.id), definition: ldo },
      to: { block: block("amplifier", amplifier.id), definition: amplifier },
    });

    expect(resolved.fromPortId).toBe("power-1v8-out");
    expect(resolved.toPortId).toBe("logic-power");
    expect(resolved.traces).toHaveLength(5);
    expect(
      resolved.traces
        .filter((trace) => trace.signal === "positive")
        .map((trace) => trace.toSelector),
    ).toEqual([".U1 > .AVDD", ".U1 > .DVDD", ".U1 > .IOVDD", ".R1 > .pin1"]);
    expect(resolved.traces.at(-1)).toMatchObject({
      signal: "ground",
      fromSelector: ".U1 > .GND",
      toSelector: ".U1 > .AVSS",
    });
  });

  test("crosses HCI UART TX/RX and RTS/CTS while preserving controls", () => {
    const controller = definition("bluetooth-controller-cc2564c");
    const host = definition("bluetooth-audio-host-msp430f5229");
    const resolved = resolveConnection({
      kind: "Data",
      from: {
        block: block("controller", controller.id),
        definition: controller,
      },
      to: { block: block("host", host.id), definition: host },
    });

    expect(resolved.protocol).toBe("hci-uart");
    expect(resolved.traces).toHaveLength(6);
    expect(resolved.traces).toContainEqual(
      expect.objectContaining({
        fromSelector: ".U1A > .HCI_TX",
        toSelector: ".U10 > .UART_RXD",
      }),
    );
    expect(resolved.traces).toContainEqual(
      expect.objectContaining({
        fromSelector: ".U10 > .UART_TXD",
        toSelector: ".U1A > .HCI_RX",
      }),
    );
    expect(resolved.traces).toContainEqual(
      expect.objectContaining({
        fromSelector: ".U1A > .HCI_RTS",
        toSelector: ".U10 > .P1_4",
      }),
    );
    expect(resolved.traces).toContainEqual(
      expect.objectContaining({
        fromSelector: ".U10 > .P1_5",
        toSelector: ".U1A > .HCI_CTS",
      }),
    );
  });

  test("rejects incompatible voltage and tied best candidates", () => {
    const ldo = definition("power-management-tps7a2018");
    const motor = definition("motor-driver-drv8833");
    expect(() =>
      resolveConnection({
        kind: "Power",
        from: { block: block("ldo", ldo.id), definition: ldo },
        to: { block: block("motor", motor.id), definition: motor },
      }),
    ).toThrow(ConnectionResolutionError);

    const providerPort = (id: string): PortDefinition => ({
      id,
      label: id,
      kind: "power",
      role: "provider",
      protocol: "power",
      voltage: 3.3,
      requiredSignals: ["positive", "ground"],
      signals: [
        {
          name: "positive",
          direction: "output",
          selectors: [`.${id} > .VCC`],
        },
        {
          name: "ground",
          direction: "passive",
          selectors: [`.${id} > .GND`],
        },
      ],
    });
    const source: SubcircuitDefinition = {
      id: "ambiguous-source",
      title: "Ambiguous Source",
      category: "Test",
      componentName: "AmbiguousSource",
      importPath: "test",
      sourcePath: "test.tsx",
      ports: [providerPort("a"), providerPort("b")],
    };
    const sink: SubcircuitDefinition = {
      id: "sink",
      title: "Sink",
      category: "Test",
      componentName: "Sink",
      importPath: "test",
      sourcePath: "test.tsx",
      ports: [
        {
          ...providerPort("input"),
          role: "consumer",
          signals: [
            {
              name: "positive",
              direction: "input",
              selectors: [".U1 > .VCC"],
            },
            {
              name: "ground",
              direction: "passive",
              selectors: [".U1 > .GND"],
            },
          ],
        },
      ],
    };

    try {
      resolveConnection({
        kind: "power",
        from: { block: block("source", source.id), definition: source },
        to: { block: block("sink", sink.id), definition: sink },
      });
      throw new Error("Expected ambiguity");
    } catch (error) {
      expect(error).toBeInstanceOf(ConnectionResolutionError);
      expect((error as ConnectionResolutionError).code).toBe(
        "AMBIGUOUS_CONNECTION",
      );
    }
  });

  test("rejects a source range that only partly overlaps a consumer range", () => {
    const charger = definition("battery-management-bq24074");
    const sensor = definition("environmental-sensor-hdc2080");

    try {
      resolveConnection({
        kind: "Power",
        from: { block: block("charger", charger.id), definition: charger },
        to: { block: block("sensor", sensor.id), definition: sensor },
      });
      throw new Error("Expected an unsafe voltage range to be rejected");
    } catch (error) {
      expect(error).toBeInstanceOf(ConnectionResolutionError);
      expect((error as ConnectionResolutionError).code).toBe(
        "NO_COMPATIBLE_PORTS",
      );
    }
  });

  test("rejects reusing a single-use consumer port", () => {
    const blocks = [
      block("ldo_a", "power-management-tps7a2018"),
      block("ldo_b", "power-management-tps7a2018"),
      block("amplifier", "audio-amplifier-tas2505"),
    ];
    const connections = [
      {
        id: "a",
        fromBlockId: "ldo_a",
        toBlockId: "amplifier",
        kind: "Power" as const,
      },
      {
        id: "b",
        fromBlockId: "ldo_b",
        toBlockId: "amplifier",
        kind: "Power" as const,
      },
    ];

    try {
      resolveDesignConnections(blocks, connections);
      throw new Error("Expected a reused input port to be rejected");
    } catch (error) {
      expect(error).toBeInstanceOf(ConnectionResolutionError);
      expect((error as ConnectionResolutionError).code).toBe("PORT_IN_USE");
    }
  });

  test("falls through to a compatible free port on a multi-rail block", () => {
    const canInterface = definition(
      "communication-interface-tcan1042-tida01428",
    );
    const source: SubcircuitDefinition = {
      id: "five-volt-source",
      title: "5 V source",
      category: "Test",
      componentName: "FiveVoltSource",
      importPath: "test",
      sourcePath: "test.tsx",
      ports: [
        {
          id: "output",
          label: "5 V",
          kind: "power",
          role: "provider",
          protocol: "power",
          voltage: 5,
          signals: [
            { name: "positive", direction: "output", selectors: [".VOUT"] },
            { name: "ground", direction: "passive", selectors: [".GND"] },
          ],
        },
      ],
    };
    const blocks = [
      block("source_a", source.id),
      block("source_b", source.id),
      block("can", canInterface.id),
    ];
    const resolved = resolveDesignConnections(
      blocks,
      [
        {
          id: "a",
          fromBlockId: "source_a",
          toBlockId: "can",
          kind: "Power",
        },
        {
          id: "b",
          fromBlockId: "source_b",
          toBlockId: "can",
          kind: "Power",
        },
      ],
      [source, canInterface],
    );

    expect(resolved.map((connection) => connection.toPortId)).toEqual([
      "transceiver-power",
      "logic-power",
    ]);
  });
});

describe("catalog and TSX generation", () => {
  test("enriches every discovered raw source and protects prop-less blocks", () => {
    const catalog = createSubcircuitCatalog({
      "../../../lib/subcircuits/FutureSensor_X1.circuit.tsx":
        "export const FutureSensor_X1 = (props: unknown) => null",
      "../../../lib/subcircuits/Microcontroller_MSP430G2332.circuit.tsx":
        "export const Microcontroller_MSP430G2332 = () => null",
    });
    expect(
      catalog.find((item) => item.componentName === "FutureSensor_X1"),
    ).toMatchObject({
      sourcePath: "lib/subcircuits/FutureSensor_X1.circuit.tsx",
      canInstantiate: true,
    });
    expect(
      catalog.find(
        (item) => item.componentName === "Microcontroller_MSP430G2332",
      ),
    ).toMatchObject({ canInstantiate: false });
  });

  test("generates stable TSX regardless of graph array ordering", () => {
    const blocks = [
      block("power_1v8", "power-management-tps7a2018"),
      block("audio_amplifier", "audio-amplifier-tas2505"),
    ];
    const connections = [
      {
        id: "power",
        fromBlockId: "power_1v8",
        toBlockId: "audio_amplifier",
        kind: "Power" as const,
      },
    ];
    const first = generateTsx({ blocks, connections });
    const second = generateTsx({
      blocks: [...blocks].reverse(),
      connections: [...connections].reverse(),
    });

    expect(first).toBe(second);
    expect(first).toContain("<board routingDisabled>");
    expect(first).toContain("PowerManagement_TPS7A2018,");
    expect(first).toContain('from=".power_1v8 > .U1 > .VOUT"');
    expect(first).toContain('to=".audio_amplifier > .U1 > .IOVDD"');
  });

  test("curated catalog is sorted and has the Bluetooth speaker building blocks", () => {
    const titles = SUBCIRCUIT_CATALOG.map((item) => item.title);
    expect(titles).toEqual(
      [...titles].sort((a, b) => a.localeCompare(b, "en")),
    );
    expect(definition("battery-management-bq24074")).toBeDefined();
    expect(definition("bluetooth-controller-cc2564c")).toBeDefined();
    expect(definition("audio-amplifier-tas2505")).toBeDefined();
  });
});
