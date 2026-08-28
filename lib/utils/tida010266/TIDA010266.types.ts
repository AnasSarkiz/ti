import type { SubcircuitProps } from "@tscircuit/props";

/** Section metadata propagated to physical components in the one-sheet design. */
export type TIDA010266SectionedSubcircuitProps = SubcircuitProps & {
  schSectionName?: string;
};
