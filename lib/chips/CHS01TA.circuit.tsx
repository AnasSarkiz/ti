import type { SwitchProps } from "@tscircuit/props";
import "tscircuit";

type CHS01TAProps = Omit<SwitchProps, "name"> & { name?: string };

/** Copal CHS-01TA recessed SPST surface-mount DIP switch. */
export const CHS01TA = ({ name = "S1", ...props }: CHS01TAProps) => (
  <switch
    name={name}
    pinLabels={{ pin1: "pin1", pin2: "pin2" }}
    supplierPartNumbers={{ jlcpcb: ["C2921603"] }}
    manufacturerPartNumber="CHS-01TA"
    footprint={
      <footprint>
        <smtpad
          portHints={["pin1"]}
          pcbX={-2.54}
          pcbY={0}
          width="1.5999968mm"
          height="0.999998mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin2"]}
          pcbX={2.54}
          pcbY={0}
          width="1.5999968mm"
          height="0.999998mm"
          shape="rect"
        />
        <silkscreenpath
          route={[
            { x: -2.7, y: 1.25 },
            { x: 2.7, y: 1.25 },
            { x: 2.7, y: -1.25 },
            { x: -2.7, y: -1.25 },
            { x: -2.7, y: 1.25 },
          ]}
        />
        <silkscreenrect
          pcbX={0}
          pcbY={0}
          width="1.999996mm"
          height="0.999998mm"
          strokeWidth="0.0762mm"
        />
        <courtyardoutline
          outline={[
            { x: -3.5774, y: 1.49466 },
            { x: 3.6028, y: 1.49466 },
            { x: 3.6028, y: -1.54534 },
            { x: -3.5774, y: -1.54534 },
            { x: -3.5774, y: 1.49466 },
          ]}
        />
      </footprint>
    }
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C2921603.obj?uuid=f0ff837b90154ad88c14cb2c877191d0",
      stepUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/assets/C2921603.step?uuid=f0ff837b90154ad88c14cb2c877191d0",
      pcbRotationOffset: 270,
      modelOriginPosition: { x: 0.0050635, y: 0, z: -0.1 },
    }}
    {...props}
  />
);

export default CHS01TA;
