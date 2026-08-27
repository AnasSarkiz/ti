import type {
  AnyCircuitElement,
  SchematicGraphic,
  SchematicSheet,
} from "circuit-json";

export const DEFAULT_SYSTEM_DIAGRAM_GRAPHIC_ID =
  "schematic_graphic_system_diagram";

export type SystemDiagramGraphicAttachmentErrorCode =
  | "INVALID_SHEET_NAME"
  | "INVALID_SVG_CONTENT"
  | "INVALID_GRAPHIC_ID"
  | "MISSING_SHEET"
  | "DUPLICATE_SHEET"
  | "GRAPHIC_ID_COLLISION";

export class SystemDiagramGraphicAttachmentError extends Error {
  readonly code: SystemDiagramGraphicAttachmentErrorCode;

  constructor(code: SystemDiagramGraphicAttachmentErrorCode, message: string) {
    super(message);
    this.name = "SystemDiagramGraphicAttachmentError";
    this.code = code;
  }
}

export interface AttachSystemDiagramGraphicOptions {
  /** Exact `name` of the schematic sheet that owns the system diagram. */
  sheetName: string;
  /** Complete, standalone SVG markup, including the root `<svg>` element. */
  svgContent: string;
  /** Stable Circuit JSON id for the attached graphic. */
  schematicGraphicId?: string;
}

const isNamedSchematicSheet = (
  element: AnyCircuitElement,
  sheetName: string,
): element is SchematicSheet =>
  element.type === "schematic_sheet" && element.name === sheetName;

const assertNonEmptyString = (
  value: string,
  code: SystemDiagramGraphicAttachmentErrorCode,
  fieldName: string,
): void => {
  if (value.trim().length === 0) {
    throw new SystemDiagramGraphicAttachmentError(
      code,
      `${fieldName} must not be empty.`,
    );
  }
};

/**
 * Adds the system diagram to evaluated Circuit JSON using the same inline SVG
 * asset representation emitted by `@tscircuit/core`'s `<schematicgraphic />`.
 * The input array and all of its elements are left untouched.
 */
export const attachSystemDiagramGraphic = (
  circuitJson: readonly AnyCircuitElement[],
  options: AttachSystemDiagramGraphicOptions,
): AnyCircuitElement[] => {
  const {
    sheetName,
    svgContent,
    schematicGraphicId = DEFAULT_SYSTEM_DIAGRAM_GRAPHIC_ID,
  } = options;

  assertNonEmptyString(sheetName, "INVALID_SHEET_NAME", "sheetName");
  assertNonEmptyString(svgContent, "INVALID_SVG_CONTENT", "svgContent");
  assertNonEmptyString(
    schematicGraphicId,
    "INVALID_GRAPHIC_ID",
    "schematicGraphicId",
  );

  const matchingSheets = circuitJson.filter((element) =>
    isNamedSchematicSheet(element, sheetName),
  );
  if (matchingSheets.length === 0) {
    throw new SystemDiagramGraphicAttachmentError(
      "MISSING_SHEET",
      `Cannot attach the system diagram: no schematic sheet named ${JSON.stringify(sheetName)} exists.`,
    );
  }
  if (matchingSheets.length > 1) {
    throw new SystemDiagramGraphicAttachmentError(
      "DUPLICATE_SHEET",
      `Cannot attach the system diagram: ${matchingSheets.length} schematic sheets are named ${JSON.stringify(sheetName)}.`,
    );
  }

  const hasIdCollision = circuitJson.some(
    (element) =>
      element.type === "schematic_graphic" &&
      element.schematic_graphic_id === schematicGraphicId,
  );
  if (hasIdCollision) {
    throw new SystemDiagramGraphicAttachmentError(
      "GRAPHIC_ID_COLLISION",
      `Cannot attach the system diagram: schematic graphic id ${JSON.stringify(schematicGraphicId)} already exists.`,
    );
  }

  const sheet = matchingSheets[0];
  const graphic: SchematicGraphic = {
    type: "schematic_graphic",
    schematic_graphic_id: schematicGraphicId,
    schematic_sheet_id: sheet.schematic_sheet_id,
    asset: {
      project_relative_path: "inline",
      url: `data:image/svg+xml,${encodeURIComponent(svgContent)}`,
      mimetype: "image/svg+xml",
    },
  };

  return [...circuitJson, graphic];
};
