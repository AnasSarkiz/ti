import type { SubcircuitProps } from "@tscircuit/props";
import { Fragment } from "react";
import "tscircuit";
import { LMK1C1104PWR } from "../chips/LMK1C1104PWR.circuit.tsx";

const ZERO_OHM_MPN = "RC0603JR-070RL";
const TERMINATION_MPN = "CRCW0603100RFKEA";
const LOAD_CAPACITOR_MPN = "GRM1885C2A5R0CA01D";
const HIDDEN_ROUTE_LABEL = "\u200B";
const SHEET_PORT_HEIGHT = 0.20106;

const OUTPUT_NET_NAMES = [
  "Y0",
  "Y1",
  "Y2",
  "Y3",
  "Y4",
  "Y5",
  "Y6",
  "Y7",
] as const;

type OutputNetName = (typeof OUTPUT_NET_NAMES)[number];
type SchematicPoint = readonly [x: number, y: number];

type SheetPortGraphicProps = {
  name: string;
  schX: number;
  schY: number;
  width?: number;
};

const SheetPortGraphic = ({
  name,
  schX,
  schY,
  width = 0.566622,
}: SheetPortGraphicProps) => (
  <>
    <schematicrect
      schX={schX}
      schY={schY}
      width={width}
      height={SHEET_PORT_HEIGHT}
      strokeWidth={0}
      color="#ffffff"
      isFilled
    />
    <schematicrect
      schX={schX}
      schY={schY}
      width={width}
      height={SHEET_PORT_HEIGHT}
      strokeWidth={0.02}
      color="#1f2937"
    />
    <schematictext
      text={name}
      schX={schX}
      schY={schY}
      fontSize={0.182781}
      anchor="center"
      color="#1f2937"
    />
  </>
);

const FIXTURE_SHEET_PORT_GEOMETRY: Record<
  OutputNetName,
  { centerX: number; width: number }
> = {
  Y0: { centerX: -14.156418, width: 0.566622 },
  Y1: { centerX: -14.156418, width: 0.566622 },
  Y2: { centerX: -6.4796, width: 0.566622 },
  Y3: { centerX: -6.470461, width: 0.5849 },
  Y4: { centerX: 0.648874, width: 0.566622 },
  Y5: { centerX: 0.658013, width: 0.5849 },
  Y6: { centerX: 7.594566, width: 0.566622 },
  Y7: { centerX: 7.603705, width: 0.5849 },
};

type SmaConnectorProps = {
  name: string;
  schX: number;
  schY: number;
  pcbX: number;
  pcbY: number;
  pcbSignalSide: "left" | "right";
  signalSide: "left" | "right";
  schSectionName: string;
  doNotPlace?: boolean;
};

const SmaConnector = ({
  name,
  schX,
  schY,
  pcbX,
  pcbY,
  pcbSignalSide,
  signalSide,
  schSectionName,
  doNotPlace,
}: SmaConnectorProps) => {
  const isInput = signalSide === "right";
  const signalPortX = isInput ? 0.456953 : -0.456953;
  const signalPortY = 0.073113;
  const circleX = isInput ? -0.091391 : 0.091391;
  const groundPortY = -0.475232;
  const groundPins: Array<{ pin: 2 | 3 | 4 | 5; x: number }> = isInput
    ? [
        { pin: 2, x: -0.274172 },
        { pin: 3, x: -0.091391 },
        { pin: 4, x: 0.091391 },
        { pin: 5, x: 0.274172 },
      ]
    : [
        { pin: 5, x: -0.274172 },
        { pin: 4, x: -0.091391 },
        { pin: 3, x: 0.091391 },
        { pin: 2, x: 0.274172 },
      ];

  return (
    <>
      <connector
        name={name}
        pinCount={5}
        manufacturerPartNumber="CON-SMA-EDGE-S"
        footprint={
          <footprint>
            <smtpad
              portHints={["pin1"]}
              pcbX="-3mm"
              pcbY={0}
              width="1.5mm"
              height="1.5mm"
              shape="rect"
            />
            <smtpad
              portHints={["pin2"]}
              pcbX="1mm"
              pcbY="-3mm"
              width="2mm"
              height="2mm"
              shape="rect"
            />
            <smtpad
              portHints={["pin3"]}
              pcbX="3mm"
              pcbY="-3mm"
              width="2mm"
              height="2mm"
              shape="rect"
            />
            <smtpad
              portHints={["pin4"]}
              pcbX="1mm"
              pcbY="3mm"
              width="2mm"
              height="2mm"
              shape="rect"
            />
            <smtpad
              portHints={["pin5"]}
              pcbX="3mm"
              pcbY="3mm"
              width="2mm"
              height="2mm"
              shape="rect"
            />
          </footprint>
        }
        pinLabels={{
          pin1: "1",
          pin2: "2",
          pin3: "3",
          pin4: "4",
          pin5: "5",
        }}
        internallyConnectedPins={[["pin2", "pin3", "pin4", "pin5"]]}
        symbol={
          <symbol>
            <schematiccircle
              center={{ x: circleX, y: signalPortY }}
              radius={0.182781}
              strokeWidth={0.02}
              color="#840000"
            />
            <schematiccircle
              center={{ x: circleX, y: signalPortY }}
              radius={0.036556}
              strokeWidth={0.02}
              color="#840000"
              isFilled
              fillColor="#840000"
            />
            {(isInput
              ? [
                  [-0.054834, -0.036556],
                  [0, 0.018278],
                  [0.073113, 0.054834],
                ]
              : [
                  [0.054834, 0.036556],
                  [0, -0.018278],
                  [-0.073113, -0.054834],
                ]
            ).map(([x1, x2], index) => (
              <Fragment key={`${name}-contact-dash-${index}`}>
                <schematicline
                  x1={x1}
                  y1={signalPortY}
                  x2={x2}
                  y2={signalPortY}
                  strokeWidth={0.02}
                  color="#840000"
                />
              </Fragment>
            ))}
            <schematicline
              x1={-0.274172}
              y1={-0.109669}
              x2={0.274172}
              y2={-0.109669}
              strokeWidth={0.02}
              color="#840000"
            />
            <schematicline
              x1={-0.274172}
              y1={groundPortY}
              x2={0.274172}
              y2={groundPortY}
              strokeWidth={0.02}
              color="#840000"
            />
            <port
              name="pin1"
              pinNumber={1}
              schX={signalPortX}
              schY={signalPortY}
              direction={signalSide}
              schStemLength={0.365563}
            />
            <schematictext
              text="1"
              schX={isInput ? 0.127947 : -0.127947}
              schY={signalPortY}
              fontSize={0.182781}
              anchor={isInput ? "bottom_left" : "bottom_right"}
              color="#840000"
            />
            {groundPins.map(({ pin, x }) => (
              <Fragment key={`${name}-symbol-pin-${pin}`}>
                <port
                  name={`pin${pin}`}
                  pinNumber={pin}
                  schX={x}
                  schY={groundPortY}
                  direction="down"
                  schStemLength={0.365563}
                />
                <schematictext
                  text={String(pin)}
                  schX={x}
                  schY={-0.146225}
                  fontSize={0.182781}
                  anchor="center"
                  color="#840000"
                  schRotation={90}
                />
              </Fragment>
            ))}
          </symbol>
        }
        schX={schX}
        schY={schY}
        schRotation={0}
        schSectionName={schSectionName}
        pcbX={pcbX}
        pcbY={pcbY}
        pcbRotation={pcbSignalSide === "right" ? 180 : 0}
        doNotPlace={doNotPlace}
      />
      <schematictext
        text={name}
        schX={schX - 0.29245}
        schY={schY + 0.255894}
        fontSize={0.182781}
        anchor="bottom_left"
        color="#006464"
      />
      <trace
        name={`${name}-GND`}
        from={`${name}.${isInput ? "pin5" : "pin3"}`}
        to="net.GND"
        schDisplayLabel="GND"
      />
    </>
  );
};

