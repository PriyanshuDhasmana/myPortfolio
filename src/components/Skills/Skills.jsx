import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Network, Radio } from "lucide-react";
import { techEcosystem } from "../../constants";

const Skills = () => {
  const [activeNode, setActiveNode] = useState("React");
  const active = useMemo(
    () => techEcosystem.find((node) => node.name === activeNode) || techEcosystem[0],
    [activeNode]
  );

  const domains = [...new Set(techEcosystem.map((node) => node.area))];

  return (
    <section id="ecosystem" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="section-kicker">Stack</p>
            <h2 className="section-heading mt-4">Tools I build with.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 lg:justify-self-end">
            Technologies connected the way I actually use them—select a node to see related projects and dependencies.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="reactive-panel relative min-h-[420px] overflow-hidden border border-cyan-100/12 bg-[#0B1020]/50 p-4 backdrop-blur-xl sm:min-h-[520px] sm:p-5 lg:min-h-[580px]"
          >
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(103,232,249,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(103,232,249,0.08)_1px,transparent_1px)] [background-size:56px_56px] sm:[background-size:72px_72px]" />
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              {techEcosystem.flatMap((node) =>
                node.links.map((link) => {
                  const target = techEcosystem.find((item) => item.name === link);
                  if (!target) return null;

                  const isActive = node.name === active.name || target.name === active.name;
                  return (
                    <motion.line
                      key={`${node.name}-${target.name}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={isActive ? "rgba(103,232,249,0.65)" : "rgba(148,163,184,0.14)"}
                      strokeWidth={isActive ? 1.8 : 0.9}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  );
                })
              )}
            </svg>

            {techEcosystem.map((node) => {
              const isActive = node.name === active.name || active.links.includes(node.name);
              return (
                <motion.button
                  key={node.name}
                  type="button"
                  onMouseEnter={() => setActiveNode(node.name)}
                  onFocus={() => setActiveNode(node.name)}
                  onClick={() => setActiveNode(node.name)}
                  whileTap={{ scale: 0.97 }}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`tech-node absolute z-10 -translate-x-1/2 -translate-y-1/2 border px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-xl transition sm:px-3 sm:py-2 sm:text-xs sm:tracking-[0.16em] ${
                    isActive
                      ? "border-cyan-200/60 bg-cyan-200/12 text-cyan-50 shadow-[0_0_24px_rgba(103,232,249,0.2)]"
                      : "border-white/10 bg-[#0B1020]/80 text-slate-400"
                  }`}
                >
                  {node.name}
                </motion.button>
              );
            })}

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 sm:bottom-5 sm:left-5">
              {domains.map((domain) => (
                <span
                  key={domain}
                  className="border border-white/8 bg-[#07111F]/75 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:px-3 sm:py-1.5 sm:text-[10px]"
                >
                  {domain}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.aside
            key={active.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="reactive-panel border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/65">Active tool</p>
                <h3 className="mt-2 text-2xl font-black text-slate-50">{active.name}</h3>
              </div>
              <Network className="h-6 w-6 text-cyan-100/80" />
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
                <span>Comfort</span>
                <span>{active.level}%</span>
              </div>
              <div className="h-1.5 bg-white/10">
                <motion.div
                  key={active.name}
                  initial={{ width: 0 }}
                  animate={{ width: `${active.level}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-200/90 to-blue-500/80"
                />
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cyan-100/65">
                  <BrainCircuit className="h-3.5 w-3.5" />
                  Projects
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.projects.map((project) => (
                    <span
                      key={project}
                      className="border border-cyan-100/12 bg-cyan-100/[0.04] px-2.5 py-1.5 text-xs text-slate-200"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cyan-100/65">
                  <Radio className="h-3.5 w-3.5" />
                  Connected to
                </div>
                <div className="grid gap-1.5">
                  {active.links.map((link) => (
                    <button
                      key={link}
                      type="button"
                      onClick={() => setActiveNode(link)}
                      className="border border-white/8 bg-[#07111F]/55 px-3 py-2.5 text-left text-sm text-slate-200 transition hover:border-cyan-200/35 hover:text-cyan-100"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Skills;
