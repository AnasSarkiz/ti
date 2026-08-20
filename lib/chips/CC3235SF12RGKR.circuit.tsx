import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["GPIO10"],
  pin2: ["GPIO11"],
  pin3: ["GPIO12"],
  pin4: ["GPIO13"],
  pin5: ["GPIO14"],
  pin6: ["GPIO15"],
  pin7: ["GPIO16"],
  pin8: ["GPIO17"],
  pin9: ["VDD_DIG1"],
  pin10: ["VIN_IO1"],
  pin11: ["FLASH_SPI_CLK"],
  pin12: ["FLASH_SPI_DOUT"],
  pin13: ["FLASH_SPI_DIN"],
  pin14: ["FLASH_SPI_CS"],
  pin15: ["GPIO22"],
  pin16: ["JTAG_TDI", "TDI"],
  pin17: ["JTAG_TDO", "TDO"],
  pin18: ["GPIO28"],
  pin19: ["JTAG_TCK", "SWD_SWCLK", "TCK"],
  pin20: ["JTAG_TMS", "SWDIO", "TMS"],
  pin21: ["BOOT_SOP2", "SOP2"],
  pin22: ["WLAN_XTAL_N"],
  pin23: ["WLAN_XTAL_P"],
  pin24: ["VDD_PLL"],
  pin25: ["LDO_IN2"],
  pin26: ["NC"],
  pin27: ["RF_A_RX", "A_RX"],
  pin28: ["RF_A_TX", "A_TX"],
  pin29: ["GND1"],
  pin30: ["GND2"],
  pin31: ["RF_BG"],
  pin32: ["N_RESET"],
  pin33: ["VDD_PA_IN"],
  pin34: ["BOOT_SOP1", "SOP1"],
  pin35: ["BOOT_SOP0", "SOP0"],
  pin36: ["LDO_IN1"],
  pin37: ["VIN_DCDC_ANA"],
  pin38: ["DCDC_ANA_SW"],
  pin39: ["VIN_DCDC_PA"],
  pin40: ["DCDC_PA_SW_P"],
  pin41: ["DCDC_PA_SW_N"],
  pin42: ["DCDC_PA_OUT"],
  pin43: ["DCDC_DIG_SW"],
  pin44: ["VIN_DCDC_DIG"],
  pin45: ["DCDC_ANA2_SW_P"],
  pin46: ["DCDC_ANA2_SW_N"],
  pin47: ["VDD_ANA2"],
  pin48: ["VDD_ANA1"],
  pin49: ["VDD_RAM"],
  pin50: ["GPIO0"],
  pin51: ["RTC_XTAL_P"],
  pin52: ["RTC_XTAL_N"],
  pin53: ["GPIO30"],
  pin54: ["VIN_IO2", "VIN_1O2"],
  pin55: ["GPIO1"],
  pin56: ["VDD_DIG2"],
  pin57: ["GPIO2"],
  pin58: ["GPIO3"],
  pin59: ["GPIO4"],
  pin60: ["GPIO5"],
  pin61: ["GPIO6"],
  pin62: ["GPIO7"],
  pin63: ["GPIO8"],
  pin64: ["GPIO9"],
  pin65: ["GND_TAB", "EP"],
} as const;

export const CC3235SF12RGKR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C2871569"],
      }}
      manufacturerPartNumber="CC3235SF12RGKR"
      footprint="qfn64_thermalpad6.3mmx6.3mm_thermalvias4x4_thermalviapitch1mm_thermalviaid0.3048mm_thermalviaod0.6096mm_pillpads_h9.67mm_pw0.28mm_pl0.66mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2871569.obj?uuid=b7201d931fc94275b12dff14351927d7",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2871569.step?uuid=b7201d931fc94275b12dff14351927d7",
        pcbRotationOffset: 0,
        modelOriginPosition: {
          x: -0.000012700000070253736,
          y: -0.000012700000070253736,
          z: -0.01,
        },
      }}
      {...props}
    />
  );
};
