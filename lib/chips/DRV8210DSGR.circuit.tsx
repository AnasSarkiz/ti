import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["VM"],
  pin2: ["OUT1"],
  pin3: ["OUT2"],
  pin4: ["GND"],
  pin5: ["IN2", "EN", "IN2_EN"],
  pin6: ["IN1", "PH", "IN1_PH"],
  pin7: ["MODE"],
  pin8: ["VCC"],
  pin9: ["EP", "PAD"],
} as const;

export const DRV8210DSGR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C3681199"],
      }}
      manufacturerPartNumber="DRV8210DSGR"
      datasheetUrl="https://www.ti.com/lit/ds/symlink/drv8210.pdf"
      schWidth={2.8}
      schHeight={1.5}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["IN1", "IN2", "MODE"] },
        rightSide: { direction: "top-to-bottom", pins: ["VM", "OUT1", "OUT2"] },
        topSide: { direction: "left-to-right", pins: ["VCC"] },
        bottomSide: { direction: "left-to-right", pins: ["GND", "EP"] },
      }}
      schPinStyle={{
        IN2: { marginTop: 0.3 },
        MODE: { marginTop: 0.3 },
        OUT1: { marginTop: 0.3 },
        OUT2: { marginTop: 0.3 },
        EP: { marginLeft: 0.3 },
      }}
      footprint={
        <footprint>
          <smtpad
            portHints={["pin1"]}
            pcbX="-0.751332mm"
            pcbY="-1.000252mm"
            width="0.2500122mm"
            height="0.499999mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-0.251714mm"
            pcbY="-1.001522mm"
            width="0.2500122mm"
            height="0.499999mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="0.250698mm"
            pcbY="-1.001268mm"
            width="0.2500122mm"
            height="0.499999mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="0.750824mm"
            pcbY="-1.001522mm"
            width="0.2500122mm"
            height="0.499999mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="0.751078mm"
            pcbY="1.001522mm"
            width="0.2500122mm"
            height="0.499999mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="0.248666mm"
            pcbY="1.001522mm"
            width="0.2500122mm"
            height="0.499999mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="-0.250952mm"
            pcbY="1.000506mm"
            width="0.2500122mm"
            height="0.499999mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="-0.75057mm"
            pcbY="1.000506mm"
            width="0.2500122mm"
            height="0.499999mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX="0mm"
            pcbY="0.000254mm"
            width="1.7999964mm"
            height="0.8999982mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: 1.0998962000000176, y: 1.0002265999999977 },
              { x: 1.0998962000000176, y: -0.9997693999999981 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.1000993999999906, y: -0.9997693999999981 },
              { x: -1.1000993999999906, y: 1.0002265999999977 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -1.2506705999999923, y: -1.2497054000000034 },
              { x: -1.3358565111340113, y: -1.099233280242487 },
              { x: -1.1629446888659913, y: -1.099233280242487 },
              { x: -1.248130599999996, y: -1.2497054000000034 },
            ]}
          />
          <silkscreentext
            text="{NAME}"
            pcbX="-0.124714mm"
            pcbY="2.24968mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -1.5939139999999838, y: 1.499679999999998 },
              { x: 1.3444860000000176, y: 1.499679999999998 },
              { x: 1.3444860000000176, y: -1.6927199999999942 },
              { x: -1.5939139999999838, y: -1.6927199999999942 },
              { x: -1.5939139999999838, y: 1.499679999999998 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C3681199.obj?uuid=bdbb82cfec2f421cabcde62c239dd780",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C3681199.step?uuid=bdbb82cfec2f421cabcde62c239dd780",
        pcbRotationOffset: 90,
        modelOriginPosition: {
          x: 0.000025399999998398926,
          y: -0.0001015999999935957,
          z: 0,
        },
      }}
      {...props}
    />
  );
};

export default DRV8210DSGR;
