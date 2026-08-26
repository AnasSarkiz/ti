import type { ComponentProps } from "react";

import { LP5892QRRFRQ1 } from "./LP5892QRRFRQ1.circuit.tsx";

type LP5892Q1FootprintVariant = "vqfn_76_ep_9x9" | (string & {});

export type LP5892Q1Props = ComponentProps<typeof LP5892QRRFRQ1> & {
  footprintVariant?: LP5892Q1FootprintVariant;
};

/** Package-agnostic LP5892-Q1 LED-matrix driver component. */
export const LP5892Q1 = ({
  footprintVariant = "vqfn_76_ep_9x9",
  ...props
}: LP5892Q1Props) => {
  if (footprintVariant === "vqfn_76_ep_9x9") {
    return <LP5892QRRFRQ1 {...props} />;
  }

  return <LP5892QRRFRQ1 {...props} />;
};

export default LP5892Q1;
