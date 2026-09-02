import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Glass slab with mouse-tracking border gleam and subtle lift on hover.
 */
export default function GleamCard({ children, className = "", ...motionProps }) {
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div className="gleam-card-wrap" {...motionProps}>
      <article
        ref={ref}
        className={`glass-slab gleam-card ${hovered ? "is-hovered" : ""} ${className}`.trim()}
        style={{
          "--gleam-x": `${spot.x}%`,
          "--gleam-y": `${spot.y}%`,
        }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setSpot({ x: 50, y: 50 });
        }}
      >
        <span className="gleam-card__sheen" aria-hidden="true" />
        <span className="gleam-card__border" aria-hidden="true" />
        {children}
      </article>
    </motion.div>
  );
}
