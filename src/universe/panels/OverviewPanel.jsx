import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GleamCard from "../GleamCard";
import { springSoft } from "../universeNodes";
import { projects } from "../../constants";

/** Map display project titles used in techEcosystem to project ids */
const TITLE_TO_ID = {
  "Volunteer App": "volunteer",
  "FWC Website": "fwc",
  "ECE Website": "ece",
  "Weather App": "weather",
  Portfolio: null,
  "Automation Tools": null,
  "Product Showcases": null,
  "Automation Lab": null,
  "Search Tools": null,
  "Caterpillar Systems": null,
  "SDLC Automation": null,
  "Search Innovation": null,
  "React Native": null,
  Auth: null,
};

export default function OverviewPanel({ data, onOpenProject, onNavigate }) {
  const wrapRef = useRef(null);
  const [hoverTech, setHoverTech] = useState(null);
  const [lines, setLines] = useState([]);

  const projectAnchors = useMemo(
    () =>
      projects.map((p) => ({
        id: p.id,
        title: p.title,
        short: p.title.replace(/ Official Website| Department Website| App| System/g, ""),
      })),
    []
  );

  useEffect(() => {
    if (!hoverTech || !wrapRef.current) {
      setLines([]);
      return;
    }
    const root = wrapRef.current;
    const chip = root.querySelector(`[data-tech="${CSS.escape(hoverTech.name)}"]`);
    if (!chip) {
      setLines([]);
      return;
    }
    const rootBox = root.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    const x1 = chipBox.left + chipBox.width / 2 - rootBox.left;
    const y1 = chipBox.top + chipBox.height / 2 - rootBox.top;

    const relatedIds = new Set(
      hoverTech.projects
        .map((title) => TITLE_TO_ID[title])
        .filter(Boolean)
    );
    projectAnchors.forEach((a) => {
      hoverTech.projects.forEach((t) => {
        if (a.title.toLowerCase().includes(t.toLowerCase().split(" ")[0])) {
          relatedIds.add(a.id);
        }
      });
    });

    const next = [];
    relatedIds.forEach((id) => {
      const el = root.querySelector(`[data-project-anchor="${id}"]`);
      if (!el) return;
      const box = el.getBoundingClientRect();
      next.push({
        key: `${hoverTech.name}-${id}`,
        x1,
        y1,
        x2: box.left + box.width / 2 - rootBox.left,
        y2: box.top + box.height / 2 - rootBox.top,
        id,
      });
    });
    setLines(next);
  }, [hoverTech, projectAnchors]);

  const hotIds = useMemo(() => new Set(lines.map((l) => l.id)), [lines]);

  return (
    <div className="u-panel" ref={wrapRef}>
      <header className="u-panel__header">
        <h2 className="u-panel__heading">{data.heading}</h2>
        <p className="u-panel__intro">{data.intro}</p>
        <nav className="overview-shortcuts" aria-label="Jump to sections">
          <button
            type="button"
            className="overview-shortcut"
            onClick={() => onNavigate?.("builds")}
          >
            <span>Built products</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="overview-shortcut"
            onClick={() => onNavigate?.("timeline")}
          >
            <span>Experience</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <div className="u-panel__grid u-panel__grid--3">
        {data.pillars.map((pillar, i) => (
          <GleamCard
            key={pillar.title}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSoft, delay: 0.12 * i }}
          >
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
            <span className="glass-slab__signal">{pillar.signal}</span>
          </GleamCard>
        ))}
      </div>

      <section className="u-panel__section tech-graph">
        <h3 className="u-panel__sub">Tools I build with</h3>
        <p className="tech-graph__hint">Hover a tool to see connected projects.</p>

        <svg
          className={`tech-graph__svg ${lines.length > 0 ? "is-active" : ""}`}
          aria-hidden="true"
        >
          {lines.map((l) => (
            <line
              key={l.key}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              className="tech-graph__line"
            />
          ))}
        </svg>

        <div className="tech-constellation">
          {data.ecosystem.map((tech, i) => (
            <motion.button
              key={tech.name}
              type="button"
              data-tech={tech.name}
              className={`tech-chip ${hoverTech?.name === tech.name ? "is-hot" : ""} ${
                hoverTech && hoverTech.name !== tech.name ? "is-dim" : ""
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springSoft, delay: 0.03 * i }}
              onMouseEnter={() => setHoverTech(tech)}
              onMouseLeave={() => setHoverTech(null)}
              onFocus={() => setHoverTech(tech)}
              onBlur={() => setHoverTech(null)}
            >
              <span className="tech-chip__dot" aria-hidden="true" />
              <span className="tech-chip__text">
                <strong>{tech.name}</strong>
                <span>{tech.area}</span>
              </span>
            </motion.button>
          ))}
        </div>

        <div className="tech-project-anchors">
          {projectAnchors.map((p) => (
            <button
              key={p.id}
              type="button"
              data-project-anchor={p.id}
              className={`tech-anchor ${hotIds.has(p.id) ? "is-hot" : ""} ${
                hoverTech && !hotIds.has(p.id) ? "is-dim" : ""
              }`}
              onClick={() => onOpenProject?.(p.id)}
            >
              {p.short}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
