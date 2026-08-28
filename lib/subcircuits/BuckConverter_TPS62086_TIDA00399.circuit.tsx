import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { TPS62086RLTR } from "../chips/TPS62086RLTR.circuit.tsx";
import { XFL4015_471MEC_FOOTPRINT } from "../chips/jlcpcb-footprints.tsx";

/**
 * TIDA-00399 sheet-5 3.3 V TPS62086 buck stage.
 *
 * This intentionally stops at the 3p3V_AON rail, before the downstream
 * TPS22922 load switch on the reference sheet.
 * @see https://www.ti.com/tool/TIDA-00399
 */
export const BuckConverter_TPS62086_TIDA00399 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props} schTraceAutoLabelEnabled={false}>
    <TPS62086RLTR name="U3P3" schX={0} schY={0} />

    <capacitor
      name="C1_3P3"
      capacitance="10uF"
      footprint="0805"
      schX={-2}
      schY={1}
      schOrientation="vertical"
    />
    <inductor
      name="L3P3"
      manufacturerPartNumber="XFL4015-471MEC"
      supplierPartNumbers={{ jlcpcb: ["C18221164"] }}
      footprint={XFL4015_471MEC_FOOTPRINT}
      inductance="470nH"
      schX={2.35}
      schY={0.5}
    />
    <resistor
      name="R3_3P3"
      resistance="100kohm"
      footprint="0402"
      schX={3.5}
      schY={-0.05}
      schRotation={270}
    />
    <capacitor
      name="C2_3P3"
      capacitance="22uF"
      footprint="0805"
      schX={4.85}
      schY={-0.2}
      schOrientation="vertical"
    />
    <resistor
      name="R3P3_BYP"
      resistance="0ohm"
      footprint="0402"
      doNotPlace
      schX={0.3}
      schY={1.55}
    />

    {/* Input rail and local input bypass. */}
    <trace from="U3P3.VIN" to="C1_3P3.pin1" />
    <trace from="C1_3P3.pin1" to="R3P3_BYP.pin1" />
    <netlabel
      net="VIN_DC_DC"
      connectsTo="U3P3.VIN"
      schX={-3.2}
      schY={0.35}
      anchorSide="right"
    />
    <netlabel
      net="EN_3P3"
      connectsTo="U3P3.EN"
      schX={-3.2}
      schY={-0.35}
      anchorSide="right"
    />

    {/* Buck switch node, feedback, output capacitor, and bypass option. */}
    <trace from="U3P3.SW" to="L3P3.pin1" />
    <trace from="L3P3.pin2" to="U3P3.VOS" />
    <trace from="U3P3.VOS" to="U3P3.FB" />
    <trace from="L3P3.pin2" to="R3_3P3.pin1" />
    <trace from="L3P3.pin2" to="C2_3P3.pin1" schDisplayLabel="V3P3_AON" />
    <trace from="R3P3_BYP.pin2" to="L3P3.pin2" />
    <netlabel net="V3P3_AON" connectsTo="R3P3_BYP.pin2" inline />

    {/* Power-good pull-up and exported status rail. */}
    <trace from="U3P3.PG" to="R3_3P3.pin2" />
    <netlabel
      net="V3P3_PG"
      connectsTo="R3_3P3.pin2"
      schX={6.2}
      schY={-0.55}
      anchorSide="left"
    />

    {/* Keep ground returns local, as on the TI reference sheet. */}
    <netlabel
      net="GND"
      connectsTo="C1_3P3.pin2"
      schX={-2.05}
      schY={-1.25}
      anchorSide="top"
    />
    <netlabel
      net="GND"
      connectsTo="U3P3.GND"
      schX={1.1}
      schY={-1.25}
      anchorSide="top"
    />
    <netlabel
      net="GND"
      connectsTo="C2_3P3.pin2"
      schX={4.85}
      schY={-1.25}
      anchorSide="top"
    />
  </subcircuit>
);

export default BuckConverter_TPS62086_TIDA00399;
