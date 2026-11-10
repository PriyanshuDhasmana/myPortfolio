import { useRef } from "react";

/**
 * Full-bleed landing footage. A CSS scrim sits above the video so the
 * interface stays sharp without re-encoding the file.
 */
export default function LandingVideoBackground() {
  const videoRef = useRef(null);

  const keepPlaying = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  };

  return (
    <div className="landing-video-background" aria-hidden="true">
      <video
        ref={videoRef}
        className="landing-video-background__media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onEnded={keepPlaying}
        onLoadedData={keepPlaying}
      >
        <source src="/landing-background.mp4" type="video/mp4" />
      </video>
      <div className="landing-video-background__tint" />
    </div>
  );
}
