import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type EdgeChange,
  type FinalConnectionState,
  type NodeChange,
  ReactFlow,
  type ReactFlowInstance,
} from "@xyflow/react";
import { useSyncExternalStore } from "react";
import { createRoot, type Root } from "react-dom/client";

import "@xyflow/react/dist/style.css";
import "./react-flow-editor.css";

import {
  assertResolvedConnectionPortsAvailable,
  getUnavailableConnectionPorts,
  tryResolveConnection,
} from "../model/resolve-connection";
import {
  type BlockInstance,
  type ConnectionKind,
  type ConnectionKindInput,
  ConnectionResolutionError,
  type LogicalConnection,
  type ResolvedConnection,
  type SubcircuitDefinition,
} from "../model/types";
import { getVisibleSystemBlockConnections } from "./power-aggregation";
import { SemanticEdge } from "./SemanticEdge";
import { SystemBlockNodeView } from "./SystemBlockNodeView";
import {
  type ConnectBlocksOptions,
  type CreateSystemBlockEditorOptions,
  createSystemBlockConnection,
  createSystemBlockNode,
  type GraphChangeListener,
  normalizeConnectionKind,
  type RejectedConnection,
  type SystemBlockConnection,
  type SystemBlockGraphSnapshot,
  type SystemBlockInitialGraph,
  type SystemBlockNode,
  type SystemBlockPosition,
  type SystemBlockRenderState,
} from "./types";

const NODE_TYPES = { systemBlock: SystemBlockNodeView };
const EDGE_TYPES = { semantic: SemanticEdge };

let fallbackId = 0;

function createId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  fallbackId += 1;
  return `${prefix}_${Date.now().toString(36)}_${fallbackId.toString(36)}`;
}

function cloneBlock(block: BlockInstance): BlockInstance {
  return {
    ...block,
    position: block.position ? { ...block.position } : undefined,
  };
}

function cloneResolved(resolved: ResolvedConnection): ResolvedConnection {
  return {
    ...resolved,
    traces: resolved.traces.map((trace) => ({ ...trace })),
  };
}

function missingBlockError(id: string): ConnectionResolutionError {
  return new ConnectionResolutionError(
    "UNKNOWN_BLOCK",
    `No system block with id "${id}" exists in the editor.`,
    { blockId: id },
  );
}

function parseHandle(
  handle: string | null,
  expectedSide: "input" | "output",
): ConnectionKind | undefined {
  const match = handle?.match(/^(input|output):(power|data)$/);
  if (!match || match[1] !== expectedSide) return undefined;
  return match[2] as ConnectionKind;
}

type ResolutionAttempt =
  | {
      ok: true;
      source: SystemBlockNode;
      target: SystemBlockNode;
      logical: LogicalConnection;
      resolved: ResolvedConnection;
    }
  | { ok: false; rejection: RejectedConnection };

function SystemBlockFlow({
  controller,
}: {
  controller: SystemBlockEditorController;
}) {
  const state = useSyncExternalStore(
    controller.subscribeRender,
    controller.getRenderState,
    controller.getRenderState,
  );

  return (
    <ReactFlow<SystemBlockNode, SystemBlockConnection>
      className="system-block-flow"
      colorMode="light"
      connectionLineStyle={{ stroke: "#7b8794", strokeWidth: 2.5 }}
      connectionRadius={28}
      deleteKeyCode={["Backspace", "Delete"]}
      edges={state.edges}
      edgesReconnectable={false}
      edgeTypes={EDGE_TYPES}
      elevateEdgesOnSelect
      fitViewOptions={{ maxZoom: 1.2, padding: 0.18 }}
      isValidConnection={controller.isValidConnection}
      minZoom={0.4}
      nodeTypes={NODE_TYPES}
      nodes={state.nodes}
      nodesConnectable
      onConnect={controller.handleConnect}
      onConnectEnd={controller.handleConnectEnd}
      onEdgesChange={controller.handleEdgesChange}
      onInit={controller.attachFlowInstance}
      onNodesChange={controller.handleNodesChange}
      panOnScroll
      proOptions={{ hideAttribution: false }}
      selectionOnDrag
      snapGrid={[18, 18]}
      snapToGrid
    >
      <Background
        color="#c8ced7"
        gap={18}
        id="system-block-grid"
        size={1.15}
        variant={BackgroundVariant.Dots}
      />
      <Controls
        fitViewOptions={{ maxZoom: 1.2, padding: 0.18 }}
        position="bottom-left"
        showInteractive={false}
      />
    </ReactFlow>
  );
}

