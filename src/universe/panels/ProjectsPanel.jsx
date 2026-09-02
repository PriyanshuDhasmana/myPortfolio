import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { springSoft } from "../universeNodes";

export default function ProjectsPanel({ data, onOpenProject, compact = false }) {
  return (
    <div className={`u-panel ${compact ? "u-panel--compact" : ""}`}>
      {!compact && (
        <header className="u-panel__header">
          <h2 className="u-panel__heading">{data.heading}</h2>
          <p className="u-panel__intro">{data.intro}</p>
        </header>
      )}

      <div className={`u-panel__grid ${compact ? "u-panel__grid--compact" : "u-panel__grid--projects"}`}>
        {data.projects.map((project, i) => (
          <motion.button
            key={project.id}
            type="button"
            className={`project-moon ${compact ? "project-moon--compact" : ""}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSoft, delay: 0.05 * i }}
            onClick={() => onOpenProject?.(project.id)}
          >
            {!compact && (
              <div className="project-moon__media">
                <img src={project.image} alt="" loading="lazy" />
              </div>
            )}
            <div className="project-moon__body">
              <span className="project-moon__eyebrow">{project.eyebrow}</span>
              <h3>{project.title}</h3>
              {!compact && <p>{project.problem}</p>}
              <div className="project-moon__stack">
                {project.stack.slice(0, compact ? 3 : 4).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer">
          <FaGithub className="h-4 w-4" />
          Source
        </a>
      )}
      {project.webapp && (
        <a href={project.webapp} target="_blank" rel="noreferrer">
          <ExternalLink className="h-4 w-4" />
          Live
        </a>
      )}
    </div>
  );
}
