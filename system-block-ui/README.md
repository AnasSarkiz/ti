# TI System Block Builder

`system-block-ui` is a standalone React Flow application for composing the
subcircuits in [`../lib/subcircuits`](../lib/subcircuits) as system-level
blocks. The graph uses broad, readable connections such as **Power** and
**Data**, then resolves them to the concrete tscircuit selectors needed by the
generated TSX.

## Run with schematic preview

```bash
cd system-block-ui
bun install
bun run dev
```

Open the local HTTP URL printed by Vite. Schematic rendering and PDF export are
supported when the application is served over HTTP.

To build the production application and serve that build locally:

```bash
bun run build
bun run preview
```

## Deploy to Vercel

Production: <https://ti-system-block-ui.vercel.app/>

The repository-level `vercel.json` installs and builds this nested Vite app,
then publishes `system-block-ui/dist`. From the repository root, run:

```bash
npx vercel
```

Use `npx vercel --prod` after checking the preview deployment. The configured
install command performs a frozen install from `system-block-ui/bun.lock`; no
dashboard build overrides are required.

The remaining production checks are:

```bash
bun run typecheck
bun test
```

To create a directly openable, self-contained HTML file with no local server:

```bash
bun run build:standalone
```

The result is written to `dist/ti-system-block-builder.html`.
The standalone `file://` application supports the block editor, automatic
connection resolution, and TSX generation/export only. It cannot render the
schematic or create its PDF; run `bun run build && bun run preview` for those
features.

## How automatic connections work

Every file in `lib/subcircuits` is discovered for the palette at build time.
Electrical connections are intentionally more conservative: the typed adapter
catalog in `src/model/subcircuit-adapters.ts` describes reviewed, external
interfaces with their direction, protocol, voltage range, and exact internal
selectors.

When a user draws a high-level edge, the resolver:

1. matches the visible connection kind;
2. requires complementary roles and compatible protocols;
3. requires the complete source-voltage range to fit the consumer rating;
4. checks required signals and selects only a unique best interface pair;
5. prevents reuse of single-connection ports; and
6. expands the pair into one or more concrete `<trace />` elements.

For example, one `Data · HCI UART` edge expands TX/RX and RTS/CTS in the correct
directions, while a `Power · 1.8 V` edge fans one regulator output out to every
required supply pin and ground. Unsupported and ambiguous pairs are rejected
with an explanation instead of guessing.

## Generated output and schematic PDF

The generated file mirrors the TSX under `../examples`: it imports selected
subcircuits from `@tsci/tscircuit.ti`, default-exports a `<board
routingDisabled>`, places named block instances, and adds resolved traces. Its
first schematic sheet is always a **System Diagram** containing a generated
overview through `<schematicgraphic svgContent={...} />`; the individual block
schematics follow it in deterministic order.

The system diagram preserves the block positions from the editor, shows every
Data connection, and summarizes each resolved power network as a single
main-source connection. The detailed component sheets and generated traces
still retain every resolved electrical connection.

Preview rendering runs the generated default export through `@tscircuit/eval`
in a web worker with PCB generation, parts lookup, and PCB routing disabled.
The resulting Circuit JSON is converted to schematic SVG and can be downloaded
as a vector PDF.

Preview evaluation uses the same canonical TSX shown and exported by the UI.
The nested package pins `@tscircuit/eval` 0.0.1294 and `@tscircuit/core`
0.0.1785 so the worker evaluates the native `schematicgraphic` element
directly; no host-side Circuit JSON compatibility step is required.

The preview needs network access because `@tsci/tscircuit.ti` imports are loaded
from the tscircuit registry. They represent the published package, whereas the
palette is discovered from the local checkout.

## Adding another semantic adapter

Add an entry to `src/model/subcircuit-adapters.ts` and describe only true
external interfaces. Do not expose every `net.*` reference: many subcircuits
contain internal switch, feedback, oscillator, and bootstrap nets that must
never be auto-connected.

The resolver and TSX generator have focused Bun tests under `src/model`. Add at
least one successful compatibility case and one rejection case when extending
the catalog.
