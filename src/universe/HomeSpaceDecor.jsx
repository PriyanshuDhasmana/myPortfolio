import { useReducedMotion } from "./hooks";

/** Lightweight, decorative SVGs for the landing scene. They stay outside the
 * interactive orbit and use transform-only animation so they do not compete
 * with the canvas or the page's controls. */
export default function HomeSpaceDecor() {
  const reduced = useReducedMotion();

  return (
    <div
      className={`home-space-decor ${reduced ? "home-space-decor--still" : ""}`}
      aria-hidden="true"
    >
      <div className="home-space-decor__ufo">
        <p className="home-space-decor__ufo-message">
          Hey, help me leave back to my planet
        </p>
        <span className="home-space-decor__ufo-beam" />
        <svg viewBox="0 0 260 180" role="presentation">
          <defs>
            <linearGradient id="ufo-metal" x1="0" x2="0" y2="1">
              <stop stopColor="#d7f7ff" /><stop offset="0.45" stopColor="#63b8da" /><stop offset="1" stopColor="#17345d" />
            </linearGradient>
            <radialGradient id="ufo-dome" cx="38%" cy="26%">
              <stop stopColor="#d9fff4" /><stop offset="0.42" stopColor="#79d9af" /><stop offset="1" stopColor="#164e63" />
            </radialGradient>
          </defs>
          <ellipse cx="130" cy="137" rx="80" ry="23" fill="#020617" opacity="0.55" />
          <path d="M57 113c14-26 46-39 73-39s60 13 73 39c-18 21-48 31-73 31s-56-10-73-31z" fill="url(#ufo-metal)" stroke="#bdefff" strokeOpacity="0.72" strokeWidth="2" />
          <path d="M83 92c5-35 29-55 47-55s42 20 47 55c-13 11-34 16-47 16S96 103 83 92z" fill="url(#ufo-dome)" stroke="#bbf7d0" strokeOpacity="0.7" strokeWidth="2" />
          <g className="home-space-decor__alien" fill="#9decae" stroke="#164e63" strokeWidth="2">
            <ellipse cx="130" cy="69" rx="18" ry="23" />
            <path d="M116 84c2 12 7 19 14 19s12-7 14-19" fill="#67c984" />
            <ellipse cx="123" cy="66" rx="4.3" ry="6.5" fill="#061426" /><ellipse cx="137" cy="66" rx="4.3" ry="6.5" fill="#061426" />
          </g>
          <g fill="#a5f3fc"><circle cx="82" cy="119" r="4" /><circle cx="130" cy="127" r="4" /><circle cx="178" cy="119" r="4" /></g>
        </svg>
      </div>
    </div>
  );
}