type OutputFixtureProps = {
  netName: OutputNetName;
  firstResistor: string;
  secondResistor: string;
  capacitor: string;
  pullup: string;
  pulldown: string;
  connector: string;
  sch: {
    firstResistor: SchematicPoint;
    secondResistor: SchematicPoint;
    capacitor: SchematicPoint;
    pullup: SchematicPoint;
    pulldown: SchematicPoint;
    connector: SchematicPoint;
  };
  pcbY: number;
  pcbSide?: "left" | "right";
  pcbXOffset?: number;
  doNotPlace?: boolean;
};

const OutputFixture = ({
  netName,
  firstResistor,
  secondResistor,
  capacitor,
  pullup,
  pulldown,
  connector,
  sch,
  pcbY,
  pcbSide = "right",
  pcbXOffset = 0,
  doNotPlace,
}: OutputFixtureProps) => {
  const pcbDirection = pcbSide === "left" ? -1 : 1;
  const pcbX = (distance: number) => pcbXOffset + pcbDirection * distance;
  const horizontalPcbRotation = pcbSide === "left" ? 180 : 0;
  const schSectionName = `fixture-${netName}`;
  const sheetPort = FIXTURE_SHEET_PORT_GEOMETRY[netName];

  return (
    <>
      <resistor
        name={firstResistor}
        resistance="0ohm"
        tolerance="5%"
        footprint="0603"
        manufacturerPartNumber={ZERO_OHM_MPN}
        schX={sch.firstResistor[0]}
        schY={sch.firstResistor[1]}
        schSectionName={schSectionName}
        pcbX={pcbX(4)}
        pcbY={pcbY}
        pcbRotation={horizontalPcbRotation}
        doNotPlace={doNotPlace}
        connections={{
          ...(doNotPlace ? {} : { pin1: `net.${netName}` }),
          pin2: `${secondResistor}.pin1`,
        }}
      />
      {doNotPlace && (
        <trace
          from={`${firstResistor}.pin1`}
          to={`net.${netName}`}
          pcbPath={[`${firstResistor}.pin1`, `${firstResistor}.pin1`]}
        />
      )}
      <resistor
        name={secondResistor}
        resistance="0ohm"
        tolerance="5%"
        footprint="0603"
        manufacturerPartNumber={ZERO_OHM_MPN}
        symbol={
          <symbol>
            <schematicrect
              schX={0}
              schY={0}
              width={0.6}
              height={0.65}
              strokeWidth={0}
              color="transparent"
            />
            <port
              name="pin1"
              pinNumber={1}
              schX={-0.3}
              schY={0}
              direction="left"
              schStemLength={0}
            />
            <port
              name="pin2"
              pinNumber={2}
              schX={0.3}
              schY={0}
              direction="right"
              schStemLength={0}
            />
          </symbol>
        }
        schX={sch.secondResistor[0]}
        schY={sch.secondResistor[1]}
        schRotation={0}
        schSectionName={schSectionName}
        pcbX={pcbX(7)}
        pcbY={pcbY}
        pcbRotation={horizontalPcbRotation}
        doNotPlace={doNotPlace}
      />
      <schematicline
        x1={sch.secondResistor[0] - 0.3}
        y1={sch.secondResistor[1]}
        x2={sch.secondResistor[0] - 0.19998}
        y2={sch.secondResistor[1]}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematicrect
        schX={sch.secondResistor[0]}
        schY={sch.secondResistor[1]}
        width={0.39996}
        height={0.15996}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematicline
        x1={sch.secondResistor[0] + 0.19998}
        y1={sch.secondResistor[1]}
        x2={sch.secondResistor[0] + 0.3}
        y2={sch.secondResistor[1]}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematictext
        text={secondResistor}
        schX={sch.secondResistor[0]}
        schY={sch.secondResistor[1] + 0.16}
        fontSize={0.18}
        anchor="bottom_center"
        color="#006464"
      />
      <schematictext
        text="0"
        schX={sch.secondResistor[0]}
        schY={sch.secondResistor[1] - 0.16}
        fontSize={0.18}
        anchor="top_center"
        color="#006464"
      />
      <capacitor
        name={capacitor}
        capacitance="5pF"
        maxVoltageRating="100V"
        footprint="0603"
        manufacturerPartNumber={LOAD_CAPACITOR_MPN}
        maxDecouplingTraceLength="25mm"
        symbol={
          <symbol>
            <schematicrect
              schX={0}
              schY={0}
              width={0.9}
              height={0.6}
              strokeWidth={0}
              color="transparent"
            />
            <port
              name="pin1"
              pinNumber={1}
              schX={0}
              schY={0.3}
              direction="up"
              schStemLength={0}
            />
            <port
              name="pin2"
              pinNumber={2}
              schX={0}
              schY={-0.3}
              direction="down"
              schStemLength={0}
            />
          </symbol>
        }
        schX={sch.capacitor[0]}
        schY={sch.capacitor[1]}
        schRotation={0}
        schSectionName={schSectionName}
        pcbX={pcbX(10)}
        pcbY={pcbY - 0.8}
        pcbRotation={90}
        doNotPlace={doNotPlace}
      />
      <schematicline
        x1={sch.capacitor[0]}
        y1={sch.capacitor[1] + 0.3}
        x2={sch.capacitor[0]}
        y2={sch.capacitor[1] + 0.06}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematicline
        x1={sch.capacitor[0] - 0.16}
        y1={sch.capacitor[1] + 0.06}
        x2={sch.capacitor[0] + 0.16}
        y2={sch.capacitor[1] + 0.06}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematicline
        x1={sch.capacitor[0] - 0.16}
        y1={sch.capacitor[1] - 0.06}
        x2={sch.capacitor[0] + 0.16}
        y2={sch.capacitor[1] - 0.06}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematicline
        x1={sch.capacitor[0]}
        y1={sch.capacitor[1] - 0.06}
        x2={sch.capacitor[0]}
        y2={sch.capacitor[1] - 0.3}
        strokeWidth={0.02}
        color="#840000"
      />
      <schematictext
        text={capacitor}
        schX={sch.capacitor[0] + 0.115}
        schY={sch.capacitor[1] + 0.2}
        fontSize={0.18}
        anchor="bottom_left"
        color="#006464"
      />
      <schematictext
        text="5pF"
        schX={sch.capacitor[0] + 0.115}
        schY={sch.capacitor[1] - 0.2}
        fontSize={0.18}
        anchor="top_left"
        color="#006464"
      />
      <resistor
        name={pullup}
        resistance="100ohm"
        tolerance="1%"
        footprint="0603"
        manufacturerPartNumber={TERMINATION_MPN}
        schX={sch.pullup[0]}
        schY={sch.pullup[1]}
        schRotation={90}
        schSectionName={schSectionName}
        pcbX={pcbX(11.5)}
        pcbY={pcbY + 0.8}
        pcbRotation={90}
        doNotPlace={doNotPlace}
      />
      <resistor
        name={pulldown}
        resistance="100ohm"
        tolerance="1%"
        footprint="0603"
        manufacturerPartNumber={TERMINATION_MPN}
        schX={sch.pulldown[0]}
        schY={sch.pulldown[1]}
        schOrientation="vertical"
        schSectionName={schSectionName}
        pcbX={pcbX(13)}
        pcbY={pcbY - 0.8}
        pcbRotation={90}
        doNotPlace={doNotPlace}
      />
      <SmaConnector
        name={connector}
        schX={sch.connector[0]}
        schY={sch.connector[1]}
        pcbX={pcbX(17)}
        pcbY={pcbY}
        pcbSignalSide={pcbSide === "left" ? "right" : "left"}
        signalSide="left"
        schSectionName={schSectionName}
        doNotPlace={doNotPlace}
      />
      <trace from={`${secondResistor}.pin2`} to={`${capacitor}.pin1`} />
      <trace from={`${capacitor}.pin1`} to={`${pulldown}.pin1`} />
      <trace from={`${pulldown}.pin1`} to={`${pullup}.pin1`} />
      <trace from={`${pullup}.pin1`} to={`${connector}.pin1`} />
      <trace from={`${capacitor}.pin2`} to={`${pulldown}.pin2`} />
      <trace
        name={`${pullup}-VDD`}
        from={`${pullup}.pin2`}
        to="net.VDD"
        schDisplayLabel="VDD"
      />
      <trace
        name={`${pulldown}-GND`}
        from={`${pulldown}.pin2`}
        to="net.GND"
        schDisplayLabel="GND"
      />
      <SheetPortGraphic
        name={netName}
        schX={sheetPort.centerX}
        schY={sch.firstResistor[1]}
        width={sheetPort.width}
      />
    </>
  );
};

