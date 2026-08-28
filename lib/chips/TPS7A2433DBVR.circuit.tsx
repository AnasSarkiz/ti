import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: ["IN"],
  pin2: ["GND"],
  pin3: ["EN"],
  pin4: ["NC"],
  pin5: ["OUT"],
} as const;

const pinAttributes = {
  pin1: { requiresPower: true, mustBeConnected: true },
  pin2: { requiresGround: true, mustBeConnected: true },
  pin3: { mustBeConnected: true },
  pin4: { doNotConnect: true },
  pin5: { providesPower: true, providesVoltage: "3.3V", mustBeConnected: true },
} as const;

export const TPS7A2433DBVR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      datasheetUrl="https://www.ti.com/lit/ds/symlink/tps7a24.pdf"
      schWidth="2.8mm"
      schHeight="2.5mm"
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["IN", "EN", "NC"] },
        rightSide: { direction: "top-to-bottom", pins: ["OUT"] },
        bottomSide: { direction: "left-to-right", pins: ["GND"] },
      }}
      schPinStyle={{
        EN: { marginTop: 0.5 },
        NC: { marginTop: 0.5 },
      }}
      supplierPartNumbers={{
        jlcpcb: ["C2866134"],
      }}
      manufacturerPartNumber="TPS7A2433DBVR"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin2"]}
            pcbX="1.100074mm"
            pcbY="-0.000127mm"
            width="0.999998mm"
            height="0.5999988mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="1.100074mm"
            pcbY="0.949833mm"
            width="0.999998mm"
            height="0.5999988mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin1"]}
            pcbX="1.100074mm"
            pcbY="-0.949833mm"
            width="0.999998mm"
            height="0.5999988mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="-1.100074mm"
            pcbY="0.950087mm"
            width="0.999998mm"
            height="0.5999988mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="-1.100074mm"
            pcbY="-0.950087mm"
            width="0.999998mm"
            height="0.5999988mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: -0.6984238000000005, y: -1.523974599999974 },
              { x: 0.6985507999999072, y: -1.5240254000000277 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -0.42237660000012056, y: 1.3969745999999077 },
              { x: 0.42240199999992, y: 1.3969745999999077 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -0.88894920000007, y: -0.38097460000005867 },
              { x: -0.88894920000007, y: 0.38097460000005867 },
            ]}
          />
          <silkscreencircle
            pcbX="2.0099782mm"
            pcbY="-0.9602216mm"
            radius="0.150114mm"
          />
          <silkscreentext
            text="{NAME}"
            pcbX="0.283972mm"
            pcbY="2.448689mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -1.8456280000000334, y: 1.6986889999999448 },
              { x: 2.413571999999931, y: 1.6986889999999448 },
              { x: 2.413571999999931, y: -1.7731110000000854 },
              { x: -1.8456280000000334, y: -1.7731110000000854 },
              { x: -1.8456280000000334, y: 1.6986889999999448 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2866134.obj?uuid=8c971aea3af54c53b74baeb1f489d393",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2866134.step?uuid=8c971aea3af54c53b74baeb1f489d393",
        pcbRotationOffset: 90,
        modelOriginPosition: {
          x: -0.000012699999956566899,
          y: 0.00006349999989652133,
          z: -0.7,
        },
      }}
      {...props}
    />
  );
};

export default TPS7A2433DBVR;
