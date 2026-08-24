import type { ComponentProps } from "react";
import { SN65HVD1473DGSR } from "./SN65HVD1473DGSR.circuit.tsx";

type SN65HVD1473FootprintVariant = "vssop_10" | (string & {});

type SN65HVD1473Props = ComponentProps<typeof SN65HVD1473DGSR> & {
  footprintVariant?: SN65HVD1473FootprintVariant;
};

export const SN65HVD1473 = ({
  footprintVariant = "vssop_10",
  ...props
}: SN65HVD1473Props) => {
  if (footprintVariant === "vssop_10") {
    return <SN65HVD1473DGSR {...props} />;
  }

  return <SN65HVD1473DGSR {...props} />;
};

export default SN65HVD1473;
