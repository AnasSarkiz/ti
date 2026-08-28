import type { ChipProps, PinAttributeMap } from "@tscircuit/props";

const pinLabels = {
  pin1: ["PA0", "GPIO_PA0"],
  pin2: ["PA1", "GPIO_PA1"],
  pin3: "NRST",
  pin4: "VDD",
  pin5: "VSS",
  pin6: ["PA2_ROSC", "PA2", "GPIO_PA2", "ROSC"],
  pin7: ["PA3", "GPIO_PA3"],
  pin8: ["PA4", "GPIO_PA4"],
  pin9: ["PA5", "GPIO_PA5"],
  pin10: ["PA6", "GPIO_PA6"],
  pin11: ["PA7", "GPIO_PA7"],
  pin12: ["PA8", "GPIO_PA8"],
  pin13: ["PA9", "GPIO_PA9"],
  pin14: ["PA10", "GPIO_PA10"],
  pin15: ["PA11", "GPIO_PA11"],
  pin16: ["PA12", "GPIO_PA12"],
  pin17: ["PA13", "GPIO_PA13"],
  pin18: ["PA14", "GPIO_PA14"],
  pin19: ["PA15", "GPIO_PA15", "ADC0_IN9", "A9"],
  pin20: ["PA16", "GPIO_PA16", "ADC0_IN8", "A8", "OPA1_OUT"],
  pin21: ["PA17", "GPIO_PA17", "OPA1_IN1_N"],
  pin22: ["PA18", "GPIO_PA18", "ADC0_IN7", "A7", "OPA1_IN0_P", "GPAMP_IN_N"],
  pin23: ["SWDIO", "PA19", "GPIO_PA19"],
  pin24: ["SWCLK", "PA20", "GPIO_PA20", "ADC0_IN6", "A6", "COMP0_IN1_P"],
  pin25: ["PA21", "GPIO_PA21", "ADC0_IN5", "A5", "VREF_N"],
  pin26: ["PA22", "GPIO_PA22", "ADC0_IN4", "A4", "GPAMP_OUT", "OPA0_OUT"],
  pin27: ["PA23", "GPIO_PA23", "VREF_P", "COMP0_IN1_N"],
  pin28: ["PA24", "GPIO_PA24", "ADC0_IN3", "A3", "OPA0_IN1_N", "OPA0_IN0_N"],
  pin29: ["PA25", "GPIO_PA25", "ADC0_IN2", "A2", "OPA0_IN0_P"],
  pin30: ["PA26", "GPIO_PA26", "ADC0_IN1", "A1", "GPAMP_IN_P", "COMP0_IN0_P"],
  pin31: ["PA27", "GPIO_PA27", "ADC0_IN0", "A0", "COMP0_IN0_N"],
  pin32: "VCORE",
  pin33: ["EP", "QFN_PAD", "VSS_PAD", "thermalpad"],
} as const;

const gpioAttributes = { isGpio: true } as const;

