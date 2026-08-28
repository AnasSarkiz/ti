export const CONNECTION_KINDS = ["power", "data"] as const;

export type ConnectionKind = (typeof CONNECTION_KINDS)[number];
export type ConnectionKindInput = ConnectionKind | "Power" | "Data";

/**
 * Protocol names are deliberately open ended.  The curated adapters use the
 * well-known values below, while a discovered subcircuit can add another
 * protocol without requiring a model-layer change.
 */
export type ConnectionProtocol =
  | "power"
  | "hci-uart"
  | "uart"
  | "i2c"
  | "i2s"
  | "gpio"
  | "can-controller"
  | "can-bus"
  | "motor-control"
  | (string & {});

export type PortRole =
  | "provider"
  | "consumer"
  | "source"
  | "sink"
  | "host"
  | "device"
  | "controller"
  | "peripheral"
  | "peer";

export type SignalDirection = "input" | "output" | "bidirectional" | "passive";

export interface VoltageRange {
  /** Minimum safe/usable voltage in volts. */
  min: number;
  /** Maximum safe/usable voltage in volts. */
  max: number;
  /** Preferred or generated nominal voltage in volts. */
  nominal?: number;
}

export type VoltageRequirement = number | VoltageRange;

export interface PortSignal {
  /** Logical signal name used by the automatic resolver. */
  name: string;
  direction: SignalDirection;
  /**
   * Selectors are relative to the subcircuit instance.  For example,
   * `.U1 > .VOUT` becomes `.power_1v8 > .U1 > .VOUT` in generated TSX.
   * More than one selector means every endpoint participates in the net.
   */
  selectors: readonly string[];
  required?: boolean;
}

export interface PortDefinition {
  id: string;
  label: string;
  kind: ConnectionKind;
  role: PortRole;
  protocol?: ConnectionProtocol;
  voltage?: VoltageRequirement;
  signals: readonly PortSignal[];
  /** Required logical signal names. Defaults to signals marked required. */
  requiredSignals?: readonly string[];
  /** True for a supply/bus which can service more than one other block. */
  allowMultiple?: boolean;
}

export interface SubcircuitDefinition {
  /** Stable kebab-case catalog identifier. */
  id: string;
  title: string;
  description?: string;
  category: string;
  /** Named export from the source subcircuit. */
  componentName: string;
  /** Package used in generated TSX. */
  importPath: string;
  /** Repository-relative source path, useful for source previews. */
  sourcePath: string;
  /** Raw source supplied by Vite's raw glob when available. */
  source?: string;
  tags?: readonly string[];
  /** False when the source cannot safely receive generated instance props. */
  canInstantiate?: boolean;
  /** Catalog warning shown before a user adds a constrained subcircuit. */
  warning?: string;
  ports: readonly PortDefinition[];
}

export interface BlockPosition {
  x: number;
  y: number;
}

export interface BlockInstance {
  id: string;
  definitionId: string;
  /** Generated tscircuit component name. Defaults to a sanitized id. */
  name?: string;
  /** Generated schematic sheet name. Defaults to the component name. */
  schSheetName?: string;
  /** Optional placement offset inside the generated detail sheet. */
  schX?: number;
  schY?: number;
  position?: BlockPosition;
}

export interface LogicalConnection {
  id: string;
  fromBlockId: string;
  toBlockId: string;
  kind: ConnectionKindInput;
  /** Optional user hint. Omit to let the resolver choose a unique protocol. */
  protocol?: ConnectionProtocol;
}

export interface ResolutionEndpoint {
  block: BlockInstance;
  definition: SubcircuitDefinition;
}

export interface ConnectionPortReference {
  blockId: string;
  portId: string;
}

export interface ResolveConnectionRequest {
  connectionId?: string;
  kind: ConnectionKindInput;
  protocol?: ConnectionProtocol;
  from: ResolutionEndpoint;
  to: ResolutionEndpoint;
  /** Single-use interfaces already claimed by other graph connections. */
  unavailablePorts?: readonly ConnectionPortReference[];
}

export interface ResolvedTrace {
  signal: string;
  fromBlockId: string;
  toBlockId: string;
  /** Selector relative to fromBlockId. */
  fromSelector: string;
  /** Selector relative to toBlockId. */
  toSelector: string;
}

export interface ResolvedConnection {
  id: string;
  kind: ConnectionKind;
  protocol?: ConnectionProtocol;
  fromBlockId: string;
  toBlockId: string;
  fromPortId: string;
  toPortId: string;
  score: number;
  traces: readonly ResolvedTrace[];
}

export type ConnectionResolutionErrorCode =
  | "INVALID_CONNECTION_KIND"
  | "SAME_BLOCK"
  | "NO_COMPATIBLE_PORTS"
  | "AMBIGUOUS_CONNECTION"
  | "PORT_IN_USE"
  | "UNKNOWN_BLOCK"
  | "UNKNOWN_SUBCIRCUIT";

export class ConnectionResolutionError extends Error {
  readonly code: ConnectionResolutionErrorCode;
  readonly details?: Readonly<Record<string, unknown>>;

  constructor(
    code: ConnectionResolutionErrorCode,
    message: string,
    details?: Readonly<Record<string, unknown>>,
  ) {
    super(message);
    this.name = "ConnectionResolutionError";
    this.code = code;
    this.details = details;
  }
}

export type TryResolutionResult =
  | { ok: true; value: ResolvedConnection }
  | { ok: false; error: ConnectionResolutionError };

export interface GenerateTsxRequest {
  blocks: readonly BlockInstance[];
  connections: readonly LogicalConnection[];
  catalog?: readonly SubcircuitDefinition[];
  boardName?: string;
  packageName?: string;
}
