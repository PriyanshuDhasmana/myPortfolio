import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { navItems } from "../../constants";

const Footer = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative border-t border-white/10 px-4 py-10 pb-24 text-white sm:px-8 lg:px-12 lg:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-black text-slate-50 sm:text-lg">Priyanshu Dhasmana</p>
          <p className="mt-2 text-sm text-slate-400">Engineer · Bangalore</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScroll(item.id)}
              className="border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 transition hover:border-cyan-100/25 hover:text-cyan-100"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {[
            { icon: <FaTwitter />, link: "https://x.com/PriyanshuDhasm4", label: "X" },
            { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/priyanshu-dhasmana-b7a12b1b6", label: "LinkedIn" },
            { icon: <FaGithub />, link: "https://github.com/PriyanshuDhasmana", label: "GitHub" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-cyan-100 transition hover:border-cyan-100/35"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-xs text-slate-500">
        © {new Date().getFullYear()} Priyanshu Dhasmana
      </p>
    </footer>
  );
};

export default Footer;
