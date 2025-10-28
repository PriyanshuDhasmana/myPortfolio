import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const CometBackground = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent",
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 40,
            density: { enable: true, area: 800 },
          },
          color: { value: ["#8245ec", "#3b82f6", "#a855f7"] },
          move: {
            enable: true,
            direction: "top-right",
            speed: 2,
            straight: false,
            outModes: { default: "out" },
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
          trail: {
            enable: true,
            length: 6,
            fill: { color: "transparent" },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default CometBackground;
