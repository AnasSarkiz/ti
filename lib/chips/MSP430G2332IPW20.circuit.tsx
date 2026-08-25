import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "DVCC",
  pin2: "P1_0_TA0CLK_ACLK_CA0",
  pin3: "P1_1_TA0_0_A1",
  pin4: "P1_2_TA0_1_A2",
  pin5: "P1_3_ADC10CLK_A3_VREF_VEREF",
  pin6: "P1_4_TA0_2_SMCLK_A4_VREF_VEREF_TCK",
  pin7: "P1_5_TA0_0_A5_SCLK_TMS",
  pin8: "P2_0",
  pin9: "P2_1",
  pin10: "P2_2",
  pin11: "P2_3",
  pin12: "P2_4",
  pin13: "P2_5",
  pin14: "P1_6_TA0_1_A6_SDO_SCL_TDI_TCLK",
  pin15: "P1_7_A7_SDI_SDA_TDO_TDI",
  pin16: "RST_NMI_SBWTDIO",
  pin17: "TEST_SBWTCK",
  pin18: "P2_7_XOUT",
  pin19: "P2_6_XIN_TA0_1",
  pin20: "DVSS",
} as const;

export const MSP430G2332IPW20 = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="MSP430G2332IPW20"
    footprint="tssop20"
    pinLabels={pinLabels}
    {...props}
  />
);

export default MSP430G2332IPW20;
