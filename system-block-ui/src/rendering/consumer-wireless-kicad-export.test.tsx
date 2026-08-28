import { expect, test } from "bun:test";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { strFromU8, unzipSync } from "fflate";
import { createKicadProjectZipBlob } from "./export-kicad-project";
import { evaluateGeneratedTsx } from "./evaluate-schematic";
import { createLocalTiPackageEvaluationFsMap } from "./local-ti-package-files";

const starterDefinitions = [
  {
    componentName: "InputPowerProtection_TPS25910_TIDA00890",
    sourcePath:
      "lib/subcircuits/InputPowerProtection_TPS25910_TIDA00890.circuit.tsx",
  },
  {
    componentName: "BuckConverter_TPS62086_TIDA00399",
    sourcePath: "lib/subcircuits/BuckConverter_TPS62086_TIDA00399.circuit.tsx",
  },
  {
    componentName: "LVDSDriver_SN65LVDS31_TIDA060017",
    sourcePath: "lib/subcircuits/LVDSDriver_SN65LVDS31_TIDA060017.circuit.tsx",
  },
  {
    componentName: "WirelessAntenna_W3006_TIDCWL1837MODCOM8I",
    sourcePath:
      "lib/subcircuits/WirelessAntenna_W3006_TIDCWL1837MODCOM8I.circuit.tsx",
  },
  {
    componentName: "InputOutputProtection_TPD2E009_TIDA00399",
    sourcePath:
      "lib/subcircuits/InputOutputProtection_TPD2E009_TIDA00399.circuit.tsx",
  },
  {
    componentName: "LogicBuffer_SN74LVC1G34",
    sourcePath: "lib/subcircuits/LogicBuffer_SN74LVC1G34.circuit.tsx",
  },
  {
    componentName: "TemperatureSensor_TMP103_TIDA00399",
    sourcePath:
      "lib/subcircuits/TemperatureSensor_TMP103_TIDA00399.circuit.tsx",
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

test("Consumer Wireless Module KiCad export preserves every available pad", async () => {
  const repositoryRoot = fileURLToPath(new URL("../../..", import.meta.url));
  const [sourceModules, exampleSource] = await Promise.all([
    loadRepositorySources(repositoryRoot),
    Bun.file(
      join(repositoryRoot, "examples/ConsumerWirelessModule.circuit.tsx"),
    ).text(),
  ]);
  const fsMap = createLocalTiPackageEvaluationFsMap(
    starterDefinitions,
    sourceModules,
  );
  const evaluated = await evaluateGeneratedTsx(exampleSource, {
    fsMap,
    mainComponentPath: "ConsumerWirelessModule.circuit.tsx",
    timeoutMs: 60_000,
  });

  expect(
    evaluated.circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(108);

  const blob = await createKicadProjectZipBlob(evaluated.circuitJson, {
    projectName: "consumer-wireless-module",
  });
  const archive = unzipSync(new Uint8Array(await blob.arrayBuffer()));
  const pcb = strFromU8(
    archive["consumer-wireless-module.kicad_pcb"] ?? new Uint8Array(),
  );

  expect(pcb.match(/\(footprint\b/g)).toHaveLength(36);
  expect(pcb.match(/\(pad\b/g)).toHaveLength(108);
});
