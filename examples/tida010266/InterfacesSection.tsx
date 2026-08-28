import type { GroupProps } from "@tscircuit/props";
import "tscircuit";
import { TIDA010266InlineNetPorts } from "../../lib/utils/tida010266/TIDA010266InlineNetPorts.tsx";

const throughHoleTestPoint = {
  footprintVariant: "through_hole" as const,
  holeDiameter: "1mm",
  padDiameter: "1.8mm",
  doNotPlace: true,
};

export type InterfacesSectionProps = GroupProps & {
  schSectionName?: string;
  inputSectionName?: string;
  connectorSectionName?: string;
  jumperSectionName?: string;
  testPointSectionName?: string;
  inaFilterSectionName?: string;
  inputSheetName?: string;
  connectorSheetName?: string;
  jumperSheetName?: string;
  testPointSheetName?: string;
  inaFilterSheetName?: string;
  inputSchXOffset?: number;
  inputSchYOffset?: number;
  connectorSchXOffset?: number;
  connectorSchYOffset?: number;
  jumperSchXOffset?: number;
  jumperSchYOffset?: number;
  testPointSchXOffset?: number;
  testPointSchYOffset?: number;
  inaFilterSchXOffset?: number;
  inaFilterSchYOffset?: number;
  interfaceColumnLayout?: boolean;
};

