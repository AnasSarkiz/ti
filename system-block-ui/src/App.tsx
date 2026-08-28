import type { AnyCircuitElement } from "circuit-json";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BlockPalette,
  SYSTEM_BLOCK_DRAG_MIME,
} from "./components/BlockPalette";
import {
  CircuitIcon,
  FitIcon,
  HammerIcon,
  PdfIcon,
  ResetIcon,
} from "./components/Icons";
import { OutputPanel } from "./components/OutputPanel";
import {
  createSystemBlockEditor,
  type SystemBlockEditorController,
  type SystemBlockGraphSnapshot,
  type SystemBlockInitialGraph,
} from "./editor";
import {
  type BlockInstance,
  createSystemBlockExamples,
  DEFAULT_SYSTEM_BLOCK_EXAMPLE_ID,
  generateSystemDesignArtifacts,
  getSubcircuitCatalog,
  resolveDesignConnections,
  type SubcircuitDefinition,
} from "./model";
import { downloadBlob } from "./rendering/download-blob";
import type { EvaluatedSchematicSheet } from "./rendering/evaluate-schematic";
import {
  GENERATED_SYSTEM_MAIN_FILE_NAME,
  getGeneratedSystemEvaluationFsMap,
} from "./rendering/generated-source-files";
import {
  SCHEMATIC_SVG_HEIGHT,
  SCHEMATIC_SVG_WIDTH,
} from "./rendering/schematic-page-size";
import { SchematicEvaluationCoordinator } from "./schematic-evaluation-coordinator";

interface Notice {
  message: string;
  tone: "default" | "error" | "success";
}

const instanceBaseName = (componentName: string): string =>
  componentName
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/[^A-Za-z0-9_]+/g, "_")
    .toLowerCase();