/** Imperative adapter preserving the original App-facing editor contract. */
export class SystemBlockEditorController {
  private readonly definitions = new Map<string, SubcircuitDefinition>();
  private readonly graphListeners = new Set<GraphChangeListener>();
  private readonly renderListeners = new Set<() => void>();
  private readonly root: Root;
  private readonly ready: Promise<void>;
  private resolveReady!: () => void;
  private flowInstance?: ReactFlowInstance<
    SystemBlockNode,
    SystemBlockConnection
  >;
  private nodes: SystemBlockNode[] = [];
  private edges: SystemBlockConnection[] = [];
  private renderState: SystemBlockRenderState = {
    revision: 0,
    nodes: [],
    edges: [],
  };
  private destroyed = false;
  private graphNotificationQueued = false;
  private notificationsSuspended = 0;
  private lastConnectionRejection?: RejectedConnection;

  private constructor(
    container: HTMLElement,
    private readonly options: CreateSystemBlockEditorOptions,
  ) {
    for (const definition of options.catalog ?? []) {
      this.definitions.set(definition.id, definition);
    }
    if (options.onGraphChange) {
      this.graphListeners.add(options.onGraphChange);
    }

    this.ready = new Promise<void>((resolve) => {
      this.resolveReady = resolve;
    });
    this.root = createRoot(container);
    this.root.render(<SystemBlockFlow controller={this} />);
  }

  static async create(
    container: HTMLElement,
    options: CreateSystemBlockEditorOptions = {},
  ): Promise<SystemBlockEditorController> {
    const controller = new SystemBlockEditorController(container, options);
    await controller.ready;
    if (options.initialGraph) {
      await controller.loadInitialGraph(options.initialGraph);
    } else {
      controller.scheduleGraphChange();
    }
    return controller;
  }

  readonly subscribeRender = (listener: () => void): (() => void) => {
    this.renderListeners.add(listener);
    return () => this.renderListeners.delete(listener);
  };

  readonly getRenderState = (): SystemBlockRenderState => this.renderState;

  readonly attachFlowInstance = (
    instance: ReactFlowInstance<SystemBlockNode, SystemBlockConnection>,
  ): void => {
    this.flowInstance = instance;
    this.resolveReady();
  };

  readonly handleNodesChange = (
    changes: NodeChange<SystemBlockNode>[],
  ): void => {
    if (this.destroyed || changes.length === 0) return;
    const previousById = new Map(this.nodes.map((node) => [node.id, node]));
    const removed = new Set(
      changes
        .filter((change) => change.type === "remove")
        .map((change) => change.id),
    );

    this.nodes = applyNodeChanges(changes, this.nodes).map((node) => {
      const previous = previousById.get(node.id);
      if (
        previous &&
        (previous.position.x !== node.position.x ||
          previous.position.y !== node.position.y)
      ) {
        return {
          ...node,
          data: {
            ...node.data,
            block: {
              ...node.data.block,
              position: { ...node.position },
            },
          },
        };
      }
      return node;
    });

    if (removed.size > 0) {
      this.edges = this.edges.filter(
        (edge) => !removed.has(edge.source) && !removed.has(edge.target),
      );
    }
    const graphChanged =
      removed.size > 0 ||
      changes.some(
        (change) => change.type === "position" && change.dragging !== true,
      );
    this.publishRender(graphChanged);
  };

  readonly handleEdgesChange = (
    changes: EdgeChange<SystemBlockConnection>[],
  ): void => {
    if (this.destroyed || changes.length === 0) return;
    const powerSummaryIds = new Set(
      this.renderState.edges
        .filter((edge) => edge.data.powerSummary)
        .map((edge) => edge.id),
    );
    const graphChanges = changes.filter(
      (change) =>
        !powerSummaryIds.has("id" in change ? change.id : change.item.id),
    );
    if (graphChanges.length === 0) return;
    this.edges = applyEdgeChanges(graphChanges, this.edges);
    this.publishRender(graphChanges.some((change) => change.type === "remove"));
  };

