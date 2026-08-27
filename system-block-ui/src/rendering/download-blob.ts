/** Starts a browser download for an existing Blob. */
export function downloadBlob(blob: Blob, fileName: string): void {
  if (typeof document === "undefined" || typeof URL === "undefined") {
    throw new Error("Blob downloads require a browser document and URL API");
  }

  const host = document.body ?? document.documentElement;
  if (!host) throw new Error("The browser document is not ready for downloads");

  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.style.display = "none";
  host.appendChild(anchor);

  try {
    anchor.click();
  } finally {
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  }
}
