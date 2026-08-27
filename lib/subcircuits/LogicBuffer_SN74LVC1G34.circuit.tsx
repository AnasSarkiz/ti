import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";

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

/**
 * SN74LVC1G34 datasheet Figure 8-1 "Buffer Function" application.
 * @see https://www.ti.com/lit/gpn/SN74LVC1G34
 */
export const LogicBuffer_SN74LVC1G34 = (props: SubcircuitProps) => (
  <subcircuit routingDisabled {...props}>
    <chip
      name="U1"
      manufacturerPartNumber="SN74LVC1G34DBVR"
      symbol={logicBufferSymbol}
      schX={0}
      schY={0}
      connections={{
        pin2: "net.MCU_OR_LOGIC_IN",
        pin4: "net.MCU_OR_LOGIC_OUT",
        pin5: "net.VCC",
        pin3: "net.GND",
      }}
    />
    <schematictext
      text="Buffer Function"
      schX={-0.55}
      schY={1.3}
      fontSize={0.2}
    />
  </subcircuit>
);

export default LogicBuffer_SN74LVC1G34;
