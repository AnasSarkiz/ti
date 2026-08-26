import type { SubcircuitProps } from "@tscircuit/props";
import { DRV8210DSGR } from "../chips/DRV8210DSGR.circuit.tsx";

/**
 * DRV8210 DSG full-bridge PWM application.
 * MODE is low; VCC is separate from VM and requires its own bypass capacitor.
 * Controller and BDC are connectable schematic-only placeholders, not PCB parts.
 * Add system-sized VM bulk capacitance at the motor supply connection.
 * https://www.ti.com/document-viewer/DRV8210/datasheet
 */
export const MotorDriver_DRV8210 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <DRV8210DSGR name="U1" pcbX={0} pcbY={0} schX={0} schY={0} />

    {/* External blocks have schematic ports but no footprint or BOM entry. */}
    <group
      name="Controller"
      showAsSchematicBox
      schTitle="Controller"
      schWidth={2}
      schHeight={2.2}
      schX={-5}
      schY={0.25}
      schPinArrangement={{
        rightSide: { pins: ["PWM1", "PWM2"], direction: "top-to-bottom" },
      }}
      schPinStyle={{ PWM2: { marginTop: 0.3 } }}
    >
      <port name="PWM1" direction="right" />
      <port name="PWM2" direction="right" />
    </group>
    <trace
      name="CONTROLLER_PWM1"
      schDisplayLabel="PWM1"
      path={[".Controller > .PWM1", ".U1 > .IN1", "net.PWM1"]}
    />
    <trace
      name="CONTROLLER_PWM2"
      schDisplayLabel="PWM2"
      path={[".Controller > .PWM2", ".U1 > .IN2", "net.PWM2"]}
    />
    <schematicline x1={-5} y1={1.35} x2={-5} y2={1.75} strokeWidth={0.02} />
    <schematicline
      x1={-5.14}
      y1={1.75}
      x2={-4.86}
      y2={1.75}
      strokeWidth={0.02}
    />
    <schematictext text="VCC" schX={-5} schY={1.95} fontSize={0.18} />
    <schematicline x1={-5} y1={-0.85} x2={-5} y2={-1.25} strokeWidth={0.02} />
    <schematicline
      x1={-5.14}
      y1={-1.25}
      x2={-4.86}
      y2={-1.25}
      strokeWidth={0.02}
    />
    <schematictext text="GND" schX={-5} schY={-1.45} fontSize={0.18} />

    <group
      name="BDC"
      showAsSchematicBox
      schTitle="BDC"
      schWidth={1.6}
      schHeight={1.5}
      schX={5}
      schY={-0.25}
      schPinArrangement={{
        leftSide: { pins: ["OUT1", "OUT2"], direction: "top-to-bottom" },
      }}
      schPinStyle={{ OUT2: { marginTop: 0.3 } }}
    >
      <port name="OUT1" direction="left" />
      <port name="OUT2" direction="left" />
    </group>
    {/* Real schematic ports let these labels stay inline on routed traces. */}
    <trace
      name="MOTOR_OUT1"
      schDisplayLabel="OUT1"
      path={[".U1 > .OUT1", ".BDC > .OUT1", "net.OUT1"]}
    />
    <trace
      name="MOTOR_OUT2"
      schDisplayLabel="OUT2"
      path={[".U1 > .OUT2", ".BDC > .OUT2", "net.OUT2"]}
    />

    {/* DSG pin 7 selects PWM mode when grounded; pin 9 is the exposed pad. */}
    <trace name="PWM_MODE" from=".U1 > .MODE" to="net.GND" />
    <trace name="DRIVER_GND" from=".U1 > .GND" to="net.GND" />
    <trace name="THERMAL_PAD_GND" from=".U1 > .EP" to="net.GND" />
    <trace name="LOGIC_SUPPLY" from=".U1 > .VCC" to="net.VCC" />

    <capacitor
      name="C1"
      capacitance="0.1uF"
      footprint="0402"
      pcbX={-0.8}
      pcbY={-2.5}
      schX={3}
      schY={1.8}
      schRotation={-90}
    />
    <trace name="MOTOR_SUPPLY" from=".U1 > .VM" to=".C1 > .pin1" />
    <trace name="VM_BYPASS_SUPPLY" from=".C1 > .pin1" to="net.VM" />
    <netlabel
      net="GND"
      schX={3}
      schY={1.2}
      anchorSide="top"
      connectsTo=".C1 > .pin2"
    />

    <capacitor
      name="C2"
      capacitance="0.1uF"
      footprint="0402"
      pcbX={-0.8}
      pcbY={2.5}
      schX={-2}
      schY={2.4}
      schRotation={-90}
    />
    <trace name="VCC_BYPASS_SUPPLY" from=".C2 > .pin1" to="net.VCC" />
    <netlabel
      net="GND"
      schX={-2}
      schY={1.8}
      anchorSide="top"
      connectsTo=".C2 > .pin2"
    />
  </subcircuit>
);

export default MotorDriver_DRV8210;
