import type { ChipProps } from "@tscircuit/props";

// TI SPRADI2 Table 3-1 specifies a 10 mil NSMD land and a 12 mil
// solder-mask opening for AM62L escape routing.
// https://www.ti.com/lit/pdf/spradi2
const tiAm62lBgaLandProps = {
  radius: "0.127mm",
  solderMaskMargin: "0.0254mm",
} as const;

const pinLabels = {
  pin1: ["A1", "VSS1"],
  pin2: ["A2", "VSS2"],
  pin3: ["A3", "MMC0_DAT6"],
  pin4: ["A4", "VSS3"],
  pin5: ["A5", "USB1_DRVVBUS"],
  pin6: ["A6", "I2C1_SDA"],
  pin7: ["A7", "I2C0_SDA"],
  pin8: ["A8", "MCASP0_AXR3"],
  pin9: ["A9", "MCASP0_AXR1"],
  pin10: ["A10", "VSS4"],
  pin11: ["A11", "MCASP0_ACLKX"],
  pin12: ["A12", "MCASP0_ACLKR"],
  pin13: ["A13", "VSS5"],
  pin14: ["A14", "DSI0_TXCLKP"],
  pin15: ["A15", "DSI0_TXCLKN"],
  pin16: ["A16", "VSS6"],
  pin17: ["A17", "DSI0_TXP1"],
  pin18: ["A18", "DSI0_TXN1"],
  pin19: ["A19", "VSS7"],
  pin20: ["A20", "DSI0_TXN2"],
  pin21: ["A21", "DSI0_TXP2"],
  pin22: ["A22", "VSS8"],
  pin23: ["A23", "VSS9"],
  pin24: ["B1", "VSS10"],
  pin25: ["B2", "MMC0_CLK"],
  pin26: ["B3", "MMC0_DAT5"],
  pin27: ["B4", "MMC0_DAT7"],
  pin28: ["B5", "VSS11"],
  pin29: ["B6", "MMC1_SDCD"],
  pin30: ["B7", "I2C0_SCL"],
  pin31: ["B8", "I2C2_SCL"],
  pin32: ["B9", "MCASP0_AXR0"],
  pin33: ["B10", "MCASP0_AXR2"],
  pin34: ["B11", "MCASP0_AFSX"],
  pin35: ["B12", "SPI0_D1"],
  pin36: ["B13", "UART0_RTSn"],
  pin37: ["B14", "UART0_CTSn"],
  pin38: ["B15", "MCAN0_RX"],
  pin39: ["B16", "MCAN0_TX"],
  pin40: ["B17", "VSS12"],
  pin41: ["B18", "DSI0_TXP0"],
  pin42: ["B19", "DSI0_TXN0"],
  pin43: ["B20", "VSS13"],
  pin44: ["B21", "DSI0_TXP3"],
  pin45: ["B22", "DSI0_TXN3"],
  pin46: ["B23", "VSS14"],
  pin47: ["C1", "MMC0_DAT2"],
  pin48: ["C2", "MMC0_DAT3"],
  pin49: ["C4", "MMC0_DAT4"],
  pin50: ["C6", "USB0_DRVVBUS"],
  pin51: ["C8", "EXTINTn"],
  pin52: ["C11", "MCASP0_AFSR"],
  pin53: ["C12", "VSS15"],
  pin54: ["C13", "UART0_TXD"],
  pin55: ["C16", "RESETSTATz"],
  pin56: ["C18", "VSS16"],
  pin57: ["C20", "OSPI0_CSn0"],
  pin58: ["C22", "OSPI0_D0"],
  pin59: ["C23", "OSPI0_CSn3"],
  pin60: ["D1", "VSS17"],
  pin61: ["D2", "MMC0_CMD"],
  pin62: ["D3", "MMC0_DAT0"],
  pin63: ["D4", "MMC0_DAT1"],
  pin64: ["D6", "MMC1_SDWP"],
  pin65: ["D7", "I2C1_SCL"],
  pin66: ["D8", "I2C2_SDA"],
  pin67: ["D11", "SPI0_CS1"],
  pin68: ["D13", "UART0_RXD"],
  pin69: ["D16", "EXT_REFCLK1"],
  pin70: ["D17", "DSI0_TXRCALIB"],
  pin71: ["D18", "OSPI0_CSn2"],
  pin72: ["D20", "OSPI0_CSn1"],
  pin73: ["D21", "OSPI0_D1"],
  pin74: ["D22", "OSPI0_CLK"],
  pin75: ["D23", "OSPI0_D3"],
  pin76: ["E1", "DDR0_DQ3"],
  pin77: ["E2", "VSS18"],
  pin78: ["E6", "VSS19"],
  pin79: ["E8", "VSS20"],
  pin80: ["E9", "VSS21"],
  pin81: ["E10", "VSS22"],
  pin82: ["E11", "SPI0_CS0"],
  pin83: ["E12", "SPI0_D0"],
  pin84: ["E13", "SPI0_CLK"],
  pin85: ["E14", "VSS23"],
  pin86: ["E15", "VSS24"],
  pin87: ["E16", "RESETz"],
  pin88: ["E18", "OSPI0_LBCLKO"],
  pin89: ["E22", "OSPI0_DQS"],
  pin90: ["E23", "OSPI0_D2"],
  pin91: ["F1", "DDR0_DQ2"],
  pin92: ["F2", "DDR0_DM0"],
  pin93: ["F3", "DDR0_DQ1"],
  pin94: ["F4", "DDR0_DQ0"],
  pin95: ["F5", "VSS25"],
  pin96: ["F6", "VSS26"],
  pin97: ["F18", "VSS27"],
  pin98: ["F19", "OSPI0_D5"],
  pin99: ["F20", "OSPI0_D7"],
  pin100: ["F21", "OSPI0_D4"],
  pin101: ["F22", "GPMC0_AD14"],
  pin102: ["F23", "GPMC0_AD15"],
  pin103: ["G1", "DDR0_DQS0"],
  pin104: ["G2", "DDR0_DQS0_n"],
  pin105: ["G4", "DDR0_DQ4"],
  pin106: ["G7", "VSS28"],
  pin107: ["G8", "VSS29"],
  pin108: ["G9", "VSS30"],
  pin109: ["G10", "VDDSHV1_1"],
  pin110: ["G11", "CAP_VDDS_GENERAL1"],
  pin111: ["G12", "VSS31"],
  pin112: ["G13", "VDDA_CORE_DSI"],
  pin113: ["G14", "VDDA_1P8_DSI"],
  pin114: ["G15", "VSS32"],
  pin115: ["G16", "VSS33"],
  pin116: ["G17", "VSS34"],
  pin117: ["G20", "OSPI0_D6"],
  pin118: ["G22", "GPMC0_AD13"],
  pin119: ["G23", "GPMC0_AD12"],
  pin120: ["H1", "VSS35"],
  pin121: ["H2", "DDR0_DQ6"],
  pin122: ["H3", "DDR0_DQ7"],
  pin123: ["H4", "DDR0_DQ5"],
  pin124: ["H5", "DDR0_A5"],
  pin125: ["H6", "DDR0_A1"],
  pin126: ["H7", "VSS36"],
  pin127: ["H8", "VDDSHV2"],
  pin128: ["H10", "VDDSHV1_2"],
  pin129: ["H12", "VDDA_CORE_DSI_CLK"],
  pin130: ["H14", "VSS37"],
  pin131: ["H16", "VDDS1"],
  pin132: ["H17", "VSS38"],
  pin133: ["H18", "GPMC0_AD11"],
  pin134: ["H19", "GPMC0_AD8"],
  pin135: ["H20", "GPMC0_AD9"],
  pin136: ["H21", "GPMC0_AD10"],
  pin137: ["H22", "GPMC0_AD5"],
  pin138: ["H23", "GPMC0_AD6"],
  pin139: ["J1", "DDR0_A4"],
  pin140: ["J2", "DDR0_RESET0_n"],
  pin141: ["J8", "CAP_VDDS_MMC0"],
  pin142: ["J9", "VDD_CORE1"],
  pin143: ["J11", "VDD_CORE2"],
  pin144: ["J13", "VDD_CORE3"],
  pin145: ["J15", "VDD_CORE4"],
  pin146: ["J16", "VDDSHV0_1"],
  pin147: ["J22", "GPMC0_AD7"],
  pin148: ["J23", "GPMC0_AD3"],
  pin149: ["K1", "DDR0_CKE0"],
  pin150: ["K2", "DDR0_A3"],
  pin151: ["K8", "VSS39"],
  pin152: ["K9", "VSS40"],
  pin153: ["K10", "VDD_CORE5"],
  pin154: ["K12", "VDDA_PLL1"],
  pin155: ["K14", "VDD_CORE6"],
  pin156: ["K15", "VSS41"],
  pin157: ["K16", "CAP_VDDS_GPMC"],
  pin158: ["K22", "GPMC0_AD2"],
  pin159: ["K23", "GPMC0_AD4"],
  pin160: ["L1", "DDR0_CAS_n"],
  pin161: ["L2", "DDR0_WE_n"],
  pin162: ["L3", "DDR0_CS0_n"],
  pin163: ["L4", "DDR0_ODT0"],
  pin164: ["L5", "DDR0_A0"],
  pin165: ["L6", "DDR0_A2"],
  pin166: ["L7", "VSS42"],
  pin167: ["L8", "VDDS_DDR1"],
  pin168: ["L9", "VSS43"],
  pin169: ["L11", "VDDA_PLL0"],
  pin170: ["L13", "VSS44"],
  pin171: ["L15", "VDD_CORE7"],
  pin172: ["L16", "VSS45"],
  pin173: ["L17", "VDDSHV0_2"],
  pin174: ["L18", "VSS46"],
  pin175: ["L19", "GPMC0_CSn1"],
  pin176: ["L20", "GPMC0_CSn0"],
  pin177: ["L21", "GPMC0_CLK"],
  pin178: ["L22", "GPMC0_AD0"],
  pin179: ["L23", "GPMC0_AD1"],
  pin180: ["M1", "VSS47"],
  pin181: ["M2", "DDR0_ACT_n"],
  pin182: ["M3", "DDR0_CAL0"],
  pin183: ["M5", "DDR0_RAS_n"],
  pin184: ["M7", "VDDS_DDR2"],
  pin185: ["M8", "VDDS_DDR3"],
  pin186: ["M10", "VDDA_DDR_PLL0"],
  pin187: ["M12", "VSS48"],
  pin188: ["M14", "VDD_CORE8"],
  pin189: ["M16", "CAP_VDDS_MMC2"],
  pin190: ["M17", "VDDSHV4"],
  pin191: ["M19", "GPMC0_WEn"],
  pin192: ["M21", "GPMC0_DIR"],
  pin193: ["M22", "GPMC0_CSn3"],
  pin194: ["M23", "GPMC0_CSn2"],
  pin195: ["N1", "DDR0_A9"],
  pin196: ["N2", "DDR0_BA1"],
  pin197: ["N3", "DDR0_BA0"],
  pin198: ["N4", "DDR0_BG1"],
  pin199: ["N5", "DDR0_BG0"],
  pin200: ["N6", "DDR0_A7"],
  pin201: ["N7", "VSS49"],
  pin202: ["N8", "VDDS_DDR4"],
  pin203: ["N9", "VSS50"],
  pin204: ["N11", "VSS51"],
  pin205: ["N13", "VSS52"],
  pin206: ["N15", "VDD_CORE9"],
  pin207: ["N16", "VSS53"],
  pin208: ["N17", "VDDA_ADC"],
  pin209: ["N18", "VPP"],
  pin210: ["N19", "GPMC0_ADVn_ALE"],
  pin211: ["N20", "GPMC0_OEn_REn"],
  pin212: ["N21", "GPMC0_WPn"],
  pin213: ["N22", "GPMC0_WAIT1"],
  pin214: ["N23", "GPMC0_WAIT0"],
  pin215: ["P1", "DDR0_CK0"],
  pin216: ["P2", "DDR0_CK0_n"],
  pin217: ["P8", "VDDS_DDR5"],
  pin218: ["P9", "VSS54"],
  pin219: ["P10", "VDD_CORE10"],
  pin220: ["P12", "VDD_CORE11"],
  pin221: ["P14", "VDD_CORE12"],
  pin222: ["P15", "VSS55"],
  pin223: ["P16", "VDDS_WKUP"],
  pin224: ["P22", "GPMC0_BE1n"],
  pin225: ["P23", "GPMC0_BE0n_CLE"],
  pin226: ["R1", "VSS56"],
  pin227: ["R2", "DDR0_A6"],
  pin228: ["R8", "VSS57"],
  pin229: ["R9", "VDD_CORE13"],
  pin230: ["R11", "VDD_CORE14"],
  pin231: ["R13", "VSS58"],
  pin232: ["R15", "VSS59"],
  pin233: ["R16", "VDDS_OSC0"],
  pin234: ["R22", "MMC2_DAT3"],
  pin235: ["R23", "MMC2_CLK"],
  pin236: ["T1", "DDR0_DQ10"],
  pin237: ["T2", "VSS60"],
  pin238: ["T3", "DDR0_DQ9"],
  pin239: ["T4", "DDR0_A8"],
  pin240: ["T5", "DDR0_A10"],
  pin241: ["T6", "DDR0_A11"],
  pin242: ["T7", "VSS61"],
  pin243: ["T8", "VSS62"],
  pin244: ["T10", "VDDSHV3"],
  pin245: ["T12", "VDDA_1P8_USB"],
  pin246: ["T14", "VDDS0"],
  pin247: ["T16", "CAP_VDDSHV_MMC"],
  pin248: ["T17", "VDD_RTC"],
  pin249: ["T18", "VDDS_RTC"],
  pin250: ["T19", "VSS63"],
  pin251: ["T20", "MMC2_SDCD"],
  pin252: ["T21", "MMC2_SDWP"],
  pin253: ["T22", "MMC2_DAT1"],
  pin254: ["T23", "MMC2_DAT2"],
  pin255: ["U1", "DDR0_DQ11"],
  pin256: ["U2", "DDR0_DQ14"],
  pin257: ["U4", "DDR0_DQ12"],
  pin258: ["U7", "VSS64"],
  pin259: ["U8", "VSS65"],
  pin260: ["U9", "CAP_VDDS_MMC1"],
  pin261: ["U10", "VSS66"],
  pin262: ["U11", "VDDA_CORE_USB"],
  pin263: ["U12", "VDDA_3P3_USB"],
  pin264: ["U13", "VSS67"],
  pin265: ["U14", "VSS68"],
  pin266: ["U15", "VSS69"],
  pin267: ["U16", "VDDA_3P3_SDIO"],
  pin268: ["U17", "VSS70"],
  pin269: ["U20", "VSS71"],
  pin270: ["U22", "MMC2_DAT0"],
  pin271: ["U23", "MMC2_CMD"],
  pin272: ["V1", "DDR0_DQS1"],
  pin273: ["V2", "DDR0_DQS1_n"],
  pin274: ["V3", "VSS72"],
  pin275: ["V4", "DDR0_DQ8"],
  pin276: ["V5", "DDR0_DQ13"],
  pin277: ["V6", "DDR0_A13"],
  pin278: ["V18", "VSS73"],
  pin279: ["V19", "VSS74"],
  pin280: ["V20", "ADC0_AIN0"],
  pin281: ["V21", "ADC0_AIN3"],
  pin282: ["V22", "ADC0_AIN1"],
  pin283: ["V23", "ADC0_AIN2"],
  pin284: ["W1", "DDR0_DQ15"],
  pin285: ["W2", "DDR0_DM1"],
  pin286: ["W6", "DDR0_A12"],
  pin287: ["W8", "RGMII1_RD3"],
  pin288: ["W9", "VSS75"],
  pin289: ["W10", "VSS76"],
  pin290: ["W11", "RGMII1_TXC"],
  pin291: ["W12", "VSS77"],
  pin292: ["W13", "RGMII1_TD1"],
  pin293: ["W14", "VSS78"],
  pin294: ["W15", "VSS79"],
  pin295: ["W16", "VSS80"],
  pin296: ["W18", "VSS81"],
  pin297: ["W22", "WKUP_UART0_RTSn"],
  pin298: ["W23", "WKUP_UART0_CTSn"],
  pin299: ["Y1", "VSS82"],
  pin300: ["Y2", "MMC1_CLK"],
  pin301: ["Y3", "MMC1_CMD"],
  pin302: ["Y4", "MMC1_DAT1"],
  pin303: ["Y6", "RGMII1_RX_CTL"],
  pin304: ["Y7", "RGMII1_RXC"],
  pin305: ["Y8", "RGMII1_RD0"],
  pin306: ["Y11", "RGMII1_TD2"],
  pin307: ["Y13", "RGMII2_TXC"],
  pin308: ["Y16", "EMU0"],
  pin309: ["Y17", "TMS"],
  pin310: ["Y18", "RTC_PORz"],
  pin311: ["Y20", "VSS83"],
  pin312: ["Y21", "VSS84"],
  pin313: ["Y22", "WKUP_UART0_RXD"],
  pin314: ["Y23", "WKUP_CLKOUT0"],
  pin315: ["AA1", "MMC1_DAT0"],
  pin316: ["AA2", "MMC1_DAT2"],
  pin317: ["AA4", "VSS85"],
  pin318: ["AA6", "RGMII1_RD1"],
  pin319: ["AA8", "RGMII1_RD2"],
  pin320: ["AA11", "RGMII1_TD3"],
  pin321: ["AA12", "RGMII2_TD2"],
  pin322: ["AA13", "RGMII2_TD3"],
  pin323: ["AA16", "EMU1"],
  pin324: ["AA18", "PMIC_LPM_EN0"],
  pin325: ["AA20", "VSS86"],
  pin326: ["AA22", "WKUP_I2C0_SDA"],
  pin327: ["AA23", "WKUP_UART0_TXD"],
  pin328: ["AB1", "VSS87"],
  pin329: ["AB2", "MMC1_DAT3"],
  pin330: ["AB3", "USB0_RCALIB"],
  pin331: ["AB4", "USB0_DP"],
  pin332: ["AB5", "USB1_DP"],
  pin333: ["AB6", "USB1_VBUS"],
  pin334: ["AB7", "VSS88"],
  pin335: ["AB8", "RGMII2_RD3"],
  pin336: ["AB9", "RGMII2_RD0"],
  pin337: ["AB10", "RGMII2_RD2"],
  pin338: ["AB11", "RGMII1_TX_CTL"],
  pin339: ["AB12", "RGMII2_TX_CTL"],
  pin340: ["AB13", "RGMII2_TD1"],
  pin341: ["AB14", "TCK"],
  pin342: ["AB15", "TDO"],
  pin343: ["AB16", "TRSTn"],
  pin344: ["AB17", "RSVD0"],
  pin345: ["AB18", "PORz"],
  pin346: ["AB19", "EXT_WAKEUP0"],
  pin347: ["AB20", "EXT_WAKEUP1"],
  pin348: ["AB21", "VSS89"],
  pin349: ["AB22", "WKUP_I2C0_SCL"],
  pin350: ["AB23", "VSS90"],
  pin351: ["AC1", "VSS91"],
  pin352: ["AC2", "VSS92"],
  pin353: ["AC3", "USB0_VBUS"],
  pin354: ["AC4", "USB0_DM"],
  pin355: ["AC5", "USB1_DM"],
  pin356: ["AC6", "USB1_RCALIB"],
  pin357: ["AC7", "RGMII2_RXC"],
  pin358: ["AC8", "RGMII2_RX_CTL"],
  pin359: ["AC9", "RGMII2_RD1"],
  pin360: ["AC10", "RGMII1_TD0"],
  pin361: ["AC11", "VSS93"],
  pin362: ["AC12", "RGMII2_TD0"],
  pin363: ["AC13", "MDIO0_MDIO"],
  pin364: ["AC14", "VSS94"],
  pin365: ["AC15", "MDIO0_MDC"],
  pin366: ["AC16", "TDI"],
  pin367: ["AC17", "WKUP_OSC0_XO"],
  pin368: ["AC18", "WKUP_OSC0_XI"],
  pin369: ["AC19", "VSS95"],
  pin370: ["AC20", "LFOSC0_XO"],
  pin371: ["AC21", "LFOSC0_XI"],
  pin372: ["AC22", "VSS96"],
  pin373: ["AC23", "VSS97"],
} as const;

