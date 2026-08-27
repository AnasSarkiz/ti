import { jsPDF } from "jspdf";
import { svg2pdf } from "svg2pdf.js";
import { downloadBlob } from "./download-blob";

export { downloadBlob } from "./download-blob";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const DEFAULT_FILE_NAME = "system-schematic.pdf";
const DEFAULT_ORIENTATION = "landscape";
const PDF_FONT_FAMILY = "LiberationSans";
const PDF_TEXT_ANCHOR_GAP_EM = 0.12;
const PDF_NET_LABEL_BASELINE_SHIFT_EM = 0.06;
const SHEET_OVERLAY_MARGIN_MM = 16;
const SHEET_OVERLAY_BASELINE_MM = 16;
const SHEET_OVERLAY_GAP_MM = 4;
const SHEET_OVERLAY_BACKDROP_Y_MM = 11.5;
const SHEET_OVERLAY_BACKDROP_HEIGHT_MM = 5.5;
const SHEET_OVERLAY_BACKDROP_PADDING_X_MM = 1;
const SHEET_OVERLAY_TITLE_FONT_SIZE_PT = 10;
const SHEET_OVERLAY_PAGE_FONT_SIZE_PT = 9;
const SCHEMATIC_BACKGROUND_RGB = [245, 241, 237] as const;
const EMBEDDED_PDF_FONTS = [
  {
    fileName: "LiberationSans-Regular.ttf",
    style: "normal",
    url: new URL(
      "../../node_modules/@docx-editor.dev/fonts/assets/LiberationSans-Regular.ttf",
      import.meta.url,
    ).href,
  },
  {
    fileName: "LiberationSans-Bold.ttf",
    style: "bold",
    url: new URL(
      "../../node_modules/@docx-editor.dev/fonts/assets/LiberationSans-Bold.ttf",
      import.meta.url,
    ).href,
  },
] as const;

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
  title: string;
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
  // circuit-to-svg currently emits width/height without a viewBox. Supplying
  // one lets svg2pdf scale the schematic uniformly into the PDF page.
  if (!svg.hasAttribute("viewBox")) {
    svg.setAttribute("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);
  }
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
};

export const normalizeSvgTextForPdf = (svg: Element): void => {
  for (const textElement of svg.querySelectorAll("text, tspan")) {
    textElement.setAttribute("font-family", PDF_FONT_FAMILY);
    const classes = textElement.getAttribute("class")?.split(/\s+/) ?? [];

    // circuit-to-svg adds a background-colored outline around reference
    // designators. svg2pdf paints that halo over the fill, making R/C labels
    // invisible even though their text remains in the PDF content stream.
    if (classes.includes("sch-component-name")) {
      textElement.setAttribute("stroke", "none");
      textElement.removeAttribute("stroke-width");
      textElement.removeAttribute("paint-order");
    }

    // svg2pdf reads alignment-baseline but not dominant-baseline. Copying the
    // SVG baseline keeps labels vertically centered instead of treating their
    // center coordinate as an alphabetic baseline and pushing text upward.
    const dominantBaseline = textElement.getAttribute("dominant-baseline");
    if (dominantBaseline && !textElement.hasAttribute("alignment-baseline")) {
      textElement.setAttribute("alignment-baseline", dominantBaseline);
    }

    // svg2pdf's baseline calculation lands closer to an anchor than browsers
    // do. Move text away from top/bottom anchors without changing its width,
    // and optically center middle-aligned text. Boxed net labels need a smaller
    // correction so their underscores stay clear of the bottom outline.
    if (!textElement.hasAttribute("dy")) {
      const isNetLabel = classes.includes("sch-net-label-text");
      const shiftEm =
        dominantBaseline === "hanging"
          ? PDF_TEXT_ANCHOR_GAP_EM
          : dominantBaseline === "ideographic"
            ? -PDF_TEXT_ANCHOR_GAP_EM
            : dominantBaseline === "central" || dominantBaseline === "middle"
              ? isNetLabel
                ? PDF_NET_LABEL_BASELINE_SHIFT_EM
                : PDF_TEXT_ANCHOR_GAP_EM
              : undefined;
      if (shiftEm !== undefined) {
        textElement.setAttribute("dy", `${shiftEm}em`);
      }
    }

    // Inline CSS overrides SVG presentation attributes. Appending the family
    // keeps text that circuit-to-svg emits with style="font-family: ..." on
    // the same embedded face as every other label.
    const style = textElement.getAttribute("style");
    if (style) {
      textElement.setAttribute(
        "style",
        `${style};font-family:${PDF_FONT_FAMILY}`,
      );
    }
  }
};

