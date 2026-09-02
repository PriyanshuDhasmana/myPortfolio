import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Satellite from "./Satellite";
import { useReducedMotion, useIsMobile } from "./hooks";

/**
 * Orbiting satellites — desktop: elliptical orbits; mobile: rearranged arc.
 * Expanded mode scales radii outward. Reports positions for camera fly-to.
 */
export default function OrbitField({
  nodes,
  phase,
  focus,
  hovered,
  expanded,
  searchHits,
  parallax,
  onHover,
  onSelect,
  onPull,
  onPositions,
  orbitScale = 1,
  signalTarget = null,
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [tick, setTick] = useState(0);
  const pausedIds = useRef(new Set());
  const angles = useRef({});

  useEffect(() => {
    nodes.forEach((n) => {
      if (angles.current[n.id] == null) {
        // Initialize angles for desktop and mobile. For mobile, seed from
        // n.mobile.angle (degrees) but add a small random jitter so satellites
        // don't form a perfect hexagon and to avoid identical symmetry.
        if (mobile && n.mobile?.angle != null) {
          const base = (n.mobile.angle * Math.PI) / 180;
          const jitter = (Math.random() - 0.5) * 0.8; // +/- ~0.4rad
          angles.current[n.id] = base + jitter;
        } else {
          angles.current[n.id] = n.orbit.phase;
        }
      }
    });
  }, [nodes, mobile]);

  useEffect(() => {
    if (hovered) pausedIds.current.add(hovered);
    else pausedIds.current.clear();
  }, [hovered]);

  useEffect(() => {
    if (reduced || phase === "boot") return undefined;
    // Keep orbits alive at home; freeze when deep in a panel (except builds moons handle themselves)
    if (focus !== "home" && focus !== "builds") return undefined;
    let raf = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      nodes.forEach((n) => {
        if (pausedIds.current.has(n.id)) return;
        const speed = expanded ? n.orbit.speed * 0.55 : n.orbit.speed;
        angles.current[n.id] = (angles.current[n.id] ?? n.orbit.phase) + speed * dt;
      });
      setTick((t) => t + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [nodes, reduced, phase, focus, expanded]);

  const positions = useMemo(() => {
    void tick;
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    const scale = (mobile ? minDim * 0.92 : minDim * 1.05) * orbitScale;

    return nodes.map((n) => {
      let x;
      let y;
      if (mobile) {
        // Use the animated angle for mobile too (so satellites move on phones).
        const ang = angles.current[n.id] ?? ((n.mobile.angle * Math.PI) / 180);
        const r = n.mobile.radius * scale;
        const drift = reduced ? 0 : Math.sin((ang ?? 0) * 0.4) * 6;
        x = Math.cos(ang) * r + drift;
        // Nudge mobile system a bit upward so the orb sits slightly higher on small screens
        // and avoid the satellites forming a rigid hexagon — jitter added during init.
        y = Math.sin(ang) * r * 0.92 + drift * 0.4 - scale * 0.06;
      } else {
        const a = angles.current[n.id] ?? n.orbit.phase;
        const rx = n.orbit.radius * scale;
        const ry = n.orbit.radius * scale * 0.55;
        x = Math.cos(a) * rx;
        y = Math.sin(a) * ry + Math.sin(a * 1.3) * (n.orbit.phaseY * scale);
      }
      x += parallax.x * 28 * (n.orbit.radius + 0.2);
      y += parallax.y * 22 * (n.orbit.radius + 0.2);
      return { id: n.id, node: n, x, y };
    });
  }, [nodes, tick, mobile, parallax, reduced, orbitScale]);

  useEffect(() => {
    onPositions?.(positions);
  }, [positions, onPositions]);

  useEffect(() => {
    if (!hovered || !onPull) {
      onPull?.({ x: 0, y: 0 });
      return;
    }
    const p = positions.find((pos) => pos.id === hovered);
    if (!p) return;
    const len = Math.hypot(p.x, p.y) || 1;
    onPull({ x: (p.x / len) * 0.55, y: (p.y / len) * 0.55 });
  }, [hovered, positions, onPull]);

  const satsVisible = phase === "explore" || phase === "reveal" || expanded;
  const showSats = (focus === "home" || expanded) && (satsVisible || expanded);
  // When focused on a section, dim primary sats into distance
  const deepFocus = focus !== "home" && focus !== "builds";

  const posMap = useMemo(() => {
    const map = {};
    positions.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [positions]);

  const signalPosition = signalTarget ? posMap[signalTarget] : null;

  const connectionPairs = useMemo(() => {
    if (!hovered || !showSats) return [];
    const node = nodes.find((n) => n.id === hovered);
    if (!node) return [];
    return node.connections
      .map((to) => {
        const a = posMap[hovered];
        const b = posMap[to];
        if (!a || !b) return null;
        return { key: `${hovered}-${to}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
      })
      .filter(Boolean);
  }, [hovered, nodes, posMap, showSats]);

    // Auto-label cycling: when on the home explore phase, cycle labels one-by-one
    // so users get a subtle guided tour of each satellite's purpose.
    const [autoLabel, setAutoLabel] = useState(null);
    useEffect(() => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
      if (!showSats || phase !== "explore" || reduced || vw <= 420) {
        setAutoLabel(null);
        return undefined;
      }
      let idx = 0;
      setAutoLabel(nodes.length > 0 ? nodes[0].id : null);
      const t = setInterval(() => {
        idx = (idx + 1) % nodes.length;
        setAutoLabel(nodes[idx].id);
      }, 2200);
      return () => clearInterval(t);
    }, [showSats, phase, reduced, nodes]);

  return (
    <div
      className={`universe-orbit ${expanded ? "is-expanded" : ""}`}
      aria-hidden={focus !== "home" && !expanded}
    >
      {!mobile && showSats && (
        <svg className="universe-orbit__guides" viewBox="-500 -500 1000 1000">
          {nodes.map((n) => {
            const minDim = Math.min(window.innerWidth, window.innerHeight);
            const scale = minDim * 1.05 * orbitScale;
            const rx = n.orbit.radius * scale;
            const ry = n.orbit.radius * scale * 0.55;
            return (
              <ellipse
                key={n.id}
                cx="0"
                cy="0"
                rx={rx}
                ry={ry}
                className="universe-orbit__guide"
              />
            );
          })}
        </svg>
      )}

      {connectionPairs.length > 0 && (
        <svg
          className="universe-orbit__links"
          aria-hidden="true"
          viewBox="-600 -600 1200 1200"
          preserveAspectRatio="xMidYMid meet"
        >
          {connectionPairs.map((l) => (
            <line
              key={l.key}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              className="universe-orbit__link"
            />
          ))}
        </svg>
      )}

      {signalPosition && showSats && (
        <motion.span
          key={`signal-${signalTarget}`}
          className="universe-orbit__signal"
          initial={{ opacity: 0, scale: 0.45, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.45, 1, 1.25, 0.45],
            x: [0, signalPosition.x, signalPosition.x, 0],
            y: [0, signalPosition.y, signalPosition.y, 0],
          }}
          transition={{ duration: 3.1, times: [0, 0.32, 0.68, 1], ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}

      {positions.map(({ id, node, x, y }) => {
        const hit = searchHits?.size > 0 ? searchHits.has(id) : false;
        const dimmed = (searchHits?.size > 0 && !hit) || deepFocus;
        const signaled = signalTarget === id;
        return (
          <Satellite
            key={id}
            node={node}
            x={x}
            y={y}
            visible={showSats || expanded}
            hovered={hovered === id}
            highlighted={hit || expanded || signaled}
            signaled={signaled}
            dimmed={dimmed}
            paused={hovered === id}
            onHover={onHover}
            onSelect={onSelect}
            mobile={mobile}
            autoLabelActive={autoLabel === id}
            tabIndex={showSats ? 0 : -1}
          />
        );
      })}
    </div>
  );
}
