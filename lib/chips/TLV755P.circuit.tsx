import type { ComponentProps } from "react";
import { TLV75533PDBVR } from "./TLV75533PDBVR.circuit.tsx";

type TLV755PFootprintVariant = "sot_23_5" | (string & {});

type TLV755PProps = ComponentProps<typeof TLV75533PDBVR> & {
  footprintVariant?: TLV755PFootprintVariant;
};

export const TLV755P = ({
  footprintVariant = "sot_23_5",
  ...props
}: TLV755PProps) => {
  if (footprintVariant === "sot_23_5") {
    return <TLV75533PDBVR {...props} />;
  }

  return <TLV75533PDBVR {...props} />;
};

export default TLV755P;
