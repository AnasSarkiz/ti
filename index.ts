import {
  AM62L32,
  AWR1843ARBGALPQ1,
  BQ24072,
  BQ24073,
  BQ24074,
  BQ25895,
  BQ25731RSN,
  BQ294700DSG,
  BQ40Z60RHB,
  BQ27441G1,
  BQ32002,
  CC2340R5,
  CC2564C,
  CC2745R10,
  CC3235SF,
  CHS01TA,
  DAC101C081Q,
  DRV8210,
  DRV8833,
  DRV8876,
  FW4000044Q,
  HDC2080,
  HDC3020,
  HDC3022,
  INA237,
  INA350,
  ISOW7841,
  LM74202Q1,
  LM50HVQ1,
  LMK1C1104,
  LP5892Q1,
  MSP430G2230ID,
  MSP430G2332IPW20,
  MSP430F5229,
  MSPM0L1306,
  MSPM33C3x,
  MSPM0G3507,
  MX25V1635FZNQ,
  OPT3001,
  PGA300ARHHR,
  SN65HVD1473,
  TAS2505,
  TCAN1042HGV,
  TLC59116,
  TLV316,
  TLV755P,
  TLV9152IDR,
  TMP1827,
  TMP1075,
  TPS22919,
  TPS6293,
  TPS61222,
  TPS61236RWLR,
  TPS61288RQQR,
  TPS61299X,
  TPS6521835,
  TPS63802,
  TPS7A02,
  TPS7A20,
  TPS7E81Q1,
  TPS78230DRVR,
  TPS92638,
  TPSM82823,
  TRF7960RHB,
  TXB0104,
  TXS0102,
  W25Q128JVSIQ,
} from "./lib/chips/index.tsx";
import { BatteryManagement_BQ24072 } from "./lib/subcircuits/BatteryManagement_BQ24072.circuit.tsx";
import { BatteryManagement_BQ24073 } from "./lib/subcircuits/BatteryManagement_BQ24073.circuit.tsx";
import { BatteryManagement_BQ24074 } from "./lib/subcircuits/BatteryManagement_BQ24074.circuit.tsx";
import { BatteryManagement_BQ25895 } from "./lib/subcircuits/BatteryManagement_BQ25895.circuit.tsx";
import { BatteryManagement_BQ27441G1 } from "./lib/subcircuits/BatteryManagement_BQ27441G1.circuit.tsx";
import { BatteryManagement_2to4Cell_BQ40Z60 } from "./lib/subcircuits/BatteryManagement_2to4Cell_BQ40Z60.circuit.tsx";
import { RealTimeClock_BQ32002 } from "./lib/subcircuits/RealTimeClock_BQ32002.circuit.tsx";
import { WirelessMCU_CC2340R5 } from "./lib/subcircuits/WirelessMCU_CC2340R5.circuit.tsx";
import { BluetoothController_CC2564C } from "./lib/subcircuits/BluetoothController_CC2564C.circuit.tsx";
import { WirelessMCU_CC2745R10 } from "./lib/subcircuits/WirelessMCU_CC2745R10.circuit.tsx";
import { WirelessMCU_CC3235SF } from "./lib/subcircuits/WirelessMCU_CC3235SF.circuit.tsx";
import { MotorDriver_DRV8210 } from "./lib/subcircuits/MotorDriver_DRV8210.circuit.tsx";
import { MotorDriver_DRV8833 } from "./lib/subcircuits/MotorDriver_DRV8833.circuit.tsx";
import { MotorDriver_DRV8876 } from "./lib/subcircuits/MotorDriver_DRV8876.circuit.tsx";
import { EnvironmentalSensor_HDC2080 } from "./lib/subcircuits/EnvironmentalSensor_HDC2080.circuit.tsx";
import { EnvironmentalSensor_HDC3020 } from "./lib/subcircuits/EnvironmentalSensor_HDC3020.circuit.tsx";
import { EnvironmentalSensor_HDC3022 } from "./lib/subcircuits/EnvironmentalSensor_HDC3022.circuit.tsx";
import { PowerMonitor_INA237 } from "./lib/subcircuits/PowerMonitor_INA237.circuit.tsx";
import { InstrumentationAmplifier_INA350 } from "./lib/subcircuits/InstrumentationAmplifier_INA350.circuit.tsx";
import { PressureTransmitter_PGA300 } from "./lib/subcircuits/PressureTransmitter_PGA300.circuit.tsx";
import { IsolatedRS485_ISOW7841 } from "./lib/subcircuits/IsolatedRS485_ISOW7841.circuit.tsx";
import { ClockBuffer_LMK1C1104 } from "./lib/subcircuits/ClockBuffer_LMK1C1104.circuit.tsx";
import { AudioAmplifier_TAS2505 } from "./lib/subcircuits/AudioAmplifier_TAS2505.circuit.tsx";
import { TargetSocket_MSPTS430D8 } from "./lib/subcircuits/TargetSocket_MSPTS430D8.circuit.tsx";
import { BluetoothAudioHost_MSP430F5229 } from "./lib/subcircuits/BluetoothAudioHost_MSP430F5229.circuit.tsx";
import { Microcontroller_MSPM0L1306 } from "./lib/subcircuits/Microcontroller_MSPM0L1306.circuit.tsx";
import { Microcontroller_MSPM0G3507 } from "./lib/subcircuits/Microcontroller_MSPM0G3507.circuit.tsx";
import { Microcontroller_MSPM33C3x } from "./lib/subcircuits/Microcontroller_MSPM33C3x.circuit.tsx";
import { LEDDriver_TLC59116 } from "./lib/subcircuits/LEDDriver_TLC59116.circuit.tsx";
import { OutputUserInterface_LEDMatrix_LP5892_Q1 } from "./lib/subcircuits/OutputUserInterface_LEDMatrix_LP5892_Q1.circuit.tsx";
import { TemperatureSensor_TMP1075 } from "./lib/subcircuits/TemperatureSensor_TMP1075.circuit.tsx";
import { TemperatureSensor_TMP1827 } from "./lib/subcircuits/TemperatureSensor_TMP1827.circuit.tsx";
import { LoadSwitch_TPS22919 } from "./lib/subcircuits/LoadSwitch_TPS22919.circuit.tsx";
import { BuckConverter_TPS62933 } from "./lib/subcircuits/BuckConverter_TPS62933.circuit.tsx";
import {
  BoostConverter_TPS61299X,
  TPS61299XBoostConverter,
} from "./lib/subcircuits/BoostConverter_TPS61299X.circuit.tsx";
import { PowerManagement_TPS6521835 } from "./lib/subcircuits/PowerManagement_TPS6521835.circuit.tsx";
import { BuckBoostConverter_TPS63802 } from "./lib/subcircuits/BuckBoostConverter_TPS63802.circuit.tsx";
import { PowerManagement_TPS7A02 } from "./lib/subcircuits/PowerManagement_TPS7A02.circuit.tsx";
import { PowerManagement_TPS7A20 } from "./lib/subcircuits/PowerManagement_TPS7A20.circuit.tsx";
import { PowerManagement_TPS7A2018 } from "./lib/subcircuits/PowerManagement_TPS7A2018.circuit.tsx";
import { PowerManagement_TPS7A2028 } from "./lib/subcircuits/PowerManagement_TPS7A2028.circuit.tsx";
import { PowerManagement_TLV755P } from "./lib/subcircuits/PowerManagement_TLV755P.circuit.tsx";
import { PowerModule_TPSM82823 } from "./lib/subcircuits/PowerModule_TPSM82823.circuit.tsx";
import { LevelShifter_TXB0104 } from "./lib/subcircuits/LevelShifter_TXB0104.circuit.tsx";
import { LevelShifter_TXS0102 } from "./lib/subcircuits/LevelShifter_TXS0102.circuit.tsx";
import { RFIDReader_TRF7960 } from "./lib/subcircuits/RFIDReader_TRF7960.circuit.tsx";
import { FlashMemory_W25Q128JVSIQ } from "./lib/subcircuits/FlashMemory_W25Q128JVSIQ.circuit.tsx";
import { BatteryCharging_2to5CellNVDCBuckBoost_BQ25731 } from "./lib/subcircuits/BatteryCharging_2to5CellNVDCBuckBoost_BQ25731.circuit.tsx";
import { BoostConverter_TPS61236 } from "./lib/subcircuits/BoostConverter_TPS61236.circuit.tsx";
import { Microcontroller_MSP430G2332 } from "./lib/subcircuits/Microcontroller_MSP430G2332.circuit.tsx";
import { USBC_PowerDeliveryProgrammablePowerSupply_TPS61288 } from "./lib/subcircuits/USBC_PowerDeliveryProgrammablePowerSupply_TPS61288.circuit.tsx";
import { CommunicationInterface_TCAN1042_TIDA01428 } from "./lib/subcircuits/CommunicationInterface_TCAN1042_TIDA01428.circuit.tsx";
import { ElectrochromicMirrorDriver_TIDA01539 } from "./lib/subcircuits/ElectrochromicMirrorDriver_TIDA01539.circuit.tsx";
import { LampDriver_TPS92638_TIDA00356 } from "./lib/subcircuits/LampDriver_TPS92638_TIDA00356.circuit.tsx";
import { LightSensor_OPT3001_TIDA01539 } from "./lib/subcircuits/LightSensor_OPT3001_TIDA01539.circuit.tsx";
import { PowerSupply_LM74202_TPS7E81_Q1 } from "./lib/thirdparty-subcircuits/PowerSupply_LM74202_TPS7E81_Q1.circuit.tsx";
import { TemperatureSensor_LM50HV_Q1 } from "./lib/thirdparty-subcircuits/TemperatureSensor_LM50HV_Q1.circuit.tsx";
import { RadarClock_FW4000044Q } from "./lib/subcircuits/RadarClock_FW4000044Q.circuit.tsx";
import {
  RADAR_FRONT_END_INTERFACE_NETS,
  RadarFrontEndProcessing_TIDEP01024,
} from "./lib/subcircuits/RadarFrontEndProcessing_TIDEP01024.circuit.tsx";
import { RadarQspiFlash_MX25V1635FZNQ } from "./lib/subcircuits/RadarQspiFlash_MX25V1635FZNQ.circuit.tsx";
import { RadarSoc_AWR1843ARBGALPQ1 } from "./lib/subcircuits/RadarSoc_AWR1843ARBGALPQ1.circuit.tsx";

