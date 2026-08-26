import { useState } from "react";
import type { ResolvedConnection } from "../model/types";
import {
  CircuitIcon,
  CodeIcon,
  CopyIcon,
  PdfIcon,
  SparkIcon,
  WarningIcon,
} from "./Icons";

interface OutputPanelProps {
  tsx: string;
  resolvedConnections: readonly ResolvedConnection[];
  svgUrl?: string;
  previewError?: string;
  isRendering: boolean;
  onCopyTsx: () => void;
  onDownloadTsx: () => void;
  onRender: () => void;
  onDownloadPdf: () => void;
}

const connectionColor = (kind: ResolvedConnection["kind"]): string =>
  kind === "power" ? "var(--power)" : "var(--data)";

export function OutputPanel({
  tsx,
  resolvedConnections,
  svgUrl,
  previewError,
  isRendering,
  onCopyTsx,
  onDownloadTsx,
  onRender,
  onDownloadPdf,
}: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<"code" | "schematic">("code");

  return (
    <aside className="output-panel" aria-label="Generated output">
      <div className="tab-list" role="tablist">
        <button
          aria-selected={activeTab === "code"}
          className="tab-button"
          onClick={() => setActiveTab("code")}
          role="tab"
          type="button"
        >
          <CodeIcon />
          Generated TSX
        </button>
        <button
          aria-selected={activeTab === "schematic"}
          className="tab-button"
          onClick={() => setActiveTab("schematic")}
          role="tab"
          type="button"
        >
          <CircuitIcon />
          Schematic
        </button>
      </div>

      {activeTab === "code" ? (
        <div className="output-body" role="tabpanel">
          <div className="code-toolbar">
            <span>GeneratedSystem.circuit.tsx</span>
            <span className="code-actions">
              <button
                aria-label="Copy generated TSX"
                className="icon-button"
                onClick={onCopyTsx}
                title="Copy TSX"
                type="button"
              >
                <CopyIcon />
              </button>
              <button
                aria-label="Download generated TSX"
                className="icon-button"
                onClick={onDownloadTsx}
                title="Download TSX"
                type="button"
              >
                <CodeIcon />
              </button>
            </span>
          </div>
          <pre className="code-view">
            <code>{tsx}</code>
          </pre>
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
        <div className="preview-pane" role="tabpanel">
          <div className="preview-stage">
            {isRendering ? (
              <div className="preview-loading">
                <span className="spinner" />
                Evaluating TSX with PCB and routing disabled…
              </div>
            ) : previewError ? (
              <div className="preview-error">
                <WarningIcon />
                {previewError}
              </div>
            ) : svgUrl ? (
              <img alt="Generated circuit schematic" src={svgUrl} />
            ) : (
              <div className="preview-empty">
                <SparkIcon />
                Render the generated TSX to inspect its schematic and enable
                vector PDF export.
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
                {svgUrl ? "Render again" : "Render schematic"}
              </span>
            </button>
            <button
              className="primary-button"
              disabled={!svgUrl || isRendering}
              onClick={onDownloadPdf}
              type="button"
            >
              <span className="button-content">
                <PdfIcon />
                PDF
              </span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
