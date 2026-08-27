import type { Edge, Node } from "@xyflow/react";

import type {
  BlockInstance,
  BlockPosition,
  ConnectionKind,
  ConnectionKindInput,
  ConnectionProtocol,
  ConnectionResolutionError,
  LogicalConnection,
  PortDefinition,
  ResolvedConnection,
  SubcircuitDefinition,
} from "../model/types";

export type SystemBlockPosition = BlockPosition;

export const SYSTEM_BLOCK_SOCKET_LABELS = {
  power: "Power",
  data: "Data",
} satisfies Record<ConnectionKind, string>;

export const SYSTEM_BLOCK_CONNECTION_COLORS = {
  power: "#d97706",
  data: "#377bd4",
} satisfies Record<ConnectionKind, string>;

const OUTPUT_ROLES = new Set(["provider", "source", "host", "controller"]);
const INPUT_ROLES = new Set(["consumer", "sink", "device", "peripheral"]);

const PROTOCOL_LABELS: Readonly<Record<string, string>> = {
  "can-bus": "CAN Bus",
  "can-controller": "CAN",
  "hci-uart": "HCI UART",
  "motor-control": "Motor Control",
  gpio: "GPIO",
  i2c: "I²C",
  i2s: "I²S",
  power: "Power",
  uart: "UART",
};

export function formatProtocolLabel(protocol: string): string {
  return (
    PROTOCOL_LABELS[protocol] ??
    protocol
      .split(/[-_]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function normalizeConnectionKind(
  kind: ConnectionKindInput,
): ConnectionKind {
  return kind.toLowerCase() as ConnectionKind;
}

export function getSystemBlockHandleId(
  side: "input" | "output",
  kind: ConnectionKind,
): string {
  return `${side}:${kind}`;
}

/** @deprecated Use getSystemBlockHandleId. */
export const getSystemBlockSocketKey = getSystemBlockHandleId;

function portSupportsSide(
  port: PortDefinition,
  side: "input" | "output",
): boolean {
  if (port.role === "peer") return true;
  return side === "input"
    ? INPUT_ROLES.has(port.role)
    : OUTPUT_ROLES.has(port.role);
}

export interface SemanticInterfaceSummary {
  kind: ConnectionKind;
  label: string;
  color: string;
  inputPorts: readonly PortDefinition[];
  outputPorts: readonly PortDefinition[];
  protocols: readonly string[];
}

export type SystemBlockNodeData = {
  block: BlockInstance;
  definition: SubcircuitDefinition;
  interfaces: readonly SemanticInterfaceSummary[];
};

export type SystemBlockNode = Node<SystemBlockNodeData, "systemBlock">;

export interface PowerSummaryMetadata {
  /** Underlying logical power links represented by this canvas-only edge. */
  connectionIds: readonly string[];
  rootBlockId: string;
  targetBlockId: string;
  blockCount: number;
  loadCount: number;
  linkCount: number;
  traceCount: number;
}

export type SystemBlockConnectionData = {
  logical: LogicalConnection;
  resolved: ResolvedConnection;
  kind: ConnectionKind;
  label: string;
  color: string;
  /** Present only on the synthetic, visual-only power-network edge. */
  powerSummary?: PowerSummaryMetadata;
};

export type SystemBlockConnection = Edge<
  SystemBlockConnectionData,
  "semantic"
> & { data: SystemBlockConnectionData };

export function getSemanticInterfaces(
  definition: SubcircuitDefinition,
): readonly SemanticInterfaceSummary[] {
  return (["power", "data"] as const).flatMap((kind) => {
    const inputPorts = definition.ports.filter(
      (port) => port.kind === kind && portSupportsSide(port, "input"),
    );
    const outputPorts = definition.ports.filter(
      (port) => port.kind === kind && portSupportsSide(port, "output"),
    );
    if (inputPorts.length === 0 && outputPorts.length === 0) return [];

    const protocols = [
      ...new Set(
        [...inputPorts, ...outputPorts]
          .map((port) => port.protocol)
          .filter((protocol): protocol is string => Boolean(protocol)),
      ),
    ];

    return [
      {
        kind,
        label: SYSTEM_BLOCK_SOCKET_LABELS[kind],
        color: SYSTEM_BLOCK_CONNECTION_COLORS[kind],
        inputPorts,
        outputPorts,
        protocols,
      },
    ];
  });
}

export function createSystemBlockNode(
  block: BlockInstance,
  definition: SubcircuitDefinition,
): SystemBlockNode {
  const position = block.position ?? { x: 0, y: 0 };
  const normalizedBlock: BlockInstance = {
    ...block,
    definitionId: definition.id,
    position: { ...position },
  };

  return {
    id: normalizedBlock.id,
    type: "systemBlock",
    position: { ...position },
    data: {
      block: normalizedBlock,
      definition,
      interfaces: getSemanticInterfaces(definition),
    },
    ariaLabel: `${definition.title} system block`,
    deletable: true,
    draggable: true,
    selectable: true,
  };
}

export function createSystemBlockConnection(
  source: SystemBlockNode,
  target: SystemBlockNode,
  logical: LogicalConnection,
  resolved: ResolvedConnection,
): SystemBlockConnection {
  const kind = normalizeConnectionKind(logical.kind);
  const normalizedLogical: LogicalConnection = { ...logical, kind };
  const label =
    kind === "power"
      ? "Power"
      : resolved.protocol
        ? `Data · ${formatProtocolLabel(resolved.protocol)}`
        : "Data";

  return {
    id: logical.id,
    type: "semantic",
    source: source.id,
    target: target.id,
    sourceHandle: getSystemBlockHandleId("output", kind),
    targetHandle: getSystemBlockHandleId("input", kind),
    data: {
      logical: normalizedLogical,
      resolved: {
        ...resolved,
        traces: resolved.traces.map((trace) => ({ ...trace })),
      },
      kind,
      label,
      color: SYSTEM_BLOCK_CONNECTION_COLORS[kind],
    },
    ariaLabel: `${label} connection from ${source.data.definition.title} to ${target.data.definition.title}`,
    deletable: true,
    focusable: true,
    selectable: true,
  };
}

export interface SystemBlockGraphSnapshot {
  blocks: BlockInstance[];
  connections: LogicalConnection[];
  resolvedConnections: ResolvedConnection[];
}

export interface SystemBlockInitialGraph {
  blocks: readonly BlockInstance[];
  connections: readonly LogicalConnection[];
}

export interface ConnectBlocksOptions {
  id?: string;
  protocol?: ConnectionProtocol;
}

export type GraphChangeListener = (snapshot: SystemBlockGraphSnapshot) => void;

export interface RejectedConnection {
  error: ConnectionResolutionError;
  connection?: LogicalConnection;
}

export interface CreateSystemBlockEditorOptions {
  catalog?: readonly SubcircuitDefinition[];
  initialGraph?: SystemBlockInitialGraph;
  onGraphChange?: GraphChangeListener;
  onConnectionRejected?: (rejection: RejectedConnection) => void;
}

export interface SystemBlockRenderState {
  revision: number;
  nodes: SystemBlockNode[];
  edges: SystemBlockConnection[];
}