const nextInstance = (
  definition: SubcircuitDefinition,
  blocks: readonly BlockInstance[],
): Pick<BlockInstance, "id" | "name"> => {
  const base = instanceBaseName(definition.componentName);
  let index = 1;
  let name = `${base}_${index}`;
  const used = new Set(blocks.flatMap((block) => [block.id, block.name ?? ""]));
  while (used.has(name)) {
    index += 1;
    name = `${base}_${index}`;
  }
  return { id: name, name };
};

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export function App() {
  const catalog = useMemo(() => getSubcircuitCatalog(), []);
  const examples = useMemo(() => createSystemBlockExamples(catalog), [catalog]);
  const starterExample = examples.find(
    (example) => example.id === DEFAULT_SYSTEM_BLOCK_EXAMPLE_ID,
  );
  if (!starterExample) throw new Error("Missing default system block example.");
  const starterDesign: SystemBlockInitialGraph = starterExample.graph;
  const canvasRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SystemBlockEditorController | undefined>(
    undefined,
  );
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const evaluationCoordinatorRef = useRef<
    SchematicEvaluationCoordinator | undefined
  >(undefined);
  evaluationCoordinatorRef.current ??= new SchematicEvaluationCoordinator();
  const evaluatedCircuitJsonRef = useRef<
    readonly AnyCircuitElement[] | undefined
  >(undefined);
  const designRevisionRef = useRef(0);

  const [snapshot, setSnapshot] = useState<SystemBlockGraphSnapshot>(() => ({
    blocks: [...starterDesign.blocks],
    connections: [...starterDesign.connections],
    resolvedConnections: [
      ...resolveDesignConnections(
        starterDesign.blocks,
        starterDesign.connections,
        catalog,
      ),
    ],
  }));
  const [notice, setNotice] = useState<Notice>();
  const [loadedExampleId, setLoadedExampleId] = useState(starterExample.id);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [schematicSheets, setSchematicSheets] = useState<
    readonly EvaluatedSchematicSheet[]
  >([]);
  const [evaluatedCircuitJson, setEvaluatedCircuitJson] = useState<
    readonly AnyCircuitElement[] | undefined
  >();
  const hasAutomaticPower = snapshot.connections.some(
    (connection) => connection.kind.toLowerCase() === "power",
  );
  const dataLinkCount = snapshot.connections.filter(
    (connection) => connection.kind.toLowerCase() === "data",
  ).length;

  const notify = useCallback(
    (message: string, tone: Notice["tone"] = "default") => {
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
      setNotice({ message, tone });
      noticeTimerRef.current = setTimeout(() => setNotice(undefined), 3600);
    },
    [],
  );

  useEffect(
    () => () => {
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    },
    [],
  );

  const generatedArtifacts = useMemo(
    () =>
      generateSystemDesignArtifacts({
        blocks: snapshot.blocks,
        connections: snapshot.connections,
        catalog,
        boardName: "ti_system_design",
      }),
    [catalog, snapshot.blocks, snapshot.connections],
  );

  const invalidateSchematic = useCallback(() => {
    designRevisionRef.current += 1;
    evaluationCoordinatorRef.current?.invalidateGraph();
    evaluatedCircuitJsonRef.current = undefined;
    setIsRendering(false);
    setSchematicSheets([]);
    setEvaluatedCircuitJson(undefined);
  }, []);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    let disposed = false;
    let controller: SystemBlockEditorController | undefined;

    void createSystemBlockEditor(container, {
      catalog,
      initialGraph: starterDesign,
      onGraphChange: (nextSnapshot) => {
        if (disposed) return;
        invalidateSchematic();
        setSnapshot(nextSnapshot);
      },
      onConnectionRejected: ({ error }) => notify(error.message, "error"),
    })
      .then((created) => {
        if (disposed) {
          created.destroy();
          return;
        }
        controller = created;
        controllerRef.current = created;
        setIsEditorReady(true);
        requestAnimationFrame(() => void created.zoomToFit());
      })
      .catch((error: unknown) => {
        if (!disposed) {
          notify(
            `Could not initialize the editor: ${errorMessage(error)}`,
            "error",
          );
        }
      });

    return () => {
      disposed = true;
      if (controllerRef.current === controller)
        controllerRef.current = undefined;
      setIsEditorReady(false);
      evaluationCoordinatorRef.current?.invalidateGraph();
      evaluatedCircuitJsonRef.current = undefined;
      designRevisionRef.current += 1;
      controller?.destroy();
    };
  }, [catalog, invalidateSchematic, notify, starterDesign]);

  const insertDefinition = useCallback(
    async (
      definition: SubcircuitDefinition,
      clientPoint?: { x: number; y: number },
    ) => {
      const controller = controllerRef.current;
      const canvas = canvasRef.current;
      if (!controller || !canvas) return;
      if (definition.canInstantiate === false) {
        notify(
          definition.warning ?? "This block cannot be instantiated.",
          "error",
        );
        return;
      }

      const point =
        clientPoint ??
        (() => {
          const rect = canvas.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        })();

      try {
        await controller.addBlockAtClientPoint(
          definition,
          point,
          nextInstance(definition, controller.getSnapshot().blocks),
        );
        if (definition.warning) notify(definition.warning);
      } catch (error) {
        notify(errorMessage(error), "error");
      }
    },
    [notify],
  );

  const renderSchematic = useCallback(async () => {
    if (window.location.protocol === "file:") {
      const message =
        'Schematic evaluation requires HTTP. In system-block-ui, run "bun run build && bun run preview", then open the shown local URL.';
      notify(message, "error");
      return;
    }

    const coordinator = evaluationCoordinatorRef.current;
    if (!coordinator) return;
    const request = coordinator.startRequest();
    setIsRendering(true);
    try {
      const [
        { evaluateGeneratedTsx },
        { createLocalTiPackageEvaluationFsMap },
      ] = await Promise.all([
        import("./rendering/evaluate-schematic"),
        import("./rendering/local-ti-package-files"),
      ]);
      const selectedDefinitions = snapshot.blocks.map((block) => {
        const definition = catalog.find(
          (candidate) => candidate.id === block.definitionId,
        );
        if (!definition) {
          throw new Error(
            `Cannot render unknown subcircuit ${block.definitionId}.`,
          );
        }
        return definition;
      });
      const rendered = await evaluateGeneratedTsx(generatedArtifacts.tsx, {
        mainComponentPath: GENERATED_SYSTEM_MAIN_FILE_NAME,
        fsMap: {
          ...getGeneratedSystemEvaluationFsMap(generatedArtifacts),
          ...createLocalTiPackageEvaluationFsMap(selectedDefinitions),
        },
        timeoutMs: 45_000,
        schematicOptions: {
          width: SCHEMATIC_SVG_WIDTH,
          height: SCHEMATIC_SVG_HEIGHT,
          includeVersion: true,
        },
      });
      if (!coordinator.isCurrent(request)) return;
      evaluatedCircuitJsonRef.current = rendered.circuitJson;
      setEvaluatedCircuitJson(rendered.circuitJson);
      setSchematicSheets(rendered.sheets);
      notify(
        `${rendered.sheets.length} schematic sheet${rendered.sheets.length === 1 ? "" : "s"} rendered with PCB components enabled; routing and DRC disabled.`,
        "success",
      );
    } catch (error) {
      if (!coordinator.isCurrent(request)) return;
      const message = errorMessage(error);
      notify(message, "error");
    } finally {
      if (coordinator.isCurrent(request)) setIsRendering(false);
    }
  }, [catalog, generatedArtifacts, notify, snapshot.blocks]);

  const resetDesign = useCallback(async () => {
    const example =
      examples.find((candidate) => candidate.id === loadedExampleId) ??
      starterExample;
    try {
      await controllerRef.current?.loadInitialGraph(example.graph);
      await controllerRef.current?.zoomToFit();
      notify(`Restored the ${example.title} example.`, "success");
    } catch (error) {
      notify(errorMessage(error), "error");
    }
  }, [examples, loadedExampleId, notify, starterExample]);

  const loadExample = useCallback(
    async (exampleId: string) => {
      const example = examples.find((candidate) => candidate.id === exampleId);
      const controller = controllerRef.current;
      if (!example || !controller) return;

      try {
        await controller.loadInitialGraph(example.graph);
        setLoadedExampleId(example.id);
        await controller.zoomToFit();
        notify(
          `Loaded ${example.title} from ${example.sourcePath}.`,
          "success",
        );
      } catch (error) {
        notify(`Could not load example: ${errorMessage(error)}`, "error");
      }
    },
    [examples, notify],
  );

  const downloadPdf = useCallback(async () => {
    const sheets = schematicSheets;
    const circuitJson = evaluatedCircuitJson;
    if (sheets.length === 0 || !circuitJson) return;
    try {
      const { createSchematicPdfBlob } = await import("./rendering/export-pdf");
      const blob = await createSchematicPdfBlob(sheets, {
        title: "TI System Block Schematic",
      });
      if (evaluatedCircuitJsonRef.current !== circuitJson) return;
      downloadBlob(blob, "GeneratedSystem.schematic.pdf");
      notify(`${sheets.length}-page schematic PDF downloaded.`, "success");
    } catch (error) {
      if (evaluatedCircuitJsonRef.current !== circuitJson) return;
      notify(errorMessage(error), "error");
    }
  }, [evaluatedCircuitJson, notify, schematicSheets]);

  const downloadCircuitJson = useCallback(async () => {
    const circuitJson = evaluatedCircuitJson;
    if (!circuitJson) return;
    try {
      const { createCircuitJsonDownloadBlob, getCircuitJsonDownloadFileName } =
        await import("./rendering/export-circuit-json");
      if (evaluatedCircuitJsonRef.current !== circuitJson) return;
      const options = { projectName: "GeneratedSystem" } as const;
      const blob = createCircuitJsonDownloadBlob(circuitJson);
      downloadBlob(blob, getCircuitJsonDownloadFileName(options));
      notify("Circuit JSON downloaded.", "success");
    } catch (error) {
      if (evaluatedCircuitJsonRef.current !== circuitJson) return;
      notify(`Could not export Circuit JSON: ${errorMessage(error)}`, "error");
    }
  }, [evaluatedCircuitJson, notify]);

  const downloadTscircuitTsxZip = useCallback(async () => {
    const artifacts = generatedArtifacts;
    const designRevision = designRevisionRef.current;
    try {
      const { createTscircuitTsxZipBlob, getTscircuitTsxZipFileName } =
        await import("./rendering/export-tscircuit-tsx");
      if (designRevisionRef.current !== designRevision) return;
      const options = { projectName: "GeneratedSystem" } as const;
      const blob = createTscircuitTsxZipBlob(artifacts);
      if (designRevisionRef.current !== designRevision) return;
      downloadBlob(blob, getTscircuitTsxZipFileName(options));
      notify("tscircuit TSX ZIP downloaded.", "success");
    } catch (error) {
      if (designRevisionRef.current !== designRevision) return;
      notify(
        `Could not export the tscircuit TSX ZIP: ${errorMessage(error)}`,
        "error",
      );
    }
  }, [generatedArtifacts, notify]);

  const downloadKicadProject = useCallback(async () => {
    const circuitJson = evaluatedCircuitJson;
    if (!circuitJson) return;
    try {
      const { createKicadProjectZipBlob, getKicadProjectZipFileName } =
        await import("./rendering/export-kicad-project");
      const options = { projectName: "GeneratedSystem" } as const;
      const blob = await createKicadProjectZipBlob(circuitJson, options);
      if (evaluatedCircuitJsonRef.current !== circuitJson) return;
      downloadBlob(blob, getKicadProjectZipFileName(options));
      notify("KiCad project ZIP downloaded.", "success");
    } catch (error) {
      if (evaluatedCircuitJsonRef.current !== circuitJson) return;
      notify(
        `Could not export the KiCad project: ${errorMessage(error)}`,
        "error",
      );
    }
  }, [evaluatedCircuitJson, notify]);

  const downloadAltiumProject = useCallback(async () => {
    const circuitJson = evaluatedCircuitJson;
    if (!circuitJson) return;
    try {
      const { createAltiumProjectZipBlob, getAltiumProjectZipFileName } =
        await import("./rendering/export-altium-project");
      const options = { projectName: "GeneratedSystem" } as const;
      const blob = await createAltiumProjectZipBlob(circuitJson, options);
      if (evaluatedCircuitJsonRef.current !== circuitJson) return;
      downloadBlob(blob, getAltiumProjectZipFileName(options));
      notify("Altium project ZIP downloaded.", "success");
    } catch (error) {
      if (evaluatedCircuitJsonRef.current !== circuitJson) return;
      notify(
        `Could not export the Altium project: ${errorMessage(error)}`,
        "error",
      );
    }
  }, [evaluatedCircuitJson, notify]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <CircuitIcon />
          </span>
          <span className="brand-copy">
            <h1 className="brand-title">tscircuit TI Block Builder (Demo)</h1>
          </span>
        </div>

        <div className="topbar-actions">
          <span className="status-chip">
            <span className="status-dot" />
            Automatic resolver active
          </span>
          <button
            className="primary-button"
            disabled={isRendering}
            onClick={() => void renderSchematic()}
            type="button"
          >
            <span className="button-content">
              <HammerIcon />
              {isRendering ? "Building…" : "Build"}
            </span>
          </button>
        </div>
      </header>

      <div className="app-grid">
        <BlockPalette
          definitions={catalog}
          onInsert={(definitionId) => {
            const definition = catalog.find((item) => item.id === definitionId);
            if (definition) void insertDefinition(definition);
          }}
        >
          <label className="example-loader">
            <span className="visually-hidden">Load example diagram</span>
            <select
              aria-label="Load example diagram"
              className="example-select"
              defaultValue=""
              disabled={!isEditorReady}
              onChange={(event) => {
                const exampleId = event.currentTarget.value;
                event.currentTarget.value = "";
                void loadExample(exampleId);
              }}
            >
              <option disabled value="">
                Load Example
              </option>
              {examples.map((example) => (
                <option key={example.id} value={example.id}>
                  {example.title}
                </option>
              ))}
            </select>
          </label>
        </BlockPalette>

        <section
          className="canvas-panel"
          aria-label="System block canvas"
          onDragOver={(event) => {
            if (event.dataTransfer.types.includes(SYSTEM_BLOCK_DRAG_MIME)) {
              event.preventDefault();
              event.dataTransfer.dropEffect = "copy";
            }
          }}
          onDrop={(event) => {
            const definitionId = event.dataTransfer.getData(
              SYSTEM_BLOCK_DRAG_MIME,
            );
            if (!definitionId) return;
            event.preventDefault();
            const definition = catalog.find((item) => item.id === definitionId);
            if (definition) {
              void insertDefinition(definition, {
                x: event.clientX,
                y: event.clientY,
              });
            }
          }}
        >
          <div className="flow-canvas" ref={canvasRef} />
          <div className="canvas-toolbar">
            <span className="toolbar-label">
              {snapshot.blocks.length}{" "}
              {snapshot.blocks.length === 1 ? "block" : "blocks"}
              {hasAutomaticPower ? " · automatic power" : ""} · {dataLinkCount}{" "}
              {dataLinkCount === 1 ? "data link" : "data links"}
            </span>
            <span className="toolbar-separator" />
            <button
              aria-label="Fit graph to canvas"
              className="icon-button"
              onClick={() => void controllerRef.current?.zoomToFit()}
              title="Fit graph"
              type="button"
            >
              <FitIcon />
            </button>
            <button
              aria-label="Reset loaded example"
              className="icon-button"
              onClick={() => void resetDesign()}
              title="Reset loaded example"
              type="button"
            >
              <ResetIcon />
            </button>
          </div>
          <div className="drop-hint">
            <PdfIcon height={14} width={14} />
            Drag blocks · connect matching semantic sockets
          </div>

          {notice && (
            <div className="notice" data-tone={notice.tone} role="status">
              {notice.message}
            </div>
          )}
        </section>

        <OutputPanel
          hasSchematic={schematicSheets.length > 0}
          isRendering={isRendering}
          onDownloadAltiumProject={downloadAltiumProject}
          onDownloadCircuitJson={downloadCircuitJson}
          onDownloadKicadProject={downloadKicadProject}
          onDownloadSchematicPdf={downloadPdf}
          onDownloadTscircuitTsxZip={downloadTscircuitTsxZip}
          schematicSheetCount={schematicSheets.length}
          tsx={generatedArtifacts.tsx}
        />
      </div>
    </main>
  );
}
