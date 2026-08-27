import { describe, expect, test } from "bun:test";

import {
  calculateSchematicPdfPageLayout,
  normalizeSvgTextForPdf,
  renderSchematicPdfSheetOverlay,
} from "./export-pdf";
import type { jsPDF } from "jspdf";
import {
  SCHEMATIC_SVG_HEIGHT,
  SCHEMATIC_SVG_WIDTH,
} from "./schematic-page-size";

describe("schematic PDF page layout", () => {
  test("matches the schematic canvas to A4 landscape", () => {
    expect(SCHEMATIC_SVG_HEIGHT).toBe(990);
    expect(SCHEMATIC_SVG_WIDTH / SCHEMATIC_SVG_HEIGHT).toBeCloseTo(
      297 / 210,
      3,
    );
  });

  test("uses an entire A4 landscape page", () => {
    const layout = calculateSchematicPdfPageLayout({
      pageWidthMm: 297,
      pageHeightMm: 210,
    });

    expect(layout).toEqual({ x: 0, y: 0, width: 297, height: 210 });
  });

  test("uses the full page for custom page dimensions", () => {
    const layout = calculateSchematicPdfPageLayout({
      pageWidthMm: 180,
      pageHeightMm: 320,
    });

    expect(layout).toEqual({ x: 0, y: 0, width: 180, height: 320 });
  });

  test("rejects invalid page dimensions", () => {
    expect(() =>
      calculateSchematicPdfPageLayout({
        pageWidthMm: 0,
        pageHeightMm: 210,
      }),
    ).toThrow("pageWidthMm must be a positive finite number");

    expect(() =>
      calculateSchematicPdfPageLayout({
        pageWidthMm: 297,
        pageHeightMm: Number.NaN,
      }),
    ).toThrow("pageHeightMm must be a positive finite number");
  });
});

describe("schematic PDF text normalization", () => {
  const createTextElement = (entries: [string, string][]) => {
    const attributes = new Map(entries);
    return {
      attributes,
      element: {
        getAttribute: (name: string) => attributes.get(name) ?? null,
        hasAttribute: (name: string) => attributes.has(name),
        setAttribute: (name: string, value: string) =>
          attributes.set(name, value),
        removeAttribute: (name: string) => attributes.delete(name),
      },
    };
  };

  test("maps baselines and preserves the original text width", () => {
    const centered = createTextElement([
      ["class", "net-label-text sch-net-label-text"],
      ["dominant-baseline", "central"],
      ["font-size", "12px"],
      ["style", "font-size:12px"],
    ]);
    const svg = {
      querySelectorAll: () => [centered.element],
    } as unknown as Element;

    normalizeSvgTextForPdf(svg);

    expect(centered.attributes.get("alignment-baseline")).toBe("central");
    expect(centered.attributes.get("font-family")).toBe("LiberationSans");
    expect(centered.attributes.get("font-size")).toBe("12px");
    expect(centered.attributes.get("dy")).toBe("0.06em");
    expect(centered.attributes.get("style")).toContain(
      "font-family:LiberationSans",
    );
  });

  test("moves text away from top and bottom anchors", () => {
    const belowAnchor = createTextElement([["dominant-baseline", "hanging"]]);
    const aboveAnchor = createTextElement([
      ["dominant-baseline", "ideographic"],
    ]);
    const explicitOffset = createTextElement([
      ["dominant-baseline", "hanging"],
      ["dy", "1em"],
    ]);
    const centered = createTextElement([["dominant-baseline", "middle"]]);
    const svg = {
      querySelectorAll: () => [
        belowAnchor.element,
        aboveAnchor.element,
        explicitOffset.element,
        centered.element,
      ],
    } as unknown as Element;

    normalizeSvgTextForPdf(svg);

    expect(belowAnchor.attributes.get("dy")).toBe("0.12em");
    expect(aboveAnchor.attributes.get("dy")).toBe("-0.12em");
    expect(explicitOffset.attributes.get("dy")).toBe("1em");
    expect(centered.attributes.get("dy")).toBe("0.12em");
  });

  test("removes the svg2pdf-incompatible reference designator halo", () => {
    const reference = createTextElement([
      ["class", "sch-component-name sch-component-text"],
      ["stroke", "rgb(245, 241, 237)"],
      ["stroke-width", "0.5px"],
      ["paint-order", "stroke"],
      ["fill", "rgb(15, 15, 15)"],
    ]);
    const svg = {
      querySelectorAll: () => [reference.element],
    } as unknown as Element;

    normalizeSvgTextForPdf(svg);

    expect(reference.attributes.get("stroke")).toBe("none");
    expect(reference.attributes.has("stroke-width")).toBe(false);
    expect(reference.attributes.has("paint-order")).toBe(false);
    expect(reference.attributes.get("fill")).toBe("rgb(15, 15, 15)");
  });
});

describe("schematic PDF sheet overlay", () => {
  test("renders the title on the left and compact page count on the right", () => {
    const calls: Array<{
      text: string;
      x: number;
      y: number;
      options?: { align?: string };
    }> = [];
    const backdrops: Array<[number, number, number, number, string]> = [];
    const pdf = {
      getTextWidth: (text: string) => text.length,
      setFont: () => pdf,
      setFontSize: () => pdf,
      setFillColor: () => pdf,
      setTextColor: () => pdf,
      rect: (
        x: number,
        y: number,
        width: number,
        height: number,
        style: string,
      ) => {
        backdrops.push([x, y, width, height, style]);
        return pdf;
      },
      text: (
        text: string,
        x: number,
        y: number,
        options?: { align?: string },
      ) => {
        calls.push({ text, x, y, options });
        return pdf;
      },
    } as unknown as jsPDF;

    renderSchematicPdfSheetOverlay({
      pdf,
      title: "Power supply",
      pageNumber: 1,
      pageCount: 6,
      pageWidthMm: 297,
    });

    expect(calls).toEqual([
      { text: "Power supply", x: 16, y: 16, options: undefined },
      { text: "1/6", x: 281, y: 16, options: { align: "right" } },
    ]);
    expect(backdrops).toEqual([
      [15, 11.5, 14, 5.5, "F"],
      [277, 11.5, 5, 5.5, "F"],
    ]);
  });

  test("truncates a title before it can collide with the page count", () => {
    const calls: string[] = [];
    const pdf = {
      getTextWidth: (text: string) => text.length,
      setFont: () => pdf,
      setFontSize: () => pdf,
      setFillColor: () => pdf,
      setTextColor: () => pdf,
      rect: () => pdf,
      text: (text: string) => {
        calls.push(text);
        return pdf;
      },
    } as unknown as jsPDF;

    renderSchematicPdfSheetOverlay({
      pdf,
      title: "A very long schematic sheet name",
      pageNumber: 10,
      pageCount: 12,
      pageWidthMm: 49,
    });

    expect(calls).toEqual(["A ver...", "10/12"]);
  });
});