const OUTPUT_FIXTURES = [
  {
    netName: "Y0",
    firstResistor: "R9",
    secondResistor: "R10",
    capacitor: "C6",
    pullup: "R5",
    pulldown: "R17",
    connector: "J4",
    sch: {
      firstResistor: [-12.9775, -0.7311],
      secondResistor: [-11.698, -0.7311],
      capacitor: [-11.3324, -1.0053],
      pullup: [-10.4185, -0.3656],
      pulldown: [-10.6013, -1.0967],
      connector: [-9.4132, -0.8042],
    },
    pcbY: -15,
    pcbSide: "left",
  },
  {
    netName: "Y1",
    firstResistor: "R25",
    secondResistor: "R26",
    capacitor: "C10",
    pullup: "R21",
    pulldown: "R33",
    connector: "J8",
    sch: {
      firstResistor: [-12.9775, -3.6556],
      secondResistor: [-11.698, -3.6556],
      capacitor: [-11.3324, -3.9298],
      pullup: [-10.4185, -3.2901],
      pulldown: [-10.6013, -4.0212],
      connector: [-9.4132, -3.7287],
    },
    pcbY: 10,
  },
  {
    netName: "Y2",
    firstResistor: "R11",
    secondResistor: "R12",
    capacitor: "C7",
    pullup: "R6",
    pulldown: "R18",
    connector: "J5",
    sch: {
      firstResistor: [-5.3007, -0.7311],
      secondResistor: [-4.0212, -0.7311],
      capacitor: [-3.6556, -1.0053],
      pullup: [-2.7417, -0.3656],
      pulldown: [-2.9245, -1.0967],
      connector: [-1.7364, -0.8042],
    },
    pcbY: 0,
  },
  {
    netName: "Y3",
    firstResistor: "R27",
    secondResistor: "R28",
    capacitor: "C11",
    pullup: "R22",
    pulldown: "R34",
    connector: "J9",
    sch: {
      firstResistor: [-5.3007, -3.6556],
      secondResistor: [-4.0212, -3.6556],
      capacitor: [-3.6556, -3.9298],
      pullup: [-2.5589, -3.2901],
      pulldown: [-2.7417, -4.0212],
      connector: [-1.5536, -3.7287],
    },
    pcbY: -10,
  },
  {
    netName: "Y4",
    firstResistor: "R13",
    secondResistor: "R14",
    capacitor: "C8",
    pullup: "R7",
    pulldown: "R19",
    connector: "J6",
    sch: {
      firstResistor: [2.0106, -0.7311],
      secondResistor: [3.2901, -0.7311],
      capacitor: [3.6556, -1.0053],
      pullup: [4.5695, -0.3656],
      pulldown: [4.3868, -1.0967],
      connector: [5.5748, -0.8042],
    },
    pcbY: -12,
    pcbXOffset: 20,
    doNotPlace: true,
  },
  {
    netName: "Y5",
    firstResistor: "R29",
    secondResistor: "R30",
    capacitor: "C12",
    pullup: "R23",
    pulldown: "R35",
    connector: "J10",
    sch: {
      firstResistor: [2.0106, -3.6556],
      secondResistor: [3.2901, -3.6556],
      capacitor: [3.6556, -3.9298],
      pullup: [4.5695, -3.2901],
      pulldown: [4.3868, -4.0212],
      connector: [5.5748, -3.7287],
    },
    pcbY: -4,
    pcbXOffset: 20,
    doNotPlace: true,
  },
  {
    netName: "Y6",
    firstResistor: "R15",
    secondResistor: "R16",
    capacitor: "C9",
    pullup: "R8",
    pulldown: "R20",
    connector: "J7",
    sch: {
      firstResistor: [8.9563, -0.7311],
      secondResistor: [10.2358, -0.7311],
      capacitor: [10.6013, -1.0053],
      pullup: [11.5152, -0.3656],
      pulldown: [11.3324, -1.0967],
      connector: [12.3377, -0.8042],
    },
    pcbY: 4,
    pcbXOffset: 20,
    doNotPlace: true,
  },
  {
    netName: "Y7",
    firstResistor: "R31",
    secondResistor: "R32",
    capacitor: "C13",
    pullup: "R24",
    pulldown: "R36",
    connector: "J11",
    sch: {
      firstResistor: [8.9563, -3.6556],
      secondResistor: [10.2358, -3.6556],
      capacitor: [10.6013, -3.9298],
      pullup: [11.5152, -3.2901],
      pulldown: [11.3324, -4.0212],
      connector: [12.3377, -3.7287],
    },
    pcbY: 12,
    pcbXOffset: 20,
    doNotPlace: true,
  },
] as const satisfies readonly OutputFixtureProps[];

const DRIVEN_OUTPUTS = [
  { pin: 3, netName: "Y0" },
  { pin: 8, netName: "Y1" },
  { pin: 5, netName: "Y2" },
  { pin: 7, netName: "Y3" },
] as const satisfies readonly { pin: number; netName: OutputNetName }[];

