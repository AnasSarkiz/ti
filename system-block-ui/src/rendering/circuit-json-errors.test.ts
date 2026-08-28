import { describe, expect, test } from "bun:test";
import type { AnyCircuitElement } from "circuit-json";
import {
  assertCircuitJsonHasNoErrors,
  CircuitJsonEvaluationError,
  getCircuitJsonErrors,
} from "./circuit-json-errors";

const element = (value: unknown): AnyCircuitElement =>
  value as AnyCircuitElement;

describe("Circuit JSON error detection", () => {
  test("allows ordinary elements and rejects embedded render errors", () => {
    const circuitJson = [
      element({ type: "source_component", source_component_id: "source_1" }),
      element({
        type: "schematic_error",
        error_type: "schematic_port_not_found",
        message: "Could not find selector .missing > .VCC",
      }),
    ];

    expect(getCircuitJsonErrors(circuitJson)).toHaveLength(1);
    expect(() => assertCircuitJsonHasNoErrors(circuitJson)).toThrow(
      CircuitJsonEvaluationError,
    );
    expect(() => assertCircuitJsonHasNoErrors(circuitJson)).toThrow(
      "Could not find selector",
    );
    expect(() =>
      assertCircuitJsonHasNoErrors(circuitJson, {
        ignoredErrorTypes: ["schematic_port_not_found"],
      }),
    ).not.toThrow();
  });
});
