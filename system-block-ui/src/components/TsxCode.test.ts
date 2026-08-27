import { describe, expect, test } from "bun:test";
import { tokenizeTsx } from "./TsxCode";

describe("tokenizeTsx", () => {
  test("preserves the generated source byte-for-byte", () => {
    const source = `import { Amplifier } from "./subcircuits"\n\nexport default () => (\n  <board routingDisabled>\n    {/* Data: I2S */}\n    <Amplifier name="amp" gain={2} />\n  </board>\n)\n`;

    const tokens = tokenizeTsx(source);

    expect(tokens.map(({ content }) => content).join("")).toBe(source);
  });

  test("recognizes TypeScript and JSX syntax", () => {
    const source =
      "export default () => <schematicgraphic svgContent={SYSTEM_DIAGRAM_SVG} sheetIndex={0} />";
    const tokens = tokenizeTsx(source);

    expect(tokens).toContainEqual({ content: "export", kind: "keyword" });
    expect(tokens).toContainEqual({ content: "default", kind: "keyword" });
    expect(tokens).toContainEqual({
      content: "schematicgraphic",
      kind: "tag",
    });
    expect(tokens).toContainEqual({
      content: "svgContent",
      kind: "attribute",
    });
    expect(tokens).toContainEqual({ content: "0", kind: "number" });
  });

  test("does not parse comment markers inside strings", () => {
    const source = 'const url = "https://example.com/a/*b*/" // destination';
    const tokens = tokenizeTsx(source);

    expect(tokens).toContainEqual({
      content: '"https://example.com/a/*b*/"',
      kind: "string",
    });
    expect(tokens.at(-1)).toEqual({
      content: "// destination",
      kind: "comment",
    });
  });
});