const DEVICE_OUTPUT_SHEET_PORTS = [
  { name: "Y0", x: -1.369793, y: 7.676818, width: 0.566622 },
  { name: "Y1", x: -1.369793, y: 7.311255, width: 0.566622 },
  { name: "Y2", x: -1.361721, y: 6.945692, width: 0.566622 },
  { name: "Y3", x: -1.361721, y: 6.58013, width: 0.566622 },
  { name: "Y4", x: -1.361721, y: 4.935097, width: 0.566622 },
  { name: "Y5", x: -1.352582, y: 4.569535, width: 0.5849 },
  { name: "Y6", x: -1.361721, y: 4.203972, width: 0.566622 },
  { name: "Y7", x: -1.352582, y: 3.838409, width: 0.5849 },
] as const satisfies readonly {
  name: OutputNetName;
  x: number;
  y: number;
  width: number;
}[];

const TI_SCHEMATIC_NOTES = [
  { x: 0.1919, y: 8.3988, text: "VDD = 1.8V / 2.5V /", color: "#1f2937" },
  { x: 0.1919, y: 8.216, text: "3.3V @ 300mA (max)", color: "#1f2937" },
  { x: 3.2992, y: 6.9366, text: "Put L1, C1, C2 close to", color: "#ff0000" },
  { x: 3.2992, y: 6.7538, text: "Terminal block connector", color: "#ff0000" },
  {
    x: 8.0515,
    y: 6.9366,
    text: "Put TP1, C3, C29, C30, C31, C32 next",
    color: "#ff0000",
  },
  { x: 8.0515, y: 6.7538, text: "to VDD Pins", color: "#ff0000" },
  {
    x: -10.5922,
    y: 6.3882,
    text: "Put these components close to",
    color: "#ff0000",
  },
  { x: -10.5922, y: 6.2054, text: "SMA connector", color: "#ff0000" },
  {
    x: -14.4306,
    y: -1.1058,
    text: "Put R12 close to the output",
    color: "#ff0000",
  },
  {
    x: -14.4306,
    y: -1.2886,
    text: "pin of device, and every",
    color: "#ff0000",
  },
  {
    x: -14.4306,
    y: -1.4714,
    text: "thing else close to SMA",
    color: "#ff0000",
  },
  { x: -14.4306, y: -1.6542, text: "connector", color: "#ff0000" },
  {
    x: -14.4306,
    y: -4.0303,
    text: "Put R24 close to the output",
    color: "#ff0000",
  },
  {
    x: -14.4306,
    y: -4.2131,
    text: "pin of device, and every",
    color: "#ff0000",
  },
  {
    x: -14.4306,
    y: -4.3959,
    text: "thing else close to SMA",
    color: "#ff0000",
  },
  { x: -14.4306, y: -4.5787, text: "connector", color: "#ff0000" },
  {
    x: -6.7538,
    y: -1.2886,
    text: "Put R13 close to the output",
    color: "#ff0000",
  },
  {
    x: -6.7538,
    y: -1.4714,
    text: "pin of device, and every",
    color: "#ff0000",
  },
  { x: -6.7538, y: -1.6542, text: "thing else close to SMA", color: "#ff0000" },
  {
    x: -6.571,
    y: -4.2131,
    text: "Put R27 close to the output",
    color: "#ff0000",
  },
  { x: -6.571, y: -4.3959, text: "pin of device, and every", color: "#ff0000" },
  { x: -6.571, y: -4.5787, text: "thing else close to SMA", color: "#ff0000" },
  {
    x: 0.3747,
    y: -1.1058,
    text: "Put R14 close to the output",
    color: "#ff0000",
  },
  { x: 0.3747, y: -1.2886, text: "pin of device, and every", color: "#ff0000" },
  { x: 0.3747, y: -1.4714, text: "thing else close to SMA", color: "#ff0000" },
  {
    x: 0.3747,
    y: -4.0303,
    text: "Put R25 close to the output",
    color: "#ff0000",
  },
  { x: 0.3747, y: -4.2131, text: "pin of device, and every", color: "#ff0000" },
  { x: 0.3747, y: -4.3959, text: "thing else close to SMA", color: "#ff0000" },
  { x: 0.3747, y: -4.5787, text: "connector", color: "#ff0000" },
  {
    x: 7.3204,
    y: -1.1058,
    text: "Put R15 close to the output",
    color: "#ff0000",
  },
  {
    x: 7.3204,
    y: -1.2886,
    text: "pin of device, and every thing",
    color: "#ff0000",
  },
  {
    x: 7.3204,
    y: -1.4714,
    text: "else close to SMA connector",
    color: "#ff0000",
  },
  {
    x: 7.3204,
    y: -4.0303,
    text: "Put R26 close to the output",
    color: "#ff0000",
  },
  {
    x: 7.3204,
    y: -4.2131,
    text: "pin of device, and every thing",
    color: "#ff0000",
  },
  {
    x: 7.3204,
    y: -4.3959,
    text: "else close to SMA connector",
    color: "#ff0000",
  },
] as const;

// Altium places opaque white frames behind each note block so traces and
// component text cannot bleed through the red layout instructions.
const TI_NOTE_FRAMES = [
  {
    x: 9.870194534506716,
    y: 6.76291106993979,
    width: 3.6556276053728585,
    height: 0.3655627605372858,
  },
  {
    x: 4.752315886984714,
    y: 6.76291106993979,
    width: 2.9245020842982865,
    height: 0.3655627605372858,
  },
  {
    x: -9.139069013432145,
    y: 6.214566929133859,
    width: 2.9245020842982865,
    height: 0.3655627605372858,
  },
  {
    x: -13.068868689207969,
    y: -1.462251042149143,
    width: 2.741720704029644,
    height: 0.7311255210745716,
  },
  {
    x: -13.068868689207969,
    y: -4.386753126447429,
    width: 2.741720704029644,
    height: 0.7311255210745716,
  },
  {
    x: -5.392050717924967,
    y: -1.5536417322834648,
    width: 2.741720704029644,
    height: 0.5483441408059287,
  },
  {
    x: -5.209269337656323,
    y: -4.478143816581751,
    width: 2.741720704029644,
    height: 0.5483441408059287,
  },
  {
    x: 1.7364231125521066,
    y: -1.3708603520148213,
    width: 2.741720704029644,
    height: 0.5483441408059287,
  },
  {
    x: 1.7364231125521066,
    y: -4.386753126447429,
    width: 2.741720704029644,
    height: 0.7311255210745716,
  },
  {
    x: 8.773506252894858,
    y: -1.462251042149143,
    width: 2.9245020842982865,
    height: 0.7311255210745716,
  },
  {
    x: 8.773506252894858,
    y: -4.386753126447429,
    width: 2.9245020842982865,
    height: 0.7311255210745716,
  },
  {
    x: -0.7311255210745724,
    y: -6.5801296896711445,
    width: 2.9245020842982865,
    height: 0.3655627605372858,
  },
  {
    x: 1.2794696618805013,
    y: 8.225162112088931,
    width: 2.193376563223715,
    height: 0.3655627605372858,
  },
] as const;

