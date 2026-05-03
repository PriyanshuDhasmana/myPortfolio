import React, { useEffect, useRef } from 'react';

const HeroBackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Network configuration
    const gridSize = 80;
    const nodeRadius = 1.2;
    const connectionDistance = 120;
    const gridOffsetX = 40;
    const gridOffsetY = 40;

    // Generate base grid nodes
    const generateNodes = () => {
      const nodes = [];
      const cols = Math.ceil(canvas.width / gridSize) + 2;
      const rows = Math.ceil(canvas.height / gridSize) + 2;

      for (let y = -1; y < rows; y++) {
        for (let x = -1; x < cols; x++) {
          const baseX = x * gridSize + gridOffsetX;
          const baseY = y * gridSize + gridOffsetY;

          // Create unique seed for each node for consistent drift
          const seed = x * 73856093 ^ y * 19349663;
          const driftAmount = Math.sin(seed * 0.0001) * 12 + Math.cos(seed * 0.00015) * 12;

          nodes.push({
            baseX,
            baseY,
            seed,
            driftAmount,
            pulsePhase: (seed % 1000) / 1000,
          });
        }
      }
      return nodes;
    };

    const nodes = generateNodes();

    // Animation loop
    const animate = () => {
      time += 0.0015; // Very slow progression (30-second cycle ≈ 0.0033)

      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#050110');
      gradient.addColorStop(0.5, '#1a003d');
      gradient.addColorStop(1, '#2D0060');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply slight parallax offset
      const parallaxX = Math.sin(time * 0.15) * 8;
      const parallaxY = Math.cos(time * 0.12) * 6;

      // Draw grid lines with subtle animation
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width + gridSize; i += gridSize) {
        const offsetX = (i + parallaxX) % (gridSize * 2);
        ctx.beginPath();
        ctx.moveTo(offsetX - parallaxX, 0 - parallaxY);
        ctx.lineTo(offsetX - parallaxX, canvas.height - parallaxY);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height + gridSize; i += gridSize) {
        const offsetY = (i + parallaxY) % (gridSize * 2);
        ctx.beginPath();
        ctx.moveTo(0 - parallaxX, offsetY - parallaxY);
        ctx.lineTo(canvas.width - parallaxX, offsetY - parallaxY);
        ctx.stroke();
      }

      // Draw diagonal lines
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.03)';
      const diagonalSpacing = gridSize * 1.414;
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += diagonalSpacing) {
        ctx.beginPath();
        ctx.moveTo(i + parallaxX, 0 - parallaxY);
        ctx.lineTo(i + canvas.height + parallaxX, canvas.height - parallaxY);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(0, 255, 255, 0.03)';
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += diagonalSpacing) {
        ctx.beginPath();
        ctx.moveTo(i + parallaxX, canvas.height - parallaxY);
        ctx.lineTo(i - canvas.height + parallaxX, 0 - parallaxY);
        ctx.stroke();
      }

      // Draw nodes with drift and pulsing
      nodes.forEach((node) => {
        // Calculate drift using smooth sine waves at different frequencies
        const driftX = Math.sin(time * 0.08 + node.seed * 0.0001) * node.driftAmount * 0.3;
        const driftY = Math.cos(time * 0.065 + node.seed * 0.00012) * node.driftAmount * 0.3;

        const x = node.baseX + driftX + parallaxX;
        const y = node.baseY + driftY + parallaxY;

        // Regional pulsing effect - nodes pulse in waves
        const pulseTime = time * 0.5 + node.pulsePhase * 2 * Math.PI;
        const distanceFromCenter = Math.sqrt(
          Math.pow((x - canvas.width / 2) / 300, 2) +
            Math.pow((y - canvas.height / 2) / 300, 2)
        );
        const regionPulse = Math.sin(pulseTime - distanceFromCenter * 2) * 0.5 + 0.5;

        // Node color and size vary with pulse
        const baseAlpha = 0.12;
        const pulseAlpha = Math.max(baseAlpha, baseAlpha + regionPulse * 0.12);
        const size = nodeRadius + regionPulse * 0.8;

        // Primary node
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Faint secondary glow based on region
        if (regionPulse > 0.3) {
          const glowColor =
            Math.sin(time * 0.3 + node.seed * 0.0001) > 0
              ? `rgba(138, 43, 226, ${regionPulse * 0.08})`
              : `rgba(0, 255, 255, ${regionPulse * 0.08})`;
          ctx.fillStyle = glowColor;
          ctx.beginPath();
          ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw connections to nearby nodes
        nodes.forEach((otherNode) => {
          if (
            Math.sqrt(
              Math.pow(otherNode.baseX - node.baseX, 2) +
                Math.pow(otherNode.baseY - node.baseY, 2)
            ) < connectionDistance
          ) {
            const otherX = otherNode.baseX + Math.sin(time * 0.08 + otherNode.seed * 0.0001) * otherNode.driftAmount * 0.3 + parallaxX;
            const otherY = otherNode.baseY + Math.cos(time * 0.065 + otherNode.seed * 0.00012) * otherNode.driftAmount * 0.3 + parallaxY;

            const dist = Math.sqrt(Math.pow(otherX - x, 2) + Math.pow(otherY - y, 2));
            const connectionAlpha = Math.max(0.02, 0.08 * (1 - dist / connectionDistance));

            // Subtle color gradient for lines
            if (Math.sin(time * 0.2 + node.seed + otherNode.seed) > 0) {
              ctx.strokeStyle = `rgba(138, 43, 226, ${connectionAlpha * 0.6})`;
            } else {
              ctx.strokeStyle = `rgba(0, 255, 255, ${connectionAlpha * 0.6})`;
            }
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(otherX, otherY);
            ctx.stroke();
          }
        });
      });

      // Add subtle radial glow around center (focus effect)
      const centerGradient = ctx.createRadialGradient(
        canvas.width * 0.65,
        canvas.height * 0.5,
        0,
        canvas.width * 0.65,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.6
      );
      centerGradient.addColorStop(0, 'rgba(0, 255, 255, 0.06)');
      centerGradient.addColorStop(0.4, 'rgba(138, 43, 226, 0.03)');
      centerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  );
};

export default HeroBackgroundAnimation;
