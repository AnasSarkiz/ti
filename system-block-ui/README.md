# TI System Block Builder

`system-block-ui` is a standalone React Flow application for composing the
subcircuits in [`../lib/subcircuits`](../lib/subcircuits) as system-level
blocks. The graph uses broad, readable connections such as **Power** and
**Data**, then resolves them to the concrete tscircuit selectors needed by the
generated TSX.

The starter graph reproduces TI's seven-block Consumer wireless module using
the reviewed input-protection, 3.3 V buck, LVDS, antenna, I/O-protection, logic,
and temperature-sensor subcircuits. Six semantic connections describe its
power distribution and logic-to-LVDS signal path; the external RF and I2C
interfaces remain available at their source subcircuits.

Use **Load Example** in the canvas's upper-left corner to replace the current
graph with an editable diagram backed by a complete circuit in [`../examples`](../examples).
The menu includes the Consumer wireless module and Bluetooth speaker examples;
reset restores whichever example was loaded most recently.

## Run with schematic evaluation

```bash
cd system-block-ui
bun install
bun run dev
```

Open the local HTTP URL printed by Vite. Schematic evaluation and evaluated
downloads are supported when the application is served over HTTP.

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
connection resolution, and TSX generation/export only. It cannot evaluate the
generated TSX or create PDF, Circuit JSON, KiCad, or Altium outputs;
run `bun run build && bun run preview` for those features.

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

## Generated output and schematic exports

The generated main file, `GeneratedSystem.circuit.tsx`, mirrors the TSX under
`../examples`: it imports selected subcircuits from `@tsci/tscircuit.ti`,
default-exports a `<board routingDisabled>`, places named block instances, and
adds resolved traces. Its first schematic sheet is always a **System Diagram**
containing a generated overview through `<schematicgraphic
svgContent={SYSTEM_DIAGRAM_SVG} />`; the individual block schematics follow it
in deterministic order.

To keep the generated TSX readable, `SYSTEM_DIAGRAM_SVG` is imported from the
sibling `GeneratedSystem.system-diagram.ts` module instead of being embedded in
the main file. **tscircuit TSX (ZIP)** downloads both required files in one
archive. The system diagram preserves the block positions from the editor and
shows every Power and Data connection.

The right panel always shows the syntax-highlighted main TSX; it does not switch
to a schematic preview. **Render** evaluates that default export through
`@tscircuit/eval` in a web worker with PCB generation enabled. Parts lookup,
PCB routing, and all DRC phases (including placement checks) are disabled so
evaluation avoids the expensive physical-design work while retaining footprint
data. The resulting Circuit JSON is converted to schematic SVG for PDF export.
The download menu exports a vector PDF, the exact evaluated Circuit JSON, the
generated tscircuit TSX source archive, or editable KiCad and Altium project
ZIPs. Exporters run in lazy-loaded browser chunks and sanitize the project name
before using it in filenames or archive entries.

The PDF exporter embeds Liberation Sans, an open, Arial-compatible font, so
Unicode symbols and schematic text measurements remain intact.

The CAD ZIPs include PCB components and pad geometry for source components that
specify a footprint. Components whose subcircuits have not selected a physical
package are retained as footprint placeholders so schematic preview and export
remain available. The board is neither placed nor routed. The direct
`GeneratedSystem.circuit.json` download retains these PCB records and the System
Diagram `schematic_graphic`. The SVG-only System Diagram overview is omitted
from the KiCad and Altium archives because those native converters do not
support `schematic_graphic`; all editable detail sheets are retained.

The Consumer Wireless Module's seven packaged chips include exact copper pad
geometry and LCSC supplier IDs imported from JLCPCB. Its resistors and RF
passives use 0402 packages; bulk capacitors step up through 0603, 0805, and 1210
as their capacitance and rail voltage require. The 4 mm power inductor and
SOD-523 protection diode also use exact JLCPCB-imported copper. Its MOSFET and
U.FL connector still require explicit package selections.

`circuit-json-to-altium` is temporarily pinned to the official repository's
exact commit `0dc762f2a8dc811ef4919d6f79a312c910bdcac0` because that converter has
not published its first npm release yet. The pin should become an exact npm
version once one is available; it does not use a preview registry or floating
Git branch. Its nested `altiumts` dependency is overridden to the equivalent
published `altiumts@0.0.32` release so installs do not need to resolve another
Git dependency.

Evaluation uses the same canonical TSX shown in the panel and included in the
source ZIP, with the generated system-diagram module supplied to the evaluator's
virtual filesystem. The nested package pins `@tscircuit/eval` 0.0.1294 and
`@tscircuit/core` 0.0.1785 so the worker evaluates the native
`schematicgraphic` element directly; no host-side Circuit JSON compatibility
step is required.

For evaluation, the selected subcircuits and their relative source
dependencies are loaded from the local checkout into a minimal virtual
`@tsci/tscircuit.ti` package. This keeps Render working for newly added blocks
before the repository package is published. Exported TSX intentionally retains
the public package import, so using an exported design elsewhere still requires
a package release containing those subcircuits.

## Adding another semantic adapter

Add an entry to `src/model/subcircuit-adapters.ts` and describe only true
external interfaces. Do not expose every `net.*` reference: many subcircuits
contain internal switch, feedback, oscillator, and bootstrap nets that must
never be auto-connected.

The resolver and TSX generator have focused Bun tests under `src/model`. Add at
least one successful compatibility case and one rejection case when extending
the catalog.
