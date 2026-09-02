import { useEffect, useRef } from "react";
import { useReducedMotion } from "./hooks";

/**
 * Subtle infinite depth: faint grid, soft fog, sparse particles, rare light streaks.
 * No starfield wallpaper — premium restraint.
 */
export default function UniverseBackground({ parallax = { x: 0, y: 0 }, mood = "home" }) {
  const canvasRef = useRef(null);
  const parallaxRef = useRef(parallax);
  const reduced = useReducedMotion();

  // Pointer movement is intentionally high-frequency. Keep it out of the
  // canvas setup effect so the atmosphere is not torn down and recreated
  // every time the cursor moves.
  useEffect(() => {
    parallaxRef.current = parallax;
  }, [parallax]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const particles = [];
    const streaks = [];
    let t = 0;

    const moodAccent = {
      home: [103, 232, 249],
      calm: [103, 232, 249],
      projects: [96, 165, 250],
      experience: [125, 211, 252],
      lab: [167, 139, 250],
      contact: [165, 243, 252],
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(48, Math.floor((w * h) / 28000));
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: 0.2 + Math.random() * 0.8,
          r: 0.4 + Math.random() * 1.2,
          drift: 0.08 + Math.random() * 0.25,
        });
      }
    };

    const spawnStreak = () => {
      if (streaks.length > 1 || Math.random() > 0.008) return;
      streaks.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.6,
        len: 40 + Math.random() * 80,
        speed: 4 + Math.random() * 6,
        life: 0,
        max: 40 + Math.random() * 30,
      });
    };

    const drawGrid = (ox, oy) => {
      const spacing = 72;
      ctx.save();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.045)";
      ctx.lineWidth = 1;
      const offsetX = (ox * 18) % spacing;
      const offsetY = (oy * 18) % spacing;
      ctx.beginPath();
      for (let x = -spacing + offsetX; x < w + spacing; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = -spacing + offsetY; y < h + spacing; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // vanishing fade
      const g = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, h * 0.75);
      g.addColorStop(0, "rgba(7, 17, 31, 0)");
      g.addColorStop(1, "rgba(7, 17, 31, 0.72)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    };

    const frame = () => {
      t += 1;
      const accent = moodAccent[mood] || moodAccent.home;
      const activeParallax = parallaxRef.current;
      ctx.clearRect(0, 0, w, h);

      // deep navy base fog
      const fog = ctx.createRadialGradient(
        w * 0.5 + activeParallax.x * 40,
        h * 0.48 + activeParallax.y * 30,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.7
      );
      fog.addColorStop(0, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.06)`);
      fog.addColorStop(0.45, "rgba(11, 16, 32, 0.35)");
      fog.addColorStop(1, "rgba(7, 17, 31, 0.9)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, w, h);

      drawGrid(activeParallax.x, activeParallax.y);

      for (const p of particles) {
        if (!reduced) {
          p.y -= p.drift * p.z * 0.35;
          p.x += Math.sin((t + p.y) * 0.002) * 0.15 * p.z;
          if (p.y < -4) {
            p.y = h + 4;
            p.x = Math.random() * w;
          }
        }
        const px = p.x + activeParallax.x * 12 * p.z;
        const py = p.y + activeParallax.y * 10 * p.z;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${0.15 + p.z * 0.35})`;
        ctx.arc(px, py, p.r * p.z, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) spawnStreak();
      for (let i = streaks.length - 1; i >= 0; i -= 1) {
        const s = streaks[i];
        s.life += 1;
        s.x += s.speed;
        s.y += s.speed * 0.35;
        const alpha = 1 - s.life / s.max;
        ctx.strokeStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y - s.len * 0.35);
        ctx.stroke();
        if (s.life >= s.max) streaks.splice(i, 1);
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mood, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="universe-bg"
      aria-hidden="true"
    />
  );
}
