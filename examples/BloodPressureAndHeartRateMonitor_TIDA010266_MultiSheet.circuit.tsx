import {
  AnalogSignalConditioning_LMV324A_TIDA010266,
  InstrumentationAmplifier_INA350,
  Microcontroller_MSPM0L1306_TIDA010266,
  MotorDriver_DRV8210_TIDA010266,
  PowerManagement_TPS7A2433_TIDA010266,
  VoltageReference_ATL431LI_TIDA010266,
} from "@tsci/tscircuit.ti";
import "tscircuit";
import { ADCFilterSection } from "./tida010266/ADCFilterSection.tsx";
import { IntegratedInstrumentationAmplifierSection } from "./tida010266/IntegratedInstrumentationAmplifierSection.tsx";
import { InterfacesSection } from "./tida010266/InterfacesSection.tsx";
import { PressureSensorSection } from "./tida010266/PressureSensorSection.tsx";
import { ProgrammingSection } from "./tida010266/ProgrammingSection.tsx";

/**
 * TIDA-010266 organized as one schematic sheet per functional section.
 *
 * This mirrors the multi-sheet composition used by the Personal Electronics
 * Power Bank example while reusing the same released-design subcircuits as the
 * single-sheet, reference-layout example.
 */
export default () => (
  <board
    routingDisabled
    schTraceAutoLabelEnabled={false}
    schMaxTraceDistance="1000mm"
  >
    <schematicsheet
      name="input_reference"
      displayName="Input + Reference"
      sheetIndex={0}
    />
    <schematicsheet
      name="interfaces"
      displayName="Connectors + Jumpers + Test Points"
      sheetIndex={1}
    />
    <group schSheetName="interfaces">
      <schematictext
        text="Connectors"
        schX={-10.5}
        schY={8.4}
        fontSize={0.42}
        color="#000000"
      />
      <schematictext
        text="Jumpers"
        schX={0}
        schY={8.4}
        fontSize={0.42}
        color="#000000"
      />
      <schematictext
        text="Test Points"
        schX={10.5}
        schY={8.4}
        fontSize={0.42}
        color="#000000"
      />
      <schematicline
        x1={-5.25}
        y1={7.7}
        x2={-5.25}
        y2={-8.5}
        strokeWidth={0.02}
        color="#000000"
        isDashed
      />
      <schematicline
        x1={5.25}
        y1={7.7}
        x2={5.25}
        y2={-8.5}
        strokeWidth={0.02}
        color="#000000"
        isDashed
      />
    </group>
    <schematicsheet
      name="programming"
      displayName="Programming"
      sheetIndex={2}
    />
    <schematicsheet
      name="ina_filter"
      displayName="INA + Filter"
      sheetIndex={3}
    />
    <schematicsheet name="mcu" displayName="MCU" sheetIndex={4} />
    <schematicsheet
      name="pressure_sensor"
      displayName="Pressure Sensor + ADC Filter"
      sheetIndex={5}
    />
    <group schSheetName="pressure_sensor">
      <schematictext
        text="Pressure Sensor"
        schX={-6.5}
        schY={8.4}
        fontSize={0.42}
        color="#000000"
      />
      <schematictext
        text="ADC Filter"
        schX={9}
        schY={8.4}
        fontSize={0.42}
        color="#000000"
      />
      <schematicline
        x1={3}
        y1={7.7}
        x2={3}
        y2={-8.5}
        strokeWidth={0.02}
        color="#000000"
      />
    </group>
    <schematicsheet
      name="motor_driver"
      displayName="Motor Driver"
      sheetIndex={6}
    />

    <PowerManagement_TPS7A2433_TIDA010266
      name="power"
      schSheetName="input_reference"
      schX={-8}
    />
    <VoltageReference_ATL431LI_TIDA010266
      name="reference_2v5"
      schSheetName="input_reference"
    />
    <InterfacesSection
      name="interfaces"
      subcircuit
      schTraceAutoLabelEnabled
      schMaxTraceDistance="5mm"
      inputSheetName="input_reference"
      connectorSheetName="interfaces"
      jumperSheetName="interfaces"
      testPointSheetName="interfaces"
      inaFilterSheetName="ina_filter"
      interfaceColumnLayout
      inputSchXOffset={15.8}
      connectorSchXOffset={-22.3}
      connectorSchYOffset={2.2}
      jumperSchXOffset={20}
      jumperSchYOffset={6}
      testPointSchXOffset={10.5}
      testPointSchYOffset={6}
      inaFilterSchXOffset={10.5}
      inaFilterSchYOffset={14.5}
    />
    <ProgrammingSection name="programming" schSheetName="programming" />

    <InstrumentationAmplifier_INA350
      name="external_ina"
      schSheetName="ina_filter"
      chipName="U5"
      bypassCapacitorName="C13"
      gain="external"
      shutdown="external"
      inlineNetLabels
      schematicStyle="box"
      supplyNetName="V3_3"
      schX={-8.5}
      schY={-2}
    />
    <IntegratedInstrumentationAmplifierSection
      name="integrated_ina"
      schSheetName="ina_filter"
      schX={-8}
      schY={3}
    />
    <AnalogSignalConditioning_LMV324A_TIDA010266
      name="analog_front_end"
      schSheetName="ina_filter"
      inputReferenceSheetName="input_reference"
      pressureSheetName="pressure_sensor"
      inputReferenceSchXOffset={-1}
      inputReferenceSchYOffset={-15}
      pressureSchXOffset={6}
      pressureSchYOffset={16.5}
      filterSchXOffset={-2}
      schX={5}
      schY={0}
    />
    <Microcontroller_MSPM0L1306_TIDA010266
      name="microcontroller"
      schSheetName="mcu"
      schX={3.5}
      schY={-1.5}
    />
    <PressureSensorSection
      name="pressure_sensor"
      subcircuit
      schMaxTraceDistance="6mm"
      schSheetName="pressure_sensor"
      schX={-5.5}
    />
    <ADCFilterSection
      name="adc_filter"
      subcircuit
      schMaxTraceDistance="6mm"
      schSheetName="pressure_sensor"
      schX={8}
    />
    <MotorDriver_DRV8210_TIDA010266
      name="motor_driver"
      schSheetName="motor_driver"
    />

    <resistor
      name="R23"
      schSheetName="ina_filter"
      resistance="0"
      footprint="0402"
      doNotPlace
      schX={-13}
      schY={-4}
      connections={{ pin1: "net.SHDN", pin2: "net.GND" }}
    />
    <trace from=".external_ina > .SHDN" to="net.SHDN" />
    <netlabel net="SHDN" connectsTo=".R23 > .pin1" inline />
    <netlabel net="GND" connectsTo=".R23 > .pin2" anchorSide="top" />

    <trace from=".interfaces > .VIN" to=".power > .VIN" />
    <trace from=".power > .VIN" to=".motor_driver > .VIN" />
    <trace from=".power > .V3_3" to=".reference_2v5 > .V3_3" />
    <trace from=".power > .V3_3" to=".analog_front_end > .V3_3" />
    <trace from=".power > .V3_3" to=".external_ina > .V_POS" />
    <trace from=".power > .V3_3" to=".microcontroller > .V3_3" />
    <trace from=".power > .V3_3" to=".motor_driver > .V3_3" />
    <trace from=".power > .V3_3" to=".programming > .V3_3" />
    <trace from=".power > .V3_3" to=".interfaces > .V3_3" />

    <trace from=".power > .GND" to="net.GND" />
    <trace from=".reference_2v5 > .GND" to="net.GND" />
    <trace from=".analog_front_end > .GND" to="net.GND" />
    <trace from=".external_ina > .V_NEG" to="net.GND" />
    <trace from=".pressure_sensor > .GND" to="net.GND" />
    <trace from=".adc_filter > .GND" to="net.GND" />
    <trace from=".microcontroller > .GND" to="net.GND" />
    <trace from=".motor_driver > .GND" to="net.GND" />
    <trace from=".programming > .GND" to="net.GND" />
    <trace from=".interfaces > .GND" to="net.GND" schDisplayLabel="GND" />

    <trace
      from=".reference_2v5 > .VREF_2_5"
      to=".analog_front_end > .VREF_2_5"
    />
    <trace
      from=".reference_2v5 > .VREF_2_5"
      to=".microcontroller > .VREF_2_5"
    />
    <trace from=".reference_2v5 > .VREF_2_5" to=".interfaces > .VREF_2_5" />
    <trace from=".analog_front_end > .VREF_1_25" to=".external_ina > .REF" />
    <trace
      from=".analog_front_end > .VREF_1_25"
      to=".integrated_ina > .VREF_1_25"
    />

    <trace
      from=".analog_front_end > .SENSOR_DRIVE"
      to=".pressure_sensor > .SENSOR_DRIVE"
      schDisplayLabel=" "
    />
    <trace
      from=".pressure_sensor > .IBIAS_FB"
      to=".analog_front_end > .IBIAS_FB"
    />
    <trace
      from=".pressure_sensor > .BRIDGE_POS"
      to=".interfaces > .BRIDGE_POS"
    />
    <trace
      from=".pressure_sensor > .BRIDGE_NEG"
      to=".interfaces > .BRIDGE_NEG"
    />
    <trace from=".external_ina > .IN_POS" to=".interfaces > .INA_IN_POS" />
    <trace from=".external_ina > .IN_NEG" to=".interfaces > .INA_IN_NEG_PORT" />
    <trace from=".external_ina > .OUT" to=".interfaces > .INA_OUT" />
    <trace from=".external_ina > .GS" to=".interfaces > .INA_GS_PORT" />

    <trace
      from=".integrated_ina > .OPA0_IN0_NEG"
      to=".microcontroller > .OPA0_IN0_NEG"
    />
    <trace
      from=".integrated_ina > .OPA0_IN0_POS"
      to=".microcontroller > .OPA0_IN0_POS"
    />
    <trace
      from=".integrated_ina > .OPA0_OUT_PORT"
      to=".microcontroller > .OPA0_OUT"
    />
    <trace
      from=".integrated_ina > .OPA1_IN0_NEG"
      to=".microcontroller > .OPA1_IN0_NEG"
    />
    <trace
      from=".integrated_ina > .OPA1_IN0_POS_PORT"
      to=".microcontroller > .OPA1_IN0_POS"
    />
    <trace
      from=".integrated_ina > .OPA1_OUT"
      to=".microcontroller > .OPA1_OUT"
    />
    <trace
      from=".integrated_ina > .OPA0_OUT_PORT"
      to=".integrated_ina > .OPA0_OUT_R12"
    />
    <trace
      from=".integrated_ina > .OPA0_OUT_PORT"
      to=".integrated_ina > .OPA0_OUT_R15"
    />
    <trace
      from=".microcontroller > .OPA0_IN0_POS"
      to=".interfaces > .OPA0_IN0_POS"
    />
    <trace
      from=".microcontroller > .OPA1_IN0_POS"
      to=".interfaces > .OPA1_IN0_POS"
    />
    <trace from=".microcontroller > .OPA1_OUT" to=".interfaces > .OPA1_OUT" />

    <trace from=".interfaces > .PRESSURE" to=".analog_front_end > .PRESSURE" />
    <trace from=".interfaces > .PRESSURE" to=".adc_filter > .PRESSURE" />
    <trace
      from=".analog_front_end > .OSCILLATIONS"
      to=".interfaces > .OSCILLATIONS"
    />
    <trace
      from=".analog_front_end > .OSCILLATIONS"
      to=".adc_filter > .OSCILLATIONS"
    />
    <trace
      from=".adc_filter > .ADC_PRESSURE"
      to=".microcontroller > .ADC_PRESSURE"
    />
    <trace
      from=".adc_filter > .ADC_OSCILLATIONS"
      to=".microcontroller > .ADC_OSCILLATIONS"
    />

    <trace from=".microcontroller > .SDA" to=".interfaces > .SDA" />
    <trace from=".microcontroller > .SCL" to=".interfaces > .SCL" />
    <trace from=".microcontroller > .SPI0_CS" to=".interfaces > .SPI0_CS" />
    <trace from=".microcontroller > .PA3" to=".interfaces > .PA3" />
    <trace from=".microcontroller > .SPI0_POCI" to=".interfaces > .SPI0_POCI" />
    <trace from=".microcontroller > .SPI0_PICO" to=".interfaces > .SPI0_PICO" />
    <trace from=".microcontroller > .SPI_SCLK" to=".interfaces > .SPI_SCLK" />
    <trace from=".microcontroller > .PA7" to=".interfaces > .PA7" />
    <trace from=".microcontroller > .PA10" to=".interfaces > .PA10" />
    <trace from=".microcontroller > .PA11" to=".interfaces > .PA11" />
    <trace from=".microcontroller > .UART_RX" to=".interfaces > .UART_RX" />
    <trace from=".microcontroller > .UART_TX" to=".interfaces > .UART_TX" />
    <trace from=".microcontroller > .UART_CTS" to=".interfaces > .UART_CTS" />
    <trace from=".microcontroller > .UART_RTS" to=".interfaces > .UART_RTS" />
    <trace from=".microcontroller > .RST" to=".programming > .RST" />
    <trace from=".microcontroller > .SWDIO" to=".programming > .SWDIO" />
    <trace from=".microcontroller > .SWCLK" to=".programming > .SWCLK" />
    <trace
      from=".microcontroller > .PUMP_CONTROL"
      to=".motor_driver > .PUMP_CONTROL"
    />
    <trace
      from=".microcontroller > .VALVE_CONTROL"
      to=".motor_driver > .VALVE_CONTROL"
    />
  </board>
);
