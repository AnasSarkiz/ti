import type { ComponentProps } from "react";
import { LMV324AIPWR } from "./LMV324AIPWR.circuit.tsx";

type LMV324AProps = ComponentProps<typeof LMV324AIPWR> & {
  footprintVariant?: "tssop_14" | (string & {});
};

/** LMV324A quad operational-amplifier wrapper for the 14-pin PW package. */
export const LMV324A = ({
  footprintVariant: _variant,
  ...props
}: LMV324AProps) => <LMV324AIPWR {...props} />;

export default LMV324A;
