import type { SubcircuitProps } from "@tscircuit/props";
import mspm0Opa from "./MSPM0_OPA-PSPICE/mspm0_opa.json";

const pinLabels = {
  pin1: "PB13",
  pin2: "PB14",
  pin3: "PB15",
  pin4: "PB16",
  pin5: "PA12",
  pin6: ["PA13", "COMP0_IN2_N"],
  pin7: ["PA14", "A0_12", "COMP0_IN2_P"],
  pin8: [
    "PA15",
    "A1_0",
    "DAC_OUT",
    "OPA0_IN2_P",
    "OPA1_IN2_P",
    "COMP0_IN3_P",
    "COMP1_IN3_P",
  ],
  pin9: ["PA16", "A1_1", "OPA1_OUT"],
  pin10: ["PA17", "A1_2", "OPA1_IN1_N", "COMP0_IN1_N"],
  pin11: ["PA18", "A1_3", "OPA1_IN1_P", "COMP0_IN1_P", "GPAMP_IN_N"],
  pin12: ["PA19", "SWDIO"],
  pin13: ["PA20", "SWCLK"],
  pin14: ["PB17", "A1_4", "COMP1_IN2_N"],
  pin15: ["PB18", "A1_5", "COMP1_IN2_P"],
  pin16: ["PB19", "A1_6", "COMP2_IN1_P", "OPA1_IN0_P"],
  pin17: ["PA21", "A1_7", "COMP2_IN1_N", "VREF_N"],
  pin18: ["PA22", "A0_7", "GPAMP_OUT", "OPA0_OUT"],
  pin19: ["PB20", "A0_6", "OPA1_IN0_N"],
  pin20: ["PB21", "COMP2_IN0_P"],
  pin21: ["PB22", "COMP2_IN0_N"],
  pin22: "PB23",
  pin23: ["PB24", "A0_5", "COMP1_IN1_P"],
  pin24: ["PA23", "COMP1_IN1_N", "VREF_P"],
  pin25: ["PA24", "A0_3", "OPA0_IN1_N"],
  pin26: ["PA25", "A0_2", "OPA0_IN1_P"],
  pin27: ["PB25", "A0_4"],
  pin28: ["PB26", "COMP1_IN0_P"],
  pin29: ["PB27", "COMP1_IN0_N"],
  pin30: ["PA26", "A0_1", "COMP0_IN0_P", "OPA0_IN0_P", "GPAMP_IN_P"],
  pin31: ["PA27", "A0_0", "COMP0_IN0_N", "OPA0_IN0_N"],
  pin32: "VCORE",
  pin33: "PA0",
  pin34: "PA1",
  pin35: "PA28",
  pin36: "PA29",
  pin37: "PA30",
  pin38: "NRST",
  pin39: "PA31",
  pin40: "VDD",
  pin41: "VSS",
  pin42: ["PA2", "ROSC"],
  pin43: ["PA3", "LFXIN"],
  pin44: ["PA4", "LFXOUT"],
  pin45: ["PA5", "HFXIN"],
  pin46: ["PA6", "HFXOUT"],
  pin47: "PB0",
  pin48: "PB1",
  pin49: "PA7",
  pin50: "PB2",
  pin51: "PB3",
  pin52: "PB4",
  pin53: "PB5",
  pin54: "PA8",
  pin55: "PA9",
  pin56: "PA10",
  pin57: "PA11",
  pin58: "PB6",
  pin59: "PB7",
  pin60: "PB8",
  pin61: "PB9",
  pin62: "PB10",
  pin63: "PB11",
  pin64: "PB12",
} as const;

