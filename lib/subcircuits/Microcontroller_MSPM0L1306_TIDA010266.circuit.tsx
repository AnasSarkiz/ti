import "tscircuit";
import { Fragment } from "react";
import { MSPM0L1306SRHBR } from "../../imports/MSPM0L1306SRHBR.tsx";
import type { TIDA010266SectionedSubcircuitProps } from "../utils/tida010266/TIDA010266.types.ts";

const inlineMcuNets = [
  { port: "V3_3", pin: "VDD", net: "V3_3", schY: 4 },
  { port: "RST", pin: "NRST", net: "RST", schY: 3.05 },
  { port: "SDA", pin: "PA0", net: "SDA", schY: 2.45 },
  { port: "SCL", pin: "PA1", net: "SCL", schY: 2.25 },
  { port: "SPI0_CS", pin: "PA2", net: "SPI0_CS", schY: 1.9 },
  { port: "PA3", pin: "PA3", net: "PA3", schY: 1.7 },
  { port: "SPI0_POCI", pin: "PA4", net: "SPI0_POCI", schY: 1.5 },
  { port: "SPI0_PICO", pin: "PA5", net: "SPI0_PICO", schY: 1.3 },
  { port: "SPI_SCLK", pin: "PA6", net: "SPI_SCLK", schY: 1.1 },
  { port: "PA7", pin: "PA7", net: "PA7", schY: 0.9 },
  { port: "UART_RX", pin: "PA8", net: "UART_RX", schY: 0.55 },
  { port: "UART_TX", pin: "PA9", net: "UART_TX", schY: 0.35 },
  { port: "PA10", pin: "PA10", net: "PA10", schY: 0.15 },
  { port: "PA11", pin: "PA11", net: "PA11", schY: -0.05 },
  { port: "UART_CTS", pin: "PA12", net: "UART_CTS", schY: -0.25 },
  { port: "UART_RTS", pin: "PA13", net: "UART_RTS", schY: -0.45 },
  {
    port: "PUMP_CONTROL",
    pin: "PA14",
    net: "PUMP_CONTROL",
    schY: -0.8,
  },
  {
    port: "VALVE_CONTROL",
    pin: "PA15",
    net: "VALVE_CONTROL",
    schY: -1,
  },
  { port: "OPA1_OUT", pin: "PA16", net: "OPA1_OUT", schY: -1.35 },
  {
    port: "OPA1_IN0_NEG",
    pin: "PA17",
    net: "OPA1_IN0_NEG",
    schY: -1.55,
  },
  {
    port: "OPA1_IN0_POS",
    pin: "PA18",
    net: "OPA1_IN0_POS",
    schY: -1.75,
  },
  { port: "SWDIO", pin: "PA19", net: "SWDIO", schY: -2.1 },
  { port: "SWCLK", pin: "PA20", net: "SWCLK", schY: -2.3 },
  { port: "OPA0_OUT", pin: "PA22", net: "OPA0_OUT", schY: -2.85 },
  { port: "VREF_2_5", pin: "PA23", net: "VREF_2_5", schY: -3.05 },
  {
    port: "OPA0_IN0_NEG",
    pin: "PA24",
    net: "OPA0_IN0_NEG",
    schY: -3.25,
  },
  {
    port: "OPA0_IN0_POS",
    pin: "PA25",
    net: "OPA0_IN0_POS",
    schY: -3.45,
  },
  {
    port: "ADC_OSCILLATIONS",
    pin: "PA26",
    net: "ADC_OSCILLATIONS",
    schY: -3.8,
  },
  {
    port: "ADC_PRESSURE",
    pin: "PA27",
    net: "ADC_PRESSURE",
    schY: -4,
  },
] as const;

