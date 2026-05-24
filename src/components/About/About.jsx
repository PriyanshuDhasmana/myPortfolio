import React from 'react';
import { ArrowRight, Code2, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImage from '../../assets/profile2.png';

const About = () => {

  return (
    <section id="about" className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,209,102,0.06),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_28%)]" />
      <div className="absolute inset-0 hero-celestial-grid opacity-5" />
      <div className="absolute inset-0 hero-network-vertices opacity-12" />
      <div className="absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)] opacity-22" />
      <div className="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-transparent via-[#020308]/20 to-[#020308] pointer-events-none" />

      <div className="absolute left-[-16%] top-24 hidden h-[320px] w-[320px] rounded-full bg-[#EAB308]/20 blur-[120px] animate-blob-slow xl:block" />
      <div className="absolute right-[-14%] top-[28%] hidden h-[260px] w-[260px] rounded-full bg-[#F59E0B]/15 blur-[100px] animate-blob-slower xl:block" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-3 py-3 sm:px-10 md:py-16 lg:px-24">
        <div className="grid items-start gap-4 lg:gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="order-1 lg:col-start-1 lg:row-start-1 mx-auto max-w-xl space-y-4 text-center md:mx-0 md:text-left md:space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">full stack developer</p>

            <div className="space-y-2">
              <h1 className="text-3xl leading-snug font-black tracking-tighter text-transparent sm:text-5xl md:text-7xl lg:text-7xl bg-gradient-to-r from-[#EAB308] via-[#FACC15] to-white bg-clip-text">
                <span className="block">PRIYANSHU</span>
                <span className="block">DHASMANA</span>
              </h1>
              <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-xl md:text-2xl md:leading-9">
                I am a Fullstack Dev | Problem Solver.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="order-3 lg:col-start-1 lg:row-start-2 space-y-4"
          >
            <div className="flex flex-col gap-3 items-center justify-center sm:flex-row sm:items-center sm:justify-start">
              <motion.a
                href="/gallery.html"
                whileHover={{ y: -2 }}
                className="relative inline-flex w-full justify-center overflow-hidden rounded-full bg-[#EAB308] px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_18px_60px_rgba(234,179,8,0.2)] button-shimmer sm:w-auto sm:px-7 sm:py-3"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  My Gallery
                  <ArrowRight size={16} />
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#EAB308] bg-transparent px-5 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-[#EAB308]/10 sm:w-auto sm:px-7 sm:py-3"
              >
                <Mail size={16} className="mr-2" />
                Contact Me
              </motion.a>
            </div>

            <div className="grid gap-2 grid-cols-2 items-stretch mt-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-2 sm:p-5 backdrop-blur-md transition h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
                <div className="relative z-10 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white/10 text-[#FACC15] shadow-[0_12px_40px_rgba(250,204,21,0.12)]">
                  <Code2 size={20} />
                </div>
                <h3 className="relative z-10 mt-3 text-xs font-semibold text-white">Scalable Apps</h3>
                <p className="relative z-10 mt-2 text-[11px] leading-5 text-slate-400 sm:hidden">
                  Built for growth and reliability.
                </p>
                <p className="relative z-10 mt-2 hidden text-[11px] leading-5 text-slate-300 sm:block">
                  I build end-to-end solutions with clean architecture and performance in mind.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-2 sm:p-5 backdrop-blur-md transition h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
                <div className="relative z-10 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white/10 text-[#FACC15] shadow-[0_12px_40px_rgba(250,204,21,0.12)]">
                  <Sparkles size={20} />
                </div>
                <h3 className="relative z-10 mt-3 text-xs font-semibold text-white">Premium UI</h3>
                <p className="relative z-10 mt-2 text-[11px] leading-5 text-slate-400 sm:hidden">
                  Elegant experiences, fast interactions.
                </p>
                <p className="relative z-10 mt-2 hidden text-[11px] leading-5 text-slate-300 sm:block">
                  I design intuitive experiences that are fast, accessible, and built for real users.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 relative mx-auto flex w-full max-w-[580px] justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group relative isolate w-full max-w-full h-[360px] aspect-[4/5] md:h-[520px] md:aspect-auto overflow-hidden rounded-2xl md:rounded-[2.75rem] border border-[#1b1f26]/40 md:border-[#1b1f26]/70 bg-[#060812]/95 md:bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] md:shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-md -mt-1 md:mt-0"
            >
              <div className="absolute inset-0 rounded-[2.75rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_30%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.08),transparent_52%)] opacity-45" />
              <div className="absolute inset-0 futuristic-grid opacity-25" />
              <div className="absolute inset-0 wireframe-overlay opacity-15 mix-blend-screen" />
              {/* Mobile-only atmospheric highlights (radial glow + ambient band) */}
              <div className="md:hidden absolute inset-0 pointer-events-none">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[78%] h-[78%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.10),transparent_40%)] blur-3xl opacity-95" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[86%] h-[40%] rounded-t-[40%] bg-[linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.45))] opacity-60" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
                className="hidden sm:block absolute left-5 top-28 w-40 rounded-[1.75rem] border border-white/10 bg-[#05080f]/85 p-3 text-[10px] text-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FACC15]">Live snippet</p>
                <pre className="mt-2 overflow-hidden text-[10px] leading-4 text-slate-300">
                  <code className="block text-[#A78BFA]">const</code>
                  <code className="block">[project, setProject] = useState</code>
                  <code className="block text-slate-400">('portfolio');</code>
                </pre>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                className="hidden sm:block absolute right-5 top-24 w-36 rounded-[1.75rem] border border-white/10 bg-[#05080f]/85 p-3 text-[10px] text-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md"
              >
                <div className="flex items-center gap-2 text-[10px] font-semibold text-[#FACC15]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#FACC15]" /> Metrics
                </div>
                <div className="mt-3 flex h-14 items-end gap-1">
                  <span className="block h-3 w-2 rounded-full bg-[#FACC15]" />
                  <span className="block h-4 w-2 rounded-full bg-[#FACC15]/90" />
                  <span className="block h-7 w-2 rounded-full bg-[#FACC15]/80" />
                  <span className="block h-5 w-2 rounded-full bg-[#FACC15]/70" />
                  <span className="block h-6 w-2 rounded-full bg-[#FACC15]/60" />
                </div>
              </motion.div>

              <div className="hidden sm:flex absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-[#02070f]/85 px-3 py-1.5 text-xs text-slate-100 backdrop-blur-md">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.55)] animate-online-pulse" />
                Online
              </div>

              <div className="absolute inset-5 overflow-hidden rounded-[2rem] border border-white/10 bg-[#060812]/95 shadow-[inset_0_0_45px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.14),transparent_65%)] opacity-70" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_center,rgba(255,204,77,0.16),transparent_92%)] opacity-50 md:opacity-80" />
                <img
                  src={profileImage}
                  alt="Priyanshu Dhasmana"
                  className="absolute inset-0 h-full w-full object-cover object-top filter contrast-[1.05] brightness-[0.92] saturate-[1.1]"
                />
                <div className="absolute inset-0 rounded-[2rem] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22 viewBox=%220 0 140 140%22%3E%3Cg fill=%22none%22 stroke=%22rgba(234,179,8,0.12)%22 stroke-width=%221%22%3E%3Cpath d=%22M5 35h45M90 20h35M35 70h40M20 110h70%22/%3E%3Cpath d=%22M80 0v20M40 30v30M100 50v20M70 80v20M55 110v20%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="md:hidden mt-4 flex justify-center">
          <button
            onClick={() => {
              const next = document.querySelector('#skills') || document.querySelector('#contact') || document.body;
              next.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            aria-label="Explore"
            className="flex flex-col items-center gap-1 text-[#EAB308] focus:outline-none"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95">
              <path d="M1 1l8 8 8-8" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] tracking-[0.28em] uppercase">EXPLORE</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
