import { SUBCIRCUIT_CATALOG } from "./catalog";
import type {
  BlockInstance,
  ConnectionKind,
  ConnectionKindInput,
  ConnectionPortReference,
  ConnectionProtocol,
  LogicalConnection,
  PortDefinition,
  PortRole,
  PortSignal,
  ResolveConnectionRequest,
  ResolvedConnection,
  ResolvedTrace,
  SubcircuitDefinition,
  TryResolutionResult,
  VoltageRange,
  VoltageRequirement,
} from "./types";
import { ConnectionResolutionError } from "./types";

const compareStrings = (left: string, right: string): number =>
  left < right ? -1 : left > right ? 1 : 0;

const COMPLEMENTARY_ROLES: ReadonlySet<string> = new Set([
  "provider:consumer",
  "consumer:provider",
  "source:sink",
  "sink:source",
  "host:device",
  "device:host",
  "controller:peripheral",
  "peripheral:controller",
  "peer:peer",
]);

const normalizeKind = (kind: ConnectionKindInput): ConnectionKind => {
  const normalized = kind.toLowerCase();
  if (normalized === "power" || normalized === "data") return normalized;
  throw new ConnectionResolutionError(
    "INVALID_CONNECTION_KIND",
    `Unsupported connection kind: ${kind}`,
  );
};

const rolesAreComplementary = (a: PortRole, b: PortRole): boolean =>
  COMPLEMENTARY_ROLES.has(`${a}:${b}`);

const toVoltageRange = (voltage: VoltageRequirement): VoltageRange =>
  typeof voltage === "number"
    ? { min: voltage, max: voltage, nominal: voltage }
    : voltage;

const voltageCompatibilityScore = (
  kind: ConnectionKind,
  a: PortDefinition,
  b: PortDefinition,
): number | undefined => {
  if (kind !== "power") return 0;
  if (a.voltage === undefined || b.voltage === undefined) return undefined;

  const provider = a.role === "provider" ? a : b;
  const consumer = a.role === "consumer" ? a : b;
  if (provider.role !== "provider" || consumer.role !== "consumer") {
    return undefined;
  }

  const output = toVoltageRange(provider.voltage!);
  const input = toVoltageRange(consumer.voltage!);
  // The entire possible source range must be safe for the consumer. Merely
  // overlapping would, for example, connect a 3.0-4.4 V battery rail to a
  // 3.6 V-maximum sensor.
  if (output.min < input.min || output.max > input.max) return undefined;

  let score = 20;
  if (
    output.nominal !== undefined &&
    output.nominal >= input.min &&
    output.nominal <= input.max
  ) {
    score += 8;
  }
  if (
    input.nominal !== undefined &&
    input.nominal >= output.min &&
    input.nominal <= output.max
  ) {
    score += 8;
  }
  if (
    output.nominal !== undefined &&
    input.nominal !== undefined &&
    Math.abs(output.nominal - input.nominal) < 0.001
  ) {
    score += 12;
  }
  return score;
};

const counterpartName = (
  protocol: ConnectionProtocol | undefined,
  signalName: string,
): string => {
  if (protocol === "uart" || protocol === "hci-uart") {
    const uartPairs: Readonly<Record<string, string>> = {
      tx: "rx",
      rx: "tx",
      rts: "cts",
      cts: "rts",
    };
    return uartPairs[signalName] ?? signalName;
  }

  // Power, I2C and I2S use exact logical signal names. This makes a missing or
  // mislabeled clock/data rail fail instead of silently choosing a pin.
  return signalName;
};

const directionsAreCompatible = (
  a: PortSignal["direction"],
  b: PortSignal["direction"],
): boolean => {
  if (a === "passive" || b === "passive") return a === b;
  if (a === "bidirectional" || b === "bidirectional") return true;
  return (a === "output" && b === "input") || (a === "input" && b === "output");
};

interface MatchedSignal {
  a: PortSignal;
  b: PortSignal;
}

