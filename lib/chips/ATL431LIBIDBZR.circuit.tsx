import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: ["K", "CATHODE"],
  pin2: ["R", "REF", "REFERENCE"],
  pin3: ["A", "ANODE", "GND"],
} as const;

const atl431SchematicSymbol = (
  <symbol width="1.7mm" height="2.2mm">
    <port
      name="pin1"
      pinNumber={1}
      schX={0}
      schY={1.05}
      direction="up"
      schStemLength={0.55}
      schPinLabelFontSize={0.001}
    />
    <port
      name="pin2"
      pinNumber={2}
      schX={-0.85}
      schY={0.08}
      direction="left"
      schStemLength={0.35}
      schPinLabelFontSize={0.001}
    />
    <port
      name="pin3"
      pinNumber={3}
      schX={0}
      schY={-1.05}
      direction="down"
      schStemLength={0.55}
      schPinLabelFontSize={0.001}
    />
    <schematicline
      x1={0}
      y1={0.5}
      x2={0}
      y2={0.34}
      strokeWidth={0.04}
      color="#840000"
    />
    <schematicline
      x1={-0.32}
      y1={0.3}
      x2={0.32}
      y2={0.3}
      strokeWidth={0.04}
      color="#840000"
    />
    <schematicpath
      points={[
        { x: 0, y: 0.22 },
        { x: -0.28, y: -0.18 },
        { x: 0.28, y: -0.18 },
        { x: 0, y: 0.22 },
      ]}
      strokeWidth={0.04}
      strokeColor="#840000"
      isFilled
      fillColor="#840000"
    />
    <schematicline
      x1={0}
      y1={-0.18}
      x2={0}
      y2={-0.5}
      strokeWidth={0.04}
      color="#840000"
    />
    <schematicpath
      points={[
        { x: -0.5, y: 0.08 },
        { x: -0.28, y: 0.08 },
        { x: -0.1, y: -0.06 },
      ]}
      strokeWidth={0.04}
      strokeColor="#840000"
    />
    <schematictext text="1" schX={0.2} schY={0.5} fontSize={0.13} />
    <schematictext text="2" schX={-0.58} schY={0.24} fontSize={0.13} />
    <schematictext text="3" schX={0.2} schY={-0.48} fontSize={0.13} />
    <schematictext text="{NAME}" schX={0.48} schY={0.18} fontSize={0.18} />
    <schematictext
      text="ATL431LIBIDBZR"
      schX={0.52}
      schY={-0.64}
      fontSize={0.14}
      anchor="left"
    />
  </symbol>
);

/** ATL431LI B-grade shunt reference in the DBZ 3-pin SOT-23 package. */
export const ATL431LIBIDBZR = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="ATL431LIBIDBZR"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/atl431li.pdf"
    footprint="sot23_3"
    pinLabels={pinLabels}
    showPinAliases={false}
    pinAttributes={{
      pin1: { mustBeConnected: true },
      pin2: { mustBeConnected: true },
      pin3: { requiresGround: true, mustBeConnected: true },
    }}
    symbol={atl431SchematicSymbol}
    {...props}
  />
);

export default ATL431LIBIDBZR;
