import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (sectionId) => {
    setIsOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-20">
      <div className={`mx-auto flex max-w-[1200px] items-center justify-between rounded-[1.75rem] border border-white/10 bg-[#05060f]/95 px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 ${
          isScrolled ? "bg-[#05060f]/100 shadow-[0_30px_80px_rgba(0,0,0,0.35)]" : ""
        }`}>
        <button
          onClick={() => handleMenuItemClick('about')}
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#e6c87a] transition hover:text-white"
          aria-label="Go to hero section"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#e6c87a]/20 bg-[#121521] text-sm shadow-[0_0_18px_rgba(230,200,122,0.12)]">
            PD
          </span>
          <span className="hidden md:block">Priyanshu / Dhasmana</span>
        </button>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {menuItems.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className="transition text-slate-200 hover:text-white"
              >
                {item.label}
              </button>
              <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-gradient-to-r from-[#e6c87a] via-[#f59e0b] to-[#e6c87a] transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/PriyanshuDhasmana"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#e6c87a] transition hover:border-[#e6c87a]/50 hover:bg-[#171921]/90"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/priyanshu-dhasmana-b7a12b1b6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#e6c87a] transition hover:border-[#e6c87a]/50 hover:bg-[#171921]/90"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
        </div>

        <button
          className="md:hidden rounded-full border border-white/10 bg-white/5 p-2 text-[#e6c87a] transition hover:bg-[#171921]/90"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-4 top-[6.5rem] z-50 w-[calc(100%-2rem)] rounded-[2rem] border border-white/10 bg-[#06080f]/95 p-5 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:hidden">
          <ul className="flex flex-col gap-4 text-slate-200 text-base">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className="w-full rounded-2xl px-4 py-3 text-left transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="https://github.com/PriyanshuDhasmana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#e6c87a] transition hover:border-[#e6c87a]/50 hover:bg-[#171921]/90"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/priyanshu-dhasmana-b7a12b1b6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#e6c87a] transition hover:border-[#e6c87a]/50 hover:bg-[#171921]/90"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
