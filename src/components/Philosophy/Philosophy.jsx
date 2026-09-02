import { motion } from "framer-motion";
import { philosophyStatements } from "../../constants";

const Philosophy = () => {
  return (
    <section id="philosophy" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="section-kicker">Notes</p>
        <h2 className="section-heading mt-4 max-w-3xl">Principles I build by.</h2>
        <div className="mt-10 space-y-6 sm:space-y-8">
          {philosophyStatements.map((statement, index) => (
            <motion.h2
              key={statement}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
              className="max-w-5xl text-[clamp(1.75rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-normal text-slate-50"
            >
              <span className={index % 2 === 1 ? "text-transparent [-webkit-text-stroke:1px_rgba(248,250,252,0.58)]" : ""}>
                {statement}
              </span>
            </motion.h2>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
