import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["GPIO_PB13", "PB13"],
  pin2: ["GPIO_PB14", "PB14"],
  pin3: ["GPIO_PB15", "PB15"],
  pin4: ["GPIO_PB16", "PB16"],
  pin5: ["GPIO_PA12", "PA12"],
  pin6: ["GPIO_PA13", "PA13", "COMP0_IN2_N"],
  pin7: ["GPIO_PA14", "PA14", "ADC0_IN12", "A0_12", "COMP0_IN2_P"],
  pin8: [
    "GPIO_PA15",
    "PA15",
    "ADC1_IN0",
    "A1_0",
    "DAC_OUT",
    "OPA0_IN2_P",
    "OPA1_IN2_P",
    "COMP0_IN3_P",
    "COMP1_IN3_P",
  ],
  pin9: ["GPIO_PA16", "PA16", "ADC1_IN1", "A1_1", "OPA1_OUT"],
  pin10: ["GPIO_PA17", "PA17", "ADC1_IN2", "A1_2", "OPA1_IN1_N", "COMP0_IN1_N"],
  pin11: [
    "GPIO_PA18",
    "PA18",
    "ADC1_IN3",
    "A1_3",
    "OPA1_IN1_P",
    "COMP0_IN1_P",
    "GPAMP_IN_N",
  ],
  pin12: ["GPIO_PA19", "PA19", "SWDIO"],
  pin13: ["GPIO_PA20", "PA20", "SWCLK"],
  pin14: ["GPIO_PB17", "PB17", "ADC1_IN4", "A1_4", "COMP1_IN2_N"],
  pin15: ["GPIO_PB18", "PB18", "ADC1_IN5", "A1_5", "COMP1_IN2_P"],
  pin16: ["GPIO_PB19", "PB19", "ADC1_IN6", "A1_6", "COMP2_IN1_P", "OPA1_IN0_P"],
  pin17: ["GPIO_PA21", "PA21", "ADC1_IN7", "A1_7", "COMP2_IN1_N", "VREF_N"],
  pin18: ["GPIO_PA22", "PA22", "ADC0_IN7", "A0_7", "GPAMP_OUT", "OPA0_OUT"],
  pin19: ["GPIO_PB20", "PB20", "ADC0_IN6", "A0_6", "OPA1_IN0_N"],
  pin20: ["GPIO_PB21", "PB21", "COMP2_IN0_P"],
  pin21: ["GPIO_PB22", "PB22", "COMP2_IN0_N"],
  pin22: ["GPIO_PB23", "PB23"],
  pin23: ["GPIO_PB24", "PB24", "ADC0_IN5", "A0_5", "COMP1_IN1_P"],
  pin24: ["GPIO_PA23", "PA23", "COMP1_IN1_N", "VREF_P"],
  pin25: ["GPIO_PA24", "PA24", "ADC0_IN3", "A0_3", "OPA0_IN1_N"],
  pin26: ["GPIO_PA25", "PA25", "ADC0_IN2", "A0_2", "OPA0_IN1_P"],
  pin27: ["GPIO_PB25", "PB25", "ADC0_IN4", "A0_4"],
  pin28: ["GPIO_PB26", "PB26", "COMP1_IN0_P"],
  pin29: ["GPIO_PB27", "PB27", "COMP1_IN0_N"],
  pin30: [
    "GPIO_PA26",
    "PA26",
    "ADC0_IN1",
    "A0_1",
    "COMP0_IN0_P",
    "OPA0_IN0_P",
    "GPAMP_IN_P",
  ],
  pin31: ["GPIO_PA27", "PA27", "ADC0_IN0", "A0_0", "COMP0_IN0_N", "OPA0_IN0_N"],
  pin32: "VCORE",
  pin33: ["GPIO_PA0", "PA0"],
  pin34: ["GPIO_PA1", "PA1"],
  pin35: ["GPIO_PA28", "PA28"],
  pin36: ["GPIO_PA29", "PA29"],
  pin37: ["GPIO_PA30", "PA30"],
  pin38: "NRST",
  pin39: ["GPIO_PA31", "PA31"],
  pin40: "VDD",
  pin41: "VSS",
  pin42: ["GPIO_PA2", "PA2", "ROSC"],
  pin43: ["GPIO_PA3", "PA3", "LFXIN"],
  pin44: ["GPIO_PA4", "PA4", "LFXOUT"],
  pin45: ["GPIO_PA5", "PA5", "HFXIN"],
  pin46: ["GPIO_PA6", "PA6", "HFXOUT"],
  pin47: ["GPIO_PB0", "PB0"],
  pin48: ["GPIO_PB1", "PB1"],
  pin49: ["GPIO_PA7", "PA7"],
  pin50: ["GPIO_PB2", "PB2"],
  pin51: ["GPIO_PB3", "PB3"],
  pin52: ["GPIO_PB4", "PB4"],
  pin53: ["GPIO_PB5", "PB5"],
  pin54: ["GPIO_PA8", "PA8"],
  pin55: ["GPIO_PA9", "PA9"],
  pin56: ["GPIO_PA10", "PA10"],
  pin57: ["GPIO_PA11", "PA11"],
  pin58: ["GPIO_PB6", "PB6"],
  pin59: ["GPIO_PB7", "PB7"],
  pin60: ["GPIO_PB8", "PB8"],
  pin61: ["GPIO_PB9", "PB9"],
  pin62: ["GPIO_PB10", "PB10"],
  pin63: ["GPIO_PB11", "PB11"],
  pin64: ["GPIO_PB12", "PB12"],
} as const;

export const MSPM0G3507SPMR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C22389960"],
      }}
      manufacturerPartNumber="MSPM0G3507SPMR"
      footprint="lga64_grid16x16_pillpads_w12.88mm_h12.9mm_pw0.3mm_pl1.5mm_pin1location(bottomside,left)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C22389960.obj?uuid=7e9b9111dcfd48d3add0eab11d882721",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C22389960.step?uuid=7e9b9111dcfd48d3add0eab11d882721",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.011810999999994465, z: 0.000795 },
      }}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: ["VDD", "VSS", "VCORE", "NRST"],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["PA2", "PA0", "PA1", "PA19", "PA20"],
        },
      }}
      schPinStyle={{
        VDD: {
          marginTop: -0.5,
        },
        VSS: {
          marginTop: 1.2,
        },
        VCORE: {
          marginTop: 0.3,
        },
        NRST: {
          marginTop: 1.5,
        },
        PA2: {
          marginTop: 0.4,
        },
        PA0: {
          marginTop: 1.9,
        },
        PA1: {
          marginTop: 0.3,
        },
        PA19: {
          marginTop: 1.2,
        },
        PA20: {
          marginTop: 0.3,
        },
      }}
      schHeight={5.3}
      {...props}
    />
  );
};
