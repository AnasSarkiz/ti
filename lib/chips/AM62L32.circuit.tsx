import type { ComponentProps } from "react";

import { AM62L32BOGHAANBR } from "./AM62L32BOGHAANBR.circuit.tsx";

type AM62L32FootprintVariant = "fccsp_373_anb" | (string & {});

type AM62L32Props = ComponentProps<typeof AM62L32BOGHAANBR> & {
  footprintVariant?: AM62L32FootprintVariant;
};

export const AM62L32 = ({
  footprintVariant = "fccsp_373_anb",
  ...props
}: AM62L32Props) => {
  if (footprintVariant === "fccsp_373_anb") {
    return <AM62L32BOGHAANBR {...props} />;
  }

  return <AM62L32BOGHAANBR {...props} />;
};
