import type { ComponentProps } from "react";
import { TPS7A2033PDBVR } from "./TPS7A2033PDBVR.circuit.tsx";

type TPS7A20FootprintVariant = "sot_23_5" | (string & {});

type TPS7A20Props = ComponentProps<typeof TPS7A2033PDBVR> & {
  footprintVariant?: TPS7A20FootprintVariant;
};

export const TPS7A20 = ({
  footprintVariant = "sot_23_5",
  ...props
}: TPS7A20Props) => {
  if (footprintVariant === "sot_23_5") {
    return <TPS7A2033PDBVR {...props} />;
  }

  return <TPS7A2033PDBVR {...props} />;
};

export default TPS7A20;
