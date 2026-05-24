import React, { useState } from "react";
import { projects } from "../../constants";

const getProjectTagStyle = (tag) => {
  return "from-[#ffd166] via-[#f59e0b] to-[#ffd166] text-black";
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="work" className="py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">PROJECTS</h2>
        <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-[#ffd166] via-[#f59e0b] to-[#ffd166]"></div>
        
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleOpenModal(project)}
            className="group cursor-pointer overflow-hidden rounded-[2rem] border border-[#ffd166]/15 bg-[#090702]/80 p-4 shadow-[0_20px_60px_rgba(255,209,102,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(255,209,102,0.18)]"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ffd166]/15 bg-[#050810] pb-[56.25%] shadow-[inset_0_0_40px_rgba(255,209,102,0.1)]">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute right-4 top-4 rounded-full bg-[#050110]/90 px-3 py-1 text-xs text-white/80 backdrop-blur-md border border-[#ffd166]/20">
                {project.tags[0]}
              </div>
            </div>
            <div className="mt-5 space-y-4 px-1">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-gradient-to-r ${getProjectTagStyle(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-full xl:max-w-4xl max-h-[calc(100vh-3rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-[#050110]/95 shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
            <div className="absolute right-4 top-4 z-20">
              <button
                onClick={handleCloseModal}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0B0D12]/95 text-3xl text-white/80 transition hover:text-[#ffd166]"
              >
                &times;
              </button>
            </div>
            <div className="grid gap-6 overflow-y-auto p-4 lg:grid-cols-[1.5fr_1fr] lg:p-6 max-h-[calc(100vh-5rem)]">
              <div className="rounded-[1.75rem] border border-[#ffd166]/15 bg-[#090702] p-4 shadow-[0_20px_60px_rgba(255,209,102,0.08)] overflow-hidden aspect-[16/9] sm:aspect-[4/3]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="space-y-5 text-left">
                <div>
                  <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                  <p className="mt-3 text-gray-300 leading-relaxed">{selectedProject.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold bg-gradient-to-r ${getProjectTagStyle(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href={selectedProject.github || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#0f1223] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#06111e]"
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject.webapp || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ffd166] to-[#f59e0b] px-6 py-3 text-center text-sm font-semibold text-black shadow-[0_20px_60px_rgba(255,209,102,0.2)] transition hover:opacity-90"
                  >
                    View Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
