import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
} as const;

export const BC846BLT1G = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port
            name="pin1"
            pinNumber={1}
            direction="left"
            schX={-0.2}
            schY={0}
            schStemLength={0.2}
            schPinLabelFontSize={0.1}
          />
          <port
            name="pin3"
            pinNumber={3}
            direction="up"
            schX={0.2}
            schY={0.6}
            schStemLength={0.4}
            schPinLabelFontSize={0.1}
          />
          <port
            name="pin2"
            pinNumber={2}
            direction="down"
            schX={0.2}
            schY={-0.6}
            schStemLength={0.4}
            schPinLabelFontSize={0.1}
          />
          <schematicpath
            points={[
              { x: 0.2, y: 0.2 },
              { x: 0, y: 0.06 },
            ]}
            strokeColor="#880000"
          />
          <schematicpath
            points={[
              { x: 0, y: -0.06 },
              { x: 0.2, y: -0.2 },
            ]}
            strokeColor="#880000"
          />
          <schematicpath
            points={[
              { x: 0, y: 0.18 },
              { x: 0, y: -0.18 },
            ]}
            strokeColor="#880000"
          />
          <schematicpath
            points={[
              { x: 0.2, y: -0.2 },
              { x: 0.14, y: -0.1 },
              { x: 0.08, y: -0.18 },
              { x: 0.2, y: -0.2 },
            ]}
            strokeColor="#880000"
            isFilled
            fillColor="#880000"
          />
          <schematictext
            text="1"
            schX={-0.13}
            schY={0.11}
            fontSize={0.1}
            color="#880000"
            anchor="center"
          />
          <schematictext
            text="3"
            schX={0.31}
            schY={0.28}
            fontSize={0.1}
            color="#880000"
            anchor="center"
          />
          <schematictext
            text="2"
            schX={0.31}
            schY={-0.28}
            fontSize={0.1}
            color="#880000"
            anchor="center"
          />
        </symbol>
      }
      supplierPartNumbers={{
        jlcpcb: ["C82477"],
      }}
      manufacturerPartNumber="BC846BLT1G"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin1"]}
            pcbX="1.235075mm"
            pcbY="-0.94996mm"
            width="1.0700004mm"
            height="0.5999988mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="1.235075mm"
            pcbY="0.94996mm"
            width="1.0700004mm"
            height="0.5999988mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="-1.235075mm"
            pcbY="0mm"
            width="1.0700004mm"
            height="0.5999988mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: 0.8760714000002281, y: 1.5361919999999145 },
              { x: -0.8763253999998142, y: 1.5361919999999145 },
              { x: -0.8763253999998142, y: 0.49458879999997407 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.8760714000002281, y: -1.5361920000000282 },
              { x: -0.8763253999998142, y: -1.5361920000000282 },
              { x: -0.8763253999998142, y: -0.49458879999997407 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 0.8760714000002281, y: 0.45539659999997184 },
              { x: 0.8760714000002281, y: -0.45539659999985815 },
            ]}
          />
          <silkscreentext
            text="{NAME}"
            pcbX="-0.012827mm"
            pcbY="2.524mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -2.0281269999999267, y: 1.774000000000001 },
              { x: 2.0024730000002364, y: 1.774000000000001 },
              { x: 2.0024730000002364, y: -1.7993999999999915 },
              { x: -2.0281269999999267, y: -1.7993999999999915 },
              { x: -2.0281269999999267, y: 1.774000000000001 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C82477.obj?uuid=cefd4596db214da394d9632b2b88f8f2",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C82477.step?uuid=cefd4596db214da394d9632b2b88f8f2",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012699999956566899, y: 0, z: 0 },
      }}
      {...props}
    />
  );
};
