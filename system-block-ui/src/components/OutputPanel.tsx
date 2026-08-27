import { useState } from "react";
import type { ResolvedConnection } from "../model/types";
import { GENERATED_SYSTEM_MAIN_FILE_NAME } from "../rendering/generated-source-files";
import {
  CodeIcon,
  CopyIcon,
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
  onDownloadPdf: () => void;
}

export interface SchematicSheetPreview {
  id: string;
  title: string;
  sheetIndex: number;
  svgUrl: string;
}

const connectionColor = (kind: ResolvedConnection["kind"]): string =>
  kind === "power" ? "var(--power)" : "var(--data)";

export function OutputPanel({
  tsx,
  resolvedConnections,
  sheets,
  previewError,
  isRendering,
  onCopyTsx,
  onDownloadSourceFiles,
  onRender,
  onDownloadPdf,
}: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<"code" | "schematic">("code");
  const [selectedSheetId, setSelectedSheetId] = useState<string>();
  const selectedSheetIndex = Math.max(
    0,
    sheets.findIndex((sheet) => sheet.id === selectedSheetId),
  );
  const selectedSheet = sheets[selectedSheetIndex];
  const hasSchematic = sheets.length > 0;

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
                enable vector PDF export.
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
            <button
              className="primary-button"
              aria-label={
                hasSchematic
                  ? `Download all ${sheets.length} schematic sheet${sheets.length === 1 ? "" : "s"} as PDF`
                  : "Download schematic PDF"
              }
              disabled={!hasSchematic || isRendering}
              onClick={onDownloadPdf}
              type="button"
            >
              <span className="button-content">
                <PdfIcon />
                {sheets.length > 1 ? `PDF · ${sheets.length} sheets` : "PDF"}
              </span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
