import { expect, test } from "bun:test";
import {
  generateSystemDesignArtifacts,
  type SubcircuitDefinition,
} from "../model";
import { evaluateGeneratedTsx } from "./evaluate-schematic";
import { GENERATED_SYSTEM_MAIN_FILE_NAME } from "./generated-source-files";

const fixtureDefinition: SubcircuitDefinition = {
  id: "fixture-block",
  title: "Fixture Block",
  category: "Test",
  componentName: "FixtureBlock",
  importPath: "./FixtureBlock.circuit.tsx",
  sourcePath: "FixtureBlock.circuit.tsx",
  ports: [],
};

const fixtureSource = `
import "tscircuit"

export const FixtureBlock = (props: Record<string, unknown>) => (
  <subcircuit routingDisabled {...props}>
    <resistor name="R1" resistance="1k" />
  </subcircuit>
)
`;

test("keeps the system overview outside evaluated schematic sheets", async () => {
  const artifacts = generateSystemDesignArtifacts({
    blocks: [
      {
        id: "fixture",
        definitionId: fixtureDefinition.id,
        schSheetName: "fixture_detail",
      },
    ],
    connections: [],
    catalog: [fixtureDefinition],
  });

  const evaluated = await evaluateGeneratedTsx(artifacts.tsx, {
    mainComponentPath: GENERATED_SYSTEM_MAIN_FILE_NAME,
    fsMap: { "FixtureBlock.circuit.tsx": fixtureSource },
    timeoutMs: 15_000,
  });

  expect(evaluated.sheets.map(({ name }) => name)).toEqual(["fixture_detail"]);
  expect(
    evaluated.circuitJson.filter(
      (element) => element.type === "schematic_sheet",
    ),
  ).toHaveLength(1);
  expect(
    evaluated.circuitJson.some(
      (element) => element.type === "schematic_graphic",
    ),
  ).toBe(false);
  expect(artifacts.systemDiagramSvg).toContain("Fixture Block");
});
