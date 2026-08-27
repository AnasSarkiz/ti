import type {
  PortDefinition,
  PortSignal,
  SignalDirection,
  SubcircuitDefinition,
  VoltageRequirement,
} from "./types";

const TI_PACKAGE = "@tsci/tscircuit.ti";
const SOURCE_ROOT = "lib/subcircuits";

const signal = (
  name: string,
  direction: SignalDirection,
  selectors: readonly string[],
  required = true,
): PortSignal => ({ name, direction, selectors, required });

const powerPort = ({
  id,
  label,
  role,
  voltage,
  positive,
  ground,
  allowMultiple,
}: {
  id: string;
  label: string;
  role: "provider" | "consumer";
  voltage: VoltageRequirement;
  positive: readonly string[];
  ground: readonly string[];
  allowMultiple?: boolean;
}): PortDefinition => ({
  id,
  label,
  kind: "power",
  role,
  protocol: "power",
  voltage,
  allowMultiple,
  requiredSignals: ["positive", "ground"],
  signals: [
    signal("positive", role === "provider" ? "output" : "input", positive),
    signal("ground", "passive", ground),
  ],
});

const adapter = (
  definition: Omit<SubcircuitDefinition, "importPath" | "sourcePath"> & {
    sourceFile: string;
  },
): SubcircuitDefinition => {
  const { sourceFile, ...rest } = definition;
  return {
    ...rest,
    importPath: TI_PACKAGE,
    sourcePath: `${SOURCE_ROOT}/${sourceFile}`,
    canInstantiate: definition.canInstantiate ?? true,
  };
};

/**
 * Hand-authored electrical metadata for subcircuits whose interfaces are known.
 * All other repository subcircuits are still discovered by catalog.ts, but have
 * no automatic ports until an adapter is added here.
 */
