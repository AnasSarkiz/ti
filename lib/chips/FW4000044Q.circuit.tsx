import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const FW4000044Q_PIN_LABELS = {
  pin1: "XTAL_P",
  pin2: ["CASE_1", "GND_1"],
  pin3: "XTAL_N",
  pin4: ["CASE_2", "GND_2"],
} as const;

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
    schPinArrangement={{
      leftSide: [1, 2],
      rightSide: [3, 4],
    }}
    schPinStyle={{
      pin1: { marginTop: 0.508, marginBottom: 0.308 },
      pin2: { marginBottom: 0.254 },
      pin3: { marginTop: 0.508 },
      pin4: { marginTop: 0.308, marginBottom: 0.254 },
    }}
    schWidth={2.286}
    schHeight={1.27}
    {...props}
  />
);

export default FW4000044Q;
