import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getBezierPath,
} from "@xyflow/react";

import type { SystemBlockConnection } from "./types";

export function SemanticEdge({
  data,
  id,
  markerEnd,
  markerStart,
  selected,
  sourcePosition,
  sourceX,
  sourceY,
  targetPosition,
  targetX,
  targetY,
}: EdgeProps<SystemBlockConnection>) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.32,
  });
  const color = data?.color ?? "#64748b";

  return (
    <>
      <BaseEdge
        id={id}
        interactionWidth={24}
        markerEnd={markerEnd}
        markerStart={markerStart}
        path={path}
        style={{
          stroke: color,
          strokeLinecap: "round",
          strokeWidth: selected ? 4 : 3,
        }}
      />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan system-block-edge-label"
          data-kind={data?.kind}
          style={{
            borderColor: color,
            color,
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          title={
            data
              ? `${data.label}: ${data.resolved.traces.length} resolved trace${data.resolved.traces.length === 1 ? "" : "s"}`
              : undefined
          }
        >
          <span
            className="system-block-edge-label-dot"
            style={{ background: color }}
          />
          <span>{data?.label ?? "Connection"}</span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
