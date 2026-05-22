import React from "react";
import { motion } from "framer-motion";
import { experiences } from "../../constants";

const Experience = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans relative"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">EXPERIENCE</h2>
        <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-[#EAB308] via-[#f59e0b] to-[#EAB308]"></div>
        <p className="text-[#e5c16a]/80 mt-4 text-lg font-medium max-w-2xl mx-auto">
          A journey through impactful roles and collaborative projects.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        {/* Timeline gradient line */}
        <div className="hidden sm:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-[#EAB308]/50 to-transparent opacity-75"></div>

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            variants={cardVariants}
            className={`relative flex flex-col sm:flex-row items-center mb-24 ${
              index % 2 === 0 ? "sm:justify-end" : "sm:justify-start"
            }`}
          >
            {/* Logo circle on timeline */}
            <div className="relative mx-auto mb-6 sm:absolute sm:left-1/2 sm:top-8 sm:-translate-x-1/2 sm:mb-0 z-10">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/10 bg-slate-950/80 p-3 backdrop-blur-md shadow-[0_0_28px_rgba(234,179,8,0.22)]"
              >
                <img
                  src={experience.img}
                  alt={experience.company}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </div>

            {/* Experience card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className={`w-full sm:w-[42%] p-8 rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-md shadow-[0_20px_60px_rgba(234,179,8,0.08)] transition-all duration-300 ${
                index % 2 === 0 ? "sm:mr-[calc(50%+2.5rem)]" : "sm:ml-[calc(50%+2.5rem)]"
              }`}
            >
              {/* Inner rim light */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none opacity-70" />

              <div className="relative z-10">
                {/* Role and company */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {experience.role}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.28em] text-[#e5c16a]/70 mt-2">
                    {experience.company}
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#9ca3af] mt-3">
                    {experience.date}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[#d1d5db] leading-relaxed text-sm">
                  {experience.desc}
                </p>

                {/* Skills */}
                <div className="mt-6">
                  <h5 className="text-xs uppercase tracking-[0.3em] text-[#e5c16a]/70 font-semibold mb-3">
                    Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex rounded-full px-3 py-1.5 text-xs font-medium border border-[#EAB308]/30 bg-white/5 text-[#EAB308] transition duration-200 hover:bg-[#EAB308]/10"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Experience;
