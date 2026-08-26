import { createRoot } from "react-dom/client";
import { getUID, NodeEditor } from "rete";
import { type Area2D, AreaExtensions, AreaPlugin } from "rete-area-plugin";
import {
  ClassicFlow,
  ConnectionPlugin,
  getSourceTarget,
  type SocketData,
} from "rete-connection-plugin";
import {
  type ReactArea2D,
  ReactPlugin,
  Presets as ReactPresets,
} from "rete-react-plugin";

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
  type SubcircuitDefinition,
} from "../model/types";
import { LabeledConnection } from "./LabeledConnection";
import { SemanticSocketView } from "./SemanticSocketView";
import {
  type ConnectBlocksOptions,
  type CreateSystemBlockEditorOptions,
  type GraphChangeListener,
  getSystemBlockSocketKey,
  normalizeConnectionKind,
  type RejectedConnection,
  SemanticSocket,
  SystemBlockConnection,
  type SystemBlockGraphSnapshot,
  type SystemBlockInitialGraph,
  SystemBlockNode,
  type SystemBlockPosition,
  type SystemBlockSchemes,
} from "./types";

type EditorAreaExtra =
  | Area2D<SystemBlockSchemes>
  | ReactArea2D<SystemBlockSchemes>;

type SocketResolution =
  | {
      ok: true;
      source: SystemBlockNode;
      target: SystemBlockNode;
      logical: LogicalConnection;
      resolved: SystemBlockConnection["resolved"];
    }
  | { ok: false; rejection: RejectedConnection };

function cloneBlock(block: BlockInstance): BlockInstance {
  return {
    ...block,
    position: block.position ? { ...block.position } : undefined,
  };
}

function makeMissingBlockError(id: string): ConnectionResolutionError {
  return new ConnectionResolutionError(
    "UNKNOWN_BLOCK",
    `No system block with id "${id}" exists in the editor.`,
    { blockId: id },
  );
}

/** Imperative controller used by the React shell and drag/drop palette. */
export class SystemBlockEditorController {
  readonly editor = new NodeEditor<SystemBlockSchemes>();
  readonly area: AreaPlugin<SystemBlockSchemes, EditorAreaExtra>;
  readonly connectionPlugin = new ConnectionPlugin<
    SystemBlockSchemes,
    EditorAreaExtra
  >();
  readonly renderPlugin = new ReactPlugin<SystemBlockSchemes, EditorAreaExtra>({
    createRoot,
  });

  private readonly definitions = new Map<string, SubcircuitDefinition>();
  private readonly listeners = new Set<GraphChangeListener>();
  private readonly onConnectionRejected?: (
    rejection: RejectedConnection,
  ) => void;
  private destroyed = false;
  private snapshotQueued = false;
  private notificationsSuspended = 0;

  private constructor(
    private readonly container: HTMLElement,
    options: CreateSystemBlockEditorOptions,
  ) {
    this.area = new AreaPlugin<SystemBlockSchemes, EditorAreaExtra>(container);
    this.onConnectionRejected = options.onConnectionRejected;

    for (const definition of options.catalog ?? []) {
      this.definitions.set(definition.id, definition);
    }
    if (options.onGraphChange) this.listeners.add(options.onGraphChange);

    this.connectionPlugin.addPreset(
      () =>
        new ClassicFlow({
          canMakeConnection: (from, to) => {
            const attempt = this.resolveSocketPair(from, to);
            if (!attempt.ok) this.reject(attempt.rejection);
            return attempt.ok;
          },
          makeConnection: (from, to) => {
            const attempt = this.resolveSocketPair(from, to, getUID());
            if (!attempt.ok) {
              this.reject(attempt.rejection);
              return false;
            }

            const connection = new SystemBlockConnection(
              attempt.source,
              attempt.target,
              attempt.logical,
              attempt.resolved,
            );
            void this.editor.addConnection(connection).then((created) => {
              if (created) this.scheduleGraphChange();
            });
            return true;
          },
        }),
    );

    this.renderPlugin.addPreset(
      ReactPresets.classic.setup<
        SystemBlockSchemes,
        ReactArea2D<SystemBlockSchemes>
      >({
        customize: {
          connection: () => LabeledConnection,
          socket: () => SemanticSocketView,
        },
      }),
    );

    this.editor.use(this.area);
    this.area.use(this.connectionPlugin);
    this.area.use(this.renderPlugin);

    this.editor.addPipe((context) => {
      if (
        context.type === "nodecreated" ||
        context.type === "noderemoved" ||
        context.type === "connectioncreated" ||
        context.type === "connectionremoved" ||
        context.type === "cleared"
      ) {
        this.scheduleGraphChange();
      }
      return context;
    });

    this.area.addPipe((context) => {
      if (context.type === "nodetranslated") {
        this.editor
          .getNode(context.data.id)
          ?.setPosition(context.data.position);
        this.scheduleGraphChange();
      }
      return context;
    });
  }

