import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: ["OUT_A", "OUTA"],
  pin2: ["IN_NEG_A", "INA_NEG"],
  pin3: ["IN_POS_A", "INA_POS"],
  pin4: ["V_POS", "V_PLUS", "VCC"],
  pin5: ["IN_POS_B", "INB_POS"],
  pin6: ["IN_NEG_B", "INB_NEG"],
  pin7: ["OUT_B", "OUTB"],
  pin8: ["OUT_C", "OUTC"],
  pin9: ["IN_NEG_C", "INC_NEG"],
  pin10: ["IN_POS_C", "INC_POS"],
  pin11: ["V_NEG", "V_MINUS", "GND"],
  pin12: ["IN_POS_D", "IND_POS"],
  pin13: ["IN_NEG_D", "IND_NEG"],
  pin14: ["OUT_D", "OUTD"],
} as const;

const pinAttributes = {
  pin4: {
    requiresPower: true,
    mustBeConnected: true,
    shouldHaveDecouplingCapacitor: true,
    recommendedDecouplingCapacitorCapacitance: "0.1uF",
  },
  pin11: { requiresGround: true, mustBeConnected: true },
  pin1: { mustBeConnected: true },
  pin2: { mustBeConnected: true },
  pin3: { mustBeConnected: true },
  pin5: { mustBeConnected: true },
  pin6: { mustBeConnected: true },
  pin7: { mustBeConnected: true },
  pin8: { mustBeConnected: true },
  pin9: { mustBeConnected: true },
  pin10: { mustBeConnected: true },
  pin12: { mustBeConnected: true },
  pin13: { mustBeConnected: true },
  pin14: { mustBeConnected: true },
} as const;

export const LMV324AIPWR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      datasheetUrl="https://www.ti.com/lit/ds/symlink/lmv324a.pdf"
      schWidth="4.5mm"
      schHeight="8.8mm"
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: [
            "IN_NEG_A",
            "IN_POS_A",
            "IN_NEG_B",
            "IN_POS_B",
            "IN_NEG_C",
            "IN_POS_C",
            "IN_NEG_D",
            "IN_POS_D",
          ],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["OUT_A", "OUT_B", "OUT_C", "OUT_D"],
        },
        topSide: { direction: "left-to-right", pins: ["V_POS"] },
        bottomSide: { direction: "left-to-right", pins: ["V_NEG"] },
      }}
      schPinStyle={{
        IN_NEG_B: { marginTop: 0.7 },
        IN_NEG_C: { marginTop: 0.7 },
        IN_NEG_D: { marginTop: 0.7 },
        OUT_B: { marginTop: 1.05 },
        OUT_C: { marginTop: 1.05 },
        OUT_D: { marginTop: 1.05 },
      }}
      manufacturerPartNumber="LMV324AIPWR"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin1"]}
            pcbX="-1.949958mm"
            pcbY="-2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-1.299972mm"
            pcbY="-2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="-0.649986mm"
            pcbY="-2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="0mm"
            pcbY="-2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="0.649986mm"
            pcbY="-2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="1.299972mm"
            pcbY="-2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="1.949958mm"
            pcbY="-2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="1.949958mm"
            pcbY="2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX="1.299972mm"
            pcbY="2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin10"]}
            pcbX="0.649986mm"
            pcbY="2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin11"]}
            pcbX="0mm"
            pcbY="2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin12"]}
            pcbX="-0.649986mm"
            pcbY="2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin13"]}
            pcbX="-1.299972mm"
            pcbY="2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin14"]}
            pcbX="-1.949958mm"
            pcbY="2.925064mm"
            width="0.3048mm"
            height="0.9906mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: 2.4999949999999984, y: 2.199995599999994 },
              { x: -2.499994999999984, y: 2.199995599999994 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 2.4999949999999984, y: 2.199995599999994 },
              { x: 2.4999949999999984, y: -2.1999956000000083 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -2.499994999999984, y: -2.1999956000000083 },
              { x: -2.499994999999984, y: 2.199995599999994 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -2.499994999999984, y: -2.1999956000000083 },
              { x: 2.4999949999999984, y: -2.1999956000000083 },
            ]}
          />
          <silkscreencircle
            pcbX="-1.6256mm"
            pcbY="-1.2192mm"
            radius="0.150114mm"
          />
          <silkscreencircle
            pcbX="-2.53619mm"
            pcbY="-2.916936mm"
            radius="0.150114mm"
          />
          <silkscreentext
            text="{NAME}"
            pcbX="-0.1016mm"
            pcbY="4.429mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -2.9424000000000063, y: 3.678999999999988 },
              { x: 2.7391999999999825, y: 3.678999999999988 },
              { x: 2.7391999999999825, y: -3.704400000000007 },
              { x: -2.9424000000000063, y: -3.704400000000007 },
              { x: -2.9424000000000063, y: 3.678999999999988 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C484733.obj?uuid=5377177da492449fa1a3111d646cac17",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C484733.step?uuid=5377177da492449fa1a3111d646cac17",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012700000013410317, y: 0, z: -0.069083 },
      }}
      {...props}
    />
  );
};

export default LMV324AIPWR;
