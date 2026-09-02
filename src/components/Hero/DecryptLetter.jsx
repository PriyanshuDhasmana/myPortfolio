import { useEffect, useRef } from "react";

const SCRAMBLE_CHARSET = "!<>-_\\/[]{}—=+*^?#_01ABCDEF";

const TICK_MS = 42;
const MAX_TICKS = 9;

const randomScrambleChar = () =>
  SCRAMBLE_CHARSET[Math.floor(Math.random() * SCRAMBLE_CHARSET.length)];

/**
 * Single letter with data-decrypt hover scramble.
 * DOM updates are confined to this span only.
 */
const DecryptLetter = ({ char, scrambleEnabled = true }) => {
  const spanRef = useRef(null);
  const busyRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(
    () => () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    },
    []
  );

  if (char === " ") {
    return <span className="letter letter--space" aria-hidden="true">&nbsp;</span>;
  }

  const runDecrypt = () => {
    const el = spanRef.current;
    if (!el || busyRef.current || !scrambleEnabled) return;

    const original = el.dataset.original ?? char;
    el.dataset.original = original;
    busyRef.current = true;
    el.classList.add("is-decrypting");

    let ticks = 0;

    intervalRef.current = window.setInterval(() => {
      ticks += 1;
      el.textContent = randomScrambleChar();

      if (ticks >= MAX_TICKS) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        el.textContent = original;
        el.classList.remove("is-decrypting");
        busyRef.current = false;
      }
    }, TICK_MS);
  };

  return (
    <span
      ref={spanRef}
      className="letter"
      data-original={char}
      onMouseEnter={runDecrypt}
      onTouchStart={(e) => {
        e.preventDefault();
        runDecrypt();
      }}
      aria-hidden="true"
    >
      {char}
    </span>
  );
};

export default DecryptLetter;
