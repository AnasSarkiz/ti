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

const createRearviewMirrorDesign = (
  catalog: readonly SubcircuitDefinition[],
): SystemBlockExampleGraph => ({
  blocks: [
    {
      id: "power_supply",
      name: "power_supply",
      definitionId: componentId(catalog, "PowerSupply_LM74202_TPS7E81_Q1"),
      schX: -3.6,
      position: { x: 40, y: 165 },
    },
    {
      id: "communication_interface",
      name: "communication_interface",
      definitionId: componentId(
        catalog,
        "CommunicationInterface_TCAN1042_TIDA01428",
      ),
      position: { x: 350, y: 35 },
    },
    {
      id: "microcontroller",
      name: "microcontroller",
      definitionId: componentId(catalog, "Microcontroller_MSPM0G3507"),
      position: { x: 660, y: 165 },
    },
    {
      id: "mirror_driver",
      name: "mirror_driver",
      definitionId: componentId(
        catalog,
        "ElectrochromicMirrorDriver_TIDA01539",
      ),
      position: { x: 970, y: 35 },
    },
    {
      id: "light_sensor",
      name: "light_sensor",
      definitionId: componentId(catalog, "LightSensor_OPT3001_TIDA01539"),
      position: { x: 970, y: 165 },
    },
    {
      id: "lamp_driver",
      name: "lamp_driver",
      definitionId: componentId(catalog, "LampDriver_TPS92638_TIDA00356"),
      position: { x: 970, y: 295 },
    },
    {
      id: "temperature_sensor",
      name: "temperature_sensor",
      definitionId: componentId(catalog, "TemperatureSensor_LM50HV_Q1"),
      position: { x: 350, y: 295 },
    },
  ],
  connections: [
    {
      id: "power_3v3_to_communication",
      fromBlockId: "power_supply",
      toBlockId: "communication_interface",
      kind: "power",
      protocol: "logic-3v3",
    },
    {
      id: "power_3v3_to_microcontroller",
      fromBlockId: "power_supply",
      toBlockId: "microcontroller",
      kind: "power",
      protocol: "logic-3v3",
    },
    {
      id: "power_3v3_to_mirror_driver",
      fromBlockId: "power_supply",
      toBlockId: "mirror_driver",
      kind: "power",
      protocol: "logic-3v3",
    },
    {
      id: "power_3v3_to_light_sensor",
      fromBlockId: "power_supply",
      toBlockId: "light_sensor",
      kind: "power",
      protocol: "logic-3v3",
    },
    {
      id: "power_3v3_to_lamp_driver",
      fromBlockId: "power_supply",
      toBlockId: "lamp_driver",
      kind: "power",
      protocol: "logic-3v3",
    },
    {
      id: "power_3v3_to_temperature_sensor",
      fromBlockId: "power_supply",
      toBlockId: "temperature_sensor",
      kind: "power",
      protocol: "logic-3v3",
    },
    {
      id: "power_protected_to_mirror_driver",
      fromBlockId: "power_supply",
      toBlockId: "mirror_driver",
      kind: "power",
      protocol: "protected-vehicle-power",
    },
    {
      id: "power_protected_to_lamp_driver",
      fromBlockId: "power_supply",
      toBlockId: "lamp_driver",
      kind: "power",
      protocol: "protected-vehicle-power",
    },
    {
      id: "data_can_controller",
      fromBlockId: "microcontroller",
      toBlockId: "communication_interface",
      kind: "data",
      protocol: "can-controller",
    },
    {
      id: "data_i2c_mirror_driver",
      fromBlockId: "microcontroller",
      toBlockId: "mirror_driver",
      kind: "data",
      protocol: "i2c",
    },
    {
      id: "data_i2c_light_sensor",
      fromBlockId: "microcontroller",
      toBlockId: "light_sensor",
      kind: "data",
      protocol: "i2c",
    },
    {
      id: "data_temperature_sense",
      fromBlockId: "temperature_sensor",
      toBlockId: "microcontroller",
      kind: "data",
      protocol: "analog-temperature",
    },
    {
      id: "data_light_alerts",
      fromBlockId: "light_sensor",
      toBlockId: "microcontroller",
      kind: "data",
      protocol: "ambient-light-alerts",
    },
    {
      id: "data_mirror_control",
      fromBlockId: "microcontroller",
      toBlockId: "mirror_driver",
      kind: "data",
      protocol: "mirror-control",
    },
    {
      id: "data_lamp_control",
      fromBlockId: "microcontroller",
      toBlockId: "lamp_driver",
      kind: "data",
      protocol: "lamp-control",
    },
    {
      id: "data_power_monitor",
      fromBlockId: "power_supply",
      toBlockId: "microcontroller",
      kind: "data",
      protocol: "power-monitor",
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
  {
    id: "rearview-mirror-module",
    title: "Rearview Mirror Module",
    sourcePath: "examples/RearviewMirrorModule.circuit.tsx",
    graph: createRearviewMirrorDesign(catalog),
  },
];
