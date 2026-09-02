import { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { labModules } from "../../constants";

const AutomationLab = () => {
  const [activeModule, setActiveModule] = useState(labModules[0]);

  return (
    <section id="lab" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="space-y-6 sm:space-y-8"
        >
          <div>
            <p className="section-kicker">Lab</p>
            <h2 className="section-heading mt-4">Faster loops, clear judgment.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-300">
            I use agents and automation for planning, review, search, and repetitive tasks—while keeping decisions and quality checks human.
          </p>

          <div className="grid gap-2 sm:gap-3">
            {labModules.map((module) => (
              <button
                key={module.title}
                type="button"
                onClick={() => setActiveModule(module)}
                className={`reactive-panel border p-4 text-left transition sm:p-5 ${
                  activeModule.title === module.title
                    ? "border-cyan-100/35 bg-cyan-100/[0.06]"
                    : "border-white/10 bg-white/[0.03] hover:border-cyan-100/20"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-50">{module.title}</p>
                    <p className="mt-1.5 text-xs text-cyan-100/65">{module.command}</p>
                  </div>
                  <Zap className="h-4 w-4 shrink-0 text-cyan-100/80" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={activeModule.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >
          <div className="relative overflow-hidden border border-cyan-100/14 bg-[#0B1020]/65 p-2 sm:p-3">
            <img
              src="/generated/lab-automation.svg"
              alt="Lab workflow diagram"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover opacity-90"
            />
          </div>

          <div className="reactive-panel border border-white/10 bg-[#07111F]/80 p-5 backdrop-blur-xl sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/65">{activeModule.command}</p>
            <h3 className="mt-3 text-xl font-black text-slate-50">{activeModule.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{activeModule.body}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationLab;
