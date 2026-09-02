import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "./hooks";
import { springSoft } from "./universeNodes";

const MOOD_STYLES = {
  home: {
    core: "radial-gradient(circle at 35% 30%, #e0f7ff 0%, #67e8f9 18%, #3b82f6 42%, #1e3a5f 68%, #0b1020 100%)",
    glow: "rgba(103, 232, 249, 0.45)",
    ring: "rgba(96, 165, 250, 0.35)",
    speed: 1,
  },
  calm: {
    core: "radial-gradient(circle at 40% 28%, #f0f9ff 0%, #7dd3fc 20%, #3b82f6 48%, #1e293b 72%, #0b1020 100%)",
    glow: "rgba(125, 211, 252, 0.4)",
    ring: "rgba(103, 232, 249, 0.3)",
    speed: 0.85,
  },
  projects: {
    core: "radial-gradient(circle at 32% 35%, #dbeafe 0%, #60a5fa 22%, #2563eb 50%, #1e3a8a 74%, #0b1020 100%)",
    glow: "rgba(96, 165, 250, 0.5)",
    ring: "rgba(59, 130, 246, 0.4)",
    speed: 1.05,
  },
  experience: {
    core: "radial-gradient(circle at 45% 30%, #e2e8f0 0%, #94a3b8 18%, #64748b 45%, #1e293b 70%, #0b1020 100%)",
    glow: "rgba(148, 163, 184, 0.4)",
    ring: "rgba(125, 211, 252, 0.28)",
    speed: 0.7,
  },
  lab: {
    core: "radial-gradient(circle at 38% 28%, #ede9fe 0%, #a78bfa 18%, #6366f1 40%, #3b82f6 62%, #0b1020 100%)",
    glow: "rgba(167, 139, 250, 0.5)",
    ring: "rgba(129, 140, 248, 0.4)",
    speed: 1.35,
  },
  contact: {
    core: "radial-gradient(circle at 42% 32%, #ffffff 0%, #a5f3fc 22%, #67e8f9 48%, #0ea5e9 70%, #0b1020 100%)",
    glow: "rgba(165, 243, 252, 0.55)",
    ring: "rgba(103, 232, 249, 0.45)",
    speed: 0.9,
  },
};

/**
 * Living energy core. Hold 2s = expand. Long-press on touch = home.
 * Double-click always returns home. Timers are mutually exclusive.
 */
export default function Orb({
  mood = "home",
  phase = "boot",
  pull = { x: 0, y: 0 },
  onHoldComplete,
  onDoubleClick,
  onLongPress,
  size = 160,
  isTouch = false,
}) {
  const reduced = useReducedMotion();
  const holdTimer = useRef(null);
  const longPressTimer = useRef(null);
  const expandedHold = useRef(false);
  const [holding, setHolding] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const rotateX = useTransform(sy, [-40, 40], [8, -8]);
  const rotateY = useTransform(sx, [-40, 40], [-8, 8]);

  const style = MOOD_STYLES[mood] || MOOD_STYLES.home;
  const visible = phase !== "boot";

  useEffect(() => {
    mx.set(pull.x * 18);
    my.set(pull.y * 18);
  }, [pull.x, pull.y, mx, my]);

  const clearTimers = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setHolding(false);
  };

  return (
    <motion.button
      type="button"
      className="universe-orb"
      aria-label="Identity core. Double-click to return home. Hold two seconds to expand. On touch, long-press returns home."
      style={{
        width: size,
        height: size,
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        x: sx,
        y: sy,
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? (holding ? 1.08 : 1) : 0.4,
      }}
      transition={springSoft}
      onPointerMove={(e) => {
        if (reduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mx.set((e.clientX - cx) * 0.35);
        my.set((e.clientY - cy) * 0.35);
      }}
      onPointerLeave={() => {
        mx.set(pull.x * 18);
        my.set(pull.y * 18);
        clearTimers();
      }}
      onPointerDown={() => {
        expandedHold.current = false;
        setHolding(true);

        // Desktop / always: 2s hold expands universe
        holdTimer.current = window.setTimeout(() => {
          expandedHold.current = true;
          onHoldComplete?.();
          setHolding(false);
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
          }
        }, 2000);

        // Touch only: medium press returns home (cancelled if 2s expand fires)
        if (isTouch) {
          longPressTimer.current = window.setTimeout(() => {
            if (!expandedHold.current) {
              onLongPress?.();
            }
          }, 650);
        }
      }}
      onPointerUp={() => clearTimers()}
      onDoubleClick={() => onDoubleClick?.()}
    >
      <span
        className="universe-orb__glow"
        style={{
          background: `radial-gradient(circle, ${style.glow} 0%, transparent 70%)`,
          animationDuration: reduced ? "0s" : `${6 / style.speed}s`,
        }}
      />
      <span
        className="universe-orb__core"
        style={{
          background: style.core,
          animationDuration: reduced ? "0s" : `${8 / style.speed}s`,
        }}
      />
      <span
        className="universe-orb__sheen"
        style={{ animationDuration: reduced ? "0s" : `${10 / style.speed}s` }}
      />
      <span
        className="universe-orb__ring"
        style={{
          borderColor: style.ring,
          animationDuration: reduced ? "0s" : `${12 / style.speed}s`,
        }}
      />
      <span
        className="universe-orb__ring universe-orb__ring--slow"
        style={{
          borderColor: style.ring,
          animationDuration: reduced ? "0s" : `${18 / style.speed}s`,
        }}
      />
      <span className="universe-orb__pulse" style={{ boxShadow: `0 0 40px ${style.glow}` }} />
    </motion.button>
  );
}
