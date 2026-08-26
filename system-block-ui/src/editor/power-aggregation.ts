import type { SystemBlockConnection } from "./types";

export const POWER_SUMMARY_EDGE_ID_PREFIX = "__power-summary__:";

const compareIds = (left: string, right: string): number =>
  left < right ? -1 : left > right ? 1 : 0;

function getPowerComponents(
  powerEdges: readonly SystemBlockConnection[],
): SystemBlockConnection[][] {
  const incidentEdges = new Map<string, SystemBlockConnection[]>();
  for (const edge of powerEdges) {
    for (const nodeId of [edge.source, edge.target]) {
      const edges = incidentEdges.get(nodeId) ?? [];
      edges.push(edge);
      incidentEdges.set(nodeId, edges);
    }
  }

  const pending = new Set(powerEdges);
  const components: SystemBlockConnection[][] = [];
  const sortedEdges = [...powerEdges].sort((left, right) =>
    compareIds(left.id, right.id),
  );

  for (const seed of sortedEdges) {
    if (!pending.has(seed)) continue;
    const component: SystemBlockConnection[] = [];
    const queuedNodes = [seed.source, seed.target];
    const visitedNodes = new Set<string>();

    while (queuedNodes.length > 0) {
      const nodeId = queuedNodes.shift();
      if (!nodeId || visitedNodes.has(nodeId)) continue;
      visitedNodes.add(nodeId);

      for (const edge of incidentEdges.get(nodeId) ?? []) {
        if (!pending.delete(edge)) continue;
        component.push(edge);
        queuedNodes.push(edge.source, edge.target);
      }
    }

    components.push(
      component.sort((left, right) => compareIds(left.id, right.id)),
    );
  }

  return components;
}

function countDownstreamNodes(
  startNodeId: string,
  outgoingEdges: ReadonlyMap<string, readonly SystemBlockConnection[]>,
): number {
  const visited = new Set<string>();
  const queue = [startNodeId];

  while (queue.length > 0) {
    const nodeId = queue.shift();
    if (!nodeId || visited.has(nodeId)) continue;
    visited.add(nodeId);
    for (const edge of outgoingEdges.get(nodeId) ?? []) {
      queue.push(edge.target);
    }
  }

  return visited.size;
}

function summarizePowerComponent(
  component: readonly SystemBlockConnection[],
  occupiedIds: ReadonlySet<string>,
): SystemBlockConnection {
  const nodeIds = new Set<string>();
  const incomingNodeIds = new Set<string>();
  const outgoingEdges = new Map<string, SystemBlockConnection[]>();

  for (const edge of component) {
    nodeIds.add(edge.source);
    nodeIds.add(edge.target);
    incomingNodeIds.add(edge.target);
    const outgoing = outgoingEdges.get(edge.source) ?? [];
    outgoing.push(edge);
    outgoingEdges.set(edge.source, outgoing);
  }

  const sourceNodeIds = [...outgoingEdges.keys()].sort(compareIds);
  const rootBlockId =
    sourceNodeIds.find((nodeId) => !incomingNodeIds.has(nodeId)) ??
    sourceNodeIds[0];
  if (!rootBlockId) {
    throw new Error("Cannot summarize an empty power component.");
  }

  const representative = [...(outgoingEdges.get(rootBlockId) ?? [])].sort(
    (left, right) => {
      const reachDifference =
        countDownstreamNodes(right.target, outgoingEdges) -
        countDownstreamNodes(left.target, outgoingEdges);
      return (
        reachDifference ||
        compareIds(left.target, right.target) ||
        compareIds(left.id, right.id)
      );
    },
  )[0];
  if (!representative) {
    throw new Error(`Power root "${rootBlockId}" has no outgoing link.`);
  }

  const loadCount = new Set(component.map((edge) => edge.target)).size;
  const linkCount = component.length;
  const traceCount = component.reduce(
    (total, edge) => total + edge.data.resolved.traces.length,
    0,
  );
  const label = `Power · ${loadCount} ${loadCount === 1 ? "load" : "loads"}`;
  const idBase = `${POWER_SUMMARY_EDGE_ID_PREFIX}${encodeURIComponent(rootBlockId)}`;
  let id = idBase;
  let suffix = 2;
  while (occupiedIds.has(id)) {
    id = `${idBase}:${suffix}`;
    suffix += 1;
  }

  return {
    ...representative,
    id,
    source: rootBlockId,
    target: representative.target,
    selected: false,
    deletable: false,
    focusable: false,
    selectable: false,
    ariaLabel: `${label} automatic network from ${rootBlockId} to ${representative.target}`,
    data: {
      ...representative.data,
      label,
      powerSummary: {
        connectionIds: component.map((edge) => edge.id),
        rootBlockId,
        targetBlockId: representative.target,
        blockCount: nodeIds.size,
        loadCount,
        linkCount,
        traceCount,
      },
    },
  };
}

/**
 * Derive React Flow's visible edges without changing the electrical graph.
 * Data links remain one-to-one. Each weakly connected power component becomes
 * one non-interactive summary edge rooted at its deterministic main source.
 */
export function getVisibleSystemBlockConnections(
  edges: readonly SystemBlockConnection[],
): SystemBlockConnection[] {
  const dataEdges = edges.filter((edge) => edge.data.kind !== "power");
  const powerEdges = edges.filter(
    (edge) => edge.data.kind === "power" && !edge.data.powerSummary,
  );
  const occupiedIds = new Set(edges.map((edge) => edge.id));
  const summaries = getPowerComponents(powerEdges)
    .map((component) => summarizePowerComponent(component, occupiedIds))
    .sort((left, right) => compareIds(left.source, right.source));

  return [...dataEdges, ...summaries];
}
