import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion, useIsMobile } from "./hooks";
import { springSnap, springSoft } from "./universeNodes";

/**
 * Project moons — orbit the Projects focus after camera arrives.
 * Click → open project detail (spatial unfold via parent focus).
 */
export default function ProjectMoons({
  moons,
  visible,
  hovered,
  onHover,
  onSelect,
  onPositions,
  connectionFromOrb = true,
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [tick, setTick] = useState(0);
  const angles = useRef({});
  const paused = useRef(new Set());

  useEffect(() => {
    moons.forEach((c, i) => {
      if (angles.current[c.id] == null) {
        angles.current[c.id] = c.angle ?? (i / moons.length) * Math.PI * 2;
      }
    });
  }, [moons]);

  useEffect(() => {
    if (hovered) paused.current.add(hovered);
    else paused.current.clear();
  }, [hovered]);

  useEffect(() => {
    if (!visible || reduced) return undefined;
    let raf = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      moons.forEach((c) => {
        if (paused.current.has(c.id)) return;
        angles.current[c.id] = (angles.current[c.id] ?? 0) + 0.28 * dt;
      });
      setTick((t) => t + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced, moons]);

  const positions = useMemo(() => {
    void tick;
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    const base = mobile ? minDim * 0.28 : minDim * 0.32;

    return moons.map((c, i) => {
      const a = angles.current[c.id] ?? c.angle ?? 0;
      const r = (c.radius ?? 0.22) * minDim * (mobile ? 1.15 : 1.35) || base;
      const rx = r;
      const ry = r * (mobile ? 0.72 : 0.58);
      const x = Math.cos(a) * rx;
      const y = Math.sin(a) * ry + Math.sin(a * 1.4 + i) * 8;
      return { ...c, x, y, size: mobile ? 14 : 12 };
    });
  }, [moons, tick, mobile]);

  useEffect(() => {
    onPositions?.(positions);
  }, [positions, onPositions]);

  if (!visible) return null;

  return (
    <div className="project-moons" aria-label="Project moons">
      <svg
        className="project-moons__ring"
        viewBox="-400 -400 800 800"
        aria-hidden="true"
      >
        <ellipse cx="0" cy="0" rx="220" ry="128" className="project-moons__guide" />
        {connectionFromOrb &&
          positions.map((p) => (
            <line
              key={`link-${p.id}`}
              x1="0"
              y1="0"
              x2={p.x * 0.85}
              y2={p.y * 0.85}
              className={`project-moons__spoke ${hovered === p.id ? "is-hot" : ""}`}
            />
          ))}
      </svg>

      {positions.map((p, i) => (
        <motion.button
          key={p.id}
          type="button"
          className={`project-moon-sat ${hovered === p.id ? "is-hovered" : ""}`}
          style={{ left: "50%", top: "50%", width: p.size + 6, height: p.size + 6 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            x: p.x - (p.size + 6) / 2,
            y: p.y - (p.size + 6) / 2,
            opacity: 1,
            scale: hovered === p.id ? 1.35 : 1,
          }}
          transition={hovered === p.id ? springSnap : { ...springSoft, delay: 0.04 * i }}
          onMouseEnter={() => onHover?.(p.id)}
          onMouseLeave={() => onHover?.(null)}
          onFocus={() => onHover?.(p.id)}
          onBlur={() => onHover?.(null)}
          onClick={() => onSelect?.(p.projectId || p.id.replace("project-", ""))}
          aria-label={`${p.label}. ${p.description || ""}`}
        >
          <span className="project-moon-sat__core" />
          {(hovered === p.id || mobile) && (
            <motion.span
              className="project-moon-sat__label"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springSnap}
            >
              <strong>{p.label}</strong>
              {p.description && <em>{p.description}</em>}
            </motion.span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
