export interface SchematicEvaluationRequest {
  readonly graphRevision: number;
  readonly requestId: number;
}

/**
 * Synchronously identifies the one evaluation allowed to update preview state.
 * Graph invalidation is independent from React's asynchronous state commits.
 */
export class SchematicEvaluationCoordinator {
  private graphRevision = 0;
  private latestRequestId = 0;

  invalidateGraph(): void {
    this.graphRevision += 1;
  }

  startRequest(): SchematicEvaluationRequest {
    this.latestRequestId += 1;
    return {
      graphRevision: this.graphRevision,
      requestId: this.latestRequestId,
    };
  }

  isCurrent(request: SchematicEvaluationRequest): boolean {
    return (
      request.graphRevision === this.graphRevision &&
      request.requestId === this.latestRequestId
    );
  }
}
