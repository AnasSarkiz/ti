import type { ComponentProps } from "react";
import { MSP430F5229IRGCR } from "./MSP430F5229IRGCR.circuit.tsx";

export type MSP430F5229Props = ComponentProps<typeof MSP430F5229IRGCR>;

export const MSP430F5229 = (props: MSP430F5229Props) => (
  <MSP430F5229IRGCR {...props} />
);

export default MSP430F5229;
