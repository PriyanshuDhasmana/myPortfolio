import { motion } from "framer-motion";
import { springSoft } from "../universeNodes";

export default function LabPanel({ data }) {
  return (
    <div className="u-panel">
      <header className="u-panel__header">
        <h2 className="u-panel__heading">{data.heading}</h2>
        <p className="u-panel__intro">{data.intro}</p>
      </header>

      <div className="u-panel__grid u-panel__grid--2">
        {data.modules.map((mod, i) => (
          <motion.article
            key={mod.title}
            className="glass-slab lab-module"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSoft, delay: 0.06 * i }}
          >
            <code>{mod.command}</code>
            <h3>{mod.title}</h3>
            <p>{mod.body}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