const ReferenceNets = () => (
  <>
    <net name="GND" isGroundNet />
    <net name="VDD" isPowerNet />
    {OUTPUT_NET_NAMES.map((netName) => (
      <Fragment key={netName}>
        <net name={netName} />
      </Fragment>
    ))}
  </>
);

const ClockDevice = () => (
  <>
    <LMK1C1104PWR
      name="U1"
      manufacturerPartNumber="LMK1C1104PW"
      schX={-5.6662}
      schY={6.9457}
      schWidth="1.4623mm"
      schHeight="2.1934mm"
      schSectionName="device"
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: [6, 1, 2] },
        rightSide: { direction: "top-to-bottom", pins: [3, 8, 5, 7, 4] },
      }}
      schPinStyle={{
        pin1: { marginTop: 0.5311 },
        pin2: { marginTop: 0.5311 },
        pin8: { marginTop: 0.1656 },
        pin5: { marginTop: 0.1656 },
        pin7: { marginTop: 0.1656 },
        pin4: { marginTop: 0.1656 },
      }}
      pcbX={0}
      pcbY={0}
    />
    <trace name="U1-VDD" from="U1.pin6" to="net.VDD" schDisplayLabel="VDD" />
    <trace name="U1-GND" from="U1.pin4" to="net.GND" schDisplayLabel="GND" />
    {DRIVEN_OUTPUTS.map(({ pin, netName }) => (
      <Fragment key={`U1-${netName}`}>
        <trace
          from={`U1.pin${pin}`}
          to={`net.${netName}`}
          schDisplayLabel={HIDDEN_ROUTE_LABEL}
        />
      </Fragment>
    ))}
  </>
);

const InputNetwork = () => (
  <>
    <SmaConnector
      name="J2"
      schX={-12.5205}
      schY={6.8726}
      pcbX={-17}
      pcbY={0}
      pcbSignalSide="right"
      signalSide="right"
      schSectionName="input-connector"
    />
    <resistor
      name="R2"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      manufacturerPartNumber={ZERO_OHM_MPN}
      schX={-11.1497}
      schY={6.9457}
      schSectionName="input-bias"
      pcbX={-12}
      pcbY={0}
    />
    <resistor
      name="R1"
      resistance="100ohm"
      tolerance="1%"
      footprint="0603"
      manufacturerPartNumber={TERMINATION_MPN}
      schX={-10.6013}
      schY={7.3113}
      schOrientation="vertical"
      schSectionName="input-bias"
      pcbX={-8.5}
      pcbY={1.2}
      pcbRotation={90}
    />
    <trace name="R1-VDD" from="R1.pin1" to="net.VDD" schDisplayLabel="VDD" />
    <resistor
      name="R3"
      resistance="100ohm"
      tolerance="1%"
      footprint="0603"
      manufacturerPartNumber={TERMINATION_MPN}
      schX={-10.7841}
      schY={6.5801}
      schOrientation="vertical"
      schSectionName="input-bias"
      pcbX={-8.5}
      pcbY={-1.2}
      pcbRotation={90}
    />
    <trace name="R3-GND" from="R3.pin2" to="net.GND" schDisplayLabel="GND" />
    <trace from="R1.pin2" to="R2.pin2" />
    <trace from="R3.pin1" to="R2.pin2" />
    <trace from="J2.pin1" to="R2.pin1" schDisplayLabel={HIDDEN_ROUTE_LABEL} />
    <trace
      name="CLKIN"
      from="R2.pin2"
      to="U1.pin1"
      schDisplayLabel={HIDDEN_ROUTE_LABEL}
    />
  </>
);

const EnableNetwork = () => (
  <>
    <connector
      name="J3"
      pinCount={3}
      manufacturerPartNumber="PBC03SAAN"
      footprint="pinrow3"
      pinLabels={{ pin1: "1", pin2: "2", pin3: "3" }}
      symbol={
        <symbol>
          <schematicrect
            schX={0}
            schY={0}
            width={0.365563}
            height={0.731126}
            strokeWidth={0}
            color="#ffffff"
            isFilled
          />
          <schematicrect
            schX={0}
            schY={0}
            width={0.365563}
            height={0.731126}
            strokeWidth={0.02}
            color="#840000"
          />
          {[0.182781, 0].map((y, index) => (
            <Fragment key={`J3-round-contact-${index}`}>
              <schematiccircle
                center={{ x: 0, y }}
                radius={0.054834}
                strokeWidth={0.02}
                color="#840000"
                isFilled
                fillColor="#840000"
              />
            </Fragment>
          ))}
          <schematicrect
            schX={0}
            schY={-0.182781}
            width={0.109669}
            height={0.109669}
            strokeWidth={0}
            color="#840000"
            isFilled
          />
          {[0.182781, 0, -0.182781].map((y, index) => (
            <Fragment key={`J3-contact-line-${index}`}>
              <schematicline
                x1={0.054834}
                y1={y}
                x2={0.182781}
                y2={y}
                strokeWidth={0.02}
                color="#840000"
              />
            </Fragment>
          ))}
          <port
            name="pin3"
            pinNumber={3}
            schX={0.548344}
            schY={0.182781}
            direction="right"
            schStemLength={0.365563}
          />
          <schematictext
            text="3"
            schX={0.219338}
            schY={0.182781}
            fontSize={0.182781}
            anchor="bottom_left"
            color="#a90000"
          />
          <port
            name="pin2"
            pinNumber={2}
            schX={0.548344}
            schY={0}
            direction="right"
            schStemLength={0.365563}
          />
          <schematictext
            text="2"
            schX={0.219338}
            schY={0}
            fontSize={0.182781}
            anchor="bottom_left"
            color="#a90000"
          />
          <port
            name="pin1"
            pinNumber={1}
            schX={0.548344}
            schY={-0.182781}
            direction="right"
            schStemLength={0.365563}
          />
          <schematictext
            text="1"
            schX={0.219338}
            schY={-0.182781}
            fontSize={0.182781}
            anchor="bottom_left"
            color="#a90000"
          />
        </symbol>
      }
      schX={-11.332446}
      schY={3.472846}
      schRotation={0}
      schSectionName="enable"
      pcbX={-13}
      pcbY={-7}
      connections={{ pin2: "R4.pin2" }}
    />
    <schematictext
      text="J3"
      schX={-11.515227}
      schY={3.838409}
      fontSize={0.182781}
      anchor="bottom_left"
      color="#006464"
    />
    <trace name="J3-GND" from="J3.pin1" to="net.GND" schDisplayLabel="GND" />
    <trace name="J3-VDD" from="J3.pin3" to="net.VDD" schDisplayLabel="VDD" />
    <resistor
      name="R4"
      resistance="0ohm"
      tolerance="5%"
      footprint="0603"
      manufacturerPartNumber={ZERO_OHM_MPN}
      schX={-9.6874}
      schY={3.4728}
      schRotation={180}
      schSectionName="enable"
      pcbX={-8}
      pcbY={-7}
    />
    <trace
      name="1G"
      from="R4.pin1"
      to="U1.pin2"
      schDisplayLabel={HIDDEN_ROUTE_LABEL}
    />
  </>
);

