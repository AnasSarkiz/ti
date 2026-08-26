import { jsPDF } from "jspdf";
import { svg2pdf } from "svg2pdf.js";
import { downloadBlob } from "./download-blob";

export { downloadBlob } from "./download-blob";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const DEFAULT_FILE_NAME = "system-schematic.pdf";
const DEFAULT_MARGIN_MM = 10;
const DEFAULT_ORIENTATION = "landscape";
const SHEET_HEADER_BAND_MM = 8;
const SHEET_HEADER_BASELINE_OFFSET_MM = 4.2;
const SHEET_HEADER_DIVIDER_OFFSET_MM = 6.2;

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
  marginMm?: number;
  /** PDF document metadata title; sheet titles come from the input array. */
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
  svgWidth: number;
  svgHeight: number;
  marginMm: number;
  hasHeader: boolean;
}

export interface SchematicPdfPageLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  headerBaselineY?: number;
  headerDividerY?: number;
}

interface PreparedSheet {
  element: Element;
  dimensions: SvgDimensions;
  title?: string;
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
  // coordinate system, which clips the drawing. Supplying this viewBox makes
  // the requested PDF dimensions an actual aspect-preserving transform.
  if (!svg.hasAttribute("viewBox")) {
    svg.setAttribute("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);
  }
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
};

const validateFinitePositive = (name: string, value: number): void => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite number`);
  }
};

const validateMargin = (marginMm: number): void => {
  if (!Number.isFinite(marginMm) || marginMm < 0) {
    throw new RangeError("marginMm must be a non-negative finite number");
  }
};

/**
 * Aspect-fit one schematic inside a PDF page without crossing its margins.
 * A headed page reserves a compact band above the schematic viewport.
 */
export function calculateSchematicPdfPageLayout({
  pageWidthMm,
  pageHeightMm,
  svgWidth,
  svgHeight,
  marginMm,
  hasHeader,
}: SchematicPdfPageLayoutRequest): SchematicPdfPageLayout {
  validateFinitePositive("pageWidthMm", pageWidthMm);
  validateFinitePositive("pageHeightMm", pageHeightMm);
  validateFinitePositive("svgWidth", svgWidth);
  validateFinitePositive("svgHeight", svgHeight);
  validateMargin(marginMm);

  const headerBand = hasHeader ? SHEET_HEADER_BAND_MM : 0;
  const contentTop = marginMm + headerBand;
  const availableWidth = pageWidthMm - marginMm * 2;
  const availableHeight = pageHeightMm - contentTop - marginMm;
  if (availableWidth <= 0 || availableHeight <= 0) {
    throw new RangeError("marginMm leaves no printable area on the PDF page");
  }

  const scale = Math.min(
    availableWidth / svgWidth,
    availableHeight / svgHeight,
  );
  const width = svgWidth * scale;
  const height = svgHeight * scale;

  return {
    x: marginMm + (availableWidth - width) / 2,
    y: contentTop + (availableHeight - height) / 2,
    width,
    height,
    ...(hasHeader
      ? {
          headerBaselineY: marginMm + SHEET_HEADER_BASELINE_OFFSET_MM,
          headerDividerY: marginMm + SHEET_HEADER_DIVIDER_OFFSET_MM,
        }
      : {}),
  };
}

const normalizeSheetTitle = (title: string | undefined): string | undefined => {
  const normalized = title?.replace(/\s+/g, " ").trim();
  return normalized || undefined;
};

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
    return {
      element,
      dimensions,
      title: normalizeSheetTitle(sheet.title),
    };
  });
};

const fitTitle = (pdf: jsPDF, title: string, maxWidth: number): string => {
  if (pdf.getTextWidth(title) <= maxWidth) return title;

  const suffix = "...";
  let end = title.length;
  while (
    end > 0 &&
    pdf.getTextWidth(`${title.slice(0, end)}${suffix}`) > maxWidth
  ) {
    end -= 1;
  }
  return `${title.slice(0, end).trimEnd()}${suffix}`;
};

const renderSheetHeader = ({
  pdf,
  title,
  pageNumber,
  pageCount,
  pageWidth,
  marginMm,
  layout,
}: {
  pdf: jsPDF;
  title?: string;
  pageNumber: number;
  pageCount: number;
  pageWidth: number;
  marginMm: number;
  layout: SchematicPdfPageLayout;
}): void => {
  if (
    layout.headerBaselineY === undefined ||
    layout.headerDividerY === undefined
  ) {
    return;
  }

  const pageLabel = `Page ${pageNumber} / ${pageCount}`;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(85, 95, 110);
  pdf.text(pageLabel, pageWidth - marginMm, layout.headerBaselineY, {
    align: "right",
  });

  if (title) {
    const labelWidth = pdf.getTextWidth(pageLabel);
    const maxTitleWidth = Math.max(
      1,
      pageWidth - marginMm * 2 - labelWidth - 8,
    );
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(45, 55, 72);
    pdf.text(
      fitTitle(pdf, title, maxTitleWidth),
      marginMm,
      layout.headerBaselineY,
    );
  }

  pdf.setDrawColor(210, 215, 222);
  pdf.setLineWidth(0.25);
  pdf.line(
    marginMm,
    layout.headerDividerY,
    pageWidth - marginMm,
    layout.headerDividerY,
  );
};

/** Converts one or more schematic SVGs into a vector, one-sheet-per-page PDF. */
export async function createSchematicPdfBlob(
  input: SchematicPdfInput,
  options: SchematicPdfOptions = {},
): Promise<Blob> {
  const sheets = prepareSheets(input);
  const marginMm = options.marginMm ?? DEFAULT_MARGIN_MM;
  validateMargin(marginMm);

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
    const hasHeader = Boolean(sheet.title) || sheets.length > 1;
    const layout = calculateSchematicPdfPageLayout({
      pageWidthMm: pageWidth,
      pageHeightMm: pageHeight,
      svgWidth: sheet.dimensions.width,
      svgHeight: sheet.dimensions.height,
      marginMm,
      hasHeader,
    });

    if (hasHeader) {
      renderSheetHeader({
        pdf,
        title: sheet.title,
        pageNumber: index + 1,
        pageCount: sheets.length,
        pageWidth,
        marginMm,
        layout,
      });
    }
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
