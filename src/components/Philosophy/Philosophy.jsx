import { motion } from "framer-motion";
import { defaultStackSections, howIWorkPrinciples } from "../../constants";

const Philosophy = () => {
  return (
    <section id="philosophy" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="stack-page-shell mx-auto max-w-7xl">
        <div className="stack-hero">
          <p className="section-kicker">THE DEFAULT STACK</p>

          <div className="stack-hero__row">
            <div>
              <h2 className="section-heading mt-3">The tools behind the work.</h2>
            </div>

            <div className="stack-status" aria-label="System status operational">
              <span className="stack-status__dot" aria-hidden="true" />
              <span className="stack-status__label">SYSTEM STATUS</span>
              <span className="stack-status__value">OPERATIONAL</span>
            </div>
          </div>

          <p className="stack-hero__subtitle mt-4">
            A practical stack built around software engineering, systems thinking, and getting things shipped.
          </p>
        </div>

        <div className="stack-grid">
          {defaultStackSections.map((section, sectionIndex) => (
            <motion.article
              key={`${section.title}-${sectionIndex}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: sectionIndex * 0.05 }}
              className="stack-category reactive-panel"
            >
              <div className="stack-category__header">
                <span className="stack-category__eyebrow">{section.title}</span>
              </div>

              <div className="stack-category__items">
                {section.items.map((item) => (
                  <div key={`${section.title}-${item.label}`} className="stack-item">
                    <div className="stack-item__meta">
                      <span className="stack-item__label">{item.label}</span>
                    </div>

                    <h3 className="stack-item__title">{item.title}</h3>
                    <p className="stack-item__description">{item.description}</p>

                    {item.tags && (
                      <div className="stack-item__tags">
                        {item.tags.map((tag) => (
                          <span key={`${item.label}-${tag}`} className="stack-item__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="stack-principles">
          <div className="stack-principles__header">
            <p className="section-kicker">HOW I WORK</p>
          </div>

          <div className="stack-principles__grid">
            {howIWorkPrinciples.map((principle, index) => (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="stack-principle"
              >
                <span className="stack-principle__id">{principle.id}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
