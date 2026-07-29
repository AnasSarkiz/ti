import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["VDDR", "VDDR1"],
  pin2: ["VDDR", "VDDR2"],
  pin3: ["DIO0", "DIO0"],
  pin4: ["DIO1", "DIO1"],
  pin5: ["DIO2", "DIO2"],
  pin6: ["DIO3", "DIO3"],
  pin7: ["DIO4", "DIO4"],
  pin8: ["DIO5", "DIO5"],
  pin9: ["VDDIO", "VDDIO1"],
  pin10: ["DIO7", "DIO7"],
  pin11: ["DDIO9_SWDIOIO9", "SWDIO", "DIO9_SWDIO"],
  pin12: ["DIO10_SWDCK", "SWDCK", "DIO10_SWDCK"],
  pin13: ["DIO11", "DIO11"],
  pin14: ["DIO12", "DIO12"],
  pin15: ["DIO15", "DIO15"],
  pin16: ["DIO16", "DIO16"],
  pin17: ["VDDIO", "VDDIO2"],
  pin18: ["VDDS", "VDDS1"],
  pin19: ["DIO17_A8", "ADC_A8", "DIO17_A8"],
  pin20: ["DIO18_A7", "ADC_A7", "DIO18_A7"],
  pin21: ["DIO19_A6", "ADC_A6", "DIO19_A6"],
  pin22: ["DIO20_A5", "ADC_A5", "DIO20_A5"],
  pin23: ["DIO21_A4", "ADC_A4", "DIO21_A4"],
  pin24: ["DIO22_A3", "ADC_A3", "DIO22_A3"],
  pin25: ["N_RESET", "nRST"],
  pin26: ["DIO23_X32P"],
  pin27: ["DIO24_X32N"],
  pin28: ["VDDD"],
  pin29: ["VDDS", "VDDS2"],
  pin30: ["DCDC_SW"],
  pin31: ["VDDS", "VDDS3"],
  pin32: ["DIO27", "ADC_A1", "DIO27_A1"],
  pin33: ["DIO28", "ADC_A0", "DIO28_A0"],
  pin34: ["VDDR", "VDDR3"],
  pin35: ["X48P", "X48P"],
  pin36: ["X48N", "X48N"],
  pin37: ["NC"],
  pin38: ["VDDS", "VDDS4"],
  pin39: ["ANT", "ANT"],
  pin40: ["RFGND"],
  pin41: ["EGP", "EGP", "thermalpad"],
} as const;

export const CC2745R10E0WRHARQ1 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    pinLabels={pinLabels}
    footprint="qfn40_thermalpad4.7mmx4.7mm_p0.5001mm_h7.1mm_pl0.9mm"
    pinAttributes={{
      pin1: {
        mustBeConnected: true,
      },
    }}
    schPinStyle={{
      pin30: {
        marginBottom: -0.1,
      },
      pin27: {
        marginBottom: 0.2,
      },
      pin26: {
        marginBottom: 0.4,
      },
      pin33: {
        marginBottom: 0.2,
      },
      pin17: {
        marginBottom: 0.2,
      },
      pin28: {
        marginBottom: 0.2,
      },
      pin41: {
        marginBottom: -0.1,
      },
      pin37: {
        marginBottom: 0.2,
      },
      pin36: {
        marginBottom: 0.2,
      },
      pin35: {
        marginBottom: 0.4,
      },
      pin16: {
        marginBottom: 0.2,
      },
      pin25: {
        marginBottom: 0.2,
      },
      pin39: {
        marginBottom: 0.2,
      },
    }}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [
          1, 2, 34, 18, 29, 31, 38, 28, 9, 17, 19, 20, 21, 22, 23, 24, 32, 33,
          26, 27, 30,
        ],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [
          39, 25, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 35, 36, 37, 40,
          41,
        ],
      },
    }}
    schWidth="3mm"
    schHeight="5.6mm"
    manufacturerPartNumber="CC2745R10E0WRHARQ1"
    {...props}
  />
);
