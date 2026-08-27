import { describe, expect, test } from "bun:test";
import type { AnyCircuitElement } from "circuit-json";
import {
  attachSystemDiagramGraphic,
  DEFAULT_SYSTEM_DIAGRAM_GRAPHIC_ID,
  SystemDiagramGraphicAttachmentError,
} from "./attach-system-diagram-graphic";
import { renderSchematicSheets } from "./render-schematic-sheets";

const element = (value: unknown): AnyCircuitElement =>
  value as AnyCircuitElement;

const systemDiagramSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <rect width="200" height="100" fill="#f8fafc" />
  <text x="100" y="55" text-anchor="middle">System Diagram</text>
</svg>
`;

const systemSheet = element({
  type: "schematic_sheet",
  schematic_sheet_id: "schematic_sheet_system",
  name: "system_diagram",
  display_name: "System Diagram",
  sheet_index: 0,
});

const expectAttachmentError = (
  callback: () => unknown,
  code: SystemDiagramGraphicAttachmentError["code"],
): void => {
  try {
    callback();
    throw new Error("Expected the attachment to fail");
  } catch (error) {
    expect(error).toBeInstanceOf(SystemDiagramGraphicAttachmentError);
    expect((error as SystemDiagramGraphicAttachmentError).code).toBe(code);
  }
};

describe("attachSystemDiagramGraphic", () => {
  test("immutably attaches the same inline SVG asset shape emitted by core", () => {
    const input = [
      systemSheet,
      element({
        type: "schematic_sheet",
        schematic_sheet_id: "schematic_sheet_details",
        name: "details",
        display_name: "Details",
        sheet_index: 1,
      }),
    ];

    const result = attachSystemDiagramGraphic(input, {
      sheetName: "system_diagram",
      svgContent: systemDiagramSvg,
    });

    expect(result).not.toBe(input);
    expect(input).toHaveLength(2);
    expect(result.slice(0, input.length)).toEqual(input);
    expect(result.at(-1)).toEqual({
      type: "schematic_graphic",
      schematic_graphic_id: DEFAULT_SYSTEM_DIAGRAM_GRAPHIC_ID,
      schematic_sheet_id: "schematic_sheet_system",
      asset: {
        project_relative_path: "inline",
        url: `data:image/svg+xml,${encodeURIComponent(systemDiagramSvg)}`,
        mimetype: "image/svg+xml",
      },
    });
  });

  test("rejects a missing named sheet", () => {
    expectAttachmentError(
      () =>
        attachSystemDiagramGraphic([], {
          sheetName: "system_diagram",
          svgContent: systemDiagramSvg,
        }),
      "MISSING_SHEET",
    );
  });

  test("rejects duplicate named sheets", () => {
    expectAttachmentError(
      () =>
        attachSystemDiagramGraphic(
          [
            systemSheet,
            element({
              ...systemSheet,
              schematic_sheet_id: "schematic_sheet_duplicate",
            }),
          ],
          {
            sheetName: "system_diagram",
            svgContent: systemDiagramSvg,
          },
        ),
      "DUPLICATE_SHEET",
    );
  });

  test("rejects an existing schematic graphic id", () => {
    expectAttachmentError(
      () =>
        attachSystemDiagramGraphic(
          [
            systemSheet,
            element({
              type: "schematic_graphic",
              schematic_graphic_id: DEFAULT_SYSTEM_DIAGRAM_GRAPHIC_ID,
              schematic_sheet_id: "schematic_sheet_system",
              asset: {
                project_relative_path: "inline",
                url: "data:image/svg+xml,%3Csvg%2F%3E",
                mimetype: "image/svg+xml",
              },
            }),
          ],
          {
            sheetName: "system_diagram",
            svgContent: systemDiagramSvg,
          },
        ),
      "GRAPHIC_ID_COLLISION",
    );
  });

  test("renders the attached graphic only on its named sheet", () => {
    const circuitJson = attachSystemDiagramGraphic(
      [
        systemSheet,
        element({
          type: "schematic_sheet",
          schematic_sheet_id: "schematic_sheet_details",
          name: "details",
          display_name: "Details",
          sheet_index: 1,
        }),
      ],
      {
        sheetName: "system_diagram",
        svgContent: systemDiagramSvg,
      },
    );

    const sheets = renderSchematicSheets(circuitJson, {
      width: 400,
      height: 200,
    });

    expect(sheets).toHaveLength(2);
    expect(sheets[0]?.svg).toContain(
      `data-schematic-graphic-id="${DEFAULT_SYSTEM_DIAGRAM_GRAPHIC_ID}"`,
    );
    expect(sheets[0]?.svg).toContain("<image ");
    expect(sheets[1]?.svg).not.toContain("data-schematic-graphic-id");
  });
});
