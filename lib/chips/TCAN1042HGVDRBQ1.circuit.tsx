import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "TXD",
  pin2: "GND",
  pin3: "VCC",
  pin4: "RXD",
  pin5: "VIO",
  pin6: "CANL",
  pin7: "CANH",
  pin8: "STB",
  pin9: ["PAD", "thermalpad"],
} as const;

/** Automotive TCAN1042HGV-Q1 CAN FD transceiver in the DRB VSON package. */
export const TCAN1042HGVDRBQ1 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="TCAN1042HGVDRBQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/tcan1042h-q1.pdf"
    footprint="son8_w3mm_h3mm_p0.65mm_pl0.7mm_pw0.3mm_ep_epw1.6mm_eph2.4mm"
    schWidth="2.5mm"
    schHeight="2.5mm"
    pinLabels={pinLabels}
    pinAttributes={{
      VCC: { requiresPower: true },
      VIO: { requiresPower: true },
      GND: { requiresGround: true },
      PAD: { requiresGround: true },
      TXD: { mustBeConnected: true, requiresPower: true },
      STB: { requiresPower: true },
      RXD: { mustBeConnected: true, providesPower: true },
      CANH: {
        mustBeConnected: true,
        requiresPower: true,
        providesPower: true,
      },
      CANL: {
        mustBeConnected: true,
        requiresPower: true,
        providesPower: true,
      },
    }}
    schPinArrangement={{
      leftSide: { direction: "top-to-bottom", pins: [3, 5, 1, 8, 4] },
      rightSide: { direction: "top-to-bottom", pins: [7, 6, 2, 9] },
    }}
    schPinStyle={{
      pin5: { marginBottom: "0.3mm" },
      pin8: { marginBottom: "0.3mm" },
      pin1: { marginBottom: "0.3mm" },
      pin3: { marginBottom: "0.3mm" },
      pin7: { marginBottom: "1mm" },
      pin6: { marginBottom: "0.3mm" },
    }}
    {...props}
  />
);

export const TCAN1042HGV = TCAN1042HGVDRBQ1;

export default TCAN1042HGVDRBQ1;
