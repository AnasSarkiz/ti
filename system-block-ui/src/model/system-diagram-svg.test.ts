import { describe, expect, test } from "bun:test";
import type {
  BlockInstance,
  ResolvedConnection,
  SubcircuitDefinition,
} from "./types";
import { renderSystemDiagramSvg } from "./system-diagram-svg";

const makeDefinition = (
  id: string,
  title: string,
  kinds: readonly ("power" | "data")[] = [],
): SubcircuitDefinition => ({
  id,
  title,
  category: "Test & validation",
  componentName: `Component_${id}`,
  importPath: "test-components",
  sourcePath: `${id}.circuit.tsx`,
  ports: kinds.map((kind) => ({
    id: `${kind}-port`,
    label: kind,
    kind,
    role: kind === "power" ? "consumer" : "device",
    protocol: kind === "power" ? "power" : "i2c",
    signals: [],
  })),
});

const connection = ({
  id,
  fromBlockId,
  toBlockId,
  kind,
  protocol,
}: {
  id: string;
  fromBlockId: string;
  toBlockId: string;
  kind: "power" | "data";
  protocol?: string;
}): ResolvedConnection => ({
  id,
  fromBlockId,
  toBlockId,
  kind,
  protocol,
  fromPortId: `${fromBlockId}-out`,
  toPortId: `${toBlockId}-in`,
  score: 1,
  traces: [
    {
      signal: kind === "power" ? "positive" : "signal",
      fromBlockId,
      toBlockId,
      fromSelector: ".OUT",
      toSelector: ".IN",
    },
  ],
});

describe("system diagram SVG", () => {
  test("is deterministic, escapes XML, and summarizes a power network", () => {
    const catalog = [
      makeDefinition("source", 'Main <Power> & "Battery"', ["power"]),
      makeDefinition("controller", "Controller `${unsafe}`", ["power", "data"]),
      makeDefinition("sensor", "Sensor", ["power", "data"]),
    ];
    const blocks: BlockInstance[] = [
      {
        id: "source&one",
        definitionId: "source",
        name: "main_source",
        position: { x: -180, y: -40 },
      },
      {
        id: "controller",
        definitionId: "controller",
        name: "controller",
        position: { x: 180, y: 20 },
      },
      {
        id: "sensor",
        definitionId: "sensor",
        name: "sensor",
        position: { x: 560, y: 180 },
      },
    ];
    const resolvedConnections = [
      connection({
        id: "power-source-controller",
        fromBlockId: "source&one",
        toBlockId: "controller",
        kind: "power",
      }),
      connection({
        id: "power-source-sensor",
        fromBlockId: "source&one",
        toBlockId: "sensor",
        kind: "power",
      }),
      connection({
        id: "data-controller-sensor",
        fromBlockId: "controller",
        toBlockId: "sensor",
        kind: "data",
        protocol: "i2c",
      }),
    ];

    const forward = renderSystemDiagramSvg({
      blocks,
      resolvedConnections,
      catalog,
    });
    const reversed = renderSystemDiagramSvg({
      blocks: [...blocks].reverse(),
      resolvedConnections: [...resolvedConnections].reverse(),
      catalog: [...catalog].reverse(),
    });

    expect(forward).toBe(reversed);
    expect(forward).toStartWith(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ',
    );
    expect(forward).toContain('data-block-id="source&amp;one"');
    expect(forward).toContain("Main &lt;Power&gt; &amp; &quot;Battery&quot;");
    expect(forward).not.toContain("Main <Power>");
    expect(forward.match(/data-kind="power"/g)).toHaveLength(1);
    expect(forward.match(/data-kind="data"/g)).toHaveLength(1);
    expect(forward).toContain("Power · 2 loads");
    expect(forward).toContain("Data · I²C");
  });

  test("uses a stable grid whenever a graph has missing positions", () => {
    const catalog = [
      makeDefinition("alpha", "Alpha"),
      makeDefinition("beta", "Beta"),
      makeDefinition("gamma", "Gamma"),
    ];
    const blocks: BlockInstance[] = [
      { id: "gamma", definitionId: "gamma" },
      {
        id: "alpha",
        definitionId: "alpha",
        position: { x: 9_999, y: 9_999 },
      },
      { id: "beta", definitionId: "beta" },
    ];

    const first = renderSystemDiagramSvg({
      blocks,
      resolvedConnections: [],
      catalog,
    });
    const second = renderSystemDiagramSvg({
      blocks: [...blocks].reverse(),
      resolvedConnections: [],
      catalog,
    });

    expect(first).toBe(second);
    expect(first).not.toContain("9999");
    expect(first.match(/data-block-id=/g)).toHaveLength(3);
  });

  test("renders an informative standalone page for an empty graph", () => {
    const svg = renderSystemDiagramSvg({
      blocks: [],
      resolvedConnections: [],
      catalog: [],
    });

    expect(svg).toContain('viewBox="0 0 900 520"');
    expect(svg).toContain("No system blocks yet");
    expect(svg).toContain("0 blocks · 0 visible links");
  });
});
