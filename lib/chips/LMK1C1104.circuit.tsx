import type { ComponentProps } from "react";
import { LMK1C1104PWR } from "./LMK1C1104PWR.circuit.tsx";

type LMK1C1104FootprintVariant = "tssop_8" | (string & {});

type LMK1C1104Props = ComponentProps<typeof LMK1C1104PWR> & {
  footprintVariant?: LMK1C1104FootprintVariant;
};

export const LMK1C1104 = ({
  footprintVariant = "tssop_8",
  ...props
}: LMK1C1104Props) => {
  if (footprintVariant === "tssop_8") {
    return <LMK1C1104PWR {...props} />;
  }

  return <LMK1C1104PWR {...props} />;
};

export default LMK1C1104;
