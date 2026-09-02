import { useEffect, useRef } from "react";

const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pointer = { x: window.innerWidth * 0.68, y: window.innerHeight * 0.42 };
    const particles = [];
    let animationFrame;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const createParticles = () => {
      particles.length = 0;
      const density = width < 640 ? 34000 : 26000;
      const maxCount = width < 640 ? 42 : 78;
      const count = Math.min(maxCount, Math.max(22, Math.floor((width * height) / density)));

      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: Math.random() * 1.35 + 0.45,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createParticles();
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const drawGrid = (time) => {
      const scroll = window.scrollY * 0.04;
      const grid = 74;

      ctx.save();
      ctx.globalAlpha = 0.09;
      ctx.strokeStyle = "rgba(103, 232, 249, 0.34)";
      ctx.lineWidth = 1;

      for (let x = ((time * 0.008 + scroll) % grid) - grid; x < width + grid; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + scroll * 0.35, height);
        ctx.stroke();
      }

      for (let y = ((time * 0.006 + scroll) % grid) - grid; y < height + grid; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + scroll * 0.18);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawBeams = (time) => {
      const beam = ctx.createLinearGradient(0, 0, width, height);
      beam.addColorStop(0, "rgba(103, 232, 249, 0)");
      beam.addColorStop(0.42, "rgba(103, 232, 249, 0.06)");
      beam.addColorStop(0.58, "rgba(167, 139, 250, 0.05)");
      beam.addColorStop(1, "rgba(59, 130, 246, 0)");

      ctx.save();
      ctx.translate(Math.sin(time * 0.00022) * 80, Math.cos(time * 0.00018) * 60);
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, -40);
      ctx.lineTo(width * 0.55, -40);
      ctx.lineTo(width * 0.92, height + 40);
      ctx.lineTo(width * 0.45, height + 40);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawParticles = (time) => {
      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const influence = Math.max(0, 1 - distance / 180);
        const waveX = Math.sin(time * 0.00035 + particle.phase) * 0.32;
        const waveY = Math.cos(time * 0.00028 + particle.phase) * 0.32;

        particle.x += particle.vx + waveX + (dx / distance) * influence * 1.3;
        particle.y += particle.vy + waveY + (dy / distance) * influence * 1.3;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      }

      ctx.save();
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < 108) {
            ctx.strokeStyle = `rgba(103, 232, 249, ${0.08 * (1 - distance / 108)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = "rgba(248, 250, 252, 0.52)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      drawBeams(time);
      drawGrid(time);
      drawParticles(time);
      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07111F]">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--cursor-x) var(--cursor-y), rgba(103,232,249,0.20), transparent 24rem)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.1)_0%,rgba(11,16,32,0.45)_45%,rgba(4,8,18,0.86)_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(248,250,252,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(248,250,252,0.07)_1px,transparent_1px)] [background-size:120px_120px]" />
    </div>
  );
};

export default AmbientBackground;