  readonly isValidConnection = (
    connection: SystemBlockConnection | Connection,
  ): boolean => {
    const attempt = this.resolveFlowConnection(connection);
    this.lastConnectionRejection = attempt.ok ? undefined : attempt.rejection;
    return attempt.ok;
  };

  readonly handleConnect = (connection: Connection): void => {
    const sourceKind = parseHandle(connection.sourceHandle, "output");
    if (!sourceKind) return;
    this.lastConnectionRejection = undefined;
    void this.connect({
      id: createId("connection"),
      fromBlockId: connection.source,
      toBlockId: connection.target,
      kind: sourceKind,
    }).catch(() => {
      // connect() reports semantic failures through onConnectionRejected.
      // React Flow owns this event callback, so keep its promise rejection local.
    });
  };

  readonly handleConnectEnd = (
    _event: MouseEvent | TouchEvent,
    state: FinalConnectionState,
  ): void => {
    if (state.isValid !== true && this.lastConnectionRejection) {
      this.reject(this.lastConnectionRejection);
    }
    this.lastConnectionRejection = undefined;
  };

  async addBlock(
    definition: SubcircuitDefinition,
    position: SystemBlockPosition = { x: 0, y: 0 },
    instance: Partial<BlockInstance> = {},
  ): Promise<SystemBlockNode> {
    this.assertAlive();
    this.definitions.set(definition.id, definition);
    const block: BlockInstance = {
      ...instance,
      id: instance.id ?? createId("block"),
      definitionId: definition.id,
      position: { ...position },
    };
    if (this.nodes.some((node) => node.id === block.id)) {
      throw new Error(`A system block with id "${block.id}" already exists.`);
    }

    const node = createSystemBlockNode(block, definition);
    this.nodes = [...this.nodes, node];
    this.publishRender(true);
    return node;
  }

  clientToCanvas(point: SystemBlockPosition): SystemBlockPosition {
    this.assertAlive();
    if (!this.flowInstance) {
      throw new Error("The system block canvas is not ready.");
    }
    return this.flowInstance.screenToFlowPosition(point, {
      snapGrid: [18, 18],
      snapToGrid: true,
    });
  }

  addBlockAtClientPoint(
    definition: SubcircuitDefinition,
    clientPoint: SystemBlockPosition,
    instance: Partial<BlockInstance> = {},
  ): Promise<SystemBlockNode> {
    return this.addBlock(
      definition,
      this.clientToCanvas(clientPoint),
      instance,
    );
  }

  async connect(logical: LogicalConnection): Promise<SystemBlockConnection> {
    this.assertAlive();
    const attempt = this.resolveLogicalConnection(logical);
    if (!attempt.ok) {
      this.reject(attempt.rejection);
      throw attempt.rejection.error;
    }
    if (this.edges.some((edge) => edge.id === logical.id)) {
      throw new Error(`A connection with id "${logical.id}" already exists.`);
    }

    const edge = createSystemBlockConnection(
      attempt.source,
      attempt.target,
      attempt.logical,
      attempt.resolved,
    );
    this.edges = [...this.edges, edge];
    this.publishRender(true);
    return edge;
  }

  connectBlocks(
    fromBlockId: string,
    toBlockId: string,
    kind: ConnectionKindInput,
    options: ConnectBlocksOptions = {},
  ): Promise<SystemBlockConnection> {
    return this.connect({
      id: options.id ?? createId("connection"),
      fromBlockId,
      toBlockId,
      kind,
      protocol: options.protocol,
    });
  }

  async removeBlock(id: string): Promise<boolean> {
    this.assertAlive();
    if (!this.nodes.some((node) => node.id === id)) return false;
    this.nodes = this.nodes.filter((node) => node.id !== id);
    this.edges = this.edges.filter(
      (edge) => edge.source !== id && edge.target !== id,
    );
    this.publishRender(true);
    return true;
  }

