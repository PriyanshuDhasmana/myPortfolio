// src/components/Skills/Skills.jsx
import React from "react";
import { SkillsInfo } from "../../constants";
import Tilt from "react-parallax-tilt";

const Skills = () => (
  <section
    id="skills"
    className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom"
  >
    {/* Section Title */}
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">SKILLS</h2>
      <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
      <p className="text-gray-400 mt-4 text-lg font-semibold">
        A collection of my technical skills and expertise honed through various projects and experiences
      </p>
    </div>

    {/* Skill Categories */}
    <div className="flex flex-wrap gap-4 lg:gap-8 py-10 justify-between">
      {SkillsInfo.map((category) => (
        <div
          key={category.title}
          className="bg-gray-900 backdrop-blur-md px-6 sm:px-8 py-6 sm:py-5 mb-10 w-full sm:w-[46%] lg:w-[44%] rounded-xl border border-white 
          shadow-[0_0_15px_1px_rgba(130,69,236,0.25)] transition-all duration-300 hover:shadow-[0_0_25px_2px_rgba(130,69,236,0.4)]"
        >
          <h3 className="text-2xl sm:text-2xl font-semibold text-gray-400 mb-4 text-center tracking-wide">
            {category.title}
          </h3>

          {/* Skill Items */}
          <Tilt
            key={category.title}
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center justify-center bg-transparent border border-gray-700 rounded-xl py-2 sm:py-3 px-1 text-center hover:border-[#8245ec] transition-all"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                    <img
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300 mt-2">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </Tilt>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
