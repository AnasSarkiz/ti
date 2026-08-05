import {
  AudioAmplifier_TAS2505,
  BatteryManagement_BQ24074,
  BluetoothAudioHost_MSP430F5229,
  BluetoothController_CC2564C,
  PowerManagement_TPS7A2018,
} from "@tsci/tscircuit.ti";
import "tscircuit";

/**
 * Complete Bluetooth speaker example built from the reusable TI subcircuits.
 *
 * The signal topology follows TI's BT-MSP-AUDSINK reference design. The
 * MSP430 runs from the shared 1.8 V rail in this battery-powered example.
 */
export default () => (
  <board routingDisabled>
    <schematicsheet
      name="battery_and_charger"
      displayName="Li-ion Battery and Charger"
      sheetIndex={0}
    />
    <schematicsheet name="power_1v8" displayName="1.8 V Power" sheetIndex={1} />
    <schematicsheet
      name="bluetooth_controller"
      displayName="CC2564C Bluetooth Controller"
      sheetIndex={2}
    />
    <schematicsheet
      name="bluetooth_host"
      displayName="MSP430 Bluetooth Audio Host"
      sheetIndex={3}
    />
    <schematicsheet
      name="audio_amplifier"
      displayName="TAS2505 Audio Amplifier and Speaker"
      sheetIndex={4}
    />

    <BatteryManagement_BQ24074
      name="charger"
      schSheetName="battery_and_charger"
    />
    <PowerManagement_TPS7A2018 name="power_1v8" schSheetName="power_1v8" />
    <BluetoothController_CC2564C
      name="bluetooth_controller"
      schSheetName="bluetooth_controller"
    />
    <BluetoothAudioHost_MSP430F5229
      name="bluetooth_host"
      schSheetName="bluetooth_host"
    />
    <AudioAmplifier_TAS2505
      name="audio_amplifier"
      schSheetName="audio_amplifier"
    />

    {/* Charger output and the always-on 1.8 V regulator. */}
    <trace from=".charger > .U1 > .OUT" to=".power_1v8 > .U1 > .VIN" />
    <trace from=".charger > .U1 > .OUT" to=".power_1v8 > .U1 > .VEN" />

    {/* Battery/system rail for the Bluetooth radio and speaker power stage. */}
    <trace
      from=".charger > .U1 > .OUT"
      to=".bluetooth_controller > .U1A > .MLDO_IN"
    />
    <trace from=".charger > .U1 > .OUT" to=".audio_amplifier > .U1 > .SPKVDD" />

    {/* 1.8 V logic, MCU, oscillator, codec and I2C pull-up supplies. */}
    <trace
      from=".power_1v8 > .U1 > .VOUT"
      to=".bluetooth_controller > .U1A > .VDD_IO"
    />
    <trace
      from=".power_1v8 > .U1 > .VOUT"
      to=".bluetooth_controller > .Y1 > .VCC"
    />
    <trace
      from=".power_1v8 > .U1 > .VOUT"
      to=".bluetooth_host > .U10 > .DVIO"
    />
    <trace
      from=".power_1v8 > .U1 > .VOUT"
      to=".bluetooth_host > .U10 > .DVCC"
    />
    <trace
      from=".power_1v8 > .U1 > .VOUT"
      to=".audio_amplifier > .U1 > .AVDD"
    />
    <trace
      from=".power_1v8 > .U1 > .VOUT"
      to=".audio_amplifier > .U1 > .DVDD"
    />
    <trace
      from=".power_1v8 > .U1 > .VOUT"
      to=".audio_amplifier > .U1 > .IOVDD"
    />
    <trace
      from=".power_1v8 > .U1 > .VOUT"
      to=".audio_amplifier > .R1 > .pin1"
    />

    {/* Common ground across all five reusable subcircuits. */}
    <trace from=".charger > .U1 > .VSS" to=".power_1v8 > .U1 > .GND" />
    <trace
      from=".charger > .U1 > .VSS"
      to=".bluetooth_controller > .U1A > .GND"
    />
    <trace from=".charger > .U1 > .VSS" to=".bluetooth_host > .U10 > .DVSS" />
    <trace from=".charger > .U1 > .VSS" to=".audio_amplifier > .U1 > .AVSS" />

    {/* CC2564C HCI UART and control interface to the MSP430 host. */}
    <trace
      from=".bluetooth_controller > .U1A > .HCI_TX"
      to=".bluetooth_host > .U10 > .UART_RXD"
    />
    <trace
      from=".bluetooth_controller > .U1A > .HCI_RX"
      to=".bluetooth_host > .U10 > .UART_TXD"
    />
    <trace
      from=".bluetooth_controller > .U1A > .HCI_RTS"
      to=".bluetooth_host > .U10 > .P1_4"
    />
    <trace
      from=".bluetooth_controller > .U1A > .HCI_CTS"
      to=".bluetooth_host > .U10 > .P1_5"
    />
    <trace
      from=".bluetooth_controller > .U1A > .N_SHUTD"
      to=".bluetooth_host > .U10 > .P1_7"
    />
    <trace
      from=".bluetooth_controller > .U1A > .SLOW_CLK"
      to=".bluetooth_host > .R10 > .pin2"
    />

    {/* MSP430 control interface to the TAS2505. */}
    <trace
      from=".bluetooth_host > .U10 > .I2C_SCL"
      to=".audio_amplifier > .U1 > .SCL"
    />
    <trace
      from=".bluetooth_host > .U10 > .I2C_SDA"
      to=".audio_amplifier > .U1 > .SDA"
    />
    <trace
      from=".bluetooth_host > .U10 > .P2_0"
      to=".audio_amplifier > .U1 > .N_RST"
    />

    {/* CC2564C PCM/I2S output to the TAS2505 digital audio input. */}
    <trace
      from=".bluetooth_controller > .U1A > .AUD_CLK"
      to=".audio_amplifier > .U1 > .BCLK"
    />
    <trace
      from=".bluetooth_controller > .U1A > .AUD_CLK"
      to=".audio_amplifier > .U1 > .MCLK"
    />
    <trace
      from=".bluetooth_controller > .U1A > .AUD_FSYNC"
      to=".audio_amplifier > .U1 > .WCLK"
    />
    <trace
      from=".bluetooth_controller > .U1A > .AUD_OUT"
      to=".audio_amplifier > .U1 > .DIN"
    />
  </board>
);
