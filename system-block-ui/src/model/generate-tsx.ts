import { SUBCIRCUIT_CATALOG } from "./catalog";
import { resolveDesignConnections } from "./resolve-connection";
import { renderSystemDiagramSvg } from "./system-diagram-svg";
import type {
  BlockInstance,
  GenerateTsxRequest,
  LogicalConnection,
  ResolvedConnection,
  ResolvedTrace,
  SubcircuitDefinition,
} from "./types";
import { ConnectionResolutionError } from "./types";

const sanitizeInstanceName = (value: string): string => {
  const sanitized = value
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, "_")
    .replace(/^[-\d]+/, "");
  return sanitized || "block";
};

const quote = (value: string): string => JSON.stringify(value);

const compareStrings = (left: string, right: string): number =>
  left < right ? -1 : left > right ? 1 : 0;

const sanitizeJsxCommentText = (value: string): string => {
  const sanitized = value
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^A-Za-z0-9._+ -]+/g, "_")
    .slice(0, 80)
    .trim();
  return sanitized || "automatic";
};

const prefixSelector = (blockName: string, selector: string): string => {
  const relative = selector.trim().replace(/^>\s*/, "");
  // Nested subcircuits use a descendant selector between component levels,
  // for example `.U4Sensor .U4 > .SCL`. Adding a child combinator before
  // that path makes tscircuit search for a non-existent combined component.
  const separator = /^\.[^>\s]+\s+\./.test(relative) ? " " : " > ";
  return `.${blockName}${separator}${relative}`;
};

const renderImport = (
  packageName: string,
  componentNames: readonly string[],
): readonly string[] => {
  if (componentNames.length === 1) {
    return [`import { ${componentNames[0]} } from ${quote(packageName)}`];
  }
  return [
    "import {",
    ...componentNames.map((name) => `  ${name},`),
    `} from ${quote(packageName)}`,
  ];
};

const renderTrace = (
  trace: ResolvedTrace,
  instanceNameByBlockId: ReadonlyMap<string, string>,
): readonly string[] => {
  const fromName = instanceNameByBlockId.get(trace.fromBlockId);
  const toName = instanceNameByBlockId.get(trace.toBlockId);
  if (!fromName || !toName) {
    throw new ConnectionResolutionError(
      "UNKNOWN_BLOCK",
      "A resolved trace references a missing block instance.",
      { fromBlockId: trace.fromBlockId, toBlockId: trace.toBlockId },
    );
  }

  return [
    "    <trace",
    `      from=${quote(prefixSelector(fromName, trace.fromSelector))}`,
    `      to=${quote(prefixSelector(toName, trace.toSelector))}`,
    "    />",
  ];
};

interface PreparedBlock {
  block: BlockInstance;
  definition: SubcircuitDefinition;
  instanceName: string;
  sheetName: string;
}

const prepareBlocks = (
  blocks: readonly BlockInstance[],
  catalog: readonly SubcircuitDefinition[],
): readonly PreparedBlock[] => {
  const definitionById = new Map(catalog.map((item) => [item.id, item]));
  const prepared = blocks.map((block) => {
    const definition = definitionById.get(block.definitionId);
    if (!definition) {
      throw new ConnectionResolutionError(
        "UNKNOWN_SUBCIRCUIT",
        `Block ${block.id} references unknown subcircuit ${block.definitionId}.`,
        { blockId: block.id, definitionId: block.definitionId },
      );
    }
    if (definition.canInstantiate === false) {
      throw new Error(
        `${definition.title} cannot be safely instantiated by generated TSX. ${definition.warning ?? ""}`.trim(),
      );
    }
    for (const [coordinate, value] of [
      ["schX", block.schX],
      ["schY", block.schY],
    ] as const) {
      if (value !== undefined && !Number.isFinite(value)) {
        throw new Error(
          `Block ${block.id} has an invalid ${coordinate} coordinate.`,
        );
      }
    }
    const instanceName = sanitizeInstanceName(block.name ?? block.id);
    return {
      block,
      definition,
      instanceName,
      sheetName: sanitizeInstanceName(block.schSheetName ?? instanceName),
    };
  });

  const names = new Set<string>();
  const sheetNames = new Set<string>();
  for (const item of prepared) {
    if (names.has(item.instanceName)) {
      throw new Error(`Duplicate generated block name: ${item.instanceName}`);
    }
    if (sheetNames.has(item.sheetName)) {
      throw new Error(
        `Duplicate generated schematic sheet name: ${item.sheetName}`,
      );
    }
    names.add(item.instanceName);
    sheetNames.add(item.sheetName);
  }

  return prepared.sort(
    (a, b) =>
      compareStrings(a.instanceName, b.instanceName) ||
      compareStrings(a.block.id, b.block.id),
  );
};

