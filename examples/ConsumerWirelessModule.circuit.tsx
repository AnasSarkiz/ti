import {
  BuckConverter_TPS62086_TIDA00399,
  InputOutputProtection_TPD2E009_TIDA00399,
  InputPowerProtection_TPS25910_TIDA00890,
  LogicBuffer_SN74LVC1G34,
  LVDSDriver_SN65LVDS31_TIDA060017,
  TemperatureSensor_TMP103_TIDA00399,
  WirelessAntenna_W3006_TIDCWL1837MODCOM8I,
} from "@tsci/tscircuit.ti";
import "tscircuit";

/** Consumer wireless module assembled from the seven reusable TI blocks. */
export default () => (
  <board routingDisabled>
    <schematicsheet
      name="input_power_protection"
      displayName="Input Power Protection"
      sheetIndex={0}
    />
    <schematicsheet
      name="dc_dc_power_supply"
      displayName="DC/DC Power Supply"
      sheetIndex={1}
    />
    <schematicsheet
      name="io_connection"
      displayName="Input/Output Connection"
      sheetIndex={2}
    />
    <schematicsheet
      name="wireless_connectivity"
      displayName="Wireless Connectivity"
      sheetIndex={3}
    />
    <schematicsheet
      name="io_protection"
      displayName="Input/Output Protection"
      sheetIndex={4}
    />
    <schematicsheet
      name="logic_control"
      displayName="Logic and Control"
      sheetIndex={5}
    />
    <schematicsheet name="sensors" displayName="Sensors" sheetIndex={6} />

    <net name="VBUS_IN" isPowerNet />
    <net name="LOGIC_IN" />
    <net name="CONNECTOR_P" />
    <net name="CONNECTOR_N" />
    <net name="I2C_SCL" />
    <net name="I2C_SDA" />
    <net name="RF_ANT1" />

    <InputPowerProtection_TPS25910_TIDA00890
      name="input_power_protection"
      schSheetName="input_power_protection"
    />
    <BuckConverter_TPS62086_TIDA00399
      name="dc_dc_power_supply"
      schSheetName="dc_dc_power_supply"
    />
    <LVDSDriver_SN65LVDS31_TIDA060017
      name="io_connection"
      schSheetName="io_connection"
    />
    <WirelessAntenna_W3006_TIDCWL1837MODCOM8I
      name="wireless_connectivity"
      schSheetName="wireless_connectivity"
    />
    <InputOutputProtection_TPD2E009_TIDA00399
      name="io_protection"
      schSheetName="io_protection"
    />
    <LogicBuffer_SN74LVC1G34
      name="logic_control"
      schSheetName="logic_control"
    />
    <TemperatureSensor_TMP103_TIDA00399 name="sensors" schSheetName="sensors" />

    {/* External protected-input source and 5 V rail into the buck stage. */}
    <trace from=".input_power_protection > .R25 > .pin1" to="net.VBUS_IN" />
    <trace
      from=".input_power_protection > .U7 > .IN1"
      to=".dc_dc_power_supply > .U3P3 > .VIN"
    />
    <trace
      from=".input_power_protection > .U7 > .IN1"
      to=".dc_dc_power_supply > .U3P3 > .EN"
    />
    <trace
      from=".input_power_protection > .U7 > .GND1"
      to=".dc_dc_power_supply > .U3P3 > .GND"
    />

    {/* The 3.3 V buck output powers the sensor, logic and LVDS blocks. */}
    <trace
      from=".dc_dc_power_supply > .L3P3 > .pin2"
      to=".sensors > .UTMP > .V_PLUS"
    />
    <trace
      from=".dc_dc_power_supply > .U3P3 > .GND"
      to=".sensors > .UTMP > .GND"
    />
    <trace
      from=".dc_dc_power_supply > .L3P3 > .pin2"
      to=".logic_control > net.VCC"
    />
    <trace
      from=".dc_dc_power_supply > .U3P3 > .GND"
      to=".logic_control > net.GND"
    />
    <trace
      from=".dc_dc_power_supply > .L3P3 > .pin2"
      to=".io_connection > .U1 > .VCC"
    />
    <trace
      from=".dc_dc_power_supply > .L3P3 > .pin2"
      to=".io_connection > .U1 > .ENABLE"
    />
    <trace
      from=".dc_dc_power_supply > .U3P3 > .GND"
      to=".io_connection > .U1 > .GND"
    />
    <trace
      from=".dc_dc_power_supply > .U3P3 > .GND"
      to=".io_connection > .U1 > .ENABLE_NOT"
    />

    {/* Buffered control feeds one LVDS channel and its protected connector. */}
    <trace from=".logic_control > net.MCU_OR_LOGIC_IN" to="net.LOGIC_IN" />
    <trace
      from=".logic_control > net.MCU_OR_LOGIC_OUT"
      to=".io_connection > .U1 > .IN1"
    />
    <trace
      from=".io_connection > .U1 > .OUT1_P"
      to=".io_protection > .UESD > .D1"
    />
    <trace
      from=".io_connection > .U1 > .OUT1_N"
      to=".io_protection > .UESD > .D2"
    />
    <trace
      from=".io_connection > .U1 > .GND"
      to=".io_protection > .UESD > .GND"
    />
    <trace from=".io_protection > .UESD > .D1" to="net.CONNECTOR_P" />
    <trace from=".io_protection > .UESD > .D2" to="net.CONNECTOR_N" />

    {/* External sensor bus and radio feed complete the module interfaces. */}
    <trace from=".sensors > .UTMP > .SCL" to="net.I2C_SCL" />
    <trace from=".sensors > .UTMP > .SDA" to="net.I2C_SDA" />
    <trace
      from=".dc_dc_power_supply > .U3P3 > .GND"
      to=".wireless_connectivity > net.GND"
    />
    <trace from=".wireless_connectivity > .C5 > .pin1" to="net.RF_ANT1" />
  </board>
);
