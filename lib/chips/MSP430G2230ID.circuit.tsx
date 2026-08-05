import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: ["DVCC", "POWER_DVCC"],
  pin2: ["P1_2_TA1_A2", "GPIO_P1_2", "P1_2", "TA1", "ADC_A2"],
  pin3: ["P1_5_TA0_A5_SCLK", "GPIO_P1_5", "P1_5", "TA0", "ADC_A5", "SPI_SCLK"],
  pin4: [
    "P1_6_TA1_A6_SDO_SCL",
    "GPIO_P1_6",
    "P1_6",
    "TA1",
    "ADC_A6",
    "SPI_SDO",
    "I2C_SCL",
  ],
  pin5: [
    "P1_7_A7_SDI_SDA",
    "GPIO_P1_7",
    "P1_7",
    "ADC_A7",
    "SPI_SDI",
    "I2C_SDA",
  ],
  pin6: ["RST_SBWTDIO", "N_RESET", "RST", "SBWTDIO"],
  pin7: ["TST_SBWTCK", "TEST", "SBWTCK"],
  pin8: ["DVSS", "POWER_DVSS", "GND"],
} as const;

/**
 * MSP430G2230 in the 8-pin D (SOIC) package.
 *
 * This pinout is also the one exposed by the MSP-TS430D8 socket board for the
 * supported MSP430G2210/MSP430G2230 devices.
 */
export const MSP430G2230ID = (props: ChipProps<typeof pinLabels>) => (
  <chip
    manufacturerPartNumber="MSP430G2230ID"
    footprint="soic8"
    schWidth="7mm"
    schHeight="4.8mm"
    pinLabels={pinLabels}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: [1, 2, 3, 4],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [8, 7, 6, 5],
      },
    }}
    schPinStyle={{
      pin1: { marginBottom: 0.2 },
      pin2: { marginBottom: 0.2 },
      pin3: { marginBottom: 0.2 },
      pin8: { marginBottom: 0.2 },
      pin7: { marginBottom: 0.2 },
      pin6: { marginBottom: 0.2 },
    }}
    {...props}
  />
);

export default MSP430G2230ID;
