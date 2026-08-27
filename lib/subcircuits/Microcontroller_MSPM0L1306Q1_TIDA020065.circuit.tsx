import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { MSPM0L1306QRHBRQ1 } from "../chips/MSPM0L1306QRHBRQ1.circuit.tsx";

/**
 * TIDA-020065 Altium placements, cropped around the MSPM0 core.
 *
 * U6 is the crop origin. X is preserved from the imported PcbDoc and the
 * KiCad Y axis is inverted so these coordinates use tscircuit's +Y-up frame.
 */
const pcbPlacement = {
  U6: { pcbX: 0, pcbY: 0, pcbRotation: 0 },
  C14: { pcbX: -9.277, pcbY: 0.58906, pcbRotation: 90 },
  C15: { pcbX: -4.81304, pcbY: 1.24977, pcbRotation: 90 },
  C16: { pcbX: -3.27648, pcbY: 4.8747, pcbRotation: 90 },
  C17: { pcbX: -6.05063, pcbY: 5.97139, pcbRotation: 180 },
  R15: { pcbX: -6.05063, pcbY: 4.02393, pcbRotation: 180 },
  R16: { pcbX: -8.04835, pcbY: -2.4627, pcbRotation: 0 },
} as const;

/**
 * TIDA-020065 SchDoc coordinates, scaled at 0.02 schematic units per Altium
 * grid unit. U6's 200 x 350 grid-unit body is the schematic crop origin.
 */
const schematicPlacement = {
  U6: { schX: 0, schY: 0 },
  C14: { schX: -4.4, schY: 4.8, schRotation: 270 },
  C15: { schX: -2.8, schY: 4.8, schRotation: 270 },
  C16: { schX: -4.8, schY: 3.4, schRotation: 270 },
  C17: { schX: -7, schY: 2.2, schRotation: 270 },
  R15: { schX: -6, schY: 2.9, schRotation: 270 },
  R16: { schX: -6.2, schY: 1.1, schRotation: 270 },
} as const;

/**
 * MCU core extracted from the TIDA-020065 MSPM0 sheet.
 *
 * Scope: U6 power/VCORE bypassing, reset pullup/filter, optional ROSC resistor,
 * and named power/reset/SWD interfaces. The reset switch, programming header,
 * smart-fuse GPIO links, LEDs, ADC filtering, test points and application
 * jumpers are deliberately excluded.
 */
export const Microcontroller_MSPM0L1306Q1_TIDA020065 = (
  props: SubcircuitProps,
) => (
  <subcircuit
    width="66mm"
    height="25mm"
    minTraceWidth="0.2mm"
    schMaxTraceDistance="4mm"
    {...props}
  >
    <net name="GND" isGroundNet />
    <net name="V3_3_LOD" isPowerNet />

    <MSPM0L1306QRHBRQ1
      name="U6"
      {...schematicPlacement.U6}
      {...pcbPlacement.U6}
      schWidth={4}
      schHeight={7}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [
            4, 32, 3, 1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ],
        },
        rightSide: { direction: "top-to-bottom", pins: [5, 33] },
      }}
      schPinStyle={{
        pin4: { marginTop: 0.3 },
        pin32: { marginBottom: 0.2 },
        pin3: { marginBottom: 0.2 },
        pin5: { marginTop: 6.3 },
      }}
      showPinAliases
    />

    <capacitor
      name="C14"
      capacitance="10uF"
      manufacturerPartNumber="JMJ212CB7106KGHT"
      footprint="0805"
      maxDecouplingTraceLength="40mm"
      {...schematicPlacement.C14}
      {...pcbPlacement.C14}
    />
    <capacitor
      name="C15"
      capacitance="100nF"
      manufacturerPartNumber="06035C104KAZ2A"
      footprint="0603"
      maxDecouplingTraceLength="40mm"
      {...schematicPlacement.C15}
      {...pcbPlacement.C15}
    />
    <trace name="VDD" from=".U6 > .VDD" to=".C15 > .pin2" />
    <trace name="VDD_DECOUPLING" from=".C15 > .pin2" to=".C14 > .pin2" />
    <trace name="VDD_DECOUPLING_GND" from=".C14 > .pin1" to=".C15 > .pin1" />
    <trace
      name="VDD_GND"
      from=".C15 > .pin1"
      to="net.GND"
      schDisplayLabel="GND"
    />

    <capacitor
      name="C16"
      capacitance="470nF"
      manufacturerPartNumber="CGA3E3X7R1H474M080AE"
      footprint="0603"
      maxDecouplingTraceLength="40mm"
      {...schematicPlacement.C16}
      {...pcbPlacement.C16}
    />
    <trace name="VCORE" from=".U6 > .VCORE" to=".C16 > .pin1" />
    <trace
      name="VCORE_GND"
      from=".C16 > .pin2"
      to="net.GND"
      schDisplayLabel="GND"
    />

    <resistor
      name="R15"
      resistance="47kohm"
      manufacturerPartNumber="CRCW060347K0JNEA"
      footprint="0603"
      {...schematicPlacement.R15}
      {...pcbPlacement.R15}
    />
    <capacitor
      name="C17"
      capacitance="0.01uF"
      manufacturerPartNumber="C0603C103J3GECAUTO"
      footprint="0603"
      maxDecouplingTraceLength="40mm"
      {...schematicPlacement.C17}
      {...pcbPlacement.C17}
    />
    <trace name="NRST_POWER" from=".R15 > .pin1" to=".C14 > .pin2" />
    <trace name="NRST_PULLUP" from=".R15 > .pin2" to=".U6 > .NRST" />
    <trace name="NRST_CAP" from=".C17 > .pin1" to=".R15 > .pin2" />
    <trace
      name="NRST_CAP_GND"
      from=".C17 > .pin2"
      to="net.GND"
      schDisplayLabel="GND"
    />

    <resistor
      name="R16"
      resistance="100kohm"
      tolerance="0.1%"
      manufacturerPartNumber="ERJ-PB3B1003V"
      footprint="0603"
      {...schematicPlacement.R16}
      {...pcbPlacement.R16}
    />
    <trace
      name="ROSC"
      from=".U6 > .ROSC"
      to=".R16 > .pin1"
      schDisplayLabel="ROSC"
    />
    <trace
      name="ROSC_GND"
      from=".R16 > .pin2"
      to="net.GND"
      schDisplayLabel="GND"
    />

    <trace
      name="V3_3_LOD_INTERFACE"
      from=".C14 > .pin2"
      to="net.V3_3_LOD"
      schDisplayLabel="3V3_LDO"
    />
    <trace
      name="SWDIO_INTERFACE"
      from=".U6 > .SWDIO"
      to="net.SWDIO"
      schDisplayLabel="SWDIO"
    />
    <trace
      name="SWCLK_INTERFACE"
      from=".U6 > .SWCLK"
      to="net.SWCLK"
      schDisplayLabel="SWCLK"
    />
    <trace
      name="NRST_INTERFACE"
      from=".U6 > .NRST"
      to="net.NRST"
      schDisplayLabel="NRST"
    />

    <trace name="U6_GROUND_LINK" from=".U6 > .VSS" to=".U6 > .Thermal_pad" />
    <trace
      name="U6_GROUND"
      from=".U6 > .Thermal_pad"
      to="net.GND"
      schDisplayLabel="GND"
    />
  </subcircuit>
);

export default Microcontroller_MSPM0L1306Q1_TIDA020065;
