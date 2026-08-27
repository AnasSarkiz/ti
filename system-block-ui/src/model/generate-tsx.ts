import { SUBCIRCUIT_CATALOG } from "./catalog";
import { resolveDesignConnections } from "./resolve-connection";
import type {
  BlockInstance,
  GenerateTsxRequest,
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

const prefixSelector = (blockName: string, selector: string): string => {
  const relative = selector.trim().replace(/^>\s*/, "");
  return `.${blockName} > ${relative}`;
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
    const instanceName = sanitizeInstanceName(block.name ?? block.id);
    return {
      block,
      definition,
      instanceName,
      sheetName: sanitizeInstanceName(block.schSheetName ?? instanceName),
    };
  });

  const names = new Set<string>();
  for (const item of prepared) {
    if (names.has(item.instanceName)) {
      throw new Error(`Duplicate generated block name: ${item.instanceName}`);
    }
    names.add(item.instanceName);
  }

  return prepared.sort(
    (a, b) =>
      a.instanceName.localeCompare(b.instanceName) ||
      a.block.id.localeCompare(b.block.id),
  );
};

/** Generate a complete, deterministic tscircuit design from system blocks. */
export const generateTsx = (request: GenerateTsxRequest): string => {
  const catalog = request.catalog ?? SUBCIRCUIT_CATALOG;
  const prepared = prepareBlocks(request.blocks, catalog);
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
    ([a], [b]) => a.localeCompare(b),
  )) {
    lines.push(
      ...renderImport(
        packageName,
        [...components].sort((a, b) => a.localeCompare(b)),
      ),
    );
  }
  lines.push('import "tscircuit"', "", "export default () => (");
  lines.push(
    request.boardName
      ? `  <board name=${quote(sanitizeInstanceName(request.boardName))} routingDisabled>`
      : "  <board routingDisabled>",
  );

  prepared.forEach((item, sheetIndex) => {
    lines.push(
      "    <schematicsheet",
      `      name=${quote(item.sheetName)}`,
      `      displayName=${quote(item.definition.title)}`,
      `      sheetIndex={${sheetIndex}}`,
      "    />",
    );
  });

  if (prepared.length > 0) lines.push("");
  for (const item of prepared) {
    lines.push(
      `    <${item.definition.componentName}`,
      `      name=${quote(item.instanceName)}`,
      `      schSheetName=${quote(item.sheetName)}`,
      "    />",
    );
  }

  const resolved = resolveDesignConnections(
    request.blocks,
    request.connections,
    catalog,
  );
  if (resolved.length > 0) lines.push("");
  for (const connection of resolved) {
    lines.push(
      `    {/* ${connection.kind === "power" ? "Power" : "Data"}: ${connection.protocol ?? "automatic"} */}`,
    );
    for (const trace of connection.traces) {
      lines.push(...renderTrace(trace, instanceNameByBlockId));
    }
  }

  lines.push("  </board>", ")", "");
  return lines.join("\n");
};

export const generateSystemTsx = generateTsx;
