import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { GENERATED_SYSTEM_MAIN_FILE_NAME } from "../rendering/generated-source-files";
import {
  ArchiveIcon,
  ChevronDownIcon,
  CircuitIcon,
  CodeIcon,
  DownloadIcon,
  PdfIcon,
} from "./Icons";
import { TsxCode } from "./TsxCode";

interface OutputPanelProps {
  tsx: string;
  hasSchematic: boolean;
  schematicSheetCount: number;
  isRendering: boolean;
  onDownloadSchematicPdf: () => void | Promise<void>;
  onDownloadCircuitJson: () => void | Promise<void>;
  onDownloadTscircuitTsxZip: () => void | Promise<void>;
  onDownloadKicadProject: () => void | Promise<void>;
  onDownloadAltiumProject: () => void | Promise<void>;
}

type DownloadKind =
  | "pdf"
  | "circuit-json"
  | "tscircuit-tsx"
  | "kicad"
  | "altium";

interface DownloadAvailability {
  hasSchematic: boolean;
  isRendering: boolean;
  isBusy: boolean;
}

const DOWNLOAD_STATUS_LABELS: Record<DownloadKind, string> = {
  pdf: "PDF",
  "circuit-json": "Circuit JSON",
  "tscircuit-tsx": "tscircuit TSX",
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

export function isDownloadOptionAvailable(
  kind: DownloadKind,
  { hasSchematic, isRendering, isBusy }: DownloadAvailability,
): boolean {
  if (isBusy) return false;
  if (kind === "tscircuit-tsx") return true;
  return hasSchematic && !isRendering;
}

export function OutputPanel({
  tsx,
  hasSchematic,
  schematicSheetCount,
  isRendering,
  onDownloadSchematicPdf,
  onDownloadCircuitJson,
  onDownloadTscircuitTsxZip,
  onDownloadKicadProject,
  onDownloadAltiumProject,
}: OutputPanelProps) {
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [focusedDownloadIndex, setFocusedDownloadIndex] = useState(0);
  const [activeDownload, setActiveDownload] = useState<DownloadKind>();
  const downloadMenuId = useId();
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const downloadTriggerRef = useRef<HTMLButtonElement>(null);
  const downloadItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const downloadsDisabled = activeDownload !== undefined;
  const downloadAvailability: DownloadAvailability = {
    hasSchematic,
    isRendering,
    isBusy: downloadsDisabled,
  };

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
      description: `Vector schematic · ${schematicSheetCount} sheet${schematicSheetCount === 1 ? "" : "s"}`,
      extension: "PDF",
      icon: <PdfIcon />,
      action: onDownloadSchematicPdf,
    },
    {
      kind: "circuit-json" as const,
      label: "Circuit JSON",
      description: "Evaluated design data · schematic-only",
      extension: "JSON",
      icon: <CircuitIcon />,
      action: onDownloadCircuitJson,
    },
    {
      kind: "tscircuit-tsx" as const,
      label: "tscircuit TSX (ZIP)",
      description: "Editable source · TSX + diagram module",
      extension: "ZIP",
      icon: <CodeIcon />,
      action: onDownloadTscircuitTsxZip,
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
    <aside
      aria-labelledby={`${downloadMenuId}-heading`}
      className="output-panel"
    >
      <header className="output-toolbar">
        <h2 className="output-toolbar-title" id={`${downloadMenuId}-heading`}>
          <CodeIcon />
          Generated TSX
        </h2>
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
                  ? `Download schematic, source, or CAD exports for ${schematicSheetCount} sheet${schematicSheetCount === 1 ? "" : "s"}`
                  : "Download tscircuit source or view schematic export options"
            }
            aria-disabled={activeDownload ? true : undefined}
            className="primary-button download-menu-trigger"
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
              {downloadOptions.map((option, index) => {
                const optionAvailable = isDownloadOptionAvailable(
                  option.kind,
                  downloadAvailability,
                );
                return (
                  <button
                    aria-disabled={optionAvailable ? undefined : true}
                    className="download-menu-item"
                    key={option.kind}
                    onClick={() => {
                      if (!optionAvailable) return;
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
                );
              })}
            </div>
          )}
        </div>
      </header>

      <div className="generated-code-pane">
        <div className="generated-code-file">
          <span>{GENERATED_SYSTEM_MAIN_FILE_NAME}</span>
          <span>Read-only</span>
        </div>
        <TsxCode source={tsx} />
      </div>
    </aside>
  );
}
