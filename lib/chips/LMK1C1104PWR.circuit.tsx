import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const LMK1C1104PWR_PIN_LABELS = {
  pin1: "CLKIN",
  pin2: ["1G", "OE"],
  pin3: ["Y0", "CLKOUT0"],
  pin4: "GND",
  pin5: ["Y2", "CLKOUT2"],
  pin6: "VDD",
  pin7: ["Y3", "CLKOUT3"],
  pin8: ["Y1", "CLKOUT1"],
} as const;

/** LMK1C1104 1:4 LVCMOS clock buffer in the 8-pin TSSOP package. */
export const LMK1C1104PWR = (
  props: ChipProps<typeof LMK1C1104PWR_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="LMK1C1104PWR"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/lmk1c1104.pdf"
    supplierPartNumbers={{ jlcpcb: ["C1855734"] }}
    footprint="tssop8_p0.65mm"
    schWidth="2.8mm"
    schHeight="2.4mm"
    pinLabels={LMK1C1104PWR_PIN_LABELS}
    pinAttributes={{
      pin4: { requiresGround: true },
      pin6: { requiresPower: true },
    }}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [1, 2],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [3, 8, 5, 7],
      },
      topSide: {
        direction: "left-to-right",
        pins: [6],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [4],
      },
    }}
    schPinStyle={{
      OE: { marginTop: 0.4 },
      Y1: { marginTop: 0.35 },
      Y2: { marginTop: 0.35 },
      Y3: { marginTop: 0.35 },
    }}
    {...props}
  />
);

export default LMK1C1104PWR;
