import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { navItems } from "../../constants";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", ...navItems.map((item) => item.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0.12, 0.35, 0.55] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleMenuItemClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6 lg:px-10">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between border border-white/10 bg-[#07111F]/80 px-3 py-2 backdrop-blur-2xl transition duration-300 ${
            isScrolled ? "shadow-[0_20px_60px_rgba(0,0,0,0.28)]" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => handleMenuItemClick("hero")}
            className="flex items-center gap-3 text-left"
            aria-label="Go to top"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-cyan-100/24 bg-cyan-100/[0.06] text-sm font-black text-cyan-100 sm:h-10 sm:w-10">
              PD
            </span>
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.26em] text-slate-200 md:block">
              Priyanshu Dhasmana
            </span>
          </button>

          <ul className="hidden items-center gap-5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`transition hover:text-cyan-100 ${
                    activeSection === item.id ? "text-cyan-100" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="https://github.com/PriyanshuDhasmana"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.04] text-cyan-100 transition hover:border-cyan-100/40 hover:bg-cyan-100/10 sm:h-10 sm:w-10"
              aria-label="GitHub"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/priyanshu-dhasmana-b7a12b1b6"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.04] text-cyan-100 transition hover:border-cyan-100/40 hover:bg-cyan-100/10 sm:h-10 sm:w-10"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => handleMenuItemClick("contact")}
            className="border border-cyan-100/30 bg-cyan-100/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-50 transition hover:border-cyan-100/50 lg:hidden"
          >
            Contact
          </button>
        </div>
      </nav>

      <nav
        className="mobile-dock fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07111F]/92 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-2xl lg:hidden"
        aria-label="Mobile section navigation"
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleMenuItemClick(item.id)}
              className={`mobile-dock-item shrink-0 px-2.5 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition sm:px-3 sm:text-[10px] sm:tracking-[0.16em] ${
                activeSection === item.id
                  ? "text-cyan-100"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