const pinAttributes = {
  pin1: {
    ...gpioAttributes,
    capabilities: ["i2c_sda"],
    activeCapability: "i2c_sda",
    needsExternalPullup: true,
  },
  pin2: {
    ...gpioAttributes,
    capabilities: ["i2c_scl"],
    activeCapability: "i2c_scl",
    needsExternalPullup: true,
  },
  pin3: { mustBeConnected: true, canUseInternalPullup: true },
  pin4: {
    requiresPower: true,
    mustBeConnected: true,
    shouldHaveDecouplingCapacitor: true,
    recommendedDecouplingCapacitorCapacitance: "0.1uF",
  },
  pin5: { requiresGround: true, mustBeConnected: true },
  pin6: {
    ...gpioAttributes,
    capabilities: ["spi_cs"],
    activeCapability: "spi_cs",
  },
  pin7: gpioAttributes,
  pin8: {
    ...gpioAttributes,
    capabilities: ["spi_miso"],
    activeCapability: "spi_miso",
  },
  pin9: {
    ...gpioAttributes,
    capabilities: ["spi_mosi"],
    activeCapability: "spi_mosi",
  },
  pin10: {
    ...gpioAttributes,
    capabilities: ["spi_sck"],
    activeCapability: "spi_sck",
  },
  pin11: gpioAttributes,
  pin12: {
    ...gpioAttributes,
    capabilities: ["uart_rx"],
    activeCapability: "uart_rx",
  },
  pin13: {
    ...gpioAttributes,
    capabilities: ["uart_tx"],
    activeCapability: "uart_tx",
  },
  pin14: gpioAttributes,
  pin15: gpioAttributes,
  pin16: gpioAttributes,
  pin17: gpioAttributes,
  pin18: gpioAttributes,
  pin19: gpioAttributes,
  pin20: gpioAttributes,
  pin21: gpioAttributes,
  pin22: gpioAttributes,
  pin23: { ...gpioAttributes, includeInBoardPinout: true },
  pin24: { ...gpioAttributes, includeInBoardPinout: true },
  pin25: gpioAttributes,
  pin26: gpioAttributes,
  pin27: gpioAttributes,
  pin28: gpioAttributes,
  pin29: gpioAttributes,
  pin30: gpioAttributes,
  pin31: gpioAttributes,
  pin32: {
    providesPower: true,
    mustBeConnected: true,
    shouldHaveDecouplingCapacitor: true,
    recommendedDecouplingCapacitorCapacitance: "0.47uF",
  },
  pin33: { requiresGround: true, mustBeConnected: true },
} satisfies Record<string, PinAttributeMap>;

