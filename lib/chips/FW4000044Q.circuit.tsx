import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const FW4000044Q_PIN_LABELS = {
  pin1: "XTAL_P",
  pin2: ["CASE_1", "GND_1"],
  pin3: "XTAL_N",
  pin4: ["CASE_2", "GND_2"],
} as const;

const renderFw4000044qSymbol = () => (
  <symbol>
    <schematicrect
      schX={0}
      schY={0}
      width={2.286}
      height={1.016}
      strokeWidth={0}
      color="#fff8b5"
      isFilled
    />
    <schematicrect
      schX={0}
      schY={0}
      width={2.286}
      height={1.016}
      strokeWidth={0.03}
      color="#8b5a00"
    />
    <schematicline
      x1={-0.25}
      y1={0.28}
      x2={-0.25}
      y2={-0.28}
      strokeWidth={0.03}
      color="#8b5a00"
    />
    <schematicrect
      schX={0}
      schY={0}
      width={0.22}
      height={0.58}
      strokeWidth={0.03}
      color="#8b5a00"
    />
    <schematicline
      x1={0.25}
      y1={0.28}
      x2={0.25}
      y2={-0.28}
      strokeWidth={0.03}
      color="#8b5a00"
    />
    <port
      name="pin1"
      pinNumber={1}
      schX={-1.651}
      schY={0.254}
      direction="left"
      schStemLength={0.508}
    />
    <port
      name="pin2"
      pinNumber={2}
      schX={-1.651}
      schY={-0.254}
      direction="left"
      schStemLength={0.508}
    />
    <port
      name="pin3"
      pinNumber={3}
      schX={1.651}
      schY={0.254}
      direction="right"
      schStemLength={0.508}
    />
    <port
      name="pin4"
      pinNumber={4}
      schX={1.651}
      schY={-0.254}
      direction="right"
      schStemLength={0.508}
    />
    <schematictext
      text="{NAME}"
      schX={-1.143}
      schY={0.72}
      fontSize={0.18}
      anchor="bottom_left"
    />
    <schematictext
      text="FW4000044Q"
      schX={-1.143}
      schY={-0.72}
      fontSize={0.16}
      anchor="top_left"
    />
  </symbol>
);

const renderCrystalFootprint = () => (
  <footprint>
    <smtpad
      portHints={["pin1"]}
      pcbX={-0.799973}
      pcbY={-0.575056}
      width="1.0999978mm"
      height="0.7999984mm"
      shape="rect"
    />
    <smtpad
      portHints={["pin2"]}
      pcbX={0.799973}
      pcbY={-0.574802}
      width="1.0999978mm"
      height="0.7999984mm"
      shape="rect"
    />
    <smtpad
      portHints={["pin3"]}
      pcbX={0.799973}
      pcbY={0.575056}
      width="1.0999978mm"
      height="0.7999984mm"
      shape="rect"
    />
    <smtpad
      portHints={["pin4"]}
      pcbX={-0.799973}
      pcbY={0.574802}
      width="1.0999978mm"
      height="0.7999984mm"
      shape="rect"
    />
    <silkscreenpath
      route={[
        { x: -1.623, y: 1.32842 },
        { x: 1.63584, y: 1.32842 },
        { x: 1.63584, y: -1.32842 },
        { x: -1.623, y: -1.32842 },
        { x: -1.623, y: 1.32842 },
      ]}
    />
  </footprint>
);

/** 40 MHz four-pad crystal used by the TIDEP-01024 AWR1843AOPEVM. */
export const FW4000044Q = (props: ChipProps<typeof FW4000044Q_PIN_LABELS>) => (
  <chip
    manufacturerPartNumber="FW4000044Q"
    supplierPartNumbers={{ jlcpcb: ["C1986227"] }}
    footprint={renderCrystalFootprint()}
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C1986227.obj?uuid=ea10362c839142d2872b159da8b8f31b",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C1986227.step?uuid=ea10362c839142d2872b159da8b8f31b",
      pcbRotationOffset: 0,
      modelOriginPosition: { x: -0.0000762, y: 0, z: -0.01 },
    }}
    pinLabels={FW4000044Q_PIN_LABELS}
    symbol={renderFw4000044qSymbol()}
    {...props}
  />
);

export default FW4000044Q;
