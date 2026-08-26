import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BlockPalette,
  SYSTEM_BLOCK_DRAG_MIME,
} from "./components/BlockPalette";
import {
  CircuitIcon,
  CodeIcon,
  FitIcon,
  PdfIcon,
  ResetIcon,
  SparkIcon,
} from "./components/Icons";
import { OutputPanel } from "./components/OutputPanel";
import {
  createSystemBlockEditor,
  type SystemBlockEditorController,
  type SystemBlockGraphSnapshot,
  type SystemBlockInitialGraph,
} from "./editor";
import {
  generateTsx,
  getSubcircuitCatalog,
  resolveDesignConnections,
  type BlockInstance,
  type LogicalConnection,
  type SubcircuitDefinition,
} from "./model";
import { downloadBlob } from "./rendering/download-blob";

interface Notice {
  message: string;
  tone: "default" | "error" | "success";
}

const componentId = (
  catalog: readonly SubcircuitDefinition[],
  componentName: string,
): string => {
  const definition = catalog.find(
    (candidate) => candidate.componentName === componentName,
  );
  if (!definition)
    throw new Error(`Missing catalog entry for ${componentName}`);
  return definition.id;
};

const createStarterDesign = (
  catalog: readonly SubcircuitDefinition[],
): SystemBlockInitialGraph => {
  const blocks: BlockInstance[] = [
    {
      id: "charger",
      name: "charger",
      definitionId: componentId(catalog, "BatteryManagement_BQ24074"),
      position: { x: 40, y: 250 },
    },
    {
      id: "power_1v8",
      name: "power_1v8",
      definitionId: componentId(catalog, "PowerManagement_TPS7A2018"),
      position: { x: 325, y: 100 },
    },
    {
      id: "bluetooth_controller",
      name: "bluetooth_controller",
      definitionId: componentId(catalog, "BluetoothController_CC2564C"),
      position: { x: 630, y: 35 },
    },
    {
      id: "bluetooth_host",
      name: "bluetooth_host",
      definitionId: componentId(catalog, "BluetoothAudioHost_MSP430F5229"),
      position: { x: 625, y: 390 },
    },
    {
      id: "audio_amplifier",
      name: "audio_amplifier",
      definitionId: componentId(catalog, "AudioAmplifier_TAS2505"),
      position: { x: 970, y: 220 },
    },
  ];

  const connections: LogicalConnection[] = [
    {
      id: "power_charger_to_ldo",
      fromBlockId: "charger",
      toBlockId: "power_1v8",
      kind: "power",
    },
    {
      id: "power_charger_to_radio",
      fromBlockId: "charger",
      toBlockId: "bluetooth_controller",
      kind: "power",
    },
    {
      id: "power_charger_to_amplifier",
      fromBlockId: "charger",
      toBlockId: "audio_amplifier",
      kind: "power",
    },
    {
      id: "power_ldo_to_radio_logic",
      fromBlockId: "power_1v8",
      toBlockId: "bluetooth_controller",
      kind: "power",
    },
    {
      id: "power_ldo_to_host",
      fromBlockId: "power_1v8",
      toBlockId: "bluetooth_host",
      kind: "power",
    },
    {
      id: "power_ldo_to_amplifier_logic",
      fromBlockId: "power_1v8",
      toBlockId: "audio_amplifier",
      kind: "power",
    },
    {
      id: "data_hci",
      fromBlockId: "bluetooth_host",
      toBlockId: "bluetooth_controller",
      kind: "data",
      protocol: "hci-uart",
    },
    {
      id: "data_audio_control",
      fromBlockId: "bluetooth_host",
      toBlockId: "audio_amplifier",
      kind: "data",
      protocol: "i2c",
    },
    {
      id: "data_digital_audio",
      fromBlockId: "bluetooth_controller",
      toBlockId: "audio_amplifier",
      kind: "data",
      protocol: "i2s",
    },
  ];

  return { blocks, connections };
};

