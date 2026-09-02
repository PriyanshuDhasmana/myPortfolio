import { useCallback, useRef } from "react";

/**
 * Tiny Web Audio blips — no asset files. Gated by mute + user gesture.
 */
export function useUniverseSound(muted = true) {
  const ctxRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctxRef.current) ctxRef.current = new AC();
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq, duration = 0.06, type = "sine", gain = 0.035) => {
      if (muted) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(gain, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    },
    [muted, ensureCtx]
  );

  const playHover = useCallback(() => playTone(620, 0.045, "sine", 0.022), [playTone]);
  const playClick = useCallback(() => playTone(420, 0.07, "triangle", 0.04), [playTone]);
  const playOpen = useCallback(() => {
    playTone(380, 0.08, "sine", 0.03);
    window.setTimeout(() => playTone(560, 0.09, "sine", 0.028), 50);
  }, [playTone]);

  return { playHover, playClick, playOpen };
}
