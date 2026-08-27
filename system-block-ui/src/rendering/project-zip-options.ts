export const DEFAULT_PROJECT_EXPORT_NAME = "GeneratedSystem";

export interface ProjectZipOptions {
  projectName?: string;
}

/** Copy package-owned bytes into the ArrayBuffer shape accepted by Blob. */
export const copyBytesToArrayBuffer = (bytes: Uint8Array): ArrayBuffer => {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
};

const WINDOWS_RESERVED_FILE_NAME =
  /^(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i;

/** Produce a portable single-segment filename shared by every ECAD exporter. */
export const getSafeProjectExportName = (
  options: ProjectZipOptions = {},
): string => {
  const requestedName = options.projectName ?? DEFAULT_PROJECT_EXPORT_NAME;
  const safeName = requestedName
    .normalize("NFKC")
    .trim()
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "")
    .slice(0, 80)
    .replace(/[.-]+$/g, "");

  if (!safeName) return DEFAULT_PROJECT_EXPORT_NAME;
  return WINDOWS_RESERVED_FILE_NAME.test(safeName)
    ? `project-${safeName}`
    : safeName;
};
