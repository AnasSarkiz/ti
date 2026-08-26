import { describe, expect, test } from "bun:test";

import {
  type BlockInstance,
  generateTsx,
  getSubcircuitDefinition,
  type LogicalConnection,
  type ResolvedConnection,
  resolveDesignConnections,
  type SubcircuitDefinition,
} from "../model";
import {
  getVisibleSystemBlockConnections,
  POWER_SUMMARY_EDGE_ID_PREFIX,
} from "./power-aggregation";
import {
  createSystemBlockConnection,
  createSystemBlockNode,
  SYSTEM_BLOCK_CONNECTION_COLORS,
  type SystemBlockConnection,
  type SystemBlockGraphSnapshot,
} from "./types";

const definition = (id: string): SubcircuitDefinition => {
  const result = getSubcircuitDefinition(id);
  if (!result) throw new Error(`Missing test definition: ${id}`);
  return result;
};

const STARTER_BLOCKS: readonly BlockInstance[] = [
  {
    id: "charger",
    name: "charger",
    definitionId: "battery-management-bq24074",
  },
  {
    id: "power_1v8",
    name: "power_1v8",
    definitionId: "power-management-tps7a2018",
  },
  {
    id: "bluetooth_controller",
    name: "bluetooth_controller",
    definitionId: "bluetooth-controller-cc2564c",
  },
  {
    id: "bluetooth_host",
    name: "bluetooth_host",
    definitionId: "bluetooth-audio-host-msp430f5229",
  },
  {
    id: "audio_amplifier",
    name: "audio_amplifier",
    definitionId: "audio-amplifier-tas2505",
  },
];

const STARTER_CONNECTIONS: readonly LogicalConnection[] = [
  {
    id: "power_charger_to_ldo",
    fromBlockId: "charger",
    toBlockId: "power_1v8",
    kind: "power",
  },
  {
    id: "power_charger_to_radio",
    fromBlockId: "charger",
    toBlockId: "bluetooth_controller",
    kind: "power",
  },
  {
    id: "power_charger_to_amplifier",
    fromBlockId: "charger",
    toBlockId: "audio_amplifier",
    kind: "power",
  },
  {
    id: "power_ldo_to_radio_logic",
    fromBlockId: "power_1v8",
    toBlockId: "bluetooth_controller",
    kind: "power",
  },
  {
    id: "power_ldo_to_host",
    fromBlockId: "power_1v8",
    toBlockId: "bluetooth_host",
    kind: "power",
  },
  {
    id: "power_ldo_to_amplifier_logic",
    fromBlockId: "power_1v8",
    toBlockId: "audio_amplifier",
    kind: "power",
  },
  {
    id: "data_hci",
    fromBlockId: "bluetooth_host",
    toBlockId: "bluetooth_controller",
    kind: "data",
    protocol: "hci-uart",
  },
  {
    id: "data_audio_control",
    fromBlockId: "bluetooth_host",
    toBlockId: "audio_amplifier",
    kind: "data",
    protocol: "i2c",
  },
  {
    id: "data_digital_audio",
    fromBlockId: "bluetooth_controller",
    toBlockId: "audio_amplifier",
    kind: "data",
    protocol: "i2s",
  },
];

const createStarterFixture = (): {
  snapshot: SystemBlockGraphSnapshot;
  edges: SystemBlockConnection[];
} => {
  const blocks = STARTER_BLOCKS.map((block) => ({ ...block }));
  const resolvedConnections = resolveDesignConnections(
    blocks,
    STARTER_CONNECTIONS,
  );
  const nodesById = new Map(
    blocks.map((block) => {
      const node = createSystemBlockNode(block, definition(block.definitionId));
      return [node.id, node] as const;
    }),
  );
  const resolvedById = new Map(
    resolvedConnections.map((resolved) => [resolved.id, resolved]),
  );
  const edges = STARTER_CONNECTIONS.map((logical) => {
    const source = nodesById.get(logical.fromBlockId);
    const target = nodesById.get(logical.toBlockId);
    const resolved = resolvedById.get(logical.id);
    if (!source || !target || !resolved) {
      throw new Error(`Incomplete starter fixture for ${logical.id}`);
    }
    return createSystemBlockConnection(source, target, logical, resolved);
  });

  return {
    edges,
    snapshot: {
      blocks,
      connections: edges.map((edge) => ({ ...edge.data.logical })),
      resolvedConnections: edges.map((edge) => ({
        ...edge.data.resolved,
        traces: edge.data.resolved.traces.map((trace) => ({ ...trace })),
      })),
    },
  };
};

const countOccurrences = (source: string, value: string): number =>
  source.split(value).length - 1;

