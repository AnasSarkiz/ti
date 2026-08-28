import "tscircuit";
import { DRV8210DSGR } from "../chips/DRV8210DSGR.circuit.tsx";
import { TIDA010266InlineNetPorts } from "../utils/tida010266/TIDA010266InlineNetPorts.tsx";
import type { TIDA010266SectionedSubcircuitProps } from "../utils/tida010266/TIDA010266.types.ts";

/** TIDA-010266 U6/C14/C15/C16/J9 pump-and-valve driver stage. */
export const MotorDriver_DRV8210_TIDA010266 = (
  props: TIDA010266SectionedSubcircuitProps,
) => {
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;

  return (
    <subcircuit
      {...props}
      schTraceAutoLabelEnabled={false}
      schMaxTraceDistance="9mm"
    >
      <DRV8210DSGR
        name="U6"
        schSectionName={props.schSectionName}
        schX={0}
        schY={0}
        schWidth="4.8mm"
        schHeight="4.2mm"
        schPinArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: ["VM", "VCC", "MODE", "IN1", "IN2"],
          },
          rightSide: {
            direction: "top-to-bottom",
            pins: ["OUT1", "OUT2", "EP", "GND"],
          },
        }}
        schPinStyle={{
          VCC: { marginTop: 0.25 },
          MODE: { marginTop: 0.35 },
          IN1: { marginTop: 0.45 },
          IN2: { marginTop: 0.35 },
          OUT2: { marginTop: 0.3 },
          EP: { marginTop: 0.45 },
          GND: { marginTop: 0.25 },
        }}
      />
      <capacitor
        name="C14"
        schSectionName={props.schSectionName}
        capacitance="22uF"
        maxVoltageRating="16V"
        footprint="0603"
        schX={-7}
        schY={2.4}
        schOrientation="vertical"
      />
      <capacitor
        name="C15"
        schSectionName={props.schSectionName}
        capacitance="100nF"
        maxVoltageRating="25V"
        footprint="0402"
        schX={-5.4}
        schY={2.4}
        schOrientation="vertical"
      />
      <capacitor
        name="C16"
        schSectionName={props.schSectionName}
        capacitance="100nF"
        maxVoltageRating="25V"
        footprint="0402"
        schX={-7.8}
        schY={-0.5}
        schOrientation="vertical"
      />
      <connector
        name="J9"
        schSectionName={props.schSectionName}
        manufacturerPartNumber="M22-5330405"
        footprint="pinrow4_rows1_p2mm"
        schX={7.5}
        schY={0}
        schWidth="0.8mm"
        schHeight="1.6mm"
        schPinArrangement={{
          leftSide: {
            pins: ["pin1", "pin2", "pin3", "pin4"],
            direction: "top-to-bottom",
          },
        }}
        pinLabels={{
          pin1: ["G1", "GND_1"],
          pin2: ["V", "VALVE_OUT"],
          pin3: ["P", "PUMP_OUT"],
          pin4: ["G4", "GND_4"],
        }}
      />
      <trace from=".C14 > .pin1" to=".C15 > .pin1" maxLength="100mm" />
      <trace from=".C14 > .pin2" to=".C15 > .pin2" maxLength="100mm" />
      <trace from=".C15 > .pin1" to=".U6 > .VM" maxLength="100mm" />
      <trace from=".C16 > .pin1" to=".U6 > .VCC" maxLength="100mm" />
      <trace from=".U6 > .OUT1" to=".J9 > .VALVE_OUT" maxLength="100mm" />
      <trace from=".U6 > .OUT2" to=".J9 > .PUMP_OUT" maxLength="100mm" />
      <trace from=".U6 > .EP" to=".U6 > .GND" maxLength="100mm" />
      <trace from=".J9 > .GND_1" to=".J9 > .GND_4" maxLength="100mm" />
      <netlabel net="GND" connectsTo=".C15 > .pin2" anchorSide="top" />
      <netlabel net="GND" connectsTo=".C16 > .pin2" anchorSide="top" />
      <netlabel net="GND" connectsTo=".U6 > .GND" anchorSide="top" />
      <netlabel net="GND" connectsTo=".J9 > .GND_4" anchorSide="top" />
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "VIN",
            connectsTo: [".U6 > .VM", ".C14 > .pin1", ".C15 > .pin1"],
            inlineLabelConnectsTo: ".C14 > .pin1",
            schX: -6.2,
            schY: 3.5,
            direction: "up",
          },
          {
            name: "V3_3",
            connectsTo: [".U6 > .VCC", ".C16 > .pin1"],
            inlineLabelConnectsTo: ".C16 > .pin1",
            schX: -7.8,
            schY: 0.8,
            direction: "up",
          },
          {
            name: "VALVE_CONTROL",
            connectsTo: ".U6 > .IN1",
            schX: -5.5,
            schY: -0.7,
            direction: "left",
          },
          {
            name: "PUMP_CONTROL",
            connectsTo: ".U6 > .IN2",
            schX: -5.5,
            schY: -1.4,
            direction: "left",
          },
          {
            name: "VALVE_OUT",
            connectsTo: [".U6 > .OUT1", ".J9 > .VALVE_OUT"],
            inlineLabelConnectsTo: ".J9 > .VALVE_OUT",
            schX: 5.2,
            schY: 0.8,
            direction: "right",
          },
          {
            name: "PUMP_OUT",
            connectsTo: [".U6 > .OUT2", ".J9 > .PUMP_OUT"],
            inlineLabelConnectsTo: ".J9 > .PUMP_OUT",
            schX: 5.2,
            schY: 0.1,
            direction: "right",
          },
        ]}
      />
    </subcircuit>
  );
};

export default MotorDriver_DRV8210_TIDA010266;
