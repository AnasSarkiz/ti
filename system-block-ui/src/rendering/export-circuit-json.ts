import type { CircuitJson } from "circuit-json";
import { strToU8 } from "fflate";
import {
  copyBytesToArrayBuffer,
  getSafeProjectExportName,
  type ProjectZipOptions,
} from "./project-zip-options";

const CIRCUIT_JSON_MIME_TYPE = "application/json";

export type CircuitJsonDownloadOptions = ProjectZipOptions;

export const getCircuitJsonDownloadFileName = (
  options: CircuitJsonDownloadOptions = {},
): string => `${getSafeProjectExportName(options)}.circuit.json`;

/** Create a human-readable browser download of evaluated Circuit JSON. */
export const createCircuitJsonDownloadBlob = (
  circuitJson: readonly CircuitJson[number][],
): Blob =>
  new Blob(
    [
      copyBytesToArrayBuffer(
        strToU8(`${JSON.stringify(circuitJson, null, 2)}\n`),
      ),
    ],
    { type: CIRCUIT_JSON_MIME_TYPE },
  );
