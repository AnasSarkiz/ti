import {
  BQ24072,
  BQ24073,
  BQ24074,
  BQ25895,
  BQ27441G1,
  BQ32002,
  CC2340R5,
  CC2564C,
  CC2745R10,
  CC3235SF,
  DRV8833,
  DRV8876,
  HDC2080,
  HDC3020,
  HDC3022,
  INA237,
  MSP430G2230ID,
  MSPM33C3x,
  MSPM0G3507,
  TAS2505,
  TLC59116,
  TLV755P,
  TMP1827,
  TMP1075,
  TPS22919,
  TPS6293,
  TPS61222,
  TPS61299X,
  TPS6521835,
  TPS63802,
  TPS7A02,
  TPS7A20,
  TPSM82823,
  TRF7960RHB,
  TXB0104,
  TXS0102,
  W25Q128JVSIQ,
} from "./lib/chips/index";
import { BatteryManagement_BQ24072 } from "./lib/subcircuits/BatteryManagement_BQ24072.circuit";
import { BatteryManagement_BQ24073 } from "./lib/subcircuits/BatteryManagement_BQ24073.circuit";
import { BatteryManagement_BQ24074 } from "./lib/subcircuits/BatteryManagement_BQ24074.circuit";
import { BatteryManagement_BQ25895 } from "./lib/subcircuits/BatteryManagement_BQ25895.circuit";
import { BatteryManagement_BQ27441G1 } from "./lib/subcircuits/BatteryManagement_BQ27441G1.circuit";
import { RealTimeClock_BQ32002 } from "./lib/subcircuits/RealTimeClock_BQ32002.circuit";
import { WirelessMCU_CC2340R5 } from "./lib/subcircuits/WirelessMCU_CC2340R5.circuit";
import { BluetoothController_CC2564C } from "./lib/subcircuits/BluetoothController_CC2564C.circuit";
import { WirelessMCU_CC2745R10 } from "./lib/subcircuits/WirelessMCU_CC2745R10.circuit";
import { WirelessMCU_CC3235SF } from "./lib/subcircuits/WirelessMCU_CC3235SF.circuit";
import { MotorDriver_DRV8833 } from "./lib/subcircuits/MotorDriver_DRV8833.circuit";
import { MotorDriver_DRV8876 } from "./lib/subcircuits/MotorDriver_DRV8876.circuit";
import { EnvironmentalSensor_HDC2080 } from "./lib/subcircuits/EnvironmentalSensor_HDC2080.circuit";
import { EnvironmentalSensor_HDC3020 } from "./lib/subcircuits/EnvironmentalSensor_HDC3020.circuit";
import { EnvironmentalSensor_HDC3022 } from "./lib/subcircuits/EnvironmentalSensor_HDC3022.circuit";
import { PowerMonitor_INA237 } from "./lib/subcircuits/PowerMonitor_INA237.circuit";
import { AudioAmplifier_TAS2505 } from "./lib/subcircuits/AudioAmplifier_TAS2505.circuit";
import { TargetSocket_MSPTS430D8 } from "./lib/subcircuits/TargetSocket_MSPTS430D8.circuit";
import { Microcontroller_MSPM0G3507 } from "./lib/subcircuits/Microcontroller_MSPM0G3507.circuit";
import { Microcontroller_MSPM33C3x } from "./lib/subcircuits/Microcontroller_MSPM33C3x.circuit";
import { LEDDriver_TLC59116 } from "./lib/subcircuits/LEDDriver_TLC59116.circuit";
import { TemperatureSensor_TMP1075 } from "./lib/subcircuits/TemperatureSensor_TMP1075.circuit";
import { TemperatureSensor_TMP1827 } from "./lib/subcircuits/TemperatureSensor_TMP1827.circuit";
import { LoadSwitch_TPS22919 } from "./lib/subcircuits/LoadSwitch_TPS22919.circuit";
import { BuckConverter_TPS62933 } from "./lib/subcircuits/BuckConverter_TPS62933.circuit";
import {
  BoostConverter_TPS61299X,
  TPS61299XBoostConverter,
} from "./lib/subcircuits/BoostConverter_TPS61299X.circuit";
import { PowerManagement_TPS6521835 } from "./lib/subcircuits/PowerManagement_TPS6521835.circuit";
import { BuckBoostConverter_TPS63802 } from "./lib/subcircuits/BuckBoostConverter_TPS63802.circuit";
import { PowerManagement_TPS7A02 } from "./lib/subcircuits/PowerManagement_TPS7A02.circuit";
import { PowerManagement_TPS7A20 } from "./lib/subcircuits/PowerManagement_TPS7A20.circuit";
import { PowerManagement_TLV755P } from "./lib/subcircuits/PowerManagement_TLV755P.circuit";
import { PowerModule_TPSM82823 } from "./lib/subcircuits/PowerModule_TPSM82823.circuit";
import { LevelShifter_TXB0104 } from "./lib/subcircuits/LevelShifter_TXB0104.circuit";
import { LevelShifter_TXS0102 } from "./lib/subcircuits/LevelShifter_TXS0102.circuit";
import { RFIDReader_TRF7960 } from "./lib/subcircuits/RFIDReader_TRF7960.circuit";
import { FlashMemory_W25Q128JVSIQ } from "./lib/subcircuits/FlashMemory_W25Q128JVSIQ.circuit";

