import { motion } from "framer-motion";
import { springSoft } from "../universeNodes";

export default function ExperiencePanel({ data }) {
  return (
    <div className="u-panel">
      <header className="u-panel__header">
        <h2 className="u-panel__heading">{data.heading}</h2>
        <p className="u-panel__intro">{data.intro}</p>
      </header>

      <div className="exp-rail">
        {data.experiences.map((exp, i) => (
          <motion.article
            key={exp.id}
            className="glass-slab exp-card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springSoft, delay: 0.07 * i }}
          >
            <div className="exp-card__meta">
              <span>{exp.date}</span>
              <span className="exp-card__signal">{exp.signal}</span>
            </div>
            <h3>{exp.role}</h3>
            <p className="exp-card__company">{exp.company}</p>
            <p>{exp.summary}</p>
            <ul>
              {exp.impact.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="project-moon__stack">
              {exp.systems.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
