import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { BAT54CDW_7_F } from "../chips/BAT54CDW_7_F.circuit.tsx";
import { DRV83053QPHPQ1 } from "../chips/DRV83053QPHPQ1.circuit.tsx";
import { SQJ858AEP_T1_GE3 } from "../chips/SQJ858AEP_T1_GE3.circuit.tsx";

const NetTie = ({
  name,
  schX,
  schY,
  pcbX,
  pcbY,
  pcbRotation,
  layer,
}: {
  name: string;
  schX: number;
  schY: number;
  pcbX: number;
  pcbY: number;
  pcbRotation: number;
  layer?: "top" | "bottom";
}) => (
  <chip
    name={name}
    pinLabels={{ pin1: ["1"], pin2: ["2"] }}
    showPinAliases={false}
    symbolName="solderjumper2_bridged12"
    schX={schX}
    schY={schY}
    schWidth={0.45}
    schHeight={0.25}
    pcbX={pcbX}
    pcbY={pcbY}
    pcbRotation={pcbRotation}
    layer={layer}
    footprint={
      <footprint>
        {/* Preserve the two Kelvin nets; the 0.1 mm gap is solder-bridged. */}
        <smtpad
          portHints={["pin1"]}
          pcbX="-0.2405mm"
          pcbY="0mm"
          width="0.381mm"
          height="0.3048mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin2"]}
          pcbX="0.2405mm"
          pcbY="0mm"
          width="0.381mm"
          height="0.3048mm"
          shape="rect"
        />
      </footprint>
    }
  />
);

/**
 * Altium component origins normalized around (1957 mil, 4409 mil). This keeps
 * the extracted motor-driver section's relative placement, rotations and
 * assembly sides while allowing it to live on its own cropped board.
 */
const pcbPlacement = {
  C1: { pcbX: -8.001, pcbY: -25.781, pcbRotation: 180 },
  C12: { pcbX: -7.1, pcbY: 7.239, pcbRotation: 270 },
  C13: { pcbX: 12.827, pcbY: -3.937, pcbRotation: 180 },
  C14: { pcbX: 16.071, pcbY: 12.319, pcbRotation: 180 },
  C15: { pcbX: 9.587, pcbY: -2.351, pcbRotation: 0 },
  C16: { pcbX: 16.129, pcbY: -3.683, pcbRotation: 0 },
  C17: { pcbX: 7.493, pcbY: -4.445, pcbRotation: 90, layer: "bottom" },
  C18: { pcbX: 20.193, pcbY: -1.143, pcbRotation: 180 },
  C19: { pcbX: -3.683, pcbY: 12.573, pcbRotation: 0 },
  C20: { pcbX: 6.55, pcbY: 9.779, pcbRotation: 270 },
  C21: { pcbX: 10.09, pcbY: 12.319, pcbRotation: 180 },
  C22: { pcbX: 19.939, pcbY: -19.685, pcbRotation: 90 },
  C23: { pcbX: 17.399, pcbY: -19.685, pcbRotation: 90 },
  C24: { pcbX: 22.479, pcbY: -19.685, pcbRotation: 90 },
  C25: { pcbX: 13.081, pcbY: 12.319, pcbRotation: 180 },
  C26: { pcbX: 8.001, pcbY: 3.429, pcbRotation: 90, layer: "bottom" },
  C27: { pcbX: 7.747, pcbY: -4.953, pcbRotation: 0 },
  D4: { pcbX: 20.447, pcbY: -12.573, pcbRotation: 0 },
  J5: { pcbX: -22.479, pcbY: -2.921, pcbRotation: 270 },
  NT1: {
    pcbX: -5.3007,
    pcbY: -13.843,
    pcbRotation: 180,
    layer: "bottom",
  },
  NT2: { pcbX: -6.477, pcbY: -10.541, pcbRotation: 90 },
  NT3: { pcbX: -6.477, pcbY: -5.715, pcbRotation: 270 },
  NT4: { pcbX: -6.477, pcbY: -1.651, pcbRotation: 90 },
  NT5: { pcbX: -1.143, pcbY: 19.685, pcbRotation: 180 },
  NT6: { pcbX: -1.143, pcbY: 17.907, pcbRotation: 270 },
  Q2: { pcbX: -12.573, pcbY: -18.161, pcbRotation: 0 },
  Q4: { pcbX: -12.827, pcbY: -12.065, pcbRotation: 180 },
  Q6: { pcbX: -12.827, pcbY: 3.429, pcbRotation: 0 },
  Q7: { pcbX: -13.081, pcbY: -2.921, pcbRotation: 180 },
  Q8: { pcbX: -11.557, pcbY: 10.287, pcbRotation: 0 },
  Q9: { pcbX: -11.811, pcbY: 16.383, pcbRotation: 180 },
  R6: { pcbX: -6.477, pcbY: -12.573, pcbRotation: 270 },
  R7: { pcbX: 18.769, pcbY: 9.017, pcbRotation: 0 },
  R8: { pcbX: 13.335, pcbY: -6.223, pcbRotation: 180 },
  R9: { pcbX: -6.477, pcbY: -3.683, pcbRotation: 270 },
  R14: {
    pcbX: 19.939,
    pcbY: -18.923,
    pcbRotation: 90,
    layer: "bottom",
  },
  R15: {
    pcbX: 17.399,
    pcbY: -18.923,
    pcbRotation: 90,
    layer: "bottom",
  },
  R16: {
    pcbX: 22.479,
    pcbY: -18.923,
    pcbRotation: 90,
    layer: "bottom",
  },
  R17: { pcbX: -4.191, pcbY: 15.875, pcbRotation: 180 },
  U1: { pcbX: 12.573, pcbY: 4.445, pcbRotation: 180 },
} as const;

