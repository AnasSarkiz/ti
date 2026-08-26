import { describe, expect, test } from "bun:test";
import { Circuit } from "@tscircuit/core";
import type { AnyCircuitElement } from "circuit-json";
import { createElement } from "react";
import { renderSchematicSheets } from "./render-schematic-sheets";

const element = (value: unknown): AnyCircuitElement =>
  value as AnyCircuitElement;

describe("renderSchematicSheets", () => {
  test("renders every sheet separately in sheet-index order", () => {
    const circuitJson = [
      element({
        type: "schematic_sheet",
        schematic_sheet_id: "sheet_audio",
        name: "audio",
        display_name: "Audio output",
        sheet_index: 4,
      }),
      element({
        type: "schematic_sheet",
        schematic_sheet_id: "sheet_power",
        name: "power",
        display_name: "Power supply",
        sheet_index: 0,
      }),
      element({
        type: "schematic_sheet",
        schematic_sheet_id: "sheet_mcu",
        name: "mcu",
        sheet_index: 2,
      }),
    ];

    const sheets = renderSchematicSheets(circuitJson, {
      width: 200,
      height: 100,
    });

    expect(
      sheets.map(({ id, name, title, sheetIndex }) => ({
        id,
        name,
        title,
        sheetIndex,
      })),
    ).toEqual([
      {
        id: "sheet_power",
        name: "power",
        title: "Power supply",
        sheetIndex: 0,
      },
      {
        id: "sheet_mcu",
        name: "mcu",
        title: "mcu",
        sheetIndex: 2,
      },
      {
        id: "sheet_audio",
        name: "audio",
        title: "Audio output",
        sheetIndex: 4,
      },
    ]);

    for (const sheet of sheets) {
      expect(sheet.svg).toContain(`data-schematic-sheet-id="${sheet.id}"`);
      for (const otherSheet of sheets) {
        if (otherSheet.id !== sheet.id) {
          expect(sheet.svg).not.toContain(
            `data-schematic-sheet-id="${otherSheet.id}"`,
          );
        }
      }
    }
  });

  test("keeps legacy sheetless Circuit JSON renderable", () => {
    const [sheet] = renderSchematicSheets([], { width: 200, height: 100 });

    expect(sheet).toMatchObject({
      id: "default",
      name: "Schematic",
      title: "Schematic",
      sheetIndex: 0,
    });
    expect(sheet?.svg).toContain("<svg");
  });

  test("renders all schematic sheets emitted by the pinned core", async () => {
    const circuit = new Circuit();
    circuit.pcbDisabled = true;
    circuit.pcbRoutingDisabled = true;
    circuit.add(
      createElement(
        "board",
        { routingDisabled: true },
        ...["Power", "MCU", "Audio", "Sensor", "Display"].map(
          (title, sheetIndex) =>
            createElement("schematicsheet", {
              key: title,
              name: title.toLowerCase(),
              displayName: title,
              sheetIndex,
            }),
        ),
      ),
    );

    await circuit.renderUntilSettled();
    const sheets = renderSchematicSheets(circuit.getCircuitJson(), {
      width: 200,
      height: 100,
    });

    expect(sheets).toHaveLength(5);
    expect(sheets.map((sheet) => sheet.title)).toEqual([
      "Power",
      "MCU",
      "Audio",
      "Sensor",
      "Display",
    ]);
    expect(sheets.map((sheet) => sheet.sheetIndex)).toEqual([0, 1, 2, 3, 4]);
  });
});
