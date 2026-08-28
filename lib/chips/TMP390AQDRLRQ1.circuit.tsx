import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const TMP390AQDRLRQ1_PIN_LABELS = {
  pin1: "SETA",
  pin2: "SETB",
  pin3: "GND",
  pin4: "OUTB",
  pin5: "VDD",
  pin6: "OUTA",
} as const;

/**
 * TMP390-Q1 dual-channel automotive temperature switch in TI's six-pin DRL
 * SOT-563 package.
 *
 * Pin numbers and the land pattern are from TMP390-Q1 datasheet Figures 5-1
 * and 12-2 (SNIS218B). OUTA and OUTB are open-drain, active-low outputs.
 */
export const TMP390AQDRLRQ1 = (
  props: ChipProps<typeof TMP390AQDRLRQ1_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="TMP390AQDRLRQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/tmp390-q1.pdf"
    pinLabels={TMP390AQDRLRQ1_PIN_LABELS}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [1, 2],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [6, 4],
      },
      topSide: {
        direction: "left-to-right",
        pins: [5],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [3],
      },
    }}
    footprint={
      <footprint>
        <smtpad
          portHints={["pin1"]}
          pcbX="-0.74mm"
          pcbY="0.5mm"
          width="0.67mm"
          height="0.3mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin2"]}
          pcbX="-0.74mm"
          pcbY="0mm"
          width="0.67mm"
          height="0.3mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin3"]}
          pcbX="-0.74mm"
          pcbY="-0.5mm"
          width="0.67mm"
          height="0.3mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin4"]}
          pcbX="0.74mm"
          pcbY="-0.5mm"
          width="0.67mm"
          height="0.3mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin5"]}
          pcbX="0.74mm"
          pcbY="0mm"
          width="0.67mm"
          height="0.3mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin6"]}
          pcbX="0.74mm"
          pcbY="0.5mm"
          width="0.67mm"
          height="0.3mm"
          shape="rect"
        />
      </footprint>
    }
    {...props}
  />
);

export default TMP390AQDRLRQ1;
