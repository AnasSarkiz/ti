import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { CSD19532Q5B } from "../chips/CSD19532Q5B.circuit.tsx";
import { LM5050Q1MKX_1_NOPB } from "../chips/LM5050Q1MKX_1_NOPB.circuit.tsx";
import { NTR5198NLT1G } from "../chips/NTR5198NLT1G.circuit.tsx";

const bidirectionalTvsSymbol = (
  <symbol>
    <port
      name="pin2"
      pinNumber={2}
      schX={0}
      schY={0.72}
      direction="up"
      schStemLength={0.36}
    />
    <schematicpath
      points={[
        { x: -0.24, y: 0.24 },
        { x: 0.24, y: 0.24 },
        { x: 0, y: 0.04 },
        { x: -0.24, y: 0.24 },
      ]}
      strokeWidth={0.025}
      strokeColor="#840000"
      fillColor="#840000"
      isFilled
    />
    <schematicpath
      points={[
        { x: 0.24, y: -0.24 },
        { x: 0, y: -0.04 },
        { x: -0.24, y: -0.24 },
        { x: 0.24, y: -0.24 },
      ]}
      strokeWidth={0.025}
      strokeColor="#840000"
      fillColor="#840000"
      isFilled
    />
    <schematicpath
      points={[
        { x: -0.24, y: -0.12 },
        { x: -0.13, y: 0.04 },
        { x: 0.17, y: 0.04 },
      ]}
      strokeWidth={0.035}
      strokeColor="#840000"
    />
    <schematicpath
      points={[
        { x: 0.13, y: -0.04 },
        { x: 0.24, y: 0.12 },
      ]}
      strokeWidth={0.035}
      strokeColor="#840000"
    />
    <port
      name="pin1"
      pinNumber={1}
      schX={0}
      schY={-0.72}
      direction="down"
      schStemLength={0.36}
    />
    <schematictext
      text="{NAME}"
      schX={0.12}
      schY={-0.5}
      fontSize={0.18}
      anchor="left"
    />
  </symbol>
);

const singlePinTerminalSymbol = (facing: "left" | "right") => {
  const terminalX = facing === "right" ? 0.65 : -0.65;
  const bodyEdgeX = facing === "right" ? 0.3 : -0.3;

  return (
    <symbol>
      <schematicrect
        schX={0}
        schY={0}
        width={0.6}
        height={0.6}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematiccircle
        center={{ x: 0, y: 0 }}
        radius={0.19}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematicline
        x1={-0.13}
        y1={0}
        x2={0.13}
        y2={0}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematicline
        x1={0}
        y1={-0.13}
        x2={0}
        y2={0.13}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematicline
        x1={bodyEdgeX}
        y1={0}
        x2={terminalX}
        y2={0}
        strokeWidth={0.02}
        color="#840000"
      />
      <port
        name="pin1"
        pinNumber={1}
        schX={terminalX}
        schY={0}
        direction={facing}
        schStemLength={0}
      />
      <schematictext
        text="{NAME}"
        schX={-0.28}
        schY={0.37}
        fontSize={0.18}
        anchor="bottom_left"
      />
    </symbol>
  );
};

const twoPinHeaderSymbol = (
  <symbol>
    <schematicrect
      schX={0}
      schY={0}
      width={0.62}
      height={0.72}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematiccircle
      center={{ x: 0, y: 0.18 }}
      radius={0.08}
      strokeWidth={0.02}
      color="#840000"
      isFilled
      fillColor="#840000"
    />
    <schematicrect
      schX={0}
      schY={-0.18}
      width={0.16}
      height={0.16}
      strokeWidth={0.02}
      color="#840000"
      isFilled
      fillColor="#840000"
    />
    <schematicline
      x1={0.31}
      y1={0.18}
      x2={0.65}
      y2={0.18}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={0.31}
      y1={-0.18}
      x2={0.65}
      y2={-0.18}
      strokeWidth={0.02}
      color="#840000"
    />
    <port
      name="pin1"
      pinNumber={1}
      schX={0.65}
      schY={0.18}
      direction="right"
      schStemLength={0}
    />
    <port
      name="pin2"
      pinNumber={2}
      schX={0.65}
      schY={-0.18}
      direction="right"
      schStemLength={0}
    />
    <schematictext
      text="{NAME}"
      schX={-0.28}
      schY={0.43}
      fontSize={0.18}
      anchor="bottom_left"
    />
  </symbol>
);

