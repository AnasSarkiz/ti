import type { MosfetProps } from "@tscircuit/props";

type SQJ858AEPProps = Omit<
  MosfetProps,
  "channelType" | "mosfetMode" | "footprint"
>;

export const SQJ858AEP_T1_GE3 = (props: SQJ858AEPProps) => {
  return (
    <mosfet
      channelType="n"
      mosfetMode="enhancement"
      supplierPartNumbers={{
        jlcpcb: ["C143688"],
      }}
      manufacturerPartNumber="SQJ858AEP-T1-GE3"
      footprint={
        <footprint>
          {/*
           * PowerPAK_SO-8L copper copied from the supplied TIDA-01330
           * Altium PCB. Package pins 1, 2 and 3 are the common source.
           */}
          <smtpad
            portHints={["source", "pin2"]}
            pcbX="-2.805mm"
            pcbY="-1.905mm"
            width="1mm"
            height="0.41mm"
            shape="rect"
          />
          <smtpad
            portHints={["source", "pin2"]}
            pcbX="-2.805mm"
            pcbY="-0.635mm"
            width="1mm"
            height="0.41mm"
            shape="rect"
          />
          <smtpad
            portHints={["source", "pin2"]}
            pcbX="-2.805mm"
            pcbY="0.635mm"
            width="1mm"
            height="0.41mm"
            shape="rect"
          />
          {/* Package pin 4 is gate; the exposed 5-8 copper is drain. */}
          <smtpad
            portHints={["gate", "pin3"]}
            pcbX="-2.805mm"
            pcbY="1.905mm"
            width="1mm"
            height="0.41mm"
            shape="rect"
          />
          <smtpad
            portHints={["drain", "pin1"]}
            pcbX="0.805mm"
            pcbY="0mm"
            width="3.63mm"
            height="4.061mm"
            shape="rect"
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C143688.obj?uuid=ceedb41b879045b6b150513b341eb93b",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C143688.step?uuid=ceedb41b879045b6b150513b341eb93b",
        pcbRotationOffset: 180,
        modelOriginPosition: {
          x: 0.1859880499999993,
          y: 0.000012699999999199463,
          z: 0,
        },
      }}
      {...props}
    />
  );
};
