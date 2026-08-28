import webWorkerBlobUrl from "@tscircuit/eval/blob-url";
import { createCircuitWebWorker } from "@tscircuit/eval/worker";
import type { AnyCircuitElement } from "circuit-json";
import { assertCircuitJsonHasNoErrors } from "./circuit-json-errors";
import {
  type EvaluatedSchematicSheet,
  renderSchematicSheets,
  type SchematicSvgOptions,
} from "./render-schematic-sheets";

export {
  CircuitJsonEvaluationError,
  getCircuitJsonErrors,
} from "./circuit-json-errors";
export {
  type EvaluatedSchematicSheet,
  renderSchematicSheets,
  type SchematicSvgOptions,
} from "./render-schematic-sheets";

export const DEFAULT_EVALUATION_TIMEOUT_MS = 30_000;
export const DEFAULT_MAIN_COMPONENT_PATH = "generated-system.tsx";
export const PREVIEW_EVALUATION_PLATFORM = {
  pcbDisabled: false,
  routingDisabled: true,
  partsEngineDisabled: true,
  drcChecksDisabled: true,
  spiceDisabled: true,
} as const;

const NON_FATAL_PREVIEW_ERROR_TYPES = ["pcb_missing_footprint_error"] as const;

export interface EvaluateGeneratedTsxOptions {
  /** Maximum time allowed for worker creation, evaluation, and rendering. */
  timeoutMs?: number;
  /** Virtual path used for the generated default-exported component. */
  mainComponentPath?: string;
  /** Extra virtual files needed by relative imports in the generated TSX. */
  fsMap?: Readonly<Record<string, string>>;
  /** Options forwarded to circuit-to-svg's schematic renderer. */
  schematicOptions?: SchematicSvgOptions;
}

export interface EvaluatedSchematic {
  circuitJson: AnyCircuitElement[];
  sheets: EvaluatedSchematicSheet[];
}

export class SchematicEvaluationTimeoutError extends Error {
  readonly timeoutMs: number;

  constructor(timeoutMs: number) {
    super(`Schematic evaluation timed out after ${timeoutMs}ms`);
    this.name = "SchematicEvaluationTimeoutError";
    this.timeoutMs = timeoutMs;
  }
}

const validateTimeout = (timeoutMs: number): void => {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new RangeError("timeoutMs must be a positive finite number");
  }
};

const validateMainComponentPath = (path: string): void => {
  if (path.trim().length === 0) {
    throw new TypeError("mainComponentPath must not be empty");
  }
};

/**
 * Evaluates generated, default-exported tscircuit TSX in an isolated worker and
 * returns footprint-bearing Circuit JSON plus one schematic SVG per sheet.
 */
export async function evaluateGeneratedTsx(
  tsx: string,
  options: EvaluateGeneratedTsxOptions = {},
): Promise<EvaluatedSchematic> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_EVALUATION_TIMEOUT_MS;
  const mainComponentPath =
    options.mainComponentPath ?? DEFAULT_MAIN_COMPONENT_PATH;

  validateTimeout(timeoutMs);
  validateMainComponentPath(mainComponentPath);

  let worker: Awaited<ReturnType<typeof createCircuitWebWorker>> | undefined;
  let killPromise: Promise<void> | undefined;
  let timedOut = false;

  const killWorker = (): Promise<void> => {
    if (!worker) return Promise.resolve();
    killPromise ??= worker.kill().catch(() => undefined);
    return killPromise;
  };

  const evaluation = (async (): Promise<AnyCircuitElement[]> => {
    worker = await createCircuitWebWorker({
      webWorkerBlobUrl,
      // PCB component and pad generation is required by the ECAD exporters.
      // Routing, external parts lookup, simulation, and DRC are unnecessary for
      // the system preview and are skipped to keep evaluation responsive.
      platform: PREVIEW_EVALUATION_PLATFORM,
    });

    // A worker can finish initializing just after the timeout fires. Kill that
    // late worker before it can begin evaluating the generated source.
    if (timedOut) {
      await killWorker();
      throw new SchematicEvaluationTimeoutError(timeoutMs);
    }

    await worker.executeWithFsMap({
      fsMap: {
        ...options.fsMap,
        [mainComponentPath]: tsx,
      },
      mainComponentPath,
    });
    await worker.renderUntilSettled();
    return await worker.getCircuitJson();
  })();

  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => {
      timedOut = true;
      void killWorker();
      reject(new SchematicEvaluationTimeoutError(timeoutMs));
    }, timeoutMs);
  });

  try {
    const circuitJson = await Promise.race([evaluation, timeout]);
    // Schematic-only blocks may not have selected physical packages yet. Keep
    // their PCB component records available to exporters without preventing a
    // schematic preview; every other evaluation error remains fatal.
    assertCircuitJsonHasNoErrors(circuitJson, {
      ignoredErrorTypes: NON_FATAL_PREVIEW_ERROR_TYPES,
    });
    const sheets = renderSchematicSheets(circuitJson, options.schematicOptions);

    return { circuitJson, sheets };
  } finally {
    if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    await killWorker();
  }
}
