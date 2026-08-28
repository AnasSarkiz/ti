import "tscircuit";
import { Fragment } from "react";

export type TIDA010266InlineNetPort = {
  name: string;
  net?: string;
  connectsTo: string | string[];
  /** Override which connected endpoints receive inline labels. */
  inlineLabelConnectsTo?: string | string[] | false;
  schX: number;
  schY: number;
  direction?: "left" | "right" | "up" | "down";
  schSheetName?: string;
};

/**
 * Gives a module an electrically real boundary port while drawing the net name
 * inline at the connected component pin(s). Boundary-port coordinates are
 * absolute because schematic subcircuit ports are not transformed by schX/Y.
 */
export const TIDA010266InlineNetPorts = ({
  originX,
  originY,
  ports,
}: {
  originX: number;
  originY: number;
  ports: TIDA010266InlineNetPort[];
}) => (
  <>
    {ports.map(
      ({
        name,
        net = name,
        connectsTo,
        inlineLabelConnectsTo,
        schX,
        schY,
        direction,
        schSheetName,
      }) => {
        const selectedLabelTargets: string | string[] | false =
          inlineLabelConnectsTo ?? connectsTo;
        const labelTargets: string[] =
          selectedLabelTargets === false
            ? []
            : Array.isArray(selectedLabelTargets)
              ? selectedLabelTargets
              : [selectedLabelTargets];

        return (
          <Fragment key={name}>
            <port
              {...({ schSheetName } as Record<string, unknown>)}
              name={name}
              schX={originX + schX}
              schY={originY + schY}
              direction={direction}
              connectsTo={`net.${net}`}
            />
            {labelTargets.map((target, index) => (
              <Fragment key={`${name}-${index}`}>
                <netlabel net={net} connectsTo={target} inline />
              </Fragment>
            ))}
          </Fragment>
        );
      },
    )}
  </>
);
