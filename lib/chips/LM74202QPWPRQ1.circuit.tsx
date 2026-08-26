import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

export const LM74202QPWPRQ1_PIN_LABELS = {
  pin2: "IN",
  pin3: "UVLO",
  pin4: "NC1",
  pin5: "OVP",
  pin6: "MODE",
  pin7: "SHDN",
  pin8: "RTN",
  pin9: "GND",
  pin10: "IMON",
  pin11: "ILIM",
  pin12: "DVDT",
  pin13: "NC2",
  pin14: "FLT",
  pin15: ["OUT"],
  pin17: ["PAD", "thermalpad"],
} as const;

/** Automotive ideal-diode controller in the 16-pin PWP PowerPAD package. */
export const LM74202QPWPRQ1 = (
  props: ChipProps<typeof LM74202QPWPRQ1_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="LM74202QPWPRQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/lm74202-q1.pdf"
    footprint="tssop16_p0.65mm_w4.4mm_thermalpad3mmx3mm"
    schWidth="3.5mm"
    schHeight="5mm"
    pinLabels={LM74202QPWPRQ1_PIN_LABELS}
    pinAttributes={{
      IN1: { requiresPower: true },
      IN2: { requiresPower: true },
      UVLO: { requiresPower: true },
      OVP: { requiresPower: true },
      MODE: { requiresPower: true },
      SHDN: { requiresPower: true },
      IMON: { providesPower: true },
      FLT: { providesPower: true },
      OUT2: { providesPower: true },
      RTN: { requiresGround: true },
      GND: { requiresGround: true },
    }}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [2, 3, 5, 12, 6, 8],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [15, 14, 7, 10, 11],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: [9],
      },
    }}
    schPinStyle={{
      pin1: { marginBottom: "0.2mm" },
      pin2: { marginBottom: "0.3mm" },
      pin3: { marginBottom: "0.2mm" },
      pin5: { marginBottom: "0.5mm" },
      pin12: { marginBottom: "0.5mm" },
      pin6: { marginBottom: "0.5mm" },
      pin16: { marginBottom: "0.2mm" },
      pin15: { marginBottom: "1mm" },
      pin14: { marginBottom: "0.8mm" },
      pin7: { marginBottom: "0.8mm" },
      pin10: { marginBottom: "0.5mm" },
    }}
    noConnect={["pin4", "pin13"]}
    {...props}
  />
);

export const LM74202Q1 = LM74202QPWPRQ1;

export default LM74202QPWPRQ1;