  static async create(
    container: HTMLElement,
    options: CreateSystemBlockEditorOptions = {},
  ): Promise<SystemBlockEditorController> {
    const controller = new SystemBlockEditorController(container, options);
    if (options.initialGraph) {
      await controller.loadInitialGraph(options.initialGraph);
    } else {
      controller.scheduleGraphChange();
    }
    return controller;
  }

  /** Add a palette definition at an editor/canvas coordinate. */
  async addBlock(
    definition: SubcircuitDefinition,
    position: SystemBlockPosition = { x: 0, y: 0 },
    instance: Partial<BlockInstance> = {},
  ): Promise<SystemBlockNode> {
    this.assertAlive();
    this.definitions.set(definition.id, definition);

    const block: BlockInstance = {
      ...instance,
      id: instance.id ?? getUID(),
      definitionId: definition.id,
      position: { ...position },
    };
    const node = new SystemBlockNode(block, definition);
    const added = await this.editor.addNode(node);
    if (!added) throw new Error(`Could not add system block "${block.id}".`);

    await this.area.translate(node.id, position);
    node.setPosition(position);
    this.scheduleGraphChange();
    return node;
  }

  /** Convert a browser client point, e.g. a DropEvent, to canvas coordinates. */
  clientToCanvas(point: SystemBlockPosition): SystemBlockPosition {
    const rect = this.container.getBoundingClientRect();
    const { x, y, k } = this.area.area.transform;
    return {
      x: (point.x - rect.left - x) / k,
      y: (point.y - rect.top - y) / k,
    };
  }

  /** Drag/drop convenience API accepting event.clientX/event.clientY. */
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

