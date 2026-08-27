import { describe, expect, test } from "bun:test";

import { calculateSchematicPdfPageLayout } from "./export-pdf";

const expectInsidePage = (
  layout: ReturnType<typeof calculateSchematicPdfPageLayout>,
  pageWidth: number,
  pageHeight: number,
  margin: number,
): void => {
  expect(layout.x).toBeGreaterThanOrEqual(margin);
  expect(layout.y).toBeGreaterThanOrEqual(margin);
  expect(layout.x + layout.width).toBeLessThanOrEqual(
    pageWidth - margin + 1e-9,
  );
  expect(layout.y + layout.height).toBeLessThanOrEqual(
    pageHeight - margin + 1e-9,
  );
};

describe("schematic PDF page layout", () => {
  test("aspect-fits a wide schematic below its header on A4 landscape", () => {
    const layout = calculateSchematicPdfPageLayout({
      pageWidthMm: 297,
      pageHeightMm: 210,
      svgWidth: 1400,
      svgHeight: 900,
      marginMm: 10,
      hasHeader: true,
    });

    expect(layout.headerBaselineY).toBeGreaterThan(10);
    expect(layout.headerDividerY).toBeLessThan(layout.y);
    expect(layout.width / layout.height).toBeCloseTo(1400 / 900, 10);
    expectInsidePage(layout, 297, 210, 10);
  });

  test("centers a tall schematic without clipping on a landscape page", () => {
    const layout = calculateSchematicPdfPageLayout({
      pageWidthMm: 297,
      pageHeightMm: 210,
      svgWidth: 600,
      svgHeight: 1200,
      marginMm: 12,
      hasHeader: false,
    });

    expect(layout.height).toBe(186);
    expect(layout.width).toBe(93);
    expect(layout.x).toBe(102);
    expect(layout.y).toBe(12);
    expect(layout.headerBaselineY).toBeUndefined();
    expectInsidePage(layout, 297, 210, 12);
  });

  test("rejects dimensions or margins that cannot produce printable content", () => {
    expect(() =>
      calculateSchematicPdfPageLayout({
        pageWidthMm: 297,
        pageHeightMm: 210,
        svgWidth: 0,
        svgHeight: 900,
        marginMm: 10,
        hasHeader: false,
      }),
    ).toThrow("svgWidth must be a positive finite number");

    expect(() =>
      calculateSchematicPdfPageLayout({
        pageWidthMm: 297,
        pageHeightMm: 210,
        svgWidth: 1400,
        svgHeight: 900,
        marginMm: 106,
        hasHeader: true,
      }),
    ).toThrow("marginMm leaves no printable area");
  });
});
