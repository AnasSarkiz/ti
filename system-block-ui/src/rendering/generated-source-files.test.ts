import { describe, expect, test } from "bun:test";
import {
  GENERATED_SYSTEM_MAIN_FILE_NAME,
  getGeneratedSystemEvaluationFsMap,
  getGeneratedSystemSourceFiles,
} from "./generated-source-files";

const artifacts = {
  tsx: 'import { SYSTEM_DIAGRAM_SVG } from "./GeneratedSystem.system-diagram"',
  systemDiagramModuleFileName: "GeneratedSystem.system-diagram.ts",
  systemDiagramModuleSource: 'export const SYSTEM_DIAGRAM_SVG = "<svg />"',
};

describe("generated source files", () => {
  test("exports the main TSX and its required companion module", () => {
    expect(getGeneratedSystemSourceFiles(artifacts)).toEqual([
      {
        fileName: GENERATED_SYSTEM_MAIN_FILE_NAME,
        source: artifacts.tsx,
      },
      {
        fileName: artifacts.systemDiagramModuleFileName,
        source: artifacts.systemDiagramModuleSource,
      },
    ]);
  });

  test("provides only companion modules to the evaluator fsMap", () => {
    expect(getGeneratedSystemEvaluationFsMap(artifacts)).toEqual({
      [artifacts.systemDiagramModuleFileName]:
        artifacts.systemDiagramModuleSource,
    });
  });
});
