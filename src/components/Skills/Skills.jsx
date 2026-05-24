// src/components/Skills/Skills.jsx
import React, { useState } from "react";
import { SkillsInfo } from "../../constants";
import Tilt from "react-parallax-tilt";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(SkillsInfo[0].title);
  const activeCategoryData = SkillsInfo.find((item) => item.title === activeCategory) || SkillsInfo[0];

  return (
    <section
      id="skills"
      className="py-24 px-6 sm:px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden"
    >
    <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-[#EAB308]/10 blur-3xl" />
    <div className="pointer-events-none absolute right-0 top-28 h-64 w-64 rounded-full bg-[#F59E0B]/12 blur-3xl" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020308] via-transparent to-transparent" />
    <div className="text-center mb-12 relative z-10">
      <h2 className="text-4xl sm:text-5xl font-bold text-[#F9C737]">SKILLS</h2>
      <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-[#ffd166] via-[#f59e0b] to-[#ffd166]"></div>
    </div>

    <div className="md:hidden relative z-10">
      <div className="mx-auto mb-6 flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#EAB308]/20 bg-white/5 px-2 py-2 shadow-[0_0_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {SkillsInfo.map((category) => {
          const isActive = category.title === activeCategory;
          return (
            <button
              key={category.title}
              type="button"
              onClick={() => setActiveCategory(category.title)}
              className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.32em] transition focus:outline-none ${
                isActive
                  ? "bg-[#EAB308]/15 text-[#F9C737] shadow-[0_0_15px_rgba(234,179,8,0.24)]"
                  : "text-[#F9C737]/85 hover:bg-white/10 hover:text-[#F9C737]"
              }`}
            >
              {category.title}
            </button>
          );
        })}
      </div>

      <div className="mx-auto rounded-[2rem] border border-white/10 bg-[#090a0f]/90 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
        <div className="mb-5 flex items-center gap-3">
          <h3 className="text-xl font-semibold text-[#F9C737]">{activeCategoryData.title}</h3>
          <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-[#ffd166]/60 via-[#f59e0b]/80 to-[#ffd166]/60" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {activeCategoryData.skills.map((skill) => (
            <button
              key={skill.name}
              type="button"
              className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-3 text-center transition duration-300 hover:border-[#ffd166]/50 hover:bg-white/10"
            >
              <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c1015] border border-[#ffd166]/15 shadow-[inset_0_0_18px_rgba(255,209,102,0.08)] transition duration-300 group-hover:shadow-[0_0_20px_rgba(255,209,102,0.18)]">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F9D56E]">
                {skill.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="hidden md:grid gap-6 grid-cols-1 lg:grid-cols-2">
      {SkillsInfo.map((category) => (
        <Tilt
          key={category.title}
          className="glass-card w-full min-w-0 rounded-[2rem] p-8 border border-white/10"
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
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="group flex w-full min-w-0 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-[#ffd166]/60 hover:bg-white/10"
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
};
export default Skills;