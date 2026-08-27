import type { ChipProps } from "@tscircuit/props";
import { Fragment } from "react";

/**
 * Automotive MSPM0L1306-Q1 in the 32-pin RHB VQFN package.
 *
 * The RHB32 package geometry comes from the pin-compatible JLCPCB import of
 * MSPM0L1306SRHBR (C19189324). The pin names and ordering are taken from the
 * TIDA-020065 Altium symbol and the MSPM0L1306-Q1 datasheet.
 */
const pinLabels = {
  pin1: ["PA0"],
  pin2: ["PA1"],
  pin3: ["NRST"],
  pin4: ["VDD"],
  pin5: ["VSS"],
  pin6: ["PA2", "ROSC"],
  pin7: ["PA3"],
  pin8: ["PA4"],
  pin9: ["PA5"],
  pin10: ["PA6"],
  pin11: ["PA7"],
  pin12: ["PA8"],
  pin13: ["PA9"],
  pin14: ["PA10"],
  pin15: ["PA11"],
  pin16: ["PA12"],
  pin17: ["PA13"],
  pin18: ["PA14"],
  pin19: ["PA15", "A9"],
  pin20: ["PA16", "A8"],
  pin21: ["PA17"],
  pin22: ["PA18", "A7"],
  pin23: ["PA19", "SWDIO"],
  pin24: ["PA20", "SWCLK", "A6"],
  pin25: ["PA21", "A5", "VREFN"],
  pin26: ["PA22", "A4"],
  pin27: ["PA23", "VREFP"],
  pin28: ["PA24", "A3"],
  pin29: ["PA25", "A2"],
  pin30: ["PA26", "A1"],
  pin31: ["PA27", "A0"],
  pin32: ["VCORE"],
  pin33: ["Thermal_pad"],
} as const;

/*
 * The TI Altium symbol draws NRST as an input and every PA pin as
 * bidirectional. Power, VCORE, VSS and the exposed pad are plain pins.
 */
const bidirectionalGpioPinAttributes = {
  requiresPower: true,
  providesPower: true,
  isGpio: true,
} as const;

const pinAttributes = {
  pin1: bidirectionalGpioPinAttributes,
  pin2: bidirectionalGpioPinAttributes,
  pin3: { requiresPower: true },
  pin6: bidirectionalGpioPinAttributes,
  pin7: bidirectionalGpioPinAttributes,
  pin8: bidirectionalGpioPinAttributes,
  pin9: bidirectionalGpioPinAttributes,
  pin10: bidirectionalGpioPinAttributes,
  pin11: bidirectionalGpioPinAttributes,
  pin12: bidirectionalGpioPinAttributes,
  pin13: bidirectionalGpioPinAttributes,
  pin14: bidirectionalGpioPinAttributes,
  pin15: bidirectionalGpioPinAttributes,
  pin16: bidirectionalGpioPinAttributes,
  pin17: bidirectionalGpioPinAttributes,
  pin18: bidirectionalGpioPinAttributes,
  pin19: bidirectionalGpioPinAttributes,
  pin20: bidirectionalGpioPinAttributes,
  pin21: bidirectionalGpioPinAttributes,
  pin22: bidirectionalGpioPinAttributes,
  pin23: bidirectionalGpioPinAttributes,
  pin24: bidirectionalGpioPinAttributes,
  pin25: bidirectionalGpioPinAttributes,
  pin26: bidirectionalGpioPinAttributes,
  pin27: bidirectionalGpioPinAttributes,
  pin28: bidirectionalGpioPinAttributes,
  pin29: bidirectionalGpioPinAttributes,
  pin30: bidirectionalGpioPinAttributes,
  pin31: bidirectionalGpioPinAttributes,
} satisfies NonNullable<ChipProps["pinAttributes"]>;

const edgePadOffsets = [
  -1.74965, -1.24975, -0.74985, -0.24995, 0.24995, 0.74985, 1.24975, 1.74965,
] as const;

/**
 * The pad geometry is the C19189324 JLCPCB import, with its exposed pad
 * explicitly mapped to TI pin 33. Footprinter calls that pad "thermalpad",
 * which would otherwise leak a non-reference alias into the schematic label.
 */
const RHB32Footprint = () => (
  <footprint>
    {[...edgePadOffsets].reverse().map((offset, index) => (
      <Fragment key={`left-${index + 1}`}>
        <smtpad
          portHints={[`pin${index + 1}`]}
          pcbX="-2.40005mm"
          pcbY={`${offset}mm`}
          width="0.8mm"
          height="0.28mm"
          radius="0.14mm"
          shape="pill"
        />
      </Fragment>
    ))}
    {edgePadOffsets.map((offset, index) => (
      <Fragment key={`bottom-${index + 9}`}>
        <smtpad
          portHints={[`pin${index + 9}`]}
          pcbX={`${offset}mm`}
          pcbY="-2.40005mm"
          width="0.28mm"
          height="0.8mm"
          radius="0.14mm"
          shape="pill"
        />
      </Fragment>
    ))}
    {edgePadOffsets.map((offset, index) => (
      <Fragment key={`right-${index + 17}`}>
        <smtpad
          portHints={[`pin${index + 17}`]}
          pcbX="2.40005mm"
          pcbY={`${offset}mm`}
          width="0.8mm"
          height="0.28mm"
          radius="0.14mm"
          shape="pill"
        />
      </Fragment>
    ))}
    {[...edgePadOffsets].reverse().map((offset, index) => (
      <Fragment key={`top-${index + 25}`}>
        <smtpad
          portHints={[`pin${index + 25}`]}
          pcbX={`${offset}mm`}
          pcbY="2.40005mm"
          width="0.28mm"
          height="0.8mm"
          radius="0.14mm"
          shape="pill"
        />
      </Fragment>
    ))}
    <smtpad
      portHints={["pin33"]}
      pcbX="0mm"
      pcbY="0mm"
      width="3.45mm"
      height="3.45mm"
      shape="rect"
    />
    <courtyardrect width="6.3001mm" height="6.3001mm" />
  </footprint>
);

export const MSPM0L1306QRHBRQ1 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    pinLabels={pinLabels}
    pinAttributes={pinAttributes}
    manufacturerPartNumber="MSPM0L1306QRHBRQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/mspm0l1306-q1.pdf"
    footprint={<RHB32Footprint />}
    {...props}
  />
);
export const MSPM0L1306Q1 = MSPM0L1306QRHBRQ1;

export default MSPM0L1306QRHBRQ1;
