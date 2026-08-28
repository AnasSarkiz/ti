import type { ChipProps } from "@tscircuit/props";
import "tscircuit";
import { SN74LVC1G34DBVR_FOOTPRINT } from "./jlcpcb-footprints";

const logicBufferSymbol = (
  <symbol>
    <schematicpath
      points={[
        { x: -0.55, y: 0.5 },
        { x: -0.55, y: -0.5 },
        { x: 0.55, y: 0 },
        { x: -0.55, y: 0.5 },
      ]}
      strokeWidth={0.03}
    />
    <schematicline x1={-0.85} y1={0} x2={-0.55} y2={0} strokeWidth={0.03} />
    <schematicline x1={0.55} y1={0} x2={0.85} y2={0} strokeWidth={0.03} />
    <schematicline
      x1={-0.1}
      y1={0.295}
      x2={-0.1}
      y2={0.75}
      strokeWidth={0.03}
    />
    <schematicline
      x1={-0.1}
      y1={-0.295}
      x2={-0.1}
      y2={-0.75}
      strokeWidth={0.03}
    />
    <schematictext
      text="LVC1G34"
      schX={-0.1}
      schY={0}
      fontSize={0.12}
      anchor="center"
    />
    <port
      name="pin2"
      pinNumber={2}
      direction="left"
      schX={-0.85}
      schY={0}
      schStemLength={0}
    />
    <port
      name="pin4"
      pinNumber={4}
      direction="right"
      schX={0.85}
      schY={0}
      schStemLength={0}
    />
    <port
      name="pin5"
      pinNumber={5}
      direction="up"
      schX={-0.1}
      schY={0.75}
      schStemLength={0}
    />
    <port
      name="pin3"
      pinNumber={3}
      direction="down"
      schX={-0.1}
      schY={-0.75}
      schStemLength={0}
    />
  </symbol>
);

export const SN74LVC1G34DBVR = (props: ChipProps) => (
  <chip
    manufacturerPartNumber="SN74LVC1G34DBVR"
    supplierPartNumbers={{ jlcpcb: ["C840096"] }}
    footprint={SN74LVC1G34DBVR_FOOTPRINT}
    noConnect={["pin1"]}
    symbol={logicBufferSymbol}
    {...props}
  />
);

export default SN74LVC1G34DBVR;