export * from "./lib/chips/index.tsx";

export {
  BatteryManagement_BQ24072,
  BatteryManagement_BQ24073,
  BatteryManagement_BQ24074,
  BatteryManagement_BQ25895,
  BatteryManagement_BQ27441G1,
  RealTimeClock_BQ32002,
  WirelessMCU_CC2340R5,
  BluetoothController_CC2564C,
  WirelessMCU_CC2745R10,
  WirelessMCU_CC3235SF,
  MotorDriver_DRV8833,
  MotorDriver_DRV8876,
  EnvironmentalSensor_HDC2080,
  EnvironmentalSensor_HDC3020,
  EnvironmentalSensor_HDC3022,
  PowerMonitor_INA237,
  AudioAmplifier_TAS2505,
  TargetSocket_MSPTS430D8,
  Microcontroller_MSPM0G3507,
  Microcontroller_MSPM33C3x,
  LEDDriver_TLC59116,
  TemperatureSensor_TMP1075,
  TemperatureSensor_TMP1827,
  LoadSwitch_TPS22919,
  BuckConverter_TPS62933,
  BoostConverter_TPS61299X,
  TPS61299XBoostConverter,
  PowerManagement_TPS6521835,
  BuckBoostConverter_TPS63802,
  PowerManagement_TPS7A02,
  PowerManagement_TPS7A20,
  PowerManagement_TLV755P,
  PowerModule_TPSM82823,
  LevelShifter_TXB0104,
  LevelShifter_TXS0102,
  RFIDReader_TRF7960,
  FlashMemory_W25Q128JVSIQ,
};

export const TiChipComponents = {
  BQ24072,
  BQ24073,
  BQ24074,
  BQ25895,
  BQ27441G1,
  BQ32002,
  CC2340R5,
  CC2564C,
  CC2745R10,
  CC3235SF,
  DRV8833,
  DRV8876,
  HDC2080,
  HDC3020,
  HDC3022,
  INA237,
  MSP430G2230ID,
  MSPM33C3x,
  MSPM0G3507,
  TAS2505,
  TLC59116,
  TLV755P,
  TMP1827,
  TMP1075,
  TPS22919,
  TPS6293,
  TPS61222,
  TPS61299X,
  TPS6521835,
  TPS63802,
  TPS7A02,
  TPS7A20,
  TPSM82823,
  TRF7960RHB,
  TXB0104,
  TXS0102,
  W25Q128JVSIQ,
} as const;

export const TiSubcircuitComponents = {
  BatteryManagement_BQ24072,
  BatteryManagement_BQ24073,
  BatteryManagement_BQ24074,
  BatteryManagement_BQ25895,
  BatteryManagement_BQ27441G1,
  RealTimeClock_BQ32002,
  WirelessMCU_CC2340R5,
  BluetoothController_CC2564C,
  WirelessMCU_CC2745R10,
  WirelessMCU_CC3235SF,
  MotorDriver_DRV8833,
  MotorDriver_DRV8876,
  EnvironmentalSensor_HDC2080,
  EnvironmentalSensor_HDC3020,
  EnvironmentalSensor_HDC3022,
  PowerMonitor_INA237,
  AudioAmplifier_TAS2505,
  TargetSocket_MSPTS430D8,
  Microcontroller_MSPM0G3507,
  Microcontroller_MSPM33C3x,
  LEDDriver_TLC59116,
  TemperatureSensor_TMP1075,
  TemperatureSensor_TMP1827,
  LoadSwitch_TPS22919,
  BuckConverter_TPS62933,
  BoostConverter_TPS61299X,
  PowerManagement_TPS6521835,
  BuckBoostConverter_TPS63802,
  PowerManagement_TPS7A02,
  PowerManagement_TPS7A20,
  PowerManagement_TLV755P,
  PowerModule_TPSM82823,
  LevelShifter_TXB0104,
  LevelShifter_TXS0102,
  RFIDReader_TRF7960,
  FlashMemory_W25Q128JVSIQ,
} as const;

export type TiChipName = keyof typeof TiChipComponents;
export type TiChipComponent = (typeof TiChipComponents)[TiChipName];
export type TiSubcircuitName = keyof typeof TiSubcircuitComponents;
export type TiSubcircuitComponent =
  (typeof TiSubcircuitComponents)[TiSubcircuitName];
