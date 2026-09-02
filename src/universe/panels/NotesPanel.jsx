import { motion } from "framer-motion";
import { springSoft } from "../universeNodes";

export default function NotesPanel({ data }) {
  const sections = data.sections ?? [{ title: "Tools", items: data.statements ?? [] }];

  return (
    <div className="u-panel notes-panel">
      <header className="u-panel__header stack-hero stack-hero--panel">
        <p className="section-kicker">{data.kicker || "THE DEFAULT STACK"}</p>
        <div className="stack-hero__row">
          <div>
            <h2 className="u-panel__heading">{data.heading}</h2>
          </div>
          <div className="stack-status" aria-label="System status operational">
            <span className="stack-status__dot" aria-hidden="true" />
            <span className="stack-status__label">SYSTEM STATUS</span>
            <span className="stack-status__value">OPERATIONAL</span>
          </div>
        </div>
        {data.intro ? <p className="stack-hero__subtitle">{data.intro}</p> : null}
      </header>

      <div className="stack-grid">
        {sections.map((section, sectionIndex) => (
          <motion.article
            key={section.title || `section-${sectionIndex}`}
            className="stack-category reactive-panel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSoft, delay: 0.06 * sectionIndex }}
          >
            <div className="stack-category__header">
              <span className="stack-category__eyebrow">{section.title}</span>
            </div>

            <div className="stack-category__items">
              {(section.items ?? []).map((item) => {
                const tool = typeof item === "string" ? { label: "", title: item, description: "" } : item;
                return (
                  <div key={`${section.title}-${tool.label || tool.title}`} className="stack-item">
                    <div className="stack-item__meta">
                      <span className="stack-item__label">{tool.label}</span>
                    </div>

                    {tool.title ? <h3 className="stack-item__title">{tool.title}</h3> : null}
                    {tool.description ? <p className="stack-item__description">{tool.description}</p> : null}

                    {tool.tags && (
                      <div className="stack-item__tags">
                        {tool.tags.map((tag) => (
                          <span key={`${tool.label}-${tag}`} className="stack-item__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="stack-principles">
        <div className="stack-principles__header">
          <p className="section-kicker">HOW I WORK</p>
        </div>

        <div className="stack-principles__grid">
          {(data.principles ?? []).map((principle, index) => (
            <motion.div
              key={principle.id || `p-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springSoft, delay: 0.08 * index }}
              className="stack-principle"
            >
              <span className="stack-principle__id">{principle.id}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
