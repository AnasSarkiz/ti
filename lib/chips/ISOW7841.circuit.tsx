import type { ComponentProps } from "react";
import { ISOW7841DWR } from "./ISOW7841DWR.circuit.tsx";

type ISOW7841FootprintVariant = "soic_16_wide" | (string & {});

type ISOW7841Props = ComponentProps<typeof ISOW7841DWR> & {
  footprintVariant?: ISOW7841FootprintVariant;
};

export const ISOW7841 = ({
  footprintVariant = "soic_16_wide",
  ...props
}: ISOW7841Props) => {
  if (footprintVariant === "soic_16_wide") {
    return <ISOW7841DWR {...props} />;
  }

  return <ISOW7841DWR {...props} />;
};

export default ISOW7841;