export const SYSTEM_DIAGRAM_DISPLAY_NAME = "System Diagram";
export const SYSTEM_DIAGRAM_SHEET_NAME_BASE = "system_diagram";
export const SYSTEM_DIAGRAM_MODULE_BASENAME = "GeneratedSystem.system-diagram";
export const SYSTEM_DIAGRAM_MODULE_FILENAME = `${SYSTEM_DIAGRAM_MODULE_BASENAME}.ts`;
export const SYSTEM_DIAGRAM_MODULE_IMPORT_PATH = `./${SYSTEM_DIAGRAM_MODULE_BASENAME}`;

export interface GeneratedSystemDesignArtifacts {
  /** Canonical source shown, exported, and evaluated by the preview. */
  tsx: string;
  /** Deterministic virtual/download path for the generated SVG module. */
  systemDiagramModuleFileName: string;
  /** Companion module imported by `tsx` and supplied during evaluation. */
  systemDiagramModuleSource: string;
  systemDiagramSvg: string;
  systemDiagramSheetName: string;
}

const getSystemDiagramSheetName = (
  prepared: readonly PreparedBlock[],
): string => {
  const detailSheetNames = new Set(prepared.map(({ sheetName }) => sheetName));
  let sheetName = SYSTEM_DIAGRAM_SHEET_NAME_BASE;
  let suffix = 2;
  while (detailSheetNames.has(sheetName)) {
    sheetName = `${SYSTEM_DIAGRAM_SHEET_NAME_BASE}_${suffix}`;
    suffix += 1;
  }
  return sheetName;
};

const orderLogicalConnections = (
  connections: readonly LogicalConnection[],
): readonly LogicalConnection[] =>
  [...connections].sort(
    (a, b) =>
      compareStrings(a.id, b.id) ||
      compareStrings(a.fromBlockId, b.fromBlockId) ||
      compareStrings(a.toBlockId, b.toBlockId) ||
      compareStrings(a.kind, b.kind) ||
      compareStrings(a.protocol ?? "", b.protocol ?? ""),
  );

const renderSystemDiagramModule = (systemDiagramSvg: string): string =>
  [
    "export const SYSTEM_DIAGRAM_SVG = [",
    ...systemDiagramSvg.split("\n").map((line) => `  ${quote(line)},`),
    '].join("\\n")',
    "",
  ].join("\n");

const renderSystemDiagramImport = (): string =>
  `import { SYSTEM_DIAGRAM_SVG } from ${quote(SYSTEM_DIAGRAM_MODULE_IMPORT_PATH)}`;

interface RenderGeneratedSourceRequest {
  request: GenerateTsxRequest;
  prepared: readonly PreparedBlock[];
  resolvedConnections: readonly ResolvedConnection[];
  systemDiagramSheetName: string;
}

