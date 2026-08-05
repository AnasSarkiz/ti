# TI tscircuit library

This repo contains hand-curated tscircuit TSX schematics for Texas Instruments
devices, reusable TI reference subcircuits, and raw TI chip definitions.

The published package is `@tsci/tscircuit.ti`. It provides ready-to-use
subcircuit components and low-level chip components that can be imported into a
local tscircuit project, placed on a board, and connected to from the
surrounding circuit.

## Installation

```bash
bun add @tsci/tscircuit.ti
```

## Basic Usage

Import the TI part you need from the package and place it inside a board.

```tsx
import { PowerMonitor_INA237 } from "@tsci/tscircuit.ti"

export default () => (
  <board width="18mm" height="14mm">
    <PowerMonitor_INA237 name="INA237" />
  </board>
)
```

## Raw Chip Usage

When you need the bare chip package instead of a full reference design, import
the chip by its short TI part name. If that chip currently maps to a specific
package footprint in `lib/chips`, the package keeps the underlying MPN-named
definition available and exposes the short-name wrapper from the package
entrypoint.

```tsx
import { BQ24074 } from "@tsci/tscircuit.ti"

export default () => (
  <board width="14mm" height="14mm">
    <BQ24074 name="U1" footprintVariant="vqfn_16_ep_3x3" pcbX={0} pcbY={0} />
  </board>
)
```

`footprintVariant` is optional today and defaults to the currently available
chip footprint for that short-name export. New code should use readable package
names such as `vqfn_16_ep_3x3` or `sot_23_5`.

## Connecting to Pins Inside a Subcircuit

Imported TI parts are subcircuits. To connect an external component to a pin
inside one of those subcircuits, use a selector string that starts with the
placed subcircuit name, then selects the internal component and pin.

```tsx
import { PowerMonitor_INA237 } from "@tsci/tscircuit.ti"

export default () => (
  <board width="22mm" height="16mm">
    <PowerMonitor_INA237 name="INA237" />
    <resistor
      name="R11"
      resistance="1k"
      footprint="0402"
      pcbX={7}
      pcbY={-3}
      connections={{
        pin1: ".INA237 .J1 .SCL",
      }}
    />
  </board>
)
```

The selector `".INA237 .J1 .SCL"` means:

- `.INA237` selects the placed `INA237` subcircuit.
- `.J1` selects the internal connector named `J1` inside that subcircuit.
- `.SCL` selects the `SCL` pin on that connector.

Use the same pattern for other exported TI subcircuits and their internal
components. For example, `".INA237 .U1 .VS"` selects the `VS` pin on the
internal `U1` chip inside the placed `INA237` subcircuit.

## Exported Subcircuits

The package currently exports these subcircuit components:

- `BatteryManagement_BQ24072`
- `BatteryManagement_BQ24073`
- `BatteryManagement_BQ24074`
- `BatteryManagement_BQ25895`
- `BatteryManagement_BQ27441G1`
- `RealTimeClock_BQ32002`
- `WirelessMCU_CC2340R5`
- `BluetoothController_CC2564C`
- `WirelessMCU_CC2745R10`
- `WirelessMCU_CC3235SF`
- `MotorDriver_DRV8833`
- `MotorDriver_DRV8876`
- `EnvironmentalSensor_HDC2080`
- `EnvironmentalSensor_HDC3020`
- `EnvironmentalSensor_HDC3022`
- `PowerMonitor_INA237`
- `AudioAmplifier_TAS2505`
- `TargetSocket_MSPTS430D8`
- `Microcontroller_MSPM0G3507`
- `Microcontroller_MSPM33C3x`
- `LEDDriver_TLC59116`
- `TemperatureSensor_TMP1075`
- `TemperatureSensor_TMP1827`
- `LoadSwitch_TPS22919`
- `BuckConverter_TPS62933`
- `BoostConverter_TPS61299X` (also exported as `TPS61299XBoostConverter`)
- `PowerManagement_TPS6521835`
- `BuckBoostConverter_TPS63802`
- `PowerManagement_TPS7A02`
- `PowerManagement_TLV755P`
- `PowerModule_TPSM82823`
- `LevelShifter_TXB0104`
- `LevelShifter_TXS0102`
- `RFIDReader_TRF7960`

## Exported Chips

The package also exports these low-level chip components from `lib/chips`. Each
chip is listed individually below, including whether it supports a
`footprintVariant` selector on the short-name export.

