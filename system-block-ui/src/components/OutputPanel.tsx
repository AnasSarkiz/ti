import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { ResolvedConnection } from "../model/types";
import { GENERATED_SYSTEM_MAIN_FILE_NAME } from "../rendering/generated-source-files";
import {
  ArchiveIcon,
  ChevronDownIcon,
  CodeIcon,
  CopyIcon,
  DownloadIcon,
  PdfIcon,
  SchematicIcon,
  SparkIcon,
  WarningIcon,
} from "./Icons";
import { TsxCode } from "./TsxCode";

interface OutputPanelProps {
  tsx: string;
  resolvedConnections: readonly ResolvedConnection[];
  sheets: readonly SchematicSheetPreview[];
  previewError?: string;
  isRendering: boolean;
  onCopyTsx: () => void;
  onDownloadSourceFiles: () => void;
  onRender: () => void;
  onDownloadSchematicPdf: () => void | Promise<void>;
  onDownloadKicadProject: () => void | Promise<void>;
  onDownloadAltiumProject: () => void | Promise<void>;
}

export interface SchematicSheetPreview {
  id: string;
  title: string;
  sheetIndex: number;
  svgUrl: string;
}

const connectionColor = (kind: ResolvedConnection["kind"]): string =>
  kind === "power" ? "var(--power)" : "var(--data)";

type DownloadKind = "pdf" | "kicad" | "altium";

const DOWNLOAD_STATUS_LABELS: Record<DownloadKind, string> = {
  pdf: "PDF",
  kicad: "KiCad",
  altium: "Altium",
};

export function getNextDownloadMenuIndex(
  key: string,
  currentIndex: number,
  itemCount: number,
): number | undefined {
  if (itemCount <= 0) return undefined;

  switch (key) {
    case "ArrowDown":
      return currentIndex < 0 ? 0 : (currentIndex + 1) % itemCount;
    case "ArrowUp":
      return currentIndex < 0
        ? itemCount - 1
        : (currentIndex - 1 + itemCount) % itemCount;
    case "Home":
      return 0;
    case "End":
      return itemCount - 1;
    default:
      return undefined;
  }
}

