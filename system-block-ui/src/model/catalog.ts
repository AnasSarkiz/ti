import {
  CURATED_ADAPTER_BY_COMPONENT,
  CURATED_SUBCIRCUIT_ADAPTERS,
} from "./subcircuit-adapters";
import type { SubcircuitDefinition } from "./types";

type RawSourceModules = Record<string, string>;

const discoverRawSubcircuitSources = (): RawSourceModules => {
  try {
    // Vite expands this literal glob at build time. The try/catch keeps the
    // pure model importable by Bun tests, where import.meta.glob is absent.
    return import.meta.glob("../../../lib/subcircuits/*.circuit.tsx", {
      eager: true,
      import: "default",
      query: "?raw",
    }) as RawSourceModules;
  } catch {
    return {};
  }
};

const componentNameFromSource = (fileName: string, source: string): string => {
  const namedExport = source.match(
    /export\s+const\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=/,
  )?.[1];
  return namedExport ?? fileName.replace(/\.circuit\.tsx$/, "");
};

const titleFromComponentName = (componentName: string): string =>
  componentName
    .replace(/_/g, " ")
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();

const idFromComponentName = (componentName: string): string =>
  componentName
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .replace(/[^A-Za-z\d-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

const categoryFromComponentName = (componentName: string): string => {
  const prefix = componentName.split("_")[0];
  const categories: Readonly<Record<string, string>> = {
    AudioAmplifier: "Audio",
    BatteryCharging: "Power",
    BatteryManagement: "Power",
    BluetoothAudioHost: "Processors",
    BluetoothController: "Wireless",
    BoostConverter: "Power",
    BuckBoostConverter: "Power",
    BuckConverter: "Power",
    ClockBuffer: "Timing",
    CommunicationInterface: "Interfaces",
    ElectrochromicMirrorDriver: "Drivers",
    EnvironmentalSensor: "Sensors",
    FlashMemory: "Memory",
    IsolatedRS485: "Interfaces",
    LEDDriver: "Drivers",
    LampDriver: "Drivers",
    LevelShifter: "Interfaces",
    LightSensor: "Sensors",
    LoadSwitch: "Power",
    Microcontroller: "Processors",
    MotorDriver: "Motor Control",
    OutputUserInterface: "User Interface",
    PowerManagement: "Power",
    PowerModule: "Power",
    PowerMonitor: "Power",
    RFIDReader: "Wireless",
    RealTimeClock: "Timing",
    TargetSocket: "Development",
    TemperatureSensor: "Sensors",
    USBC: "Power",
    WirelessMCU: "Wireless",
  };
  return categories[prefix] ?? "Other";
};

const fileNameFromGlobPath = (path: string): string =>
  path.slice(path.lastIndexOf("/") + 1);

const componentAcceptsProps = (
  componentName: string,
  source: string,
): boolean => {
  const signature = source.match(
    new RegExp(
      `export\\s+const\\s+${componentName}\\s*(?::[^=]+)?=\\s*\\(([^)]*)\\)\\s*=>`,
    ),
  );
  // Unknown declaration styles stay available; the standard zero-argument
  // arrow form is the only shape known to reject generated instance props.
  return signature ? signature[1].trim().length > 0 : true;
};

const genericDefinition = (
  path: string,
  source: string,
): SubcircuitDefinition => {
  const fileName = fileNameFromGlobPath(path);
  const componentName = componentNameFromSource(fileName, source);
  const acceptsProps = componentAcceptsProps(componentName, source);

  return {
    id: idFromComponentName(componentName),
    title: titleFromComponentName(componentName),
    category: categoryFromComponentName(componentName),
    componentName,
    importPath: "@tsci/tscircuit.ti",
    sourcePath: `lib/subcircuits/${fileName}`,
    source,
    ports: [],
    canInstantiate: acceptsProps,
    warning: !acceptsProps
      ? "This subcircuit does not accept instance props, so a generated name cannot be applied safely."
      : "Automatic connections are not mapped for this subcircuit yet.",
  };
};

export const createSubcircuitCatalog = (
  rawSources: RawSourceModules,
): readonly SubcircuitDefinition[] => {
  const byComponent = new Map<string, SubcircuitDefinition>();

  for (const definition of CURATED_SUBCIRCUIT_ADAPTERS) {
    byComponent.set(definition.componentName, definition);
  }

  for (const [path, source] of Object.entries(rawSources)) {
    const discovered = genericDefinition(path, source);
    const curated = CURATED_ADAPTER_BY_COMPONENT.get(discovered.componentName);
    byComponent.set(
      discovered.componentName,
      curated
        ? {
            ...curated,
            sourcePath: discovered.sourcePath,
            source,
          }
        : discovered,
    );
  }

  return [...byComponent.values()].sort((a, b) =>
    a.title.localeCompare(b.title, "en"),
  );
};

const RAW_SUBCIRCUIT_SOURCES = discoverRawSubcircuitSources();

/** Full Vite-discovered catalog, enriched by the curated electrical adapters. */
export const SUBCIRCUIT_CATALOG = createSubcircuitCatalog(
  RAW_SUBCIRCUIT_SOURCES,
);

export const getSubcircuitCatalog = (): readonly SubcircuitDefinition[] =>
  SUBCIRCUIT_CATALOG;

export const getSubcircuitDefinition = (
  id: string,
  catalog: readonly SubcircuitDefinition[] = SUBCIRCUIT_CATALOG,
): SubcircuitDefinition | undefined =>
  catalog.find(
    (definition) => definition.id === id || definition.componentName === id,
  );

export const searchSubcircuits = (
  query: string,
  catalog: readonly SubcircuitDefinition[] = SUBCIRCUIT_CATALOG,
): readonly SubcircuitDefinition[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return catalog;

  return catalog.filter((definition) =>
    [
      definition.title,
      definition.componentName,
      definition.category,
      ...(definition.tags ?? []),
    ].some((value) => value.toLowerCase().includes(normalized)),
  );
};
