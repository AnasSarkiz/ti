import type { ComponentProps } from "react";
import { INA350CDSIDSGR } from "./INA350CDSIDSGR.circuit.tsx";

type INA350Props = ComponentProps<typeof INA350CDSIDSGR> & {
  footprintVariant?: "wson_8_ep_2x2";
};

export const INA350 = ({
  footprintVariant = "wson_8_ep_2x2",
  ...props
}: INA350Props) => {
  if (footprintVariant !== "wson_8_ep_2x2") {
    throw new Error(
      `Unsupported INA350 footprint variant: ${footprintVariant}`,
    );
  }
  return <INA350CDSIDSGR {...props} />;
};

export default INA350;
