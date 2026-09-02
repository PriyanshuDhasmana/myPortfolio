import { motion } from "framer-motion";
import { beyondCode } from "../../constants";

const BeyondCode = () => {
  return (
    <section id="beyond" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="section-kicker">Beyond code</p>
            <h2 className="section-heading mt-4">How ideas take shape.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 lg:justify-self-end">
            Workspaces, sketches, and prototypes—the habits that sit behind the shipped work.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {beyondCode.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="reactive-panel overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl lg:last:col-span-1"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="aspect-[4/3] w-full border-b border-white/10 object-cover opacity-88"
              />
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-black text-slate-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-cyan-100/12 bg-cyan-100/[0.04] px-2.5 py-1 text-xs text-cyan-50/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeyondCode;
