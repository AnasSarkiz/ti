import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";
import { CoaxialTestPort } from "../chips/CoaxialTestPort.circuit.tsx";
import { Header2x10 } from "../chips/Header2x10.circuit.tsx";
import { OscillatorCrystal4 } from "../chips/OscillatorCrystal4.circuit.tsx";
import { TPS61222 } from "../chips/TPS61222.circuit.tsx";
import { TRF7960RHB } from "../chips/TRF7960RHB.circuit.tsx";

export const RFIDReader_TRF7960 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <schematictext
      schX={0}
      schY={14.2}
      text="TRF7960TB HF RFID Reader Module"
      fontSize={1.0}
    />

    <TRF7960RHB
      name="U1"
      schX={-2.5}
      schY={0}
      connections={{
        pin1: "net.VDD_A",
        pin2: "net.VIN_5V",
        pin3: "net.VDD",
        pin4: "net.VDD",
        pin5: "net.TX_OUT",
        pin6: "net.GND",
        pin7: "net.GND",
        pin8: "net.RX_IN1",
        pin9: "net.RX_IN2",
        pin10: "net.GND",
        pin11: "net.BAND_GAP",
        pin12: "net.ASK_OOK",
        pin13: "net.IRQ",
        pin14: "net.MOD",
        pin15: "net.GND",
        pin16: "net.VDD_X",
        pin17: "net.GND",
        pin21: "net.SLAVE_SELECT",
        pin23: "net.MISO",
        pin24: "net.MOSI",
        pin25: "net.EN2",
        pin26: "net.DATA_CLK",
        pin27: "net.SYS_CLK",
        pin28: "net.EN",
        pin29: "net.GND",
        pin30: "net.OSC_OUT",
        pin31: "net.OSC_IN",
        pin32: "net.VDD_X",
        pin33: "net.GND",
      }}
    />

    <schematictext
      schX={-2.5}
      schY={0}
      text="TRF7960 / TRF7970"
      fontSize={0.22}
    />

    <Header2x10
      name="P1"
      displayName="RF1"
      schX={-14}
      schY={5.3}
      connections={{
        pin1: "net.GND",
        pin3: "net.MOD",
        pin7: "net.IRQ",
        pin9: "net.SYS_CLK",
        pin10: "net.EN",
        pin12: "net.EN2",
        pin14: "net.SLAVE_SELECT",
        pin16: "net.DATA_CLK",
        pin18: "net.MOSI",
        pin19: "net.GND",
        pin20: "net.MISO",
      }}
    />

    <testpoint
      name="TP9"
      schX={-20.0}
      schY={11.8}
      connections={{ pin1: "net.MOD" }}
      schRotation={90}
    />

    <testpoint
      name="TP10"
      schX={-17.8}
      schY={11.8}
      connections={{ pin1: "net.IRQ" }}
      schRotation={90}
    />

    <testpoint
      name="TP11"
      schX={-15.4}
      schY={11.8}
      connections={{ pin1: "net.SYS_CLK" }}
      schRotation={90}
    />

    <testpoint
      name="TP12"
      schX={-11.7}
      schY={11.8}
      connections={{ pin1: "net.MISO" }}
      schRotation={90}
    />

    <testpoint
      name="TP13"
      schX={-9.6}
      schY={11.8}
      connections={{ pin1: "net.MOSI" }}
      schRotation={90}
    />

    <testpoint
      name="TP14"
      schX={-7.5}
      schY={11.8}
      connections={{ pin1: "net.SLAVE_SELECT" }}
      schRotation={90}
    />

    <testpoint
      name="TP15"
      schX={-5.4}
      schY={11.8}
      connections={{ pin1: "net.DATA_CLK" }}
      schRotation={90}
    />

    <resistor
      name="R3"
      resistance="10k"
      footprint="0603"
      schX={-6.1}
      schY={8.7}
      schOrientation="vertical"
      connections={{
        pin1: "net.EN",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R4"
      resistance="10k"
      footprint="0603"
      schX={-4.4}
      schY={8.7}
      schOrientation="vertical"
      connections={{
        pin1: "net.EN2",
        pin2: "net.GND",
      }}
    />

    <resistor
      name="R1"
      resistance="10k"
      footprint="0603"
      schX={-10.0}
      schY={-1.8}
      schRotation={90}
      connections={{
        pin1: "net.VDD_X",
        pin2: "U1.pin19",
      }}
    />

    <resistor
      name="R2"
      resistance="10k"
      footprint="0603"
      schX={-8.2}
      schY={-1.8}
      schRotation={90}
      connections={{
        pin1: "net.VDD_X",
        pin2: "U1.pin18",
      }}
    />

    <OscillatorCrystal4
      name="OSC1"
      schX={2.9}
      schY={4.4}
      connections={{
        pin1: "net.OSC_OUT",
        pin2: "net.GND",
        pin3: "net.OSC_IN",
        pin4: "net.GND",
      }}
    />

    <capacitor
      name="C11"
      capacitance="27pF"
      footprint="0603"
      schX={2.9}
      schY={6.0}
      connections={{
        pin1: "net.OSC_OUT",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C12"
      capacitance="27pF"
      footprint="0603"
      schX={2.9}
      schY={2.9}
      connections={{
        pin1: "net.OSC_IN",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C13"
      capacitance="1500pF"
      footprint="0603"
      schX={4.2}
      schY={2.6}
      schOrientation="horizontal"
      connections={{
        pin1: "net.TX_OUT",
        pin2: "net.TX_SERIES",
      }}
    />

    <capacitor
      name="C14"
      capacitance="1500pF"
      footprint="0603"
      schX={4.2}
      schY={1.6}
      schOrientation="horizontal"
      connections={{
        pin1: "net.TX_OUT",
        pin2: "net.TX_SERIES",
      }}
    />

    <inductor
      name="L1"
      inductance="150nH"
      schX={7.5}
      schY={2.6}
      schOrientation="horizontal"
      connections={{
        pin1: "net.TX_SERIES",
        pin2: "net.MATCH_A",
      }}
    />

    <capacitor
      name="C15"
      capacitance="1200pF"
      footprint="0603"
      schX={9.2}
      schY={1.9}
      schOrientation="vertical"
      connections={{
        pin1: "net.MATCH_A",
        pin2: "net.RX_IN1",
      }}
    />

    <capacitor
      name="C16"
      capacitance="1200pF"
      footprint="0603"
      schX={9.2}
      schY={-0.6}
      schOrientation="vertical"
      connections={{
        pin1: "net.RX_IN1",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C17"
      capacitance="680pF"
      footprint="0603"
      schX={10.8}
      schY={1.0}
      schOrientation="vertical"
      connections={{
        pin1: "net.MATCH_A",
        pin2: "net.GND",
      }}
    />

    <inductor
      name="L2"
      inductance="330nH"
      schX={12.2}
      schY={2.6}
      schOrientation="horizontal"
      connections={{
        pin1: "net.MATCH_A",
        pin2: "net.MATCH_B",
      }}
    />

    <capacitor
      name="C18"
      capacitance="10pF"
      footprint="0603"
      schX={12.2}
      schY={3.6}
      schOrientation="horizontal"
      connections={{
        pin1: "net.MATCH_A",
        pin2: "net.MATCH_B",
      }}
    />

    <capacitor
      name="C19"
      capacitance="220pF"
      footprint="0603"
      schX={13.8}
      schY={1.9}
      schOrientation="vertical"
      connections={{
        pin1: "net.MATCH_B",
        pin2: "net.RX_IN2",
      }}
    />

    <capacitor
      name="C20"
      capacitance="680pF"
      footprint="0603"
      schX={13.8}
      schY={-0.6}
      schOrientation="vertical"
      connections={{
        pin1: "net.RX_IN2",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C21"
      capacitance="100pF"
      footprint="0603"
      schX={15.2}
      schY={1.0}
      schOrientation="vertical"
      connections={{
        pin1: "net.MATCH_B",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C22"
      capacitance="27pF"
      footprint="0603"
      schX={16.6}
      schY={1.0}
      schOrientation="vertical"
      connections={{
        pin1: "net.MATCH_B",
        pin2: "net.GND",
      }}
    />

    <testpoint
      name="TP8"
      schX={15.2}
      schY={5.2}
      connections={{ pin1: "net.MATCH_B" }}
    />

    <testpoint
      name="TP5"
      schX={4}
      schY={-3.2}
      connections={{ pin1: "net.GND" }}
      schRotation={90}
    />

    <testpoint
      name="TP6"
      schX={6}
      schY={-3.2}
      connections={{ pin1: "net.RX_IN1" }}
      schRotation={90}
    />

    <testpoint
      name="TP7"
      schX={8}
      schY={-3.2}
      connections={{ pin1: "net.RX_IN2" }}
      schRotation={90}
    />

    <resistor
      name="R5"
      resistance="0ohm"
      footprint="0603"
      schX={18.3}
      schY={2.6}
      schOrientation="horizontal"
      connections={{
        pin1: "net.MATCH_B",
        pin2: "net.RF_50",
      }}
    />

    <chip
      name="J1"
      displayName="COAXIAL TEST PORT"
      symbol={
        <symbol>
          {/* Square connector body */}

          <schematicrect
            schX={20.2}
            schY={0.7}
            width={1.6}
            height={1.6}
            strokeWidth="0.04"
            color="#c77700"
            isFilled={false}
          />

          {/* Circular socket */}

          <schematiccircle
            center={{ x: 20.2, y: 0.7 }}
            radius={0.4}
            strokeWidth="0.04"
            color="#c77700"
            isFilled={false}
          />

          <schematiccircle
            center={{ x: 20.2, y: 0.7 }}
            radius={0.3}
            strokeWidth="0.04"
            color="#c77700"
            isFilled={false}
          />

          {/* Center contact */}

          {/* Small line inside center contact */}

          <schematicline
            x1={20.2}
            y1={0.7}
            x2={20.2}
            y2={1.5}
            strokeWidth="0.04"
            color="#c77700"
          />
          <schematicline
            x1={19.8}
            y1={0.7}
            x2={19.4}
            y2={0.7}
            strokeWidth="0.04"
            color="#c77700"
          />
          {/* Center contact to pin 1 */}
          <port
            name="pin1"
            schX={18.6}
            schY={1.1}
            direction="left"
            schStemLength={0.8}
          />
          <port
            name="pin2"
            schX={20.2}
            schY={2.3}
            direction="up"
            schStemLength={0.8}
          />
          <port
            name="pin3"
            schX={18.6}
            schY={0.3}
            direction="left"
            schStemLength={0.8}
          />
        </symbol>
      }
      connections={{
        pin1: "net.GND",
        pin2: "net.RF_50",
        pin3: "net.GND",
      }}
    />

    <capacitor
      name="C23"
      capacitance="68pF"
      footprint="0603"
      schX={23.2}
      schY={3.2}
      schOrientation="horizontal"
      connections={{
        pin1: "net.RF_50",
        pin2: "net.ANT_FEED",
      }}
    />

    <capacitor
      name="C27"
      capacitance="1pF"
      footprint="0603"
      doNotPlace
      schX={23.2}
      schY={4.8}
      schOrientation="horizontal"
      connections={{
        pin1: "net.RF_50",
        pin2: "net.ANT_FEED",
      }}
    />
    <schematicrect
      schX={27.2}
      schY={1.6}
      width={10}
      height={8}
      isDashed={true}
      strokeWidth={0.04}
    />
    <resistor
      name="R6"
      resistance="680ohm"
      footprint="0603"
      schX={25}
      schY={1.6}
      schOrientation="vertical"
      connections={{
        pin1: "net.ANT_FEED",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C24"
      capacitance="82pF"
      footprint="0603"
      schX={26.7}
      schY={1.6}
      schOrientation="vertical"
      connections={{
        pin1: "net.ANT_FEED",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C28"
      capacitance="2pF"
      footprint="0603"
      doNotPlace
      schX={28.2}
      schY={1.6}
      schOrientation="vertical"
      connections={{
        pin1: "net.ANT_FEED",
        pin2: "net.GND",
      }}
    />

    <chip
      name="ANT1"
      symbol={
        <symbol>
          {/* Square connector body */}

          <schematicrect
            schX={31.2}
            schY={1.6}
            width={1.6}
            height={1.6}
            strokeWidth="0.04"
            color="#c77700"
            isFilled={false}
          />
          <schematicpath
            points={[
              { x: 31.35, y: 1.8 },
              { x: 31.35, y: 1.3 },
              { x: 31.5, y: 1.3 },
              { x: 31.5, y: 1.9 },
              { x: 31.3, y: 1.9 },
              { x: 31.3, y: 1.25 },
              { x: 31.55, y: 1.25 },
              { x: 31.55, y: 1.95 },
              { x: 31.05, y: 1.95 },
            ]}
            isFilled={false}
            strokeWidth="0.02"
          />

          <port
            name="pin1"
            schX={29.6}
            schY={2}
            direction="left"
            schStemLength={0.8}
          />

          <port
            name="pin2"
            schX={29.6}
            schY={1.2}
            direction="left"
            schStemLength={0.8}
          />
        </symbol>
      }
      connections={{
        pin1: "net.ANT_FEED",
        pin2: "net.GND",
      }}
    />

    <testpoint
      name="TP1"
      schX={-19.6}
      schY={-5.2}
      connections={{ pin1: "net.VIN_5V" }}
      schRotation={90}
    />

    <testpoint
      name="TP2"
      schX={-15.6}
      schY={-5.2}
      connections={{ pin1: "net.VDD_X" }}
      schRotation={90}
    />

    <testpoint
      name="TP3"
      schX={-11.6}
      schY={-5.2}
      connections={{ pin1: "net.BAND_GAP" }}
      schRotation={90}
    />

    <capacitor
      name="C1"
      capacitance="2.2uF"
      footprint="0603"
      schX={-20.0}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.VIN_5V",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C2"
      capacitance="0.01uF"
      footprint="0603"
      schX={-18.7}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.VIN_5V",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C3"
      capacitance="2.2uF"
      footprint="0603"
      schX={-16.6}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.VDD_X",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C4"
      capacitance="0.01uF"
      footprint="0603"
      schX={-15.3}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.VDD_X",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C5"
      capacitance="2.2uF"
      footprint="0603"
      schX={-13.2}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.BAND_GAP",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C6"
      capacitance="0.01uF"
      footprint="0603"
      schX={-11.9}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.BAND_GAP",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C7"
      capacitance="2.2uF"
      footprint="0603"
      schX={-9.8}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.VDD",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C8"
      capacitance="0.01uF"
      footprint="0603"
      schX={-8.5}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.VDD",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C9"
      capacitance="2.2uF"
      footprint="0603"
      schX={-6.4}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.VDD_A",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C10"
      capacitance="0.01uF"
      footprint="0603"
      schX={-5.1}
      schY={-7.2}
      schOrientation="vertical"
      connections={{
        pin1: "net.VDD_A",
        pin2: "net.GND",
      }}
    />

    <TPS61222
      name="U2"
      schX={-12.8}
      schY={-12.3}
      connections={{
        pin1: "net.VIN_3V3",
        pin2: "net.VIN_5V",
        pin3: "net.GND",
        pin4: "net.VIN_5V",
        pin6: "net.VIN_3V3",
      }}
    />

    <schematictext schX={-12.8} schY={-12.3} text="TPS61222" fontSize={0.15} />

    <inductor
      name="L4"
      inductance="4.7uH"
      schX={-8.7}
      schY={-12}
      schOrientation="horizontal"
      connections={{
        pin1: "U2.pin5",
        pin2: "net.VIN_3V3",
      }}
    />

    <capacitor
      name="C25"
      capacitance="10uF"
      footprint="0603"
      schX={-17.2}
      schY={-12.3}
      schOrientation="vertical"
      connections={{
        pin1: "net.VIN_5V",
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C26"
      capacitance="10uF"
      footprint="0603"
      schX={-6.8}
      schY={-13.3}
      schOrientation="vertical"
      connections={{
        pin1: "net.VIN_3V3",
        pin2: "net.GND",
      }}
    />

    <Header2x10
      name="P2"
      displayName="RF2"
      schX={-1.5}
      schY={-12.1}
      connections={{
        pin7: "net.VIN_3V3",
        pin9: "net.VIN_3V3",
        pin18: "net.ASK_OOK",
      }}
    />

    <testpoint
      name="TP4"
      schX={4.2}
      schY={-11.2}
      connections={{ pin1: "net.ASK_OOK" }}
    />
  </subcircuit>
);

export default RFIDReader_TRF7960;
