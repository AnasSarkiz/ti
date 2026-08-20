import { ChipProps } from "tscircuit";
import drv8876SpiceModel from "./spice-models/DRV8876-spice-model.json";

export const DRV8876_PIN_LABELS = {
  pin1: "EN",
  pin2: "PH",
  pin3: "nSLEEP",
  pin4: "nFAULT",
  pin5: "VREF",
  pin6: "IPROPI",
  pin7: "IMODE",
  pin8: "OUT1",
  pin9: "PGND",
  pin10: "OUT2",
  pin11: "VM",
  pin12: "VCP",
  pin13: "CPH",
  pin14: "CPL",
  pin15: "GND",
  pin16: "PMODE",
  pin17: "PAD",
};

export const DRV8876 = (props: ChipProps<any>) => (
  <chip
    {...props}
    pinLabels={DRV8876_PIN_LABELS}
    supplierPartNumbers={{
      jlcpcb: ["C575551"],
    }}
    manufacturerPartNumber="DRV8876"
    spiceModel={
      <spicemodel
        source={drv8876SpiceModel.source}
        spicePinMapping={{
          CPH: "CPH",
          CPL: "CPL",
          EN_IN1: "EN",
          GND: "GND",
          IMODE: "IMODE",
          IPROPI: "IPROPI",
          nFAULT: "nFAULT",
          nSLEEP: "nSLEEP",
          OUT1: "OUT1",
          OUT2: "OUT2",
          PGND: "PGND",
          PAD: "PAD",
          PH_IN2: "PH",
          PMODE: "PMODE",
          VCP: "VCP",
          VM: "VM",
          VREF: "VREF",
        }}
      />
    }
    schPinStyle={{
      GND: {
        marginTop: 0.6,
        marginBottom: 0.6,
      },
      CPH: {
        marginTop: 0.6,
        marginBottom: 0.6,
      },
      VM: {
        marginTop: 0.6,
        marginBottom: 0.6,
      },
      OUT2: {
        marginBottom: 0.6,
      },
      IMODE: {
        marginTop: 0.6,
        marginBottom: 0.6,
      },
      nSLEEP: {
        marginTop: 0.6,
        marginBottom: 0.6,
      },
      VREF: {
        marginTop: 0.6,
        marginBottom: 0.6,
      },
      PH: {
        marginTop: 0.6,
      },
      PAD: {
        marginTop: 0.6,
      },
    }}
    footprint="dfn16_thermalpad2.46mmx3.55mm_pillpads_p0.65mm_w7.5mm_pw0.34mm_pl1.75mm_pin1location(leftside,bottom)"
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C575551.obj?uuid=89f85af05c9045c798a6d7a53851085c",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C575551.step?uuid=89f85af05c9045c798a6d7a53851085c",
      pcbRotationOffset: 0,
      modelOriginPosition: { x: 0, y: 0, z: 0 },
    }}
  />
);