export const MSPM0L1306SRHBR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
        jlcpcb: ["C19189324"],
      }}
      manufacturerPartNumber="MSPM0L1306SRHBR"
      datasheetUrl="https://www.ti.com/lit/ds/symlink/mspm0l1306.pdf"
      schWidth="5mm"
      schHeight="5.3mm"
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: ["VDD", "VSS", "VCORE", "NRST"],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["PA2", "PA0", "PA1", "SWDIO", "SWCLK"],
        },
      }}
      schPinStyle={{
        VDD: { marginTop: -0.5 },
        VSS: { marginTop: 1.2 },
        VCORE: { marginTop: 0.3 },
        NRST: { marginTop: 1.5 },
        PA2: { marginTop: 0.4 },
        PA0: { marginTop: 1.9 },
        PA1: { marginTop: 0.3 },
        SWDIO: { marginTop: 1.2 },
        SWCLK: { marginTop: 0.3 },
      }}
      footprint={
        <footprint>
          <smtpad
            portHints={["pin32"]}
            pcbX="-1.75006mm"
            pcbY="2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin31"]}
            pcbX="-1.250188mm"
            pcbY="2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin30"]}
            pcbX="-0.750062mm"
            pcbY="2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin29"]}
            pcbX="-0.25019mm"
            pcbY="2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin28"]}
            pcbX="0.249936mm"
            pcbY="2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin27"]}
            pcbX="0.749808mm"
            pcbY="2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin26"]}
            pcbX="1.249934mm"
            pcbY="2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin25"]}
            pcbX="1.749806mm"
            pcbY="2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin24"]}
            pcbX="2.400046mm"
            pcbY="1.749806mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin23"]}
            pcbX="2.400046mm"
            pcbY="1.249934mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin22"]}
            pcbX="2.400046mm"
            pcbY="0.749808mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin21"]}
            pcbX="2.400046mm"
            pcbY="0.249936mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin20"]}
            pcbX="2.400046mm"
            pcbY="-0.25019mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin19"]}
            pcbX="2.400046mm"
            pcbY="-0.750062mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin18"]}
            pcbX="2.400046mm"
            pcbY="-1.250188mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin17"]}
            pcbX="2.400046mm"
            pcbY="-1.75006mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin16"]}
            pcbX="1.749806mm"
            pcbY="-2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin15"]}
            pcbX="1.249934mm"
            pcbY="-2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin14"]}
            pcbX="0.749808mm"
            pcbY="-2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin13"]}
            pcbX="0.249936mm"
            pcbY="-2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin12"]}
            pcbX="-0.25019mm"
            pcbY="-2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin11"]}
            pcbX="-0.750062mm"
            pcbY="-2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin10"]}
            pcbX="-1.250188mm"
            pcbY="-2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX="-1.75006mm"
            pcbY="-2.400046mm"
            width="0.2800096mm"
            height="0.7999984mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="-2.400046mm"
            pcbY="-1.75006mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="-2.400046mm"
            pcbY="-1.250188mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="-2.400046mm"
            pcbY="-0.750062mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="-2.400046mm"
            pcbY="-0.25019mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="-2.400046mm"
            pcbY="0.249936mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="-2.400046mm"
            pcbY="0.749808mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-2.400046mm"
            pcbY="1.249934mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin1"]}
            pcbX="-2.400046mm"
            pcbY="1.749806mm"
            width="0.7999984mm"
            height="0.2800096mm"
            radius="0.1400048mm"
            shape="pill"
          />
          <smtpad
            portHints={["pin33"]}
            pcbX="-0.000254mm"
            pcbY="0mm"
            width="3.4500058mm"
            height="3.4500058mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: 2.0999704000001884, y: -2.5000457999999526 },
              { x: 2.499969600000213, y: -2.5000457999999526 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 2.499969600000213, y: -2.100046599999928 },
              { x: 2.499969600000213, y: -2.5000457999999526 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -2.100021199999901, y: -2.5000457999999526 },
              { x: -2.500020399999812, y: -2.5000457999999526 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -2.500020399999812, y: -2.100046599999928 },
              { x: -2.500020399999812, y: -2.5000457999999526 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -2.500020399999812, y: 2.099945000000048 },
              { x: -2.500020399999812, y: 2.499944199999959 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -2.100021199999901, y: 2.499944199999959 },
              { x: -2.500020399999812, y: 2.499944199999959 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 2.4999442000001864, y: 2.099945000000048 },
              { x: 2.499969600000213, y: 2.499944199999959 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 2.0999704000001884, y: 2.499944199999959 },
              { x: 2.499969600000213, y: 2.499944199999959 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -3.1747459999998, y: 1.77800000000002 },
              { x: -3.1790820749013164, y: 1.7450642412346724 },
              { x: -3.1917948032667027, y: 1.7143730000000232 },
              { x: -3.2120178336667777, y: 1.6880178336668905 },
              { x: -3.2383729999997968, y: 1.6677948032669292 },
              { x: -3.269064241234446, y: 1.6550820749014292 },
              { x: -3.3019999999999072, y: 1.6507459999999128 },
              { x: -3.3349357587653685, y: 1.6550820749014292 },
              { x: -3.365626999999904, y: 1.6677948032669292 },
              { x: -3.3919821663330367, y: 1.6880178336668905 },
              { x: -3.412205196732998, y: 1.7143730000000232 },
              { x: -3.424917925098498, y: 1.7450642412346724 },
              { x: -3.4292540000000145, y: 1.77800000000002 },
              { x: -3.424917925098498, y: 1.8109357587653676 },
              { x: -3.412205196732998, y: 1.8416270000000168 },
              { x: -3.3919821663330367, y: 1.8679821663331495 },
              { x: -3.365626999999904, y: 1.8882051967332245 },
              { x: -3.3349357587653685, y: 1.9009179250986108 },
              { x: -3.3019999999999072, y: 1.9052540000001272 },
              { x: -3.269064241234446, y: 1.9009179250986108 },
              { x: -3.2383729999997968, y: 1.8882051967332245 },
              { x: -3.2120178336667777, y: 1.8679821663331495 },
              { x: -3.1917948032667027, y: 1.8416270000000168 },
              { x: -3.1790820749013164, y: 1.8109357587653676 },
              { x: -3.1747459999998, y: 1.77800000000002 },
            ]}
          />
          <silkscreentext
            text="{NAME}"
            pcbX="-0.328422mm"
            pcbY="3.804922mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -3.6899219999997968, y: 3.0549219999999195 },
              { x: 3.0330780000001596, y: 3.0549219999999195 },
              { x: 3.0330780000001596, y: -3.033078000000046 },
              { x: -3.6899219999997968, y: -3.033078000000046 },
              { x: -3.6899219999997968, y: 3.0549219999999195 },
            ]}
          />
        </footprint>
      }
      {...props}
    />
  );
};
