import type { SubcircuitProps } from "@tscircuit/props";
import { CC2745R10 } from "../chips/CC2745R10.circuit.tsx";

export const WirelessMCU_CC2745R10 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <CC2745R10
      name="U1"
      schX={-1}
      schY={0}
      schWidth="3mm"
      schHeight="5.6mm"
      connections={{
        pin1: "net.VDDR",
        pin2: "net.VDDR",
        pin3: "net.DIO0",
        pin4: "net.DIO1",
        pin5: "net.DIO2",
        pin6: "net.DIO3",
        pin7: "net.DIO4",
        pin8: "net.DIO5",
        pin9: "C110.pin1",
        pin10: "net.DIO7",
        pin11: "net.DIO9_SWDIO",
        pin12: "net.DIO10_SWDCK",
        pin13: "net.DIO11",
        pin14: "net.DIO12",
        pin15: "net.DIO15",
        pin16: "net.DIO16",
        pin17: "C111.pin1",
        pin18: "net.VDDS",
        pin19: "net.DIO17",
        pin20: "net.DIO18",
        pin21: "net.DIO19",
        pin22: "net.DIO20",
        pin23: "net.DIO21",
        pin24: "net.DIO22",
        pin25: "R1.pin2",
        pin26: "net.X32P",
        pin27: "net.X32N",
        pin28: "C9.pin1",
        pin29: "C104.pin1",
        pin31: "C103.pin1",
        pin32: "net.DIO27",
        pin33: "net.DIO28",
        pin34: "net.VDDR",
        pin35: "net.X48P",
        pin36: "net.X48N",
        pin38: "C102.pin1",
        pin39: "C33.pin1",
        pin40: "net.GND",
        pin41: "net.GND",
      }}
      noConnect={["NC"]}
    />

    {/* VDDS input and decoupling */}
    <resistor
      name="B1"
      resistance="10ohm"
      footprint="0402"
      schX={-12.2}
      schY={3.5}
      connections={{
        pin1: "net.WMCU_VDD",
        pin2: "net.VDDS",
      }}
    />

    <capacitor
      name="C99"
      capacitance="100nF"
      footprint="0402"
      schX={-14}
      schY={1.5}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />

    <capacitor
      name="C101"
      capacitance="100nF"
      footprint="0402"
      schX={-12.5}
      schY={1.5}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />

    <capacitor
      name="C104"
      capacitance="10uF"
      footprint="0805"
      schX={-11}
      schY={1.5}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />

    <capacitor
      name="C103"
      capacitance="100nF"
      footprint="0402"
      schX={-9.5}
      schY={1.5}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />

    <capacitor
      name="C102"
      capacitance="100nF"
      footprint="0402"
      schX={-8}
      schY={1.5}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />

    {/* VDDD and VDDIO decoupling */}
    <capacitor
      name="C9"
      capacitance="1uF"
      footprint="0402"
      schX={-6.5}
      schY={1.5}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDD", pin2: "net.GND" }}
    />

    <capacitor
      name="C110"
      capacitance="100nF"
      footprint="0402"
      schX={-7.4}
      schY={-1.5}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />

    <capacitor
      name="C111"
      capacitance="100nF"
      footprint="0402"
      schX={-6}
      schY={-1.5}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDS", pin2: "net.GND" }}
    />

    {/* VDDR rail and DCDC */}
    <capacitor
      name="C108"
      capacitance="100nF"
      footprint="0402"
      schX={-8.8}
      schY={4.8}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDR", pin2: "net.GND" }}
    />

    <capacitor
      name="C106"
      capacitance="100nF"
      footprint="0402"
      schX={-7}
      schY={4.8}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDR", pin2: "net.GND" }}
    />

    <capacitor
      name="C107"
      capacitance="100nF"
      footprint="0402"
      schX={-5.2}
      schY={4.8}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDR", pin2: "net.GND" }}
    />

    <capacitor
      name="C105"
      capacitance="10uF"
      footprint="0805"
      schX={-8.2}
      schY={-6.4}
      schOrientation="vertical"
      connections={{ pin1: "net.VDDR", pin2: "net.GND" }}
    />

    <inductor
      name="L1"
      inductance="6.8uH"
      footprint="0805"
      schX={-6.2}
      schY={-5.55}
      schOrientation="horizontal"
      connections={{
        pin1: "C105.pin1",
        pin2: "U1.pin30",
      }}
    />

    {/* 32.768 kHz crystal */}
    <crystal
      name="Y3"
      frequency="32.768kHz"
      loadCapacitance={0}
      footprint="0402"
      schX={-11.6}
      schY={-4}
      schOrientation="horizontal"
      connections={{
        pin1: "U1.pin26",
        pin2: "net.X32N",
      }}
    />

    <capacitor
      name="C81"
      capacitance="12pF"
      footprint="0402"
      schX={-12.4}
      schY={-4.45}
      schOrientation="vertical"
      connections={{ pin1: "R6.pin2", pin2: "net.GND" }}
    />

    <capacitor
      name="C91"
      capacitance="15pF"
      footprint="0402"
      schX={-10.8}
      schY={-4.45}
      schOrientation="vertical"
      connections={{ pin1: "net.X32N", pin2: "net.GND" }}
    />

    <resistor
      name="R6"
      resistance="10ohm"
      footprint="0402"
      doNotPlace
      schX={-14.5}
      schY={-4.3}
      connections={{
        pin1: "net.DIO23",
        pin2: "Y3.pin1",
      }}
    />

    <resistor
      name="R7"
      resistance="10ohm"
      footprint="0402"
      doNotPlace
      schX={-9.2}
      schY={-4}
      connections={{
        pin1: "net.X32N",
        pin2: "net.DIO24",
      }}
    />
    {/* 48 MHz crystal */}
    <chip
      name="Y2"
      symbol={
        <symbol>
          {/* Reference designator: Y2 */}
          <schematictext
            text="{NAME}"
            schX={4.7}
            schY={-4.5}
            anchor="left"
            fontSize={0.22}
          />

          {/* Upper crystal case */}
          <schematicline
            x1={4.44}
            y1={-4.96}
            x2={5.36}
            y2={-4.96}
            strokeWidth={0.03}
          />

          <schematicline
            x1={4.44}
            y1={-4.96}
            x2={4.44}
            y2={-5.19}
            strokeWidth={0.03}
          />

          <schematicline
            x1={5.36}
            y1={-4.96}
            x2={5.36}
            y2={-5.19}
            strokeWidth={0.03}
          />

          {/* Lower crystal case */}
          <schematicline
            x1={4.44}
            y1={-5.81}
            x2={4.44}
            y2={-6.01}
            strokeWidth={0.03}
          />

          <schematicline
            x1={5.36}
            y1={-5.81}
            x2={5.36}
            y2={-6.01}
            strokeWidth={0.03}
          />

          <schematicline
            x1={4.44}
            y1={-6.01}
            x2={5.36}
            y2={-6.01}
            strokeWidth={0.03}
          />

          {/* Left crystal electrode */}
          <schematicline
            x1={4.68}
            y1={-5.8}
            x2={4.68}
            y2={-5.2}
            strokeWidth={0.03}
          />

          {/* Main quartz element — your original rectangle */}
          <schematicrect
            schX={4.9}
            schY={-5.5}
            width={0.25}
            height={0.6}
            isFilled={false}
            strokeWidth={0.03}
          />

          {/* Right crystal electrode */}
          <schematicline
            x1={5.12}
            y1={-5.8}
            x2={5.12}
            y2={-5.2}
            strokeWidth={0.03}
          />

          {/*
        Pin 1:
        external point = 3.82
        3.82 + 0.86 = 4.68
        Stem ends exactly on the left electrode.
      */}
          <port
            name="pin1"
            pinNumber={1}
            schX={3.82}
            schY={-5.5}
            direction="left"
            schStemLength={0.86}
          />

          {/*
        Pin 3:
        external point = 5.98
        5.98 - 0.86 = 5.12
        Stem ends exactly on the right electrode.
      */}
          <port
            name="pin3"
            pinNumber={3}
            schX={5.98}
            schY={-5.5}
            direction="right"
            schStemLength={0.86}
          />

          {/*
        Pin 2:
        -6.52 + 0.51 = -6.01
        Stem ends on the lower case line.
      */}
          <port
            name="pin2"
            pinNumber={2}
            schX={4.44}
            schY={-6.52}
            direction="down"
            schStemLength={0.51}
          />

          {/* Pin 4 */}
          <port
            name="pin4"
            pinNumber={4}
            schX={5.36}
            schY={-6.52}
            direction="down"
            schStemLength={0.51}
          />
        </symbol>
      }
      connections={{
        pin1: "net.X48N",
        pin2: "net.GND",
        pin4: "net.GND",
        pin3: "net.X48P",
      }}
    />

    <capacitor
      name="C52"
      capacitance={5}
      footprint="0402"
      doNotPlace
      schX={3.35}
      schY={-6.7}
      schOrientation="vertical"
      connections={{ pin1: "net.X48N", pin2: "net.GND" }}
    />
    <capacitor
      name="C53"
      capacitance={5}
      footprint="0402"
      doNotPlace
      schX={6.45}
      schY={-6.7}
      schOrientation="vertical"
      connections={{ pin1: "net.X48P", pin2: "net.GND" }}
    />

    {/* Reset */}
    <resistor
      name="R1"
      resistance="100k"
      footprint="0402"
      schX={5.1}
      schY={1.5}
      schOrientation="vertical"
      connections={{
        pin1: "net.VDDS",
        pin2: "C92.pin1",
      }}
    />

    <capacitor
      name="C92"
      capacitance="100nF"
      footprint="0402"
      schX={5.1}
      schY={0.5}
      schOrientation="vertical"
      connections={{ pin2: "net.GND" }}
    />

    {/* RF matching and filter */}
    <inductor
      name="L33"
      inductance="3.4nH"
      footprint="0402"
      schX={3.1}
      schY={6.25}
      schOrientation="horizontal"
      connections={{
        pin2: "net.RF_MATCH_1",
      }}
    />

    <capacitor
      name="C33"
      capacitance="0.82pF"
      footprint="0402"
      schX={2}
      schY={5}
      schOrientation="vertical"
      connections={{
        pin1: "L33.pin1",
        pin2: "L34.pin1",
      }}
    />

    <inductor
      name="L34"
      inductance="1.1nH"
      footprint="0402"
      schX={2}
      schY={3.3}
      schOrientation="vertical"
      connections={{
        pin2: "net.GND",
      }}
    />

    <capacitor
      name="C34"
      capacitance="1.2pF"
      footprint="0402"
      schX={4.35}
      schY={4.95}
      schOrientation="vertical"
      connections={{ pin1: "net.RF_MATCH_1", pin2: "net.GND" }}
    />

    <resistor
      name="R78"
      resistance="10ohm"
      footprint="0402"
      schX={5.5}
      schY={6.25}
      connections={{
        pin1: "net.RF_MATCH_1",
        pin2: "net.RF_FEED",
      }}
    />

    <capacitor
      name="C109"
      capacitance={5}
      footprint="0402"
      doNotPlace
      schX={7.15}
      schY={5.5}
      schOrientation="vertical"
      connections={{ pin1: "net.RF_FEED", pin2: "net.GND" }}
    />

    <chip
      name="CR10"
      symbol={
        <symbol>
          <port
            name="pin2"
            pinNumber={2}
            schX={8.35}
            schY={6.0}
            direction="up"
            schStemLength={0.63}
          />

          <schematicpath
            points={[
              { x: 8.07, y: 5.37 },
              { x: 8.63, y: 5.37 },
              { x: 8.35, y: 5.02 },
              { x: 8.07, y: 5.37 },
            ]}
            isFilled
            strokeWidth={0.025}
          />

          <schematicpath
            points={[
              { x: 8.07, y: 4.53 },
              { x: 8.63, y: 4.53 },
              { x: 8.35, y: 4.88 },
              { x: 8.07, y: 4.53 },
            ]}
            isFilled
            strokeWidth={0.025}
          />

          <schematicpath
            points={[
              { x: 7.97, y: 4.71 },
              { x: 8.13, y: 4.95 },
              { x: 8.57, y: 5.02 },
              { x: 8.73, y: 5.19 },
            ]}
            strokeWidth={0.025}
          />

          <schematicpath
            points={[
              { x: 7.97, y: 4.71 },
              { x: 8.13, y: 4.88 },
              { x: 8.57, y: 4.95 },
              { x: 8.73, y: 5.19 },
            ]}
            strokeWidth={0.025}
          />

          <port
            name="pin1"
            pinNumber={1}
            schX={8.35}
            schY={3.9}
            direction="down"
            schStemLength={0.63}
          />
        </symbol>
      }
      connections={{ pin2: "net.RF_FEED", pin1: "net.GND" }}
    />

    {/* Optional RF test connector */}
    <chip
      name="J7"
      displayName="RF TEST"
      symbol={
        <symbol>
          {/* Square connector body */}

          <schematicrect
            schX={12.1}
            schY={8}
            width={1.6}
            height={1.6}
            strokeWidth="0.04"
            color="#c77700"
            isFilled={false}
          />

          {/* Circular socket */}

          <schematiccircle
            center={{ x: 12.1, y: 8 }}
            radius={0.56}
            strokeWidth="0.04"
            color="#c77700"
            isFilled={false}
          />

          <schematiccircle
            center={{ x: 12.1, y: 8 }}
            radius={0.49}
            strokeWidth="0.04"
            color="#c77700"
            isFilled={false}
          />

          {/* Center contact */}

          <schematiccircle
            center={{ x: 12.1, y: 8 }}
            radius={0.1}
            strokeWidth="0.04"
            color="#c77700"
            isFilled={false}
          />

          {/* Small line inside center contact */}

          <schematicline
            x1={12.1}
            y1={8}
            x2={12.1}
            y2={7.2}
            strokeWidth="0.04"
            color="#c77700"
          />

          {/* Center contact to pin 1 */}

          <port
            name="pin3"
            schX={10.5}
            pinNumber={3}
            schY={8.4}
            direction="left"
            schStemLength={0.8}
          />
          <port
            name="pin2"
            schX={10.5}
            schY={7.6}
            pinNumber={2}
            direction="left"
            schStemLength={0.8}
          />
          <port
            name="pin1"
            schX={12.1}
            schY={6.4}
            direction="down"
            schStemLength={0.8}
            pinNumber={1}
          />

          <port
            name="pin4"
            schX={13.7}
            schY={8.4}
            direction="right"
            schStemLength={0.8}
            pinNumber={4}
          />
          <port
            name="pin5"
            schX={13.7}
            schY={7.6}
            direction="right"
            schStemLength={0.8}
            pinNumber={5}
          />
        </symbol>
      }
      connections={{
        pin3: "net.GND",
        pin2: "net.GND",
        pin4: "net.GND",
        pin5: "net.GND",
        pin1: "net.RF_TEST",
      }}
    />

    <capacitor
      name="CA1"
      capacitance={5}
      footprint="0402"
      doNotPlace
      schX={12.1}
      schY={4.25}
      schOrientation="vertical"
      connections={{
        pin1: "net.RF_TEST",
        pin2: "net.RF_FEED",
      }}
    />

    {/* Antenna matching */}
    <capacitor
      name="CA2"
      capacitance="15pF"
      footprint="0402"
      schX={12.1}
      schY={2.45}
      schOrientation="vertical"
      connections={{
        pin1: "net.RF_FEED",
        pin2: "net.ANT_MATCH_IN",
      }}
    />

    <inductor
      name="Z61"
      inductance="2.8nH"
      footprint="0402"
      schX={13}
      schY={0.15}
      schOrientation="horizontal"
      connections={{
        pin1: "net.ANT_MATCH_IN",
        pin2: "net.ANT_MATCH_OUT",
      }}
    />

    <capacitor
      name="Z62"
      capacitance="0.4pF"
      footprint="0402"
      schX={12.1}
      schY={-1.6}
      schOrientation="vertical"
      connections={{ pin1: "net.ANT_MATCH_IN", pin2: "net.GND" }}
    />

    <capacitor
      name="Z60"
      capacitance="1.6pF"
      footprint="0402"
      schX={13.75}
      schY={-1.6}
      schOrientation="vertical"
      connections={{ pin1: "net.ANT_MATCH_OUT", pin2: "net.GND" }}
    />

    <chip
      name="ANT1"
      symbol={
        <symbol>
          <schematictext
            text="{NAME}"
            schX={12.1}
            schY={-4.2}
            fontSize={0.22}
            anchor="center"
          />

          <schematiccircle
            center={{ x: 12.1, y: -5.15 }}
            radius={0.7}
            isFilled={false}
            strokeWidth={0.04}
          />

          <schematicline
            x1={12.1}
            y1={-6.45}
            x2={12.1}
            y2={-5.67}
            strokeWidth={0.04}
          />

          <schematicline
            x1={12.1}
            y1={-5.17}
            x2={11.83}
            y2={-5.67}
            strokeWidth={0.04}
          />

          <schematicline
            x1={12.1}
            y1={-5.17}
            x2={12.37}
            y2={-5.67}
            strokeWidth={0.04}
          />

          <port
            name="pin2"
            schX={11.0}
            schY={-5.15}
            direction="left"
            schStemLength={0.4}
            pinNumber={2}
          />

          <port
            name="pin1"
            schX={11.0}
            schY={-6.45}
            direction="left"
            schStemLength={1.1}
            pinNumber={1}
          />

          <port
            name="pin3"
            schX={13.2}
            schY={-5.15}
            direction="right"
            schStemLength={0.4}
            pinNumber={3}
          />
        </symbol>
      }
      connections={{
        pin2: "net.GND",
        pin1: "net.ANT_MATCH_OUT",
        pin3: "net.GND",
      }}
    />
  </subcircuit>
);

export default WirelessMCU_CC2745R10;
