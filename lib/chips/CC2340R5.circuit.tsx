import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: "VDDR",
  pin2: ["GPIO_DIO8", "DIO8"],
  pin3: ["GPIO_DIO9", "DIO9"],
  pin4: ["GPIO_DIO10", "DIO10"],
  pin5: ["GPIO_DIO11", "DIO11"],
  pin6: ["GPIO_DIO12", "DIO12"],
  pin7: ["GPIO_DIO13", "DIO13"],
  pin8: "VDDS",
  pin9: ["GPIO_DIO14", "DIO14"],
  pin10: ["GPIO_DIO15", "DIO15"],
  pin11: ["GPIO_DIO16", "SWDIO", "DIO16_SWDIO"],
  pin12: ["GPIO_DIO17", "SWDCK", "DIO17_SWDCK"],
  pin13: ["GPIO_DIO18", "DIO18"],
  pin14: ["GPIO_DIO19", "DIO19"],
  pin15: ["GPIO_DIO20", "ADC_A11", "DIO20_A11"],
  pin16: ["GPIO_DIO21", "ADC_A10", "DIO21_A10"],
  pin17: "VDDS",
  pin18: ["GPIO_DIO22", "ADC_A9", "DIO22_A9"],
  pin19: ["GPIO_DIO23", "ADC_A8", "DIO23_A8"],
  pin20: ["GPIO_DIO24", "ADC_A7", "DIO24_A7"],
  pin21: ["GPIO_DIO25", "ADC_A6", "DIO25_A6"],
  pin22: ["GPIO_DIO0", "ADC_A5", "DIO0_A5"],
  pin23: ["GPIO_DIO1", "ADC_A4", "DIO1_A4"],
  pin24: ["GPIO_DIO2", "ADC_A3", "DIO2_A3"],
  pin25: ["N_RESET", "nRST"],
  pin26: ["GPIO_DIO3", "LFXT_X32_P", "DIO3_X32_P"],
  pin27: ["GPIO_DIO4", "LFXT_X32_N", "DIO4_X32_N"],
  pin28: "VDDD",
  pin29: ["GPIO_DIO5", "ADC_A2", "DIO5_A2"],
  pin30: "DCDC",
  pin31: "VDDS",
  pin32: ["GPIO_DIO6", "ADC_A1", "DIO6_A1"],
  pin33: ["GPIO_DIO7", "ADC_A0", "DIO7_A0"],
  pin34: "VDDR",
  pin35: ["HFXT_X48_P", "X48_P"],
  pin36: ["HFXT_X48_N", "X48_N"],
  pin37: "NC",
  pin38: "VDDS",
  pin39: ["RF_ANT", "ANT"],
  pin40: ["RF_GND", "RFGND"],
  pin41: ["EP_GND", "EGP", "thermalpad"],
} as const;

export const CC2340R5 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C5914214"],
      }}
      manufacturerPartNumber="CC2340R53E0RKP"
      footprint="qfn40_thermalpad3.6mmx3.6mm_p0.4mm_h5.67mm_pw0.2mm_pl0.66mm_pin1location(bottomside,left)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C5914214.obj?uuid=a874b490620243669fbb3a335f8c9bd5",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C5914214.step?uuid=a874b490620243669fbb3a335f8c9bd5",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012699999956566899, y: 0, z: 0 },
      }}
      pinAttributes={{
        nRST: { mustBeConnected: true, requiresPower: true },
        EGP: { requiresGround: true },
        RFGND: { requiresGround: true },
      }}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [
            "DIO16_SWDIO",
            "DIO17_SWDCK",
            "nRST",
            "DCDC",
            "pin1",
            "pin34",
            "DIO3_X32_P",
            "DIO4_X32_N",
            "NC",
            "VDDD",
            "EGP",
          ],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [
            "pin8",
            "pin17",
            "pin31",
            "pin38",
            "ANT",
            "RFGND",
            "X48_P",
            "X48_N",
          ],
        },
      }}
      schPinStyle={{
        nRST: {
          marginBottom: 0.2,
        },
        DCDC: {
          marginBottom: 0.2,
        },
        DIO3_X32_P: {
          marginTop: 0.2,
        },
        pin8: {
          marginTop: 0,
        },
        ANT: {
          marginTop: 0.5,
        },
        RFGND: {
          marginTop: 0.2,
        },
        X48_P: {
          marginTop: 0.5,
        },
      }}
      {...props}
    />
  );
};

export const CC2340R52E0RKPR = CC2340R5;
