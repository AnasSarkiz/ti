import type { ChipProps } from "@tscircuit/props";
import { Fragment } from "react";
import "tscircuit";

// TI's RRF example-board land pattern uses an 8.7 mm pad-row center span.
// Keeping the row centers at ±4.35 mm also prevents the orthogonal corner
// pads from touching, which the generic QFN footprint would do here.
const RRF_SIDE_PAD_POSITIONS = Array.from(
  { length: 19 },
  (_, index) => 3.6 - index * 0.4,
);

const renderRrf76Footprint = () => (
  <footprint>
    {RRF_SIDE_PAD_POSITIONS.map((pcbY, index) => (
      <Fragment key={`left-${index + 1}`}>
        <smtpad
          pcbX={-4.35}
          pcbY={pcbY}
          width="0.7mm"
          height="0.2mm"
          shape="rect"
          portHints={[String(index + 1)]}
        />
      </Fragment>
    ))}
    {RRF_SIDE_PAD_POSITIONS.map((position, index) => (
      <Fragment key={`bottom-${index + 20}`}>
        <smtpad
          pcbX={-position}
          pcbY={-4.35}
          width="0.2mm"
          height="0.7mm"
          shape="rect"
          portHints={[String(index + 20)]}
        />
      </Fragment>
    ))}
    {RRF_SIDE_PAD_POSITIONS.map((position, index) => (
      <Fragment key={`right-${index + 39}`}>
        <smtpad
          pcbX={4.35}
          pcbY={-position}
          width="0.7mm"
          height="0.2mm"
          shape="rect"
          portHints={[String(index + 39)]}
        />
      </Fragment>
    ))}
    {RRF_SIDE_PAD_POSITIONS.map((position, index) => (
      <Fragment key={`top-${index + 58}`}>
        <smtpad
          pcbX={position}
          pcbY={4.35}
          width="0.2mm"
          height="0.7mm"
          shape="rect"
          portHints={[String(index + 58)]}
        />
      </Fragment>
    ))}
    <smtpad
      pcbX={0}
      pcbY={0}
      width="6.3mm"
      height="6.3mm"
      shape="rect"
      portHints={["77"]}
    />
    {[
      [
        { x: -4.5, y: 3.9 },
        { x: -4.5, y: 4.5 },
        { x: -3.9, y: 4.5 },
      ],
      [
        { x: 3.9, y: 4.5 },
        { x: 4.5, y: 4.5 },
        { x: 4.5, y: 3.9 },
      ],
      [
        { x: 4.5, y: -3.9 },
        { x: 4.5, y: -4.5 },
        { x: 3.9, y: -4.5 },
      ],
      [
        { x: -3.9, y: -4.5 },
        { x: -4.5, y: -4.5 },
        { x: -4.5, y: -3.9 },
      ],
    ].map((route, index) => (
      <Fragment key={`silkscreen-corner-${index}`}>
        <silkscreenpath route={route} />
      </Fragment>
    ))}
    <silkscreenpath
      route={[
        { x: -4.85, y: 4.65 },
        { x: -4.55, y: 4.65 },
        { x: -4.85, y: 4.35 },
        { x: -4.85, y: 4.65 },
      ]}
    />
    <silkscreentext
      text="{NAME}"
      pcbX={0}
      pcbY={5.35}
      anchorAlignment="center"
      fontSize="1mm"
    />
    <courtyardoutline
      outline={[
        { x: -4.95, y: 4.95 },
        { x: 4.95, y: 4.95 },
        { x: 4.95, y: -4.95 },
        { x: -4.95, y: -4.95 },
        { x: -4.95, y: 4.95 },
      ]}
    />
  </footprint>
);