export * from "./lib/chips/index.tsx";
export type { InstrumentationAmplifier_INA350Props } from "./lib/subcircuits/InstrumentationAmplifier_INA350.circuit.tsx";

export {
  BatteryManagement_BQ24072,
  BatteryManagement_BQ24073,
  BatteryManagement_BQ24074,
  BatteryManagement_BQ25895,
  BatteryManagement_BQ27441G1,
  BatteryManagement_2to4Cell_BQ40Z60,
  RealTimeClock_BQ32002,
  WirelessMCU_CC2340R5,
  BluetoothController_CC2564C,
  WirelessMCU_CC2745R10,
  WirelessMCU_CC3235SF,
  MotorDriver_DRV8210,
  MotorDriver_DRV8833,
  MotorDriver_DRV8876,
  EnvironmentalSensor_HDC2080,
  EnvironmentalSensor_HDC3020,
  EnvironmentalSensor_HDC3022,
  PowerMonitor_INA237,
  InstrumentationAmplifier_INA350,
  PressureTransmitter_PGA300,
  IsolatedRS485_ISOW7841,
  ClockBuffer_LMK1C1104,
  AudioAmplifier_TAS2505,
  TargetSocket_MSPTS430D8,
  BluetoothAudioHost_MSP430F5229,
  Microcontroller_MSPM0L1306,
  Microcontroller_MSPM0G3507,
  Microcontroller_MSPM33C3x,
  LEDDriver_TLC59116,
  OutputUserInterface_LEDMatrix_LP5892_Q1,
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
  PowerManagement_TPS7A2018,
  PowerManagement_TPS7A2028,
  PowerManagement_TLV755P,
  PowerModule_TPSM82823,
  LevelShifter_TXB0104,
  LevelShifter_TXS0102,
  RFIDReader_TRF7960,
  FlashMemory_W25Q128JVSIQ,
  BatteryCharging_2to5CellNVDCBuckBoost_BQ25731,
  BoostConverter_TPS61236,
  Microcontroller_MSP430G2332,
  USBC_PowerDeliveryProgrammablePowerSupply_TPS61288,
  CommunicationInterface_TCAN1042_TIDA01428,
  ElectrochromicMirrorDriver_TIDA01539,
  LampDriver_TPS92638_TIDA00356,
  LightSensor_OPT3001_TIDA01539,
  PowerSupply_LM74202_TPS7E81_Q1,
  TemperatureSensor_LM50HV_Q1,
  RadarClock_FW4000044Q,
  RADAR_FRONT_END_INTERFACE_NETS,
  RadarFrontEndProcessing_TIDEP01024,
  RadarQspiFlash_MX25V1635FZNQ,
  RadarSoc_AWR1843ARBGALPQ1,
};

