import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { A_282834_2 } from "../chips/A_282834_2.circuit.tsx";
import { BC846BLT1G } from "../chips/BC846BLT1G.circuit.tsx";

/**
 * TIDA-01330 Altium component origins cropped around the discrete light-driver
 * cluster. The crop only translates the group; its relative placement and
 * rotations are unchanged from the supplied PcbDoc.
 */
const pcbPlacement = {
  J1: { pcbX: -5.08, pcbY: -0.508, pcbRotation: 270 },
  Q5: { pcbX: 1.016, pcbY: -2.032, pcbRotation: 270 },
  R3: { pcbX: 1.016, pcbY: 1.27, pcbRotation: 180 },
  R4: { pcbX: 5.08, pcbY: 2.032, pcbRotation: 180 },
} as const;

/**
 * The two track crossings and the ground via are transformed directly from
 * the cropped TIDA-01330 Altium layout.
 */
const pcbBreakout = {
  PVDD: { pcbX: 9, pcbY: -3.306 },
  LED: { pcbX: 9, pcbY: 1.3876 },
  Q5_GND_VIA: { pcbX: -1.016, pcbY: -0.762 },
} as const;

const LedTerminalBlock = () => (
  <A_282834_2
    name="J1"
    schX={3.4}
    schY={1.8}
    {...pcbPlacement.J1}
    footprint="radial_p2.54mm_od1.6mm_id1.1mm"
    symbol={
      <symbol>
        <schematicrect
          schX={0}
          schY={0}
          width={0.55}
          height={0.72}
          strokeWidth={0.025}
        />
        <schematiccircle
          center={{ x: 0.08, y: 0.2 }}
          radius={0.065}
          strokeWidth={0.025}
        />
        <schematiccircle
          center={{ x: 0.08, y: -0.2 }}
          radius={0.065}
          strokeWidth={0.025}
        />
        <schematictext
          text="1"
          schX={-0.18}
          schY={0.2}
          fontSize={0.14}
          anchor="center"
        />
        <schematictext
          text="2"
          schX={-0.18}
          schY={-0.2}
          fontSize={0.14}
          anchor="center"
        />
        <port
          name="pin1"
          pinNumber={1}
          direction="left"
          schX={-0.48}
          schY={0.2}
          schStemLength={0.2}
        />
        <port
          name="pin2"
          pinNumber={2}
          direction="left"
          schX={-0.48}
          schY={-0.2}
          schStemLength={0.2}
        />
      </symbol>
    }
  />
);

/**
 * Light-driver subsection extracted from TIDA-01330 sheet 2.
 *
 * Scope: the complete discrete LED sink driver only. The LED itself is an
 * external load connected through J1, while LED and PVDD are the MCU/power
 * boundary nets from the Seat Position Module block diagram.
 */
export const LightDriver_TIDA01330 = (props: SubcircuitProps) => (
  <subcircuit
    width="19mm"
    height="10mm"
    minTraceWidth="0.12mm"
    schMaxTraceDistance="5mm"
    {...props}
  >
    <net name="GND" isGroundNet />
    <net name="PVDD" isPowerNet />
    <net name="LED" />
    <net name="LEDanode" />
    <net name="LEDcathode" />

    <group name="ReferenceCropBreakouts">
      <breakoutpoint connection="net.PVDD" {...pcbBreakout.PVDD} />
      <breakoutpoint connection="net.LED" {...pcbBreakout.LED} />
      <breakoutpoint connection=".Q5 > .pin2" {...pcbBreakout.Q5_GND_VIA} />
    </group>
    <via
      name="Q5_GND_VIA"
      connectsTo="net.GND"
      fromLayer="top"
      toLayer="bottom"
      outerDiameter="0.5588mm"
      holeDiameter="0.254mm"
      {...pcbBreakout.Q5_GND_VIA}
    />

    <resistor
      name="R3"
      resistance="330ohm"
      manufacturerPartNumber="CRCW1206330RJNEA"
      footprint="res_p2.9mm_pw1.85mm_ph1.3mm_w3.2mm_h1.6mm"
      schX={-2.1}
      schY={2}
      {...pcbPlacement.R3}
    />
    <trace from=".R3 > .pin1" to="net.PVDD" schDisplayLabel="PVDD" />

    <resistor
      name="R4"
      resistance="1kohm"
      manufacturerPartNumber="CRCW04021K00JNED"
      footprint="res_p1.2mm_pw0.6mm_ph0.8mm_w1mm_h0.5mm"
      schX={-2.1}
      schY={0}
      {...pcbPlacement.R4}
    />
    <trace
      name="LED_INPUT"
      from=".R4 > .pin1"
      to="net.LED"
      schDisplayLabel="LED"
    />

    <BC846BLT1G
      name="Q5"
      schX={0}
      schY={0}
      {...pcbPlacement.Q5}
      footprint="sot23_w2.4mm_p0.95mm_pw0.6mm_pl1mm"
      showPinAliases={false}
    />
    <trace from=".R4 > .pin2" to=".Q5 > .pin1" />
    <trace from=".Q5 > .pin2" to="net.GND" schDisplayLabel="GND" />

    <LedTerminalBlock />
    <trace
      name="LED_ANODE_PATH"
      path={[".R3 > .pin2", ".J1 > .pin1", "net.LEDanode"]}
      schDisplayLabel="LEDanode"
    />
    <trace
      name="LED_CATHODE_PATH"
      path={[".Q5 > .pin3", ".J1 > .pin2", "net.LEDcathode"]}
      schDisplayLabel="LEDcathode"
    />

    <schematictext
      text="Q5"
      schX={0.55}
      schY={0.5}
      fontSize={0.2}
      anchor="left"
    />
    <schematictext
      text="BC846BLT1G"
      schX={0.55}
      schY={0.22}
      fontSize={0.18}
      anchor="left"
    />
    <schematictext
      text="J1"
      schX={3.4}
      schY={2.35}
      fontSize={0.2}
      anchor="center"
    />
    <schematictext
      text="282834-2"
      schX={3.4}
      schY={1.25}
      fontSize={0.18}
      anchor="center"
    />
  </subcircuit>
);

export default LightDriver_TIDA01330;
