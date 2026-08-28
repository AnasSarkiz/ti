import { describe, expect, test } from "bun:test";
import type { CircuitJson } from "circuit-json";
import { strFromU8, unzipSync } from "fflate";
import {
  createAltiumProjectZipBlob,
  getAltiumProjectZipFileName,
} from "./export-altium-project";
import {
  createKicadProjectZipBlob,
  getKicadProjectZipFileName,
} from "./export-kicad-project";
import { evaluateGeneratedTsx } from "./evaluate-schematic";
import { prepareCircuitJsonForEcadExport } from "./prepare-circuit-json-for-ecad-export";

const circuitJson = [
  {
    type: "pcb_board",
    pcb_board_id: "pcb_board_0",
    center: { x: 0, y: 0 },
    width: 20,
    height: 12,
  },
  {
    type: "source_component",
    source_component_id: "source_component_0",
    name: "R1",
    ftype: "simple_resistor",
  },
  {
    type: "source_port",
    source_port_id: "source_port_0",
    source_component_id: "source_component_0",
    pin_number: 1,
    name: "pin1",
  },
  {
    type: "source_trace",
    source_trace_id: "source_trace_0",
    connected_source_port_ids: ["source_port_0"],
    name: "SIGNAL",
  },
  {
    type: "pcb_component",
    pcb_component_id: "pcb_component_0",
    source_component_id: "source_component_0",
    center: { x: 0, y: 0 },
    width: 2,
    height: 1,
    layer: "top",
    rotation: 0,
  },
  {
    type: "pcb_port",
    pcb_port_id: "pcb_port_0",
    source_port_id: "source_port_0",
    pcb_component_id: "pcb_component_0",
    x: -0.5,
    y: 0,
    layers: ["top"],
  },
  {
    type: "pcb_smtpad",
    pcb_smtpad_id: "pcb_smtpad_0",
    pcb_component_id: "pcb_component_0",
    pcb_port_id: "pcb_port_0",
    shape: "rect",
    x: -0.5,
    y: 0,
    width: 0.8,
    height: 0.8,
    layer: "top",
  },
  {
    type: "schematic_component",
    schematic_component_id: "schematic_component_0",
    source_component_id: "source_component_0",
    center: { x: 0, y: 0 },
    size: { width: 2, height: 1 },
    symbol_name: "boxresistor",
    symbol_display_value: "10kΩ",
  },
  {
    type: "schematic_port",
    schematic_port_id: "schematic_port_0",
    schematic_component_id: "schematic_component_0",
    source_port_id: "source_port_0",
    center: { x: -1.5, y: 0 },
    facing_direction: "left",
  },
  {
    type: "schematic_trace",
    schematic_trace_id: "schematic_trace_0",
    source_trace_id: "source_trace_0",
    edges: [{ from: { x: -2.5, y: 0 }, to: { x: -1.5, y: 0 } }],
    junctions: [],
  },
] as unknown as CircuitJson;

const multiSheetCircuitJson = [
  {
    type: "schematic_sheet",
    schematic_sheet_id: "sheet_system_diagram",
    name: "system_diagram",
    sheet_index: 0,
  },
  {
    type: "schematic_graphic",
    schematic_graphic_id: "graphic_system_diagram",
    schematic_sheet_id: "sheet_system_diagram",
    svg_content: '<svg xmlns="http://www.w3.org/2000/svg" />',
  },
  {
    type: "schematic_component_overlap_warning",
    schematic_component_overlap_warning_id: "warning_system_diagram",
    schematic_sheet_id: "sheet_system_diagram",
    warning_type: "schematic_component_overlap_warning",
    message: "Diagnostic-only metadata should not keep this sheet",
    schematic_component_ids: ["missing_1", "missing_2"],
  },
  {
    type: "schematic_sheet",
    schematic_sheet_id: "sheet_detail",
    name: "detail",
    sheet_index: 1,
  },
  {
    type: "schematic_sheet",
    schematic_sheet_id: "sheet_empty_detail",
    name: "empty_detail",
    sheet_index: 2,
  },
  {
    type: "schematic_sheet",
    schematic_sheet_id: "sheet_mixed_detail",
    name: "mixed_graphic_detail",
    sheet_index: 3,
  },
  {
    type: "schematic_graphic",
    schematic_graphic_id: "graphic_mixed_detail",
    schematic_sheet_id: "sheet_mixed_detail",
    svg_content: '<svg xmlns="http://www.w3.org/2000/svg" />',
  },
  {
    type: "schematic_text",
    schematic_text_id: "text_mixed_detail",
    schematic_sheet_id: "sheet_mixed_detail",
    text: "Real schematic content",
    position: { x: 0, y: 0 },
    font_size: 1,
    rotation: 0,
    anchor: "center",
    color: "#000000",
  },
  ...circuitJson.map((element) =>
    element.type.startsWith("schematic_")
      ? { ...element, schematic_sheet_id: "sheet_detail" }
      : element,
  ),
] as unknown as CircuitJson;