const renderGeneratedSource = ({
  request,
  prepared,
  resolvedConnections,
  systemDiagramSheetName,
}: RenderGeneratedSourceRequest): string => {
  const instanceNameByBlockId = new Map(
    prepared.map((item) => [item.block.id, item.instanceName]),
  );
  const packageByComponent = new Map<string, Set<string>>();
  for (const item of prepared) {
    const packageName = request.packageName ?? item.definition.importPath;
    const names = packageByComponent.get(packageName) ?? new Set<string>();
    names.add(item.definition.componentName);
    packageByComponent.set(packageName, names);
  }

  const lines: string[] = [];
  for (const [packageName, components] of [...packageByComponent].sort(
    ([a], [b]) => compareStrings(a, b),
  )) {
    lines.push(
      ...renderImport(packageName, [...components].sort(compareStrings)),
    );
  }
  lines.push(
    renderSystemDiagramImport(),
    'import "tscircuit"',
    "",
    "export default () => (",
  );
  lines.push(
    request.boardName
      ? `  <board name=${quote(sanitizeInstanceName(request.boardName))} routingDisabled>`
      : "  <board routingDisabled>",
  );

  lines.push(
    "    <schematicsheet",
    `      name=${quote(systemDiagramSheetName)}`,
    `      displayName=${quote(SYSTEM_DIAGRAM_DISPLAY_NAME)}`,
    "      sheetIndex={0}",
    "    >",
    "      <schematicgraphic svgContent={SYSTEM_DIAGRAM_SVG} />",
    "    </schematicsheet>",
  );

  prepared.forEach((item, sheetIndex) => {
    lines.push(
      "    <schematicsheet",
      `      name=${quote(item.sheetName)}`,
      `      displayName=${quote(item.definition.title)}`,
      `      sheetIndex={${sheetIndex + 1}}`,
      "    />",
    );
  });

  lines.push("");
  for (const item of prepared) {
    lines.push(
      `    <${item.definition.componentName}`,
      `      name=${quote(item.instanceName)}`,
      `      schSheetName=${quote(item.sheetName)}`,
      ...(item.block.schX === undefined
        ? []
        : [`      schX={${item.block.schX}}`]),
      ...(item.block.schY === undefined
        ? []
        : [`      schY={${item.block.schY}}`]),
      "    />",
    );
  }

  if (resolvedConnections.length > 0) lines.push("");
  for (const connection of resolvedConnections) {
    const protocolComment = sanitizeJsxCommentText(
      connection.protocol ?? "automatic",
    );
    lines.push(
      `    {/* ${connection.kind === "power" ? "Power" : "Data"}: ${protocolComment} */}`,
    );
    for (const trace of connection.traces) {
      lines.push(...renderTrace(trace, instanceNameByBlockId));
    }
  }

  lines.push("  </board>", ")", "");
  return lines.join("\n");
};

/** Generate canonical TSX and its companion system-diagram module. */
export const generateSystemDesignArtifacts = (
  request: GenerateTsxRequest,
): GeneratedSystemDesignArtifacts => {
  const catalog = request.catalog ?? SUBCIRCUIT_CATALOG;
  const prepared = prepareBlocks(request.blocks, catalog);
  const orderedConnections = orderLogicalConnections(request.connections);
  const resolvedConnections = resolveDesignConnections(
    request.blocks,
    orderedConnections,
    catalog,
  );
  const systemDiagramSheetName = getSystemDiagramSheetName(prepared);
  const systemDiagramSvg = renderSystemDiagramSvg({
    blocks: request.blocks,
    resolvedConnections,
    catalog,
    title: SYSTEM_DIAGRAM_DISPLAY_NAME,
  });
  const sourceRequest = {
    request,
    prepared,
    resolvedConnections,
    systemDiagramSheetName,
  };

  return {
    tsx: renderGeneratedSource(sourceRequest),
    systemDiagramModuleFileName: SYSTEM_DIAGRAM_MODULE_FILENAME,
    systemDiagramModuleSource: renderSystemDiagramModule(systemDiagramSvg),
    systemDiagramSvg,
    systemDiagramSheetName,
  };
};

/** Generate canonical tscircuit TSX from system blocks. */
export const generateTsx = (request: GenerateTsxRequest): string =>
  generateSystemDesignArtifacts(request).tsx;

export const generateSystemTsx = generateTsx;
