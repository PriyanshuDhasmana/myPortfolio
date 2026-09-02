import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import EngineeredName from "../Hero/EngineeredName";
import ProjectCardsPanel from "../Hero/ProjectCardsPanel";
import MagneticButton from "../MagneticButton";

const About = () => {
  return (
    <section
      id="hero"
      className="hero-section relative overflow-x-hidden px-4 pb-28 pt-[4.75rem] sm:px-6 sm:pb-24 sm:pt-24 lg:px-12 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-cyan-100/16 to-transparent" />
      <div className="pointer-events-none absolute left-[6%] top-[14%] h-36 w-36 rounded-full bg-cyan-300/6 blur-[72px]" />
      <div className="pointer-events-none absolute right-[8%] top-[20%] h-44 w-44 rounded-full bg-blue-500/6 blur-[88px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#07111F]" />
      <div className="hero-orbital-mark hero-orbital-mark--left" aria-hidden="true" />
      <div className="hero-glass-star" aria-hidden="true" />

      <div className="hero-layout relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div className="hero-area-role min-w-0">
          <motion.p
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-7 overflow-hidden text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-200/85 sm:h-8 sm:text-[11px] sm:tracking-[0.32em]"
          >
            Interface builder
          </motion.p>
        </div>

        <div className="hero-area-name min-w-0">
          <EngineeredName />
        </div>

        <p className="hero-area-intro min-w-0 max-w-xl text-[0.95rem] leading-relaxed text-slate-300 sm:text-base sm:leading-8">
          I design and ship interfaces, workflows, and tools that stay calm on the surface and deliberate underneath.
        </p>

        <div className="hero-area-panel min-w-0">
          <ProjectCardsPanel />
        </div>

        <div className="hero-area-cta flex min-w-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
          <MagneticButton
            href="#builds"
            className="hero-cta hero-cta-primary group inline-flex w-full min-w-0 items-center justify-center gap-2.5 border border-cyan-200/40 bg-cyan-100 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#07111F] sm:w-auto sm:px-6 sm:py-3.5 sm:text-sm sm:tracking-[0.18em]"
          >
            <span className="truncate">Explore work</span>
            <ArrowRight className="relative z-10 h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="hero-cta inline-flex w-full min-w-0 items-center justify-center gap-2.5 border border-white/12 bg-white/[0.04] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-100 backdrop-blur-xl sm:w-auto sm:px-6 sm:py-3.5 sm:text-sm sm:tracking-[0.18em]"
          >
            <Mail className="relative z-10 h-4 w-4 shrink-0" />
            <span className="truncate">Start a conversation</span>
          </MagneticButton>
        </div>
      </div>

      <a
        href="#overview"
        className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-cyan-100/55 transition hover:text-cyan-100/85 lg:bottom-8 lg:flex"
        aria-label="Scroll to overview"
      >
        <span className="text-[10px] uppercase tracking-[0.26em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
};

export default About;