/**
 * Motor-driver section extracted from TIDA-01330 sheet 2.
 *
 * Scope: U1, its required local support networks, the current-sense output
 * protection, three SQJ858AEP half-bridges, Kelvin-connected current shunts
 * and the motor connector. The upstream input protection/filter and the
 * LaunchPad/demo interface circuitry are intentionally outside this block.
 */
export const MotorDriver_DRV8305_TIDA01330 = (props: SubcircuitProps) => (
  <subcircuit
    width="84mm"
    height="58mm"
    minTraceWidth="0.12mm"
    schMaxTraceDistance="4mm"
    {...props}
  >
    <net name="GND" isGroundNet />
    <net name="PVDD" isPowerNet />

    <DRV83053QPHPQ1
      name="U1"
      {...pcbPlacement.U1}
      schX={0}
      schY={0}
      schWidth={2.43}
      schHeight={13.0}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [
            15, 46, 41, 8, 12, 10, 11, 9, 1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 37,
            38,
          ],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [
            43, 42, 39, 40, 47, 48, 13, 44, 36, 35, 33, 34, 29, 31, 32, 30, 28,
            27, 25, 26, 23, 24, 21, 22, 19, 20, 14, 45, 49,
          ],
        },
      }}
      schPinStyle={{
        pin15: { marginBottom: 0.4 },
        pin46: { marginBottom: 0.4 },
        pin41: { marginBottom: 0.2 },
        pin8: { marginBottom: 0.1 },
        pin12: { marginBottom: 0.1 },
        pin10: { marginBottom: 0.1 },
        pin11: { marginBottom: 0.1 },
        pin9: { marginBottom: 0.1 },
        pin1: { marginBottom: 0.4 },
        pin2: { marginBottom: 0.4 },
        pin3: { marginBottom: 0.8 },
        pin4: { marginBottom: 0.4 },
        pin5: { marginBottom: 0.8 },
        pin6: { marginBottom: 0.4 },
        pin7: { marginBottom: 1.8 },
        pin16: { marginBottom: 0.4 },
        pin17: { marginBottom: 0.4 },
        pin18: { marginBottom: 0.6 },
        pin37: { marginBottom: 0.4 },
        pin43: { marginBottom: 0.4 },
        pin42: { marginBottom: 0.4 },
        pin39: { marginBottom: 0.25 },
        pin40: { marginBottom: 0.1 },
        pin47: { marginBottom: 0.1 },
        pin48: { marginBottom: 0.1 },
        pin13: { marginBottom: 0.1 },
        pin44: { marginBottom: 0.7 },
        pin36: { marginBottom: 0.4 },
        pin35: { marginBottom: 0.1 },
        pin33: { marginBottom: 0.1 },
        pin34: { marginBottom: 0.2 },
        pin29: { marginBottom: 0.4 },
        pin31: { marginBottom: 0.1 },
        pin32: { marginBottom: 0.1 },
        pin30: { marginBottom: 0.2 },
        pin28: { marginBottom: 0.4 },
        pin27: { marginBottom: 0.2 },
        pin25: { marginBottom: 0.2 },
        pin26: { marginBottom: 0.3 },
        pin23: { marginBottom: 0.2 },
        pin24: { marginBottom: 0.3 },
        pin21: { marginBottom: 0.2 },
        pin22: { marginBottom: 0.3 },
        pin19: { marginBottom: 0.2 },
        pin20: { marginBottom: 0.3 },
        pin14: { marginBottom: 0.1 },
        pin45: { marginBottom: 0.1 },
      }}
    />

    {/* AVDD, DVDD and PVDD bypassing, placed as in the reference. */}
    <capacitor
      name="C14"
      {...pcbPlacement.C14}
      capacitance="1uF"
      manufacturerPartNumber="C1608X7R1C105K080AC"
      footprint="0603"
      schX={-5.2}
      schY={5.6}
      schOrientation="vertical"
    />
    <capacitor
      name="C16"
      {...pcbPlacement.C16}
      capacitance="1uF"
      manufacturerPartNumber="C1608X7R1C105K080AC"
      footprint="0603"
      schX={-4.1}
      schY={5.0}
      schOrientation="vertical"
    />
    <capacitor
      name="C17"
      {...pcbPlacement.C17}
      capacitance="4.7uF"
      manufacturerPartNumber="GRM31CR71H475KA12L"
      footprint="1206"
      schX={-3.3}
      schY={4.4}
      schOrientation="vertical"
    />
    <trace from=".U1 > .AVDD" to=".C14 > .pin1" />
    <trace from=".U1 > .AVDD" to="net.AVDD" schDisplayLabel="AVDD" />
    <trace from=".U1 > .DVDD" to=".C16 > .pin1" />
    <trace from=".U1 > .DVDD" to="net.DVDD" schDisplayLabel="DVDD" />
    <trace from=".U1 > .PVDD" to=".C17 > .pin1" />
    <trace from=".U1 > .PVDD" to="net.PVDD" schDisplayLabel="PVDD" />
    <trace from=".C14 > .pin2" to=".C16 > .pin2" />
    <trace from=".C16 > .pin2" to=".C17 > .pin2" />
    <trace from=".C14 > .pin2" to="net.GND" schDisplayLabel="GND" />

    {/* Charge-pump flying capacitors. */}
    <capacitor
      name="C13"
      {...pcbPlacement.C13}
      capacitance="0.047uF"
      manufacturerPartNumber="C0603C473K1RACTU"
      footprint="0603"
      schX={2.8}
      schY={6.07}
      schOrientation="horizontal"
    />
    <capacitor
      name="C15"
      {...pcbPlacement.C15}
      capacitance="0.047uF"
      manufacturerPartNumber="C0603C473K1RACTU"
      footprint="0603"
      schX={2.8}
      schY={4.87}
      schOrientation="horizontal"
    />
    <trace from=".U1 > .CP1H" to=".C13 > .pin1" />
    <trace from=".U1 > .CP1L" to=".C13 > .pin2" />
    <trace from=".U1 > .CP2H" to=".C15 > .pin1" />
    <trace from=".U1 > .CP2L" to=".C15 > .pin2" />

    {/* PWRGD/reset and VDRAIN networks. */}
    <resistor
      name="R7"
      {...pcbPlacement.R7}
      resistance="56ohm"
      manufacturerPartNumber="CRCW040256R0JNED"
      footprint="0402"
      schX={3.5}
      schY={3.4}
    />
    <resistor
      name="R8"
      {...pcbPlacement.R8}
      resistance="100ohm"
      manufacturerPartNumber="CRCW0402100RFKED"
      footprint="0402"
      schX={3.0}
      schY={2.6}
    />
    <capacitor
      name="C18"
      {...pcbPlacement.C18}
      capacitance="1uF"
      maxDecouplingTraceLength="20mm"
      manufacturerPartNumber="C1608X7R1C105K080AC"
      footprint="0603"
      schX={5.0}
      schY={3}
      schOrientation="vertical"
    />
    {/* <schematicsymbol
      name="V3V3_RESET"
      displayName="3p3V"
      symbolName="rail_up"
      schX={5.0}
      schY={4.2}
    /> */}
    <trace
      name="PWRGD_U1"
      from=".U1 > .PWRGD"
      to="net.PWRGD"
      schDisplayLabel="PWRGD"
    />
    <trace from=".R7 > .pin1" to="net.PWRGD" />
    <trace from=".R7 > .pin2" to="net.nRESET" schDisplayLabel="nRESET" />
    {/* <trace from=".R7 > .pin2" to=".C18 > .pin1" /> */}
    <trace from=".C18 > .pin1" to="net.V3p3" schDisplayLabel="3p3V" />
    <trace from=".U1 > .VREG" to=".C18 > .pin1" />
    <trace from=".C18 > .pin2" to="net.GND" schDisplayLabel="GND" />
    <trace from=".U1 > .VDRAIN" to=".R8 > .pin1" />
    <trace from=".R8 > .pin2" to="net.PVDD" schDisplayLabel="PVDD" />

    {/* Current-amplifier output filters. */}
    <resistor
      name="R14"
      {...pcbPlacement.R14}
      resistance="56ohm"
      manufacturerPartNumber="CRCW040256R0JNED"
      footprint="0402"
      schX={-4}
      schY={-3.4}
    />
    <resistor
      name="R15"
      {...pcbPlacement.R15}
      resistance="56ohm"
      manufacturerPartNumber="CRCW040256R0JNED"
      footprint="0402"
      schX={-4}
      schY={-4.1}
    />
    <resistor
      name="R16"
      {...pcbPlacement.R16}
      resistance="56ohm"
      manufacturerPartNumber="CRCW040256R0JNED"
      footprint="0402"
      schX={-4}
      schY={-4.8}
    />
    <capacitor
      name="C22"
      {...pcbPlacement.C22}
      capacitance="2200pF"
      manufacturerPartNumber="GRM188R71C222KA01D"
      footprint="0603"
      schX={-7}
      schY={-6.2}
      schOrientation="vertical"
    />
    <capacitor
      name="C23"
      {...pcbPlacement.C23}
      capacitance="2200pF"
      manufacturerPartNumber="GRM188R71C222KA01D"
      footprint="0603"
      schX={-6}
      schY={-6.2}
      schOrientation="vertical"
    />
    <capacitor
      name="C24"
      {...pcbPlacement.C24}
      capacitance="2200pF"
      manufacturerPartNumber="GRM188R71C222KA01D"
      footprint="0603"
      schX={-5.1}
      schY={-6.2}
      schOrientation="vertical"
    />
    <trace from=".U1 > .SO1" to=".R14 > .pin2" />
    <trace from=".U1 > .SO2" to=".R15 > .pin2" />
    <trace from=".U1 > .SO3" to=".R16 > .pin2" />
    <trace from=".R14 > .pin1" to="net.ISNS_A" schDisplayLabel="ISNS_A" />
    <trace from=".R15 > .pin1" to="net.ISNS_B" schDisplayLabel="ISNS_B" />
    <trace from=".R16 > .pin1" to="net.ISNS_C" schDisplayLabel="ISNS_C" />
    <trace from=".R14 > .pin1" to=".C22 > .pin1" />
    <trace from=".R15 > .pin1" to=".C23 > .pin1" />
    <trace from=".R16 > .pin1" to=".C24 > .pin1" />
    <trace from=".C22 > .pin2" to=".C23 > .pin2" />
    <trace from=".C23 > .pin2" to=".C24 > .pin2" />
    <trace from=".C24 > .pin2" to=".C26 > .pin2" />

    {/* Schottky clamps protecting the three current-sense outputs. */}
    <BAT54CDW_7_F
      name="D4"
      {...pcbPlacement.D4}
      footprint="sot363"
      schX={-10.5}
      schY={-4.85}
      schWidth={1.85}
      schHeight={2.3}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [1, 2, 3],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: [6, 5, 4],
        },
      }}
    />
    <trace from=".D4 > .pin1" to="net.ISNS_B" schDisplayLabel="ISNS_B" />
    <trace from=".D4 > .pin2" to="net.ISNS_A" schDisplayLabel="ISNS_A" />
    <trace from=".D4 > .pin3" to="net.V3p3" schDisplayLabel="3p3V" />
    <trace from=".D4 > .pin5" to="net.ISNS_C" schDisplayLabel="ISNS_C" />
    <trace from=".D4 > .pin6" to="net.V3p3" schDisplayLabel="3p3V" />

    {/* Low-side and main charge-pump reservoirs. */}
    <capacitor
      name="C26"
      {...pcbPlacement.C26}
      capacitance="1uF"
      maxDecouplingTraceLength="40mm"
      manufacturerPartNumber="C1608X7R1C105K080AC"
      footprint="0603"
      schX={-3.9}
      schY={-6.3}
      schOrientation="vertical"
    />
    <capacitor
      name="C27"
      {...pcbPlacement.C27}
      capacitance="2.2uF"
      manufacturerPartNumber="GRM32ER72A225KA35L"
      footprint="1210"
      schX={-2.4}
      schY={-6.05}
    />
    <trace from=".U1 > .VCP_LSD" to=".C26 > .pin1" />
    <trace from=".C26 > .pin2" to="net.GND" schDisplayLabel="GND" />
    <trace
      name="VCPH_U1"
      from=".U1 > .VCPH"
      to="net.VCPH"
      schDisplayLabel="VCPH"
    />
    <trace from=".C27 > .pin2" to="net.VCPH" />
    <trace from=".C27 > .pin1" to="net.PVDD" schDisplayLabel="PVDD" />

    {/* Differential shunt-input filters. */}
    <capacitor
      name="C20"
      {...pcbPlacement.C20}
      capacitance="1000pF"
      manufacturerPartNumber="GRM188R71C102KA01D"
      footprint="0603"
      schX={3.5}
      schY={-2.5}
      schOrientation="vertical"
    />
    <capacitor
      name="C21"
      {...pcbPlacement.C21}
      capacitance="1000pF"
      manufacturerPartNumber="GRM188R71C102KA01D"
      footprint="0603"
      schX={3.5}
      schY={-3.8}
      schOrientation="vertical"
    />
    <capacitor
      name="C25"
      {...pcbPlacement.C25}
      capacitance="1000pF"
      manufacturerPartNumber="GRM188R71C102KA01D"
      footprint="0603"
      schX={3.5}
      schY={-5.2}
      schOrientation="vertical"
    />
    <trace from=".U1 > .SN1" to=".C20 > .pin1" />
    <trace from=".U1 > .SP1" to=".C20 > .pin2" />
    <trace from=".U1 > .SN2" to=".C21 > .pin1" />
    <trace from=".U1 > .SP2" to=".C21 > .pin2" />
    <trace from=".U1 > .SN3" to=".C25 > .pin1" />
    <trace from=".U1 > .SP3" to=".C25 > .pin2" />
    <trace from=".C20 > .pin1" to="net.S1_N" />
    <trace from=".C20 > .pin2" to="net.S1_P" />
    <trace from=".C21 > .pin1" to="net.S2_N" />
    <trace from=".C21 > .pin2" to="net.S2_P" />
    <trace from=".C25 > .pin1" to="net.S3_N" />
    <trace from=".C25 > .pin2" to="net.S3_P" />

    {/* U1 ground pins. */}
    <trace from=".U1 > .GND3" to=".U1 > .GND2" />
    <trace from=".U1 > .GND2" to=".U1 > .GND1" />
    <trace from=".U1 > .GND1" to="net.GND" schDisplayLabel="GND" />

    {/* Left-side control and current-sense boundary nets. */}
    <trace from=".U1 > .nFAULT" to="net.nFAULT" />
    <trace
      name="U1_TILT_P"
      from=".U1 > .SCLK"
      to="net.TILT_P"
      schDisplayLabel="TILT+"
    />
    <trace from=".U1 > .SDI" to="net.BACK" />
    <trace from=".U1 > .SDO" to="net.FWD" />
    <trace from=".U1 > .nSCS" to="net.nCS" schDisplayLabel="nCS" />
    <trace from=".U1 > .EN_GATE" to="net.EN_GATE" />
    <trace from=".U1 > .INHA" to="net.AH" />
    <trace from=".U1 > .INLA" to="net.AL" />
    <trace from=".U1 > .INHB" to="net.BH" />
    <trace from=".U1 > .INLB" to="net.BL" />
    <trace from=".U1 > .INHC" to="net.CH" />
    <trace from=".U1 > .INLC" to="net.CL" />

    {/* Gate-driver outputs retain the Altium net names used by the bridges. */}
    <trace from=".U1 > .WAKE" to="net.WAKE" />
    <trace from=".U1 > .GHA" to="net.GH_A" />
    <trace
      name="MOT_A_U1"
      from=".U1 > .SHA"
      to="net.MOT_A"
      schDisplayLabel="MOT_A"
    />
    <trace from=".U1 > .GLA" to="net.GL_A" />
    <trace from=".U1 > .SLA" to="net.SL_A" />
    <trace from=".U1 > .GHB" to="net.GH_B" />
    <trace from=".U1 > .SLB" to="net.SL_B" />
    <trace from=".U1 > .GLB" to="net.GL_B" />
    <trace
      name="MOT_B_U1"
      from=".U1 > .SHB"
      to="net.MOT_B"
      schDisplayLabel="MOT_B"
    />
    <trace from=".U1 > .GHC" to="net.GH_C" />
    <trace
      name="MOT_C_U1"
      from=".U1 > .SHC"
      to="net.MOT_C"
      schDisplayLabel="MOT_C"
    />
    <trace from=".U1 > .GLC" to="net.GL_C" />
    <trace from=".U1 > .SLC" to="net.SL_C" />

    {/* Phase A half-bridge, shunt and Kelvin sense connections. */}
    <capacitor
      name="C1"
      {...pcbPlacement.C1}
      capacitance="1uF"
      manufacturerPartNumber="UMK107AB7105KA-T"
      footprint="0603"
      schX={9.6}
      schY={8.9}
      schOrientation="vertical"
    />
    <SQJ858AEP_T1_GE3
      name="Q2"
      {...pcbPlacement.Q2}
      schX={11.3}
      schY={8.55}
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
    />
    <SQJ858AEP_T1_GE3
      name="Q4"
      {...pcbPlacement.Q4}
      schX={11.3}
      schY={6.95}
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
    />
    <resistor
      name="R6"
      {...pcbPlacement.R6}
      resistance="0.015ohm"
      manufacturerPartNumber="CRA2512-FZ-R015ELF"
      footprint="2512"
      schX={11.75}
      schY={5.0}
      schOrientation="vertical"
    />
    <NetTie name="NT1" schX={9.6} schY={5.4} {...pcbPlacement.NT1} />
    <NetTie name="NT2" schX={9.6} schY={4.6} {...pcbPlacement.NT2} />
    <trace from=".C1 > .pin1" to="net.PVDD" schDisplayLabel="PVDD" />
    <trace from=".C1 > .pin2" to="net.GND" schDisplayLabel="GND" />
    <trace from=".Q2 > .drain" to="net.PVDD" schDisplayLabel="PVDD" />
    <trace from=".Q2 > .gate" to="net.GH_A" schDisplayLabel="GH_A" />
    <trace
      from=".Q2 > .source"
      to=".Q4 > .drain"
      pcbPathRelativeTo=".Q2 > .source"
      pcbPath={[
        ".Q2 > .source",
        { x: -2, y: 1 },
        { x: -2, y: 7 },
        ".Q4 > .drain",
      ]}
    />
    <trace
      name="MOT_A_Q2"
      from=".Q2 > .source"
      to="net.MOT_A"
      schDisplayLabel="MOT_A"
    />
    <trace from=".Q4 > .gate" to="net.GL_A" schDisplayLabel="GL_A" />
    <trace from=".Q4 > .source" to=".R6 > .pin2" />
    <trace from=".Q4 > .source" to="net.SL_A" schDisplayLabel="SL_A" />
    <trace from=".R6 > .pin1" to="net.GND" schDisplayLabel="GND" />
    <trace from=".NT1 > .pin1" to="net.S1_N" schDisplayLabel="S1_N" />
    <trace from=".NT1 > .pin2" to="net.SL_A" />
    <trace from=".NT2 > .pin1" to="net.S1_P" schDisplayLabel="S1_P" />
    <trace from=".NT2 > .pin2" to="net.GND" />

    {/* Phase B half-bridge, shunt and Kelvin sense connections. */}
    <capacitor
      name="C12"
      {...pcbPlacement.C12}
      capacitance="1uF"
      manufacturerPartNumber="UMK107AB7105KA-T"
      footprint="0603"
      schX={8.3}
      schY={3.3}
      schOrientation="vertical"
    />
    <SQJ858AEP_T1_GE3
      name="Q6"
      {...pcbPlacement.Q6}
      schX={10.1}
      schY={2.95}
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
    />
    <SQJ858AEP_T1_GE3
      name="Q7"
      {...pcbPlacement.Q7}
      schX={10.1}
      schY={1.35}
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
    />
    <resistor
      name="R9"
      {...pcbPlacement.R9}
      resistance="0.015ohm"
      manufacturerPartNumber="CRA2512-FZ-R015ELF"
      footprint="2512"
      schX={10.55}
      schY={-0.6}
      schOrientation="vertical"
    />
    <NetTie name="NT3" schX={8.4} schY={-0.2} {...pcbPlacement.NT3} />
    <NetTie name="NT4" schX={8.4} schY={-1.0} {...pcbPlacement.NT4} />
    <trace from=".C12 > .pin1" to="net.PVDD" schDisplayLabel="PVDD" />
    <trace from=".C12 > .pin2" to="net.GND" schDisplayLabel="GND" />
    <trace from=".Q6 > .drain" to="net.PVDD" schDisplayLabel="PVDD" />
    <trace from=".Q6 > .gate" to="net.GH_B" />
    <trace from=".Q6 > .source" to=".Q7 > .drain" />
    <trace
      name="MOT_B_Q6"
      from=".Q6 > .source"
      to="net.MOT_B"
      schDisplayLabel="MOT_B"
    />
    <trace from=".Q7 > .gate" to="net.GL_B" schDisplayLabel="GL_B" />
    <trace from=".Q7 > .source" to=".R9 > .pin2" />
    <trace from=".Q7 > .source" to="net.SL_B" schDisplayLabel="SL_B" />
    <trace from=".R9 > .pin1" to="net.GND" schDisplayLabel="GND" />
    <trace from=".NT3 > .pin1" to="net.S2_N" schDisplayLabel="S2_N" />
    <trace from=".NT3 > .pin2" to="net.SL_B" />
    <trace from=".NT4 > .pin1" to="net.S2_P" schDisplayLabel="S2_P" />
    <trace from=".NT4 > .pin2" to="net.GND" />

    {/* Phase C half-bridge, shunt and Kelvin sense connections. */}
    <capacitor
      name="C19"
      {...pcbPlacement.C19}
      capacitance="1uF"
      manufacturerPartNumber="UMK107AB7105KA-T"
      footprint="0603"
      schX={7.2}
      schY={-2.2}
      schOrientation="vertical"
    />
    <SQJ858AEP_T1_GE3
      name="Q8"
      {...pcbPlacement.Q8}
      schX={9.0}
      schY={-2.55}
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
    />
    <SQJ858AEP_T1_GE3
      name="Q9"
      {...pcbPlacement.Q9}
      schX={9.0}
      schY={-4.15}
      symbolDrainSide="top"
      symbolSourceSide="bottom"
      symbolGateSide="left"
    />
    <resistor
      name="R17"
      {...pcbPlacement.R17}
      resistance="0.015ohm"
      manufacturerPartNumber="CRA2512-FZ-R015ELF"
      footprint="2512"
      schX={9.45}
      schY={-6.1}
      schOrientation="vertical"
    />
    <NetTie name="NT5" schX={7.3} schY={-5.7} {...pcbPlacement.NT5} />
    <NetTie name="NT6" schX={7.3} schY={-6.5} {...pcbPlacement.NT6} />
    <trace from=".C19 > .pin1" to="net.PVDD" schDisplayLabel="PVDD" />
    <trace from=".C19 > .pin2" to="net.GND" schDisplayLabel="GND" />
    <trace from=".Q8 > .drain" to="net.PVDD" schDisplayLabel="PVDD" />
    <trace from=".Q8 > .gate" to="net.GH_C" schDisplayLabel="GH_C" />
    <trace from=".Q8 > .source" to=".Q9 > .drain" />
    <trace
      name="MOT_C_Q8"
      from=".Q8 > .source"
      to="net.MOT_C"
      schDisplayLabel="MOT_C"
    />
    <trace from=".Q9 > .gate" to="net.GL_C" schDisplayLabel="GL_C" />
    <trace from=".Q9 > .source" to=".R17 > .pin2" />
    <trace from=".Q9 > .source" to="net.SL_C" schDisplayLabel="SL_C" />
    <trace from=".R17 > .pin1" to="net.GND" schDisplayLabel="GND" />
    <trace from=".NT5 > .pin1" to="net.S3_N" schDisplayLabel="S3_N" />
    <trace from=".NT5 > .pin2" to="net.SL_C" />
    <trace from=".NT6 > .pin1" to="net.S3_P" schDisplayLabel="S3_P" />
    <trace from=".NT6 > .pin2" to="net.GND" />

    {/* Two brushed-motor outputs, preserving the J5 pin order. */}
    <connector
      name="J5"
      {...pcbPlacement.J5}
      pinCount={6}
      manufacturerPartNumber="1729160"
      schX={14.2}
      schY={-2.9}
      schWidth={0.5}
      schHeight={1.4}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [1, 2, 3, 4, 5, 6],
        },
      }}
      footprint={
        <footprint insertionDirection="from_above">
          <platedhole
            portHints={["pin1"]}
            pcbX="-12.7mm"
            pcbY="0mm"
            shape="circle"
            holeDiameter="1.3mm"
            outerDiameter="2.5mm"
          />
          <platedhole
            portHints={["pin2"]}
            pcbX="-7.62mm"
            pcbY="0mm"
            shape="circle"
            holeDiameter="1.3mm"
            outerDiameter="2.5mm"
          />
          <platedhole
            portHints={["pin3"]}
            pcbX="-2.54mm"
            pcbY="0mm"
            shape="circle"
            holeDiameter="1.3mm"
            outerDiameter="2.5mm"
          />
          <platedhole
            portHints={["pin4"]}
            pcbX="2.54mm"
            pcbY="0mm"
            shape="circle"
            holeDiameter="1.3mm"
            outerDiameter="2.5mm"
          />
          <platedhole
            portHints={["pin5"]}
            pcbX="7.62mm"
            pcbY="0mm"
            shape="circle"
            holeDiameter="1.3mm"
            outerDiameter="2.5mm"
          />
          <platedhole
            portHints={["pin6"]}
            pcbX="12.7mm"
            pcbY="0mm"
            shape="circle"
            holeDiameter="1.3mm"
            outerDiameter="2.5mm"
          />
        </footprint>
      }
    />
    <trace
      name="MOT_C_J5_1"
      from=".J5 > .pin1"
      to="net.MOT_C"
      schDisplayLabel="MOT_C"
    />
    <trace
      name="MOT_B_J5_2"
      from=".J5 > .pin2"
      to="net.MOT_B"
      schDisplayLabel="MOT_B"
    />
    <trace
      name="MOT_C_J5_3"
      from=".J5 > .pin3"
      to="net.MOT_C"
      schDisplayLabel="MOT_C"
    />
    <trace
      name="MOT_A_J5_4"
      from=".J5 > .pin4"
      to="net.MOT_A"
      schDisplayLabel="MOT_A"
    />
    <trace
      name="MOT_B_J5_5"
      from=".J5 > .pin5"
      to="net.MOT_B"
      schDisplayLabel="MOT_B"
    />
    <trace
      name="MOT_A_J5_6"
      from=".J5 > .pin6"
      to="net.MOT_A"
      schDisplayLabel="MOT_A"
    />
  </subcircuit>
);

export default MotorDriver_DRV8305_TIDA01330;
