// @ts-nocheck
import { readFile, writeFile } from "node:fs/promises";
import {
  encryptPspiceModelSource,
  toEncryptedPspiceModelSpiceSource,
} from "../lib/spice/encrypted-pspice-model.ts";

const sourceModelPath = "lib/chips/spice-models/BQ24074-spice-model.json";
const encryptedModelPath =
  "lib/chips/spice-models/BQ24074-spice-model.encrypted.json";

const sourceModel = JSON.parse(await readFile(sourceModelPath, "utf8")) as {
  source: string;
};
const subcktMatch = sourceModel.source.match(/\.SUBCKT\s+(\S+)\s+([^\r\n]+)/i);

if (!subcktMatch) {
  throw new Error(`No .SUBCKT declaration found in ${sourceModelPath}`);
}

const encryptedModel = {
  source: toEncryptedPspiceModelSpiceSource(
    await encryptPspiceModelSource(sourceModel.source),
    {
      name: subcktMatch[1],
      pins: subcktMatch[2].trim().split(/\s+/),
    },
  ),
};

await writeFile(
  encryptedModelPath,
  `${JSON.stringify(encryptedModel, null, 2)}\n`,
);

console.log(`Encrypted ${sourceModelPath} -> ${encryptedModelPath}`);
