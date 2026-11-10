import { motion } from "framer-motion";
import { springSoft } from "../universeNodes";

export default function LabPanel({ data, reducedMotion = false }) {
  return (
    <div className="u-panel">
      <header className="u-panel__header">
        <div className="u-panel__kicker">{data.kicker}</div>
        <h2 className="u-panel__heading">{data.heading}</h2>
        <p className="u-panel__intro">{data.intro}</p>
      </header>

      <div className="u-panel__grid u-panel__grid--2">
        {data.modules.map((mod, i) => (
          <motion.article
            key={mod.title}
            className="glass-slab lab-module"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion ? { duration: 0 } : { ...springSoft, delay: 0.06 * i }
            }
          >
            <div className="lab-module__meta">
              <span className="lab-module__tag">{mod.command}</span>
              <span className="lab-module__status">{mod.status}</span>
            </div>

            <div className="lab-module__trace" aria-label={`${mod.title} process trace`}>
              {mod.trace.map((step) => (
                <span key={`${mod.title}-${step}`}>{step}</span>
              ))}
            </div>

            <div className="lab-module__panel">
              <div>
                <h3>{mod.title}</h3>
                <p>{mod.summary}</p>
              </div>
              <div className="lab-module__metric">{mod.metric}</div>
            </div>

            <div className="lab-module__snippet" aria-label="Process output">
              <span className="lab-module__snippet-label">trace</span>
              <code>{mod.status}</code>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