const matchSignals = (
  a: PortDefinition,
  b: PortDefinition,
  protocol: ConnectionProtocol | undefined,
): readonly MatchedSignal[] | undefined => {
  const matches: MatchedSignal[] = [];
  const usedB = new Set<PortSignal>();

  for (const aSignal of a.signals) {
    const expected = counterpartName(protocol, aSignal.name);
    const bSignal = b.signals.find(
      (candidate) =>
        !usedB.has(candidate) &&
        candidate.name === expected &&
        directionsAreCompatible(aSignal.direction, candidate.direction),
    );
    if (!bSignal) continue;
    usedB.add(bSignal);
    matches.push({ a: aSignal, b: bSignal });
  }

  const requiredA = new Set([
    ...(a.requiredSignals ?? []),
    ...a.signals.filter((item) => item.required).map((item) => item.name),
  ]);
  const requiredB = new Set([
    ...(b.requiredSignals ?? []),
    ...b.signals.filter((item) => item.required).map((item) => item.name),
  ]);
  const matchedA = new Set(matches.map((match) => match.a.name));
  const matchedB = new Set(matches.map((match) => match.b.name));

  if ([...requiredA].some((name) => !matchedA.has(name))) return undefined;
  if ([...requiredB].some((name) => !matchedB.has(name))) return undefined;
  return matches.length > 0 ? matches : undefined;
};

const isOutputDirection = (signal: PortSignal): boolean =>
  signal.direction === "output";

const providerLike = (role: PortRole): boolean =>
  role === "provider" ||
  role === "source" ||
  role === "host" ||
  role === "controller";

const expandSignalTraces = ({
  match,
  aBlockId,
  bBlockId,
  aRole,
  bRole,
}: {
  match: MatchedSignal;
  aBlockId: string;
  bBlockId: string;
  aRole: PortRole;
  bRole: PortRole;
}): readonly ResolvedTrace[] => {
  let fromSignal = match.a;
  let toSignal = match.b;
  let fromBlockId = aBlockId;
  let toBlockId = bBlockId;

  const bIsOutput = isOutputDirection(match.b);
  if (
    (bIsOutput && !isOutputDirection(match.a)) ||
    (match.a.direction === match.b.direction &&
      providerLike(bRole) &&
      !providerLike(aRole))
  ) {
    fromSignal = match.b;
    toSignal = match.a;
    fromBlockId = bBlockId;
    toBlockId = aBlockId;
  }

  const fromSelectors = [...fromSignal.selectors];
  const toSelectors = [...toSignal.selectors];
  if (fromSelectors.length === 0 || toSelectors.length === 0) return [];

  const signalName =
    fromSignal.name === toSignal.name
      ? fromSignal.name
      : `${fromSignal.name}-${toSignal.name}`;
  const traces: ResolvedTrace[] = [];

  // A star connects every selector into one electrical net without emitting a
  // needless cartesian product. This covers supply fanout such as one 1.8 V
  // output feeding AVDD, DVDD, IOVDD and an I2C pull-up rail.
  for (const toSelector of toSelectors) {
    traces.push({
      signal: signalName,
      fromBlockId,
      toBlockId,
      fromSelector: fromSelectors[0],
      toSelector,
    });
  }
  for (const fromSelector of fromSelectors.slice(1)) {
    traces.push({
      signal: signalName,
      fromBlockId,
      toBlockId,
      fromSelector,
      toSelector: toSelectors[0],
    });
  }
  return traces;
};

interface Candidate {
  fromPort: PortDefinition;
  toPort: PortDefinition;
  protocol?: ConnectionProtocol;
  score: number;
  traces: readonly ResolvedTrace[];
}

const candidateForPorts = (
  request: ResolveConnectionRequest,
  kind: ConnectionKind,
  fromPort: PortDefinition,
  toPort: PortDefinition,
): Candidate | undefined => {
  if (fromPort.kind !== kind || toPort.kind !== kind) return undefined;
  if (!rolesAreComplementary(fromPort.role, toPort.role)) return undefined;
  if (
    request.unavailablePorts?.some(
      (port) =>
        (port.blockId === request.from.block.id &&
          port.portId === fromPort.id) ||
        (port.blockId === request.to.block.id && port.portId === toPort.id),
    )
  ) {
    return undefined;
  }

  const protocol = fromPort.protocol ?? toPort.protocol;
  if (
    fromPort.protocol !== undefined &&
    toPort.protocol !== undefined &&
    fromPort.protocol !== toPort.protocol
  ) {
    return undefined;
  }
  if (request.protocol !== undefined && protocol !== request.protocol) {
    return undefined;
  }

  const voltageScore = voltageCompatibilityScore(kind, fromPort, toPort);
  if (voltageScore === undefined) return undefined;

  const matches = matchSignals(fromPort, toPort, protocol);
  if (!matches) return undefined;
  const traces = matches.flatMap((match) =>
    expandSignalTraces({
      match,
      aBlockId: request.from.block.id,
      bBlockId: request.to.block.id,
      aRole: fromPort.role,
      bRole: toPort.role,
    }),
  );
  if (traces.length === 0) return undefined;

  return {
    fromPort,
    toPort,
    protocol,
    score:
      100 +
      (protocol ? 40 : 0) +
      voltageScore +
      matches.length * 10 +
      traces.length,
    traces,
  };
};

