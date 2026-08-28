import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TMP390AQDRLRQ1 } from "../chips/TMP390AQDRLRQ1.circuit.tsx";

export const TMP390_FIGURE_8_3_DEFAULTS = {
  hotTripCelsius: 90,
  hotResetCelsius: 80,
  coldTripCelsius: -25,
  coldResetCelsius: -15,
  hysteresisCelsius: 10,
  rSetAOhms: 78_700,
  rSetBOhms: 215_000,
  outputPullupOhms: 10_000,
  bypassCapacitanceFarads: 0.1e-6,
  sensorSupplyVolts: 3,
  outputPullupSupplyVolts: 3.3,
} as const;

/**
 * Datasheet-derived TMP390-Q1 motor thermal-protection circuit.
 *
 * This is not an exact TI Window Module reference design: TI attaches no
 * schematic/CAD source to that subsystem. Topology and relative placement are
 * derived from TMP390-Q1 datasheet Figure 7-1, using the user-provided
 * 1084 x 602 px capture. Values are from datasheet Figure 8-3:
 * https://www.ti.com/lit/ds/symlink/tmp390-q1.pdf
 *
 * - R1/RSETA = 78.7 kOhm selects a +90 C hot trip (Table 7-1).
 * - R2/RSETB = 215 kOhm selects a -25 C cold trip and 10 C hysteresis
 *   (Table 7-2).
 * - OUTA resets at +80 C; OUTB resets at -15 C.
 * - R3/R4 = 10 kOhm pull-ups and C1 = 0.1 uF.
 *
 * Coordinate transform from the attached Figure 7-1 capture:
 *   schX = (sourcePixelX - 573) * 0.010 mm
 *   schY = (389 - sourcePixelY) * 0.010 mm
 * The source origin is the TMP39x block center at (573, 389) px. Measured
 * source centers are C1 (154,376), R1 (274,456), R2 (321,475), R3 (791,290),
 * R4 (859,290), VDD (573,197), VDDIO (824,198), GND (575,549), OUTA
 * (1000,351), and OUTB (1000,427).
 *
 * Native-symbol normalization keeps both threshold-resistor lower pins on the
 * source ground baseline at schY = -1.6 mm, so R1/R2 centers are -1.3 mm. R2
 * is shifted 0.42 mm right from its transformed X coordinate to keep native
 * value text legible. The right-side pull-ups, VDDIO, and output endpoints are
 * shifted 0.72-0.93 mm right to clear U1's native part-number text. U1 uses
 * tscircuit's native schematic-symbol sizing and pin spacing. The two filled
 * paths are arrowheads only; their electrical lines remain native traces
 * terminating at native net labels. Refdes are implementation-defined because
 * Figure 7-1 supplies functional labels but no component designators.
 */
export const MotorThermalProtection_TMP390 = (props: SubcircuitProps) => (
  <subcircuit
    routingDisabled
    schAutoLayoutEnabled={false}
    schMaxTraceDistance="15mm"
    autorouterEffortLevel="10x"
    {...props}
  >
    <net name="VDD" isPowerNet />
    <net name="VDDIO" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="OUTA" />
    <net name="OUTB" />

    <TMP390AQDRLRQ1 name="U1" schX={0} schY={0} />

    <capacitor
      name="C1"
      capacitance="0.1uF"
      schX={-4.19}
      schY={0.13}
      schOrientation="vertical"
    />

    <resistor
      name="R1"
      resistance="78.7kohm"
      tolerance="1%"
      schX={-2.99}
      schY={-1.3}
      schOrientation="vertical"
    />
    <resistor
      name="R2"
      resistance="215kohm"
      tolerance="1%"
      schX={-2.1}
      schY={-1.3}
      schOrientation="vertical"
    />

    <resistor
      name="R3"
      resistance="10kohm"
      schX={2.9}
      schY={0.99}
      schOrientation="vertical"
    />
    <resistor
      name="R4"
      resistance="10kohm"
      schX={3.7}
      schY={0.99}
      schOrientation="vertical"
    />

    <port name="VDD" direction="up" schX={0} schY={1.92} connectsTo="net.VDD" />
    <port
      name="VDDIO"
      direction="up"
      schX={3.3}
      schY={1.91}
      connectsTo="net.VDDIO"
    />
    <port
      name="GND"
      direction="down"
      schX={0.02}
      schY={-1.6}
      connectsTo="net.GND"
    />
    <port
      name="OUTA"
      direction="right"
      schX={5.2}
      schY={0.1}
      connectsTo="net.OUTA"
    />
    <port
      name="OUTB"
      direction="right"
      schX={5.2}
      schY={-0.1}
      connectsTo="net.OUTB"
    />
    <trace from="U1.SETA" to="R1.pin1" />
    <trace from="U1.SETB" to="R2.pin1" />
    <trace from="U1.VDD" to="net.VDD" />
    <trace from="U1.GND" to="net.GND" />
    <trace from="C1.pin1" to="net.VDD" />
    <trace from="C1.pin2" to="net.GND" />
    <trace from="R1.pin2" to="net.GND" />
    <trace from="R2.pin2" to="net.GND" />
    <trace from="R3.pin1" to="net.VDDIO" />
    <trace from="R4.pin1" to="net.VDDIO" />
    <netlabel
      net="OUTA"
      connectsTo={["U1.OUTA", "R3.pin2"]}
      schX={5.2}
      schY={0.1}
      anchorSide="left"
    />
    <netlabel
      net="OUTB"
      connectsTo={["U1.OUTB", "R4.pin2"]}
      schX={5.2}
      schY={-0.1}
      anchorSide="left"
    />
    <schematicpath
      points={[
        { x: 5.2, y: 0.1 },
        { x: 5.06, y: 0.17 },
        { x: 5.06, y: 0.03 },
        { x: 5.2, y: 0.1 },
      ]}
      strokeWidth={0.025}
      strokeColor="#009600"
      isFilled
      fillColor="#009600"
    />
    <schematicpath
      points={[
        { x: 5.2, y: -0.1 },
        { x: 5.06, y: -0.03 },
        { x: 5.06, y: -0.17 },
        { x: 5.2, y: -0.1 },
      ]}
      strokeWidth={0.025}
      strokeColor="#009600"
      isFilled
      fillColor="#009600"
    />
  </subcircuit>
);

export default MotorThermalProtection_TMP390;