/** TIDA-010266 power, UART/GPIO, selection jumpers, and seven test points. */
export const InterfacesSection = ({
  inputSectionName,
  connectorSectionName,
  jumperSectionName,
  testPointSectionName,
  inaFilterSectionName,
  inputSheetName,
  connectorSheetName,
  jumperSheetName,
  testPointSheetName,
  inaFilterSheetName,
  inputSchXOffset = 0,
  inputSchYOffset = 0,
  connectorSchXOffset = 0,
  connectorSchYOffset = 0,
  jumperSchXOffset = 0,
  jumperSchYOffset = 0,
  testPointSchXOffset = 0,
  testPointSchYOffset = 0,
  inaFilterSchXOffset = 0,
  inaFilterSchYOffset = 0,
  interfaceColumnLayout = false,
  ...props
}: InterfacesSectionProps) => {
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;
  const inputX = (x: number) => x + inputSchXOffset;
  const inputY = (y: number) => y + inputSchYOffset;
  const connectorX = (x: number) => x + connectorSchXOffset;
  const connectorY = (y: number) => y + connectorSchYOffset;
  const jumperX = (x: number) => x + jumperSchXOffset;
  const jumperY = (y: number) => y + jumperSchYOffset;
  const testPointX = (x: number) => x + testPointSchXOffset;
  const testPointY = (y: number) => y + testPointSchYOffset;
  const inaFilterX = (x: number) => x + inaFilterSchXOffset;
  const inaFilterY = (y: number) => y + inaFilterSchYOffset;
  const jumperPositions = interfaceColumnLayout
    ? {
        J5: { x: jumperX(-20), y: jumperY(-4.6) },
        J6: { x: jumperX(-20), y: jumperY(-7.2) },
        J8: { x: jumperX(-20), y: jumperY(-9.8) },
      }
    : {
        J5: { x: jumperX(-25), y: jumperY(-4.6) },
        J6: { x: jumperX(-15), y: jumperY(-4.6) },
        J8: { x: jumperX(-25), y: jumperY(-7.2) },
      };
  const testPointPositions = interfaceColumnLayout
    ? {
        TP1: { x: testPointX(0), y: testPointY(-3) },
        TP2: { x: testPointX(0), y: testPointY(-4.5) },
        TP3: { x: testPointX(0), y: testPointY(-6) },
        TP4: { x: testPointX(0), y: testPointY(-7.5) },
        TP5: { x: testPointX(0), y: testPointY(-9) },
        TP6: { x: testPointX(0), y: testPointY(-10.5) },
        TP7: { x: testPointX(0), y: testPointY(-12) },
      }
    : {
        TP1: { x: testPointX(-6), y: testPointY(-3.7) },
        TP2: { x: testPointX(6.5), y: testPointY(-4.9) },
        TP3: { x: testPointX(-6), y: testPointY(-4.9) },
        TP4: { x: testPointX(-6), y: testPointY(-6.1) },
        TP5: { x: testPointX(6.5), y: testPointY(-7.3) },
        TP6: { x: testPointX(-6), y: testPointY(-7.3) },
        TP7: { x: testPointX(-6), y: testPointY(-8.5) },
      };

  return (
    <group {...props}>
      <connector
        name="J1"
        schSectionName={inputSectionName ?? props.schSectionName}
        schSheetName={inputSheetName ?? props.schSheetName}
        manufacturerPartNumber="691101710002"
        footprint="pinrow2_rows1_p5mm"
        schX={inputX(-29.8)}
        schY={inputY(2)}
        schWidth="0.8mm"
        schHeight="1.1mm"
        schPinArrangement={{
          rightSide: { pins: ["pin1", "pin2"], direction: "top-to-bottom" },
        }}
        schPinStyle={{ pin2: { marginTop: 0.15 } }}
        pinLabels={{ pin1: ["GND"], pin2: ["V_EXT"] }}
        connections={{ pin1: "net.GND", pin2: "net.V_EXT" }}
      />
      <connector
        name="J4"
        schSectionName={inputSectionName ?? props.schSectionName}
        schSheetName={inputSheetName ?? props.schSheetName}
        manufacturerPartNumber="61300211121"
        footprint="pinrow2"
        schX={inputX(-29.8)}
        schY={inputY(0)}
        schWidth="0.8mm"
        schHeight="1.1mm"
        schPinArrangement={{
          rightSide: { pins: ["pin2", "pin1"], direction: "top-to-bottom" },
        }}
        schPinStyle={{ pin1: { marginTop: 0.15 } }}
        pinLabels={{ pin1: ["VIN"], pin2: ["V_EXT"] }}
        connections={{ pin1: "net.VIN", pin2: "net.V_EXT" }}
      />
      <connector
        name="J3"
        schSectionName={connectorSectionName ?? props.schSectionName}
        schSheetName={connectorSheetName ?? props.schSheetName}
        manufacturerPartNumber="90121-0766"
        footprint="pinrow6"
        schX={connectorX(11.8)}
        schY={connectorY(1.5)}
        schWidth="1.2mm"
        schHeight="1.2mm"
        schPinArrangement={{
          leftSide: {
            pins: ["pin1", "pin2", "pin3", "pin4", "pin5", "pin6"],
            direction: "top-to-bottom",
          },
        }}
        pinLabels={{
          pin1: ["UART_RTS"],
          pin2: ["UART_RX"],
          pin3: ["UART_TX"],
          pin4: ["NC"],
          pin5: ["UART_CTS"],
          pin6: ["GND"],
        }}
        connections={{
          pin1: "net.UART_RTS",
          pin2: "net.UART_RX",
          pin3: "net.UART_TX",
          pin5: "net.UART_CTS",
          ...(interfaceColumnLayout ? {} : { pin6: "net.GND" }),
        }}
        pinAttributes={{ NC: { doNotConnect: true } }}
      />
      <connector
        name="J7"
        schSectionName={connectorSectionName ?? props.schSectionName}
        schSheetName={connectorSheetName ?? props.schSheetName}
        manufacturerPartNumber="TSW-110-08-G-S"
        footprint="pinrow10"
        schX={connectorX(11.8)}
        schY={connectorY(-5.8)}
        schWidth="1.2mm"
        schHeight="2.2mm"
        schPinArrangement={{
          leftSide: {
            pins: [
              "pin1",
              "pin2",
              "pin3",
              "pin4",
              "pin5",
              "pin6",
              "pin7",
              "pin8",
              "pin9",
              "pin10",
            ],
            direction: "top-to-bottom",
          },
        }}
        pinLabels={{
          pin1: ["SDA"],
          pin2: ["SCL"],
          pin3: ["SPI0_CS"],
          pin4: ["PA3"],
          pin5: ["SPI0_POCI"],
          pin6: ["SPI0_PICO"],
          pin7: ["SPI_SCLK"],
          pin8: ["PA7"],
          pin9: ["PA10"],
          pin10: ["PA11"],
        }}
        connections={{
          pin1: "net.SDA",
          pin2: "net.SCL",
          pin3: "net.SPI0_CS",
          pin4: "net.PA3",
          pin5: "net.SPI0_POCI",
          pin6: "net.SPI0_PICO",
          pin7: "net.SPI_SCLK",
          pin8: "net.PA7",
          pin9: "net.PA10",
          pin10: "net.PA11",
        }}
      />

      <connector
        name="J5"
        schSectionName={jumperSectionName ?? props.schSectionName}
        schSheetName={jumperSheetName ?? props.schSheetName}
        manufacturerPartNumber="61300311121"
        footprint="pinrow3"
        schX={jumperPositions.J5.x}
        schY={jumperPositions.J5.y}
        schWidth="1.8mm"
        schHeight="1.8mm"
        schPinArrangement={{
          rightSide: {
            pins: ["pin3", "pin2", "pin1"],
            direction: "top-to-bottom",
          },
        }}
        schPinStyle={{ pin2: { marginTop: 0.12 }, pin1: { marginTop: 0.12 } }}
        pinLabels={{
          pin1: ["OPA1_IN0_POS"],
          pin2: ["BRIDGE_POS"],
          pin3: ["INA_IN_POS"],
        }}
        connections={{
          pin1: "net.OPA1_IN0_POS",
          pin2: "net.BRIDGE_POS",
          pin3: "net.INA_IN_POS",
        }}
      />
      <connector
        name="J6"
        schSectionName={jumperSectionName ?? props.schSectionName}
        schSheetName={jumperSheetName ?? props.schSheetName}
        manufacturerPartNumber="61300311121"
        footprint="pinrow3"
        schX={jumperPositions.J6.x}
        schY={jumperPositions.J6.y}
        schWidth="1.8mm"
        schHeight="1.8mm"
        schPinArrangement={{
          rightSide: {
            pins: ["pin3", "pin2", "pin1"],
            direction: "top-to-bottom",
          },
        }}
        schPinStyle={{ pin2: { marginTop: 0.12 }, pin1: { marginTop: 0.12 } }}
        pinLabels={{
          pin1: ["OPA1_OUT"],
          pin2: ["PRESSURE"],
          pin3: ["INA_OUT"],
        }}
        connections={{
          pin1: "net.OPA1_OUT",
          ...(interfaceColumnLayout ? {} : { pin2: "net.PRESSURE" }),
          pin3: "net.INA_OUT",
        }}
      />
      <connector
        name="J8"
        schSectionName={jumperSectionName ?? props.schSectionName}
        schSheetName={jumperSheetName ?? props.schSheetName}
        manufacturerPartNumber="61300311121"
        footprint="pinrow3"
        schX={jumperPositions.J8.x}
        schY={jumperPositions.J8.y}
        schWidth="1.8mm"
        schHeight="1.8mm"
        schPinArrangement={{
          rightSide: {
            pins: ["pin3", "pin2", "pin1"],
            direction: "top-to-bottom",
          },
        }}
        schPinStyle={{ pin2: { marginTop: 0.12 }, pin1: { marginTop: 0.12 } }}
        pinLabels={{
          pin1: ["OPA0_IN0_POS"],
          pin2: ["BRIDGE_NEG"],
          pin3: ["INA_IN_NEG"],
        }}
        connections={{
          pin1: "net.OPA0_IN0_POS",
          pin2: "net.BRIDGE_NEG",
        }}
      />
      <group schSheetName={jumperSheetName ?? props.schSheetName}>
        <schematictext
          text="For MSPM0 INA + LMV324A Filter: Short pins 1-2"
          schX={
            interfaceColumnLayout ? jumperPositions.J8.x - 3 : jumperX(-30.5)
          }
          schY={
            interfaceColumnLayout ? jumperPositions.J8.y - 2 : jumperY(-8.5)
          }
          anchor="left"
          fontSize={0.22}
          color="#000000"
        />
        <schematictext
          text="For INA350 + LMV324A Filter: Short pins 2-3"
          schX={
            interfaceColumnLayout ? jumperPositions.J8.x - 3 : jumperX(-30.5)
          }
          schY={
            interfaceColumnLayout ? jumperPositions.J8.y - 2.7 : jumperY(-9.2)
          }
          anchor="left"
          fontSize={0.22}
          color="#000000"
        />
      </group>
      <connector
        name="J10"
        schSectionName={inaFilterSectionName ?? props.schSectionName}
        schSheetName={inaFilterSheetName ?? props.schSheetName}
        manufacturerPartNumber="61300311121"
        footprint="pinrow3"
        schX={inaFilterX(-14.5)}
        schY={inaFilterY(-19.5)}
        schWidth="1.1mm"
        schHeight="2mm"
        schPinArrangement={{
          rightSide: {
            pins: ["pin3", "pin2", "pin1"],
            direction: "top-to-bottom",
          },
        }}
        pinLabels={{ pin1: ["GND"], pin2: ["INA_GS"], pin3: ["V3_3"] }}
        connections={{ pin1: "net.GND", pin3: "net.V3_3" }}
      />
      <port
        {...({
          schSheetName: jumperSheetName ?? props.schSheetName,
        } as Record<string, unknown>)}
        name="INA_IN_NEG_PORT"
        schX={originX + jumperPositions.J8.x + 1.2}
        schY={originY + jumperPositions.J8.y - 0.8}
        direction="right"
      />
      <trace
        from=".J8 > .INA_IN_NEG"
        to=".INA_IN_NEG_PORT"
        schDisplayLabel="INA_IN_NEG"
      />
      <port
        {...({
          schSheetName: inaFilterSheetName ?? props.schSheetName,
        } as Record<string, unknown>)}
        name="INA_GS_PORT"
        schX={originX + inaFilterX(-13.5)}
        schY={originY + inaFilterY(-19.5)}
        direction="right"
      />
      <trace from=".J10 > .INA_GS" to=".INA_GS_PORT" schDisplayLabel="INA_GS" />
      <netlabel net="GND" connectsTo=".J1 > .GND" anchorSide="bottom" />
      <netlabel net="GND" connectsTo=".J3 > .GND" anchorSide="top" />
      <netlabel net="GND" connectsTo=".J10 > .GND" anchorSide="top" />
      <netlabel net="GND" connectsTo=".TP6 > .pin1" anchorSide="top" />
      <netlabel net="GND" connectsTo=".TP7 > .pin1" anchorSide="top" />

      <testpoint
        {...throughHoleTestPoint}
        name="TP1"
        schSectionName={testPointSectionName ?? props.schSectionName}
        schSheetName={testPointSheetName ?? props.schSheetName}
        manufacturerPartNumber="5000"
        schX={testPointPositions.TP1.x}
        schY={testPointPositions.TP1.y}
        connections={{ pin1: "net.VIN" }}
      />
      <testpoint
        {...throughHoleTestPoint}
        name="TP2"
        schSectionName={testPointSectionName ?? props.schSectionName}
        schSheetName={testPointSheetName ?? props.schSheetName}
        manufacturerPartNumber="5117"
        schX={testPointPositions.TP2.x}
        schY={testPointPositions.TP2.y}
        connections={
          interfaceColumnLayout ? undefined : { pin1: "net.PRESSURE" }
        }
      />
      <testpoint
        {...throughHoleTestPoint}
        name="TP3"
        schSectionName={testPointSectionName ?? props.schSectionName}
        schSheetName={testPointSheetName ?? props.schSheetName}
        manufacturerPartNumber="5000"
        schX={testPointPositions.TP3.x}
        schY={testPointPositions.TP3.y}
        connections={{ pin1: "net.V3_3" }}
      />
      <testpoint
        {...throughHoleTestPoint}
        name="TP4"
        schSectionName={testPointSectionName ?? props.schSectionName}
        schSheetName={testPointSheetName ?? props.schSheetName}
        manufacturerPartNumber="5000"
        schX={testPointPositions.TP4.x}
        schY={testPointPositions.TP4.y}
        connections={{ pin1: "net.VREF_2_5" }}
      />
      <testpoint
        {...throughHoleTestPoint}
        name="TP5"
        schSectionName={testPointSectionName ?? props.schSectionName}
        schSheetName={testPointSheetName ?? props.schSheetName}
        manufacturerPartNumber="5117"
        schX={testPointPositions.TP5.x}
        schY={testPointPositions.TP5.y}
        connections={{ pin1: "net.OSCILLATIONS" }}
      />
      <testpoint
        {...throughHoleTestPoint}
        name="TP6"
        schSectionName={testPointSectionName ?? props.schSectionName}
        schSheetName={testPointSheetName ?? props.schSheetName}
        manufacturerPartNumber="5001"
        schX={testPointPositions.TP6.x}
        schY={testPointPositions.TP6.y}
        connections={interfaceColumnLayout ? undefined : { pin1: "net.GND" }}
      />
      <testpoint
        {...throughHoleTestPoint}
        name="TP7"
        schSectionName={testPointSectionName ?? props.schSectionName}
        schSheetName={testPointSheetName ?? props.schSheetName}
        manufacturerPartNumber="5001"
        schX={testPointPositions.TP7.x}
        schY={testPointPositions.TP7.y}
        connections={interfaceColumnLayout ? undefined : { pin1: "net.GND" }}
      />
      {interfaceColumnLayout && (
        <>
          <port
            {...({
              schSheetName: jumperSheetName ?? props.schSheetName,
            } as Record<string, unknown>)}
            name="PRESSURE"
            schX={originX + jumperPositions.J6.x + 2.5}
            schY={originY + jumperPositions.J6.y}
            direction="right"
            connectsTo=".J6 > .PRESSURE"
          />
          <netlabel net="PRESSURE" connectsTo=".J6 > .PRESSURE" inline />
          <netlabel net="PRESSURE" connectsTo=".TP2 > .pin1" inline />
          <port
            {...({
              schSheetName: connectorSheetName ?? props.schSheetName,
            } as Record<string, unknown>)}
            name="GND"
            schX={originX + connectorX(9.6)}
            schY={originY + connectorY(0)}
            direction="left"
            connectsTo=".J3 > .GND"
          />
        </>
      )}
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "V_EXT",
            connectsTo: [".J1 > .V_EXT", ".J4 > .V_EXT"],
            inlineLabelConnectsTo: false as const,
            schX: inputX(-31),
            schY: inputY(3.4),
            direction: "left",
            schSheetName: inputSheetName ?? props.schSheetName,
          },
          {
            name: "VIN",
            connectsTo: [".J4 > .VIN", ".TP1 > .pin1"],
            inlineLabelConnectsTo: ".TP1 > .pin1",
            schX: inputX(-31),
            schY: inputY(2.3),
            direction: "left",
            schSheetName: inputSheetName ?? props.schSheetName,
          },
          {
            name: "V3_3",
            connectsTo: [".J10 > .V3_3", ".TP3 > .pin1"],
            schX: testPointPositions.TP3.x - 1.2,
            schY: testPointPositions.TP3.y,
            direction: "left",
            schSheetName: testPointSheetName ?? props.schSheetName,
          },
          {
            name: "VREF_2_5",
            connectsTo: ".TP4 > .pin1",
            schX: testPointPositions.TP4.x - 1.2,
            schY: testPointPositions.TP4.y,
            direction: "left",
            schSheetName: testPointSheetName ?? props.schSheetName,
          },
          ...(interfaceColumnLayout
            ? []
            : [
                {
                  name: "PRESSURE",
                  connectsTo: [".J6 > .PRESSURE", ".TP2 > .pin1"],
                  schX: testPointPositions.TP2.x - 1.2,
                  schY: testPointPositions.TP2.y,
                  direction: "right" as const,
                  schSheetName: testPointSheetName ?? props.schSheetName,
                },
              ]),
          {
            name: "OSCILLATIONS",
            connectsTo: ".TP5 > .pin1",
            schX: testPointPositions.TP5.x - 1.2,
            schY: testPointPositions.TP5.y,
            direction: "right",
            schSheetName: testPointSheetName ?? props.schSheetName,
          },
          {
            name: "BRIDGE_POS",
            connectsTo: ".J5 > .BRIDGE_POS",
            schX: jumperPositions.J5.x - 1.2,
            schY: jumperPositions.J5.y,
            direction: "left",
            schSheetName: jumperSheetName ?? props.schSheetName,
          },
          {
            name: "BRIDGE_NEG",
            connectsTo: ".J8 > .BRIDGE_NEG",
            schX: jumperPositions.J8.x - 1.2,
            schY: jumperPositions.J8.y,
            direction: "left",
            schSheetName: jumperSheetName ?? props.schSheetName,
          },
          {
            name: "INA_IN_POS",
            connectsTo: ".J5 > .INA_IN_POS",
            schX: jumperPositions.J5.x - 1.2,
            schY: jumperPositions.J5.y - 0.8,
            direction: "left",
            schSheetName: jumperSheetName ?? props.schSheetName,
          },
          {
            name: "INA_OUT",
            connectsTo: ".J6 > .INA_OUT",
            schX: jumperPositions.J6.x - 1.2,
            schY: jumperPositions.J6.y - 0.8,
            direction: "left",
            schSheetName: jumperSheetName ?? props.schSheetName,
          },
          {
            name: "OPA0_IN0_POS",
            connectsTo: ".J8 > .OPA0_IN0_POS",
            schX: jumperPositions.J8.x - 1.2,
            schY: jumperPositions.J8.y + 0.8,
            direction: "left",
            schSheetName: jumperSheetName ?? props.schSheetName,
          },
          {
            name: "OPA1_IN0_POS",
            connectsTo: ".J5 > .OPA1_IN0_POS",
            schX: jumperPositions.J5.x - 1.2,
            schY: jumperPositions.J5.y + 0.8,
            direction: "left",
            schSheetName: jumperSheetName ?? props.schSheetName,
          },
          {
            name: "OPA1_OUT",
            connectsTo: ".J6 > .OPA1_OUT",
            schX: jumperPositions.J6.x - 1.2,
            schY: jumperPositions.J6.y + 0.8,
            direction: "left",
            schSheetName: jumperSheetName ?? props.schSheetName,
          },
          {
            name: "UART_RTS",
            connectsTo: ".J3 > .UART_RTS",
            schX: connectorX(9.6),
            schY: connectorY(2.5),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "UART_RX",
            connectsTo: ".J3 > .UART_RX",
            schX: connectorX(9.6),
            schY: connectorY(2),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "UART_TX",
            connectsTo: ".J3 > .UART_TX",
            schX: connectorX(9.6),
            schY: connectorY(1.5),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "UART_CTS",
            connectsTo: ".J3 > .UART_CTS",
            schX: connectorX(9.6),
            schY: connectorY(0.5),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "SDA",
            connectsTo: ".J7 > .SDA",
            schX: connectorX(9.6),
            schY: connectorY(-3.55),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "SCL",
            connectsTo: ".J7 > .SCL",
            schX: connectorX(9.6),
            schY: connectorY(-4.05),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "SPI0_CS",
            connectsTo: ".J7 > .SPI0_CS",
            schX: connectorX(9.6),
            schY: connectorY(-4.55),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "PA3",
            connectsTo: ".J7 > .PA3",
            schX: connectorX(9.6),
            schY: connectorY(-5.05),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "SPI0_POCI",
            connectsTo: ".J7 > .SPI0_POCI",
            schX: connectorX(9.6),
            schY: connectorY(-5.55),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "SPI0_PICO",
            connectsTo: ".J7 > .SPI0_PICO",
            schX: connectorX(9.6),
            schY: connectorY(-6.05),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "SPI_SCLK",
            connectsTo: ".J7 > .SPI_SCLK",
            schX: connectorX(9.6),
            schY: connectorY(-6.55),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "PA7",
            connectsTo: ".J7 > .PA7",
            schX: connectorX(9.6),
            schY: connectorY(-7.05),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "PA10",
            connectsTo: ".J7 > .PA10",
            schX: connectorX(9.6),
            schY: connectorY(-7.55),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          {
            name: "PA11",
            connectsTo: ".J7 > .PA11",
            schX: connectorX(9.6),
            schY: connectorY(-8.05),
            direction: "left",
            schSheetName: connectorSheetName ?? props.schSheetName,
          },
          ...(interfaceColumnLayout
            ? []
            : [
                {
                  name: "GND",
                  connectsTo: [
                    ".J3 > .GND",
                    ".J10 > .GND",
                    ".TP6 > .pin1",
                    ".TP7 > .pin1",
                  ],
                  inlineLabelConnectsTo: false as const,
                  schX: testPointPositions.TP7.x,
                  schY: testPointPositions.TP7.y - 1.5,
                  direction: "down" as const,
                  schSheetName: testPointSheetName ?? props.schSheetName,
                },
              ]),
        ]}
      />
    </group>
  );
};

export default InterfacesSection;
