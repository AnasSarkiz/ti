import type { CircuitJson } from "circuit-json";
import {
  convertCircuitJsonToAltiumZip,
  type CircuitJsonInput as AltiumCircuitJsonInput,
} from "circuit-json-to-altium";
import {
  copyBytesToArrayBuffer,
  getSafeProjectExportName,
  type ProjectZipOptions,
} from "./project-zip-options";
import { prepareCircuitJsonForEcadExport } from "./prepare-circuit-json-for-ecad-export";
import { strToU8, unzipSync, zipSync } from "fflate";

const ZIP_MIME_TYPE = "application/zip";

const createSchematicFirstReadme = (
  projectName: string,
): Uint8Array<ArrayBuffer> =>
  new Uint8Array(
    copyBytesToArrayBuffer(
      strToU8(
        [
          `${projectName} — Altium Designer project`,
          "",
          "Generated from Circuit JSON as a schematic-first project.",
          "The PCB document is included for project compatibility; it is not a routed system-board layout.",
          `Open ${projectName}.PrjPcb in Altium Designer.`,
        ].join("\r\n"),
      ),
    ),
  );

export type AltiumProjectZipOptions = ProjectZipOptions;

export const getAltiumProjectZipFileName = (
  options: AltiumProjectZipOptions = {},
): string => `${getSafeProjectExportName(options)}.altium-project.zip`;

/** Convert evaluated Circuit JSON into a native Altium Designer project archive. */
export async function createAltiumProjectZipBlob(
  circuitJson: readonly CircuitJson[number][],
  options: AltiumProjectZipOptions = {},
): Promise<Blob> {
  const projectName = getSafeProjectExportName(options);
  // The converter currently depends on the next circuit-json patch. Circuit
  // JSON is plain data at this boundary, so copying through its broad input
  // type avoids coupling callers to that transitive package instance.
  const input = prepareCircuitJsonForEcadExport(
    circuitJson,
  ) as unknown as AltiumCircuitJsonInput;
  const zipBytes = await convertCircuitJsonToAltiumZip(input, projectName);
  const archive = unzipSync(zipBytes);
  archive["README.txt"] = createSchematicFirstReadme(projectName);
  const rewrittenZipBytes = zipSync(archive, { level: 6 });
  return new Blob([copyBytesToArrayBuffer(rewrittenZipBytes)], {
    type: ZIP_MIME_TYPE,
  });
}
