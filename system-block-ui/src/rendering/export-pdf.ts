import { jsPDF } from "jspdf";
import { svg2pdf } from "svg2pdf.js";
import { downloadBlob } from "./download-blob";

export { downloadBlob } from "./download-blob";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const DEFAULT_FILE_NAME = "system-schematic.pdf";
const DEFAULT_MARGIN_MM = 10;

export interface SchematicPdfOptions {
  orientation?: "portrait" | "landscape";
  format?: string | readonly [number, number];
  marginMm?: number;
  title?: string;
}

export interface DownloadSchematicPdfOptions extends SchematicPdfOptions {
  fileName?: string;
}

interface SvgDimensions {
  width: number;
  height: number;
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

const validateMargin = (marginMm: number): void => {
  if (!Number.isFinite(marginMm) || marginMm < 0) {
    throw new RangeError("marginMm must be a non-negative finite number");
  }
};

/** Converts a schematic SVG into a vector PDF Blob without starting a download. */
export async function createSchematicPdfBlob(
  svg: string,
  options: SchematicPdfOptions = {},
): Promise<Blob> {
  const svgElement = parseSvg(svg);
  const dimensions = getSvgDimensions(svgElement);
  const marginMm = options.marginMm ?? DEFAULT_MARGIN_MM;
  validateMargin(marginMm);

  const format: string | number[] | undefined =
    typeof options.format === "string" || options.format === undefined
      ? options.format
      : [options.format[0], options.format[1]];
  const pdf = new jsPDF({
    orientation:
      options.orientation ??
      (dimensions.width >= dimensions.height ? "landscape" : "portrait"),
    unit: "mm",
    format: format ?? "a4",
    compress: true,
  });

  if (options.title) {
    pdf.setProperties({
      title: options.title,
      creator: "tscircuit system block UI",
    });
  }

  const availableWidth = pdf.internal.pageSize.getWidth() - marginMm * 2;
  const availableHeight = pdf.internal.pageSize.getHeight() - marginMm * 2;
  if (availableWidth <= 0 || availableHeight <= 0) {
    throw new RangeError("marginMm leaves no printable area on the PDF page");
  }

  const scale = Math.min(
    availableWidth / dimensions.width,
    availableHeight / dimensions.height,
  );
  const renderedWidth = dimensions.width * scale;
  const renderedHeight = dimensions.height * scale;

  await svg2pdf(svgElement, pdf, {
    x: (pdf.internal.pageSize.getWidth() - renderedWidth) / 2,
    y: (pdf.internal.pageSize.getHeight() - renderedHeight) / 2,
    width: renderedWidth,
    height: renderedHeight,
    loadExternalStyleSheets: false,
  });

  return pdf.output("blob");
}

/** Builds and downloads a vector schematic PDF, returning the downloaded Blob. */
export async function downloadSchematicPdf(
  svg: string,
  options: DownloadSchematicPdfOptions = {},
): Promise<Blob> {
  const blob = await createSchematicPdfBlob(svg, options);
  downloadBlob(blob, options.fileName ?? DEFAULT_FILE_NAME);
  return blob;
}

export const exportSchematicPdf = downloadSchematicPdf;
