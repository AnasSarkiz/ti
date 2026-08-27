import { describe, expect, test } from "bun:test";
import { SchematicEvaluationCoordinator } from "./schematic-evaluation-coordinator";

describe("SchematicEvaluationCoordinator", () => {
  test("invalidates requests after a graph change or a newer request", () => {
    const coordinator = new SchematicEvaluationCoordinator();
    const first = coordinator.startRequest();

    expect(coordinator.isCurrent(first)).toBe(true);

    const second = coordinator.startRequest();
    expect(coordinator.isCurrent(first)).toBe(false);
    expect(coordinator.isCurrent(second)).toBe(true);

    coordinator.invalidateGraph();
    expect(coordinator.isCurrent(second)).toBe(false);

    const currentGraphRequest = coordinator.startRequest();
    expect(coordinator.isCurrent(currentGraphRequest)).toBe(true);
  });
});
