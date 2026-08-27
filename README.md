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

## Complete Examples

The [`BluetoothSpeaker_CC2564C_TAS2505.circuit.tsx`](examples/BluetoothSpeaker_CC2564C_TAS2505.circuit.tsx)
example composes the CC2564C Bluetooth controller, MSP430F5229 host, TAS2505
audio amplifier, BQ24074 battery charger, and TPS7A2018 1.8 V regulator into a
connected Bluetooth speaker schematic.

## System Block Builder

The standalone [`system-block-ui`](system-block-ui/README.md) app provides a
React Flow canvas for dragging these subcircuits into a system diagram.
Connections stay at a readable system level—such as Power or Data—while a
curated semantic catalog resolves compatible voltage rails and protocols into
exact tscircuit selectors. The app generates example-style TSX and can evaluate
it with PCB and routing work disabled to produce a schematic preview and
downloadable PDF.

[Open the deployed TI System Block Builder](https://ti-system-block-ui.vercel.app/).

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

### INA350 instrumentation amplifier

`InstrumentationAmplifier_INA350` contains **only `INA350CDSIDSGR` and a 100 nF
bypass capacitor**: the U5/C13 amplifier stage in
[TI TIDA-010266, Figure 4-1](https://www.ti.com/lit/ug/tiduf53/tiduf53.pdf#page=17).
It contains no pin headers, connectors, or gain-selection jumper. The
[import example](examples/InstrumentationAmplifier_INA350.circuit.tsx) also uses
only named parent nets, with no header. J10 in TI's schematic is an optional
parent-board gain jumper, not part of this module.

The CDS variant provides gains **30/50 V/V**. `gain="external"` (default) exposes
GS for the parent: low selects 30, high or unconnected selects 50. `gain={30}`
or `gain={50}` straps GS internally to GND or VS. REF is **not grounded**; drive
it from a low-impedance source such as the buffered 1.25 V reference in TIDA-010266.
`shutdown="external"` (default) exposes SHDN; high or unconnected enables the
amplifier, while low disables it. `shutdown="enabled"` ties SHDN to VS. Do not
populate a pull-down on SHDN if the amplifier must remain enabled.

```tsx
import { InstrumentationAmplifier_INA350 } from "@tsci/tscircuit.ti"

export default () => (
  <board width="12mm" height="10mm" routingDisabled>
    <InstrumentationAmplifier_INA350 name="Amp" gain="external" />
    <trace from=".Amp .U1 > .VS" to="net.V3_3" />
    <trace from=".Amp .U1 > .V_NEG" to="net.GND" />
    <trace from=".Amp .U1 > .IN_POS" to="net.INA_IN_POS" />
    <trace from=".Amp .U1 > .IN_NEG" to="net.INA_IN_NEG" />
    <trace from=".Amp .U1 > .OUT" to="net.INA_OUT" />
    <trace from=".Amp .U1 > .REF" to="net.VREF_1_25" />
    <trace from=".Amp .U1 > .GS" to="net.INA_GS" />
  </board>
)
```

The supply, reference generator, sensor, ADC/filter, and optional controls belong
to the parent circuit. Named nets do not generate voltages or add physical
terminals: the example disables routing until the parent supplies real endpoints.
Connect an optional MCU shutdown signal to `.Amp .U1 > .SHDN`. REF, GS, and SHDN
remain separate from ground unless explicitly wired otherwise by the parent or
selected props. V- and the exposed pad are grounded, and C1 bypasses VS to GND.

Supply VS with 1.8-5.5 V. Inputs need a DC bias-current return path and must meet
the [INA350 datasheet's common-mode/output-swing limits](https://www.ti.com/lit/ds/symlink/ina350.pdf).
The module uses 0.1 mm traces. Fixed gain 50 uses a bottom-layer strap and two vias
to keep the SHDN escape clear; use at least two copper layers. Verify the completed
parent board's routing and fabrication clearances. It has no analog simulation model and is not a validated
medical-device design.

`INA350` defaults to the raw `INA350CDSIDSGR` chip with
`footprintVariant="wson_8_ep_2x2"`. The exact `INA350ABSIDSGR` export is also
available for designs requiring gains 10/20. Both share the DSG0008A footprint
and pinout, but their gain settings are not interchangeable. No supplier SKU or
3D model is assumed.

### DRV8210 PWM motor driver

`MotorDriver_DRV8210` implements the full-bridge PWM application for the
8-pin WSON `DRV8210DSGR`. The Controller and BDC motor use
`group showAsSchematicBox` with real schematic signal ports, not PCB components.
Their port-to-port traces use `schDisplayLabel` for inline PWM1/PWM2 and
OUT1/OUT2 labels. Local bypass-capacitor ground labels keep ground wiring clear
of those signals. The two PWM inputs drive IN1 and IN2; OUT1 and OUT2 connect
to the motor.

```tsx
import { MotorDriver_DRV8210 } from "@tsci/tscircuit.ti"

export default () => (
  <board width="16mm" height="12mm">
    <MotorDriver_DRV8210 name="Driver" />
  </board>
)
```

Connect a parent circuit to `.Driver .U1 > .IN1`, `.Driver .U1 > .IN2`,
`.Driver .U1 > .OUT1`, `.Driver .U1 > .OUT2`, `.Driver .U1 > .VM`,
`.Driver .U1 > .VCC`, and `.Driver .U1 > .GND`. The schematic labels are
PWM1, PWM2, OUT1, OUT2, VM, VCC, and GND respectively.

Unlike the six-pin DRL reference diagram, the DSG device also requires a
separate VCC supply and MODE selection. This subcircuit grounds MODE for PWM,
grounds the exposed thermal pad, and includes 0.1 uF bypass capacitors on both
VM and VCC. Keep VCC within 1.65–5.5 V and VM within the DSG operating range
of 0–11 V; add VM bulk capacitance sized for your motor and supply.
See the [TI pinout and supply requirements](https://www.ti.com/document-viewer/DRV8210/datasheet/GUID-F506A16B-1B46-4CAD-B811-DC3055E727BD),
[PWM mode](https://www.ti.com/document-viewer/DRV8210/datasheet/GUID-2C006377-A449-4600-82B4-EA20AA948DEF),
and [bulk capacitance guidance](https://www.ti.com/document-viewer/DRV8210/datasheet/GUID-AFD3F9A7-FA96-4E90-8B0B-C551CB6B7E0B).

The raw chip is available as `DRV8210DSGR` or as
`DRV8210` with `footprintVariant="wson_8_ep_2x2"`.

### LP5892-Q1 LED matrix output interface

`OutputUserInterface_LEDMatrix_LP5892_Q1` implements the 48-source,
16-scan-line interface for a common-cathode 16-by-16 RGB LED matrix. It exposes
the four supply domains (`VCC`, `VR`, `VG`, and `VB`), `GND`, the
`SCLK`/`SIN`/`SOUT` serial interface, `R0`-`R15`, `G0`-`G15`, `B0`-`B15`, and
`LINE0`-`LINE15` as public subcircuit nets. Connect from a parent circuit with
selectors such as `.DisplayDriver > net.SCLK`, `.DisplayDriver > net.R0`, and
`.DisplayDriver > net.GND`.

```tsx
import { OutputUserInterface_LEDMatrix_LP5892_Q1 } from "@tsci/tscircuit.ti"

export default () => (
  <board width="28mm" height="24mm" isViaInPadAllowed>
    <OutputUserInterface_LEDMatrix_LP5892_Q1 name="DisplayDriver" />
    <led
      name="D_R0_LINE0"
      color="red"
      footprint="0603"
      connections={{
        anode: ".DisplayDriver > net.R0",
        cathode: ".DisplayDriver > net.LINE0",
      }}
    />
  </board>
)
```

The internal 23 kohm IREF resistor matches TI's 3 mA, BC=`011` design example;
firmware must configure the matching brightness/current registers. SCLK must
run continuously and SIN should remain high while idle. VCC and VR may share a
rail, as may VG and VB; use at least 3.5 V on VCC when operating at 20 mA or
more per channel.

The exposed-pad thermal-via array requires `isViaInPadAllowed` on the parent
`board`. Follow TI's fabrication guidance by filling, plugging, or tenting the
vias. The implementation follows the
[LP5892-Q1 datasheet](https://www.ti.com/lit/ds/symlink/lp5892-q1.pdf) and the
related [LP5891Q1EVM hardware guide](https://www.ti.com/lit/pdf/snvu836).

### Available subcircuits

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
- `MotorDriver_DRV8210`
- `MotorDriver_DRV8833`
- `MotorDriver_DRV8876`
- `EnvironmentalSensor_HDC2080`
- `EnvironmentalSensor_HDC3020`
- `EnvironmentalSensor_HDC3022`
- `PowerMonitor_INA237`
- `InstrumentationAmplifier_INA350`
- `IsolatedRS485_ISOW7841`
- `ClockBuffer_LMK1C1104`
- `AudioAmplifier_TAS2505`
- `TargetSocket_MSPTS430D8`
- `BluetoothAudioHost_MSP430F5229`
- `Microcontroller_MSPM0G3507`
- `Microcontroller_MSPM33C3x`
- `LEDDriver_TLC59116`
- `OutputUserInterface_LEDMatrix_LP5892_Q1`
- `TemperatureSensor_TMP1075`
- `TemperatureSensor_TMP1827`
- `TemperatureSensor_LM50HV_Q1` ([LM50-Q1/LM50HV-Q1 datasheet, Figure 8-3](https://www.ti.com/lit/ds/symlink/lm50-q1.pdf); used because the Rearview Mirror Module block has no attached reference design)
- `PowerSupply_LM74202_TPS7E81_Q1` ([LM74202-Q1 datasheet, page-1 Simplified Schematic and Figure 39 values](https://www.ti.com/lit/ds/symlink/lm74202-q1.pdf) and [TPS7E81-Q1 datasheet, Figure 7-5](https://www.ti.com/lit/ds/symlink/tps7e81-q1.pdf); used because the Rearview Mirror Module block has no attached reference design)
- `LoadSwitch_TPS22919`
- `BuckConverter_TPS62933`
- `BoostConverter_TPS61299X` (also exported as `TPS61299XBoostConverter`)
- `PowerManagement_TPS6521835`
- `BuckBoostConverter_TPS63802`
- `PowerManagement_TPS7A02`
- `PowerManagement_TPS7A20`
- `PowerManagement_TPS7A2018`
- `PowerManagement_TPS7A2028`
- `PowerManagement_TLV755P`
- `PowerModule_TPSM82823`
- `LevelShifter_TXB0104`
- `LevelShifter_TXS0102`
- `RFIDReader_TRF7960`
- `CommunicationInterface_TCAN1042_TIDA01428` ([TIDA-01428](https://www.ti.com/tool/TIDA-01428))
- `ElectrochromicMirrorDriver_TIDA01539` ([TIDA-01539](https://www.ti.com/tool/TIDA-01539))
- `LightSensor_OPT3001_TIDA01539` ([TIDA-01539](https://www.ti.com/tool/TIDA-01539))
- `LampDriver_TPS92638_TIDA00356` ([TIDA-00356](https://www.ti.com/tool/TIDA-00356))

## Exported Chips

The package also exports these low-level chip components from `lib/chips`. Each
chip is listed individually below, including whether it supports a
`footprintVariant` selector on the short-name export.

| Chip Export | `footprintVariant` | Underlying Component Export |
| --- | --- | --- |
| `AM62L32` | `fccsp_373_anb` | `AM62L32BOGHAANBR` |
| `BQ24074` | `vqfn_16_ep_3x3` | `BQ24074RGTR` |
| `BQ25895` | `wqfn_24_ep_4x4` | `BQ25895RTWR` |
| `BQ27441G1` | `vson_12_ep_2p5x4` | `BQ27441DRZR_G1B` |
| `CC2340R5` | `-` | `CC2340R5` |
| `CC2564C` | `-` | `CC2564C` |
| `CC2745R10` | `-` | `CC2745R10E0WRHARQ1` |
| `CC3235SF` | `vqfn_64_ep` | `CC3235SF12RGKR` |
| `DAC101C081Q` | `-` | `DAC101C081QISD_NOPB` |
| `DRV8210` | `wson_8_ep_2x2` | `DRV8210DSGR` |
| `DRV8833` | `-` | `DRV8833` |
| `DRV8876` | `-` | `DRV8876` |
| `HDC2080` | `wson_6_ep_3x3` | `HDC2080DMBR` |
| `HDC3020` | `wson_8_ep_2p5x2p5` | `HDC3020DEFR` |
| `HDC3022` | `wson_8_ep_2p5x2p5` | `HDC3022DEJR` |
| `INA237` | `vssop_10` | `INA237AQDGSRQ1` |
| `INA350` | `wson_8_ep_2x2` | `INA350CDSIDSGR` |
| `ISOW7841` | `soic_16_wide` | `ISOW7841DWR` |
| `LM74202Q1` | `-` | `LM74202QPWPRQ1` |
| `LM50HVQ1` | `-` | `LM50HVQDBZRQ1` |
| `LMK1C1104` | `tssop_8` | `LMK1C1104PWR` |
| `LP5892Q1` | `vqfn_76_ep_9x9` | `LP5892QRRFRQ1` |
| `MSP430G2230ID` | `-` | `MSP430G2230ID` |
| `MSP430F5229` | `-` | `MSP430F5229IRGCR` |
| `MSPM0G3507` | `lqfp_64` | `MSPM0G3507SPMR` |
| `OPT3001` | `-` | `OPT3001IDNPRQ1` |
| `SN65HVD1473` | `vssop_10` | `SN65HVD1473DGSR` |
| `TCAN1042HGV` | `-` | `TCAN1042HGVDRBQ1` |
| `TLV755P` | `sot_23_5` | `TLV75533PDBVR` | 
| `TLV316` | `-` | `TLV316QDBVTQ1` |
| `TAS2505` | `-` | `TAS2505` |
| `TMP1827` | `-` | `TMP1827` |
| `TMP1075` | `wson_8_ep_2x2` | `TMP1075DSGR` |
| `TPS22919` | `-` | `TPS22919` |
| `TPS6293` | `-` | `TPS6293` |
| `TPS61299X` | `sot_563_6` | `TPS61299DRLR` |
| `TPS63802` | `vson_hr_10` | `TPS63802DLAR` |
| `TPS7A02` | `sot_23_5` | `TPS7A0230PDBVR` |
| `TPS7A20` | `sot_23_5` | `TPS7A2018PDBVR`, `TPS7A2033PDBVR` |
| `TPS7E81Q1` | `-` | `TPS7E8133QDBVRQ1` |
| `TPS92638` | `-` | `TPS92638QPWPRQ1` |
| `TPS7A2028PDBVR` | `-` | `TPS7A2028PDBVR` |
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

### `lib/thirdparty-subcircuits`

The `lib/thirdparty-subcircuits` directory contains application wiring circuits
for blocks that do not provide a TI reference design. These circuits clearly
identify the datasheet figure used as their source. For example,
`TemperatureSensor_LM50HV_Q1` follows Figure 8-3 of the LM50-Q1/LM50HV-Q1
datasheet, while `PowerSupply_LM74202_TPS7E81_Q1` combines the LM74202-Q1
page-1 Simplified Schematic (with Figure 39 values) and the TPS7E81-Q1 Figure
7-5 fixed-output LDO stage.

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