const InputAndEnableSourceArtwork = () => (
  <>
    <schematicline
      x1={-12.0635}
      y1={6.9457}
      x2={-11.4497}
      y2={6.9457}
      strokeWidth={0.02}
      color="#008000"
    />
    <schematicline
      x1={-10.8497}
      y1={6.9457}
      x2={-6.7629}
      y2={6.9457}
      strokeWidth={0.02}
      color="#008000"
    />
    <schematicline
      x1={-10.6013}
      y1={7.0113}
      x2={-10.6013}
      y2={6.9457}
      strokeWidth={0.02}
      color="#008000"
    />
    <schematicline
      x1={-10.7841}
      y1={6.8801}
      x2={-10.7841}
      y2={6.9457}
      strokeWidth={0.02}
      color="#008000"
    />
    <schematiccircle
      center={{ x: -10.6013, y: 6.9457 }}
      radius={0.035}
      strokeWidth={0}
      color="#008000"
      isFilled
      fillColor="#008000"
    />
    <schematiccircle
      center={{ x: -10.7841, y: 6.9457 }}
      radius={0.035}
      strokeWidth={0}
      color="#008000"
      isFilled
      fillColor="#008000"
    />
    <schematicpath
      points={[
        { x: -9.3874, y: 3.4728 },
        { x: -7.8596, y: 3.4728 },
        { x: -7.8596, y: 6.2146 },
        { x: -6.7629, y: 6.2146 },
      ]}
      strokeWidth={0.02}
      strokeColor="#008000"
    />
  </>
);

