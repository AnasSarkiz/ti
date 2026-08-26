import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "VDD",
  pin2: "ADDR",
  pin3: "GND",
  pin4: "SCL",
  pin5: "INT",
  pin6: "SDA",
  pin7: ["PAD", "thermalpad"],
} as const;

/** Automotive OPT3001-Q1 ambient-light sensor in the DNP USON package. */
export const OPT3001IDNPRQ1 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="OPT3001IDNPRQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/opt3001-q1.pdf"
    footprint="son6_w2mm_h2mm_p0.65mm_pl0.6mm_pw0.3mm_ep_epw1.2mm_eph0.8mm"
    schWidth="2.2mm"
    schHeight="2.8mm"
    pinLabels={pinLabels}
    pinAttributes={{
      VDD: { requiresPower: true },
      ADDR: { requiresPower: true },
      SCL: { mustBeConnected: true, requiresPower: true },
      SDA: {
        mustBeConnected: true,
        requiresPower: true,
        providesPower: true,
      },
      INT: { providesPower: true },
      GND: { requiresGround: true },
      PAD: { requiresGround: true },
    }}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: [1] },
      rightSide: { direction: "top-to-bottom", pins: [4, 6, 5, 2, 3, 7] },
    }}
    schPinStyle={{
      pin1: { marginBottom: "0.8mm" },
      pin2: { marginBottom: "0.7mm" },
    }}
    {...props}
  />
);

export const OPT3001 = OPT3001IDNPRQ1;

export default OPT3001IDNPRQ1;
