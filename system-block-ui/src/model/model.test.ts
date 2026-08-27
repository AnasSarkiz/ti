import { describe, expect, test } from "bun:test";
import {
  createSubcircuitCatalog,
  generateSystemDesignArtifacts,
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

  test("uses bytewise ordering for connection IDs and tied port diagnostics", () => {
    const ordered = resolveDesignConnections(
      [
        block("ldo", "power-management-tps7a2018"),
        block("amplifier", "audio-amplifier-tas2505"),
        block("host", "bluetooth-audio-host-msp430f5229"),
        block("controller", "bluetooth-controller-cc2564c"),
      ],
      [
        {
          id: "ä-connection",
          fromBlockId: "ldo",
          toBlockId: "amplifier",
          kind: "power",
        },
        {
          id: "z-connection",
          fromBlockId: "host",
          toBlockId: "controller",
          kind: "data",
        },
      ],
    );
    expect(ordered.map(({ id }) => id)).toEqual([
      "z-connection",
      "ä-connection",
    ]);

    const source: SubcircuitDefinition = {
      id: "bytewise-source",
      title: "Bytewise source",
      category: "Test",
      componentName: "BytewiseSource",
      importPath: "test",
      sourcePath: "test.tsx",
      ports: ["ä-port", "z-port"].map((id) => ({
        id,
        label: id,
        kind: "data" as const,
        role: "host" as const,
        protocol: "gpio",
        signals: [
          {
            name: "signal",
            direction: "output" as const,
            selectors: [`.${id}`],
          },
        ],
      })),
    };
    const sink: SubcircuitDefinition = {
      id: "bytewise-sink",
      title: "Bytewise sink",
      category: "Test",
      componentName: "BytewiseSink",
      importPath: "test",
      sourcePath: "test.tsx",
      ports: [
        {
          id: "input",
          label: "input",
          kind: "data",
          role: "device",
          protocol: "gpio",
          signals: [
            {
              name: "signal",
              direction: "input",
              selectors: [".input"],
            },
          ],
        },
      ],
    };

    try {
      resolveConnection({
        kind: "data",
        from: { block: block("source", source.id), definition: source },
        to: { block: block("sink", sink.id), definition: sink },
      });
      throw new Error("Expected bytewise candidates to remain ambiguous");
    } catch (error) {
      expect(error).toBeInstanceOf(ConnectionResolutionError);
      const candidates = (
        (error as ConnectionResolutionError).details?.candidates as
          | Array<{ fromPortId: string }>
          | undefined
      )?.map(({ fromPortId }) => fromPortId);
      expect(candidates).toEqual(["z-port", "ä-port"]);
    }
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
    expect(first).toContain(
      'import { SYSTEM_DIAGRAM_SVG } from "./GeneratedSystem.system-diagram"',
    );
    expect(first).not.toContain("const SYSTEM_DIAGRAM_SVG");
    expect(first).not.toContain("<svg");
    expect(first).toContain(
      "<schematicgraphic svgContent={SYSTEM_DIAGRAM_SVG} />",
    );
    expect(first).toContain('displayName="System Diagram"');
    expect(first).toContain("sheetIndex={0}");
    expect(first).toContain("sheetIndex={1}");
    expect(first).toContain("sheetIndex={2}");
    expect(first).toContain('from=".power_1v8 > .U1 > .VOUT"');
    expect(first).toContain('to=".audio_amplifier > .U1 > .IOVDD"');
  });

  test("emits canonical system artifacts deterministically", () => {
    const blocks = [
      {
        ...block("power_1v8", "power-management-tps7a2018"),
        schSheetName: "system_diagram",
      },
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
    const artifacts = generateSystemDesignArtifacts({ blocks, connections });
    const reversed = generateSystemDesignArtifacts({
      blocks: [...blocks].reverse(),
      connections: [...connections].reverse(),
    });

    expect(artifacts).toEqual(reversed);
    expect(artifacts.systemDiagramSheetName).toBe("system_diagram_2");
    expect(artifacts.systemDiagramModuleFileName).toBe(
      "GeneratedSystem.system-diagram.ts",
    );
    expect(artifacts.tsx).toContain(
      '<schematicsheet\n      name="system_diagram_2"\n      displayName="System Diagram"\n      sheetIndex={0}\n    >',
    );
    expect(artifacts.tsx).toContain(
      "<schematicgraphic svgContent={SYSTEM_DIAGRAM_SVG} />",
    );
    expect(artifacts.systemDiagramSvg).toContain(
      'data-connection-id="power" data-kind="power"',
    );
    expect(artifacts.systemDiagramSvg).not.toContain("__power-summary__");
    expect(artifacts.systemDiagramModuleSource).toStartWith(
      "export const SYSTEM_DIAGRAM_SVG = [",
    );
    expect(artifacts.systemDiagramModuleSource).toContain(
      'data-connection-id=\\"power\\" data-kind=\\"power\\"',
    );
    expect(artifacts.tsx).not.toContain(artifacts.systemDiagramSvg);
  });

  test("always emits a first system diagram sheet for an empty design", () => {
    const artifacts = generateSystemDesignArtifacts({
      blocks: [],
      connections: [],
    });

    expect(artifacts.systemDiagramSheetName).toBe("system_diagram");
    expect(artifacts.systemDiagramSvg).toContain("No system blocks yet");
    expect(artifacts.systemDiagramModuleSource).toContain(
      "No system blocks yet",
    );
    expect(artifacts.tsx).toContain("sheetIndex={0}");
    expect(artifacts.tsx).toContain(
      "<schematicgraphic svgContent={SYSTEM_DIAGRAM_SVG} />",
    );
    expect(artifacts.tsx).not.toContain("sheetIndex={1}");
  });

  test("rejects explicit sheet names which collide with generated names", () => {
    expect(() =>
      generateTsx({
        blocks: [
          {
            id: "generated_sheet",
            name: "shared_sheet",
            definitionId: "power-management-tps7a2018",
          },
          {
            id: "explicit_sheet",
            name: "different_block",
            schSheetName: "shared sheet",
            definitionId: "audio-amplifier-tas2505",
          },
        ],
        connections: [],
      }),
    ).toThrow("Duplicate generated schematic sheet name: shared_sheet");
  });

  test("orders imports bytewise and prevents protocol JSX-comment injection", () => {
    const hostileProtocol = "i2c */}<intruder />{/*";
    const makeDataDefinition = ({
      id,
      componentName,
      importPath,
      role,
      direction,
    }: {
      id: string;
      componentName: string;
      importPath: string;
      role: "host" | "device";
      direction: "input" | "output";
    }): SubcircuitDefinition => ({
      id,
      title: componentName,
      category: "Test",
      componentName,
      importPath,
      sourcePath: `${id}.tsx`,
      ports: [
        {
          id: "data",
          label: "Data",
          kind: "data",
          role,
          protocol: hostileProtocol,
          signals: [
            {
              name: "signal",
              direction,
              selectors: [`.${direction}`],
            },
          ],
        },
      ],
    });
    const catalog = [
      makeDataDefinition({
        id: "source",
        componentName: "ZedSource",
        importPath: "@test/z-package",
        role: "host",
        direction: "output",
      }),
      makeDataDefinition({
        id: "sink",
        componentName: "UmlautSink",
        importPath: "@test/ä-package",
        role: "device",
        direction: "input",
      }),
    ];
    const generated = generateTsx({
      blocks: [block("source", "source"), block("sink", "sink")],
      connections: [
        {
          id: "hostile",
          fromBlockId: "source",
          toBlockId: "sink",
          kind: "data",
          protocol: hostileProtocol,
        },
      ],
      catalog,
    });

    expect(generated.indexOf('from "@test/z-package"')).toBeLessThan(
      generated.indexOf('from "@test/ä-package"'),
    );
    const comment = generated
      .split("\n")
      .find((line) => line.includes("{/* Data:"));
    if (!comment) throw new Error("Expected a generated data comment");
    expect(comment.match(/\*\//g)).toHaveLength(1);
    expect(comment).not.toContain("<intruder");
    expect(comment).not.toContain("}{");
    expect(comment).toContain("Data: i2c _intruder _");
    expect(generated).not.toContain(hostileProtocol);
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
