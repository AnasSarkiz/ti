import { describe, expect, test } from "bun:test";
import {
  GENERATED_SYSTEM_MAIN_FILE_NAME,
  getGeneratedSystemSourceFiles,
} from "./generated-source-files";

const artifacts = {
  tsx: "export default () => <board />",
  systemDiagramFileName: "GeneratedSystem.system-diagram.svg",
  systemDiagramSvg: "<svg />",
};

describe("generated source files", () => {
  test("exports electrical TSX and the separate system-diagram SVG", () => {
    expect(getGeneratedSystemSourceFiles(artifacts)).toEqual([
      {
        fileName: GENERATED_SYSTEM_MAIN_FILE_NAME,
        source: artifacts.tsx,
      },
      {
        fileName: artifacts.systemDiagramFileName,
        source: artifacts.systemDiagramSvg,
      },
    ]);
  });
});
