import { jsPDF } from "jspdf";
import { svg2pdf } from "svg2pdf.js";
import { downloadBlob } from "./download-blob";

export { downloadBlob } from "./download-blob";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const DEFAULT_FILE_NAME = "system-schematic.pdf";
const DEFAULT_ORIENTATION = "landscape";

/** The evaluator's richer sheet objects are structurally assignable here. */
export interface SchematicPdfSheet {
  svg: string;
  title?: string;
}

export type SchematicPdfInput = string | readonly SchematicPdfSheet[];

export interface SchematicPdfOptions {
  /** Fixed orientation used by every page. Defaults to A4 landscape. */
  orientation?: "portrait" | "landscape";
  format?: string | readonly [number, number];
  /** PDF document metadata title. */
  title?: string;
}

export interface DownloadSchematicPdfOptions extends SchematicPdfOptions {
  fileName?: string;
}

interface SvgDimensions {
  width: number;
  height: number;
}

export interface SchematicPdfPageLayoutRequest {
  pageWidthMm: number;
  pageHeightMm: number;
}

export interface SchematicPdfPageLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PreparedSheet {
  element: Element;
}

const parseSvg = (svg: string): Element => {
  if (typeof DOMParser === "undefined") {
    throw new Error("PDF export requires a browser DOMParser");
  }

  // XML entities and doctypes are not needed in circuit-to-svg output and can
  // make untrusted XML parsing surprising across browser implementations.
  if (/<!DOCTYPE|<!ENTITY/i.test(svg)) {
    throw new Error("SVG doctypes and entities are not supported");
  }

  const parsed = new DOMParser().parseFromString(svg, "image/svg+xml");
  if (parsed.querySelector("parsererror")) {
    throw new Error("Unable to export malformed SVG");
  }

  const root = parsed.documentElement;
  if (root.localName !== "svg" || root.namespaceURI !== SVG_NAMESPACE) {
    throw new Error("PDF export input must have an SVG root element");
  }

  for (const element of [root, ...root.querySelectorAll("*")]) {
    const localName = element.localName.toLowerCase();
    if (
      localName === "script" ||
      localName === "foreignobject" ||
      localName === "iframe" ||
      localName === "object" ||
      localName === "embed"
    ) {
      throw new Error(`Unsafe SVG element <${element.localName}>`);
    }

    for (const attribute of element.attributes) {
      if (
        attribute.localName.toLowerCase().startsWith("on") ||
        /javascript\s*:/i.test(attribute.value)
      ) {
        throw new Error(`Unsafe SVG attribute ${attribute.name}`);
      }
    }
  }

  return root;
};

const parsePositiveNumber = (value: string | null): number | undefined => {
  if (value === null) return undefined;
  const match = value.trim().match(/^([+]?(?:\d+\.?\d*|\.\d+))/);
  if (!match) return undefined;
  const number = Number(match[1]);
  return Number.isFinite(number) && number > 0 ? number : undefined;
};

const getSvgDimensions = (svg: Element): SvgDimensions => {
  const viewBox = svg
    .getAttribute("viewBox")
    ?.trim()
    .split(/[\s,]+/)
    .map(Number);

  if (
    viewBox?.length === 4 &&
    viewBox.every(Number.isFinite) &&
    viewBox[2] > 0 &&
    viewBox[3] > 0
  ) {
    return { width: viewBox[2], height: viewBox[3] };
  }

  return {
    width: parsePositiveNumber(svg.getAttribute("width")) ?? 1200,
    height: parsePositiveNumber(svg.getAttribute("height")) ?? 600,
  };
};

const normalizeSvgViewport = (
  svg: Element,
  dimensions: SvgDimensions,
): void => {
  // circuit-to-svg currently emits width/height without a viewBox. svg2pdf's
  // width/height options resize its viewport but do not scale that SVG's user
  // coordinate system, which clips the drawing. Supplying this viewBox and
  // disabling aspect preservation stretches the viewport over the full page.
  if (!svg.hasAttribute("viewBox")) {
    svg.setAttribute("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);
  }
  svg.setAttribute("preserveAspectRatio", "none");
};

const validateFinitePositive = (name: string, value: number): void => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite number`);
  }
};

/** Stretches one schematic over the full PDF page. */
export function calculateSchematicPdfPageLayout({
  pageWidthMm,
  pageHeightMm,
}: SchematicPdfPageLayoutRequest): SchematicPdfPageLayout {
  validateFinitePositive("pageWidthMm", pageWidthMm);
  validateFinitePositive("pageHeightMm", pageHeightMm);

  return {
    x: 0,
    y: 0,
    width: pageWidthMm,
    height: pageHeightMm,
  };
}

const prepareSheets = (input: SchematicPdfInput): PreparedSheet[] => {
  const sheets: readonly SchematicPdfSheet[] =
    typeof input === "string" ? [{ svg: input }] : input;
  if (sheets.length === 0) {
    throw new RangeError("At least one schematic sheet is required");
  }

  // Parse every sheet before creating the PDF so invalid later pages never
  // produce a partial download.
  return sheets.map((sheet, index) => {
    if (typeof sheet.svg !== "string" || sheet.svg.trim().length === 0) {
      throw new TypeError(`Schematic sheet ${index + 1} has no SVG content`);
    }
    const element = parseSvg(sheet.svg);
    const dimensions = getSvgDimensions(element);
    normalizeSvgViewport(element, dimensions);
    return { element };
  });
};

/** Converts one or more schematic SVGs into a vector, one-sheet-per-page PDF. */
export async function createSchematicPdfBlob(
  input: SchematicPdfInput,
  options: SchematicPdfOptions = {},
): Promise<Blob> {
  const sheets = prepareSheets(input);

  const format: string | number[] =
    typeof options.format === "string" || options.format === undefined
      ? (options.format ?? "a4")
      : [options.format[0], options.format[1]];
  const orientation = options.orientation ?? DEFAULT_ORIENTATION;
  const pdf = new jsPDF({
    orientation,
    unit: "mm",
    format,
    compress: true,
  });

  pdf.setProperties({
    ...(options.title ? { title: options.title } : {}),
    creator: "tscircuit system block UI",
  });

  for (const [index, sheet] of sheets.entries()) {
    if (index > 0) pdf.addPage(format, orientation);

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const layout = calculateSchematicPdfPageLayout({
      pageWidthMm: pageWidth,
      pageHeightMm: pageHeight,
    });

    await svg2pdf(sheet.element, pdf, {
      x: layout.x,
      y: layout.y,
      width: layout.width,
      height: layout.height,
      loadExternalStyleSheets: false,
    });
  }

  return pdf.output("blob");
}

/** Builds and downloads a vector schematic PDF, returning the downloaded Blob. */
export async function downloadSchematicPdf(
  input: SchematicPdfInput,
  options: DownloadSchematicPdfOptions = {},
): Promise<Blob> {
  const blob = await createSchematicPdfBlob(input, options);
  downloadBlob(blob, options.fileName ?? DEFAULT_FILE_NAME);
  return blob;
}

export const exportSchematicPdf = downloadSchematicPdf;