  async removeConnection(id: string): Promise<boolean> {
    this.assertAlive();
    if (!this.edges.some((edge) => edge.id === id)) return false;
    this.edges = this.edges.filter((edge) => edge.id !== id);
    this.publishRender(true);
    return true;
  }

  async clear(): Promise<boolean> {
    this.assertAlive();
    this.nodes = [];
    this.edges = [];
    this.publishRender(true);
    return true;
  }

  /** Atomically replace the graph and automatically resolve every edge. */
  async loadInitialGraph(graph: SystemBlockInitialGraph): Promise<void> {
    this.assertAlive();
    const nextNodes: SystemBlockNode[] = [];
    const seenIds = new Set<string>();
    for (const block of graph.blocks) {
      if (seenIds.has(block.id)) {
        throw new Error(`Duplicate system block id "${block.id}".`);
      }
      seenIds.add(block.id);
      const definition = this.definitions.get(block.definitionId);
      if (!definition) {
        throw new ConnectionResolutionError(
          "UNKNOWN_SUBCIRCUIT",
          `No catalog definition exists for "${block.definitionId}".`,
          { blockId: block.id, definitionId: block.definitionId },
        );
      }
      nextNodes.push(createSystemBlockNode(block, definition));
    }

    const nextEdges: SystemBlockConnection[] = [];
    for (const logical of graph.connections) {
      const attempt = this.resolveLogicalConnection(
        logical,
        nextNodes,
        nextEdges,
      );
      if (!attempt.ok) throw attempt.rejection.error;
      nextEdges.push(
        createSystemBlockConnection(
          attempt.source,
          attempt.target,
          attempt.logical,
          attempt.resolved,
        ),
      );
    }

    this.notificationsSuspended += 1;
    try {
      this.nodes = nextNodes;
      this.edges = nextEdges;
      this.publishRender(false);
    } finally {
      this.notificationsSuspended -= 1;
      this.scheduleGraphChange();
    }
  }

  getSnapshot(): SystemBlockGraphSnapshot {
    return {
      blocks: this.nodes.map((node) =>
        cloneBlock({
          ...node.data.block,
          position: { ...node.position },
        }),
      ),
      connections: this.edges.map((edge) => ({ ...edge.data.logical })),
      resolvedConnections: this.edges.map((edge) =>
        cloneResolved(edge.data.resolved),
      ),
    };
  }

  subscribe(listener: GraphChangeListener, emitCurrent = true): () => void {
    this.assertAlive();
    this.graphListeners.add(listener);
    if (emitCurrent) listener(this.getSnapshot());
    return () => this.graphListeners.delete(listener);
  }

