import { strToU8, zipSync } from "fflate";
import {
  getGeneratedSystemSourceFiles,
  type GeneratedSystemSourceArtifacts,
} from "./generated-source-files";
import {
  copyBytesToArrayBuffer,
  getSafeProjectExportName,
  type ProjectZipOptions,
} from "./project-zip-options";

const ZIP_MIME_TYPE = "application/zip";
const DETERMINISTIC_ZIP_MTIME = new Date(1980, 0, 1, 0, 0, 0);

export type TscircuitTsxZipOptions = ProjectZipOptions;

export const getTscircuitTsxZipFileName = (
  options: TscircuitTsxZipOptions = {},
): string => `${getSafeProjectExportName(options)}.tscircuit-tsx.zip`;

/** Package every generated source file required to evaluate the design. */
export const createTscircuitTsxZipBlob = (
  artifacts: GeneratedSystemSourceArtifacts,
): Blob => {
  const files: Record<string, Uint8Array> = {};
  for (const { fileName, source } of getGeneratedSystemSourceFiles(artifacts)) {
    files[fileName] = strToU8(source);
  }

  const zipBytes = zipSync(files, {
    level: 6,
    mtime: DETERMINISTIC_ZIP_MTIME,
  });
  return new Blob([copyBytesToArrayBuffer(zipBytes)], { type: ZIP_MIME_TYPE });
};
