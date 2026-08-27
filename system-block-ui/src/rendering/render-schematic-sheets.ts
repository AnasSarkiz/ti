import type { AnyCircuitElement, SchematicSheet } from "circuit-json";
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg";

type CircuitToSvgOptions = NonNullable<
  Parameters<typeof convertCircuitJsonToSchematicSvg>[1]
>;

/** Options shared by every rendered sheet. Sheet selection is handled here. */
export type SchematicSvgOptions = Omit<
  CircuitToSvgOptions,
  "schematicSheetId" | "schematicSheetIndex"
>;

export interface EvaluatedSchematicSheet {
  /** Circuit JSON's stable schematic_sheet_id. */
  id: string;
  /** Internal sheet name used by generated component placement. */
  name: string;
  /** Human-readable display name, falling back to the internal name. */
  title: string;
  /** Sheet order from Circuit JSON (or source order for legacy metadata). */
  sheetIndex: number;
  svg: string;
}

type RuntimeSchematicSheet = SchematicSheet & {
  // @tscircuit/core emits this field, though the pinned circuit-json public
  // SchematicSheet interface has not yet added it.
  display_name?: unknown;
};

interface IndexedSheet {
  sourceOrder: number;
  sheet: RuntimeSchematicSheet;
  sheetIndex: number;
}

const getNonEmptyString = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  return value.trim().length > 0 ? value : undefined;
};

const getIndexedSheets = (
  circuitJson: readonly AnyCircuitElement[],
): IndexedSheet[] =>
  circuitJson
    .filter(
      (element): element is RuntimeSchematicSheet =>
        element.type === "schematic_sheet",
    )
    .map((sheet, sourceOrder) => ({
      sourceOrder,
      sheet,
      sheetIndex: Number.isFinite(sheet.sheet_index)
        ? (sheet.sheet_index as number)
        : sourceOrder,
    }))
    .sort(
      (a, b) => a.sheetIndex - b.sheetIndex || a.sourceOrder - b.sourceOrder,
    );

/**
 * Renders every Circuit JSON schematic sheet as an independent SVG, ordered by
 * sheetIndex. Designs created before schematic_sheet metadata receive one
 * backwards-compatible synthetic page.
 */
export function renderSchematicSheets(
  circuitJson: AnyCircuitElement[],
  options: SchematicSvgOptions = {},
): EvaluatedSchematicSheet[] {
  const indexedSheets = getIndexedSheets(circuitJson);

  if (indexedSheets.length === 0) {
    return [
      {
        id: "default",
        name: "Schematic",
        title: "Schematic",
        sheetIndex: 0,
        svg: convertCircuitJsonToSchematicSvg(circuitJson, options),
      },
    ];
  }

  return indexedSheets.map(({ sheet, sheetIndex }, orderedIndex) => {
    const fallbackName = `Sheet ${orderedIndex + 1}`;
    const name = getNonEmptyString(sheet.name) ?? fallbackName;
    const title = getNonEmptyString(sheet.display_name) ?? name;

    return {
      id: sheet.schematic_sheet_id,
      name,
      title,
      sheetIndex,
      svg: convertCircuitJsonToSchematicSvg(circuitJson, {
        ...options,
        schematicSheetId: sheet.schematic_sheet_id,
        schematicSheetIndex: undefined,
      }),
    };
  });
}
