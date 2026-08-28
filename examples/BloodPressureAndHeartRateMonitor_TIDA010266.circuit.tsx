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

const SectionTitle = ({
  title,
  schX,
  schY,
}: {
  title: string;
  schX: number;
  schY: number;
}) => (
  <schematictext
    text={title}
    schX={schX}
    schY={schY}
    fontSize={0.42}
    color="#000000"
  />
);

/**
 * Complete TIDA-010266 low-cost blood-pressure and heart-rate monitor.
 *
 * Electrical values, reference designators, jumper topology, test points,
 * programming interface, pressure signal chain, and pump/valve driver follow
 * TI TIDUF53 Figure 4-1 and the TIDMCH8/TIDMCH9 design files.
 */
export default () => (
  <board
    routingDisabled
    schSheetName="main"
    schTraceAutoLabelEnabled={false}
    schMaxTraceDistance="1000mm"
  >
    <schematicsheet
      name="main"
      displayName="TIDA-010266"
      sheetIndex={0}
      sheetWidth="660mm"
      sheetHeight="410mm"
    />
    {/* Native section metadata drives divider placement and section-aware routing. */}
    <schematicsection name="input_reference" displayName="" />
    <schematicsection name="connectors" displayName="" />
    <schematicsection name="jumpers" displayName="" />
    <schematicsection name="test_points" displayName="" />
    <schematicsection name="programming" displayName="" />
    <schematicsection name="ina_filter" displayName="" />
    <schematicsection name="mcu" displayName="" />
    <schematicsection name="pressure_sensor" displayName="" />
    <schematicsection name="adc_filter" displayName="" />
    <schematicsection name="motor_driver" displayName="" />

    {/* A visually empty DNP anchor keeps the MCU and INA baselines aligned. */}
    <chip
      name="MCU_SECTION_BASELINE"
      manufacturerPartNumber="section-layout-anchor"
      doNotPlace
      schSectionName="mcu"
      schX={20.5}
      schY={-7}
      pinLabels={{ pin1: "ANCHOR" }}
      symbol={
        <symbol>
          <schematicpath
            points={[
              { x: -0.005, y: 0 },
              { x: 0.005, y: 0 },
            ]}
            strokeWidth={0}
          />
        </symbol>
      }
    />

    {/* Continue native dividers from their exact endpoints to the sheet border. */}
    <schematicline
      x1={33.9}
      y1={11.2125}
      x2={35.2}
      y2={11.2125}
      strokeWidth={0.02}
      color="#000000"
      isDashed
    />
    <schematicline
      x1={33.9}
      y1={-8.65}
      x2={35.2}
      y2={-8.65}
      strokeWidth={0.02}
      color="#000000"
      isDashed
    />
    <schematicline
      x1={4.7}
      y1={20.6}
      x2={4.7}
      y2={21.65}
      strokeWidth={0.02}
      color="#000000"
      isDashed
    />
    <schematicline
      x1={9.725}
      y1={20.6}
      x2={9.725}
      y2={21.65}
      strokeWidth={0.02}
      color="#000000"
      isDashed
    />
    <schematicline
      x1={-12.625}
      y1={-17.9}
      x2={-12.625}
      y2={-21.65}
      strokeWidth={0.02}
      color="#000000"
      isDashed
    />
    <schematicline
      x1={6.85625}
      y1={-17.9}
      x2={6.85625}
      y2={-21.65}
      strokeWidth={0.02}
      color="#000000"
      isDashed
    />

    {/* Centered titles sit inside, rather than directly on, each top divider. */}
    <SectionTitle title="Input + Reference" schX={-15.4} schY={21.05} />
    <SectionTitle title="Connectors" schX={7.2} schY={21.05} />
    <SectionTitle title="Jumpers" schX={-23.8} schY={14.15} />
    <SectionTitle title="Test Points" schX={-4.3} schY={14.15} />
    <SectionTitle title="Programming" schX={20.5} schY={21.1} />
    <SectionTitle title="INA + Filter" schX={-15.5} schY={6.8} />
    <SectionTitle title="MCU" schX={20.5} schY={8} />
    <SectionTitle title="Pressure Sensor" schX={-24.5} schY={-9} />
    <SectionTitle title="ADC Filter" schX={-4} schY={-9} />
    <SectionTitle title="Motor Driver" schX={20.5} schY={-9} />

    <PowerManagement_TPS7A2433_TIDA010266
      name="power"
      schSectionName="input_reference"
      schX={-23}
      schY={17}
    />
    <VoltageReference_ATL431LI_TIDA010266
      name="reference_2v5"
      schSectionName="input_reference"
      schX={-15}
      schY={17}
    />
    <InterfacesSection
      name="interfaces"
      inputSectionName="input_reference"
      connectorSectionName="connectors"
      jumperSectionName="jumpers"
      testPointSectionName="test_points"
      inaFilterSectionName="ina_filter"
      schX={-4}
      schY={17}
    />
    <ProgrammingSection
      name="programming"
      schSectionName="programming"
      schX={21}
      schY={17}
    />

    <InstrumentationAmplifier_INA350
      name="external_ina"
      schSectionName="ina_filter"
      chipName="U5"
      bypassCapacitorName="C13"
      gain="external"
      shutdown="external"
      inlineNetLabels
      schematicStyle="box"
      supplyNetName="V3_3"
      schX={-25}
      schY={-2.5}
    />
    <IntegratedInstrumentationAmplifierSection
      name="integrated_ina"
      schSectionName="ina_filter"
      schX={-20}
      schY={3}
    />
    <AnalogSignalConditioning_LMV324A_TIDA010266
      name="analog_front_end"
      schSectionName="ina_filter"
      inputReferenceSectionName="input_reference"
      pressureSectionName="pressure_sensor"
      schX={-4}
      schY={2}
    />
    <Microcontroller_MSPM0L1306_TIDA010266
      name="microcontroller"
      schSectionName="mcu"
      schX={21}
      schY={2}
    />

    <PressureSensorSection
      name="pressure_sensor"
      schSectionName="pressure_sensor"
      schX={-22}
      schY={-15}
    />
    <ADCFilterSection
      name="adc_filter"
      schSectionName="adc_filter"
      schX={-6}
      schY={-15}
    />
    <MotorDriver_DRV8210_TIDA010266
      name="motor_driver"
      schSectionName="motor_driver"
      schX={21}
      schY={-13}
    />

    {/* R23 is intentionally not populated in TI's released assembly. */}
    <resistor
      name="R23"
      schSectionName="ina_filter"
      resistance="0"
      footprint="0402"
      doNotPlace
      schX={-29}
      schY={-3.3}
      connections={{
        pin1: "net.SHDN",
        pin2: "net.GND",
      }}
    />
    <trace from=".external_ina > .SHDN" to="net.SHDN" />
    <netlabel net="SHDN" connectsTo=".R23 > .pin1" inline />
    <netlabel net="GND" connectsTo=".R23 > .pin2" anchorSide="top" />

    {/* Input, regulated rails, buffered references, and the common return. */}
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
    <trace from=".interfaces > .GND" to="net.GND" />

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

    {/* Sensor drive/feedback and both selectable instrumentation paths. */}
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

    {/* Shared pressure signal, oscillometric filter output, and ADC filters. */}
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

    {/* UART, GPIO expansion, and SWD programming connections. */}
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

    {/* MCU control of the DRV8210 pump and valve channels. */}
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