export function OutputPanel({
  tsx,
  resolvedConnections,
  sheets,
  previewError,
  isRendering,
  onCopyTsx,
  onDownloadSourceFiles,
  onRender,
  onDownloadSchematicPdf,
  onDownloadKicadProject,
  onDownloadAltiumProject,
}: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<"code" | "schematic">("code");
  const [selectedSheetId, setSelectedSheetId] = useState<string>();
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [focusedDownloadIndex, setFocusedDownloadIndex] = useState(0);
  const [activeDownload, setActiveDownload] = useState<DownloadKind>();
  const downloadMenuId = useId();
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const downloadTriggerRef = useRef<HTMLButtonElement>(null);
  const downloadItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedSheetIndex = Math.max(
    0,
    sheets.findIndex((sheet) => sheet.id === selectedSheetId),
  );
  const selectedSheet = sheets[selectedSheetIndex];
  const hasSchematic = sheets.length > 0;
  const downloadsUnavailable = !hasSchematic || isRendering;
  const downloadsDisabled =
    downloadsUnavailable || activeDownload !== undefined;

  useEffect(() => {
    if (!downloadMenuOpen) return;
    downloadItemRefs.current[focusedDownloadIndex]?.focus();
  }, [downloadMenuOpen, focusedDownloadIndex]);

  useEffect(() => {
    if (!downloadMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !downloadMenuRef.current?.contains(event.target)
      ) {
        setDownloadMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setDownloadMenuOpen(false);
      downloadTriggerRef.current?.focus();
    };
    const handleFocusIn = (event: FocusEvent) => {
      if (
        event.target instanceof Node &&
        !downloadMenuRef.current?.contains(event.target)
      ) {
        setDownloadMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [downloadMenuOpen]);

  useEffect(() => {
    if (downloadsDisabled) setDownloadMenuOpen(false);
  }, [downloadsDisabled]);

  const handleDownloadMenuKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    const nextIndex = getNextDownloadMenuIndex(
      event.key,
      focusedDownloadIndex,
      downloadOptions.length,
    );
    if (nextIndex === undefined) return;
    event.preventDefault();
    setFocusedDownloadIndex(nextIndex);
    downloadItemRefs.current[nextIndex]?.focus();
  };

  const openDownloadMenu = (focusedIndex: number) => {
    if (downloadsDisabled) return;
    setFocusedDownloadIndex(focusedIndex);
    setDownloadMenuOpen(true);
  };

  const runDownload = async (
    kind: DownloadKind,
    action: () => void | Promise<void>,
  ) => {
    setDownloadMenuOpen(false);
    downloadTriggerRef.current?.focus();
    setActiveDownload(kind);
    try {
      await action();
    } catch (error) {
      console.error(`Could not download ${kind} export.`, error);
    } finally {
      setActiveDownload(undefined);
      downloadTriggerRef.current?.focus();
    }
  };

  const downloadOptions = [
    {
      kind: "pdf" as const,
      label: "Schematic PDF",
      description: `Vector schematic · ${sheets.length} sheet${sheets.length === 1 ? "" : "s"}`,
      extension: "PDF",
      icon: <PdfIcon />,
      action: onDownloadSchematicPdf,
    },
    {
      kind: "kicad" as const,
      label: "KiCad Project (ZIP)",
      description: "Editable schematic-first project",
      extension: "ZIP",
      icon: <ArchiveIcon />,
      action: onDownloadKicadProject,
    },
    {
      kind: "altium" as const,
      label: "Altium Project (ZIP)",
      description: "Editable schematic-first project",
      extension: "ZIP",
      icon: <ArchiveIcon />,
      action: onDownloadAltiumProject,
    },
  ];

  return (
    <aside className="output-panel" aria-label="Generated output">
      <div
        aria-label="Generated output views"
        className="tab-list"
        role="tablist"
      >
        <button
          aria-controls="generated-code-panel"
          aria-selected={activeTab === "code"}
          className="tab-button"
          id="generated-code-tab"
          onClick={() => setActiveTab("code")}
          role="tab"
          type="button"
        >
          <CodeIcon />
          Generated TSX
        </button>
        <button
          aria-controls="schematic-preview-panel"
          aria-selected={activeTab === "schematic"}
          className="tab-button"
          id="schematic-preview-tab"
          onClick={() => setActiveTab("schematic")}
          role="tab"
          type="button"
        >
          <SchematicIcon />
          Schematic
        </button>
      </div>

      {activeTab === "code" ? (
        <div
          aria-labelledby="generated-code-tab"
          className="output-body"
          id="generated-code-panel"
          role="tabpanel"
        >
          <div className="code-toolbar">
            <span>{GENERATED_SYSTEM_MAIN_FILE_NAME}</span>
            <span className="code-actions">
              <button
                aria-label="Copy main generated TSX"
                className="icon-button"
                onClick={onCopyTsx}
                title="Copy main TSX"
                type="button"
              >
                <CopyIcon />
              </button>
              <button
                aria-label="Download both generated source files"
                className="icon-button"
                onClick={onDownloadSourceFiles}
                title="Download TSX and system diagram module"
                type="button"
              >
                <CodeIcon />
              </button>
            </span>
          </div>
          <TsxCode source={tsx} />
          <div className="resolution-list">
            <h3 className="resolution-title">Automatic resolution</h3>
            {resolvedConnections.length === 0 ? (
              <div className="resolution-row">
                Connect compatible Power or Data sockets to generate traces.
              </div>
            ) : (
              resolvedConnections.map((connection) => (
                <div className="resolution-row" key={connection.id}>
                  <span
                    className="resolution-swatch"
                    style={{ background: connectionColor(connection.kind) }}
                  />
                  <span>
                    {connection.kind === "power" ? "Power" : "Data"} ·{" "}
                    {connection.traces.length} trace
                    {connection.traces.length === 1 ? "" : "s"}
                  </span>
                  <span className="resolution-protocol">
                    {connection.protocol ?? "auto"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div
          aria-labelledby="schematic-preview-tab"
          className="preview-pane"
          id="schematic-preview-panel"
          role="tabpanel"
        >
          <div className="preview-stage">
            {isRendering ? (
              <div aria-live="polite" className="preview-loading" role="status">
                <span className="spinner" />
                Evaluating TSX with PCB and routing disabled…
              </div>
            ) : previewError ? (
              <div className="preview-error" role="alert">
                <WarningIcon />
                {previewError}
              </div>
            ) : selectedSheet ? (
              <div className="sheet-browser">
                <div className="sheet-preview-heading">
                  <span
                    className="sheet-preview-title"
                    title={selectedSheet.title}
                  >
                    {selectedSheet.title}
                  </span>
                  <span className="sheet-preview-count">
                    Sheet {selectedSheetIndex + 1} of {sheets.length}
                  </span>
                </div>

                {sheets.length > 1 && (
                  <nav
                    aria-label="Schematic sheet navigator"
                    className="sheet-navigator"
                  >
                    {sheets.map((sheet, index) => {
                      const selected = index === selectedSheetIndex;
                      return (
                        <button
                          aria-label={`Show sheet ${index + 1} of ${sheets.length}: ${sheet.title}`}
                          aria-pressed={selected}
                          className="sheet-thumbnail"
                          key={sheet.id}
                          onClick={() => setSelectedSheetId(sheet.id)}
                          type="button"
                        >
                          <span className="sheet-thumbnail-image">
                            <img
                              alt=""
                              aria-hidden="true"
                              draggable={false}
                              src={sheet.svgUrl}
                            />
                          </span>
                          <span className="sheet-thumbnail-copy">
                            <span className="sheet-thumbnail-number">
                              Sheet {index + 1}
                            </span>
                            <span className="sheet-thumbnail-title">
                              {sheet.title}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                )}

                <div className="sheet-preview-frame">
                  <img
                    alt={`${selectedSheet.title} schematic, sheet ${selectedSheetIndex + 1} of ${sheets.length}`}
                    draggable={false}
                    src={selectedSheet.svgUrl}
                  />
                </div>
              </div>
            ) : (
              <div className="preview-empty">
                <SparkIcon />
                Render the generated TSX to inspect every schematic sheet and
                enable PDF and editable CAD project exports.
              </div>
            )}
          </div>
          <div className="preview-actions">
            <button
              className="secondary-button"
              disabled={isRendering || tsx.length === 0}
              onClick={onRender}
              type="button"
            >
              <span className="button-content">
                <SparkIcon />
                {hasSchematic ? "Render again" : "Render schematic"}
              </span>
            </button>
            <div className="download-menu" ref={downloadMenuRef}>
              <button
                aria-busy={activeDownload ? true : undefined}
                aria-controls={downloadMenuId}
                aria-expanded={downloadMenuOpen}
                aria-haspopup="menu"
                aria-label={
                  activeDownload
                    ? `Preparing ${DOWNLOAD_STATUS_LABELS[activeDownload]} download`
                    : hasSchematic
                      ? `Download schematic or CAD project for ${sheets.length} sheet${sheets.length === 1 ? "" : "s"}`
                      : "Download schematic or CAD project"
                }
                aria-disabled={activeDownload ? true : undefined}
                className="primary-button download-menu-trigger"
                disabled={downloadsUnavailable}
                id={`${downloadMenuId}-trigger`}
                onClick={() => {
                  if (downloadsDisabled) return;
                  if (downloadMenuOpen) {
                    setDownloadMenuOpen(false);
                  } else {
                    openDownloadMenu(0);
                  }
                }}
                onKeyDown={(event) => {
                  if (downloadsDisabled) return;
                  const focusedIndex = getNextDownloadMenuIndex(
                    event.key,
                    -1,
                    downloadOptions.length,
                  );
                  if (focusedIndex === undefined) return;
                  event.preventDefault();
                  openDownloadMenu(focusedIndex);
                }}
                ref={downloadTriggerRef}
                type="button"
              >
                <span className="button-content">
                  {activeDownload ? (
                    <>
                      <span aria-hidden="true" className="download-spinner" />
                      Preparing {DOWNLOAD_STATUS_LABELS[activeDownload]}…
                    </>
                  ) : (
                    <>
                      <DownloadIcon />
                      Download
                      <ChevronDownIcon className="download-menu-chevron" />
                    </>
                  )}
                </span>
              </button>

              {downloadMenuOpen && (
                <div
                  aria-labelledby={`${downloadMenuId}-trigger`}
                  className="download-menu-popover"
                  id={downloadMenuId}
                  onKeyDown={handleDownloadMenuKeyDown}
                  role="menu"
                >
                  {downloadOptions.map((option, index) => (
                    <button
                      className="download-menu-item"
                      key={option.kind}
                      onClick={() => {
                        void runDownload(option.kind, option.action);
                      }}
                      onFocus={() => setFocusedDownloadIndex(index)}
                      ref={(element) => {
                        downloadItemRefs.current[index] = element;
                      }}
                      role="menuitem"
                      tabIndex={index === focusedDownloadIndex ? 0 : -1}
                      type="button"
                    >
                      <span className="download-menu-item-icon">
                        {option.icon}
                      </span>
                      <span className="download-menu-item-copy">
                        <strong>{option.label}</strong>
                        <small>{option.description}</small>
                      </span>
                      <span className="download-menu-extension">
                        {option.extension}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
