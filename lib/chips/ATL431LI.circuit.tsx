import type { ComponentProps } from "react";
import { ATL431LIBIDBZR } from "./ATL431LIBIDBZR.circuit.tsx";

type ATL431LIProps = ComponentProps<typeof ATL431LIBIDBZR> & {
  footprintVariant?: "sot_23_3" | (string & {});
};

/** ATL431LI wrapper; currently backed by the B-grade I-temperature DBZ part. */
export const ATL431LI = ({
  footprintVariant: _variant,
  ...props
}: ATL431LIProps) => <ATL431LIBIDBZR {...props} />;

export default ATL431LI;