export const AM62L32BOGHAANBR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      manufacturerPartNumber="AM62L32BOGHAANBR"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin1"]}
            pcbX="-5.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="-4.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="-4mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="-3.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="-3mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="-2.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="-2mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX="-1.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin10"]}
            pcbX="-1mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin11"]}
            pcbX="-0.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin12"]}
            pcbX="0mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin13"]}
            pcbX="0.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin14"]}
            pcbX="1mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin15"]}
            pcbX="1.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin16"]}
            pcbX="2mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin17"]}
            pcbX="2.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin18"]}
            pcbX="3mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin19"]}
            pcbX="3.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin20"]}
            pcbX="4mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin21"]}
            pcbX="4.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin22"]}
            pcbX="5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin23"]}
            pcbX="5.5mm"
            pcbY="5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin24"]}
            pcbX="-5.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin25"]}
            pcbX="-5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin26"]}
            pcbX="-4.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin27"]}
            pcbX="-4mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin28"]}
            pcbX="-3.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin29"]}
            pcbX="-3mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin30"]}
            pcbX="-2.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin31"]}
            pcbX="-2mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin32"]}
            pcbX="-1.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin33"]}
            pcbX="-1mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin34"]}
            pcbX="-0.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin35"]}
            pcbX="0mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin36"]}
            pcbX="0.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin37"]}
            pcbX="1mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin38"]}
            pcbX="1.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin39"]}
            pcbX="2mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin40"]}
            pcbX="2.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin41"]}
            pcbX="3mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin42"]}
            pcbX="3.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin43"]}
            pcbX="4mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin44"]}
            pcbX="4.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin45"]}
            pcbX="5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin46"]}
            pcbX="5.5mm"
            pcbY="5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin47"]}
            pcbX="-5.5mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin48"]}
            pcbX="-5mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin49"]}
            pcbX="-4mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin50"]}
            pcbX="-3mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin51"]}
            pcbX="-2mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin52"]}
            pcbX="-0.5mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin53"]}
            pcbX="0mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin54"]}
            pcbX="0.5mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin55"]}
            pcbX="2mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin56"]}
            pcbX="3mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin57"]}
            pcbX="4mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin58"]}
            pcbX="5mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin59"]}
            pcbX="5.5mm"
            pcbY="4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin60"]}
            pcbX="-5.5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin61"]}
            pcbX="-5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin62"]}
            pcbX="-4.5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin63"]}
            pcbX="-4mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin64"]}
            pcbX="-3mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin65"]}
            pcbX="-2.5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin66"]}
            pcbX="-2mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin67"]}
            pcbX="-0.5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin68"]}
            pcbX="0.5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin69"]}
            pcbX="2mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin70"]}
            pcbX="2.5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin71"]}
            pcbX="3mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin72"]}
            pcbX="4mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin73"]}
            pcbX="4.5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin74"]}
            pcbX="5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin75"]}
            pcbX="5.5mm"
            pcbY="4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin76"]}
            pcbX="-5.5mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin77"]}
            pcbX="-5mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin78"]}
            pcbX="-3mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin79"]}
            pcbX="-2mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin80"]}
            pcbX="-1.5mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin81"]}
            pcbX="-1mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin82"]}
            pcbX="-0.5mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin83"]}
            pcbX="0mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin84"]}
            pcbX="0.5mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin85"]}
            pcbX="1mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin86"]}
            pcbX="1.5mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin87"]}
            pcbX="2mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin88"]}
            pcbX="3mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin89"]}
            pcbX="5mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin90"]}
            pcbX="5.5mm"
            pcbY="3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin91"]}
            pcbX="-5.5mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin92"]}
            pcbX="-5mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin93"]}
            pcbX="-4.5mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin94"]}
            pcbX="-4mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin95"]}
            pcbX="-3.5mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin96"]}
            pcbX="-3mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin97"]}
            pcbX="3mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin98"]}
            pcbX="3.5mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin99"]}
            pcbX="4mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin100"]}
            pcbX="4.5mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin101"]}
            pcbX="5mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin102"]}
            pcbX="5.5mm"
            pcbY="3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin103"]}
            pcbX="-5.5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin104"]}
            pcbX="-5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin105"]}
            pcbX="-4mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin106"]}
            pcbX="-2.5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin107"]}
            pcbX="-2mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin108"]}
            pcbX="-1.5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin109"]}
            pcbX="-1mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin110"]}
            pcbX="-0.5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin111"]}
            pcbX="0mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin112"]}
            pcbX="0.5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin113"]}
            pcbX="1mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin114"]}
            pcbX="1.5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin115"]}
            pcbX="2mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin116"]}
            pcbX="2.5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin117"]}
            pcbX="4mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin118"]}
            pcbX="5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin119"]}
            pcbX="5.5mm"
            pcbY="2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin120"]}
            pcbX="-5.5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin121"]}
            pcbX="-5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin122"]}
            pcbX="-4.5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin123"]}
            pcbX="-4mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin124"]}
            pcbX="-3.5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin125"]}
            pcbX="-3mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin126"]}
            pcbX="-2.5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin127"]}
            pcbX="-2mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin128"]}
            pcbX="-1mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin129"]}
            pcbX="0mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin130"]}
            pcbX="1mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin131"]}
            pcbX="2mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin132"]}
            pcbX="2.5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin133"]}
            pcbX="3mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin134"]}
            pcbX="3.5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin135"]}
            pcbX="4mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin136"]}
            pcbX="4.5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin137"]}
            pcbX="5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin138"]}
            pcbX="5.5mm"
            pcbY="2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin139"]}
            pcbX="-5.5mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin140"]}
            pcbX="-5mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin141"]}
            pcbX="-2mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin142"]}
            pcbX="-1.5mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin143"]}
            pcbX="-0.5mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin144"]}
            pcbX="0.5mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin145"]}
            pcbX="1.5mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin146"]}
            pcbX="2mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin147"]}
            pcbX="5mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin148"]}
            pcbX="5.5mm"
            pcbY="1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin149"]}
            pcbX="-5.5mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin150"]}
            pcbX="-5mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin151"]}
            pcbX="-2mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin152"]}
            pcbX="-1.5mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin153"]}
            pcbX="-1mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin154"]}
            pcbX="0mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin155"]}
            pcbX="1mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin156"]}
            pcbX="1.5mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin157"]}
            pcbX="2mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin158"]}
            pcbX="5mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin159"]}
            pcbX="5.5mm"
            pcbY="1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin160"]}
            pcbX="-5.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin161"]}
            pcbX="-5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin162"]}
            pcbX="-4.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin163"]}
            pcbX="-4mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin164"]}
            pcbX="-3.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin165"]}
            pcbX="-3mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin166"]}
            pcbX="-2.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin167"]}
            pcbX="-2mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin168"]}
            pcbX="-1.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin169"]}
            pcbX="-0.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin170"]}
            pcbX="0.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin171"]}
            pcbX="1.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin172"]}
            pcbX="2mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin173"]}
            pcbX="2.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin174"]}
            pcbX="3mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin175"]}
            pcbX="3.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin176"]}
            pcbX="4mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin177"]}
            pcbX="4.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin178"]}
            pcbX="5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin179"]}
            pcbX="5.5mm"
            pcbY="0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin180"]}
            pcbX="-5.5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin181"]}
            pcbX="-5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin182"]}
            pcbX="-4.5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin183"]}
            pcbX="-3.5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin184"]}
            pcbX="-2.5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin185"]}
            pcbX="-2mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin186"]}
            pcbX="-1mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin187"]}
            pcbX="0mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin188"]}
            pcbX="1mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin189"]}
            pcbX="2mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin190"]}
            pcbX="2.5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin191"]}
            pcbX="3.5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin192"]}
            pcbX="4.5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin193"]}
            pcbX="5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin194"]}
            pcbX="5.5mm"
            pcbY="0mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin195"]}
            pcbX="-5.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin196"]}
            pcbX="-5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin197"]}
            pcbX="-4.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin198"]}
            pcbX="-4mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin199"]}
            pcbX="-3.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin200"]}
            pcbX="-3mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin201"]}
            pcbX="-2.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin202"]}
            pcbX="-2mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin203"]}
            pcbX="-1.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin204"]}
            pcbX="-0.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin205"]}
            pcbX="0.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin206"]}
            pcbX="1.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin207"]}
            pcbX="2mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin208"]}
            pcbX="2.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin209"]}
            pcbX="3mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin210"]}
            pcbX="3.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin211"]}
            pcbX="4mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin212"]}
            pcbX="4.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin213"]}
            pcbX="5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin214"]}
            pcbX="5.5mm"
            pcbY="-0.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin215"]}
            pcbX="-5.5mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin216"]}
            pcbX="-5mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin217"]}
            pcbX="-2mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin218"]}
            pcbX="-1.5mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin219"]}
            pcbX="-1mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin220"]}
            pcbX="0mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin221"]}
            pcbX="1mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin222"]}
            pcbX="1.5mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin223"]}
            pcbX="2mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin224"]}
            pcbX="5mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin225"]}
            pcbX="5.5mm"
            pcbY="-1mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin226"]}
            pcbX="-5.5mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin227"]}
            pcbX="-5mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin228"]}
            pcbX="-2mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin229"]}
            pcbX="-1.5mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin230"]}
            pcbX="-0.5mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin231"]}
            pcbX="0.5mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin232"]}
            pcbX="1.5mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin233"]}
            pcbX="2mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin234"]}
            pcbX="5mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin235"]}
            pcbX="5.5mm"
            pcbY="-1.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin236"]}
            pcbX="-5.5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin237"]}
            pcbX="-5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin238"]}
            pcbX="-4.5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin239"]}
            pcbX="-4mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin240"]}
            pcbX="-3.5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin241"]}
            pcbX="-3mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin242"]}
            pcbX="-2.5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin243"]}
            pcbX="-2mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin244"]}
            pcbX="-1mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin245"]}
            pcbX="0mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin246"]}
            pcbX="1mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin247"]}
            pcbX="2mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin248"]}
            pcbX="2.5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin249"]}
            pcbX="3mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin250"]}
            pcbX="3.5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin251"]}
            pcbX="4mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin252"]}
            pcbX="4.5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin253"]}
            pcbX="5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin254"]}
            pcbX="5.5mm"
            pcbY="-2mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin255"]}
            pcbX="-5.5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin256"]}
            pcbX="-5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin257"]}
            pcbX="-4mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin258"]}
            pcbX="-2.5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin259"]}
            pcbX="-2mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin260"]}
            pcbX="-1.5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin261"]}
            pcbX="-1mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin262"]}
            pcbX="-0.5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin263"]}
            pcbX="0mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin264"]}
            pcbX="0.5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin265"]}
            pcbX="1mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin266"]}
            pcbX="1.5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin267"]}
            pcbX="2mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin268"]}
            pcbX="2.5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin269"]}
            pcbX="4mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin270"]}
            pcbX="5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin271"]}
            pcbX="5.5mm"
            pcbY="-2.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin272"]}
            pcbX="-5.5mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin273"]}
            pcbX="-5mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin274"]}
            pcbX="-4.5mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin275"]}
            pcbX="-4mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin276"]}
            pcbX="-3.5mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin277"]}
            pcbX="-3mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin278"]}
            pcbX="3mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin279"]}
            pcbX="3.5mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin280"]}
            pcbX="4mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin281"]}
            pcbX="4.5mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin282"]}
            pcbX="5mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin283"]}
            pcbX="5.5mm"
            pcbY="-3mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin284"]}
            pcbX="-5.5mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin285"]}
            pcbX="-5mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin286"]}
            pcbX="-3mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin287"]}
            pcbX="-2mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin288"]}
            pcbX="-1.5mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin289"]}
            pcbX="-1mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin290"]}
            pcbX="-0.5mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin291"]}
            pcbX="0mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin292"]}
            pcbX="0.5mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin293"]}
            pcbX="1mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin294"]}
            pcbX="1.5mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin295"]}
            pcbX="2mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin296"]}
            pcbX="3mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin297"]}
            pcbX="5mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin298"]}
            pcbX="5.5mm"
            pcbY="-3.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin299"]}
            pcbX="-5.5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin300"]}
            pcbX="-5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin301"]}
            pcbX="-4.5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin302"]}
            pcbX="-4mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin303"]}
            pcbX="-3mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin304"]}
            pcbX="-2.5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin305"]}
            pcbX="-2mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin306"]}
            pcbX="-0.5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin307"]}
            pcbX="0.5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin308"]}
            pcbX="2mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin309"]}
            pcbX="2.5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin310"]}
            pcbX="3mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin311"]}
            pcbX="4mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin312"]}
            pcbX="4.5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin313"]}
            pcbX="5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin314"]}
            pcbX="5.5mm"
            pcbY="-4mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin315"]}
            pcbX="-5.5mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin316"]}
            pcbX="-5mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin317"]}
            pcbX="-4mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin318"]}
            pcbX="-3mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin319"]}
            pcbX="-2mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin320"]}
            pcbX="-0.5mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin321"]}
            pcbX="0mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin322"]}
            pcbX="0.5mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin323"]}
            pcbX="2mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin324"]}
            pcbX="3mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin325"]}
            pcbX="4mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin326"]}
            pcbX="5mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin327"]}
            pcbX="5.5mm"
            pcbY="-4.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin328"]}
            pcbX="-5.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin329"]}
            pcbX="-5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin330"]}
            pcbX="-4.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin331"]}
            pcbX="-4mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin332"]}
            pcbX="-3.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin333"]}
            pcbX="-3mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin334"]}
            pcbX="-2.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin335"]}
            pcbX="-2mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin336"]}
            pcbX="-1.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin337"]}
            pcbX="-1mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin338"]}
            pcbX="-0.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin339"]}
            pcbX="0mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin340"]}
            pcbX="0.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin341"]}
            pcbX="1mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin342"]}
            pcbX="1.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin343"]}
            pcbX="2mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin344"]}
            pcbX="2.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin345"]}
            pcbX="3mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin346"]}
            pcbX="3.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin347"]}
            pcbX="4mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin348"]}
            pcbX="4.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin349"]}
            pcbX="5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin350"]}
            pcbX="5.5mm"
            pcbY="-5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin351"]}
            pcbX="-5.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin352"]}
            pcbX="-5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin353"]}
            pcbX="-4.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin354"]}
            pcbX="-4mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin355"]}
            pcbX="-3.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin356"]}
            pcbX="-3mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin357"]}
            pcbX="-2.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin358"]}
            pcbX="-2mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin359"]}
            pcbX="-1.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin360"]}
            pcbX="-1mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin361"]}
            pcbX="-0.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin362"]}
            pcbX="0mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin363"]}
            pcbX="0.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin364"]}
            pcbX="1mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin365"]}
            pcbX="1.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin366"]}
            pcbX="2mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin367"]}
            pcbX="2.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin368"]}
            pcbX="3mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin369"]}
            pcbX="3.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin370"]}
            pcbX="4mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin371"]}
            pcbX="4.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin372"]}
            pcbX="5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <smtpad
            portHints={["pin373"]}
            pcbX="5.5mm"
            pcbY="-5.5mm"
            {...tiAm62lBgaLandProps}
            shape="circle"
          />
          <silkscreenpath
            route={[
              { x: -5.95, y: 5.95 },
              { x: 5.95, y: 5.95 },
              { x: 5.95, y: -5.95 },
              { x: -5.95, y: -5.95 },
              { x: -5.95, y: 5.95 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -6.3, y: 5.5 },
              { x: -6.3201, y: 5.575 },
              { x: -6.375, y: 5.6299 },
              { x: -6.45, y: 5.65 },
              { x: -6.525, y: 5.6299 },
              { x: -6.5799, y: 5.575 },
              { x: -6.6, y: 5.5 },
              { x: -6.5799, y: 5.425 },
              { x: -6.525, y: 5.3701 },
              { x: -6.45, y: 5.35 },
              { x: -6.375, y: 5.3701 },
              { x: -6.3201, y: 5.425 },
              { x: -6.3, y: 5.5 },
            ]}
          />
          <silkscreentext
            text="{NAME}"
            pcbX="0mm"
            pcbY="6.8mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -6.2, y: 6.2 },
              { x: 6.2, y: 6.2 },
              { x: 6.2, y: -6.2 },
              { x: -6.2, y: -6.2 },
              { x: -6.2, y: 6.2 },
            ]}
          />
        </footprint>
      }
      {...props}
    />
  );
};
