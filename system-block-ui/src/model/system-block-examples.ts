import { createConsumerWirelessModuleDesign } from "./consumer-wireless-module-design";
import type {
  BlockInstance,
  LogicalConnection,
  SubcircuitDefinition,
} from "./types";

export const DEFAULT_SYSTEM_BLOCK_EXAMPLE_ID = "consumer-wireless-module";

export interface SystemBlockExampleGraph {
  blocks: readonly BlockInstance[];
  connections: readonly LogicalConnection[];
}

export interface SystemBlockExample {
  id: string;
  title: string;
  /** Repository-relative circuit which this editable diagram represents. */
  sourcePath: `examples/${string}.circuit.tsx`;
  graph: SystemBlockExampleGraph;
}

const componentId = (
  catalog: readonly SubcircuitDefinition[],
  componentName: string,
): string => {
  const definition = catalog.find(
    (candidate) => candidate.componentName === componentName,
  );
  if (!definition)
    throw new Error(`Missing catalog entry for ${componentName}`);
  return definition.id;
};

const createBluetoothSpeakerDesign = (
  catalog: readonly SubcircuitDefinition[],
): SystemBlockExampleGraph => ({
  blocks: [
    {
      id: "charger",
      name: "charger",
      definitionId: componentId(catalog, "BatteryManagement_BQ24074"),
      position: { x: 40, y: 165 },
    },
    {
      id: "power_1v8",
      name: "power_1v8",
      definitionId: componentId(catalog, "PowerManagement_TPS7A2018"),
      position: { x: 350, y: 35 },
    },
    {
      id: "bluetooth_controller",
      name: "bluetooth_controller",
      definitionId: componentId(catalog, "BluetoothController_CC2564C"),
      position: { x: 660, y: 35 },
    },
    {
      id: "bluetooth_host",
      name: "bluetooth_host",
      definitionId: componentId(catalog, "BluetoothAudioHost_MSP430F5229"),
      position: { x: 660, y: 295 },
    },
    {
      id: "audio_amplifier",
      name: "audio_amplifier",
      definitionId: componentId(catalog, "AudioAmplifier_TAS2505"),
      position: { x: 970, y: 165 },
    },
  ],
  connections: [
    {
      id: "charger_to_power_1v8",
      fromBlockId: "charger",
      toBlockId: "power_1v8",
      kind: "power",
    },
    {
      id: "charger_to_bluetooth_controller",
      fromBlockId: "charger",
      toBlockId: "bluetooth_controller",
      kind: "power",
    },
    {
      id: "charger_to_audio_amplifier",
      fromBlockId: "charger",
      toBlockId: "audio_amplifier",
      kind: "power",
    },
    {
      id: "power_1v8_to_bluetooth_controller",
      fromBlockId: "power_1v8",
      toBlockId: "bluetooth_controller",
      kind: "power",
    },
    {
      id: "power_1v8_to_bluetooth_host",
      fromBlockId: "power_1v8",
      toBlockId: "bluetooth_host",
      kind: "power",
    },
    {
      id: "power_1v8_to_audio_amplifier",
      fromBlockId: "power_1v8",
      toBlockId: "audio_amplifier",
      kind: "power",
    },
    {
      id: "bluetooth_host_to_controller",
      fromBlockId: "bluetooth_host",
      toBlockId: "bluetooth_controller",
      kind: "data",
      protocol: "hci-uart",
    },
    {
      id: "bluetooth_host_to_audio_amplifier",
      fromBlockId: "bluetooth_host",
      toBlockId: "audio_amplifier",
      kind: "data",
      protocol: "i2c",
    },
    {
      id: "bluetooth_controller_to_audio_amplifier",
      fromBlockId: "bluetooth_controller",
      toBlockId: "audio_amplifier",
      kind: "data",
      protocol: "i2s",
    },
  ],
});

/** Editable system diagrams backed by complete circuits in the root examples directory. */
export const createSystemBlockExamples = (
  catalog: readonly SubcircuitDefinition[],
): readonly SystemBlockExample[] => [
  {
    id: DEFAULT_SYSTEM_BLOCK_EXAMPLE_ID,
    title: "Consumer Wireless Module",
    sourcePath: "examples/ConsumerWirelessModule.circuit.tsx",
    graph: createConsumerWirelessModuleDesign(catalog),
  },
  {
    id: "bluetooth-speaker",
    title: "Bluetooth Speaker",
    sourcePath: "examples/BluetoothSpeaker_CC2564C_TAS2505.circuit.tsx",
    graph: createBluetoothSpeakerDesign(catalog),
  },
];
