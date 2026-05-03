// src/components/Skills/Skills.jsx
import React from "react";
import { SkillsInfo } from "../../constants";
import Tilt from "react-parallax-tilt";

const Skills = () => (
  <section
    id="skills"
    className="py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden"
  >
    <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-[#EAB308]/10 blur-3xl" />
    <div className="pointer-events-none absolute right-0 top-28 h-64 w-64 rounded-full bg-[#F59E0B]/12 blur-3xl" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020308] via-transparent to-transparent" />
    <div className="text-center mb-12 relative z-10">
      <h2 className="text-4xl sm:text-5xl font-bold text-white">SKILLS</h2>
      <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-[#ffd166] via-[#f59e0b] to-[#ffd166]"></div>
      
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {SkillsInfo.map((category) => (
        <Tilt
          key={category.title}
          className="glass-card rounded-[2rem] p-8 border border-white/10"
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          scale={1.03}
          transitionSpeed={900}
          gyroscope={true}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#ffd166] to-[#f59e0b]"></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-[#ffd166]/60 hover:bg-white/10"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#090702] border border-[#ffd166]/15 shadow-[inset_0_0_18px_rgba(255,209,102,0.08)] transition duration-300 group-hover:shadow-[0_0_25px_rgba(255,209,102,0.18)]">
                  <img
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    className="max-h-10 max-w-10 object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-gray-200 transition group-hover:text-white">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </Tilt>
      ))}
    </div>
  </section>
);

export default Skills;