export const TiChipComponents = {
  AM62L32,
  AWR1843ARBGALPQ1,
  BQ24072,
  BQ24073,
  BQ24074,
  BQ25895,
  BQ25731RSN,
  BQ294700DSG,
  BQ40Z60RHB,
  BQ27441G1,
  BQ32002,
  CC2340R5,
  CC2564C,
  CC2745R10,
  CC3235SF,
  CHS01TA,
  DAC101C081Q,
  DRV8210,
  DRV8833,
  DRV8876,
  FW4000044Q,
  HDC2080,
  HDC3020,
  HDC3022,
  INA237,
  INA350,
  ISOW7841,
  LM74202Q1,
  LM50HVQ1,
  LMK1C1104,
  LP5892Q1,
  MSP430G2230ID,
  MSP430G2332IPW20,
  MSP430F5229,
  MSPM0L1306,
  MSPM33C3x,
  MSPM0G3507,
  MX25V1635FZNQ,
  OPT3001,
  PGA300ARHHR,
  SN65HVD1473,
  TAS2505,
  TCAN1042HGV,
  TLC59116,
  TLV316,
  TLV755P,
  TLV9152IDR,
  TMP1827,
  TMP1075,
  TPS22919,
  TPS6293,
  TPS61222,
  TPS61236RWLR,
  TPS61288RQQR,
  TPS61299X,
  TPS6521835,
  TPS63802,
  TPS7A02,
  TPS7A20,
  TPS7E81Q1,
  TPS78230DRVR,
  TPS92638,
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
  BatteryManagement_2to4Cell_BQ40Z60,
  RealTimeClock_BQ32002,
  WirelessMCU_CC2340R5,
  BluetoothController_CC2564C,
  WirelessMCU_CC2745R10,
  WirelessMCU_CC3235SF,
  MotorDriver_DRV8210,
  MotorDriver_DRV8833,
  MotorDriver_DRV8876,
  EnvironmentalSensor_HDC2080,
  EnvironmentalSensor_HDC3020,
  EnvironmentalSensor_HDC3022,
  PowerMonitor_INA237,
  InstrumentationAmplifier_INA350,
  PressureTransmitter_PGA300,
  IsolatedRS485_ISOW7841,
  ClockBuffer_LMK1C1104,
  AudioAmplifier_TAS2505,
  TargetSocket_MSPTS430D8,
  BluetoothAudioHost_MSP430F5229,
  Microcontroller_MSPM0L1306,
  Microcontroller_MSPM0G3507,
  Microcontroller_MSPM33C3x,
  LEDDriver_TLC59116,
  OutputUserInterface_LEDMatrix_LP5892_Q1,
  TemperatureSensor_TMP1075,
  TemperatureSensor_TMP1827,
  LoadSwitch_TPS22919,
  BuckConverter_TPS62933,
  BoostConverter_TPS61299X,
  PowerManagement_TPS6521835,
  BuckBoostConverter_TPS63802,
  PowerManagement_TPS7A02,
  PowerManagement_TPS7A20,
  PowerManagement_TPS7A2018,
  PowerManagement_TPS7A2028,
  PowerManagement_TLV755P,
  PowerModule_TPSM82823,
  LevelShifter_TXB0104,
  LevelShifter_TXS0102,
  RFIDReader_TRF7960,
  FlashMemory_W25Q128JVSIQ,
  BatteryCharging_2to5CellNVDCBuckBoost_BQ25731,
  BoostConverter_TPS61236,
  Microcontroller_MSP430G2332,
  USBC_PowerDeliveryProgrammablePowerSupply_TPS61288,
  CommunicationInterface_TCAN1042_TIDA01428,
  ElectrochromicMirrorDriver_TIDA01539,
  LampDriver_TPS92638_TIDA00356,
  LightSensor_OPT3001_TIDA01539,
  PowerSupply_LM74202_TPS7E81_Q1,
  TemperatureSensor_LM50HV_Q1,
  RadarClock_FW4000044Q,
  RadarFrontEndProcessing_TIDEP01024,
  RadarQspiFlash_MX25V1635FZNQ,
  RadarSoc_AWR1843ARBGALPQ1,
} as const;

export type TiChipName = keyof typeof TiChipComponents;
export type TiChipComponent = (typeof TiChipComponents)[TiChipName];
export type TiSubcircuitName = keyof typeof TiSubcircuitComponents;
export type TiSubcircuitComponent =
  (typeof TiSubcircuitComponents)[TiSubcircuitName];
