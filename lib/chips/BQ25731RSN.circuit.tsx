import type { ChipProps } from "@tscircuit/props";
import "tscircuit";

const pinLabels = {
  pin1: "VBUS",
  pin2: "ACN",
  pin3: "ACP",
  pin4: "CHRG_OK",
  pin5: "OTG/VAP",
  pin6: "ILIM_HIZ",
  pin7: "VDDA",
  pin8: "IADPT",
  pin9: "IBAT",
  pin10: "PSYS",
  pin11: "PROCHOT",
  pin12: "SDA",
  pin13: "SCL",
  pin14: "CMPIN",
  pin15: "CMPOUT",
  pin16: "COMP1",
  pin17: "COMP2",
  pin18: "CELL_BATPRESZ",
  pin19: "SRN",
  pin20: "SRP",
  pin21: "BATDRV",
  pin22: "VSYS",
  pin23: "SW2",
  pin24: "HIDRV2",
  pin25: "BTST2",
  pin26: "LODRV2",
  pin27: "PGND",
  pin28: "REGN",
  pin29: "LODRV1",
  pin30: "BTST1",
  pin31: "HIDRV1",
  pin32: "SW1",
  pin33: "Thermal_Pad",
} as const;

export const BQ25731RSN = (props: ChipProps<typeof pinLabels>) => (
  <chip manufacturerPartNumber="BQ25731RSN" pinLabels={pinLabels} {...props} />
);

export default BQ25731RSN;
