import { describe, expect, test } from "bun:test";
import { evaluateGeneratedTsx } from "./evaluate-schematic";
import { createLocalTiPackageEvaluationFsMap } from "./local-ti-package-files";

const fixtureSources = {
  "../../../lib/subcircuits/FixtureBlock.circuit.tsx": `
import "tscircuit"
import { FixtureChip } from "../chips/FixtureChip.circuit.tsx"

export const FixtureBlock = (props: Record<string, unknown>) => (
  <subcircuit routingDisabled {...props}>
    <FixtureChip name="U1" />
  </subcircuit>
)
`,
  "../../../lib/chips/FixtureChip.circuit.tsx": `
import "tscircuit"

export const FixtureChip = (props: Record<string, unknown>) => (
  <chip
    manufacturerPartNumber="FIXTURE"
    pinLabels={{ pin1: "INPUT", pin2: "GND" }}
    {...props}
  />
)
`,
  "../../../lib/chips/UnusedChip.circuit.tsx": `
export const UnusedChip = () => null
`,
};

const fixtureDefinition = {
  componentName: "FixtureBlock",
  sourcePath: "lib/subcircuits/FixtureBlock.circuit.tsx",
};

describe("local TI package evaluation files", () => {
  test("includes selected subcircuits and their dependency closure", () => {
    const fsMap = createLocalTiPackageEvaluationFsMap(
      [fixtureDefinition],
      fixtureSources,
    );

    expect(fsMap["node_modules/@tsci/tscircuit.ti/index.ts"]).toContain(
      'export { FixtureBlock } from "./lib/subcircuits/FixtureBlock.circuit.tsx"',
    );
    expect(
      fsMap[
        "node_modules/@tsci/tscircuit.ti/lib/subcircuits/FixtureBlock.circuit.tsx"
      ],
    ).toContain("FixtureChip");
    expect(
      fsMap[
        "node_modules/@tsci/tscircuit.ti/lib/chips/FixtureChip.circuit.tsx"
      ],
    ).toContain('manufacturerPartNumber="FIXTURE"');
    expect(
      fsMap["node_modules/@tsci/tscircuit.ti/lib/chips/UnusedChip.circuit.tsx"],
    ).toBeUndefined();
  });

  test("evaluates a package export which is not published", async () => {
    const fsMap = createLocalTiPackageEvaluationFsMap(
      [fixtureDefinition],
      fixtureSources,
    );
    const evaluated = await evaluateGeneratedTsx(
      `
import { FixtureBlock } from "@tsci/tscircuit.ti"
import "tscircuit"

export default () => (
  <board routingDisabled>
    <schematicsheet name="fixture" displayName="Fixture" sheetIndex={0} />
    <FixtureBlock name="fixture" schSheetName="fixture" />
  </board>
)
`,
      {
        fsMap,
        mainComponentPath: "fixture-entrypoint.tsx",
        timeoutMs: 15_000,
      },
    );

    expect(evaluated.sheets.map(({ name }) => name)).toEqual(["fixture"]);
    expect(
      evaluated.circuitJson.some(
        (element) =>
          element.type === "source_component" && element.name === "U1",
      ),
    ).toBe(true);
  });

  test("fails clearly when a selected local source is unavailable", () => {
    expect(() =>
      createLocalTiPackageEvaluationFsMap(
        [
          {
            componentName: "MissingBlock",
            sourcePath: "lib/subcircuits/MissingBlock.circuit.tsx",
          },
        ],
        fixtureSources,
      ),
    ).toThrow(
      "Local TI source is unavailable: lib/subcircuits/MissingBlock.circuit.tsx",
    );
  });
});
