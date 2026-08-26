import {
  BatteryCharging_2to5CellNVDCBuckBoost_BQ25731,
  BatteryManagement_2to4Cell_BQ40Z60,
  BoostConverter_TPS61236,
  Microcontroller_MSP430G2332,
  USBC_PowerDeliveryProgrammablePowerSupply_TPS61288,
} from "@tsci/tscircuit.ti";
import "tscircuit";

export default () => (
  <board routingDisabled>
    <schematicsheet
      name="battery_management"
      displayName="2-to-4-Cell Battery Management"
      sheetIndex={0}
    />
    <schematicsheet
      name="battery_charging"
      displayName="2-to-5-Cell Buck-Boost Battery Charging"
      sheetIndex={1}
    />
    <schematicsheet
      name="system_power"
      displayName="3 V System Power"
      sheetIndex={2}
    />
    <schematicsheet
      name="microcontroller"
      displayName="Power-Bank Microcontroller"
      sheetIndex={3}
    />
    <schematicsheet
      name="usb_c_output"
      displayName="USB-C Programmable Power Supply"
      sheetIndex={4}
    />

    <net name="SCL" />
    <net name="SDA" />

    <BatteryManagement_2to4Cell_BQ40Z60
      name="battery_management"
      schSheetName="battery_management"
      schX={1.5}
      schY={-2}
    />
    <BatteryCharging_2to5CellNVDCBuckBoost_BQ25731
      name="battery_charging"
      schSheetName="battery_charging"
    />
    <BoostConverter_TPS61236
      name="system_power"
      schSheetName="system_power"
      schX={5.5}
      schY={-3.5}
    />
    <Microcontroller_MSP430G2332
      name="microcontroller"
      schSheetName="microcontroller"
      schX={4.5}
      schY={2.9}
    />
    <USBC_PowerDeliveryProgrammablePowerSupply_TPS61288
      name="usb_c_output"
      schSheetName="usb_c_output"
    />

    <trace
      from=".battery_management > .C2 > .pin2"
      to=".battery_charging > .C31 > .pin1"
    />
    <trace
      from=".battery_charging > .C31 > .pin2"
      to=".system_power > .J1 > .pin1"
    />
    <trace
      from=".battery_charging > .C31 > .pin2"
      to=".usb_c_output > .J1 > .pin1"
    />
    <trace
      from=".system_power > .C2 > .pin1"
      to=".microcontroller > .U2 > .pin6"
    />

    <trace
      from=".battery_charging > .U1 > .pin27"
      to=".battery_management > .C3 > .pin2"
    />
    <trace
      from=".battery_charging > .U1 > .pin27"
      to=".system_power > .C2 > .pin2"
    />
    <trace
      from=".battery_charging > .U1 > .pin27"
      to=".microcontroller > .U4 > .pin20"
    />
    <trace
      from=".battery_charging > .U1 > .pin27"
      to=".usb_c_output > .C29 > .pin2"
    />

    <trace from=".microcontroller > .U4 > .pin14" to="net.SCL" />
    <trace from=".battery_charging > .U1 > .pin13" to="net.SCL" />
    <trace from=".battery_management > .U2 > .pin17" to="net.SCL" />
    <trace from=".battery_management > .U2 > .pin16" to="net.SDA" />
    <trace from=".battery_charging > .U1 > .pin12" to="net.SDA" />
    <trace from=".microcontroller > .U4 > .pin15" to="net.SDA" />

    <trace
      from=".microcontroller > .U4 > .pin12"
      to=".system_power > .Q2 > .gate"
    />
    <trace
      from=".microcontroller > .U4 > .pin13"
      to=".system_power > .Q1 > .gate"
    />
  </board>
);