  async zoomToFit(): Promise<void> {
    this.assertAlive();
    if (this.nodes.length === 0 || !this.flowInstance) return;
    // Controlled nodes reach React Flow's measured-node store on the next
    // frame. Waiting here keeps reset -> fit deterministic for App callers.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    await this.flowInstance.fitView({
      duration: 280,
      maxZoom: 1.2,
      padding: 0.18,
    });
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.graphListeners.clear();
    this.renderListeners.clear();
    this.flowInstance = undefined;
    this.root.unmount();
  }

  private resolveFlowConnection(
    connection: SystemBlockConnection | Connection,
  ): ResolutionAttempt {
    const sourceKind = parseHandle(connection.sourceHandle ?? null, "output");
    const targetKind = parseHandle(connection.targetHandle ?? null, "input");
    if (!sourceKind || sourceKind !== targetKind) {
      return this.failedResolution(
        new ConnectionResolutionError(
          "NO_COMPATIBLE_PORTS",
          "Connect Power to Power or Data to Data.",
          { sourceKind, targetKind },
        ),
      );
    }

    return this.resolveLogicalConnection({
      id: createId("connection-preview"),
      fromBlockId: connection.source,
      toBlockId: connection.target,
      kind: sourceKind,
    });
  }

  private resolveLogicalConnection(
    logical: LogicalConnection,
    nodes: readonly SystemBlockNode[] = this.nodes,
    edges: readonly SystemBlockConnection[] = this.edges,
  ): ResolutionAttempt {
    const source = nodes.find((node) => node.id === logical.fromBlockId);
    const target = nodes.find((node) => node.id === logical.toBlockId);
    if (!source) {
      return this.failedResolution(
        missingBlockError(logical.fromBlockId),
        logical,
      );
    }
    if (!target) {
      return this.failedResolution(
        missingBlockError(logical.toBlockId),
        logical,
      );
    }

    const kind = normalizeConnectionKind(logical.kind);
    const sourceInterface = source.data.interfaces.find(
      (item) => item.kind === kind && item.outputPorts.length > 0,
    );
    const targetInterface = target.data.interfaces.find(
      (item) => item.kind === kind && item.inputPorts.length > 0,
    );
    if (!sourceInterface || !targetInterface) {
      return this.failedResolution(
        new ConnectionResolutionError(
          "NO_COMPATIBLE_PORTS",
          `${source.data.definition.title} cannot provide ${kind} to ${target.data.definition.title}.`,
          { fromBlockId: source.id, toBlockId: target.id, kind },
        ),
        logical,
      );
    }

    const blocks = nodes.map((node) => ({
      ...node.data.block,
      position: { ...node.position },
    }));
    const catalog = [...this.definitions.values()];
    const existingResolved = edges.map((edge) => edge.data.resolved);
    const result = tryResolveConnection({
      connectionId: logical.id,
      kind,
      protocol: logical.protocol,
      from: { block: source.data.block, definition: source.data.definition },
      to: { block: target.data.block, definition: target.data.definition },
      unavailablePorts: getUnavailableConnectionPorts(
        existingResolved,
        blocks,
        catalog,
      ),
    });
    if (!result.ok) return this.failedResolution(result.error, logical);

    const duplicate = edges.find(
      (edge) =>
        edge.source === source.id &&
        edge.target === target.id &&
        edge.data.resolved.fromPortId === result.value.fromPortId &&
        edge.data.resolved.toPortId === result.value.toPortId,
    );
    if (duplicate) {
      return this.failedResolution(
        new ConnectionResolutionError(
          "NO_COMPATIBLE_PORTS",
          "Those resolved interfaces are already connected.",
          { existingConnectionId: duplicate.id },
        ),
        logical,
      );
    }

    try {
      assertResolvedConnectionPortsAvailable(
        result.value,
        existingResolved,
        blocks,
        catalog,
      );
    } catch (error) {
      if (error instanceof ConnectionResolutionError) {
        return this.failedResolution(error, logical);
      }
      throw error;
    }

    return {
      ok: true,
      source,
      target,
      logical: { ...logical, kind },
      resolved: result.value,
    };
  }

  private failedResolution(
    error: ConnectionResolutionError,
    connection?: LogicalConnection,
  ): ResolutionAttempt {
    return { ok: false, rejection: { error, connection } };
  }

  private reject(rejection: RejectedConnection): void {
    this.options.onConnectionRejected?.(rejection);
  }

  private publishRender(graphChanged: boolean): void {
    this.renderState = {
      revision: this.renderState.revision + 1,
      nodes: this.nodes,
      edges: getVisibleSystemBlockConnections(this.edges),
    };
    for (const listener of this.renderListeners) listener();
    if (graphChanged) this.scheduleGraphChange();
  }

  private scheduleGraphChange(): void {
    if (
      this.destroyed ||
      this.notificationsSuspended > 0 ||
      this.graphNotificationQueued
    ) {
      return;
    }
    this.graphNotificationQueued = true;
    queueMicrotask(() => {
      this.graphNotificationQueued = false;
      if (this.destroyed || this.notificationsSuspended > 0) return;
      const snapshot = this.getSnapshot();
      for (const listener of this.graphListeners) listener(snapshot);
    });
  }

  private assertAlive(): void {
    if (this.destroyed) {
      throw new Error("The system block editor was destroyed.");
    }
  }
}

export function createSystemBlockEditor(
  container: HTMLElement,
  options: CreateSystemBlockEditorOptions = {},
): Promise<SystemBlockEditorController> {
  return SystemBlockEditorController.create(container, options);
}
