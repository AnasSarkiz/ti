import { useMemo, useState } from "react";
import type { SubcircuitDefinition } from "../model/types";
import { SearchIcon } from "./Icons";

export const SYSTEM_BLOCK_DRAG_MIME =
  "application/x-tscircuit-system-block-definition";

interface BlockPaletteProps {
  definitions: readonly SubcircuitDefinition[];
  onInsert: (definitionId: string) => void;
}

export function BlockPalette({ definitions, onInsert }: BlockPaletteProps) {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = definitions.filter((definition) => {
      if (!normalizedQuery) return true;
      return [
        definition.title,
        definition.componentName,
        definition.category,
        ...(definition.tags ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });

    const byCategory = new Map<string, SubcircuitDefinition[]>();
    for (const definition of filtered) {
      const group = byCategory.get(definition.category) ?? [];
      group.push(definition);
      byCategory.set(definition.category, group);
    }

    return [...byCategory]
      .map(([category, items]): [string, SubcircuitDefinition[]] => [
        category,
        [...items].sort((a, b) => a.title.localeCompare(b.title)),
      ])
      .sort(([a], [b]) => a.localeCompare(b));
  }, [definitions, query]);

  return (
    <aside className="palette-panel" aria-label="Subcircuit palette">
      <div className="panel-heading">
        <h2 className="panel-title">Subcircuits</h2>
        <span className="count-badge">{definitions.length}</span>
      </div>

      <label className="palette-search">
        <SearchIcon />
        <input
          aria-label="Search subcircuits"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search TI blocks…"
          type="search"
          value={query}
        />
      </label>

      <p className="palette-help">
        Drag a reviewed block onto the canvas. Power and Data sockets resolve to
        exact pins automatically.
      </p>

      <div className="palette-list">
        {groups.map(([category, items]) => (
          <section key={category}>
            <h3 className="category-label">{category}</h3>
            {items.map((definition) => {
              const disabled = definition.canInstantiate === false;
              const reviewedPortCount = definition.ports.length;

              return (
                <button
                  aria-disabled={disabled}
                  className="palette-card"
                  draggable={!disabled}
                  key={definition.id}
                  onClick={() => {
                    if (!disabled) onInsert(definition.id);
                  }}
                  onDragStart={(event) => {
                    if (disabled) {
                      event.preventDefault();
                      return;
                    }
                    event.dataTransfer.effectAllowed = "copy";
                    event.dataTransfer.setData(
                      SYSTEM_BLOCK_DRAG_MIME,
                      definition.id,
                    );
                    event.dataTransfer.setData("text/plain", definition.id);
                  }}
                  title={
                    definition.warning ??
                    (reviewedPortCount === 0
                      ? "Placement is available; semantic interfaces are not curated yet."
                      : `Insert ${definition.title}`)
                  }
                  type="button"
                >
                  <span className="block-copy">
                    <span className="block-title">{definition.title}</span>
                  </span>
                </button>
              );
            })}
          </section>
        ))}

        {groups.length === 0 && (
          <p className="palette-help">No subcircuits match “{query}”.</p>
        )}
      </div>
    </aside>
  );
}
