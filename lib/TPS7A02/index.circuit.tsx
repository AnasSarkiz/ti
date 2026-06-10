import { TPS7A0230PDBVR } from "./TPS7A0230PDBVR";
export const TPS63802 = () => (
  <subcircuit name="TPS7A0230PDBVR" routingDisabled>
    <TPS7A0230PDBVR
      name="U1"
      schX={0}
      schY={0}
      schWidth={1.5}
      schHeight={1.5}
      schPinArrangement={{
        leftSide: {
          direction: "right-to-left",
          pins: ["EN", "IN"],
        },
        rightSide: {
          direction: "left-to-right",
          pins: ["OUT", "GND"],
        },
      }}
      schPinStyle={{
        IN: { marginBottom: 0.45 },
        OUT: { marginBottom: 0.45 },
      }}
    />

    <battery name="VBAT" schX={-3} schY={-1} schRotation="270deg" />

    <capacitor
      name="C1"
      capacitance="0uF"
      schX={-1.3}
      schY={-1.6}
      capacitance="1uF"
      schOrientation="vertical"
    />

    <capacitor
      name="C2"
      capacitance="0uF"
      schX={2}
      schY={-1}
      capacitance="1uF"
      schOrientation="vertical"
    />
    <chip
      name="Load"
      schX={3.2}
      schY={-1}
      schHeight={1}
      schWidth={1}
      schPinArrangement={{
        topSide: {
          direction: "top-to-bottom",
          pins: ["pin1"],
        },
        bottomSide: {
          direction: "bottom-to-top",
          pins: ["pin2"],
        },
      }}
      pinLabels={{
        pin1: "pin1",
        pin2: "pin2",
      }}
    />

    <trace from="U1.pin2" to="net.GND" />
    <trace from="VBAT.pin2" to="U1.pin1" />
    <trace from="VBAT.pin1" to="net.GND" />
    <trace from="VBAT.pin2" to="U1.EN" />
    <trace from="C1.pin1" to="U1.IN" />
    <trace from="C1.pin2" to="net.GND" />
    <trace from="C2.pin1" to="U1.OUT" />
    <trace from="C2.pin2" to="net.GND" />
    <trace from="Load.pin1" to="U1.OUT" />
    <trace from="Load.pin2" to="net.GND" />
  </subcircuit>
);

export default TPS63802;
