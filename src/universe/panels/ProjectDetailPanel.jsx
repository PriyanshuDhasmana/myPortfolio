import { motion } from "framer-motion";
import { projects } from "../../constants";
import { springSoft } from "../universeNodes";
import { ProjectLinks } from "./ProjectsPanel";

export default function ProjectDetailPanel({ projectId }) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return <p className="u-panel__intro">Project not found.</p>;
  }

  return (
    <div className="u-panel u-panel--detail">
      <header className="u-panel__header">
        <span className="project-moon__eyebrow">{project.eyebrow}</span>
        <h2 className="u-panel__heading">{project.title}</h2>
        <p className="u-panel__intro">{project.problem}</p>
        <ProjectLinks project={project} />
      </header>

      <div className="detail-layout">
        <motion.div
          className="glass-slab detail-media"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springSoft}
        >
          <img src={project.image} alt="" loading="lazy" />
        </motion.div>

        <div className="detail-cols">
          <motion.article
            className="glass-slab"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSoft, delay: 0.05 }}
          >
            <h3>Architecture</h3>
            <ol className="arch-flow">
              {project.architecture.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </motion.article>

          <motion.article
            className="glass-slab"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSoft, delay: 0.1 }}
          >
            <h3>Stack</h3>
            <div className="project-moon__stack">
              {project.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <h3 className="detail-stack-heading">Signals</h3>
            <dl className="metric-grid">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </motion.article>
        </div>
      </div>

      <motion.p
        className="impact-line"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springSoft, delay: 0.15 }}
      >
        {project.impact}
      </motion.p>
    </div>
  );
}
