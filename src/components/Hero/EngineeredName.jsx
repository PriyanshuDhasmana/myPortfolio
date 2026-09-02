import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import DecryptLetter from "./DecryptLetter";
import { letterKey, splitIntoLetters } from "../../utils/wrapLetters";

const nameLines = [
  { id: "line-1", text: "PRIYANSHU" },
  { id: "line-2", text: "DHASMANA" },
];

const EngineeredName = ({ energized }) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50, active: false });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y, active: true });
  };

  const onLeave = () => setPointer((p) => ({ ...p, active: false }));

  return (
    <motion.h1
      ref={ref}
      aria-label="Priyanshu Dhasmana"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-hover={pointer.active ? "true" : "false"}
      data-energized={energized ? "true" : "false"}
      className="engineered-name cinematic-heading glassmorphic-title"
      style={{
        "--name-x": `${pointer.x}%`,
        "--name-y": `${pointer.y}%`,
      }}
    >
      <span className="engineered-name-grid" aria-hidden="true" />
      <span
        className="engineered-name-trace"
        aria-hidden="true"
        style={{ "--trace-x": `${pointer.x}%` }}
      />

      {nameLines.map((line) => (
        <span key={line.id} className="engineered-line" aria-hidden="true">
          {splitIntoLetters(line.text).map(({ char, index }) => (
            <DecryptLetter
              key={letterKey(line.id, index)}
              char={char}
              scrambleEnabled={!prefersReducedMotion}
            />
          ))}
        </span>
      ))}
    </motion.h1>
  );
};

export default EngineeredName;