const expectZipSignature = async (blob: Blob): Promise<Uint8Array> => {
  expect(blob.type).toBe("application/zip");
  const bytes = new Uint8Array(await blob.arrayBuffer());
  expect([...bytes.slice(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
  return bytes;
};

describe("ECAD project ZIP exports", () => {
  test("creates a real KiCad project archive", async () => {
    const blob = await createKicadProjectZipBlob(circuitJson, {
      projectName: "demo board",
    });
    const archive = unzipSync(await expectZipSignature(blob));

    expect(Object.keys(archive).sort()).toEqual([
      "demo-board.kicad_pcb",
      "demo-board.kicad_pro",
      "demo-board.kicad_sch",
    ]);
    expect(
      strFromU8(archive["demo-board.kicad_pcb"] ?? new Uint8Array()),
    ).toStartWith("(kicad_pcb");
    expect(
      strFromU8(archive["demo-board.kicad_sch"] ?? new Uint8Array()),
    ).toStartWith("(kicad_sch");
    expect(
      JSON.parse(strFromU8(archive["demo-board.kicad_pro"] ?? new Uint8Array()))
        .head.project_name,
    ).toBe("demo-board");
    expect(getKicadProjectZipFileName({ projectName: "demo board" })).toBe(
      "demo-board.kicad-project.zip",
    );
  });

  test("preserves evaluated footprint pads in the KiCad PCB", async () => {
    const evaluated = await evaluateGeneratedTsx(
      `
import "tscircuit"

export default () => (
  <board width="10mm" height="10mm" routingDisabled>
    <schematicsheet name="fixture" displayName="Fixture" sheetIndex={0} />
    <resistor
      name="R1"
      resistance="10k"
      footprint="0402"
      pcbX={0}
      pcbY={0}
    />
  </board>
)
`,
      {
        mainComponentPath: "footprint-fixture.tsx",
        timeoutMs: 15_000,
      },
    );

    expect(
      evaluated.circuitJson.filter(
        (element) => element.type === "pcb_component",
      ),
    ).toHaveLength(1);
    expect(
      evaluated.circuitJson.filter((element) => element.type === "pcb_smtpad"),
    ).toHaveLength(2);

    const blob = await createKicadProjectZipBlob(evaluated.circuitJson, {
      projectName: "footprint-fixture",
    });
    const archive = unzipSync(await expectZipSignature(blob));
    const pcb = strFromU8(
      archive["footprint-fixture.kicad_pcb"] ?? new Uint8Array(),
    );

    expect(pcb.match(/\(footprint\b/g)).toHaveLength(1);
    expect(pcb.match(/\(pad\b/g)).toHaveLength(2);
    expect(pcb).toContain('(property "Reference" "R1"');
  });

  test("creates a real native Altium project archive", async () => {
    const blob = await createAltiumProjectZipBlob(circuitJson, {
      projectName: "demo board",
    });
    const archive = unzipSync(await expectZipSignature(blob));

    expect(Object.keys(archive).sort()).toEqual([
      "README.txt",
      "demo-board.PcbDoc",
      "demo-board.PrjPcb",
      "demo-board.SchDoc",
    ]);
    const compoundFileMagic = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
    expect([...(archive["demo-board.PcbDoc"]?.slice(0, 8) ?? [])]).toEqual(
      compoundFileMagic,
    );
    expect([...(archive["demo-board.SchDoc"]?.slice(0, 8) ?? [])]).toEqual(
      compoundFileMagic,
    );
    expect(
      strFromU8(archive["demo-board.PrjPcb"] ?? new Uint8Array()),
    ).toContain("demo-board.PcbDoc");
    const readme = strFromU8(archive["README.txt"] ?? new Uint8Array());
    expect(readme).toContain("schematic-first project");
    expect(readme).toContain("it is not a routed system-board layout");
    expect(readme).not.toContain("routed Circuit JSON");
    expect(getAltiumProjectZipFileName({ projectName: "demo board" })).toBe(
      "demo-board.altium-project.zip",
    );
  });

  test("omits only graphic-only System Diagram child sheets", async () => {
    const prepared = prepareCircuitJsonForEcadExport(multiSheetCircuitJson);
    expect(
      prepared
        .filter((element) => element.type === "schematic_sheet")
        .map((sheet) => sheet.schematic_sheet_id),
    ).toEqual(["sheet_detail", "sheet_empty_detail", "sheet_mixed_detail"]);
    expect(
      prepared
        .filter((element) => element.type === "schematic_graphic")
        .map((graphic) => graphic.schematic_graphic_id),
    ).toEqual(["graphic_mixed_detail"]);
    expect(
      prepared.some(
        (element) =>
          "schematic_sheet_id" in element &&
          element.schematic_sheet_id === "sheet_system_diagram",
      ),
    ).toBe(false);
    expect(
      prepared.some(
        (element) =>
          element.type === "source_component" &&
          element.source_component_id === "source_component_0",
      ),
    ).toBe(true);
    expect(
      prepared.some(
        (element) =>
          element.type === "schematic_text" &&
          element.schematic_sheet_id === "sheet_mixed_detail",
      ),
    ).toBe(true);

    const [kicadBytes, altiumBytes] = await Promise.all([
      createKicadProjectZipBlob(multiSheetCircuitJson, {
        projectName: "multi-sheet",
      }).then(expectZipSignature),
      createAltiumProjectZipBlob(multiSheetCircuitJson, {
        projectName: "multi-sheet",
      }).then(expectZipSignature),
    ]);
    const kicadEntries = Object.keys(unzipSync(kicadBytes)).sort();
    const altiumEntries = Object.keys(unzipSync(altiumBytes)).sort();

    expect(kicadEntries).toEqual([
      "detail.kicad_sch",
      "empty_detail.kicad_sch",
      "mixed_graphic_detail.kicad_sch",
      "multi-sheet.kicad_pcb",
      "multi-sheet.kicad_pro",
      "multi-sheet.kicad_sch",
    ]);
    expect(kicadEntries).not.toContain("system_diagram.kicad_sch");
    expect(altiumEntries).toEqual([
      "README.txt",
      "multi-sheet-01.SchDoc",
      "multi-sheet-02.SchDoc",
      "multi-sheet-03.SchDoc",
      "multi-sheet.PcbDoc",
      "multi-sheet.PrjPcb",
      "multi-sheet.SchDoc",
    ]);
  });

  test("still exports legacy schematic-only Circuit JSON", async () => {
    const schematicOnlyCircuitJson = circuitJson.filter(
      (element) => !element.type.startsWith("pcb_"),
    );
    const [kicadBytes, altiumBytes] = await Promise.all([
      createKicadProjectZipBlob(schematicOnlyCircuitJson).then(
        expectZipSignature,
      ),
      createAltiumProjectZipBlob(schematicOnlyCircuitJson).then(
        expectZipSignature,
      ),
    ]);

    expect(Object.keys(unzipSync(kicadBytes))).toContain(
      "GeneratedSystem.kicad_sch",
    );
    expect(Object.keys(unzipSync(altiumBytes))).toContain(
      "GeneratedSystem.SchDoc",
    );
  });

  test("uses portable filenames for untrusted project names", () => {
    expect(getKicadProjectZipFileName({ projectName: "../../CON" })).toBe(
      "project-CON.kicad-project.zip",
    );
    expect(getAltiumProjectZipFileName({ projectName: "   " })).toBe(
      "GeneratedSystem.altium-project.zip",
    );
  });
});
