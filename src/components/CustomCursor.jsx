import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let auraX = lastX;
    let auraY = lastY;
    let velocity = 0;
    let isHovering = false;
    let animationFrame;

    const move = (event) => {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      velocity = Math.min(1, Math.hypot(dx, dy) / 70);
      lastX = event.clientX;
      lastY = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${lastX}px, ${lastY}px, 0) scale(${isHovering ? 0.62 : 1})`;
      }
    };

    const render = () => {
      auraX += (lastX - auraX) * 0.14;
      auraY += (lastY - auraY) * 0.14;
      velocity *= 0.88;

      if (auraRef.current) {
        const scale = 1 + velocity * 0.22 + (isHovering ? 0.42 : 0);
        auraRef.current.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) scale(${scale})`;
        auraRef.current.style.opacity = isHovering ? "0.95" : "0.72";
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const handleOver = (event) => {
      isHovering = Boolean(event.target.closest("a, button, input, textarea, label, [data-cursor='interactive']"));
      document.documentElement.dataset.cursor = isHovering ? "interactive" : "default";
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", handleOver);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", handleOver);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  return (
    <>
      <div ref={auraRef} className="custom-cursor custom-cursor-aura" />
      <div ref={dotRef} className="custom-cursor custom-cursor-dot" />
    </>
  );
};

export default CustomCursor;
