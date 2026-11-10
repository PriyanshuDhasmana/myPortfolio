import { motion } from "framer-motion";
import { springSoft, springSnap } from "./universeNodes";

export default function Satellite({
  node,
  x,
  y,
  visible,
  hovered,
  highlighted,
  signaled,
  dimmed,
  paused,
  mobile = false,
  autoLabelActive = false,
  onHover,
  onSelect,
  tabIndex = 0,
}) {
  const coreSize = 10 + (node.orbit?.size ?? 1) * 8;
  const isFeatured = ["overview", "builds", "timeline"].includes(node.id);
  const featuredBoost = isFeatured ? 1.18 : 1;
  const renderedCoreSize = coreSize * featuredBoost;
  const targetSize = mobile ? Math.max(40, renderedCoreSize) : renderedCoreSize;

  const colors = ["#eaf7ff", "#9fd3ff", "#3b82f6", "rgba(59, 130, 246, 0.34)"];

  return (
    <motion.button
      type="button"
      className={`universe-sat ${isFeatured ? "is-featured" : ""} ${hovered ? "is-hovered" : ""} ${highlighted ? "is-hit" : ""} ${signaled ? "is-signaled" : ""} ${dimmed ? "is-dim" : ""}`}
      style={{
        left: "50%",
        top: "50%",
        width: targetSize,
        height: targetSize,
        "--sat-core-size": `${mobile ? renderedCoreSize + 3 : renderedCoreSize}px`,
        "--sat-core-light": colors[0],
        "--sat-core-mid": colors[1],
        "--sat-core-deep": colors[2],
        "--sat-glow": colors[3],
      }}
      initial={false}
      animate={{
        x: x - targetSize / 2,
        y: y - targetSize / 2,
        opacity: visible ? (dimmed ? 0.25 : 1) : 0,
        scale: hovered ? 1.45 : highlighted ? (isFeatured ? 1.28 : 1.25) : isFeatured ? 1.12 : 1,
      }}
      transition={paused || hovered ? springSnap : springSoft}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(node.id)}
      onBlur={() => onHover?.(null)}
      onClick={() => onSelect?.(node.id)}
      tabIndex={tabIndex}
      aria-label={`${node.label}. ${node.description}`}
    >
      <span className="universe-sat__core" />
      <span className="universe-sat__aura" />
      {(mobile || hovered || highlighted || autoLabelActive) && (
        <motion.span
          className="universe-sat__label"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springSnap}
        >
          <strong>{node.label}</strong>
          <em>{node.description}</em>
        </motion.span>
      )}
    </motion.button>
  );
}
