import { Handle, type NodeProps, Position } from "@xyflow/react";

import type { PortDefinition, VoltageRequirement } from "../model/types";
import {
  formatProtocolLabel,
  getSystemBlockHandleId,
  type SemanticInterfaceSummary,
  type SystemBlockNode,
} from "./types";

function formatVoltage(voltage: VoltageRequirement): string {
  if (typeof voltage === "number") return `${voltage} V`;
  if (voltage.nominal !== undefined) return `${voltage.nominal} V`;
  return `${voltage.min}–${voltage.max} V`;
}

function rowMetadata(ports: readonly PortDefinition[]): string {
  const voltages = [
    ...new Set(
      ports
        .map((port) => port.voltage)
        .filter(
          (voltage): voltage is VoltageRequirement => voltage !== undefined,
        )
        .map(formatVoltage),
    ),
  ];
  const protocols = [
    ...new Set(
      ports
        .map((port) => port.protocol)
        .filter((protocol): protocol is string => Boolean(protocol))
        .filter((protocol) => protocol !== "power")
        .map(formatProtocolLabel),
    ),
  ];
  const details = [...voltages, ...protocols];
  const prefix = ports.length > 1 ? `${ports.length} ports` : ports[0]?.label;
  return [prefix, ...details].filter(Boolean).join(" · ");
}

function InterfaceRow({
  summary,
  side,
}: {
  summary: SemanticInterfaceSummary;
  side: "input" | "output";
}) {
  const ports = side === "input" ? summary.inputPorts : summary.outputPorts;
  if (ports.length === 0) return null;

  const handle = (
    <Handle
      className="system-block-handle"
      id={getSystemBlockHandleId(side, summary.kind)}
      position={side === "input" ? Position.Left : Position.Right}
      style={{ background: summary.color }}
      title={`${summary.label} ${side}`}
      type={side === "input" ? "target" : "source"}
    />
  );

  return (
    <div className="system-block-port-row" data-side={side}>
      {side === "input" && handle}
      <span className="system-block-port-direction">
        {side === "input" ? "IN" : "OUT"}
      </span>
      <span className="system-block-port-kind" style={{ color: summary.color }}>
        <span
          className="system-block-port-dot"
          style={{ background: summary.color }}
        />
        {summary.label}
      </span>
      <span className="system-block-port-meta" title={rowMetadata(ports)}>
        {rowMetadata(ports)}
      </span>
      {side === "output" && handle}
    </div>
  );
}

export function SystemBlockNodeView({
  data,
  selected,
}: NodeProps<SystemBlockNode>) {
  const { definition, interfaces } = data;
  const placementOnly = interfaces.length === 0;

  return (
    <article
      className={`system-block-card${selected ? " is-selected" : ""}${placementOnly ? " is-placement-only" : ""}`}
    >
      <header className="system-block-card-header">
        <span className="system-block-card-heading">
          <strong>{definition.title}</strong>
          <span>{definition.category}</span>
          <code>{data.block.name ?? data.block.id}</code>
        </span>
        <span
          className="system-block-review-badge"
          data-reviewed={!placementOnly}
        >
          {placementOnly ? "Placement only" : "Reviewed"}
        </span>
      </header>

      {definition.description && (
        <p className="system-block-description">{definition.description}</p>
      )}

      {placementOnly ? (
        <div className="system-block-empty-interfaces">
          <span>No reviewed interfaces yet</span>
          <small>This block can be placed but not auto-connected.</small>
        </div>
      ) : (
        <div className="system-block-interface-list">
          {interfaces.map((summary) => (
            <InterfaceRow
              key={`input:${summary.kind}`}
              side="input"
              summary={summary}
            />
          ))}
          {interfaces.map((summary) => (
            <InterfaceRow
              key={`output:${summary.kind}`}
              side="output"
              summary={summary}
            />
          ))}
        </div>
      )}
    </article>
  );
}
