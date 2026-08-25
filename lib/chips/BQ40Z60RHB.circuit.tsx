import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "BAT",
  pin2: "PBI",
  pin3: "VC4",
  pin4: "VC3",
  pin5: "VC2",
  pin6: "VC1",
  pin7: "SRN",
  pin8: "SRP",
  pin9: "VSS",
  pin10: "TS1",
  pin11: "TS2",
  pin12: "TS3",
  pin13: "TS4",
  pin14: "GPIO0",
  pin15: "GPIO1",
  pin16: "SMBD",
  pin17: "SMBC",
  pin18: "VFB",
  pin19: "HSRN",
  pin20: "HSRP",
  pin21: "AFEFUSE",
  pin22: "VCC",
  pin23: "REGN",
  pin24: "PGND",
  pin25: "LODRV",
  pin26: "PH",
  pin27: "HIDRV",
  pin28: "BTST",
  pin29: "ACFET",
  pin30: "DSG",
  pin31: "ACP",
  pin32: "CHG",
  pin33: "PAD",
} as const;

export const BQ40Z60RHB = (props: ChipProps<typeof pinLabels>) => (
  <chip manufacturerPartNumber="BQ40Z60RHB" pinLabels={pinLabels} {...props} />
);

export default BQ40Z60RHB;
