import { SUBCIRCUIT_CATALOG } from "./catalog";
import { resolveDesignConnections } from "./resolve-connection";
import type {
  BlockInstance,
  GenerateTsxRequest,
  ResolvedConnection,
  SubcircuitDefinition,
} from "./types";

const NODE_WIDTH = 284;
const NODE_HEIGHT = 136;
const NODE_COLUMN_GAP = 126;
const NODE_ROW_GAP = 92;
const CONTENT_PADDING = 48;
const HEADER_HEIGHT = 76;
const MINIMUM_WIDTH = 900;
const MINIMUM_HEIGHT = 520;
const POWER_COLOR = "#d97706";
const DATA_COLOR = "#377bd4";

const compareStrings = (left: string, right: string): number =>
  left < right ? -1 : left > right ? 1 : 0;

const normalizeDisplayText = (value: string): string =>
  value
    .replace(
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\uD800-\uDFFF\uFFFE\uFFFF]/gu,
      "",
    )
    .replace(/\s+/gu, " ")
    .trim();

const escapeXml = (value: string): string =>
  normalizeDisplayText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const truncateText = (value: string, maximumLength: number): string => {
  const normalized = normalizeDisplayText(value);
  if (normalized.length <= maximumLength) return normalized;
  return `${normalized.slice(0, Math.max(1, maximumLength - 1)).trimEnd()}…`;
};

const wrapTitle = (value: string): readonly string[] => {
  const normalized = normalizeDisplayText(value) || "Untitled block";
  const maximumLineLength = 30;
  const words = normalized.split(" ");
  const lines: string[] = [];

  for (const word of words) {
    const current = lines.at(-1);
    if (!current) {
      lines.push(word);
      continue;
    }
    if (`${current} ${word}`.length <= maximumLineLength) {
      lines[lines.length - 1] = `${current} ${word}`;
      continue;
    }
    lines.push(word);
  }

  if (lines.length <= 2) {
    return lines.map((line) => truncateText(line, maximumLineLength));
  }
  return [
    truncateText(lines[0] ?? "Untitled block", maximumLineLength),
    truncateText(lines.slice(1).join(" "), maximumLineLength),
  ];
};

const componentAbbreviation = (componentName: string): string => {
  const partNumber = componentName.match(
    /(?:_|^)([A-Z]{2,}[A-Z0-9-]*\d[A-Z0-9-]*)$/,
  )?.[1];
  const lastWord = (partNumber ?? componentName.replace(/_/g, " "))
    .split(/\s+/)
    .filter(Boolean)
    .at(-1);
  return normalizeDisplayText(lastWord?.toUpperCase() ?? "TI").slice(0, 4);
};