export const CURATED_SUBCIRCUIT_ADAPTERS: readonly SubcircuitDefinition[] = [
  adapter({
    id: "battery-management-bq24074",
    title: "BQ24074 Battery Management",
    description: "Single-cell charger and power-path system rail.",
    category: "Power",
    componentName: "BatteryManagement_BQ24074",
    sourceFile: "BatteryManagement_BQ24074.circuit.tsx",
    tags: ["battery", "charger", "power-path"],
    ports: [
      powerPort({
        id: "system-power-out",
        label: "System Power",
        role: "provider",
        voltage: { min: 3, max: 4.4, nominal: 3.7 },
        positive: [".U1 > .OUT"],
        ground: [".U1 > .VSS"],
        allowMultiple: true,
      }),
    ],
  }),
  adapter({
    id: "battery-management-2to4-cell-bq40z60",
    title: "BQ40Z60 2-to-4-Cell Battery Management",
    description:
      "Multi-cell battery manager with a protected pack rail and SMBus monitoring.",
    category: "Power",
    componentName: "BatteryManagement_2to4Cell_BQ40Z60",
    sourceFile: "BatteryManagement_2to4Cell_BQ40Z60.circuit.tsx",
    tags: ["battery", "battery-management", "fuel-gauge", "i2c", "smbus"],
    ports: [
      powerPort({
        id: "battery-pack-out",
        label: "Battery Pack",
        role: "provider",
        voltage: { min: 6, max: 17.6, nominal: 14.8 },
        positive: [".C2 > .pin2"],
        ground: [".C3 > .pin2"],
      }),
      {
        id: "smbus",
        label: "Battery SMBus",
        kind: "data",
        role: "device",
        protocol: "i2c",
        requiredSignals: ["scl", "sda"],
        signals: [
          signal("scl", "input", [".U2 > .pin17"]),
          signal("sda", "bidirectional", [".U2 > .pin16"]),
        ],
      },
    ],
  }),
  adapter({
    id: "battery-charging-2to5-cell-bq25731",
    title: "BQ25731 2-to-5-Cell Buck-Boost Charger",
    description:
      "NVDC battery charger with a shared power-bank system rail and I2C control.",
    category: "Power",
    componentName: "BatteryCharging_2to5CellNVDCBuckBoost_BQ25731",
    sourceFile: "BatteryCharging_2to5CellNVDCBuckBoost_BQ25731.circuit.tsx",
    tags: ["battery", "charger", "buck-boost", "i2c", "power-path"],
    ports: [
      powerPort({
        id: "battery-pack-in",
        label: "Battery Pack",
        role: "consumer",
        voltage: { min: 1.024, max: 23, nominal: 14.8 },
        positive: [".C31 > .pin1"],
        ground: [".U1 > .pin27"],
      }),
      powerPort({
        id: "system-power-out",
        label: "Power-Bank System Rail",
        role: "provider",
        voltage: { min: 3, max: 4.4, nominal: 3.7 },
        positive: [".C31 > .pin2"],
        ground: [".U1 > .pin27"],
        allowMultiple: true,
      }),
      {
        id: "i2c",
        label: "Charger I2C",
        kind: "data",
        role: "device",
        protocol: "i2c",
        requiredSignals: ["scl", "sda"],
        signals: [
          signal("scl", "input", [".U1 > .pin13"]),
          signal("sda", "bidirectional", [".U1 > .pin12"]),
        ],
      },
    ],
  }),
  adapter({
    id: "boost-converter-tps61236",
    title: "TPS61236 3 V Boost Converter",
    description:
      "Power-bank system regulator with MCU-controlled VCUR and VCOM switches.",
    category: "Power",
    componentName: "BoostConverter_TPS61236",
    sourceFile: "BoostConverter_TPS61236.circuit.tsx",
    tags: ["boost", "3v", "power-bank", "gpio"],
    ports: [
      powerPort({
        id: "power-in",
        label: "Power Input",
        role: "consumer",
        voltage: { min: 2.3, max: 5.5, nominal: 3.7 },
        positive: [".J1 > .pin1"],
        ground: [".C2 > .pin2"],
      }),
      powerPort({
        id: "power-3v-out",
        label: "3 V System Power",
        role: "provider",
        voltage: 3,
        positive: [".C2 > .pin1"],
        ground: [".C2 > .pin2"],
        allowMultiple: true,
      }),
      {
        id: "power-control",
        label: "Power Control",
        kind: "data",
        role: "peripheral",
        protocol: "gpio",
        requiredSignals: ["vcur", "vcom"],
        signals: [
          signal("vcur", "input", [".Q2 > .gate"]),
          signal("vcom", "input", [".Q1 > .gate"]),
        ],
      },
    ],
  }),
  adapter({
    id: "microcontroller-msp430g2332",
    title: "MSP430G2332 Power-Bank Microcontroller",
    description:
      "Power-bank host controller with shared I2C and regulator control GPIOs.",
    category: "Processors",
    componentName: "Microcontroller_MSP430G2332",
    sourceFile: "Microcontroller_MSP430G2332.circuit.tsx",
    tags: ["msp430", "mcu", "i2c", "gpio", "power-bank"],
    ports: [
      powerPort({
        id: "power-in",
        label: "MCU Power",
        role: "consumer",
        voltage: { min: 2.2, max: 5.5, nominal: 3 },
        positive: [".U2 > .pin6"],
        ground: [".U4 > .pin20"],
      }),
      {
        id: "i2c",
        label: "Power Management I2C",
        kind: "data",
        role: "host",
        protocol: "i2c",
        requiredSignals: ["scl", "sda"],
        allowMultiple: true,
        signals: [
          signal("scl", "output", [".U4 > .pin14"]),
          signal("sda", "bidirectional", [".U4 > .pin15"]),
        ],
      },
      {
        id: "power-control",
        label: "Boost Converter Control",
        kind: "data",
        role: "controller",
        protocol: "gpio",
        requiredSignals: ["vcur", "vcom"],
        signals: [
          signal("vcur", "output", [".U4 > .pin12"]),
          signal("vcom", "output", [".U4 > .pin13"]),
        ],
      },
    ],
  }),
  adapter({
    id: "usb-c-power-delivery-tps61288",
    title: "TPS61288 USB-C Programmable Power Supply",
    description:
      "Dual-phase boost supply for the power bank's programmable USB-C output.",
    category: "Power",
    componentName: "USBC_PowerDeliveryProgrammablePowerSupply_TPS61288",
    sourceFile:
      "USBC_PowerDeliveryProgrammablePowerSupply_TPS61288.circuit.tsx",
    tags: ["usb-c", "power-delivery", "boost", "programmable-power-supply"],
    ports: [
      powerPort({
        id: "power-in",
        label: "Power Input",
        role: "consumer",
        voltage: { min: 2.4, max: 18, nominal: 3.7 },
        positive: [".J1 > .pin1"],
        ground: [".C29 > .pin2"],
      }),
      powerPort({
        id: "usb-c-power-out",
        label: "Programmable USB-C Power",
        role: "provider",
        voltage: { min: 3, max: 18, nominal: 5 },
        positive: [".JOUT_P1 > .pin1"],
        ground: [".JOUT_P1 > .pin2"],
      }),
    ],
  }),
  adapter({
    id: "power-management-tps7a2018",
    title: "TPS7A2018 1.8 V LDO",
    description: "Always-on 1.8 V linear regulator.",
    category: "Power",
    componentName: "PowerManagement_TPS7A2018",
    sourceFile: "PowerManagement_TPS7A2018.circuit.tsx",
    tags: ["ldo", "1.8v"],
    ports: [
      powerPort({
        id: "power-in",
        label: "Power Input",
        role: "consumer",
        voltage: { min: 2, max: 6 },
        positive: [".U1 > .VIN", ".U1 > .VEN"],
        ground: [".U1 > .GND"],
      }),
      powerPort({
        id: "power-1v8-out",
        label: "1.8 V Power",
        role: "provider",
        voltage: 1.8,
        positive: [".U1 > .VOUT"],
        ground: [".U1 > .GND"],
        allowMultiple: true,
      }),
    ],
  }),
  adapter({
    id: "bluetooth-controller-cc2564c",
    title: "CC2564C Bluetooth Controller",
    description: "Dual-mode Bluetooth radio with HCI UART and PCM/I2S.",
    category: "Wireless",
    componentName: "BluetoothController_CC2564C",
    sourceFile: "BluetoothController_CC2564C.circuit.tsx",
    tags: ["bluetooth", "hci", "i2s"],
    ports: [
      powerPort({
        id: "radio-power",
        label: "Radio Power",
        role: "consumer",
        voltage: { min: 2.2, max: 4.8, nominal: 3.7 },
        positive: [".U1A > .MLDO_IN"],
        ground: [".U1A > .GND"],
      }),
      powerPort({
        id: "logic-power",
        label: "1.8 V Logic Power",
        role: "consumer",
        voltage: { min: 1.7, max: 1.95, nominal: 1.8 },
        positive: [".U1A > .VDD_IO", ".Y1 > .VCC"],
        ground: [".U1A > .GND"],
      }),
      {
        id: "hci",
        label: "HCI",
        kind: "data",
        role: "device",
        protocol: "hci-uart",
        requiredSignals: ["tx", "rx", "rts", "cts", "shutdown", "slow_clock"],
        signals: [
          signal("tx", "output", [".U1A > .HCI_TX"]),
          signal("rx", "input", [".U1A > .HCI_RX"]),
          signal("rts", "output", [".U1A > .HCI_RTS"]),
          signal("cts", "input", [".U1A > .HCI_CTS"]),
          signal("shutdown", "input", [".U1A > .N_SHUTD"]),
          signal("slow_clock", "input", [".U1A > .SLOW_CLK"]),
        ],
      },
      {
        id: "digital-audio-out",
        label: "I2S Audio",
        kind: "data",
        role: "source",
        protocol: "i2s",
        requiredSignals: ["bclk", "wclk", "data"],
        signals: [
          signal("bclk", "output", [".U1A > .AUD_CLK"]),
          signal("wclk", "output", [".U1A > .AUD_FSYNC"]),
          signal("data", "output", [".U1A > .AUD_OUT"]),
        ],
      },
    ],
  }),
  adapter({
    id: "bluetooth-audio-host-msp430f5229",
    title: "MSP430F5229 Bluetooth Audio Host",
    description: "Host MCU adapter matching the TI Bluetooth audio example.",
    category: "Processors",
    componentName: "BluetoothAudioHost_MSP430F5229",
    sourceFile: "BluetoothAudioHost_MSP430F5229.circuit.tsx",
    tags: ["msp430", "bluetooth", "host"],
    ports: [
      powerPort({
        id: "logic-power",
        label: "1.8 V Logic Power",
        role: "consumer",
        voltage: { min: 1.7, max: 1.95, nominal: 1.8 },
        positive: [".U10 > .DVIO", ".U10 > .DVCC"],
        ground: [".U10 > .DVSS"],
      }),
      {
        id: "hci",
        label: "HCI",
        kind: "data",
        role: "host",
        protocol: "hci-uart",
        requiredSignals: ["tx", "rx", "rts", "cts", "shutdown", "slow_clock"],
        signals: [
          signal("tx", "output", [".U10 > .UART_TXD"]),
          signal("rx", "input", [".U10 > .UART_RXD"]),
          signal("rts", "output", [".U10 > .P1_5"]),
          signal("cts", "input", [".U10 > .P1_4"]),
          signal("shutdown", "output", [".U10 > .P1_7"]),
          signal("slow_clock", "output", [".R10 > .pin2"]),
        ],
      },
      {
        id: "audio-control",
        label: "I2C Audio Control",
        kind: "data",
        role: "host",
        protocol: "i2c",
        requiredSignals: ["scl", "sda", "reset"],
        allowMultiple: true,
        signals: [
          signal("scl", "output", [".U10 > .I2C_SCL"]),
          signal("sda", "bidirectional", [".U10 > .I2C_SDA"]),
          signal("reset", "output", [".U10 > .P2_0"]),
        ],
      },
    ],
  }),
  adapter({
    id: "audio-amplifier-tas2505",
    title: "TAS2505 Audio Amplifier",
    description: "Mono speaker amplifier with I2C control and I2S input.",
    category: "Audio",
    componentName: "AudioAmplifier_TAS2505",
    sourceFile: "AudioAmplifier_TAS2505.circuit.tsx",
    tags: ["audio", "amplifier", "i2c", "i2s"],
    ports: [
      powerPort({
        id: "speaker-power",
        label: "Speaker Power",
        role: "consumer",
        voltage: { min: 2.7, max: 5.5, nominal: 3.7 },
        positive: [".U1 > .SPKVDD"],
        ground: [".U1 > .AVSS"],
      }),
      powerPort({
        id: "logic-power",
        label: "1.8 V Logic Power",
        role: "consumer",
        voltage: { min: 1.65, max: 1.95, nominal: 1.8 },
        positive: [".U1 > .AVDD", ".U1 > .DVDD", ".U1 > .IOVDD", ".R1 > .pin1"],
        ground: [".U1 > .AVSS"],
      }),
      {
        id: "control",
        label: "I2C Control",
        kind: "data",
        role: "device",
        protocol: "i2c",
        requiredSignals: ["scl", "sda", "reset"],
        signals: [
          signal("scl", "input", [".U1 > .SCL"]),
          signal("sda", "bidirectional", [".U1 > .SDA"]),
          signal("reset", "input", [".U1 > .N_RST"]),
        ],
      },
      {
        id: "digital-audio-in",
        label: "I2S Audio",
        kind: "data",
        role: "sink",
        protocol: "i2s",
        requiredSignals: ["bclk", "wclk", "data"],
        signals: [
          signal("bclk", "input", [".U1 > .BCLK", ".U1 > .MCLK"]),
          signal("wclk", "input", [".U1 > .WCLK"]),
          signal("data", "input", [".U1 > .DIN"]),
        ],
      },
    ],
  }),
  adapter({
    id: "environmental-sensor-hdc2080",
    title: "HDC2080 Environmental Sensor",
    category: "Sensors",
    componentName: "EnvironmentalSensor_HDC2080",
    sourceFile: "EnvironmentalSensor_HDC2080.circuit.tsx",
    tags: ["humidity", "temperature", "i2c"],
    warning:
      "This reference block includes an embedded MCU/host connector fixture in addition to the sensor.",
    ports: [
      powerPort({
        id: "power-in",
        label: "Sensor Power",
        role: "consumer",
        voltage: { min: 1.62, max: 3.6, nominal: 3.3 },
        positive: [".U1 > .VDD"],
        ground: [".U1 > .GND"],
      }),
      {
        id: "i2c",
        label: "I2C",
        kind: "data",
        role: "device",
        protocol: "i2c",
        requiredSignals: ["scl", "sda"],
        signals: [
          signal("scl", "input", [".U1 > .SCL"]),
          signal("sda", "bidirectional", [".U1 > .SDA"]),
          signal("interrupt", "output", [".U1 > .DRDY_INT"], false),
        ],
      },
    ],
  }),
  adapter({
    id: "temperature-sensor-tmp1075",
    title: "TMP1075 Temperature Sensor",
    category: "Sensors",
    componentName: "TemperatureSensor_TMP1075",
    sourceFile: "TemperatureSensor_TMP1075.circuit.tsx",
    tags: ["temperature", "i2c"],
    warning:
      "This reference block includes an embedded two-wire host-controller fixture.",
    ports: [
      powerPort({
        id: "power-in",
        label: "Sensor Power",
        role: "consumer",
        voltage: { min: 1.7, max: 5.5, nominal: 3.3 },
        positive: [".U1 > .V_PLUS"],
        ground: [".U1 > .GND"],
      }),
      {
        id: "i2c",
        label: "I2C",
        kind: "data",
        role: "device",
        protocol: "i2c",
        requiredSignals: ["scl", "sda"],
        signals: [
          signal("scl", "input", [".U1 > .SCL"]),
          signal("sda", "bidirectional", [".U1 > .SDA"]),
          signal("interrupt", "output", [".U1 > .ALERT"], false),
        ],
      },
    ],
  }),
  adapter({
    id: "real-time-clock-bq32002",
    title: "BQ32002 Real-Time Clock",
    category: "Timing",
    componentName: "RealTimeClock_BQ32002",
    sourceFile: "RealTimeClock_BQ32002.circuit.tsx",
    tags: ["rtc", "i2c"],
    ports: [
      powerPort({
        id: "power-in",
        label: "RTC Power",
        role: "consumer",
        voltage: { min: 3, max: 3.6, nominal: 3.3 },
        positive: [".U1 > .VCC"],
        ground: [".U1 > .GND"],
      }),
      {
        id: "i2c",
        label: "I2C",
        kind: "data",
        role: "device",
        protocol: "i2c",
        requiredSignals: ["scl", "sda"],
        signals: [
          signal("scl", "input", [".U1 > .SCL"]),
          signal("sda", "bidirectional", [".U1 > .SDA"]),
          signal("interrupt", "output", [".U1 > .IRQ"], false),
        ],
      },
    ],
  }),
  adapter({
    id: "communication-interface-tcan1042-tida01428",
    title: "TCAN1042 CAN Interface",
    category: "Interfaces",
    componentName: "CommunicationInterface_TCAN1042_TIDA01428",
    sourceFile: "CommunicationInterface_TCAN1042_TIDA01428.circuit.tsx",
    tags: ["can", "automotive"],
    ports: [
      powerPort({
        id: "transceiver-power",
        label: "5 V Transceiver Power",
        role: "consumer",
        voltage: { min: 4.5, max: 5.5, nominal: 5 },
        positive: [".U6 > .VCC"],
        ground: [".U6 > .GND"],
      }),
      powerPort({
        id: "logic-power",
        label: "3.3 V Logic Power",
        role: "consumer",
        voltage: { min: 1.7, max: 5.5, nominal: 3.3 },
        positive: [".U6 > .VIO"],
        ground: [".U6 > .GND"],
      }),
      {
        id: "controller",
        label: "CAN Controller",
        kind: "data",
        role: "peripheral",
        protocol: "can-controller",
        requiredSignals: ["tx", "rx", "standby"],
        signals: [
          signal("tx", "input", [".U6 > .TXD"]),
          signal("rx", "output", [".U6 > .RXD"]),
          signal("standby", "input", [".U6 > .STB"]),
        ],
      },
      {
        id: "can-bus",
        label: "CAN Bus",
        kind: "data",
        role: "peer",
        protocol: "can-bus",
        requiredSignals: ["can_h", "can_l"],
        allowMultiple: true,
        signals: [
          signal("can_h", "bidirectional", [".L7 > .pin3"]),
          signal("can_l", "bidirectional", [".L7 > .pin2"]),
        ],
      },
    ],
  }),
  adapter({
    id: "motor-driver-drv8833",
    title: "DRV8833 Dual Motor Driver",
    category: "Motor Control",
    componentName: "MotorDriver_DRV8833",
    sourceFile: "MotorDriver_DRV8833.circuit.tsx",
    tags: ["motor", "h-bridge", "pwm"],
    warning:
      "This reference block includes an embedded motor/load fixture and ties both H-bridge channels together.",
    ports: [
      powerPort({
        id: "motor-power",
        label: "Motor Power",
        role: "consumer",
        voltage: { min: 2.7, max: 10.8, nominal: 5 },
        positive: [".U1 > .VM"],
        ground: [".U1 > .GND"],
      }),
      {
        id: "control",
        label: "Motor Control",
        kind: "data",
        role: "device",
        protocol: "motor-control",
        requiredSignals: ["in1", "in2"],
        signals: [
          signal("in1", "input", [".U1 > .AIN1", ".U1 > .BIN1"]),
          signal("in2", "input", [".U1 > .AIN2", ".U1 > .BIN2"]),
        ],
      },
    ],
  }),
  adapter({
    id: "microcontroller-mspm0g3507",
    title: "MSPM0G3507 Microcontroller",
    category: "Processors",
    componentName: "Microcontroller_MSPM0G3507",
    sourceFile: "Microcontroller_MSPM0G3507.circuit.tsx",
    tags: ["mcu"],
    ports: [
      powerPort({
        id: "power-in",
        label: "MCU Power",
        role: "consumer",
        voltage: { min: 1.62, max: 3.6, nominal: 3.3 },
        positive: [".U1 > .VDD"],
        ground: [".U1 > .VSS"],
      }),
    ],
  }),
  adapter({
    id: "input-power-protection-tps25910-tida00890",
    title: "TPS25910 Input Power Protection",
    description:
      "Protected 5 V eFuse rail from TI reference design TIDA-00890.",
    category: "Power",
    componentName: "InputPowerProtection_TPS25910_TIDA00890",
    sourceFile: "InputPowerProtection_TPS25910_TIDA00890.circuit.tsx",
    tags: ["efuse", "input protection", "5v"],
    ports: [
      powerPort({
        id: "protected-5v-out",
        label: "Protected 5 V",
        role: "provider",
        voltage: { min: 4.75, max: 5.25, nominal: 5 },
        positive: [".U7 > .IN1"],
        ground: [".U7 > .GND1"],
      }),
    ],
  }),
  adapter({
    id: "buck-converter-tps62086-tida00399",
    title: "TPS62086 DC/DC Power Supply",
    description:
      "3.3 V buck-converter rail from TI reference design TIDA-00399.",
    category: "Power",
    componentName: "BuckConverter_TPS62086_TIDA00399",
    sourceFile: "BuckConverter_TPS62086_TIDA00399.circuit.tsx",
    tags: ["buck", "dc-dc", "3.3v"],
    ports: [
      powerPort({
        id: "power-in",
        label: "Power Input",
        role: "consumer",
        voltage: { min: 2.5, max: 6, nominal: 5 },
        positive: [".U3P3 > .VIN", ".U3P3 > .EN"],
        ground: [".U3P3 > .GND"],
      }),
      powerPort({
        id: "power-3v3-out",
        label: "3.3 V Power",
        role: "provider",
        voltage: 3.3,
        positive: [".L3P3 > .pin2"],
        ground: [".U3P3 > .GND"],
        allowMultiple: true,
      }),
    ],
  }),
  adapter({
    id: "lvds-driver-sn65lvds31-tida060017",
    title: "SN65LVDS31 I/O Connection",
    description: "LVDS output interface from TI reference design TIDA-060017.",
    category: "Interfaces",
    componentName: "LVDSDriver_SN65LVDS31_TIDA060017",
    sourceFile: "LVDSDriver_SN65LVDS31_TIDA060017.circuit.tsx",
    tags: ["lvds", "driver", "io"],
    ports: [
      powerPort({
        id: "power-in",
        label: "3.3 V Power",
        role: "consumer",
        voltage: { min: 3, max: 3.6, nominal: 3.3 },
        positive: [".U1 > .VCC", ".U1 > .ENABLE"],
        ground: [".U1 > .GND", ".U1 > .ENABLE_NOT"],
      }),
      {
        id: "logic-in",
        label: "Logic Input",
        kind: "data",
        role: "sink",
        protocol: "gpio",
        requiredSignals: ["data"],
        signals: [signal("data", "input", [".U1 > .IN1"])],
      },
      {
        id: "lvds-out",
        label: "LVDS Output",
        kind: "data",
        role: "source",
        protocol: "lvds",
        requiredSignals: ["positive", "negative", "ground"],
        signals: [
          signal("positive", "output", [".U1 > .OUT1_P"]),
          signal("negative", "output", [".U1 > .OUT1_N"]),
          signal("ground", "passive", [".U1 > .GND"]),
        ],
      },
    ],
  }),
  adapter({
    id: "wireless-antenna-w3006-tidcwl1837modcom8i",
    title: "W3006 Wireless Connectivity Antenna",
    description:
      "2.4 GHz antenna matching network from TI design TIDC-WL1837MODCOM8I.",
    category: "Wireless",
    componentName: "WirelessAntenna_W3006_TIDCWL1837MODCOM8I",
    sourceFile: "WirelessAntenna_W3006_TIDCWL1837MODCOM8I.circuit.tsx",
    tags: ["wireless", "antenna", "2.4ghz", "rf"],
    ports: [
      {
        id: "rf-in",
        label: "RF Feed",
        kind: "data",
        role: "sink",
        protocol: "rf",
        requiredSignals: ["rf"],
        signals: [signal("rf", "input", [".C5 > .pin1"])],
      },
    ],
  }),
  adapter({
    id: "input-output-protection-tpd2e009-tida00399",
    title: "TPD2E009 I/O Protection",
    description:
      "Two-channel ESD protection from TI reference design TIDA-00399.",
    category: "Protection",
    componentName: "InputOutputProtection_TPD2E009_TIDA00399",
    sourceFile: "InputOutputProtection_TPD2E009_TIDA00399.circuit.tsx",
    tags: ["esd", "io protection", "lvds"],
    ports: [
      {
        id: "protected-lvds-in",
        label: "Protected LVDS Input",
        kind: "data",
        role: "sink",
        protocol: "lvds",
        requiredSignals: ["positive", "negative", "ground"],
        signals: [
          signal("positive", "input", [".UESD > .D1"]),
          signal("negative", "input", [".UESD > .D2"]),
          signal("ground", "passive", [".UESD > .GND"]),
        ],
      },
    ],
  }),
  adapter({
    id: "logic-buffer-sn74lvc1g34",
    title: "SN74LVC1G34 Logic and Control",
    description:
      "Single non-inverting logic buffer for module control signals.",
    category: "Logic",
    componentName: "LogicBuffer_SN74LVC1G34",
    sourceFile: "LogicBuffer_SN74LVC1G34.circuit.tsx",
    tags: ["logic", "buffer", "gpio"],
    ports: [
      powerPort({
        id: "power-in",
        label: "Logic Power",
        role: "consumer",
        voltage: { min: 1.65, max: 5.5, nominal: 3.3 },
        positive: ["net.VCC"],
        ground: ["net.GND"],
      }),
      {
        id: "logic-out",
        label: "Logic Output",
        kind: "data",
        role: "source",
        protocol: "gpio",
        requiredSignals: ["data"],
        signals: [signal("data", "output", ["net.MCU_OR_LOGIC_OUT"])],
      },
    ],
  }),
  adapter({
    id: "temperature-sensor-tmp103-tida00399",
    title: "TMP103 Sensors",
    description: "I2C temperature sensor from TI reference design TIDA-00399.",
    category: "Sensors",
    componentName: "TemperatureSensor_TMP103_TIDA00399",
    sourceFile: "TemperatureSensor_TMP103_TIDA00399.circuit.tsx",
    tags: ["temperature", "sensor", "i2c"],
    ports: [
      powerPort({
        id: "power-in",
        label: "Sensor Power",
        role: "consumer",
        voltage: { min: 1.4, max: 3.6, nominal: 3.3 },
        positive: [".UTMP > .V_PLUS"],
        ground: [".UTMP > .GND"],
      }),
      {
        id: "i2c",
        label: "I2C",
        kind: "data",
        role: "device",
        protocol: "i2c",
        requiredSignals: ["scl", "sda"],
        signals: [
          signal("scl", "input", [".UTMP > .SCL"]),
          signal("sda", "bidirectional", [".UTMP > .SDA"]),
        ],
      },
    ],
  }),
];

export const CURATED_ADAPTER_BY_COMPONENT = new Map(
  CURATED_SUBCIRCUIT_ADAPTERS.map((definition) => [
    definition.componentName,
    definition,
  ]),
);
