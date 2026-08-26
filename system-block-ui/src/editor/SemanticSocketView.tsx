import type { CSSProperties } from "react";

import { type SemanticSocket, SYSTEM_BLOCK_CONNECTION_COLORS } from "./types";

/** Color-coded socket renderer for the aggregate Power and Data interfaces. */
export function SemanticSocketView({ data }: { data: SemanticSocket }) {
  const style = {
    "--socket-color": SYSTEM_BLOCK_CONNECTION_COLORS[data.kind],
  } as CSSProperties;

  return (
    <div
      aria-label={`${data.name} ${data.side}`}
      className="semantic-socket"
      data-kind={data.kind}
      role="img"
      style={style}
      title={`${data.name} ${data.side}`}
    />
  );
}
