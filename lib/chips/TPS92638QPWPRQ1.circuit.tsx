import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "SUPPLY",
  pin2: "EN",
  pin3: "STOP",
  pin4: "PWM1",
  pin5: "PWM2",
  pin6: "PWM3",
  pin7: "PWM4",
  pin8: "FAULT",
  pin9: "TEMP",
  pin10: "REFHI",
  pin11: "REF",
  pin12: "GND",
  pin13: "IOUT8",
  pin14: "IOUT7",
  pin15: "IOUT6",
  pin16: "IOUT5",
  pin17: "IOUT4",
  pin18: "IOUT3",
  pin19: "IOUT2",
  pin20: "IOUT1",
  pin21: ["PAD", "thermalpad"],
} as const;

/** Automotive eight-channel linear LED driver in the PWP PowerPAD package. */
export const TPS92638QPWPRQ1 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="TPS92638QPWPRQ1"
    datasheetUrl="https://www.ti.com/lit/ds/symlink/tps92638-q1.pdf"
    footprint="tssop20_p0.65mm_w4.4mm_thermalpad3mmx3.5mm"
    schWidth="3.2mm"
    schHeight="5.7mm"
    pinLabels={pinLabels}
    pinAttributes={{
      SUPPLY: { requiresPower: true },
      EN: { mustBeConnected: true, requiresPower: true },
      STOP: { requiresPower: true },
      PWM1: { requiresPower: true },
      PWM2: { requiresPower: true },
      PWM3: { requiresPower: true },
      PWM4: { requiresPower: true },
      FAULT: { requiresPower: true, providesPower: true },
      TEMP: { requiresPower: true },
      REFHI: { requiresPower: true },
      REF: { requiresPower: true },
      IOUT1: { providesPower: true },
      IOUT2: { providesPower: true },
      IOUT3: { providesPower: true },
      IOUT4: { providesPower: true },
      IOUT5: { providesPower: true },
      IOUT6: { providesPower: true },
      IOUT7: { providesPower: true },
      IOUT8: { providesPower: true },
      GND: { requiresGround: true },
      PAD: { requiresGround: true },
    }}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [1, 2, 4, 5, 6, 7, 3, 8, 10, 11, 9],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [20, 19, 18, 17, 16, 15, 14, 13, 12, 21],
      },
    }}
    schPinStyle={{
      pin1: { marginBottom: "0.3mm" },
      pin2: { marginBottom: "0.25mm" },
      pin4: { marginBottom: "0.15mm" },
      pin5: { marginBottom: "0.15mm" },
      pin6: { marginBottom: "0.15mm" },
      pin7: { marginBottom: "0.5mm" },
      pin3: { marginBottom: "0.35mm" },
      pin8: { marginBottom: "0.2mm" },
      pin10: { marginBottom: "0.35mm" },
      pin11: { marginBottom: "0.5mm" },
      pin20: { marginBottom: "0.25mm" },
      pin19: { marginBottom: "0.25mm" },
      pin18: { marginBottom: "0.25mm" },
      pin17: { marginBottom: "0.25mm" },
      pin16: { marginBottom: "0.25mm" },
      pin15: { marginBottom: "0.25mm" },
      pin14: { marginBottom: "0.25mm" },
      pin13: { marginBottom: "0.6mm" },
      pin12: { marginBottom: "0.25mm" },
    }}
    {...props}
  />
);

export const TPS92638 = TPS92638QPWPRQ1;

export default TPS92638QPWPRQ1;