/** TIDA-010266 U4 MCU, supply decoupling, VCORE capacitor, and I2C pull-ups. */
export const Microcontroller_MSPM0L1306_TIDA010266 = (
  props: TIDA010266SectionedSubcircuitProps,
) => {
  const schOriginX = typeof props.schX === "number" ? props.schX : 0;
  const schOriginY = typeof props.schY === "number" ? props.schY : 0;

  return (
    <subcircuit
      {...props}
      schTraceAutoLabelEnabled={false}
      schMaxTraceDistance="1000mm"
    >
      <MSPM0L1306SRHBR
        name="U4"
        schSectionName={props.schSectionName}
        schX={0}
        schY={0}
        schWidth="5.6mm"
        schHeight="9.6mm"
        schPinArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: [
              "VDD",
              "VCORE",
              "NRST",
              "PA0",
              "PA1",
              "PA2",
              "PA3",
              "PA4",
              "PA5",
              "PA6",
              "PA7",
              "PA8",
              "PA9",
              "PA10",
              "PA11",
              "PA12",
              "PA13",
              "PA14",
              "PA15",
              "PA16",
              "PA17",
              "PA18",
              "PA19",
              "PA20",
              "PA21",
              "PA22",
              "PA23",
              "PA24",
              "PA25",
              "PA26",
              "PA27",
            ],
          },
          rightSide: {
            direction: "top-to-bottom",
            pins: ["VSS", "VSS_PAD"],
          },
        }}
        schPinStyle={{
          VCORE: { marginTop: 0.15 },
          NRST: { marginTop: 0.4 },
          PA0: { marginTop: 0.4 },
          PA2: { marginTop: 0.15 },
          PA8: { marginTop: 0.15 },
          PA14: { marginTop: 0.15 },
          PA16: { marginTop: 0.15 },
          PA19: { marginTop: 0.15 },
          PA21: { marginTop: 0.15 },
          PA25: { marginTop: 0.15 },
          PA26: { marginTop: 0.15 },
          VSS: { marginTop: 7.9 },
          VSS_PAD: { marginTop: 0.15 },
        }}
        connections={{
          VDD: "net.V3_3",
          VSS: "net.GND",
          VSS_PAD: "net.GND",
          VCORE: "net.VCORE",
          NRST: "net.RST",
          PA0: "net.SDA",
          PA1: "net.SCL",
          PA2: "net.SPI0_CS",
          PA3: "net.PA3",
          PA4: "net.SPI0_POCI",
          PA5: "net.SPI0_PICO",
          PA6: "net.SPI_SCLK",
          PA7: "net.PA7",
          PA8: "net.UART_RX",
          PA9: "net.UART_TX",
          PA10: "net.PA10",
          PA11: "net.PA11",
          PA12: "net.UART_CTS",
          PA13: "net.UART_RTS",
          PA14: "net.PUMP_CONTROL",
          PA15: "net.VALVE_CONTROL",
          PA16: "net.OPA1_OUT",
          PA17: "net.OPA1_IN0_NEG",
          PA18: "net.OPA1_IN0_POS",
          PA19: "net.SWDIO",
          PA20: "net.SWCLK",
          PA21: "net.GND",
          PA22: "net.OPA0_OUT",
          PA23: "net.VREF_2_5",
          PA24: "net.OPA0_IN0_NEG",
          PA25: "net.OPA0_IN0_POS",
          PA26: "net.ADC_OSCILLATIONS",
          PA27: "net.ADC_PRESSURE",
        }}
      />

      {inlineMcuNets.map(({ port, pin, net, schY }) => (
        <Fragment key={port}>
          <port
            name={port}
            schX={schOriginX - 4}
            schY={schOriginY + schY}
            direction="left"
            connectsTo={`net.${net}`}
          />
          <netlabel net={net} connectsTo={`.U4 > .${pin}`} inline />
        </Fragment>
      ))}
      <port
        name="GND"
        schX={schOriginX + 4}
        schY={schOriginY - 4}
        direction="right"
        connectsTo="net.GND"
      />
      {[
        ".U4 > .VSS",
        ".U4 > .VSS_PAD",
        ".U4 > .PA21",
        ".C6 > .pin2",
        ".C7 > .pin2",
        ".C8 > .pin2",
      ].map((connectsTo) => (
        <Fragment key={`GND-${connectsTo}`}>
          <netlabel net="GND" connectsTo={connectsTo} inline />
        </Fragment>
      ))}
      {[".C6 > .pin1", ".C7 > .pin1", ".R7 > .pin1", ".R8 > .pin1"].map(
        (connectsTo) => (
          <Fragment key={`V3_3-${connectsTo}`}>
            <netlabel net="V3_3" connectsTo={connectsTo} inline />
          </Fragment>
        ),
      )}
      {[".U4 > .VCORE", ".C8 > .pin1"].map((connectsTo) => (
        <Fragment key={`VCORE-${connectsTo}`}>
          <netlabel net="VCORE" connectsTo={connectsTo} inline />
        </Fragment>
      ))}
      <netlabel net="SCL" connectsTo=".R7 > .pin2" inline />
      <netlabel net="SDA" connectsTo=".R8 > .pin2" inline />

      <capacitor
        name="C6"
        schSectionName={props.schSectionName}
        capacitance="10uF"
        maxVoltageRating="10V"
        footprint="0603"
        schX={-7.2}
        schY={6.6}
        schOrientation="vertical"
        connections={{ pin1: "net.V3_3", pin2: "net.GND" }}
      />
      <capacitor
        name="C7"
        schSectionName={props.schSectionName}
        capacitance="100nF"
        maxVoltageRating="25V"
        footprint="0402"
        schX={-5.6}
        schY={6.6}
        schOrientation="vertical"
        connections={{ pin1: "net.V3_3", pin2: "net.GND" }}
      />
      <capacitor
        name="C8"
        schSectionName={props.schSectionName}
        capacitance="0.47uF"
        maxVoltageRating="6.3V"
        footprint="0402"
        schX={-5.6}
        schY={3.7}
        schOrientation="horizontal"
        connections={{ pin1: "net.VCORE", pin2: "net.GND" }}
      />
      <resistor
        name="R7"
        schSectionName={props.schSectionName}
        resistance="10k"
        footprint="0603"
        schX={-9.5}
        schY={3.5}
        schOrientation="vertical"
        connections={{ pin1: "net.V3_3", pin2: "net.SCL" }}
      />
      <resistor
        name="R8"
        schSectionName={props.schSectionName}
        resistance="10k"
        footprint="0603"
        schX={-8}
        schY={3.5}
        schOrientation="vertical"
        connections={{ pin1: "net.V3_3", pin2: "net.SDA" }}
      />
    </subcircuit>
  );
};

export default Microcontroller_MSPM0L1306_TIDA010266;