const formatProtocolLabel = (protocol: string): string => {
  const known: Readonly<Record<string, string>> = {
    "can-bus": "CAN Bus",
    "can-controller": "CAN",
    "hci-uart": "HCI UART",
    "motor-control": "Motor Control",
    gpio: "GPIO",
    i2c: "I²C",
    i2s: "I²S",
    uart: "UART",
  };
  return (
    known[protocol] ??
    protocol
      .split(/[-_]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
};

const isFinitePosition = (
  position: BlockInstance["position"],
): position is NonNullable<BlockInstance["position"]> =>
  position !== undefined &&
  Number.isFinite(position.x) &&
  Number.isFinite(position.y);

interface DiagramBlock {
  block: BlockInstance;
  definition: SubcircuitDefinition;
  instanceName: string;
  x: number;
  y: number;
}

interface DiagramConnection {
  id: string;
  fromBlockId: string;
  toBlockId: string;
  kind: "power" | "data";
  label: string;
}

interface PowerLink {
  id: string;
  fromBlockId: string;
  toBlockId: string;
  traceCount: number;
}

const getPowerComponents = (links: readonly PowerLink[]): PowerLink[][] => {
  const incident = new Map<string, PowerLink[]>();
  for (const link of links) {
    for (const blockId of [link.fromBlockId, link.toBlockId]) {
      const blockLinks = incident.get(blockId) ?? [];
      blockLinks.push(link);
      incident.set(blockId, blockLinks);
    }
  }

  const pending = new Set(links);
  const components: PowerLink[][] = [];
  for (const seed of [...links].sort((a, b) => compareStrings(a.id, b.id))) {
    if (!pending.has(seed)) continue;
    const component: PowerLink[] = [];
    const queue = [seed.fromBlockId, seed.toBlockId];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const blockId = queue.shift();
      if (!blockId || visited.has(blockId)) continue;
      visited.add(blockId);
      for (const link of incident.get(blockId) ?? []) {
        if (!pending.delete(link)) continue;
        component.push(link);
        queue.push(link.fromBlockId, link.toBlockId);
      }
    }

    components.push(component.sort((a, b) => compareStrings(a.id, b.id)));
  }
  return components;
};

const countDownstreamBlocks = (
  startBlockId: string,
  outgoing: ReadonlyMap<string, readonly PowerLink[]>,
): number => {
  const visited = new Set<string>();
  const queue = [startBlockId];
  while (queue.length > 0) {
    const blockId = queue.shift();
    if (!blockId || visited.has(blockId)) continue;
    visited.add(blockId);
    for (const link of outgoing.get(blockId) ?? []) {
      queue.push(link.toBlockId);
    }
  }
  return visited.size;
};

const summarizePowerConnections = (
  resolvedConnections: readonly ResolvedConnection[],
): DiagramConnection[] => {
  const powerLinks: PowerLink[] = resolvedConnections
    .filter((connection) => connection.kind === "power")
    .map((connection) => ({
      id: connection.id,
      fromBlockId: connection.fromBlockId,
      toBlockId: connection.toBlockId,
      traceCount: connection.traces.length,
    }));
  const occupiedIds = new Set(resolvedConnections.map(({ id }) => id));

  return getPowerComponents(powerLinks).map((component) => {
    const incomingBlockIds = new Set(component.map((link) => link.toBlockId));
    const outgoing = new Map<string, PowerLink[]>();
    for (const link of component) {
      const links = outgoing.get(link.fromBlockId) ?? [];
      links.push(link);
      outgoing.set(link.fromBlockId, links);
    }

    const sourceBlockIds = [...outgoing.keys()].sort(compareStrings);
    const rootBlockId =
      sourceBlockIds.find((blockId) => !incomingBlockIds.has(blockId)) ??
      sourceBlockIds[0];
    if (!rootBlockId)
      throw new Error("Cannot summarize an empty power network.");

    const representative = [...(outgoing.get(rootBlockId) ?? [])].sort(
      (a, b) =>
        countDownstreamBlocks(b.toBlockId, outgoing) -
          countDownstreamBlocks(a.toBlockId, outgoing) ||
        compareStrings(a.toBlockId, b.toBlockId) ||
        compareStrings(a.id, b.id),
    )[0];
    if (!representative) {
      throw new Error(`Power root "${rootBlockId}" has no outgoing link.`);
    }

    const loadCount = new Set(component.map((link) => link.toBlockId)).size;
    const idBase = `__power-summary__:${encodeURIComponent(rootBlockId)}`;
    let id = idBase;
    let suffix = 2;
    while (occupiedIds.has(id)) {
      id = `${idBase}:${suffix}`;
      suffix += 1;
    }
    occupiedIds.add(id);

    return {
      id,
      fromBlockId: rootBlockId,
      toBlockId: representative.toBlockId,
      kind: "power",
      label: `Power · ${loadCount} ${loadCount === 1 ? "load" : "loads"}`,
    };
  });
};

const getVisibleConnections = (
  resolvedConnections: readonly ResolvedConnection[],
): readonly DiagramConnection[] => {
  const dataConnections: DiagramConnection[] = resolvedConnections
    .filter((connection) => connection.kind === "data")
    .map((connection) => ({
      id: connection.id,
      fromBlockId: connection.fromBlockId,
      toBlockId: connection.toBlockId,
      kind: "data",
      label: connection.protocol
        ? `Data · ${formatProtocolLabel(connection.protocol)}`
        : "Data",
    }));

  return [
    ...summarizePowerConnections(resolvedConnections),
    ...dataConnections,
  ].sort(
    (a, b) =>
      compareStrings(a.kind, b.kind) ||
      compareStrings(a.fromBlockId, b.fromBlockId) ||
      compareStrings(a.toBlockId, b.toBlockId) ||
      compareStrings(a.id, b.id),
  );
};

const prepareDiagramBlocks = (
  blocks: readonly BlockInstance[],
  catalog: readonly SubcircuitDefinition[],
): readonly DiagramBlock[] => {
  const definitionById = new Map(catalog.map((item) => [item.id, item]));
  const sorted = [...blocks].sort(
    (a, b) =>
      compareStrings(a.name ?? a.id, b.name ?? b.id) ||
      compareStrings(a.id, b.id),
  );
  const preservePositions = sorted.every((block) =>
    isFinitePosition(block.position),
  );
  const columnCount = Math.max(
    1,
    Math.ceil(Math.sqrt(Math.max(1, sorted.length) * 1.6)),
  );

  const unnormalized = sorted.map((block, index) => {
    const definition = definitionById.get(block.definitionId);
    if (!definition) {
      throw new Error(
        `Block ${block.id} references unknown subcircuit ${block.definitionId}.`,
      );
    }
    const fallbackPosition = {
      x: (index % columnCount) * (NODE_WIDTH + NODE_COLUMN_GAP),
      y: Math.floor(index / columnCount) * (NODE_HEIGHT + NODE_ROW_GAP),
    };
    const position =
      preservePositions && isFinitePosition(block.position)
        ? block.position
        : fallbackPosition;
    return {
      block,
      definition,
      instanceName: block.name ?? block.id,
      x: position.x,
      y: position.y,
    };
  });

  const minimumX =
    unnormalized.length > 0 ? Math.min(...unnormalized.map(({ x }) => x)) : 0;
  const minimumY =
    unnormalized.length > 0 ? Math.min(...unnormalized.map(({ y }) => y)) : 0;
  return unnormalized.map((item) => ({
    ...item,
    x: item.x - minimumX + CONTENT_PADDING,
    y: item.y - minimumY + HEADER_HEIGHT + CONTENT_PADDING,
  }));
};

interface EdgeGeometry {
  path: string;
  labelX: number;
  labelY: number;
}

const getEdgeGeometry = (
  source: DiagramBlock,
  target: DiagramBlock,
  parallelOffset: number,
): EdgeGeometry => {
  const forward = target.x + NODE_WIDTH / 2 >= source.x + NODE_WIDTH / 2;
  const direction = forward ? 1 : -1;
  const startX = source.x + (forward ? NODE_WIDTH : 0);
  const endX = target.x + (forward ? 0 : NODE_WIDTH);
  const startY = source.y + NODE_HEIGHT / 2;
  const endY = target.y + NODE_HEIGHT / 2;
  const controlDistance = Math.max(72, Math.abs(endX - startX) * 0.42);
  const controlOne = {
    x: startX + direction * controlDistance,
    y: startY + parallelOffset,
  };
  const controlTwo = {
    x: endX - direction * controlDistance,
    y: endY + parallelOffset,
  };
  const labelX = (startX + 3 * controlOne.x + 3 * controlTwo.x + endX) / 8;
  const labelY = (startY + 3 * controlOne.y + 3 * controlTwo.y + endY) / 8;

  return {
    path: `M ${startX} ${startY} C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, ${endX} ${endY}`,
    labelX,
    labelY,
  };
};

const renderBlock = (item: DiagramBlock): readonly string[] => {
  const titleLines = wrapTitle(item.definition.title);
  const titleStartY = item.y + 35;
  const hasPower = item.definition.ports.some((port) => port.kind === "power");
  const hasData = item.definition.ports.some((port) => port.kind === "data");
  const reviewed = item.definition.ports.length > 0;
  const chips: Array<{ label: string; color: string }> = [];
  if (hasPower) chips.push({ label: "Power", color: POWER_COLOR });
  if (hasData) chips.push({ label: "Data", color: DATA_COLOR });

  const lines = [
    `  <g data-block-id="${escapeXml(item.block.id)}">`,
    `    <title>${escapeXml(item.definition.title)}</title>`,
    `    <rect x="${item.x}" y="${item.y}" width="${NODE_WIDTH}" height="${NODE_HEIGHT}" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>`,
    `    <rect x="${item.x}" y="${item.y}" width="${NODE_WIDTH}" height="24" rx="12" fill="#f1f5f9"/>`,
    `    <path d="M ${item.x} ${item.y + 24} H ${item.x + NODE_WIDTH}" stroke="#e2e8f0"/>`,
    `    <rect x="${item.x + 14}" y="${item.y + 36}" width="44" height="44" rx="9" fill="#fff1f2" stroke="#fecdd3"/>`,
    `    <text x="${item.x + 36}" y="${item.y + 63}" text-anchor="middle" fill="#a61b24" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700">${escapeXml(componentAbbreviation(item.definition.componentName))}</text>`,
  ];

  titleLines.forEach((line, index) => {
    lines.push(
      `    <text x="${item.x + 70}" y="${titleStartY + index * 18}" fill="#1f2937" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700">${escapeXml(line)}</text>`,
    );
  });
  lines.push(
    `    <text x="${item.x + 70}" y="${item.y + 76}" fill="#64748b" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" letter-spacing="0.8">${escapeXml(truncateText(item.definition.category.toUpperCase(), 30))}</text>`,
    `    <text x="${item.x + 16}" y="${item.y + 104}" fill="#475569" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="11">${escapeXml(truncateText(item.instanceName, 34))}</text>`,
    `    <text x="${item.x + NODE_WIDTH - 14}" y="${item.y + 19}" text-anchor="end" fill="${reviewed ? "#287252" : "#9a6700"}" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="700">${reviewed ? "REVIEWED" : "PLACEMENT ONLY"}</text>`,
  );

  let chipX = item.x + 16;
  for (const chip of chips) {
    const width = chip.label.length * 7 + 23;
    lines.push(
      `    <rect x="${chipX}" y="${item.y + 114}" width="${width}" height="17" rx="8.5" fill="#ffffff" stroke="${chip.color}"/>`,
      `    <circle cx="${chipX + 9}" cy="${item.y + 122.5}" r="3" fill="${chip.color}"/>`,
      `    <text x="${chipX + 16}" y="${item.y + 126}" fill="${chip.color}" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="700">${chip.label}</text>`,
    );
    chipX += width + 8;
  }
  if (chips.length === 0) {
    lines.push(
      `    <text x="${item.x + 16}" y="${item.y + 126}" fill="#8a7658" font-family="Arial, Helvetica, sans-serif" font-size="9">No reviewed interfaces</text>`,
    );
  }
  lines.push("  </g>");
  return lines;
};

export interface RenderSystemDiagramSvgRequest {
  blocks: readonly BlockInstance[];
  resolvedConnections: readonly ResolvedConnection[];
  catalog?: readonly SubcircuitDefinition[];
  title?: string;
}

/** Render a standalone, deterministic SVG overview without requiring a DOM. */
export function renderSystemDiagramSvg({
  blocks,
  resolvedConnections,
  catalog = SUBCIRCUIT_CATALOG,
  title = "System Diagram",
}: RenderSystemDiagramSvgRequest): string {
  const diagramBlocks = prepareDiagramBlocks(blocks, catalog);
  const blockById = new Map(
    diagramBlocks.map((block) => [block.block.id, block]),
  );
  const connections = getVisibleConnections(resolvedConnections);
  const maximumX = Math.max(
    ...diagramBlocks.map(({ x }) => x + NODE_WIDTH),
    MINIMUM_WIDTH - CONTENT_PADDING,
  );
  const maximumY = Math.max(
    ...diagramBlocks.map(({ y }) => y + NODE_HEIGHT),
    MINIMUM_HEIGHT - CONTENT_PADDING,
  );
  const width = Math.ceil(Math.max(MINIMUM_WIDTH, maximumX + CONTENT_PADDING));
  const height = Math.ceil(
    Math.max(MINIMUM_HEIGHT, maximumY + CONTENT_PADDING),
  );
  const normalizedTitle = normalizeDisplayText(title) || "System Diagram";
  const lines = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="system-diagram-title system-diagram-description">`,
    `  <title id="system-diagram-title">${escapeXml(normalizedTitle)}</title>`,
    `  <desc id="system-diagram-description">${diagramBlocks.length} system block${diagramBlocks.length === 1 ? "" : "s"} with ${connections.length} visible semantic connection${connections.length === 1 ? "" : "s"}.</desc>`,
    "  <defs>",
    `    <marker id="system-arrow-power" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${POWER_COLOR}"/></marker>`,
    `    <marker id="system-arrow-data" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${DATA_COLOR}"/></marker>`,
    "  </defs>",
    `  <rect width="${width}" height="${height}" fill="#f8fafc"/>`,
    `  <text x="${CONTENT_PADDING}" y="42" fill="#1f2937" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">${escapeXml(normalizedTitle)}</text>`,
    `  <text x="${CONTENT_PADDING}" y="62" fill="#64748b" font-family="Arial, Helvetica, sans-serif" font-size="11">${diagramBlocks.length} block${diagramBlocks.length === 1 ? "" : "s"} · ${connections.length} visible link${connections.length === 1 ? "" : "s"}</text>`,
    `  <circle cx="${width - 210}" cy="42" r="5" fill="${POWER_COLOR}"/><text x="${width - 198}" y="46" fill="#475569" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700">Power</text>`,
    `  <circle cx="${width - 112}" cy="42" r="5" fill="${DATA_COLOR}"/><text x="${width - 100}" y="46" fill="#475569" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700">Data</text>`,
    `  <path d="M ${CONTENT_PADDING} ${HEADER_HEIGHT} H ${width - CONTENT_PADDING}" stroke="#dbe2ea"/>`,
  ];

  const pairCounts = new Map<string, number>();
  for (const connection of connections) {
    const pairKey = `${connection.fromBlockId}\u0000${connection.toBlockId}`;
    pairCounts.set(pairKey, (pairCounts.get(pairKey) ?? 0) + 1);
  }
  const pairIndexes = new Map<string, number>();
  const labels: string[][] = [];
  for (const connection of connections) {
    const source = blockById.get(connection.fromBlockId);
    const target = blockById.get(connection.toBlockId);
    if (!source || !target) {
      throw new Error(
        `System diagram connection ${connection.id} references a missing block.`,
      );
    }
    const pairKey = `${connection.fromBlockId}\u0000${connection.toBlockId}`;
    const pairIndex = pairIndexes.get(pairKey) ?? 0;
    pairIndexes.set(pairKey, pairIndex + 1);
    const pairCount = pairCounts.get(pairKey) ?? 1;
    const parallelOffset = (pairIndex - (pairCount - 1) / 2) * 34;
    const geometry = getEdgeGeometry(source, target, parallelOffset);
    const color = connection.kind === "power" ? POWER_COLOR : DATA_COLOR;
    lines.push(
      `  <path data-connection-id="${escapeXml(connection.id)}" data-kind="${connection.kind}" d="${geometry.path}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" marker-end="url(#system-arrow-${connection.kind})"/>`,
    );

    const labelWidth = Math.max(84, connection.label.length * 7 + 30);
    labels.push([
      `  <g data-connection-label-for="${escapeXml(connection.id)}">`,
      `    <rect x="${geometry.labelX - labelWidth / 2}" y="${geometry.labelY - 14}" width="${labelWidth}" height="28" rx="14" fill="#ffffff" stroke="${color}"/>`,
      `    <circle cx="${geometry.labelX - labelWidth / 2 + 12}" cy="${geometry.labelY}" r="4" fill="${color}"/>`,
      `    <text x="${geometry.labelX - labelWidth / 2 + 22}" y="${geometry.labelY + 4}" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700">${escapeXml(connection.label)}</text>`,
      "  </g>",
    ]);
  }

  if (diagramBlocks.length === 0) {
    lines.push(
      `  <rect x="${width / 2 - 190}" y="${height / 2 - 55}" width="380" height="110" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>`,
      `  <text x="${width / 2}" y="${height / 2 - 3}" text-anchor="middle" fill="#334155" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">No system blocks yet</text>`,
      `  <text x="${width / 2}" y="${height / 2 + 23}" text-anchor="middle" fill="#64748b" font-family="Arial, Helvetica, sans-serif" font-size="12">Add subcircuits to build the system overview.</text>`,
    );
  } else {
    for (const block of diagramBlocks) lines.push(...renderBlock(block));
    for (const label of labels) lines.push(...label);
  }
  lines.push("</svg>");
  return lines.join("\n");
}

export interface GenerateSystemDiagramSvgRequest
  extends Pick<GenerateTsxRequest, "blocks" | "connections" | "catalog"> {
  title?: string;
}

/** Resolve a logical graph and render its standalone system diagram SVG. */
export function generateSystemDiagramSvg(
  request: GenerateSystemDiagramSvgRequest,
): string {
  const catalog = request.catalog ?? SUBCIRCUIT_CATALOG;
  const connections = [...request.connections].sort((a, b) =>
    compareStrings(a.id, b.id),
  );
  return renderSystemDiagramSvg({
    blocks: request.blocks,
    resolvedConnections: resolveDesignConnections(
      request.blocks,
      connections,
      catalog,
    ),
    catalog,
    title: request.title,
  });
}
