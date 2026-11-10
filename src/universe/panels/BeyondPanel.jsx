import { motion } from "framer-motion";
import { springSoft } from "../universeNodes";

export default function BeyondPanel({ data, reducedMotion = false }) {
  return (
    <div className="u-panel">
      <header className="u-panel__header">
        <div className="u-panel__kicker">{data.kicker}</div>
        <h2 className="u-panel__heading">{data.heading}</h2>
        <p className="u-panel__intro">{data.intro}</p>
      </header>

      <div className="u-panel__grid u-panel__grid--3">
        {data.items.map((item, i) => (
          <motion.article
            key={item.title}
            className={`glass-slab beyond-card beyond-card--${item.variant}`}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion ? { duration: 0 } : { ...springSoft, delay: 0.06 * i }
            }
          >
            <div className="beyond-card__preview" aria-hidden="true">
              <div className="beyond-card__wireframe">
                <span className="wireframe-node wireframe-node--a" />
                <span className="wireframe-node wireframe-node--b" />
                <span className="wireframe-node wireframe-node--c" />
                <span className="wireframe-line wireframe-line--a" />
                <span className="wireframe-line wireframe-line--b" />
                <span className="wireframe-line wireframe-line--c" />
              </div>
            </div>

            <h3>{item.title}</h3>
            <p>{item.body}</p>

            <div className="beyond-card__tools">
              {item.tools.map((tool) => (
                <span key={`${item.title}-${tool}`}>{tool}</span>
              ))}
            </div>

            <div className="project-moon__stack">
              {item.tags.map((t) => (
                <span key={`${item.title}-${t}`}>{t}</span>
              ))}
            </div>

            <div className="beyond-card__snippet" aria-label="Tooling log">
              <span className="beyond-card__snippet-label">cli</span>
              <code>{item.command}</code>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
