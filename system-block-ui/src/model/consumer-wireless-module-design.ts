import type {
  BlockInstance,
  LogicalConnection,
  SubcircuitDefinition,
} from "./types";

export interface ConsumerWirelessModuleDesign {
  blocks: readonly BlockInstance[];
  connections: readonly LogicalConnection[];
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

/** Starter graph matching TI's Consumer wireless module block diagram. */
export const createConsumerWirelessModuleDesign = (
  catalog: readonly SubcircuitDefinition[],
): ConsumerWirelessModuleDesign => ({
  blocks: [
    {
      id: "input_power_protection",
      name: "input_power_protection",
      definitionId: componentId(
        catalog,
        "InputPowerProtection_TPS25910_TIDA00890",
      ),
      position: { x: 350, y: 35 },
    },
    {
      id: "dc_dc_power_supply",
      name: "dc_dc_power_supply",
      definitionId: componentId(catalog, "BuckConverter_TPS62086_TIDA00399"),
      position: { x: 660, y: 35 },
    },
    {
      id: "io_connection",
      name: "io_connection",
      definitionId: componentId(catalog, "LVDSDriver_SN65LVDS31_TIDA060017"),
      position: { x: 970, y: 290 },
    },
    {
      id: "wireless_connectivity",
      name: "wireless_connectivity",
      definitionId: componentId(
        catalog,
        "WirelessAntenna_W3006_TIDCWL1837MODCOM8I",
      ),
      position: { x: 40, y: 35 },
    },
    {
      id: "io_protection",
      name: "io_protection",
      definitionId: componentId(
        catalog,
        "InputOutputProtection_TPD2E009_TIDA00399",
      ),
      position: { x: 1280, y: 290 },
    },
    {
      id: "logic_control",
      name: "logic_control",
      definitionId: componentId(catalog, "LogicBuffer_SN74LVC1G34"),
      position: { x: 350, y: 290 },
    },
    {
      id: "sensors",
      name: "sensors",
      definitionId: componentId(catalog, "TemperatureSensor_TMP103_TIDA00399"),
      position: { x: 970, y: 35 },
    },
  ],
  connections: [
    {
      id: "power_protection_to_dc_dc",
      fromBlockId: "input_power_protection",
      toBlockId: "dc_dc_power_supply",
      kind: "power",
    },
    {
      id: "power_dc_dc_to_io_connection",
      fromBlockId: "dc_dc_power_supply",
      toBlockId: "io_connection",
      kind: "power",
    },
    {
      id: "power_dc_dc_to_logic_control",
      fromBlockId: "dc_dc_power_supply",
      toBlockId: "logic_control",
      kind: "power",
    },
    {
      id: "power_dc_dc_to_sensors",
      fromBlockId: "dc_dc_power_supply",
      toBlockId: "sensors",
      kind: "power",
    },
    {
      id: "data_logic_to_io_connection",
      fromBlockId: "logic_control",
      toBlockId: "io_connection",
      kind: "data",
      protocol: "gpio",
    },
    {
      id: "data_io_connection_to_io_protection",
      fromBlockId: "io_connection",
      toBlockId: "io_protection",
      kind: "data",
      protocol: "lvds",
    },
  ],
});