const PowerNetwork = () => (
  <>
    <connector
      name="J1"
      pinCount={2}
      manufacturerPartNumber="039544-3002"
      footprint="pinrow2"
      pinLabels={{ pin1: "1", pin2: "2" }}
      symbol={
        <symbol>
          <schematicrect
            schX={0}
            schY={0}
            width={0.365563}
            height={0.548344}
            strokeWidth={0}
            color="#ffffff"
            isFilled
          />
          <schematicrect
            schX={0}
            schY={0}
            width={0.365563}
            height={0.548344}
            strokeWidth={0.02}
            color="#840000"
          />
          <schematiccircle
            center={{ x: 0, y: 0.091391 }}
            radius={0.054834}
            strokeWidth={0.02}
            color="#840000"
          />
          <schematicrect
            schX={0}
            schY={-0.091391}
            width={0.109669}
            height={0.109669}
            strokeWidth={0.02}
            color="#840000"
          />
          {[0.091391, -0.091391].map((y, index) => (
            <Fragment key={`J1-contact-line-${index}`}>
              <schematicline
                x1={0.054834}
                y1={y}
                x2={0.182781}
                y2={y}
                strokeWidth={0.02}
                color="#840000"
              />
            </Fragment>
          ))}
          <port
            name="pin2"
            pinNumber={2}
            schX={0.548344}
            schY={0.091391}
            direction="right"
            schStemLength={0.365563}
          />
          <schematictext
            text="2"
            schX={0.219338}
            schY={0.091391}
            fontSize={0.182781}
            anchor="bottom_left"
            color="#a90000"
          />
          <port
            name="pin1"
            pinNumber={1}
            schX={0.548344}
            schY={-0.091391}
            direction="right"
            schStemLength={0.365563}
          />
          <schematictext
            text="1"
            schX={0.219338}
            schY={-0.091391}
            fontSize={0.182781}
            anchor="bottom_left"
            color="#a90000"
          />
        </symbol>
      }
      schX={2.924502}
      schY={8.316553}
      schRotation={0}
      schSectionName="power"
      pcbX={-13}
      pcbY={10}
    />
    <schematictext
      text="J1"
      schX={2.741721}
      schY={8.590725}
      fontSize={0.182781}
      anchor="bottom_left"
      color="#006464"
    />
    <trace name="J1-GND" from="J1.pin2" to="C1.pin2" />
    <capacitor
      name="C1"
      capacitance="10uF"
      maxVoltageRating="10V"
      footprint="0805"
      manufacturerPartNumber="C0805C106K8PACTU"
      maxDecouplingTraceLength="25mm"
      symbol={
        <symbol>
          <schematicrect
            schX={0}
            schY={0}
            width={0.9}
            height={0.6}
            strokeWidth={0}
            color="transparent"
          />
          <port
            name="pin1"
            pinNumber={1}
            schX={0}
            schY={0.3}
            direction="up"
            schStemLength={0}
          />
          <port
            name="pin2"
            pinNumber={2}
            schX={0}
            schY={-0.3}
            direction="down"
            schStemLength={0}
          />
        </symbol>
      }
      schX={4.0212}
      schY={7.951}
      schRotation={0}
      schSectionName="power"
      pcbX={-9}
      pcbY={10}
    />
    <schematicline
      x1={4.0212}
      y1={8.251}
      x2={4.0212}
      y2={8.011}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={3.8612}
      y1={8.011}
      x2={4.1812}
      y2={8.011}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={3.8612}
      y1={7.891}
      x2={4.1812}
      y2={7.891}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={4.0212}
      y1={7.891}
      x2={4.0212}
      y2={7.651}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematictext
      text="C1"
      schX={4.1362}
      schY={8.151}
      fontSize={0.18}
      anchor="bottom_left"
      color="#006464"
    />
    <schematictext
      text="10uF"
      schX={4.1362}
      schY={7.751}
      fontSize={0.18}
      anchor="top_left"
      color="#006464"
    />
    <chip
      name="L1"
      manufacturerPartNumber="BLM31SN500SZ1L"
      footprint="1206"
      pinLabels={{ pin1: "1", pin2: "2" }}
      symbol={
        <symbol>
          <schematicrect
            schX={0}
            schY={0}
            width={0.88}
            height={0.74}
            strokeWidth={0}
            color="transparent"
          />
          <port
            name="pin1"
            pinNumber={1}
            schX={-0.44}
            schY={0}
            direction="left"
            schStemLength={0}
          />
          <port
            name="pin2"
            pinNumber={2}
            schX={0.44}
            schY={0.01}
            direction="right"
            schStemLength={0}
          />
        </symbol>
      }
      schX={4.9351}
      schY={8.2252}
      schRotation={0}
      schSectionName="power"
      pcbX={-5}
      pcbY={10}
    />
    <schematicline
      x1={4.4951}
      y1={8.2202}
      x2={4.7591}
      y2={8.2202}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicrect
      schX={4.9351}
      schY={8.2202}
      width={0.352}
      height={0.176}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={4.8251}
      y1={8.2202}
      x2={5.0451}
      y2={8.2202}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={5.1111}
      y1={8.2202}
      x2={5.3751}
      y2={8.2302}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematictext
      text="L1"
      schX={4.9351}
      schY={8.5952}
      fontSize={0.18}
      anchor="bottom_center"
      color="#006464"
    />
    <capacitor
      name="C2"
      capacitance="1uF"
      maxVoltageRating="10V"
      footprint="0603"
      manufacturerPartNumber="C0603X105J8RAC7867"
      maxDecouplingTraceLength="25mm"
      schX={6.0318}
      schY={7.951}
      schOrientation="vertical"
      schSectionName="power"
      pcbX={-2}
      pcbY={9}
      pcbRotation={90}
    />
    <testpoint
      name="TP1"
      manufacturerPartNumber="5000"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1.5mm"
      symbol={
        <symbol>
          <schematiccircle
            center={{ x: 0, y: 0 }}
            radius={0.073113}
            strokeWidth={0.02}
            color="#1f2937"
            isFilled
            fillColor="#ee0e22"
          />
          <schematicline
            x1={0}
            y1={-0.073113}
            x2={0}
            y2={-0.255894}
            strokeWidth={0.02}
            color="#1f2937"
          />
          <port
            name="pin1"
            pinNumber={1}
            schX={0}
            schY={-0.255894}
            direction="down"
            schStemLength={0}
          />
        </symbol>
      }
      schX={7.6768}
      schY={8.4811}
      schRotation={0}
      schSectionName="power"
      pcbX={2}
      pcbY={10}
    />
    <schematictext
      text="TP1"
      schX={7.603705}
      schY={8.554169}
      fontSize={0.182781}
      anchor="bottom_left"
      color="#006464"
    />
    {[
      { name: "C3", x: 7.6768, pcbX: 1 },
      { name: "C4", x: 8.4079, pcbX: 3.5 },
      { name: "C5", x: 9.1391, pcbX: 6 },
    ].map(({ name, x, pcbX }) => (
      <capacitor
        key={name}
        name={name}
        capacitance="0.1uF"
        maxVoltageRating="10V"
        footprint="0402"
        manufacturerPartNumber="C0402C104K8RACAUTO"
        maxDecouplingTraceLength="25mm"
        symbol={
          <symbol>
            <schematicrect
              schX={0}
              schY={0}
              width={0.2}
              height={0.6}
              strokeWidth={0}
              color="transparent"
            />
            <port
              name="pin2"
              pinNumber={2}
              schX={0}
              schY={0.3}
              direction="up"
              schStemLength={0}
            />
            <port
              name="pin1"
              pinNumber={1}
              schX={0}
              schY={-0.3}
              direction="down"
              schStemLength={0}
            />
          </symbol>
        }
        schX={x}
        schY={7.951}
        schRotation={0}
        schSectionName="power"
        pcbX={pcbX}
        pcbY={8}
        pcbRotation={90}
      />
    ))}
    {[
      { name: "C3", x: 7.6768 },
      { name: "C4", x: 8.4079 },
      { name: "C5", x: 9.1391 },
    ].map(({ name, x }) => (
      <Fragment key={`${name}-source-symbol`}>
        <schematicline
          x1={x}
          y1={8.251}
          x2={x}
          y2={8.011}
          strokeWidth={0.02}
          color="#840000"
        />
        <schematicline
          x1={x - 0.16}
          y1={8.011}
          x2={x + 0.16}
          y2={8.011}
          strokeWidth={0.02}
          color="#840000"
        />
        <schematicline
          x1={x - 0.16}
          y1={7.891}
          x2={x + 0.16}
          y2={7.891}
          strokeWidth={0.02}
          color="#840000"
        />
        <schematicline
          x1={x}
          y1={7.891}
          x2={x}
          y2={7.651}
          strokeWidth={0.02}
          color="#840000"
        />
        <schematictext
          text={name}
          schX={x + 0.115}
          schY={8.151}
          fontSize={0.18}
          anchor="bottom_left"
          color="#006464"
        />
        <schematictext
          text="0.1uF"
          schX={x + 0.115}
          schY={7.751}
          fontSize={0.18}
          anchor="top_left"
          color="#006464"
        />
      </Fragment>
    ))}
    {/* Core currently emits a redundant terminal VDD glyph at C5. Paint out
        only that generated glyph, then restore TI's continuous upper rail. */}
    <schematictext
      text="█"
      schX={9.1391}
      schY={8.68}
      fontSize={0.52}
      anchor="center"
      color="#f5f1ed"
    />
    <schematictext
      text="█"
      schX={9.1391}
      schY={8.32}
      fontSize={0.18}
      anchor="center"
      color="#f5f1ed"
    />
    <schematictext
      text={"━".repeat(29)}
      schX={7.86745}
      schY={8.225162}
      fontSize={0.12}
      anchor="center"
      color="#008000"
    />
    <schematictext
      text="████"
      schX={9.52}
      schY={8.225162}
      fontSize={0.18}
      anchor="center"
      color="#f5f1ed"
    />
    {["C2", "C3", "C4", "C5"].map((name, index) => {
      const x = [6.0318, 7.6768, 8.4079, 9.1391][index];
      return (
        <Fragment key={`${name}-rail-overlay-name`}>
          <schematictext
            text={name}
            schX={x + 0.115}
            schY={8.151}
            fontSize={0.18}
            anchor="bottom_left"
            color="#006464"
          />
        </Fragment>
      );
    })}
    <trace from="J1.pin1" to="C1.pin1" />
    {/* The automatic same-net solver detours the two J1 traces around C1.
        These narrow masks remove only those detour segments; the source's
        straight supply and upper ground routes are drawn immediately after. */}
    {[
      { x: 3.3209, y: 8.407943, width: 0.34, height: 0.05 },
      { x: 3.16943, y: 7.9295, width: 0.05, height: 1.01 },
      { x: 3.5953, y: 7.451, width: 0.9, height: 0.05 },
      { x: 4.0212, y: 8.351, width: 0.05, height: 0.24 },
      { x: 4.0222, y: 8.451, width: 0.96, height: 0.05 },
      { x: 3.5612, y: 8.338, width: 0.05, height: 0.27 },
      { x: 4.48315, y: 8.338, width: 0.05, height: 0.27 },
    ].map((mask, index) => (
      <Fragment key={`j1-auto-route-mask-${index}`}>
        <schematicrect
          schX={mask.x}
          schY={mask.y}
          width={mask.width}
          height={mask.height}
          strokeWidth={0}
          color="#f5f1ed"
          isFilled
        />
      </Fragment>
    ))}
    {[
      { x: 3.747018, y: 8.225162, width: 0.568344, height: 0.02 },
      { x: 4.258145, y: 8.225162, width: 0.49419, height: 0.02 },
      { x: 4.02119, y: 8.238076, width: 0.02, height: 0.045828 },
      { x: 3.472846, y: 8.682116, width: 0.02, height: 0.568345 },
      { x: 3.747018, y: 8.956288, width: 0.568344, height: 0.02 },
    ].map((segment, index) => (
      <Fragment key={`j1-source-route-${index}`}>
        <schematicrect
          schX={segment.x}
          schY={segment.y}
          width={segment.width}
          height={segment.height}
          strokeWidth={0}
          color="#008000"
          isFilled
        />
      </Fragment>
    ))}
    <schematicpath
      points={[
        { x: 3.472846, y: 8.225162 },
        { x: 4.02119, y: 8.225162 },
        { x: 4.02119, y: 8.25099 },
      ]}
      strokeWidth={0.02}
      strokeColor="#008000"
    />
    <schematicpath
      points={[
        { x: 3.472846, y: 8.407943 },
        { x: 3.472846, y: 8.956288 },
        { x: 4.02119, y: 8.956288 },
      ]}
      strokeWidth={0.02}
      strokeColor="#008000"
    />
    <schematicline
      x1={3.9}
      y1={9.04}
      x2={4.1424}
      y2={9.04}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={3.95}
      y1={9.085}
      x2={4.0924}
      y2={9.085}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={3.995}
      y1={9.13}
      x2={4.0474}
      y2={9.13}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematicline
      x1={4.0212}
      y1={8.956288}
      x2={4.0212}
      y2={9.04}
      strokeWidth={0.02}
      color="#840000"
    />
    <schematictext
      text="GND"
      schX={4.18}
      schY={9.085}
      fontSize={0.16}
      anchor="center_left"
      color="#840000"
    />
    <trace from="C1.pin1" to="L1.pin1" />
    <trace from="L1.pin2" to="C2.pin1" />
    <trace from="C2.pin1" to="TP1.pin1" />
    <trace from="TP1.pin1" to="C3.pin2" />
    <trace from="C3.pin2" to="C4.pin2" />
    <trace from="C4.pin2" to="C5.pin2" />
    <trace name="power-VDD" from="C2.pin1" to="net.VDD" schDisplayLabel="VDD" />
    <trace from="C1.pin2" to="C2.pin2" />
    <trace from="C2.pin2" to="C3.pin1" />
    <trace from="C3.pin1" to="C4.pin1" />
    <trace from="C4.pin1" to="C5.pin1" />
    <trace name="power-GND" from="C2.pin2" to="net.GND" schDisplayLabel="GND" />
    <testpoint
      name="TP2"
      manufacturerPartNumber="5001"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1.5mm"
      symbol={
        <symbol>
          <schematiccircle
            center={{ x: 0, y: 0 }}
            radius={0.073113}
            strokeWidth={0.02}
            color="#1f2937"
          />
          <schematicline
            x1={0}
            y1={-0.073113}
            x2={0}
            y2={-0.255894}
            strokeWidth={0.02}
            color="#1f2937"
          />
          <port
            name="pin1"
            pinNumber={1}
            schX={0}
            schY={-0.255894}
            direction="down"
            schStemLength={0}
          />
        </symbol>
      }
      schX={6.5801}
      schY={4.8254}
      schRotation={0}
      schSectionName="tp2"
      pcbX={0}
      pcbY={-8}
    />
    <schematictext
      text="TP2"
      schX={6.506987}
      schY={4.898541}
      fontSize={0.182781}
      anchor="bottom_left"
      color="#1f2937"
    />
    <trace name="TP2-GND" from="TP2.pin1" to="net.GND" schDisplayLabel="GND" />
  </>
);

