import { expect, test } from "bun:test";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { strFromU8, unzipSync } from "fflate";
import {
  createSystemBlockExamples,
  generateSystemDesignArtifacts,
  SUBCIRCUIT_CATALOG,
} from "../model";
import { evaluateGeneratedTsx } from "./evaluate-schematic";
import { createKicadProjectZipBlob } from "./export-kicad-project";
import { createLocalTiPackageEvaluationFsMap } from "./local-ti-package-files";

const seatPositionDefinitions = [
  {
    componentName: "PowerSupply_LM5050_TIDA00992",
    sourcePath: "lib/subcircuits/PowerSupply_LM5050_TIDA00992.circuit.tsx",
  },
  {
    componentName: "CommunicationInterface_TCAN1042_TIDA01428",
    sourcePath:
      "lib/subcircuits/CommunicationInterface_TCAN1042_TIDA01428.circuit.tsx",
  },
  {
    componentName: "Microcontroller_MSPM0L1306Q1_TIDA020065",
    sourcePath:
      "lib/subcircuits/Microcontroller_MSPM0L1306Q1_TIDA020065.circuit.tsx",
  },
  {
    componentName: "MotorDriver_DRV8305_TIDA01330",
    sourcePath: "lib/subcircuits/MotorDriver_DRV8305_TIDA01330.circuit.tsx",
  },
  {
    componentName: "PositionFeedback_DRV5013_TIDA01389",
    sourcePath:
      "lib/subcircuits/PositionFeedback_DRV5013_TIDA01389.circuit.tsx",
  },
  {
    componentName: "LightDriver_TIDA01330",
    sourcePath: "lib/subcircuits/LightDriver_TIDA01330.circuit.tsx",
  },
] as const;

const loadRepositorySources = async (
  repositoryRoot: string,
): Promise<Record<string, string>> => {
  const sources: Record<string, string> = {};
  const glob = new Bun.Glob("lib/**/*.{ts,tsx}");
  for await (const path of glob.scan({
    cwd: repositoryRoot,
    onlyFiles: true,
  })) {
    sources[path] = await Bun.file(join(repositoryRoot, path)).text();
  }
  return sources;
};

test("Seat Position Module renders every sheet and exports a complete KiCad project", async () => {
  const repositoryRoot = fileURLToPath(new URL("../../..", import.meta.url));
  const sourceModules = await loadRepositorySources(repositoryRoot);
  const example = createSystemBlockExamples(SUBCIRCUIT_CATALOG).find(
    ({ id }) => id === "seat-position-module",
  );
  if (!example) throw new Error("Missing Seat Position Module example");
  const artifacts = generateSystemDesignArtifacts({
    blocks: example.graph.blocks,
    connections: example.graph.connections,
    catalog: SUBCIRCUIT_CATALOG,
    boardName: "seat_position_module",
  });
  const fsMap = createLocalTiPackageEvaluationFsMap(
    seatPositionDefinitions,
    sourceModules,
  );
  const evaluated = await evaluateGeneratedTsx(artifacts.tsx, {
    fsMap,
    mainComponentPath: "GeneratedSystem.circuit.tsx",
    timeoutMs: 90_000,
  });

  expect(evaluated.sheets.map(({ title }) => title)).toEqual([
    "TCAN1042 CAN Interface",
    "TIDA-01330 Light Driver",
    "MSPM0L1306-Q1 Microcontroller",
    "TIDA-01330 DRV8305 Motor Driver",
    "TIDA-01389 Position Feedback",
    "TIDA-00992 LM5050-Q1 Power Supply",
  ]);

  const blob = await createKicadProjectZipBlob(evaluated.circuitJson, {
    projectName: "seat-position-module",
  });
  const archive = unzipSync(new Uint8Array(await blob.arrayBuffer()));
  const fileNames = Object.keys(archive);

  expect(fileNames).toContain("seat-position-module.kicad_pro");
  expect(fileNames).toContain("seat-position-module.kicad_pcb");
  expect(
    fileNames.filter((fileName) => fileName.endsWith(".kicad_sch")),
  ).toHaveLength(7);

  const pcb = strFromU8(
    archive["seat-position-module.kicad_pcb"] ?? new Uint8Array(),
  );
  const project = strFromU8(
    archive["seat-position-module.kicad_pro"] ?? new Uint8Array(),
  );
  expect(pcb).toStartWith("(kicad_pcb");
  expect(pcb.match(/\(footprint\b/g)?.length ?? 0).toBeGreaterThan(0);
  expect(() => JSON.parse(project)).not.toThrow();

  for (const fileName of fileNames.filter((name) =>
    name.endsWith(".kicad_sch"),
  )) {
    expect(strFromU8(archive[fileName])).toStartWith("(kicad_sch");
  }
}, 30_000);