const validateFinitePositive = (name: string, value: number): void => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite number`);
  }
};

/** Uses the full PDF page as the schematic viewport. */
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

const bytesToBase64 = (bytes: Uint8Array): string => {
  if (typeof btoa === "undefined") {
    throw new Error("PDF export requires the browser btoa API");
  }

  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(offset, offset + chunkSize),
    );
  }
  return btoa(binary);
};

const registerPdfFonts = async (pdf: jsPDF): Promise<void> => {
  const fonts = await Promise.all(
    EMBEDDED_PDF_FONTS.map(async (font) => {
      const response = await fetch(font.url);
      if (!response.ok) {
        throw new Error(
          `Unable to load the embedded PDF font ${font.fileName}: HTTP ${response.status}`,
        );
      }
      return { ...font, bytes: new Uint8Array(await response.arrayBuffer()) };
    }),
  );

  for (const font of fonts) {
    pdf.addFileToVFS(font.fileName, bytesToBase64(font.bytes));
    pdf.addFont(font.fileName, PDF_FONT_FAMILY, font.style);
  }

  pdf.setFont(PDF_FONT_FAMILY, "normal");
};

const normalizeSheetTitle = (
  title: string | undefined,
  pageNumber: number,
  pageCount: number,
): string => {
  const normalized = title?.replace(/\s+/g, " ").trim();
  if (normalized) return normalized;
  return pageCount === 1 ? "Schematic" : `Sheet ${pageNumber}`;
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
    normalizeSvgTextForPdf(element);
    return {
      element,
      title: normalizeSheetTitle(sheet.title, index + 1, sheets.length),
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

/** Draws the sheet name and page count after the SVG so they remain on top. */
export const renderSchematicPdfSheetOverlay = ({
  pdf,
  title,
  pageNumber,
  pageCount,
  pageWidthMm,
}: {
  pdf: jsPDF;
  title: string;
  pageNumber: number;
  pageCount: number;
  pageWidthMm: number;
}): void => {
  const pageLabel = `${pageNumber}/${pageCount}`;

  pdf.setFont(PDF_FONT_FAMILY, "normal");
  pdf.setFontSize(SHEET_OVERLAY_PAGE_FONT_SIZE_PT);
  const pageLabelWidth = pdf.getTextWidth(pageLabel);

  pdf.setFont(PDF_FONT_FAMILY, "bold");
  pdf.setFontSize(SHEET_OVERLAY_TITLE_FONT_SIZE_PT);
  const maxTitleWidth = Math.max(
    1,
    pageWidthMm -
      SHEET_OVERLAY_MARGIN_MM * 2 -
      pageLabelWidth -
      SHEET_OVERLAY_GAP_MM,
  );
  const fittedTitle = fitTitle(pdf, title, maxTitleWidth);
  const fittedTitleWidth = pdf.getTextWidth(fittedTitle);

  pdf.setFillColor(...SCHEMATIC_BACKGROUND_RGB);
  pdf.rect(
    SHEET_OVERLAY_MARGIN_MM - SHEET_OVERLAY_BACKDROP_PADDING_X_MM,
    SHEET_OVERLAY_BACKDROP_Y_MM,
    fittedTitleWidth + SHEET_OVERLAY_BACKDROP_PADDING_X_MM * 2,
    SHEET_OVERLAY_BACKDROP_HEIGHT_MM,
    "F",
  );
  pdf.rect(
    pageWidthMm -
      SHEET_OVERLAY_MARGIN_MM -
      pageLabelWidth -
      SHEET_OVERLAY_BACKDROP_PADDING_X_MM,
    SHEET_OVERLAY_BACKDROP_Y_MM,
    pageLabelWidth + SHEET_OVERLAY_BACKDROP_PADDING_X_MM * 2,
    SHEET_OVERLAY_BACKDROP_HEIGHT_MM,
    "F",
  );

  pdf.setTextColor(45, 55, 72);
  pdf.text(fittedTitle, SHEET_OVERLAY_MARGIN_MM, SHEET_OVERLAY_BASELINE_MM);

  pdf.setFont(PDF_FONT_FAMILY, "normal");
  pdf.setFontSize(SHEET_OVERLAY_PAGE_FONT_SIZE_PT);
  pdf.text(
    pageLabel,
    pageWidthMm - SHEET_OVERLAY_MARGIN_MM,
    SHEET_OVERLAY_BASELINE_MM,
    { align: "right" },
  );
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
    putOnlyUsedFonts: true,
  });

  await registerPdfFonts(pdf);

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
    renderSchematicPdfSheetOverlay({
      pdf,
      title: sheet.title,
      pageNumber: index + 1,
      pageCount: sheets.length,
      pageWidthMm: pageWidth,
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