const powerEdge = (
  id: string,
  source: string,
  target: string,
): SystemBlockConnection => {
  const resolved: ResolvedConnection = {
    id,
    kind: "power",
    protocol: "power",
    fromBlockId: source,
    toBlockId: target,
    fromPortId: `${source}-out`,
    toPortId: `${target}-in`,
    score: 1,
    traces: [
      {
        signal: "positive",
        fromBlockId: source,
        toBlockId: target,
        fromSelector: ".OUT",
        toSelector: ".IN",
      },
    ],
  };

  return {
    id,
    type: "semantic",
    source,
    target,
    sourceHandle: "output:power",
    targetHandle: "input:power",
    data: {
      logical: {
        id,
        fromBlockId: source,
        toBlockId: target,
        kind: "power",
      },
      resolved,
      kind: "power",
      label: "Power",
      color: SYSTEM_BLOCK_CONNECTION_COLORS.power,
    },
  };
};

const getOnlyPowerSummary = (
  edges: readonly SystemBlockConnection[],
): SystemBlockConnection => {
  const summaries = getVisibleSystemBlockConnections(edges).filter(
    (edge) => edge.data.kind === "power",
  );
  expect(summaries).toHaveLength(1);
  const summary = summaries[0];
  if (!summary) throw new Error("Expected one visible power summary");
  return summary;
};

describe("visual power aggregation", () => {
  test("renders one starter power summary rooted through the main regulator", () => {
    const { edges } = createStarterFixture();
    const visible = getVisibleSystemBlockConnections(edges);
    const summary = getOnlyPowerSummary(edges);

    expect(visible).toHaveLength(4);
    expect(visible.filter((edge) => edge.data.kind === "data")).toHaveLength(3);
    expect(summary).toMatchObject({
      source: "charger",
      target: "power_1v8",
      deletable: false,
      selectable: false,
      data: {
        label: "Power · 4 loads",
        powerSummary: {
          rootBlockId: "charger",
          targetBlockId: "power_1v8",
          blockCount: 5,
          loadCount: 4,
          linkCount: 6,
          traceCount: 18,
        },
      },
    });
    expect(summary.id.startsWith(POWER_SUMMARY_EDGE_ID_PREFIX)).toBe(true);
  });

  test("keeps all starter power links and resolved traces in snapshot/codegen", () => {
    const { edges, snapshot } = createStarterFixture();

    getVisibleSystemBlockConnections(edges);

    const powerConnections = snapshot.connections.filter(
      (connection) => connection.kind === "power",
    );
    const powerResolved = snapshot.resolvedConnections.filter(
      (connection) => connection.kind === "power",
    );
    expect(edges.filter((edge) => edge.data.kind === "power")).toHaveLength(6);
    expect(powerConnections).toHaveLength(6);
    expect(powerResolved).toHaveLength(6);
    expect(
      powerResolved.reduce(
        (total, connection) => total + connection.traces.length,
        0,
      ),
    ).toBe(18);

    const generated = generateTsx({
      blocks: snapshot.blocks,
      connections: snapshot.connections,
    });
    expect(countOccurrences(generated, "{/* Power: power */}")).toBe(6);
    expect(countOccurrences(generated, "    <trace")).toBe(
      snapshot.resolvedConnections.reduce(
        (total, connection) => total + connection.traces.length,
        0,
      ),
    );
  });

  test("chooses the lexicographically first root when several are eligible", () => {
    const edges = [
      powerEdge("z-source-link", "source_b", "hub"),
      powerEdge("a-source-link", "source_a", "hub"),
      powerEdge("hub-z", "hub", "load_z"),
      powerEdge("hub-a", "hub", "load_a"),
    ];

    const forward = getOnlyPowerSummary(edges);
    const reversed = getOnlyPowerSummary([...edges].reverse());

    expect(forward).toEqual(reversed);
    expect(forward).toMatchObject({
      source: "source_a",
      target: "hub",
      data: {
        label: "Power · 3 loads",
        powerSummary: {
          connectionIds: ["a-source-link", "hub-a", "hub-z", "z-source-link"],
          rootBlockId: "source_a",
          targetBlockId: "hub",
          blockCount: 5,
          loadCount: 3,
          linkCount: 4,
          traceCount: 4,
        },
      },
    });
  });

  test("falls back deterministically when every power node is in a cycle", () => {
    const edges = [
      powerEdge("cycle-c-a", "c", "a"),
      powerEdge("cycle-a-b", "a", "b"),
      powerEdge("cycle-b-c", "b", "c"),
    ];

    const forward = getOnlyPowerSummary(edges);
    const reversed = getOnlyPowerSummary([...edges].reverse());

    expect(forward).toEqual(reversed);
    expect(forward).toMatchObject({
      source: "a",
      target: "b",
      data: {
        label: "Power · 3 loads",
        powerSummary: {
          connectionIds: ["cycle-a-b", "cycle-b-c", "cycle-c-a"],
          rootBlockId: "a",
          targetBlockId: "b",
          blockCount: 3,
          loadCount: 3,
          linkCount: 3,
          traceCount: 3,
        },
      },
    });
  });

  test("does not collide with a user-supplied ID in the summary namespace", () => {
    const userEdge = powerEdge("__power-summary__:source", "source", "load");
    const summary = getOnlyPowerSummary([userEdge]);

    expect(summary.id).toBe("__power-summary__:source:2");
    expect(summary.id).not.toBe(userEdge.id);
    expect(summary.data.powerSummary?.connectionIds).toEqual([userEdge.id]);
  });
});