const terminalFootprint = () => (
  <footprint insertionDirection="from_above">
    <platedhole
      portHints={["pin1"]}
      pcbX="0mm"
      pcbY="0mm"
      shape="circle"
      holeDiameter="3.6mm"
      outerDiameter="5.1mm"
    />
  </footprint>
);

const twoPinHeaderFootprint = (
  <footprint insertionDirection="from_above">
    <platedhole
      portHints={["pin1"]}
      pcbX="0mm"
      pcbY="1.27mm"
      shape="circle"
      holeDiameter="1mm"
      outerDiameter="1.8mm"
    />
    <platedhole
      portHints={["pin2"]}
      pcbX="0mm"
      pcbY="-1.27mm"
      shape="circle"
      holeDiameter="1mm"
      outerDiameter="1.8mm"
    />
  </footprint>
);

/** TIDA-00992 automotive reverse-polarity protection reference schematic. */
export const PowerSupply_LM5050_TIDA00992 = (props: SubcircuitProps) => (
  <subcircuit width="42mm" height="30mm" schMaxTraceDistance="6mm" {...props}>
    <net name="GND" isGroundNet />
    <net name="VBATT" isPowerNet />
    <net name="V_OUT" />
    <net name="ENABLE" />
    <autoroutingphase name="C3 decoupling" phaseIndex={0} />

    <CSD19532Q5B
      name="Q1"
      internallyConnectedPins={[
        [1, 2, 3],
        [5, 6, 7, 8, 9],
      ]}
      schX={2.8}
      schY={4.05}
      pcbX={0}
      pcbY={8}
      pcbRotation={90}
      symbol={
        <symbol>
          <schematicpath
            points={[
              { x: -0.1, y: -0.42 },
              { x: -0.11, y: 0.05 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: 0.55, y: 0.3 },
              { x: 0.11, y: 0.3 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: -0.55, y: 0.31 },
              { x: -0.01, y: 0.31 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: 0.11, y: 0.09 },
              { x: 0.11, y: 0.31 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: 0.15, y: 0.09 },
              { x: 0.07, y: 0.09 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: -0.1, y: 0.09 },
              { x: -0.1, y: 0.31 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: -0.08, y: 0.09 },
              { x: -0.15, y: 0.09 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: 0.03, y: 0.09 },
              { x: -0.04, y: 0.09 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: -0.04, y: 0.27 },
              { x: 0.03, y: 0.27 },
              { x: 0, y: 0.2 },
              { x: -0.04, y: 0.27 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
            fillColor="#880000"
            isFilled
          />
          <schematicpath
            points={[
              { x: 0, y: 0.09 },
              { x: -0.01, y: 0.31 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <schematicpath
            points={[
              { x: 0.11, y: 0.05 },
              { x: -0.11, y: 0.05 },
            ]}
            strokeColor="#880000"
            strokeWidth={0.02}
          />
          <port
            name="pin1"
            pinNumber={1}
            aliases={["S3"]}
            direction="left"
            schX={-0.55}
            schY={0.31}
            schStemLength={0}
          />
          <port
            name="pin2"
            pinNumber={2}
            aliases={["S2"]}
            direction="left"
            schX={-0.55}
            schY={0.31}
            schStemLength={0}
          />
          <port
            name="pin3"
            pinNumber={3}
            aliases={["S1"]}
            direction="left"
            schX={-0.55}
            schY={0.31}
            schStemLength={0}
          />
          <port
            name="pin4"
            pinNumber={4}
            aliases={["G"]}
            direction="down"
            schX={-0.1}
            schY={-0.42}
            schStemLength={0}
          />
          <port
            name="pin5"
            pinNumber={5}
            aliases={["D5"]}
            direction="right"
            schX={0.55}
            schY={0.3}
            schStemLength={0}
          />
          <port
            name="pin6"
            pinNumber={6}
            aliases={["D4"]}
            direction="right"
            schX={0.55}
            schY={0.3}
            schStemLength={0}
          />
          <port
            name="pin7"
            pinNumber={7}
            aliases={["D3"]}
            direction="right"
            schX={0.55}
            schY={0.3}
            schStemLength={0}
          />
          <port
            name="pin8"
            pinNumber={8}
            aliases={["D2"]}
            direction="right"
            schX={0.55}
            schY={0.3}
            schStemLength={0}
          />
          <port
            name="pin9"
            pinNumber={9}
            aliases={["D1"]}
            direction="right"
            schX={0.55}
            schY={0.3}
            schStemLength={0}
          />
        </symbol>
      }
    />
    <schematictext schX={3.28} schY={4.45} text="Q1" fontSize={0.18} />
    <schematictext schX={2.8} schY={4.8} text="100V" fontSize={0.22} />
    <schematictext schX={1.9} schY={3.82} text="1,2,3" fontSize={0.18} />
    <schematictext schX={3.63} schY={3.82} text="7,8" fontSize={0.18} />
    <schematictext schX={3.18} schY={3.5} text="5,6," fontSize={0.18} />

    <LM5050Q1MKX_1_NOPB
      name="U1"
      schX={2.4}
      schY={1.45}
      pcbX={0}
      pcbY={1.5}
      schWidth={2.3}
      schHeight={2.7}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [1, 4, 3],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [5, 6, 2],
        },
      }}
      schPinStyle={{
        pin1: { marginBottom: 0.55 },
        pin4: { marginBottom: 0.55 },
        pin5: { marginBottom: 0.55 },
        pin6: { marginBottom: 0.55 },
      }}
    />

    <NTR5198NLT1G
      name="Q2"
      schX={2.75}
      schY={-2.9}
      pcbX={5.4}
      pcbY={0.869}
      pcbRotation={90}
    />
    <schematictext schX={3.38} schY={-2.98} text="60V" fontSize={0.22} />

    <connector
      name="J1"
      pinCount={1}
      manufacturerPartNumber="7693"
      symbol={singlePinTerminalSymbol("right")}
      footprint={terminalFootprint()}
      schX={-8.85}
      schY={4.1}
      pcbX={-16.8}
      pcbY={11}
    />
    <connector
      name="J2"
      pinCount={1}
      manufacturerPartNumber="7693"
      symbol={singlePinTerminalSymbol("left")}
      footprint={terminalFootprint()}
      schX={8.7}
      schY={4.1}
      pcbX={16.8}
      pcbY={11}
    />
    <connector
      name="J3"
      pinCount={1}
      manufacturerPartNumber="7693"
      symbol={singlePinTerminalSymbol("right")}
      footprint={terminalFootprint()}
      schX={-8.85}
      schY={0.5}
      pcbX={-16.8}
      pcbY={-11}
    />
    <connector
      name="J4"
      pinCount={1}
      manufacturerPartNumber="7693"
      symbol={singlePinTerminalSymbol("left")}
      footprint={terminalFootprint()}
      schX={8.7}
      schY={0}
      pcbX={16.8}
      pcbY={-11}
    />
    <connector
      name="J5"
      pinCount={2}
      manufacturerPartNumber="HTSW-102-07-G-S"
      symbol={twoPinHeaderSymbol}
      footprint={twoPinHeaderFootprint}
      schX={-8}
      schY={-3.15}
      pcbX={-2.05}
      pcbY={-5.81}
    />

    <testpoint
      name="TP1"
      symbolName="testpoint_up"
      manufacturerPartNumber="5000"
      footprintVariant="through_hole"
      holeDiameter="1mm"
      padDiameter="1.8mm"
      schX={0.75}
      schY={3.4}
      pcbX={5.85}
      pcbY={-5.81}
    />
    <testpoint
      name="TP2"
      symbolName="testpoint_up"
      manufacturerPartNumber="5000"
      footprintVariant="through_hole"
      holeDiameter="1mm"
      padDiameter="1.8mm"
      schX={4.85}
      schY={3.4}
      pcbX={-7}
      pcbY={4.5}
    />
    <testpoint
      name="TP3"
      symbolName="testpoint_up"
      manufacturerPartNumber="5004"
      footprintVariant="through_hole"
      holeDiameter="1mm"
      padDiameter="1.8mm"
      schX={0.2}
      schY={2.65}
      pcbX={10.34}
      pcbY={-0.68}
    />
    <testpoint
      name="TP4"
      symbolName="testpoint_up"
      manufacturerPartNumber="5004"
      footprintVariant="through_hole"
      holeDiameter="1mm"
      padDiameter="1.8mm"
      schX={-2.25}
      schY={-2.65}
      pcbX={-11}
      pcbY={-4.57}
    />

    <capacitor
      name="C1"
      capacitance="0.1uF"
      footprint="1206"
      manufacturerPartNumber="VJ1206Y104KBBAT4X"
      schX={-8.1}
      schY={2.95}
      pcbX={-13}
      pcbY={6}
      pcbRotation={90}
      schOrientation="vertical"
    />
    <capacitor
      name="C2"
      capacitance="0.1uF"
      footprint="1206"
      manufacturerPartNumber="VJ1206Y104KBBAT4X"
      schX={-7.15}
      schY={1.8}
      pcbX={-13}
      pcbY={-6}
      pcbRotation={90}
      schOrientation="horizontal"
    />
    <capacitor
      name="C3"
      capacitance="0.1uF"
      footprint="0603"
      manufacturerPartNumber="GRM188R72A104KA35J"
      maxDecouplingTraceLength="6mm"
      schX={-3.2}
      schY={0.75}
      pcbX={2.915}
      pcbY={1.025}
      pcbRotation={90}
      schOrientation="vertical"
    />
    <capacitor
      name="C4"
      capacitance="4.7uF"
      footprint="1210"
      manufacturerPartNumber="GRM32ER71K475KE14L"
      schX={7.4}
      schY={0.4}
      pcbX={13}
      pcbY={1}
      pcbRotation={90}
      schOrientation="vertical"
    />

    <diode
      name="D1"
      tvs
      symbol={bidirectionalTvsSymbol}
      footprint="smc"
      manufacturerPartNumber="1.5SMC33CA-E3/57T"
      schX={-5.55}
      schY={1.93}
      pcbX={-9}
      pcbY={0}
      schOrientation="vertical"
    />
    <diode
      name="D2"
      symbolName="schottky_diode"
      footprint="sod323"
      manufacturerPartNumber="BAS 170W E6327"
      schX={-2.45}
      schY={0.25}
      pcbX={-8.5}
      pcbY={-4.5}
      schOrientation="neg_top"
    />
    <led
      name="D3"
      color="green"
      schDisplayValue="Green"
      footprint="0603"
      manufacturerPartNumber="LNJ337W83RA"
      schX={-0.33}
      schY={-0.24}
      pcbX={8}
      pcbY={-4}
      pcbRotation={90}
      schOrientation="pos_top"
    />
    <diode
      name="D4"
      symbolName="schottky_diode"
      footprint="sod323"
      manufacturerPartNumber="PMEG6010CEJ,115"
      schX={2.75}
      schY={-1.65}
      pcbX={1}
      pcbY={-4.5}
      schOrientation="pos_top"
    />
    <diode
      name="D5"
      symbolName="zener_diode"
      footprint="sod323"
      manufacturerPartNumber="BZT52C9V1S-7-F"
      schX={1.6}
      schY={-3.85}
      pcbX={-2.5}
      pcbY={-9.7}
      schOrientation="neg_top"
    />

    <schematictext
      schX={-5.12}
      schY={2.15}
      text="28.2V"
      fontSize={0.22}
      anchor="center_left"
    />
    <schematictext
      schX={-2.02}
      schY={-0.13}
      text="70V"
      fontSize={0.22}
      anchor="center_left"
    />
    <schematictext
      schX={3.18}
      schY={-1.73}
      text="60V"
      fontSize={0.22}
      anchor="center_left"
    />
    <schematictext
      schX={1.15}
      schY={-3.75}
      text="9.1V"
      fontSize={0.22}
      anchor="center_right"
    />

    <resistor
      name="R1"
      resistance="10kohm"
      footprint="0402"
      manufacturerPartNumber="CRCW040210K0FKED"
      schX={6.0}
      schY={1.75}
      pcbX={8.8}
      pcbY={3}
      schRotation={90}
    />
    <resistor
      name="R2"
      resistance="10kohm"
      footprint="0402"
      manufacturerPartNumber="CRCW040210K0FKED"
      schX={-0.88}
      schY={0.97}
      pcbX={10}
      pcbY={-4}
      pcbRotation={270}
      schRotation={90}
    />
    <resistor
      name="R3"
      resistance="20kohm"
      footprint="0603"
      manufacturerPartNumber="RG1608P-203-B-T5"
      schX={-3.55}
      schY={-2.9}
      pcbX={-7}
      pcbY={-10.5}
    />
    <resistor
      name="R4"
      resistance="10kohm"
      footprint="0402"
      manufacturerPartNumber="CRCW040210K0FKED"
      schX={-2.15}
      schY={-3.6}
      pcbX={-5.5}
      pcbY={-8}
      schRotation={90}
    />

    <schematictext
      schX={-7.4}
      schY={-1.88}
      text="Open = Diable LM5050-Q1"
      fontSize={0.22}
      anchor="center_right"
    />
    <schematictext
      schX={-7.4}
      schY={-2.16}
      text="Close = Enable LM5050-Q1"
      fontSize={0.22}
      anchor="center_right"
    />

    {/* Input and output rails from the reference schematic. */}
    <trace from=".J1 > .pin1" to=".C1 > .pin1" />
    <trace from=".C1 > .pin1" to=".D1 > .pin2" />
    <trace from=".D1 > .pin2" to=".D2 > .cathode" />
    <trace from=".D2 > .cathode" to=".R2 > .pin2" />
    <trace from=".D2 > .cathode" to=".U1 > .IN" />
    <trace from=".U1 > .IN" to=".Q1 > .pin1" />

    <trace from=".Q1 > .pin5" to=".J2 > .pin1" />
    <trace from=".Q1 > .pin5" to=".U1 > .OUT" />
    <trace from=".U1 > .OUT" to=".R1 > .pin1" />
    <trace from=".R1 > .pin1" to=".C4 > .pin1" />
    <trace from=".C4 > .pin1" to="net.V_OUT" schDisplayLabel="V_OUT" />

    {/* Input transient protection and series capacitors. */}
    <trace from=".C1 > .pin2" to=".C2 > .pin2" />
    <trace from=".J3 > .pin1" to=".C2 > .pin1" />
    <trace from=".C2 > .pin1" to=".D1 > .pin1" />
    <trace from=".D1 > .pin1" to="net.GND" schDisplayLabel="GND" />

    {/* VS bypass and MOSFET gate drive. */}
    <trace from=".U1 > .VS" to=".C3 > .pin1" routingPhaseIndex={0} />
    <trace from=".C3 > .pin1" to=".R1 > .pin2" maxLength="14mm" />
    <trace from=".U1 > .GATE" to=".Q1 > .pin4" />
    <trace from=".TP1 > .pin1" to=".U1 > .VS" />
    <trace from=".TP2 > .pin1" to=".U1 > .GATE" />
    <trace from=".TP3 > .pin1" to=".U1 > .OFF" />

    {/* Switched controller-ground network. */}
    <trace from=".R2 > .pin1" to=".D3 > .anode" />
    <trace from=".D2 > .anode" to=".D3 > .cathode" />
    <trace from=".D3 > .cathode" to=".U1 > .GND" />
    <trace from=".U1 > .GND" to=".D4 > .anode" />
    <trace from=".D4 > .cathode" to=".Q2 > .D" />

    {/* Functional enable input and Q2 gate clamp. */}
    <trace from=".J5 > .pin1" to=".R3 > .pin1" />
    <trace from=".J5 > .pin2" to="net.V_OUT" schDisplayLabel="V_OUT" />
    <trace from=".TP4 > .pin1" to=".R3 > .pin2" />
    <trace from=".R3 > .pin2" to=".Q2 > .G" />
    <trace from=".Q2 > .G" to=".R4 > .pin2" />
    <trace from=".Q2 > .G" to=".D5 > .cathode" />
    <trace from=".R4 > .pin1" to=".D5 > .anode" />
    <trace from=".D5 > .anode" to=".Q2 > .S" />
    <trace from=".Q2 > .S" to=".C4 > .pin2" />
    <trace from=".C4 > .pin2" to=".J4 > .pin1" />
    <trace from=".C4 > .pin2" to="net.GND" schDisplayLabel="GND" />
    <trace
      from=".C3 > .pin2"
      to="net.GND"
      schDisplayLabel="GND"
      routingPhaseIndex={0}
    />
  </subcircuit>
);

export default PowerSupply_LM5050_TIDA00992;
