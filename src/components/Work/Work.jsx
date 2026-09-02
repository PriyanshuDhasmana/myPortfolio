import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitBranch, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../../constants";

const Work = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section id="builds" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2 className="section-heading mt-4">Built products.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 lg:justify-self-end">
            A few shipped projects—what they solve, how they&apos;re structured, and what I took away from building them.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.22fr_0.78fr]">
          <div className="overflow-x-auto pb-2 xl:overflow-visible">
            <div className="grid auto-cols-[minmax(280px,360px)] grid-flow-col gap-4 xl:grid-flow-row xl:grid-cols-2 xl:gap-5">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  onMouseEnter={() => setActiveProject(project)}
                  onFocus={() => setActiveProject(project)}
                  tabIndex={0}
                  className={`project-card reactive-panel group overflow-hidden border bg-white/[0.03] transition duration-300 hover:-translate-y-1.5 ${
                    activeProject.id === project.id ? "border-cyan-100/35" : "border-white/10"
                  }`}
                >
                  <div className="relative overflow-hidden border-b border-white/10 bg-[#07111F]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover opacity-88 transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/20 to-transparent" />
                    <div
                      className="project-blueprint absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <div className="absolute left-3 top-3 border border-cyan-100/18 bg-[#07111F]/85 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[10px]">
                      {project.eyebrow}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-black text-slate-50 sm:text-2xl">{project.title}</h3>
                      <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-cyan-100/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{project.problem}</p>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="border border-white/8 bg-[#07111F]/50 px-2 py-2 sm:px-3">
                          <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">{metric.label}</p>
                          <p className="mt-1 text-xs font-semibold text-cyan-50 sm:text-sm">{metric.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="border border-cyan-100/12 bg-cyan-100/[0.04] px-2 py-1 text-[11px] font-medium text-cyan-50/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <motion.aside
            key={activeProject.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="reactive-panel top-24 border border-cyan-100/14 bg-[#0B1020]/72 p-5 backdrop-blur-xl xl:sticky xl:self-start"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/65">Project detail</p>
                <h3 className="mt-2 text-2xl font-black text-slate-50">{activeProject.title}</h3>
              </div>
              <Layers className="h-6 w-6 shrink-0 text-cyan-100/80" />
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">{activeProject.impact}</p>

            <div className="mt-6 space-y-2.5">
              {activeProject.architecture.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-cyan-100/16 bg-cyan-100/[0.05] text-[11px] font-bold text-cyan-50">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-200">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-100/35"
                >
                  <FaGithub className="h-4 w-4" />
                  Code
                </a>
              )}
              {activeProject.webapp && (
                <a
                  href={activeProject.webapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-cyan-100/40 bg-cyan-100 px-4 py-2.5 text-sm font-semibold text-[#07111F] transition hover:bg-slate-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live
                </a>
              )}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cyan-100/65">
                <GitBranch className="h-3.5 w-3.5" />
                Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.stack.map((tag) => (
                  <span key={tag} className="bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Work;
