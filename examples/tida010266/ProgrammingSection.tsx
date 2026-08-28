import "tscircuit";
import type { GroupProps } from "@tscircuit/props";
import { TIDA010266InlineNetPorts } from "../../lib/utils/tida010266/TIDA010266InlineNetPorts.tsx";

type ProgrammingSectionProps = GroupProps & { schSectionName?: string };

/** TIDA-010266 J2/S1 reset and Arm 10-pin SWD programming interface. */
export const ProgrammingSection = (props: ProgrammingSectionProps) => {
  const originX = typeof props.schX === "number" ? props.schX : 0;
  const originY = typeof props.schY === "number" ? props.schY : 0;

  return (
    <group {...props}>
      <connector
        name="J2"
        schSectionName={props.schSectionName}
        manufacturerPartNumber="FTSH-105-01-L-DV-K"
        footprint="pinrow10_rows2_p1.27mm"
        schX={3.4}
        schY={0.8}
        schWidth="2.2mm"
        schHeight="2mm"
        schPinArrangement={{
          leftSide: {
            pins: ["pin1", "pin3", "pin5", "pin7", "pin9"],
            direction: "top-to-bottom",
          },
          rightSide: {
            pins: ["pin2", "pin4", "pin6", "pin8", "pin10"],
            direction: "top-to-bottom",
          },
        }}
        pinLabels={{
          pin1: ["V3_3"],
          pin2: ["SWDIO_HEADER"],
          pin3: ["GND_3"],
          pin4: ["SWCLK_HEADER"],
          pin5: ["GND_5"],
          pin6: ["NC_6"],
          pin7: ["GND_7"],
          pin8: ["NC_8"],
          pin9: ["GND_9"],
          pin10: ["RST"],
        }}
        connections={{
          pin1: "net.V3_3",
          pin3: "net.GND",
          pin5: "net.GND",
          pin7: "net.GND",
          pin9: "net.GND",
          pin10: "net.RST",
        }}
        pinAttributes={{
          NC_6: { doNotConnect: true },
          NC_8: { doNotConnect: true },
        }}
      />
      <resistor
        name="R1"
        schSectionName={props.schSectionName}
        resistance="27"
        footprint="0603"
        schX={6.4}
        schY={1.4}
        connections={{ pin2: "net.SWDIO" }}
      />
      <resistor
        name="R5"
        schSectionName={props.schSectionName}
        resistance="27"
        footprint="0603"
        schX={6.4}
        schY={0.6}
        connections={{ pin2: "net.SWCLK" }}
      />
      <trace
        from=".J2 > .SWDIO_HEADER"
        to=".R1 > .pin1"
        schDisplayLabel="SWDIO_HEADER"
      />
      <trace
        from=".J2 > .SWCLK_HEADER"
        to=".R5 > .pin1"
        schDisplayLabel="SWCLK_HEADER"
      />
      <resistor
        name="R2"
        schSectionName={props.schSectionName}
        resistance="47k"
        footprint="0603"
        schX={-8}
        schY={1.7}
        schOrientation="vertical"
        connections={{ pin1: "net.V3_3", pin2: "net.RST" }}
      />
      <capacitor
        name="C4"
        schSectionName={props.schSectionName}
        capacitance="1100pF"
        maxVoltageRating="50V"
        footprint="0603"
        schX={-8}
        schY={-0.2}
        schOrientation="vertical"
        connections={{
          pin1: "net.RST",
          pin2: "net.GND",
        }}
      />
      <pushbutton
        name="S1"
        schSectionName={props.schSectionName}
        manufacturerPartNumber="EVQ-21505R"
        footprint="smdpushbutton"
        schX={-5}
        schY={0.7}
        // EVQ-21505R has two pins on each switch terminal. The upstream
        // pushbutton prop type currently exposes only the two logical pins,
        // while its runtime component and footprint correctly expose all four.
        connections={
          {
            pin1: "net.RST",
            pin2: "net.RST",
            pin3: "net.GND",
            pin4: "net.GND",
          } as Record<string, string>
        }
      />
      <TIDA010266InlineNetPorts
        originX={originX}
        originY={originY}
        ports={[
          {
            name: "V3_3",
            connectsTo: [".J2 > .V3_3", ".R2 > .pin1"],
            schX: 0,
            schY: 3,
            direction: "up",
          },
          {
            name: "RST",
            connectsTo: [
              ".J2 > .RST",
              ".R2 > .pin2",
              ".C4 > .pin1",
              ".S1 > .pin1",
            ],
            schX: -9.5,
            schY: 0,
            direction: "left",
          },
          {
            name: "SWDIO",
            connectsTo: ".R1 > .pin2",
            schX: 7.5,
            schY: 1.4,
            direction: "right",
          },
          {
            name: "SWCLK",
            connectsTo: ".R5 > .pin2",
            schX: 7.5,
            schY: 0.2,
            direction: "right",
          },
          {
            name: "GND",
            connectsTo: [
              ".J2 > .GND_3",
              ".J2 > .GND_5",
              ".J2 > .GND_7",
              ".J2 > .GND_9",
              ".C4 > .pin2",
              ".S1 > .pin3",
            ],
            schX: 0,
            schY: -2.5,
            direction: "down",
          },
        ]}
      />
    </group>
  );
};

export default ProgrammingSection;
