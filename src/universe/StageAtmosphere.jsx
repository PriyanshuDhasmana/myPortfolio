/**
 * Ambient space layer for subpages — floating orbs, rings, and particles
 * that echo the landing-page universe without changing layout structure.
 */
export default function StageAtmosphere({ mood = "home" }) {
  const accent =
    mood === "projects" || mood === "builds"
      ? "stage-atmosphere--projects"
      : mood === "experience" || mood === "timeline"
        ? "stage-atmosphere--experience"
        : mood === "lab"
          ? "stage-atmosphere--lab"
          : "";

  return (
    <div className={`stage-atmosphere ${accent}`} aria-hidden="true">
      <span className="stage-atmosphere__orb stage-atmosphere__orb--primary" />
      <span className="stage-atmosphere__orb stage-atmosphere__orb--secondary" />
      <span className="stage-atmosphere__ring" />
      <span className="stage-atmosphere__grid" />
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className="stage-atmosphere__particle"
          style={{ "--particle-i": i }}
        />
      ))}
    </div>
  );
}
