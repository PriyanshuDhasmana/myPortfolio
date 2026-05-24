import React from "react";
import { motion } from "framer-motion";
import { Mountain, Plane, Activity, Motorbike } from "lucide-react";

const ImageCard = ({ className }) => (
  <div
    className={`aspect-[4/5] min-w-[220px] rounded-[20px] border border-[#1A1A1A] bg-gradient-to-br from-[#0B0B0D] via-[#0F0F12] to-[#101014] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(245,197,66,0.16)] ${className}`}
  />
);

const ViewMoreButton = ({ label }) => (
  <button className="rounded-[16px] border border-[#D4A017] bg-transparent px-6 py-3 text-sm font-semibold text-[#D4A017] transition duration-300 hover:bg-[#D4A017] hover:text-[#0B0B0D]">
    {label}
  </button>
);

const sectionData = [
  {
    id: "trekking",
    icon: Mountain,
    title: "TREKKING",
    description: [
      "Mountains have always been my reset.",
      "Completed treks like Kumara Parvatha (Kukke–Kukke),",
      "Savandurga, Kaivara Betta, Gokarna Beach Trek,",
      "and several across Karnataka.",
      "Being from Garhwal, Uttarakhand,",
      "trekking has been a part of me since childhood.",
    ],
  },
  {
    id: "travel",
    icon: Plane,
    title: "TRAVEL",
    description: [
      "Exploring places — from beaches to mountains.",
      "Travelled across Garhwal (Uttarakhand), Gokarna (solo),",
      "Alleppey, Chikkamagaluru, Coorg, Chennai, Kochi",
      "and cities like Bangalore, Mysore.",
      "Also explored Nepal, Delhi, Agra, Rajasthan and more.",
    ],
  },
  {
    id: "sports",
    icon: Activity,
    title: "SPORTS",
    description: [
      "Actively engaged in sports — football, cricket,",
      "pickleball and other outdoor games.",
      "Also enjoy indoor games like foosball.",
      "Sports keep me competitive, active and balanced.",
    ],
  },
  {
    id: "bikes",
    icon: Motorbike,
    title: "BIKES",
    description: [
      "Passionate about biking and the freedom it brings.",
      "Have done multiple rides including Coorg.",
      "Planning to get my own bike soon —",
      "reviews appreciated.",
      "This section will evolve with time. 😉",
    ],
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans text-white bg-[#0B0B0D]">
      <div className="grid gap-10 xl:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-[#D4A017]/70">BEYOND WORK</p>
          <div className="space-y-3">
            <h2 className="text-4xl font-black leading-[1.05] text-white sm:text-5xl">
              EXPLORING.
              <br /> EXPERIENCING.
              <br /> GROWING.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#A0A0A0]">
              A glimpse of the things that keep me energized and inspired outside of work.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <ImageCard key={index} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <button
          type="button"
          onClick={() => document.getElementById('trekking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="inline-flex items-center gap-2 rounded-full border border-[#D4A017] px-5 py-3 text-sm font-semibold text-[#D4A017] transition hover:bg-[#D4A017]/10"
        >
          Explore more
          <span className="text-lg">↓</span>
        </button>
      </div>

      <div className="mt-16 space-y-16">
        {sectionData.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={section.id} id={section.id} className="rounded-[20px] border border-[#1A1A1A] bg-[#09090B] p-8">
              <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:items-start">
                <div className="space-y-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#1A1A1A] bg-[#0B0B0D] text-[#D4A017] shadow-[0_0_20px_rgba(212,160,23,0.12)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {section.title}
                    </h3>
                    <div className="space-y-2 text-sm leading-7 text-[#A0A0A0]">
                      {section.description.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="overflow-x-auto pb-2">
                    <div className="inline-grid min-w-max grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4 sm:grid-flow-row sm:min-w-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                      {[...Array(5)].map((_, innerIndex) => (
                        <ImageCard key={innerIndex} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <ViewMoreButton label="View more →" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;
