import type { CSSProperties } from "react";
import { Presets } from "rete-react-plugin";

import type { SystemBlockConnection } from "./types";

function svgSafeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

/** Classic Rete connection renderer with a semantic label along the edge. */
export function LabeledConnection({ data }: { data: SystemBlockConnection }) {
  const { path } = Presets.classic.useConnection();

  if (!path) return null;

  const pathId = `system-block-edge-${svgSafeId(data.id)}`;
  const style = {
    "--connection-color": data.color,
    height: 9999,
    overflow: "visible",
    pointerEvents: "none",
    position: "absolute",
    width: 9999,
  } as CSSProperties;

  return (
    <svg
      aria-label={`${data.label} connection`}
      className="semantic-connection"
      data-testid="system-block-connection"
      style={style}
    >
      <path
        d={path}
        fill="none"
        pointerEvents="stroke"
        stroke="transparent"
        strokeWidth={16}
      />
      <path
        d={path}
        fill="none"
        id={pathId}
        pointerEvents="stroke"
        stroke="var(--connection-color)"
        strokeLinecap="round"
        strokeWidth={4}
      />
      <text
        dominantBaseline="central"
        fill={data.color}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize={12}
        fontWeight={700}
        pointerEvents="none"
        stroke="white"
        strokeLinejoin="round"
        strokeWidth={5}
        style={{ paintOrder: "stroke" }}
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {data.label}
        </textPath>
      </text>
    </svg>
  );
}
