import type { ComponentProps } from "react";
import { DRV8210DSGR } from "./DRV8210DSGR.circuit.tsx";

type DRV8210FootprintVariant = "wson_8_ep_2x2" | (string & {});

type DRV8210Props = ComponentProps<typeof DRV8210DSGR> & {
  footprintVariant?: DRV8210FootprintVariant;
};

export const DRV8210 = ({
  footprintVariant = "wson_8_ep_2x2",
  ...props
}: DRV8210Props) => {
  if (footprintVariant === "wson_8_ep_2x2") {
    return <DRV8210DSGR {...props} />;
  }

  return <DRV8210DSGR {...props} />;
};

export default DRV8210;
