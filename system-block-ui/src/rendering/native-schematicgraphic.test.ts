import { expect, test } from "bun:test";
import webWorkerBlobUrl from "@tscircuit/eval/blob-url";
import { createCircuitWebWorker } from "@tscircuit/eval/worker";
import type { AnyCircuitElement } from "circuit-json";
import { renderSchematicSheets } from "./render-schematic-sheets";

const nativeGraphicTsx = `
import "tscircuit"
import { SYSTEM_SVG } from "./native-system-diagram"

export default () => (
  <board routingDisabled>
    <schematicsheet
      name="system_diagram"
      displayName="System Diagram"
      sheetIndex={0}
    >
      <schematicgraphic svgContent={SYSTEM_SVG} />
    </schematicsheet>
    <schematicsheet name="detail" displayName="Detail" sheetIndex={1} />
    <resistor
      name="R1"
      resistance="1k"
      schSheetName="detail"
      schX={0}
      schY={0}
    />
  </board>
)
`;

const nativeGraphicModule = `
export const SYSTEM_SVG = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">',
  '<rect width="320" height="180" fill="#f8fafc" />',
  '<text x="24" y="96">Native system diagram</text>',
  '</svg>',
].join("\\n")
`;

test("native schematicgraphic evaluates and renders on its parent sheet", async () => {
  const worker = await createCircuitWebWorker({
    webWorkerBlobUrl,
    platform: {
      pcbDisabled: true,
      routingDisabled: true,
      partsEngineDisabled: true,
    },
  });
  let circuitJson: AnyCircuitElement[];

  try {
    await worker.executeWithFsMap({
      fsMap: {
        "native-schematicgraphic.tsx": nativeGraphicTsx,
        "native-system-diagram.ts": nativeGraphicModule,
      },
      mainComponentPath: "native-schematicgraphic.tsx",
    });
    await worker.renderUntilSettled();
    circuitJson = await worker.getCircuitJson();
  } finally {
    await worker.kill();
  }

  const systemSheet = circuitJson.find(
    (element) =>
      element.type === "schematic_sheet" && element.name === "system_diagram",
  );
  const graphic = circuitJson.find(
    (element) => element.type === "schematic_graphic",
  );

  expect(systemSheet?.type).toBe("schematic_sheet");
  expect(graphic?.type).toBe("schematic_graphic");
  if (systemSheet?.type !== "schematic_sheet") {
    throw new Error("Expected native System Diagram sheet");
  }
  if (graphic?.type !== "schematic_graphic") {
    throw new Error("Expected native schematic graphic");
  }
  expect(graphic.schematic_sheet_id).toBe(systemSheet.schematic_sheet_id);

  const sheets = renderSchematicSheets(circuitJson, {
    width: 640,
    height: 360,
  });

  expect(sheets.map(({ name }) => name)).toEqual(["system_diagram", "detail"]);
  expect(sheets[0]?.svg).toContain('class="schematic-graphic"');
  expect(sheets[0]?.svg).toContain("Native%20system%20diagram");
  expect(sheets[1]?.svg).not.toContain('class="schematic-graphic"');
});
