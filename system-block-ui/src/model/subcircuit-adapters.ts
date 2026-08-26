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
];

export const CURATED_ADAPTER_BY_COMPONENT = new Map(
  CURATED_SUBCIRCUIT_ADAPTERS.map((definition) => [
    definition.componentName,
    definition,
  ]),
);
