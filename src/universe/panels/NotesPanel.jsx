import { motion } from "framer-motion";
import { springSoft } from "../universeNodes";

export default function NotesPanel({ data }) {
  return (
    <div className="u-panel">
      <header className="u-panel__header">
        <h2 className="u-panel__heading">{data.heading}</h2>
      </header>

      <div className="notes-stack">
        {data.statements.map((line, i) => (
          <motion.p
            key={line}
            className="note-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSoft, delay: 0.08 * i }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
