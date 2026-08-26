import type { ComponentProps } from "react";

import { MSPM0L1306SRHBR } from "../../imports/MSPM0L1306SRHBR.tsx";

type MSPM0L1306FootprintVariant = "vqfn_32_rhb" | (string & {});

type MSPM0L1306Props = ComponentProps<typeof MSPM0L1306SRHBR> & {
  footprintVariant?: MSPM0L1306FootprintVariant;
};

export const MSPM0L1306 = ({
  footprintVariant = "vqfn_32_rhb",
  ...props
}: MSPM0L1306Props) => {
  if (footprintVariant === "vqfn_32_rhb") {
    return <MSPM0L1306SRHBR {...props} />;
  }

  return <MSPM0L1306SRHBR {...props} />;
};
