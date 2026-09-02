import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { springSnap } from "./universeNodes";
import { universeNodes, nodeContent } from "./universeNodes";
import { projects } from "../constants";

function buildIndex() {
  const entries = [];
  universeNodes.forEach((n) => {
    entries.push({
      id: n.id,
      label: n.label,
      description: n.description,
      keywords: n.keywords.join(" ").toLowerCase(),
      type: "node",
    });
  });
  projects.forEach((p) => {
    entries.push({
      id: `project-${p.id}`,
      label: p.title,
      description: p.eyebrow,
      keywords: [...p.stack, p.title, p.problem, p.impact].join(" ").toLowerCase(),
      type: "project",
      parent: "builds",
    });
  });
  // tech nodes map to overview / related
  (nodeContent.overview?.ecosystem || []).forEach((t) => {
    entries.push({
      id: "overview",
      label: t.name,
      description: `${t.area} · ${t.projects.join(", ")}`,
      keywords: [t.name, t.area, ...t.projects, ...t.links].join(" ").toLowerCase(),
      type: "tech",
    });
  });
  return entries;
}

const INDEX = buildIndex();

export function searchNodes(query) {
  const q = query.trim().toLowerCase();
  if (!q) return { hits: new Set(), results: [] };
  const results = INDEX.filter(
    (e) =>
      e.label.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.keywords.includes(q) ||
      e.keywords.split(" ").some((w) => w.startsWith(q))
  );
  const hits = new Set(results.map((r) => (r.type === "project" ? r.parent : r.id)));
  results.forEach((r) => {
    if (r.type === "project") hits.add(r.id);
  });
  return { hits, results: results.slice(0, 8) };
}

export default function SearchOverlay({ open, query, onQuery, onClose, onSelect }) {
  const inputRef = useRef(null);
  const { results } = useMemo(() => searchNodes(query), [query]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="universe-search"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={springSnap}
          role="search"
        >
          <div className="universe-search__bar">
            <Search className="h-4 w-4 opacity-60" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search nodes — Java, React, HMI…"
              aria-label="Search universe nodes"
            />
            <button type="button" onClick={onClose} aria-label="Close search">
              <X className="h-4 w-4" />
            </button>
          </div>
          {query && (
            <ul className="universe-search__results">
              {results.length === 0 && (
                <li className="is-empty">No matching nodes</li>
              )}
              {results.map((r) => (
                <li key={`${r.type}-${r.id}-${r.label}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(r.id);
                      onClose();
                    }}
                  >
                    <strong>{r.label}</strong>
                    <span>{r.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
