import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../constants";

const STACK_DEPTH = 4;
const ROTATION_MS = 3600;

const ProjectCardsPanel = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (prefersReducedMotion || paused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  const visibleProjects = useMemo(
    () =>
      projects
        .map((project, index) => ({
          project,
          sourceIndex: index,
          depth: (index - activeIndex + projects.length) % projects.length,
        }))
        .filter(({ depth }) => depth < STACK_DEPTH),
    [activeIndex]
  );

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      data-cursor="interactive"
      className="hero-project-stage"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerMove={handlePointerMove}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, rotateX: -4 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      style={{
        "--stack-x": `${pointer.x}%`,
        "--stack-y": `${pointer.y}%`,
      }}
      aria-label="Featured project stack"
    >
      <div className="hero-project-wire hero-project-wire--one" aria-hidden="true" />
      <div className="hero-project-wire hero-project-wire--two" aria-hidden="true" />
      <div className="hero-project-wire hero-project-wire--three" aria-hidden="true" />

      <div className="hero-project-stack" aria-live="polite">
        {visibleProjects.map(({ project, sourceIndex, depth }) => {
          const href = project.webapp || project.github || "#builds";
          return (
            <article
              key={project.id}
              className={`hero-project-card hero-project-card--${depth}`}
              onClick={() => setActiveIndex(sourceIndex)}
              onFocus={() => setActiveIndex(sourceIndex)}
              tabIndex={depth === 0 ? 0 : -1}
              role="button"
              aria-label={`Show ${project.title} in the hero project stack`}
            >
              <div className="hero-project-thumb" aria-hidden="true">
                <img src={project.image} alt="" loading={depth === 0 ? "eager" : "lazy"} />
              </div>

              <div className="hero-project-copy">
                <p className="hero-project-eyebrow">{project.eyebrow}</p>
                <h2>Project: {project.title}</h2>
                <p>{project.problem}</p>
                <div className="hero-project-tags" aria-hidden="true">
                  {project.stack.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  {project.stack.length > 3 && <span>+{project.stack.length - 3}</span>}
                </div>
              </div>

              {depth === 0 && (
                <a
                  href={href}
                  target={href.startsWith("#") ? undefined : "_blank"}
                  rel={href.startsWith("#") ? undefined : "noreferrer"}
                  className="hero-project-link"
                  aria-label={`Open ${project.title}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </article>
          );
        })}
      </div>

      <div className="hero-project-index">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${project.title}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCardsPanel;
