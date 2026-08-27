import type { CircuitJson } from "circuit-json";
import {
  CircuitJsonToKicadPcbConverter,
  CircuitJsonToKicadProConverter,
  CircuitJsonToKicadSchConverter,
} from "circuit-json-to-kicad";
import { strToU8, zipSync } from "fflate";
import {
  copyBytesToArrayBuffer,
  getSafeProjectExportName,
  type ProjectZipOptions,
} from "./project-zip-options";
import { prepareCircuitJsonForEcadExport } from "./prepare-circuit-json-for-ecad-export";

const ZIP_MIME_TYPE = "application/zip";

export type KicadProjectZipOptions = ProjectZipOptions;

export const getKicadProjectZipFileName = (
  options: KicadProjectZipOptions = {},
): string => `${getSafeProjectExportName(options)}.kicad-project.zip`;

/** Convert evaluated Circuit JSON into a complete, browser-downloadable KiCad project. */
export async function createKicadProjectZipBlob(
  circuitJson: readonly CircuitJson[number][],
  options: KicadProjectZipOptions = {},
): Promise<Blob> {
  const projectName = getSafeProjectExportName(options);
  const input = prepareCircuitJsonForEcadExport(circuitJson);
  const schematicFileName = `${projectName}.kicad_sch`;
  const pcbFileName = `${projectName}.kicad_pcb`;

  const schematicConverter = new CircuitJsonToKicadSchConverter(input);
  schematicConverter.runUntilFinished();
  const schematicFiles = schematicConverter.getOutputFiles({
    schematicFilename: schematicFileName,
  });

  const pcbConverter = new CircuitJsonToKicadPcbConverter(input, {
    projectName,
  });
  pcbConverter.runUntilFinished();

  const projectConverter = new CircuitJsonToKicadProConverter(input, {
    projectName,
    schematicFilename: schematicFileName,
    pcbFilename: pcbFileName,
    schematicSheetPlan: schematicConverter.schematicSheetPlan,
  });
  projectConverter.runUntilFinished();

  const files: Record<string, Uint8Array> = {
    [pcbFileName]: strToU8(pcbConverter.getOutputString()),
    [`${projectName}.kicad_pro`]: strToU8(projectConverter.getOutputString()),
  };
  for (const schematicFile of schematicFiles) {
    files[schematicFile.filename] = strToU8(schematicFile.content);
  }

  const zipBytes = zipSync(files, { level: 6 });
  return new Blob([copyBytesToArrayBuffer(zipBytes)], { type: ZIP_MIME_TYPE });
}
