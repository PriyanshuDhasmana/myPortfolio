import { motion } from "framer-motion";
import { springSoft } from "../universeNodes";

export default function BeyondPanel({ data }) {
  return (
    <div className="u-panel">
      <header className="u-panel__header">
        <h2 className="u-panel__heading">{data.heading}</h2>
        <p className="u-panel__intro">{data.intro}</p>
      </header>

      <div className="u-panel__grid u-panel__grid--3">
        {data.items.map((item, i) => (
          <motion.article
            key={item.title}
            className="glass-slab beyond-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSoft, delay: 0.06 * i }}
          >
            <img src={item.image} alt="" loading="lazy" />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <div className="project-moon__stack">
              {item.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
