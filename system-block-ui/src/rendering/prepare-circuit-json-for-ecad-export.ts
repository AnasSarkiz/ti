import type { CircuitJson } from "circuit-json";

type CircuitElement = CircuitJson[number];

const getSchematicSheetId = (element: CircuitElement): string | undefined => {
  if (!("schematic_sheet_id" in element)) return undefined;
  const sheetId = element.schematic_sheet_id;
  return typeof sheetId === "string" && sheetId.length > 0
    ? sheetId
    : undefined;
};

const isActualSchematicContent = (element: CircuitElement): boolean =>
  element.type.startsWith("schematic_") &&
  element.type !== "schematic_sheet" &&
  element.type !== "schematic_graphic" &&
  !element.type.endsWith("_warning") &&
  !element.type.endsWith("_error");

/**
 * Native ECAD exporters cannot embed `schematic_graphic` SVGs. Passing a sheet
 * that contains only one of those graphics therefore creates a blank child
 * page. Remove exactly those pages while leaving ordinary empty sheets and any
 * sheet with real schematic content untouched.
 */
export const prepareCircuitJsonForEcadExport = (
  circuitJson: readonly CircuitElement[],
): CircuitElement[] => {
  const knownSheetIds = new Set<string>();
  const sheetIdsWithGraphics = new Set<string>();
  const sheetIdsWithContent = new Set<string>();

  for (const element of circuitJson) {
    const sheetId = getSchematicSheetId(element);
    if (!sheetId) continue;

    if (element.type === "schematic_sheet") {
      knownSheetIds.add(sheetId);
    } else if (element.type === "schematic_graphic") {
      sheetIdsWithGraphics.add(sheetId);
    } else if (isActualSchematicContent(element)) {
      sheetIdsWithContent.add(sheetId);
    }
  }

  const graphicOnlySheetIds = new Set(
    [...knownSheetIds].filter(
      (sheetId) =>
        sheetIdsWithGraphics.has(sheetId) && !sheetIdsWithContent.has(sheetId),
    ),
  );

  if (graphicOnlySheetIds.size === 0) return [...circuitJson];

  return circuitJson.filter((element) => {
    const sheetId = getSchematicSheetId(element);
    return !sheetId || !graphicOnlySheetIds.has(sheetId);
  });
};
