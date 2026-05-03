import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Award, CalendarDays, CheckCircle2 } from "lucide-react";
import { education } from "../../constants";

const Education = () => {
  const mainEducation = education[0];
  const schoolEducation = education.filter((edu) => edu.id !== 0);
  const coreCompetencies = [
    "Algorithms & Data Structures",
    "System Design & Architecture",
    "Modern Web Application Development",
    "Database Design & Optimization",
  ];

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="education" className="relative overflow-hidden py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020308] via-transparent to-transparent" />
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">EDUCATION</h2>
        <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-[#ffd166] via-[#f59e0b] to-[#ffd166]" />
        
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-12 items-start"
      >
        <motion.div
          variants={card}
          className="lg:col-span-7 flex lg:h-full"
        >
          <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 shadow-[0_0_20px_rgba(234,179,8,0.1)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff1a] via-transparent to-[#020408]/50" />
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />
            <motion.div
              animate={{ x: [0, 280, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute top-8 left-0 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#FACC15]/70 to-transparent blur-sm"
            />

            <div className="relative p-8 lg:p-10 z-10 h-full flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#FACC15] backdrop-blur-md">
                  <Award size={12} />
                  {mainEducation.degree.toUpperCase()}
                </span>

                <h3 className="mt-6 text-4xl font-bold tracking-tight text-white">{mainEducation.school}</h3>
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#e5c16a]/70">
                  {mainEducation.degree}
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-[#02040a]/80 p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#e5c16a]/70">CGPA</p>
                  <p className="mt-2 text-3xl font-bold text-[#FACC15]">{mainEducation.grade}</p>
                </div>
                <div className="rounded-[1.75rem] bg-[#02040a]/80 p-5 border border-white/10">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#e5c16a]/70">
                    <CalendarDays size={16} />
                    Duration
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-white">Aug 2021 - May 2025</p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.75rem] bg-[#02040a]/80 p-6 border border-white/10 text-sm leading-7 text-[#e5c16a]/80">
                {mainEducation.desc}
              </div>

              <div className="mt-10">
                <h4 className="text-sm uppercase tracking-[0.3em] text-[#e5c16a]/70">Core Competencies</h4>
                <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                  {coreCompetencies.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-[#FACC15]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={card}
          className="lg:col-span-5 relative flex flex-col gap-6"
        >
          <div className="pointer-events-none absolute left-10 top-16 bottom-16 w-px bg-gradient-to-b from-[#FACC15] via-[#FACC15]/40 to-transparent opacity-75" />

          {schoolEducation.map((edu, index) => {
            const Icon = index === 0 ? Compass : Sparkles;
            return (
              <motion.div
                key={edu.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 p-8 shadow-[0_0_20px_rgba(234,179,8,0.1)] backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />
                <motion.div
                  whileHover={{ rotate: 3, y: -2 }}
                  className="relative z-10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#02040a]/90 border border-white/10 shadow-[0_0_30px_rgba(255,209,102,0.08)]"
                >
                  <Icon className="h-8 w-8 text-[#FACC15]" />
                </motion.div>

                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-[0.28em] text-[#e5c16a]/75">{edu.degree.split(" - ")[0]}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{edu.school}</h3>
                  <p className="mt-2 text-sm text-slate-400">{edu.date}</p>
                </div>

                <p className="mt-6 text-sm leading-7 text-[#e5c16a]/80">{edu.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Education;
