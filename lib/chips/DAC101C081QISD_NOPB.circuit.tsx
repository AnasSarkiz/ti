import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: ["ADR0", "ADDR0"],
  pin2: "SCL",
  pin3: "SDA",
  pin4: "GND",
  pin5: ["VA", "VCC"],
  pin6: "VOUT",
} as const;

/** DAC101C081-Q1 10-bit I2C DAC in the six-pin NGF WSON package. */
export const DAC101C081QISD_NOPB = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="DAC101C081QISD/NOPB"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/dac101c081q.pdf"
    footprint="son6_w2mm_h2mm_p0.65mm_pl0.6mm_pw0.3mm_ep_epw1.2mm_eph0.8mm"
    schWidth="2.5mm"
    schHeight="1.5mm"
    pinLabels={pinLabels}
    pinAttributes={{
      ADR0: { requiresPower: true },
      SCL: { mustBeConnected: true, requiresPower: true },
      SDA: {
        mustBeConnected: true,
        requiresPower: true,
        providesPower: true,
      },
      VA: { requiresPower: true },
      VOUT: { providesPower: true },
      GND: { requiresGround: true },
    }}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: [1, 2, 3] },
      rightSide: { direction: "top-to-bottom", pins: [6, 5, 4] },
    }}
    schPinStyle={{
      pin1: { marginBottom: "0.2mm" },
      pin2: { marginBottom: "0.2mm" },
      pin6: { marginBottom: "0.2mm" },
      pin5: { marginBottom: "0.2mm" },
    }}
    {...props}
  />
);

export const DAC101C081Q = DAC101C081QISD_NOPB;

export default DAC101C081QISD_NOPB;