| Chip Export | `footprintVariant` | Underlying Component Export |
| --- | --- | --- |
| `BQ24074` | `vqfn_16_ep_3x3` | `BQ24074RGTR` |
| `BQ25895` | `wqfn_24_ep_4x4` | `BQ25895RTWR` |
| `BQ27441G1` | `vson_12_ep_2p5x4` | `BQ27441DRZR_G1B` |
| `CC2340R5` | `-` | `CC2340R5` |
| `CC2564C` | `-` | `CC2564C` |
| `CC2745R10` | `-` | `CC2745R10E0WRHARQ1` |
| `CC3235SF` | `vqfn_64_ep` | `CC3235SF12RGKR` |
| `DRV8833` | `-` | `DRV8833` |
| `DRV8876` | `-` | `DRV8876` |
| `HDC2080` | `wson_6_ep_3x3` | `HDC2080DMBR` |
| `HDC3020` | `wson_8_ep_2p5x2p5` | `HDC3020DEFR` |
| `HDC3022` | `wson_8_ep_2p5x2p5` | `HDC3022DEJR` |
| `INA237` | `vssop_10` | `INA237AQDGSRQ1` |
| `MSP430G2230ID` | `-` | `MSP430G2230ID` |
| `MSPM0G3507` | `lqfp_64` | `MSPM0G3507SPMR` |
| `TLV755P` | `sot_23_5` | `TLV75533PDBVR` | 
| `TAS2505` | `-` | `TAS2505` |
| `TMP1827` | `-` | `TMP1827` |
| `TMP1075` | `wson_8_ep_2x2` | `TMP1075DSGR` |
| `TPS22919` | `-` | `TPS22919` |
| `TPS6293` | `-` | `TPS6293` |
| `TPS61299X` | `sot_563_6` | `TPS61299DRLR` |
| `TPS63802` | `vson_hr_10` | `TPS63802DLAR` |
| `TPS7A02` | `sot_23_5` | `TPS7A0230PDBVR` |
| `TPSM82823` | `-` | `TPSM82823` |
| `TXB0104` | `vqfn_14_ep_3p5x3p5` | `TXB0104RGYR` |
| `TXS0102` | `vssop_8` | `TXS0102DCUR` |

Rows with `-` are direct chip exports and do not currently expose a
`footprintVariant` prop. For the wrapper exports, the underlying component
exports are also re-exported from the package when you want to import the exact
low-level definition directly.

The package also exports:

- `TiChipComponents`: an object map of all exported short-name chip components.
- `TiChipName`: a TypeScript union of keys in `TiChipComponents`.
- `TiChipComponent`: a TypeScript type for any exported chip component.
- `TiSubcircuitComponents`: an object map of all exported subcircuit components.
- `TiSubcircuitName`: a TypeScript union of keys in `TiSubcircuitComponents`.
- `TiSubcircuitComponent`: a TypeScript type for any exported subcircuit
  component.

## Key Directories

### `lib/chips`

The `lib/chips` directory contains the low-level TI chip components. Most files
represent an individual manufacturer part number and define details such as pin
labels, aliases, supplier part numbers, and the physical footprint used by
tscircuit.

Import chips from the package entrypoint by their short names, such as
`BQ24074`, `INA237`, or `TPS7A02`. The underlying MPN-named definitions remain
available as direct exports when you need to pin a specific source component.
Most users should still start with the higher-level subcircuits, but the chip
definitions are the building blocks those subcircuits use internally.

### `lib/subcircuits`

The `lib/subcircuits` directory contains reusable reference circuits built
around the chip definitions. A subcircuit usually includes the main TI part plus
supporting components such as capacitors, resistors, connectors, net labels, and
traces.

These are the components exported from the package entrypoint in `index.ts`.
For example, `PowerMonitor_INA237` comes from
`lib/subcircuits/PowerMonitor_INA237.circuit.tsx` and can be imported from
`@tsci/tscircuit.ti`.

The `lib/subcircuits/__snapshots__` directory contains generated schematic and
PCB SVG snapshots used to check visual output.

### `lib/simulations`

The `lib/simulations` directory contains example circuits for simulation-focused
TI use cases. These files exercise selected parts and reference designs, such as
driver PWM behavior or switching regulator waveforms.

Simulation examples may use model data from `lib/chips/spice-models`. The
`lib/simulations/__snapshots__` directory stores generated schematic and
simulation SVG snapshots.


## Development

Install dependencies:

```bash
bun install
```

Run the tscircuit dev server:

```bash
bun run dev
```

Build the package:

```bash
bun run build
```

Run TypeScript checks:

```bash
bun run typecheck
```

Update visual snapshots when intentional schematic, PCB, or simulation output
changes:

```bash
bun run snapshot:update
```
