import type { AnyCircuitElement } from "circuit-json";

export interface CircuitJsonErrorElement {
  type: string;
  error_type: string;
  message: string;
  is_fatal?: boolean;
}

export class CircuitJsonEvaluationError extends Error {
  readonly errors: readonly CircuitJsonErrorElement[];

  constructor(errors: readonly CircuitJsonErrorElement[]) {
    const details = errors
      .slice(0, 3)
      .map((error) => error.message)
      .join("; ");
    const remainder = errors.length > 3 ? ` (+${errors.length - 3} more)` : "";
    super(
      `Generated circuit contains ${errors.length} error${errors.length === 1 ? "" : "s"}: ${details}${remainder}`,
    );
    this.name = "CircuitJsonEvaluationError";
    this.errors = errors;
  }
}

export const getCircuitJsonErrors = (
  elements: readonly AnyCircuitElement[],
): readonly CircuitJsonErrorElement[] =>
  elements.flatMap((element) => {
    const candidate = element as unknown as Record<string, unknown>;
    return typeof candidate.type === "string" &&
      typeof candidate.error_type === "string" &&
      typeof candidate.message === "string"
      ? [candidate as unknown as CircuitJsonErrorElement]
      : [];
  });

export const assertCircuitJsonHasNoErrors = (
  elements: readonly AnyCircuitElement[],
): void => {
  const errors = getCircuitJsonErrors(elements);
  if (errors.length > 0) throw new CircuitJsonEvaluationError(errors);
};