const OutputFixtureBank = () => (
  <>
    {OUTPUT_FIXTURES.map((fixture) => (
      <OutputFixture key={fixture.netName} {...fixture} />
    ))}
  </>
);

const DeviceOutputSheetPorts = () => (
  <>
    {/* TI terminates each device-side output stub in a named sheet port. The
        LMK1C1104 only drives Y0-Y3; the reused LMK1C1108 sheet keeps Y4-Y7 as
        visibly crossed-out stubs feeding DNP measurement fixtures. */}
    {DEVICE_OUTPUT_SHEET_PORTS.map((port, index) => {
      const netName = port.name;
      const isDrivenOutput = index < 4;
      const y = port.y;
      const sheetPortLeftX = port.x - port.width / 2;
      return (
        <Fragment key={`${netName}-stub`}>
          <schematicline
            x1={-4.5695}
            y1={y}
            x2={sheetPortLeftX}
            y2={y}
            color="#008000"
            strokeWidth={0.02}
          />
          {!isDrivenOutput && (
            <>
              <schematicline
                x1={-4.642647}
                y1={y - 0.073113}
                x2={-4.496422}
                y2={y + 0.073113}
                color="#ff0000"
                strokeWidth={0.02}
              />
              <schematicline
                x1={-4.642647}
                y1={y + 0.073113}
                x2={-4.496422}
                y2={y - 0.073113}
                color="#ff0000"
                strokeWidth={0.02}
              />
            </>
          )}
          <SheetPortGraphic
            name={netName}
            schX={port.x}
            schY={y}
            width={port.width}
          />
        </Fragment>
      );
    })}
  </>
);

const CoreArtifactOverlaysAndInlineLabels = () => (
  <>
    {/* A zero-width display label keeps the cross-section CLKIN trace
        electrically joined, but core still draws its empty tag outline.
        Cover only that outline and restore TI's straight signal segment. */}
    <schematictext
      text="█"
      schX={-6.98}
      schY={6.9457}
      fontSize={0.36}
      anchor="center"
      color="#f5f1ed"
    />
    <schematictext
      text={"█".repeat(42)}
      schX={-6.98}
      schY={6.9457}
      fontSize={0.02}
      anchor="center"
      color="#008000"
    />
    <schematictext
      text="1"
      schX={-6.5801}
      schY={6.9457}
      fontSize={0.15}
      anchor="bottom_center"
      color="#a90000"
    />
    <schematictext
      text="CLKIN"
      schX={-6.95}
      schY={7.0357}
      fontSize={0.18}
      anchor="center"
      color="#840000"
    />
    <schematictext
      text="1G"
      schX={-6.9485}
      schY={6.3046}
      fontSize={0.18}
      anchor="center"
      color="#840000"
    />
  </>
);

const ReferenceNotesLayer = () => (
  <>
    {TI_NOTE_FRAMES.map((frame, index) => (
      <Fragment key={`ti-note-frame-${index}`}>
        <schematicrect
          schX={frame.x}
          schY={frame.y}
          width={frame.width}
          height={frame.height}
          strokeWidth={0}
          color="#ffffff"
          isFilled
        />
      </Fragment>
    ))}

    {/* These strings intentionally preserve TI's source annotations verbatim,
        including its stale C29-C32 and output-resistor references. */}
    {TI_SCHEMATIC_NOTES.map((note, index) => (
      <Fragment key={`ti-note-${index}`}>
        <schematictext
          text={note.text}
          schX={note.x}
          schY={note.y}
          fontSize={0.2}
          anchor="top_left"
          color={note.color}
        />
      </Fragment>
    ))}
    <schematictext
      text="LAYOUT NOTES IN RED"
      schX={-2.1842}
      schY={-6.4065}
      fontSize={0.255894}
      anchor="top_left"
      color="#ff0000"
    />
  </>
);

/**
 * LMK1C1104EVM validation circuit reproduced from TI's Altium reference.
 * Reference: https://www.ti.com/tool/LMK1C1104EVM
 */
export const ClockBuffer_LMK1C1104 = (props: SubcircuitProps) => (
  <subcircuit
    schMaxTraceDistance="3.2mm"
    schTraceAutoLabelEnabled={false}
    autorouterEffortLevel="10x"
    {...props}
  >
    <ReferenceNets />
    <ClockDevice />
    <InputNetwork />
    <EnableNetwork />
    <InputAndEnableSourceArtwork />
    <PowerNetwork />
    <OutputFixtureBank />
    <DeviceOutputSheetPorts />
    <CoreArtifactOverlaysAndInlineLabels />
    <ReferenceNotesLayer />
  </subcircuit>
);

export default ClockBuffer_LMK1C1104;
