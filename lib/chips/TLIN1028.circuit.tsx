import type { ComponentProps } from "react";
import { TLIN10283DDARQ1 } from "./TLIN10283DDARQ1.circuit.tsx";

type TLIN1028FootprintVariant = "soic_8_powerpad" | (string & {});

type TLIN1028Props = ComponentProps<typeof TLIN10283DDARQ1> & {
  footprintVariant?: TLIN1028FootprintVariant;
};

export const TLIN1028 = ({
  footprintVariant = "soic_8_powerpad",
  ...props
}: TLIN1028Props) => {
  if (footprintVariant === "soic_8_powerpad") {
    return <TLIN10283DDARQ1 {...props} />;
  }

  return <TLIN10283DDARQ1 {...props} />;
};

export default TLIN1028;