    const connection = new SystemBlockConnection(
      attempt.source,
      attempt.target,
      attempt.logical,
      attempt.resolved,
    );
    const created = await this.editor.addConnection(connection);
    if (!created) throw new Error(`Could not add connection "${logical.id}".`);
    this.scheduleGraphChange();
    return connection;
  }

  connectBlocks(
    fromBlockId: string,
    toBlockId: string,
    kind: ConnectionKindInput,
    options: ConnectBlocksOptions = {},
  ): Promise<SystemBlockConnection> {
    return this.connect({
      id: options.id ?? getUID(),
      fromBlockId,
      toBlockId,
      kind,
      protocol: options.protocol,
    });
  }

  async removeBlock(id: string): Promise<boolean> {
    this.assertAlive();
    const attached = this.editor
      .getConnections()
      .filter(
        (connection) => connection.source === id || connection.target === id,
      );
    for (const connection of attached) {
      await this.editor.removeConnection(connection.id);
    }
    return this.editor.removeNode(id);
  }

  removeConnection(id: string): Promise<boolean> {
    this.assertAlive();
    return this.editor.removeConnection(id);
  }

  async clear(): Promise<boolean> {
    this.assertAlive();
    return this.editor.clear();
  }

  /** Replace the graph and resolve all its logical edges in order. */
  async loadInitialGraph(graph: SystemBlockInitialGraph): Promise<void> {
    this.assertAlive();
    this.notificationsSuspended += 1;
    try {
      await this.editor.clear();
      for (const block of graph.blocks) {
        const definition = this.definitions.get(block.definitionId);
        if (!definition) {
          throw new ConnectionResolutionError(
            "UNKNOWN_SUBCIRCUIT",
            `No catalog definition exists for "${block.definitionId}".`,
            { blockId: block.id, definitionId: block.definitionId },
          );
        }
        await this.addBlock(
          definition,
          block.position ?? { x: 0, y: 0 },
          block,
        );
      }
      for (const logical of graph.connections) await this.connect(logical);
    } finally {
      this.notificationsSuspended -= 1;
      this.scheduleGraphChange();
    }
  }

  getSnapshot(): SystemBlockGraphSnapshot {
    const connections = this.editor.getConnections();
    return {
      blocks: this.editor.getNodes().map((node) => cloneBlock(node.block)),
      connections: connections.map((connection) => ({
        ...connection.logical,
      })),
      resolvedConnections: connections.map((connection) => ({
        ...connection.resolved,
        traces: connection.resolved.traces.map((trace) => ({ ...trace })),
      })),
    };
  }

  subscribe(listener: GraphChangeListener, emitCurrent = true): () => void {
    this.assertAlive();
    this.listeners.add(listener);
    if (emitCurrent) listener(this.getSnapshot());
    return () => this.listeners.delete(listener);
  }

  async zoomToFit(): Promise<void> {
    this.assertAlive();
    const nodes = this.editor.getNodes();
    if (nodes.length === 0) return;
    await AreaExtensions.zoomAt(this.area, nodes, { scale: 0.9 });
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.listeners.clear();
    this.area.destroy();
  }

  private resolveSocketPair(
    initial: SocketData,
    socket: SocketData,
    connectionId = getUID(),
  ): SocketResolution {
    const endpoints = getSourceTarget(initial, socket);
    if (!endpoints) {
      return this.failedResolution(
        new ConnectionResolutionError(
          "NO_COMPATIBLE_PORTS",
          "Connect an output socket to an input socket.",
        ),
      );
    }
    const [sourceSocket, targetSocket] = endpoints;
    const source = this.editor.getNode(sourceSocket.nodeId);
    const target = this.editor.getNode(targetSocket.nodeId);
    if (!source)
      return this.failedResolution(makeMissingBlockError(sourceSocket.nodeId));
    if (!target)
      return this.failedResolution(makeMissingBlockError(targetSocket.nodeId));

    const sourceKind = this.getSemanticSocket(source, sourceSocket);
    const targetKind = this.getSemanticSocket(target, targetSocket);
    if (!sourceKind || sourceKind !== targetKind) {
      return this.failedResolution(
        new ConnectionResolutionError(
          "NO_COMPATIBLE_PORTS",
          "Power sockets can only connect to Power, and Data to Data.",
          { sourceKind, targetKind },
        ),
      );
    }

    return this.resolveLogicalConnection({
      id: connectionId,
      fromBlockId: source.id,
      toBlockId: target.id,
      kind: sourceKind,
    });
  }

  private getSemanticSocket(
    node: SystemBlockNode,
    data: SocketData,
  ): ConnectionKind | undefined {
    const port =
      data.side === "input" ? node.inputs[data.key] : node.outputs[data.key];
    return port?.socket instanceof SemanticSocket
      ? port.socket.kind
      : undefined;
  }

  private resolveLogicalConnection(
    logical: LogicalConnection,
  ): SocketResolution {
    const source = this.editor.getNode(logical.fromBlockId);
    const target = this.editor.getNode(logical.toBlockId);
    if (!source) {
      return this.failedResolution(
        makeMissingBlockError(logical.fromBlockId),
        logical,
      );
    }
    if (!target) {
      return this.failedResolution(
        makeMissingBlockError(logical.toBlockId),
        logical,
      );
    }

    const kind = normalizeConnectionKind(logical.kind);
    const outputKey = getSystemBlockSocketKey("output", kind);
    const inputKey = getSystemBlockSocketKey("input", kind);
    if (!source.hasOutput(outputKey) || !target.hasInput(inputKey)) {
      return this.failedResolution(
        new ConnectionResolutionError(
          "NO_COMPATIBLE_PORTS",
          `${source.label} cannot provide ${kind} to ${target.label}.`,
          { fromBlockId: source.id, toBlockId: target.id, kind },
        ),
        logical,
      );
    }

    const existingResolved = this.editor
      .getConnections()
      .map((connection) => connection.resolved);
    const editorBlocks = this.editor.getNodes().map((node) => node.block);
    const editorCatalog = [...this.definitions.values()];
    const result = tryResolveConnection({
      connectionId: logical.id,
      kind,
      protocol: logical.protocol,
      from: { block: source.block, definition: source.definition },
      to: { block: target.block, definition: target.definition },
      unavailablePorts: getUnavailableConnectionPorts(
        existingResolved,
        editorBlocks,
        editorCatalog,
      ),
    });
    if (!result.ok) return this.failedResolution(result.error, logical);

    try {
      assertResolvedConnectionPortsAvailable(
        result.value,
        existingResolved,
        editorBlocks,
        editorCatalog,
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
  ): SocketResolution {
    return { ok: false, rejection: { error, connection } };
  }

  private reject(rejection: RejectedConnection): void {
    this.onConnectionRejected?.(rejection);
  }

  private scheduleGraphChange(): void {
    if (
      this.destroyed ||
      this.notificationsSuspended > 0 ||
      this.snapshotQueued
    ) {
      return;
    }
    this.snapshotQueued = true;
    queueMicrotask(() => {
      this.snapshotQueued = false;
      if (this.destroyed || this.notificationsSuspended > 0) return;
      const snapshot = this.getSnapshot();
      for (const listener of this.listeners) listener(snapshot);
    });
  }

  private assertAlive(): void {
    if (this.destroyed)
      throw new Error("The system block editor was destroyed.");
  }
}

export function createSystemBlockEditor(
  container: HTMLElement,
  options: CreateSystemBlockEditorOptions = {},
): Promise<SystemBlockEditorController> {
  return SystemBlockEditorController.create(container, options);
}
