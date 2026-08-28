import type { ComponentProps } from "react";
import { TPS7A2433DBVR } from "./TPS7A2433DBVR.circuit.tsx";

type TPS7A24Props = ComponentProps<typeof TPS7A2433DBVR> & {
  footprintVariant?: "sot_23_5" | (string & {});
};

/** TPS7A24 fixed 3.3 V wrapper; currently backed by TPS7A2433DBVR. */
export const TPS7A24 = ({
  footprintVariant: _variant,
  ...props
}: TPS7A24Props) => <TPS7A2433DBVR {...props} />;

export default TPS7A24;