const emptySnapshot = (): SystemBlockGraphSnapshot => ({
  blocks: [],
  connections: [],
  resolvedConnections: [],
});

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
  const starterDesign = useMemo(() => createStarterDesign(catalog), [catalog]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SystemBlockEditorController | undefined>(
    undefined,
  );
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const tsxRef = useRef("");

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
  const [isRendering, setIsRendering] = useState(false);
  const [schematicSvg, setSchematicSvg] = useState<string>();
  const [schematicUrl, setSchematicUrl] = useState<string>();
  const [previewError, setPreviewError] = useState<string>();

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

  const generatedTsx = useMemo(
    () =>
      generateTsx({
        blocks: snapshot.blocks,
        connections: snapshot.connections,
        catalog,
        boardName: "ti_system_design",
      }),
    [catalog, snapshot.blocks, snapshot.connections],
  );
  tsxRef.current = generatedTsx;

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
        setSnapshot(nextSnapshot);
        setSchematicSvg(undefined);
        setPreviewError(undefined);
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
      controller?.destroy();
    };
  }, [catalog, notify, starterDesign]);

  useEffect(() => {
    if (!schematicSvg) {
      setSchematicUrl(undefined);
      return;
    }
    const url = URL.createObjectURL(
      new Blob([schematicSvg], { type: "image/svg+xml" }),
    );
    setSchematicUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [schematicSvg]);

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
    const source = generatedTsx;
    setIsRendering(true);
    setPreviewError(undefined);
    try {
      const { evaluateGeneratedTsx } = await import(
        "./rendering/evaluate-schematic"
      );
      const rendered = await evaluateGeneratedTsx(source, {
        timeoutMs: 45_000,
        schematicOptions: {
          width: 1400,
          height: 900,
          includeVersion: true,
        },
      });
      if (tsxRef.current !== source) {
        notify(
          "The graph changed during rendering; render the updated design again.",
        );
        return;
      }
      setSchematicSvg(rendered.svg);
      notify("Schematic rendered with PCB and routing disabled.", "success");
    } catch (error) {
      const message = errorMessage(error);
      setPreviewError(message);
      notify(message, "error");
    } finally {
      setIsRendering(false);
    }
  }, [generatedTsx, notify]);

  const resetDesign = useCallback(async () => {
    try {
      await controllerRef.current?.loadInitialGraph(starterDesign);
      await controllerRef.current?.zoomToFit();
      notify("Restored the Bluetooth audio starter design.", "success");
    } catch (error) {
      notify(errorMessage(error), "error");
    }
  }, [notify, starterDesign]);

  const copyTsx = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedTsx);
      notify("Generated TSX copied.", "success");
    } catch (error) {
      notify(`Could not copy TSX: ${errorMessage(error)}`, "error");
    }
  }, [generatedTsx, notify]);

  const downloadTsx = useCallback(() => {
    downloadBlob(
      new Blob([generatedTsx], { type: "text/typescript;charset=utf-8" }),
      "GeneratedSystem.circuit.tsx",
    );
    notify("Generated TSX downloaded.", "success");
  }, [generatedTsx, notify]);

  const downloadPdf = useCallback(async () => {
    if (!schematicSvg) return;
    try {
      const { downloadSchematicPdf } = await import("./rendering/export-pdf");
      await downloadSchematicPdf(schematicSvg, {
        fileName: "GeneratedSystem.schematic.pdf",
        title: "TI System Block Schematic",
      });
      notify("Schematic PDF downloaded.", "success");
    } catch (error) {
      notify(errorMessage(error), "error");
    }
  }, [notify, schematicSvg]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <CircuitIcon />
          </span>
          <span className="brand-copy">
            <h1 className="brand-title">TI System Block Builder</h1>
            <span className="brand-subtitle">tscircuit semantic composer</span>
          </span>
        </div>

        <div className="topbar-actions">
          <span className="status-chip">
            <span className="status-dot" />
            Automatic resolver active
          </span>
          <button
            className="secondary-button"
            onClick={downloadTsx}
            type="button"
          >
            <span className="button-content">
              <CodeIcon />
              Export TSX
            </span>
          </button>
          <button
            className="primary-button"
            disabled={isRendering}
            onClick={() => void renderSchematic()}
            type="button"
          >
            <span className="button-content">
              <SparkIcon />
              {isRendering ? "Rendering…" : "Render"}
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
        />

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
              {snapshot.blocks.length} blocks · {snapshot.connections.length}{" "}
              links
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
              aria-label="Reset starter design"
              className="icon-button"
              onClick={() => void resetDesign()}
              title="Reset starter design"
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
          isRendering={isRendering}
          onCopyTsx={() => void copyTsx()}
          onDownloadPdf={() => void downloadPdf()}
          onDownloadTsx={downloadTsx}
          onRender={() => void renderSchematic()}
          previewError={previewError}
          resolvedConnections={snapshot.resolvedConnections}
          svgUrl={schematicUrl}
          tsx={generatedTsx}
        />
      </div>
    </main>
  );
}
