import type { SubcircuitDefinition } from "../model";

const TI_PACKAGE_NAME = "@tsci/tscircuit.ti";
const TI_PACKAGE_ROOT = `node_modules/${TI_PACKAGE_NAME}`;

type RawSourceModules = Readonly<Record<string, string>>;

const discoverLocalTiSources = (): RawSourceModules => {
  try {
    // Vite turns the repository sources into strings in a lazy render chunk.
    // Bun tests do not implement import.meta.glob, so callers can inject the
    // same map when exercising this module outside Vite.
    return {
      ...(import.meta.glob("../../../lib/**/*.ts", {
        eager: true,
        import: "default",
        query: "?raw",
      }) as RawSourceModules),
      ...(import.meta.glob("../../../lib/**/*.tsx", {
        eager: true,
        import: "default",
        query: "?raw",
      }) as RawSourceModules),
    };
  } catch {
    return {};
  }
};

const normalizePath = (value: string): string => {
  const result: string[] = [];
  for (const part of value.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") {
      result.pop();
      continue;
    }
    result.push(part);
  }
  return result.join("/");
};

const repositorySourcePath = (globPath: string): string => {
  const normalized = globPath.replace(/\\/g, "/");
  const libMarker = normalized.lastIndexOf("/lib/");
  return libMarker >= 0
    ? normalizePath(normalized.slice(libMarker + 1))
    : normalizePath(normalized);
};

const sourceByRepositoryPath = (
  sourceModules: RawSourceModules,
): ReadonlyMap<string, string> =>
  new Map(
    Object.entries(sourceModules).map(([path, source]) => [
      repositorySourcePath(path),
      source,
    ]),
  );

const LOCAL_IMPORT_PATTERN =
  /(?:import|export)\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["'](\.{1,2}\/[^"']+)["']/g;

const getRelativeImports = (source: string): readonly string[] =>
  [...source.matchAll(LOCAL_IMPORT_PATTERN)].map((match) => match[1]);

const resolveLocalImport = (
  fromPath: string,
  specifier: string,
  sources: ReadonlyMap<string, string>,
): string | undefined => {
  const slash = fromPath.lastIndexOf("/");
  const directory = slash >= 0 ? fromPath.slice(0, slash) : "";
  const base = normalizePath(`${directory}/${specifier}`);
  const withoutJsExtension = base.replace(/\.(?:m?js|jsx)$/, "");
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${withoutJsExtension}.ts`,
    `${withoutJsExtension}.tsx`,
    `${base}/index.ts`,
    `${base}/index.tsx`,
  ];
  return candidates.find((candidate) => sources.has(candidate));
};

const collectDependencyClosure = (
  entryPaths: readonly string[],
  sources: ReadonlyMap<string, string>,
): ReadonlyMap<string, string> => {
  const collected = new Map<string, string>();
  const queue = entryPaths.map(normalizePath);

  while (queue.length > 0) {
    const sourcePath = queue.shift();
    if (!sourcePath || collected.has(sourcePath)) continue;
    const source = sources.get(sourcePath);
    if (source === undefined) {
      throw new Error(`Local TI source is unavailable: ${sourcePath}`);
    }
    collected.set(sourcePath, source);

    for (const specifier of getRelativeImports(source)) {
      const dependency = resolveLocalImport(sourcePath, specifier, sources);
      if (!dependency) {
        throw new Error(
          `Local TI dependency ${specifier} imported by ${sourcePath} is unavailable.`,
        );
      }
      if (!collected.has(dependency)) queue.push(dependency);
    }
  }

  return collected;
};

export type LocalTiSubcircuitDefinition = Pick<
  SubcircuitDefinition,
  "componentName" | "sourcePath"
>;

/**
 * Build a minimal virtual @tsci/tscircuit.ti package containing the selected
 * local subcircuits and their relative source dependencies.
 */
export const createLocalTiPackageEvaluationFsMap = (
  definitions: readonly LocalTiSubcircuitDefinition[],
  sourceModules: RawSourceModules = discoverLocalTiSources(),
): Readonly<Record<string, string>> => {
  const uniqueDefinitions = [
    ...new Map(
      definitions.map((definition) => [definition.componentName, definition]),
    ).values(),
  ].sort((left, right) =>
    left.componentName < right.componentName
      ? -1
      : left.componentName > right.componentName
        ? 1
        : 0,
  );
  if (uniqueDefinitions.length === 0) return {};

  const sources = sourceByRepositoryPath(sourceModules);
  const dependencyClosure = collectDependencyClosure(
    uniqueDefinitions.map(({ sourcePath }) => sourcePath),
    sources,
  );
  const packageIndex = uniqueDefinitions
    .map(
      ({ componentName, sourcePath }) =>
        `export { ${componentName} } from "./${normalizePath(sourcePath)}"`,
    )
    .join("\n");

  return {
    [`${TI_PACKAGE_ROOT}/package.json`]: JSON.stringify({
      name: TI_PACKAGE_NAME,
      type: "module",
      main: "index.ts",
      module: "index.ts",
    }),
    [`${TI_PACKAGE_ROOT}/index.ts`]: `${packageIndex}\n`,
    ...Object.fromEntries(
      [...dependencyClosure].map(([sourcePath, source]) => [
        `${TI_PACKAGE_ROOT}/${sourcePath}`,
        source,
      ]),
    ),
  };
};