export const LP5892QRRFRQ1_PIN_LABELS = {
  pin1: "R0",
  pin2: "G0",
  pin3: "B0",
  pin4: "R1",
  pin5: "G1",
  pin6: "B1",
  pin7: "GND",
  pin8: "VCC",
  pin9: "VR",
  pin10: "VR",
  pin11: "R2",
  pin12: "G2",
  pin13: "B2",
  pin14: "R3",
  pin15: "G3",
  pin16: "B3",
  pin17: "R4",
  pin18: "G4",
  pin19: "B4",
  pin20: "IREF",
  pin21: "R5",
  pin22: "G5",
  pin23: "B5",
  pin24: "R6",
  pin25: "G6",
  pin26: "B6",
  pin27: "R7",
  pin28: "G7",
  pin29: "B7",
  pin30: "B8",
  pin31: "G8",
  pin32: "R8",
  pin33: "B9",
  pin34: "G9",
  pin35: "R9",
  pin36: "B10",
  pin37: "G10",
  pin38: "R10",
  pin39: "B11",
  pin40: "G11",
  pin41: "R11",
  pin42: "B12",
  pin43: "G12",
  pin44: "R12",
  pin45: "B13",
  pin46: "G13",
  pin47: "R13",
  pin48: "VB",
  pin49: "VB",
  pin50: "VG",
  pin51: "VG",
  pin52: "B14",
  pin53: "G14",
  pin54: "R14",
  pin55: "B15",
  pin56: "G15",
  pin57: "R15",
  pin58: "SOUT",
  pin59: "SIN",
  pin60: "SCLK",
  pin61: "LINE15",
  pin62: "LINE14",
  pin63: "LINE13",
  pin64: "LINE12",
  pin65: "LINE11",
  pin66: "LINE10",
  pin67: "LINE9",
  pin68: "LINE8",
  pin69: "LINE7",
  pin70: "LINE6",
  pin71: "LINE5",
  pin72: "LINE4",
  pin73: "LINE3",
  pin74: "LINE2",
  pin75: "LINE1",
  pin76: "LINE0",
  pin77: ["EP_GND", "EP", "GND", "thermalpad"],
} as const;

/** LP5892-Q1 automotive LED-matrix driver in TI's 76-pin RRF VQFN. */
export const LP5892QRRFRQ1 = (
  props: ChipProps<typeof LP5892QRRFRQ1_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="LP5892QRRFRQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/lp5892-q1.pdf"
    footprint={renderRrf76Footprint()}
    schWidth="10mm"
    schHeight="24mm"
    pinLabels={LP5892QRRFRQ1_PIN_LABELS}
    pinAttributes={{
      pin7: { requiresGround: true },
      pin8: { requiresPower: true },
      pin9: { requiresPower: true },
      pin10: { requiresPower: true },
      pin48: { requiresPower: true },
      pin49: { requiresPower: true },
      pin50: { requiresPower: true },
      pin51: { requiresPower: true },
      pin77: { requiresGround: true },
    }}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [
          60, // SCLK
          59, // SIN
          58, // SOUT
          76, // LINE0
          75, // LINE1
          74, // LINE2
          73, // LINE3
          72, // LINE4
          71, // LINE5
          70, // LINE6
          69, // LINE7
          68, // LINE8
          67, // LINE9
          66, // LINE10
          65, // LINE11
          64, // LINE12
          63, // LINE13
          62, // LINE14
          61, // LINE15
          20, // IREF
        ],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [
          1,
          2,
          3, // RGB0
          4,
          5,
          6, // RGB1
          11,
          12,
          13, // RGB2
          14,
          15,
          16, // RGB3
          17,
          18,
          19, // RGB4
          21,
          22,
          23, // RGB5
          24,
          25,
          26, // RGB6
          27,
          28,
          29, // RGB7
          32,
          31,
          30, // RGB8
          35,
          34,
          33, // RGB9
          38,
          37,
          36, // RGB10
          41,
          40,
          39, // RGB11
          44,
          43,
          42, // RGB12
          47,
          46,
          45, // RGB13
          54,
          53,
          52, // RGB14
          57,
          56,
          55, // RGB15
        ],
      },
      topSide: {
        direction: "left-to-right",
        pins: [8, 9, 10, 50, 51, 48, 49],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [7, 77],
      },
    }}
    schPinStyle={{
      pin76: { marginTop: 0.4 },
      pin20: { marginTop: 0.4 },
    }}
    {...props}
  />
);

export default LP5892QRRFRQ1;
