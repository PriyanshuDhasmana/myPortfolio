import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "../../constants";

const Experience = () => {
  return (
    <section id="timeline" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-3xl lg:max-w-4xl">
        <div className="mb-10 lg:mb-12">
          <p className="section-kicker">Experience</p>
          <h2 className="section-heading mt-4">Where I&apos;ve built.</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Roles focused on shipping reliable interfaces, improving workflows, and learning how products hold up in production.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-cyan-200/50 via-cyan-200/25 to-transparent sm:left-[15px]"
            aria-hidden="true"
          />

          <ol className="space-y-8 sm:space-y-10">
            {experiences.map((experience, index) => (
              <motion.li
                key={experience.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="relative pl-10 sm:pl-12"
              >
                <span
                  className="absolute left-0 top-5 flex h-6 w-6 items-center justify-center border border-cyan-100/35 bg-[#0B1020] sm:h-8 sm:w-8"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.6)]" />
                </span>

                <article className="reactive-panel border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/65">{experience.company}</p>
                      <h3 className="mt-2 text-xl font-black text-slate-50 sm:text-2xl">{experience.role}</h3>
                      <p className="mt-1.5 text-sm text-slate-400">{experience.date}</p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 border border-cyan-100/12 bg-cyan-100/[0.05] px-3 py-2 text-xs font-medium text-cyan-50">
                      <Briefcase className="h-3.5 w-3.5" />
                      {experience.signal}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">{experience.summary}</p>

                  <ul className="mt-5 space-y-2.5">
                    {experience.impact.map((item) => (
                      <li
                        key={item}
                        className="border-l border-cyan-100/25 bg-[#07111F]/45 py-2 pl-4 pr-3 text-sm leading-6 text-slate-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {experience.systems.map((system) => (
                      <span key={system} className="bg-white/[0.04] px-2.5 py-1 text-xs text-slate-400">
                        {system}
                      </span>
                    ))}
                  </div>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
