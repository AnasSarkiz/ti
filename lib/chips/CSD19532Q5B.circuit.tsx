import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["S3"],
  pin2: ["S2"],
  pin3: ["S1"],
  pin4: ["G"],
  pin5: ["D5"],
  pin6: ["D4"],
  pin7: ["D3"],
  pin8: ["D2"],
  pin9: ["D1"],
} as const;

export const CSD19532Q5B = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C473333"],
      }}
      manufacturerPartNumber="CSD19532Q5B"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin9"]}
            pcbX="0mm"
            pcbY="0.805434mm"
            width="4.499991mm"
            height="3.7999924mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="-1.905mm"
            pcbY="2.897886mm"
            width="0.7493mm"
            height="0.999998mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="-0.635mm"
            pcbY="2.897886mm"
            width="0.7493mm"
            height="0.999998mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="0.635mm"
            pcbY="2.897886mm"
            width="0.7493mm"
            height="0.999998mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="1.905mm"
            pcbY="2.897886mm"
            width="0.7493mm"
            height="0.999998mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="1.905mm"
            pcbY="-2.7118818mm"
            width="0.6999986mm"
            height="1.3720064mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="0.635mm"
            pcbY="-2.7118818mm"
            width="0.6999986mm"
            height="1.3720064mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-0.635mm"
            pcbY="-2.7118818mm"
            width="0.6999986mm"
            height="1.3720064mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin1"]}
            pcbX="-1.905mm"
            pcbY="-2.7118818mm"
            width="0.6999986mm"
            height="1.3720064mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: 2.692399999999907, y: 3.140075000000138 },
              { x: 2.692399999999907, y: -2.854325000000131 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -2.717800000000011, y: -2.854325000000131 },
              { x: -2.717800000000011, y: 3.140075000000138 },
            ]}
          />
          <silkscreencircle
            pcbX="-1.9304mm"
            pcbY="-3.337052mm"
            radius="0.127mm"
          />
          <silkscreentext
            text="{NAME}"
            pcbX="-0.0127mm"
            pcbY="4.394202mm"
            anchorAlignment="center"
            fontSize="1mm"
          />
          <courtyardoutline
            outline={[
              { x: -2.967800000000011, y: 3.64420199999995 },
              { x: 2.9424000000000206, y: 3.64420199999995 },
              { x: 2.9424000000000206, y: -3.713797999999997 },
              { x: -2.967800000000011, y: -3.713797999999997 },
              { x: -2.967800000000011, y: 3.64420199999995 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C473333.obj?uuid=45351fa1d67f41b4ad3fc24b46fe8f65",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C473333.step?uuid=45351fa1d67f41b4ad3fc24b46fe8f65",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.1429893000000675, z: -0.21 },
      }}
      {...props}
    />
  );
};
