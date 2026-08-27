import type { SubcircuitProps } from "@tscircuit/props";
import { INA350CDSIDSGR } from "../chips/INA350CDSIDSGR.circuit.tsx";

export type InstrumentationAmplifier_INA350Props = SubcircuitProps & {
  /** CDS gains: GS low = 30, high/open = 50. External exposes GS to the parent. */
  gain?: 30 | 50 | "external";
  /** External exposes SHDN; high/open enables the amplifier, low disables it. */
  shutdown?: "external" | "enabled";
};

/**
 * Reusable INA350CDSIDSGR + 100 nF bypass capacitor (TIDA-010266 U5/C13).
 * No connectors or jumpers. V_NEG and EP are grounded; REF stays external.
 * Supply 1.8-5.5 V and drive REF from a low-impedance source (1.25 V in TIDA).
 * Connect the sensor, ADC, reference and optional GS/SHDN controls in the parent.
 * https://www.ti.com/lit/ug/tiduf53/tiduf53.pdf (Figure 4-1)
 */
export const InstrumentationAmplifier_INA350 = ({
  gain = "external",
  shutdown = "external",
  ...props
}: InstrumentationAmplifier_INA350Props) => {
  if (gain !== "external" && gain !== 30 && gain !== 50) {
    throw new Error(`INA350CDS supports gains 30/50, not ${gain}`);
  }
  return (
    <subcircuit
      width={7}
      height={5}
      minTraceWidth={0.1}
      nominalTraceWidth={0.1}
      {...props}
    >
      <INA350CDSIDSGR
        name="U1"
        pcbX={0}
        pcbY={0}
        schX={0}
        schY={0}
        schWidth={undefined}
        schHeight={undefined}
        schPinArrangement={undefined}
        schPinStyle={undefined}
        symbol={
          <symbol>
            <schematicpath
              points={[
                { x: -2, y: 2 },
                { x: 2, y: 0 },
                { x: -2, y: -2 },
                { x: -2, y: 2 },
              ]}
              strokeWidth={0.04}
            />
            <schematictext
              text="{NAME}"
              schX={-0.5}
              schY={0.25}
              fontSize={0.22}
            />
            <schematictext
              text="INA350CDS"
              schX={-0.5}
              schY={-0.15}
              fontSize={0.22}
            />
            <schematictext text="-" schX={-1.65} schY={0.7} fontSize={0.3} />
            <schematictext text="+" schX={-1.65} schY={-0.7} fontSize={0.3} />
            <port
              name="pin2"
              pinNumber={2}
              schX={-2.5}
              schY={1}
              direction="left"
              schStemLength={0.5}
            />
            <port
              name="pin3"
              pinNumber={3}
              schX={-2.5}
              schY={-1}
              direction="left"
              schStemLength={0.5}
            />
            <port
              name="pin6"
              pinNumber={6}
              schX={2.5}
              schY={0}
              direction="right"
              schStemLength={0.5}
            />
            <port
              name="pin8"
              pinNumber={8}
              schX={-1.65}
              schY={2.2}
              direction="up"
              schStemLength={0.375}
            />
            <port
              name="pin7"
              pinNumber={7}
              schX={-1}
              schY={2.2}
              direction="up"
              schStemLength={0.7}
            />
            <port
              name="pin1"
              pinNumber={1}
              schX={-0.35}
              schY={2.2}
              direction="up"
              schStemLength={1.025}
            />
            <port
              name="pin9"
              pinNumber={9}
              schX={-1.65}
              schY={-2.2}
              direction="down"
              schStemLength={0.375}
            />
            <port
              name="pin4"
              pinNumber={4}
              schX={-1}
              schY={-2.2}
              direction="down"
              schStemLength={0.7}
            />
            <port
              name="pin5"
              pinNumber={5}
              schX={0.35}
              schY={-2.2}
              direction="down"
              schStemLength={1.375}
            />
          </symbol>
        }
      />
      <trace
        name="INPUT_NEGATIVE"
        schDisplayLabel="IN_NEG"
        from=".U1 > .IN_NEG"
        to="net.IN_NEG"
      />
      <trace
        name="INPUT_POSITIVE"
        schDisplayLabel="IN_POS"
        from=".U1 > .IN_POS"
        to="net.IN_POS"
      />
      <trace
        name="OUTPUT"
        schDisplayLabel="OUT"
        from=".U1 > .OUT"
        to="net.OUT"
      />

      <capacitor
        name="C1"
        capacitance="0.1uF"
        footprint="0402"
        pcbX={2.4}
        pcbY={-0.26}
        pcbRotation={-90}
        schX={1.5}
        schY={3.1}
        schRotation={-90}
      />
      <netlabel
        net="VS"
        schX={-1}
        schY={3.1}
        anchorSide="bottom"
        connectsTo=".U1 > .V_POS"
      />
      <netlabel
        net="VS"
        schX={1.5}
        schY={3.7}
        anchorSide="bottom"
        connectsTo=".C1 > .pin1"
      />
      <trace
        name="ENABLE"
        schDisplayLabel={shutdown === "external" ? "SHDN" : undefined}
        from=".U1 > .SHDN"
        to={shutdown === "external" ? "net.SHDN" : ".U1 > .V_POS"}
      />
      <trace
        name="GAIN_SELECT"
        schDisplayLabel={gain === "external" ? "GS" : undefined}
        from=".U1 > .GS"
        to={
          gain === "external"
            ? "net.GS"
            : gain === 50
              ? ".U1 > .V_POS"
              : "net.GND"
        }
        // Keep the high-gain strap off the top-layer SHDN escape route.
        pcbPathRelativeTo=".U1 > .GS"
        pcbPath={
          gain === 50
            ? [
                ".U1 > .GS",
                { x: -1.7, y: 0.75, via: true, toLayer: "bottom" },
                { x: 1.7, y: 0.25, via: true, toLayer: "top" },
                ".U1 > .V_POS",
              ]
            : undefined
        }
      />
      <netlabel
        net="GND"
        schX={1.5}
        schY={2.45}
        anchorSide="top"
        connectsTo=".C1 > .pin2"
      />

      <trace name="THERMAL_PAD" from=".U1 > .EP" to=".U1 > .V_NEG" />
      <trace
        name="REFERENCE"
        schDisplayLabel="REF"
        from=".U1 > .REF"
        to="net.REF"
      />
      <trace name="GROUND" from=".U1 > .V_NEG" to="net.GND" />
      <schematictext
        text={
          gain === "external"
            ? "GS: low = 30, high/open = 50"
            : `G = ${gain} V/V`
        }
        schX={0}
        schY={-3.1}
        fontSize={0.2}
      />
    </subcircuit>
  );
};

export default InstrumentationAmplifier_INA350;
