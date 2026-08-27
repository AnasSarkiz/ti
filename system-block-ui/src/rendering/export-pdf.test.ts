import { describe, expect, test } from "bun:test";

import { calculateSchematicPdfPageLayout } from "./export-pdf";

describe("schematic PDF page layout", () => {
  test("stretches a schematic over an entire A4 landscape page", () => {
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
