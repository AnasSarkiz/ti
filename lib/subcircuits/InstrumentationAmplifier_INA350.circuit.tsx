import type { SubcircuitProps } from "@tscircuit/props";
import { INA350CDSIDSGR } from "../chips/INA350CDSIDSGR.circuit.tsx";
import { TIDA010266InlineNetPorts } from "../utils/tida010266/TIDA010266InlineNetPorts.tsx";

export type InstrumentationAmplifier_INA350Props = SubcircuitProps & {
  /** Native schematic-section membership for the physical U/C components. */
  schSectionName?: string;
  /** CDS gains: GS low = 30, high/open = 50. External exposes GS to the parent. */
  gain?: 30 | 50 | "external";
  /** External exposes SHDN; high/open enables the amplifier, low disables it. */
  shutdown?: "external" | "enabled";
  /** Override the internal reference designator when composing a reference board. */
  chipName?: string;
  /** Override the bypass-capacitor reference designator. */
  bypassCapacitorName?: string;
  /** Expose TIDA-style module ports and render their signal names inline. */
  inlineNetLabels?: boolean;
  /** Select the compact reusable symbol or TI reference-drawing block style. */
  schematicStyle?: "triangle" | "box";
  /** Internal supply-net label; the reusable default remains VS. */
  supplyNetName?: string;
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
  chipName = "U1",
  bypassCapacitorName = "C1",
  inlineNetLabels = false,
  schematicStyle = "triangle",
  supplyNetName = "VS",
  ...props
}: InstrumentationAmplifier_INA350Props) => {
  if (gain !== "external" && gain !== 30 && gain !== 50) {
    throw new Error(`INA350CDS supports gains 30/50, not ${gain}`);
  }
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;
  return (
    <subcircuit
      width={7}
      height={5}
      minTraceWidth={0.1}
      nominalTraceWidth={0.1}
      {...props}
      {...(inlineNetLabels
        ? {
            schTraceAutoLabelEnabled: false,
            schMaxTraceDistance: schematicStyle === "box" ? "4mm" : "1000mm",
          }
        : {})}
    >
      <INA350CDSIDSGR
        name={chipName}
        schSectionName={props.schSectionName}
        pcbX={0}
        pcbY={0}
        schX={0}
        schY={0}
        schWidth={schematicStyle === "box" ? "4.2mm" : undefined}
        schHeight={schematicStyle === "box" ? "5mm" : undefined}
        schPinArrangement={
          schematicStyle === "box"
            ? {
                leftSide: {
                  direction: "top-to-bottom",
                  pins: ["V_POS", "IN_NEG", "IN_POS", "SHDN", "GS"],
                },
                rightSide: {
                  direction: "top-to-bottom",
                  pins: ["OUT", "REF"],
                },
                bottomSide: {
                  direction: "left-to-right",
                  pins: ["EP", "V_NEG"],
                },
              }
            : undefined
        }
        schPinStyle={
          schematicStyle === "box"
            ? {
                IN_NEG: { marginTop: 0.25 },
                IN_POS: { marginTop: 0.25 },
                SHDN: { marginTop: 0.25 },
                GS: { marginTop: 0.25 },
                REF: { marginTop: 0.8 },
                V_NEG: { marginLeft: 0.7 },
              }
            : undefined
        }
        symbol={
          schematicStyle === "triangle" ? (
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
          ) : schematicStyle === "box" ? (
            <symbol>
              <schematicpath
                points={[
                  { x: -2.1, y: 2.5 },
                  { x: 2.1, y: 2.5 },
                  { x: 2.1, y: -2.5 },
                  { x: -2.1, y: -2.5 },
                  { x: -2.1, y: 2.5 },
                ]}
                strokeWidth={0.04}
              />
              <schematictext
                text="{NAME}"
                schX={-1.8}
                schY={2.78}
                anchor="left"
                fontSize={0.22}
              />
              <schematictext
                text="INA350CDSIDSGR"
                schX={-2.1}
                schY={-2.78}
                anchor="left"
                fontSize={0.2}
              />
              <schematictext
                text="Thermal_Pad"
                schX={0.35}
                schY={-1.92}
                fontSize={0.18}
              />
              <schematicpath
                points={[
                  { x: -0.95, y: 1.05 },
                  { x: 0.95, y: 0.25 },
                  { x: -0.95, y: -0.55 },
                  { x: -0.95, y: 1.05 },
                ]}
                strokeWidth={0.04}
              />
              <schematictext text="-" schX={-0.72} schY={0.68} fontSize={0.3} />
              <schematictext
                text="+"
                schX={-0.72}
                schY={-0.18}
                fontSize={0.3}
              />
              <port
                name="pin7"
                pinNumber={7}
                schX={-3.2}
                schY={1.9}
                direction="left"
                schStemLength={1.2}
              />
              <port
                name="pin2"
                pinNumber={2}
                schX={-2.5}
                schY={1.05}
                direction="left"
                schStemLength={0.5}
              />
              <port
                name="pin3"
                pinNumber={3}
                schX={-2.5}
                schY={0.25}
                direction="left"
                schStemLength={0.5}
              />
              <port
                name="pin8"
                pinNumber={8}
                schX={-2.5}
                schY={-0.65}
                direction="left"
                schStemLength={0.5}
              />
              <port
                name="pin1"
                pinNumber={1}
                schX={-2.5}
                schY={-1.5}
                direction="left"
                schStemLength={0.5}
              />
              <port
                name="pin6"
                pinNumber={6}
                schX={2.5}
                schY={0.9}
                direction="right"
                schStemLength={0.5}
              />
              <port
                name="pin5"
                pinNumber={5}
                schX={2.5}
                schY={-0.15}
                direction="right"
                schStemLength={0.5}
              />
              <port
                name="pin9"
                pinNumber={9}
                schX={0.5}
                schY={-2.9}
                direction="down"
                schStemLength={0.5}
              />
              <port
                name="pin4"
                pinNumber={4}
                schX={1.3}
                schY={-2.9}
                direction="down"
                schStemLength={0.5}
              />
            </symbol>
          ) : undefined
        }
      />
      <trace
        name="INPUT_NEGATIVE"
        schDisplayLabel="IN_NEG"
        from={`.${chipName} > .IN_NEG`}
        to="net.IN_NEG"
      />
      <trace
        name="INPUT_POSITIVE"
        schDisplayLabel="IN_POS"
        from={`.${chipName} > .IN_POS`}
        to="net.IN_POS"
      />
      <trace
        name="OUTPUT"
        schDisplayLabel="OUT"
        from={`.${chipName} > .OUT`}
        to="net.OUT"
      />

      <capacitor
        name={bypassCapacitorName}
        schSectionName={props.schSectionName}
        capacitance="0.1uF"
        maxVoltageRating="25V"
        footprint="0402"
        pcbX={2.4}
        pcbY={-0.26}
        pcbRotation={-90}
        schX={schematicStyle === "box" ? -6 : 1.5}
        schY={schematicStyle === "box" ? 0.8 : 3.1}
        schRotation={schematicStyle === "box" ? undefined : -90}
        schOrientation={schematicStyle === "box" ? "vertical" : undefined}
      />
      <netlabel
        net={supplyNetName}
        schX={-1}
        schY={3.1}
        anchorSide="bottom"
        connectsTo={`.${chipName} > .V_POS`}
        inline={inlineNetLabels}
      />
      <netlabel
        net={supplyNetName}
        schX={1.5}
        schY={3.7}
        anchorSide="bottom"
        connectsTo={`.${bypassCapacitorName} > .pin1`}
        inline={inlineNetLabels}
      />
      <trace
        name="ENABLE"
        schDisplayLabel={shutdown === "external" ? "SHDN" : undefined}
        from={`.${chipName} > .SHDN`}
        to={shutdown === "external" ? "net.SHDN" : `.${chipName} > .V_POS`}
      />
      <trace
        name="GAIN_SELECT"
        schDisplayLabel={gain === "external" ? "GS" : undefined}
        from={`.${chipName} > .GS`}
        to={
          gain === "external"
            ? "net.GS"
            : gain === 50
              ? `.${chipName} > .V_POS`
              : "net.GND"
        }
        // Keep the high-gain strap off the top-layer SHDN escape route.
        pcbPathRelativeTo={`.${chipName} > .GS`}
        pcbPath={
          gain === 50
            ? [
                `.${chipName} > .GS`,
                { x: -1.7, y: 0.75, via: true, toLayer: "bottom" },
                { x: 1.7, y: 0.25, via: true, toLayer: "top" },
                `.${chipName} > .V_POS`,
              ]
            : undefined
        }
      />
      <netlabel
        net="GND"
        schX={1.5}
        schY={2.45}
        anchorSide="top"
        connectsTo={`.${bypassCapacitorName} > .pin2`}
        inline={inlineNetLabels}
      />
      {schematicStyle === "box" && (
        <netlabel
          net="GND"
          connectsTo={`.${chipName} > .V_NEG`}
          anchorSide="top"
        />
      )}

      <trace
        name="THERMAL_PAD"
        from={`.${chipName} > .EP`}
        to={`.${chipName} > .V_NEG`}
      />
      <trace
        name="REFERENCE"
        schDisplayLabel="REF"
        from={`.${chipName} > .REF`}
        to="net.REF"
      />
      <trace name="GROUND" from={`.${chipName} > .V_NEG`} to="net.GND" />
      {inlineNetLabels && (
        <TIDA010266InlineNetPorts
          originX={originX}
          originY={originY}
          ports={[
            {
              name: "IN_NEG",
              connectsTo: `.${chipName} > .IN_NEG`,
              schX: -3,
              schY: schematicStyle === "box" ? 0.8 : 1,
              direction: "left",
            },
            {
              name: "IN_POS",
              connectsTo: `.${chipName} > .IN_POS`,
              schX: -3,
              schY: schematicStyle === "box" ? 0 : -1,
              direction: "left",
            },
            {
              name: "OUT",
              connectsTo: `.${chipName} > .OUT`,
              schX: 3,
              schY: schematicStyle === "box" ? 0.8 : 0,
              direction: "right",
            },
            {
              name: "V_POS",
              net: supplyNetName,
              connectsTo: [
                `.${chipName} > .V_POS`,
                `.${bypassCapacitorName} > .pin1`,
              ],
              inlineLabelConnectsTo:
                schematicStyle === "box"
                  ? `.${bypassCapacitorName} > .pin1`
                  : undefined,
              schX: schematicStyle === "box" ? -5.8 : -1,
              schY: schematicStyle === "box" ? 1.9 : 3.7,
              direction: schematicStyle === "box" ? "left" : "up",
            },
            {
              name: "V_NEG",
              net: "GND",
              connectsTo: [`.${chipName} > .V_NEG`, `.${chipName} > .EP`],
              inlineLabelConnectsTo:
                schematicStyle === "box" ? false : undefined,
              schX: schematicStyle === "box" ? 1 : -1,
              schY: -3,
              direction: "down",
            },
            {
              name: "REF",
              connectsTo: `.${chipName} > .REF`,
              schX: schematicStyle === "box" ? 3 : 1.5,
              schY: schematicStyle === "box" ? 0 : -2.2,
              direction: schematicStyle === "box" ? "right" : "down",
            },
            {
              name: "GS",
              connectsTo: `.${chipName} > .GS`,
              schX: schematicStyle === "box" ? -3 : -0.35,
              schY: schematicStyle === "box" ? -1.4 : 3,
              direction: schematicStyle === "box" ? "left" : "up",
            },
            {
              name: "SHDN",
              connectsTo: `.${chipName} > .SHDN`,
              schX: schematicStyle === "box" ? -3 : -1.65,
              schY: schematicStyle === "box" ? -0.8 : 3,
              direction: schematicStyle === "box" ? "left" : "up",
            },
          ]}
        />
      )}
      {schematicStyle === "triangle" && (
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
      )}
    </subcircuit>
  );
};

export default InstrumentationAmplifier_INA350;
