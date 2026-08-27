import type { SubcircuitProps } from "@tscircuit/props";
import "tscircuit";

const TPD2E009_PIN_LABELS = {
  pin1: "D1",
  pin2: "D2",
  pin3: "GND",
} as const;

/**
 * TPD2E009 differential-line ESD protection from TIDA-00399 sheet 9.
 * @see https://www.ti.com/tool/TIDA-00399
 */
export const InputOutputProtection_TPD2E009_TIDA00399 = (
  props: SubcircuitProps,
) => (
  <subcircuit routingDisabled {...props}>
    <chip
      name="UESD"
      manufacturerPartNumber="TPD2E009DRTR"
      pinLabels={TPD2E009_PIN_LABELS}
      showPinAliases={false}
      schX={0}
      schY={0}
      schWidth={1.2}
      schHeight={0.8}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["pin1"] },
        rightSide: { direction: "top-to-bottom", pins: ["pin2"] },
        bottomSide: { direction: "left-to-right", pins: ["pin3"] },
      }}
      connections={{
        pin1: "net.SATA_P",
        pin2: "net.SATA_N",
        pin3: "net.GND",
      }}
    />
  </subcircuit>
);

export default InputOutputProtection_TPD2E009_TIDA00399;