export default (props: SubcircuitProps) => (
  <subcircuit width={100} height={100} {...props}>
    <chip
      footprint="lqfp64"
      manufacturerPartNumber="MSPM0G3507SPMR"
      pinLabels={pinLabels}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: ["VDD", "VSS", "VCORE", "NRST"],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["PA2", "PA0", "PA1", "PA19", "PA20"],
        },
      }}
      schPinStyle={{
        VDD: {
          marginTop: -0.5,
        },
        VSS: {
          marginTop: 1.2,
        },
        VCORE: {
          marginTop: 0.3,
        },
        NRST: {
          marginTop: 1.5,
        },
        PA2: {
          marginTop: 0.4,
        },
        PA0: {
          marginTop: 1.9,
        },
        PA1: {
          marginTop: 0.3,
        },
        PA19: {
          marginTop: 1.2,
        },
        PA20: {
          marginTop: 0.3,
        },
      }}
      schHeight={5.3}
      name="U1"
      schX={0}
      schY={0}
      pcbX={0}
      pcbY={0}
      spiceModel={
        <spicemodel
          source={mspm0Opa.source}
          spicePinMapping={{
            INP: "OPA0_IN0_P",
            INN: "OPA0_IN0_N",
            VCC: "VDD",
            VEE: "VSS",
            OUT: "OPA0_OUT",
          }}
        />
      }
      connections={{
        VDD: "C2.pin1",
        VSS: "C2.pin2",
        NRST: "net.NRST",
        ROSC: "R2.pin1",
        PA0: "net.PA0",
        PA1: "net.PA1",
        SWDIO: "net.SWDIO",
        SWCLK: "net.SWCLK",
      }}
    />

    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0805"
      schOrientation="vertical"
      schX={-2.6}
      schY={1.3}
      pcbX={11}
      pcbY={-1}
      connections={{ pin1: ["U1.VDD", "R1.pin2"], pin2: ["U1.VSS", "net.GND"] }}
    />
    <capacitor
      name="C2"
      capacitance="0.1uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-1.8}
      schY={1.3}
      pcbX={11}
      pcbY={2}
      connections={{ pin1: "C1.pin1" }}
    />

    <capacitor
      name="C3"
      capacitance="0.47uF"
      footprint="0402"
      schOrientation="vertical"
      schX={-2.1}
      schY={-0.6}
      pcbX={7}
      pcbY={-9}
      connections={{ pin1: "U1.VCORE", pin2: "net.GND" }}
    />

    <resistor
      name="R1"
      resistance="47k"
      footprint="0402"
      schRotation={90}
      schX={-3.3}
      schY={0.1}
      pcbX={11}
      pcbY={5}
      connections={{ pin1: "U1.NRST", pin2: "net.VDD" }}
    />
    <capacitor
      name="C4"
      capacitance="10nF"
      footprint="0402"
      schOrientation="vertical"
      schX={-3.3}
      schY={-1.7}
      pcbX={11}
      pcbY={7}
      connections={{ pin1: "R1.pin1", pin2: "net.GND" }}
    />

    <resistor
      name="R2"
      resistance="100k"
      footprint="0402"
      schX={2.3}
      schY={2.05}
      pcbX={11}
      pcbY={-4}
      connections={{ pin1: "U1.ROSC", pin2: "net.GND" }}
    />

    <resistor
      name="R3"
      resistance="4.7k"
      footprint="0402"
      schRotation={90}
      schX={4.7}
      schY={0.6}
      pcbX={-9}
      pcbY={6}
      connections={{ pin1: "U1.PA1", pin2: "net.VDD" }}
    />
    <resistor
      name="R4"
      resistance="4.7k"
      footprint="0402"
      schRotation={90}
      schX={3.8}
      schY={0.6}
      pcbX={-11}
      pcbY={6}
      connections={{ pin1: "U1.PA0", pin2: "net.VDD" }}
    />

    <pinheader
      name="J1"
      pinCount={2}
      gender="female"
      pitch="2.54mm"
      schPinStyle={{
        SWDIO: {
          marginTop: 0.1,
          marginBottom: 0.2,
        },
      }}
      schFacingDirection="left"
      schX={3.6}
      schY={-2.1}
      pcbX={-18}
      pcbY={0}
      showSilkscreenPinLabels
      pinLabels={["SWDIO", "SWCLK"]}
      connections={{
        pin1: "U1.SWDIO",
        pin2: "U1.SWCLK",
      }}
    />
    <voltageprobe name="OPA0_OUT" connectsTo="U1.OPA0_OUT" />
    <analogsimulation
      duration="10ms"
      timePerStep="10us"
      spiceEngine="ngspice"
    />
  </subcircuit>
);
