import { ClassicPreset, type GetSchemes } from "rete";

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
  power: "#f59e0b",
  data: "#2563eb",
} satisfies Record<ConnectionKind, string>;

const OUTPUT_ROLES = new Set(["provider", "source", "host", "controller"]);
const INPUT_ROLES = new Set(["consumer", "sink", "device", "peripheral"]);

export function normalizeConnectionKind(
  kind: ConnectionKindInput,
): ConnectionKind {
  return kind.toLowerCase() as ConnectionKind;
}

export function getSystemBlockSocketKey(
  side: "input" | "output",
  kind: ConnectionKind,
): string {
  return `${side}:${kind}`;
}

export class SemanticSocket extends ClassicPreset.Socket {
  readonly kind: ConnectionKind;
  readonly side: "input" | "output";
  readonly ports: readonly PortDefinition[];

  constructor(
    kind: ConnectionKind,
    side: "input" | "output",
    ports: readonly PortDefinition[],
  ) {
    super(SYSTEM_BLOCK_SOCKET_LABELS[kind]);
    this.kind = kind;
    this.side = side;
    this.ports = ports;
  }
}

type SemanticSocketMap = Record<string, SemanticSocket>;

function portSupportsSide(
  port: PortDefinition,
  side: "input" | "output",
): boolean {
  if (port.role === "peer") return true;
  return side === "input"
    ? INPUT_ROLES.has(port.role)
    : OUTPUT_ROLES.has(port.role);
}

/** A Rete node backed by one model-layer subcircuit instance. */
export class SystemBlockNode extends ClassicPreset.Node<
  SemanticSocketMap,
  SemanticSocketMap
> {
  readonly definition: SubcircuitDefinition;
  block: BlockInstance;
  width = 240;
  height = 112;

  constructor(block: BlockInstance, definition: SubcircuitDefinition) {
    super(definition.title);
    this.id = block.id;
    this.block = {
      ...block,
      definitionId: definition.id,
      position: block.position ? { ...block.position } : undefined,
    };
    this.definition = definition;

    for (const kind of ["power", "data"] as const) {
      for (const side of ["input", "output"] as const) {
        const ports = definition.ports.filter(
          (port) => port.kind === kind && portSupportsSide(port, side),
        );
        if (ports.length === 0) continue;

        const socket = new SemanticSocket(kind, side, ports);
        const key = getSystemBlockSocketKey(side, kind);
        const label = SYSTEM_BLOCK_SOCKET_LABELS[kind];
        // The visible socket aggregates every compatible model port. Multiple
        // physical rails/interfaces must remain connectable independently even
        // when each underlying port only accepts one connection.
        const multiple =
          ports.length > 1 || ports.some((port) => port.allowMultiple === true);

        if (side === "input") {
          this.addInput(key, new ClassicPreset.Input(socket, label, multiple));
        } else {
          this.addOutput(
            key,
            new ClassicPreset.Output(socket, label, multiple),
          );
        }
      }
    }

    this.height =
      72 +
      Math.max(
        Object.keys(this.inputs).length,
        Object.keys(this.outputs).length,
        1,
      ) *
        40;
  }

  setPosition(position: SystemBlockPosition): void {
    this.block = { ...this.block, position: { ...position } };
  }

  getPosition(): SystemBlockPosition {
    return { ...(this.block.position ?? { x: 0, y: 0 }) };
  }
}

/** A rendered edge plus the resolver result used later by TSX generation. */
export class SystemBlockConnection extends ClassicPreset.Connection<
  SystemBlockNode,
  SystemBlockNode
> {
  readonly logical: LogicalConnection;
  readonly resolved: ResolvedConnection;
  readonly kind: ConnectionKind;
  readonly label: string;
  readonly color: string;

  constructor(
    source: SystemBlockNode,
    target: SystemBlockNode,
    logical: LogicalConnection,
    resolved: ResolvedConnection,
  ) {
    const kind = normalizeConnectionKind(logical.kind);
    super(
      source,
      getSystemBlockSocketKey("output", kind),
      target,
      getSystemBlockSocketKey("input", kind),
    );
    this.id = logical.id;
    this.logical = { ...logical };
    this.resolved = {
      ...resolved,
      traces: resolved.traces.map((trace) => ({ ...trace })),
    };
    this.kind = kind;
    this.label = SYSTEM_BLOCK_SOCKET_LABELS[kind];
    this.color = SYSTEM_BLOCK_CONNECTION_COLORS[kind];
  }
}

export type SystemBlockSchemes = GetSchemes<
  SystemBlockNode,
  SystemBlockConnection
>;

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
