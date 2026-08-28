import { describe, expect, test } from "bun:test";
import type { CircuitJson } from "circuit-json";
import { strFromU8, unzipSync } from "fflate";
import {
  createCircuitJsonDownloadBlob,
  getCircuitJsonDownloadFileName,
} from "./export-circuit-json";
import {
  createTscircuitTsxZipBlob,
  getTscircuitTsxZipFileName,
} from "./export-tscircuit-tsx";
import {
  GENERATED_SYSTEM_MAIN_FILE_NAME,
  type GeneratedSystemSourceArtifacts,
} from "./generated-source-files";

const circuitJson = [
  {
    type: "source_component",
    source_component_id: "source_component_0",
    name: "R1",
    ftype: "simple_resistor",
  },
  {
    type: "schematic_graphic",
    schematic_graphic_id: "schematic_graphic_0",
    schematic_sheet_id: "schematic_sheet_0",
    svg_content: "<svg><text>System overview</text></svg>",
  },
] as unknown as CircuitJson;

const artifacts: GeneratedSystemSourceArtifacts = {
  tsx: ["export default () => (", "  <board>", "  </board>", ")", ""].join(
    "\n",
  ),
  systemDiagramFileName: "GeneratedSystem.system-diagram.svg",
  systemDiagramSvg: "<svg>System diagram</svg>\n",
};

describe("browser source downloads", () => {
  test("creates human-readable Circuit JSON with a final newline", async () => {
    const blob = createCircuitJsonDownloadBlob(circuitJson);
    const downloadedJson = await blob.text();

    // Bun appends an explicit UTF-8 charset to JSON Blob media types.
    expect(blob.type.split(";", 1)[0]).toBe("application/json");
    expect(downloadedJson).toBe(
      [
        "[",
        "  {",
        '    "type": "source_component",',
        '    "source_component_id": "source_component_0",',
        '    "name": "R1",',
        '    "ftype": "simple_resistor"',
        "  },",
        "  {",
        '    "type": "schematic_graphic",',
        '    "schematic_graphic_id": "schematic_graphic_0",',
        '    "schematic_sheet_id": "schematic_sheet_0",',
        '    "svg_content": "<svg><text>System overview</text></svg>"',
        "  }",
        "]",
        "",
      ].join("\n"),
    );
    expect(downloadedJson.endsWith("\n")).toBe(true);
    expect(JSON.parse(downloadedJson)).toEqual(circuitJson);
    expect(getCircuitJsonDownloadFileName({ projectName: "demo board" })).toBe(
      "demo-board.circuit.json",
    );
  });

  test("creates a deterministic ZIP with the TSX and overview SVG", async () => {
    const firstBlob = createTscircuitTsxZipBlob(artifacts);
    const secondBlob = createTscircuitTsxZipBlob(artifacts);
    const firstBytes = new Uint8Array(await firstBlob.arrayBuffer());
    const secondBytes = new Uint8Array(await secondBlob.arrayBuffer());
    const archive = unzipSync(firstBytes);

    expect(firstBlob.type).toBe("application/zip");
    expect([...firstBytes.slice(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
    expect(firstBytes).toEqual(secondBytes);
    expect(Object.keys(archive).sort()).toEqual(
      [GENERATED_SYSTEM_MAIN_FILE_NAME, artifacts.systemDiagramFileName].sort(),
    );
    expect(
      strFromU8(archive[GENERATED_SYSTEM_MAIN_FILE_NAME] ?? new Uint8Array()),
    ).toBe(artifacts.tsx);
    expect(
      strFromU8(archive[artifacts.systemDiagramFileName] ?? new Uint8Array()),
    ).toBe(artifacts.systemDiagramSvg);
    expect(getTscircuitTsxZipFileName({ projectName: "../../CON" })).toBe(
      "project-CON.tscircuit-tsx.zip",
    );
  });
});