export const resolveConnection = (
  request: ResolveConnectionRequest,
): ResolvedConnection => {
  const kind = normalizeKind(request.kind);
  if (request.from.block.id === request.to.block.id) {
    throw new ConnectionResolutionError(
      "SAME_BLOCK",
      "A system block cannot be connected to itself.",
      { blockId: request.from.block.id },
    );
  }

  const candidates = request.from.definition.ports.flatMap((fromPort) =>
    request.to.definition.ports.flatMap((toPort) => {
      const candidate = candidateForPorts(request, kind, fromPort, toPort);
      return candidate ? [candidate] : [];
    }),
  );
  candidates.sort(
    (a, b) =>
      b.score - a.score ||
      compareStrings(a.fromPort.id, b.fromPort.id) ||
      compareStrings(a.toPort.id, b.toPort.id),
  );

  if (candidates.length === 0) {
    if (request.unavailablePorts?.length) {
      try {
        const occupiedMatch = resolveConnection({
          ...request,
          unavailablePorts: undefined,
        });
        const occupiedEndpoints = [
          {
            blockId: occupiedMatch.fromBlockId,
            portId: occupiedMatch.fromPortId,
          },
          { blockId: occupiedMatch.toBlockId, portId: occupiedMatch.toPortId },
        ].filter((endpoint) =>
          request.unavailablePorts?.some(
            (port) =>
              port.blockId === endpoint.blockId &&
              port.portId === endpoint.portId,
          ),
        );
        if (occupiedEndpoints.length > 0) {
          throw new ConnectionResolutionError(
            "PORT_IN_USE",
            `Every compatible ${kind} interface between ${request.from.definition.title} and ${request.to.definition.title} is already connected.`,
            { occupiedPorts: occupiedEndpoints },
          );
        }
      } catch (error) {
        if (
          error instanceof ConnectionResolutionError &&
          error.code === "PORT_IN_USE"
        ) {
          throw error;
        }
      }
    }

    throw new ConnectionResolutionError(
      "NO_COMPATIBLE_PORTS",
      `No compatible ${kind} connection exists between ${request.from.definition.title} and ${request.to.definition.title}.`,
      {
        kind,
        protocol: request.protocol,
        fromDefinitionId: request.from.definition.id,
        toDefinitionId: request.to.definition.id,
      },
    );
  }

  const best = candidates[0];
  const tied = candidates.filter((candidate) => candidate.score === best.score);
  if (tied.length > 1) {
    throw new ConnectionResolutionError(
      "AMBIGUOUS_CONNECTION",
      `More than one equally good ${kind} connection exists between ${request.from.definition.title} and ${request.to.definition.title}.`,
      {
        candidates: tied.map((candidate) => ({
          fromPortId: candidate.fromPort.id,
          toPortId: candidate.toPort.id,
          protocol: candidate.protocol,
          score: candidate.score,
        })),
      },
    );
  }

  return {
    id:
      request.connectionId ??
      `${request.from.block.id}:${kind}:${request.to.block.id}`,
    kind,
    protocol: best.protocol,
    fromBlockId: request.from.block.id,
    toBlockId: request.to.block.id,
    fromPortId: best.fromPort.id,
    toPortId: best.toPort.id,
    score: best.score,
    traces: best.traces,
  };
};

export const tryResolveConnection = (
  request: ResolveConnectionRequest,
): TryResolutionResult => {
  try {
    return { ok: true, value: resolveConnection(request) };
  } catch (error) {
    if (error instanceof ConnectionResolutionError) {
      return { ok: false, error };
    }
    throw error;
  }
};

const resolvedPortEndpoints = (
  connection: ResolvedConnection,
): readonly ConnectionPortReference[] => [
  { blockId: connection.fromBlockId, portId: connection.fromPortId },
  { blockId: connection.toBlockId, portId: connection.toPortId },
];

