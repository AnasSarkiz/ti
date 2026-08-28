import { describe, expect, test } from "bun:test";
import {
  createConsumerWirelessModuleDesign,
  createSubcircuitCatalog,
  createSystemBlockExamples,
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
  test("loads every registered example as a resolvable semantic graph", async () => {
    const examples = createSystemBlockExamples(SUBCIRCUIT_CATALOG);

    expect(examples.map(({ sourcePath }) => sourcePath)).toEqual([
      "examples/ConsumerWirelessModule.circuit.tsx",
      "examples/BluetoothSpeaker_CC2564C_TAS2505.circuit.tsx",
      "examples/PersonalElectronics_ConnectedPeripheralAndPrinters_Powerbank.circuit.tsx",
      "examples/RearviewMirrorModule.circuit.tsx",
      "examples/SeatPositionModule.circuit.tsx",
    ]);
    expect(
      examples
        .find(({ id }) => id === "bluetooth-speaker")
        ?.graph.connections.find(({ protocol }) => protocol === "hci-uart"),
    ).toMatchObject({
      fromBlockId: "bluetooth_host",
      toBlockId: "bluetooth_controller",
    });

    for (const example of examples) {
      expect(
        await Bun.file(
          new URL(`../../../${example.sourcePath}`, import.meta.url),
        ).exists(),
      ).toBe(true);
      expect(
        resolveDesignConnections(
          example.graph.blocks,
          example.graph.connections,
          SUBCIRCUIT_CATALOG,
        ),
      ).toHaveLength(example.graph.connections.length);
    }
  });

  test("builds the Power Bank from all five application blocks", () => {
    const example = createSystemBlockExamples(SUBCIRCUIT_CATALOG).find(
      ({ id }) => id === "power-bank",
    );
    if (!example) throw new Error("Missing Power Bank example");

    expect(example.graph.blocks.map(({ id }) => id)).toEqual([
      "battery_management",
      "battery_charging",
      "system_power",
      "microcontroller",
      "usb_c_output",
    ]);

    const resolved = resolveDesignConnections(
      example.graph.blocks,
      example.graph.connections,
      SUBCIRCUIT_CATALOG,
    );
    expect(resolved).toHaveLength(7);
    expect(
      resolved.find(({ id }) => id === "data_i2c_charger")?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U4 > .pin14",
          toSelector: ".U1 > .pin13",
        }),
        expect.objectContaining({
          fromSelector: ".U4 > .pin15",
          toSelector: ".U1 > .pin12",
        }),
      ]),
    );
    expect(
      resolved.find(({ id }) => id === "data_boost_control")?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U4 > .pin12",
          toSelector: ".Q2 > .gate",
        }),
        expect.objectContaining({
          fromSelector: ".U4 > .pin13",
          toSelector: ".Q1 > .gate",
        }),
      ]),
    );
  });

  test("builds the Seat Position Module from all six application blocks", () => {
    const example = createSystemBlockExamples(SUBCIRCUIT_CATALOG).find(
      ({ id }) => id === "seat-position-module",
    );
    if (!example) throw new Error("Missing Seat Position Module example");

    expect(example.graph.blocks.map(({ id }) => id)).toEqual([
      "power_supply",
      "communication_interface",
      "microcontroller",
      "motor_driver",
      "position_feedback",
      "light_driver",
    ]);

    const resolved = resolveDesignConnections(
      example.graph.blocks,
      example.graph.connections,
      SUBCIRCUIT_CATALOG,
    );
    expect(resolved).toHaveLength(7);
    expect(
      resolved.find(({ id }) => id === "data_can_controller")?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U6 > .PA8",
          toSelector: ".U6 > .TXD",
        }),
        expect.objectContaining({
          fromSelector: ".U6 > .RXD",
          toSelector: ".U6 > .PA9",
        }),
      ]),
    );
    expect(
      resolved.find(({ id }) => id === "data_motor_control")?.traces,
    ).toHaveLength(13);
    expect(
      resolved.find(({ id }) => id === "power_protected_to_motor_driver")
        ?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U1 > .OUT",
          toSelector: ".U1 > .PVDD",
        }),
      ]),
    );

    const artifacts = generateSystemDesignArtifacts({
      blocks: example.graph.blocks,
      connections: example.graph.connections,
      catalog: SUBCIRCUIT_CATALOG,
      boardName: "seat_position_module",
    });
    for (const componentName of [
      "PowerSupply_LM5050_TIDA00992",
      "CommunicationInterface_TCAN1042_TIDA01428",
      "Microcontroller_MSPM0L1306Q1_TIDA020065",
      "MotorDriver_DRV8305_TIDA01330",
      "PositionFeedback_DRV5013_TIDA01389",
      "LightDriver_TIDA01330",
    ]) {
      expect(artifacts.tsx).toContain(componentName);
    }
    expect(artifacts.systemDiagramSvg).toContain(
      'data-connection-id="data_motor_control" data-kind="data"',
    );
  });

  test("builds the Rearview Mirror Module from all seven application blocks", () => {
    const example = createSystemBlockExamples(SUBCIRCUIT_CATALOG).find(
      ({ id }) => id === "rearview-mirror-module",
    );
    if (!example) throw new Error("Missing Rearview Mirror Module example");

    expect(example.graph.blocks.map(({ id }) => id)).toEqual([
      "power_supply",
      "communication_interface",
      "microcontroller",
      "mirror_driver",
      "light_sensor",
      "lamp_driver",
      "temperature_sensor",
    ]);

    const resolved = resolveDesignConnections(
      example.graph.blocks,
      example.graph.connections,
      SUBCIRCUIT_CATALOG,
    );
    expect(resolved).toHaveLength(16);
    expect(
      resolved.find(({ id }) => id === "data_can_controller")?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U1 > .CAN_TX",
          toSelector: ".U6 > .TXD",
        }),
      ]),
    );
    expect(
      resolved.find(({ id }) => id === "data_i2c_light_sensor")?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U1 > .I2C0_SCL",
          toSelector: ".U4Sensor .U4 > .SCL",
        }),
        expect.objectContaining({
          fromSelector: ".U1 > .I2C0_SCL",
          toSelector: ".U5Sensor .U5 > .SCL",
        }),
      ]),
    );
    expect(
      resolved.find(({ id }) => id === "power_3v3_to_lamp_driver")?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U2 > .OUT",
          toSelector: ".J3 > .pin3",
        }),
        expect.objectContaining({
          fromSelector: ".U2 > .OUT",
          toSelector: ".R9 > .pin1",
        }),
      ]),
    );
    expect(
      resolved.find(({ id }) => id === "power_protected_to_mirror_driver")
        ?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U1 > .OUT",
          toSelector: ".Q2 > .collector",
        }),
      ]),
    );

    const artifacts = generateSystemDesignArtifacts({
      blocks: example.graph.blocks,
      connections: example.graph.connections,
      catalog: SUBCIRCUIT_CATALOG,
      boardName: "rearview_mirror_module",
    });
    for (const componentName of [
      "PowerSupply_LM74202_TPS7E81_Q1",
      "CommunicationInterface_TCAN1042_TIDA01428",
      "Microcontroller_MSPM0G3507",
      "ElectrochromicMirrorDriver_TIDA01539",
      "LightSensor_OPT3001_TIDA01539",
      "LampDriver_TPS92638_TIDA00356",
      "TemperatureSensor_LM50HV_Q1",
    ]) {
      expect(artifacts.tsx).toContain(componentName);
    }
    expect(artifacts.tsx).toContain(
      '<PowerSupply_LM74202_TPS7E81_Q1\n      name="power_supply"\n      schSheetName="power_supply"\n      schX={-3.6}',
    );
    expect(artifacts.tsx).toContain('to=".light_sensor .U5Sensor .U5 > .SDA"');
    expect(artifacts.systemDiagramSvg).toContain(
      'data-connection-id="data_power_monitor" data-kind="data"',
    );
  });

  test("builds the Consumer wireless module from all seven reviewed blocks", () => {
    const design = createConsumerWirelessModuleDesign(SUBCIRCUIT_CATALOG);
    expect(design.blocks.map(({ id }) => id)).toEqual([
      "input_power_protection",
      "dc_dc_power_supply",
      "io_connection",
      "wireless_connectivity",
      "io_protection",
      "logic_control",
      "sensors",
    ]);

    const resolved = resolveDesignConnections(
      design.blocks,
      design.connections,
      SUBCIRCUIT_CATALOG,
    );
    expect(resolved.map(({ id }) => id)).toEqual([
      "data_io_connection_to_io_protection",
      "data_logic_to_io_connection",
      "power_dc_dc_to_io_connection",
      "power_dc_dc_to_logic_control",
      "power_dc_dc_to_sensors",
      "power_protection_to_dc_dc",
    ]);
    expect(
      resolved.find(({ id }) => id === "power_protection_to_dc_dc")?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U7 > .IN1",
          toSelector: ".U3P3 > .VIN",
        }),
        expect.objectContaining({
          fromSelector: ".U7 > .IN1",
          toSelector: ".U3P3 > .EN",
        }),
        expect.objectContaining({
          fromSelector: ".U7 > .GND1",
          toSelector: ".U3P3 > .GND",
        }),
      ]),
    );
    expect(
      resolved.find(({ id }) => id === "data_io_connection_to_io_protection")
        ?.traces,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromSelector: ".U1 > .OUT1_P",
          toSelector: ".UESD > .D1",
        }),
        expect.objectContaining({
          fromSelector: ".U1 > .OUT1_N",
          toSelector: ".UESD > .D2",
        }),
      ]),
    );

    const artifacts = generateSystemDesignArtifacts({
      blocks: design.blocks,
      connections: design.connections,
      catalog: SUBCIRCUIT_CATALOG,
      boardName: "consumer_wireless_module",
    });
    for (const componentName of [
      "InputPowerProtection_TPS25910_TIDA00890",
      "BuckConverter_TPS62086_TIDA00399",
      "LVDSDriver_SN65LVDS31_TIDA060017",
      "WirelessAntenna_W3006_TIDCWL1837MODCOM8I",
      "InputOutputProtection_TPD2E009_TIDA00399",
      "LogicBuffer_SN74LVC1G34",
      "TemperatureSensor_TMP103_TIDA00399",
    ]) {
      expect(artifacts.tsx).toContain(componentName);
    }
    expect(artifacts.systemDiagramSvg).toContain(
      'data-connection-id="power_protection_to_dc_dc" data-kind="power"',
    );
    expect(artifacts.systemDiagramSvg).toContain(
      'data-connection-id="data_io_connection_to_io_protection" data-kind="data"',
    );
    expect(artifacts.tsx).toContain(
      'from=".logic_control > net.MCU_OR_LOGIC_OUT"',
    );
    expect(artifacts.tsx).toContain('to=".logic_control > net.VCC"');
  });

  test("does not connect the protected 5 V rail directly to the TMP103", () => {
    const inputProtection = definition(
      "input-power-protection-tps25910-tida00890",
    );
    const sensor = definition("temperature-sensor-tmp103-tida00399");

    expect(() =>
      resolveConnection({
        kind: "Power",
        from: {
          block: block("input_power_protection", inputProtection.id),
          definition: inputProtection,
        },
        to: {
          block: block("sensors", sensor.id),
          definition: sensor,
        },
      }),
    ).toThrow(ConnectionResolutionError);
  });

  test("enriches discovered raw sources with curated adapters", () => {
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
    ).toMatchObject({ canInstantiate: true });
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

  test("curated catalog is sorted and has the reviewed starter-design blocks", () => {
    const titles = SUBCIRCUIT_CATALOG.map((item) => item.title);
    expect(titles).toEqual(
      [...titles].sort((a, b) => a.localeCompare(b, "en")),
    );
    expect(definition("battery-management-bq24074")).toBeDefined();
    expect(definition("bluetooth-controller-cc2564c")).toBeDefined();
    expect(definition("audio-amplifier-tas2505")).toBeDefined();
    expect(
      definition("input-power-protection-tps25910-tida00890"),
    ).toBeDefined();
    expect(definition("buck-converter-tps62086-tida00399")).toBeDefined();
    expect(definition("lvds-driver-sn65lvds31-tida060017")).toBeDefined();
    expect(
      definition("wireless-antenna-w3006-tidcwl1837modcom8i"),
    ).toBeDefined();
    expect(
      definition("input-output-protection-tpd2e009-tida00399"),
    ).toBeDefined();
    expect(definition("logic-buffer-sn74lvc1g34")).toBeDefined();
    expect(definition("temperature-sensor-tmp103-tida00399")).toBeDefined();
    expect(definition("power-supply-lm74202-tps7e81-q1")).toMatchObject({
      sourcePath:
        "lib/thirdparty-subcircuits/PowerSupply_LM74202_TPS7E81_Q1.circuit.tsx",
    });
    expect(definition("temperature-sensor-lm50hv-q1")).toMatchObject({
      sourcePath:
        "lib/thirdparty-subcircuits/TemperatureSensor_LM50HV_Q1.circuit.tsx",
    });
    expect(definition("electrochromic-mirror-driver-tida01539")).toBeDefined();
    expect(definition("light-sensor-opt3001-tida01539")).toBeDefined();
    expect(definition("lamp-driver-tps92638-tida00356")).toBeDefined();
  });
});
