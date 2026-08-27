import { InstrumentationAmplifier_INA350 } from "@tsci/tscircuit.ti";

/**
 * Header-free parent wiring for the TIDA-010266 amplifier stage.
 * The parent supplies 3.3 V, a buffered 1.25 V reference, and sensor/ADC signals.
 * No reference generator, sensor, ADC, or optional J10 gain jumper is included.
 * Routing stays disabled until real parent components terminate these nets.
 */
export default ({
  gain = "external",
}: {
  gain?: 30 | 50 | "external";
} = {}) => (
  <board width={12} height={10} routingDisabled>
    <InstrumentationAmplifier_INA350 name="Amp" gain={gain} />
    <trace from=".Amp .U1 > .VS" to="net.V3_3" schDisplayLabel="3.3V" />
    <trace from=".Amp .U1 > .V_NEG" to="net.GND" />
    <trace from=".Amp .U1 > .IN_NEG" to="net.INA_IN_NEG" />
    <trace from=".Amp .U1 > .IN_POS" to="net.INA_IN_POS" />
    <trace from=".Amp .U1 > .OUT" to="net.INA_OUT" />
    <trace
      from=".Amp .U1 > .REF"
      to="net.VREF_1_25"
      schDisplayLabel="1.25V_REF"
    />
    {gain === "external" && <trace from=".Amp .U1 > .GS" to="net.INA_GS" />}
    {/* SHDN is not tied to ground: its internal pull-up enables the device. */}
  </board>
);