/** Return occupied single-use ports so the resolver can try another rail. */
export const getUnavailableConnectionPorts = (
  existing: readonly ResolvedConnection[],
  blocks: readonly BlockInstance[],
  catalog: readonly SubcircuitDefinition[] = SUBCIRCUIT_CATALOG,
): readonly ConnectionPortReference[] => {
  const blockById = new Map(blocks.map((block) => [block.id, block]));
  const definitionById = new Map(catalog.map((item) => [item.id, item]));
  const unavailable: ConnectionPortReference[] = [];

  for (const connection of existing) {
    for (const endpoint of resolvedPortEndpoints(connection)) {
      const block = blockById.get(endpoint.blockId);
      const definition = block
        ? definitionById.get(block.definitionId)
        : undefined;
      const port = definition?.ports.find(
        (item) => item.id === endpoint.portId,
      );
      if (port && port.allowMultiple !== true) unavailable.push(endpoint);
    }
  }

  return unavailable;
};

/**
 * Prevent two generated edges from tying together a single-use interface.
 * Fanout is permitted only when the curated port itself opts into it.
 */
export const assertResolvedConnectionPortsAvailable = (
  candidate: ResolvedConnection,
  existing: readonly ResolvedConnection[],
  blocks: readonly BlockInstance[],
  catalog: readonly SubcircuitDefinition[] = SUBCIRCUIT_CATALOG,
): void => {
  const blockById = new Map(blocks.map((block) => [block.id, block]));
  const definitionById = new Map(catalog.map((item) => [item.id, item]));

  for (const endpoint of resolvedPortEndpoints(candidate)) {
    const block = blockById.get(endpoint.blockId);
    const definition = block
      ? definitionById.get(block.definitionId)
      : undefined;
    const port = definition?.ports.find((item) => item.id === endpoint.portId);
    if (!block || !definition || !port) {
      throw new ConnectionResolutionError(
        block ? "UNKNOWN_SUBCIRCUIT" : "UNKNOWN_BLOCK",
        `Cannot validate resolved port ${endpoint.blockId}.${endpoint.portId}.`,
        { ...endpoint },
      );
    }
    if (port.allowMultiple === true) continue;

    const conflict = existing.find((connection) =>
      resolvedPortEndpoints(connection).some(
        (used) =>
          used.blockId === endpoint.blockId && used.portId === endpoint.portId,
      ),
    );
    if (!conflict) continue;

    throw new ConnectionResolutionError(
      "PORT_IN_USE",
      `${definition.title} interface "${port.label}" is already connected by ${conflict.id}.`,
      {
        blockId: endpoint.blockId,
        portId: endpoint.portId,
        connectionId: candidate.id,
        conflictingConnectionId: conflict.id,
      },
    );
  }
};

export const resolveDesignConnections = (
  blocks: readonly BlockInstance[],
  connections: readonly LogicalConnection[],
  catalog: readonly SubcircuitDefinition[] = SUBCIRCUIT_CATALOG,
): readonly ResolvedConnection[] => {
  const blockById = new Map(blocks.map((block) => [block.id, block]));
  const definitionById = new Map(catalog.map((item) => [item.id, item]));

  const resolved: ResolvedConnection[] = [];
  for (const connection of [...connections].sort((a, b) =>
    compareStrings(a.id, b.id),
  )) {
    const fromBlock = blockById.get(connection.fromBlockId);
    const toBlock = blockById.get(connection.toBlockId);
    if (!fromBlock || !toBlock) {
      throw new ConnectionResolutionError(
        "UNKNOWN_BLOCK",
        `Connection ${connection.id} references an unknown block.`,
        {
          fromBlockId: connection.fromBlockId,
          toBlockId: connection.toBlockId,
        },
      );
    }

    const fromDefinition = definitionById.get(fromBlock.definitionId);
    const toDefinition = definitionById.get(toBlock.definitionId);
    if (!fromDefinition || !toDefinition) {
      throw new ConnectionResolutionError(
        "UNKNOWN_SUBCIRCUIT",
        `Connection ${connection.id} references an unknown subcircuit definition.`,
        {
          fromDefinitionId: fromBlock.definitionId,
          toDefinitionId: toBlock.definitionId,
        },
      );
    }

    const candidate = resolveConnection({
      connectionId: connection.id,
      kind: connection.kind,
      protocol: connection.protocol,
      from: { block: fromBlock, definition: fromDefinition },
      to: { block: toBlock, definition: toDefinition },
      unavailablePorts: getUnavailableConnectionPorts(
        resolved,
        blocks,
        catalog,
      ),
    });
    assertResolvedConnectionPortsAvailable(
      candidate,
      resolved,
      blocks,
      catalog,
    );
    resolved.push(candidate);
  }

  return resolved;
};
