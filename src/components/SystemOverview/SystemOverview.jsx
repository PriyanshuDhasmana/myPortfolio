import { motion } from "framer-motion";
import { Cpu, Gauge, Sparkles, Orbit } from "lucide-react";
import { overviewPillars } from "../../constants";

const icons = [Cpu, Gauge, Sparkles];

const SystemOverview = () => {
  return (
    <section id="overview" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="space-y-6 sm:space-y-8"
        >
          <div>
            <p className="section-kicker">Overview</p>
            <h2 className="section-heading mt-4">How I work.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-300">
            I move between interface design, full-stack delivery, and workflow tooling—always aiming for clarity, performance, and maintainability.
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {["Interfaces", "Backend", "Tooling"].map((item, index) => (
              <div key={item} className="border border-cyan-100/10 bg-cyan-100/[0.03] p-3 sm:p-4">
                <p className="text-2xl font-black text-cyan-100 sm:text-3xl">0{index + 1}</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-400">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative overflow-hidden border border-cyan-100/14 bg-[#0B1020]/55 p-2 shadow-[0_32px_100px_rgba(0,0,0,0.32)] sm:p-3">
            <img
              src="/generated/system-overview.svg"
              alt="Overview diagram"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover opacity-90 sm:aspect-[16/9]"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at var(--cursor-x) var(--cursor-y), rgba(103,232,249,0.14), transparent 16rem)",
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
        {overviewPillars.map((pillar, index) => {
          const Icon = icons[index] || Orbit;
          return (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="reactive-panel group border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6"
            >
              <div className="mb-6 inline-flex h-10 w-10 items-center justify-center border border-cyan-100/18 bg-cyan-100/[0.05] text-cyan-100 transition group-hover:border-cyan-100/35">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-50">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.body}</p>
              <p className="mt-5 border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.2em] text-cyan-100/65">
                {pillar.signal}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default SystemOverview;
