import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Volume2, VolumeX, Search as SearchIcon } from "lucide-react";
import UniverseBackground from "./UniverseBackground";
import Orb from "./Orb";
import OrbitField from "./OrbitField";
import ProjectMoons from "./ProjectMoons";
import NodeStage from "./NodeStage";
import SearchOverlay, { searchNodes } from "./SearchOverlay";
import Assistant, { matchAssistantIntent } from "./Assistant";
import { UniverseProvider, useUniverse } from "./UniverseContext";
import { identity, nodeContent, springSoft, springCamera } from "./universeNodes";
import { useIsMobile, useIsTouch, useReducedMotion } from "./hooks";
import { useUniverseSound } from "./useUniverseSound";
import CustomCursor from "../components/CustomCursor";

const landingMessage = "Good UX stays out of the way.";

function UniverseInner() {
  const {
    phase,
    focus,
    hovered,
    expanded,
    searchOpen,
    searchQuery,
    assistantOpen,
    parallax,
    flyTarget,
    soundMuted,
    activeMood,
    nodes,
    dispatch,
    goHome,
    focusNode,
    setHover,
    setPhase,
    setFlyTarget,
  } = useUniverse();

  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const touch = useIsTouch();
  const [compactHeader, setCompactHeader] = useState(false);
  const { playHover, playClick, playOpen } = useUniverseSound(soundMuted);

  const [pull, setPull] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [moonHover, setMoonHover] = useState(null);
  const [signalTarget, setSignalTarget] = useState(null);
  const [universeBreathing, setUniverseBreathing] = useState(false);
  const dragRef = useRef(null);
  const ignoreTypeUntil = useRef(0);
  const satPositions = useRef([]);

  const buildsNode = useMemo(() => nodes.find((n) => n.id === "builds"), [nodes]);
  const projectChildren = buildsNode?.children ?? [];
  const showMoons = focus === "builds" || focus?.startsWith("project-");

  useEffect(() => {
    const check = () => setCompactHeader(window.innerWidth <= 420);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // expose compactHeader to template

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("reveal"), reduced ? 100 : 400);
    const t2 = window.setTimeout(() => setPhase("explore"), reduced ? 400 : 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setPhase, reduced]);

  useEffect(() => {
    if (reduced || focus !== "home") {
      setSignalTarget(null);
      return undefined;
    }

    let signalEnd = 0;
    const emitSignal = () => {
      const target = nodes[Math.floor(Math.random() * nodes.length)]?.id;
      setSignalTarget(target || null);
      signalEnd = window.setTimeout(() => setSignalTarget(null), 3200);
    };
    const initialSignal = window.setTimeout(emitSignal, 12000);
    const signalTimer = window.setInterval(emitSignal, 20000);

    return () => {
      clearTimeout(initialSignal);
      clearTimeout(signalEnd);
      clearInterval(signalTimer);
    };
  }, [focus, nodes, reduced]);

  useEffect(() => {
    if (reduced || focus !== "home") {
      setUniverseBreathing(false);
      return undefined;
    }

    let breathEnd = 0;
    const breathe = () => {
      setUniverseBreathing(true);
      breathEnd = window.setTimeout(() => setUniverseBreathing(false), 1800);
    };
    const breathTimer = window.setInterval(breathe, 20000);

    return () => {
      clearTimeout(breathEnd);
      clearInterval(breathTimer);
    };
  }, [focus, reduced]);

  useEffect(() => {
    if (touch || reduced) return undefined;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      dispatch({
        type: "POINTER",
        pointer: { x: e.clientX, y: e.clientY },
        parallax: { x: x * 0.35, y: y * 0.35 },
      });
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [touch, reduced, dispatch]);

  const flyToId = useCallback(
    (id) => {
      const pos = satPositions.current.find((p) => p.id === id);
      if (pos) {
        setFlyTarget({
          x: -pos.x * 0.55,
          y: -pos.y * 0.55,
          scale: 1.28,
        });
      } else {
        setFlyTarget({ x: 0, y: mobile ? -36 : -52, scale: 1.18 });
      }
    },
    [setFlyTarget, mobile]
  );

  const handleSelect = useCallback(
    (id) => {
      playClick();
      playOpen();
      flyToId(id);
      focusNode(id, satPositions.current.find((p) => p.id === id)
        ? {
            x: -satPositions.current.find((p) => p.id === id).x * 0.55,
            y: -satPositions.current.find((p) => p.id === id).y * 0.55,
            scale: 1.28,
          }
        : { x: 0, y: mobile ? -36 : -52, scale: 1.18 });
    },
    [focusNode, playClick, playOpen, flyToId, mobile]
  );

  const handleHover = useCallback(
    (id) => {
      if (id) playHover();
      setHover(id);
    },
    [setHover, playHover]
  );

  const handleMoonSelect = useCallback(
    (projectId) => {
      playClick();
      playOpen();
      focusNode(`project-${projectId}`, {
        x: 0,
        y: mobile ? -20 : -28,
        scale: 1.35,
      });
    },
    [focusNode, playClick, playOpen, mobile]
  );

  const handleBack = useCallback(() => {
    playClick();
    if (focus.startsWith("project-")) {
      flyToId("builds");
      focusNode("builds");
    } else {
      goHome();
    }
  }, [focus, focusNode, goHome, playClick, flyToId]);

  // Search preview fly — nudge camera toward first hit while typing
  useEffect(() => {
    if (!searchQuery || focus !== "home") return;
    const { results } = searchNodes(searchQuery);
    const first = results[0];
    if (!first) return;
    const targetId = first.type === "project" ? "builds" : first.id;
    const pos = satPositions.current.find((p) => p.id === targetId);
    if (pos) {
      setFlyTarget({
        x: -pos.x * 0.35,
        y: -pos.y * 0.35,
        scale: 1.12,
      });
    }
  }, [searchQuery, focus, setFlyTarget]);

  useEffect(() => {
    if (!searchOpen && focus === "home") {
      setFlyTarget(null);
    }
  }, [searchOpen, focus, setFlyTarget]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const typingInField =
        tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable;

      if (e.key === "Escape") {
        if (searchOpen) {
          dispatch({ type: "TOGGLE_SEARCH", open: false });
          setFlyTarget(null);
          return;
        }
        if (assistantOpen) {
          dispatch({ type: "TOGGLE_ASSISTANT", open: false });
          return;
        }
        if (focus !== "home") handleBack();
        return;
      }

      if (typingInField) return;

      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        dispatch({ type: "TOGGLE_SEARCH", open: true });
        return;
      }

      if (focus === "home" && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        const ids = nodes.map((n) => n.id);
        const idx = hovered ? ids.indexOf(hovered) : -1;
        const next =
          e.key === "ArrowRight"
            ? ids[(idx + 1) % ids.length]
            : ids[(idx - 1 + ids.length) % ids.length];
        handleHover(next);
        return;
      }

      if (e.key === "Enter" && hovered && focus === "home") {
        e.preventDefault();
        handleSelect(hovered);
        return;
      }

      if (
        !searchOpen &&
        e.key.length === 1 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        e.key !== "/" &&
        Date.now() > ignoreTypeUntil.current
      ) {
        dispatch({ type: "TOGGLE_SEARCH", open: true });
        dispatch({ type: "SEARCH", query: e.key });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    searchOpen,
    assistantOpen,
    focus,
    hovered,
    nodes,
    dispatch,
    handleBack,
    handleHover,
    handleSelect,
    setFlyTarget,
  ]);

  const onPointerDownSpace = (e) => {
    if (!touch || focus !== "home") return;
    if (e.target.closest(".universe-orb, .universe-sat, .project-moon-sat, button, a, input, textarea")) {
      return;
    }
    dragRef.current = { x: e.clientX, y: e.clientY, ox: drag.x, oy: drag.y };
  };

  const onPointerMoveSpace = (e) => {
    if (!dragRef.current) return;
    setDrag({
      x: dragRef.current.ox + (e.clientX - dragRef.current.x) * 0.35,
      y: dragRef.current.oy + (e.clientY - dragRef.current.y) * 0.35,
    });
  };

  const onPointerUpSpace = () => {
    dragRef.current = null;
  };

  useEffect(() => {
    if (!touch || focus !== "home") return undefined;
    let startDist = 0;
    let startZoom = 1;
    const dist = (t) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const onStart = (e) => {
      if (e.touches.length === 2) {
        startDist = dist(e.touches);
        startZoom = zoom;
      }
    };
    const onMove = (e) => {
      if (e.touches.length === 2 && startDist) {
        e.preventDefault();
        setZoom(Math.min(1.35, Math.max(0.75, startZoom * (dist(e.touches) / startDist))));
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
    };
  }, [touch, zoom, focus]);

  useEffect(() => {
    if (!touch || focus === "home") return undefined;
    let startX = 0;
    const onStart = (e) => {
      if (e.target.closest(".universe-stage__body, input, textarea")) return;
      startX = e.touches[0].clientX;
    };
    const onEnd = (e) => {
      if (!startX) return;
      if (e.changedTouches[0].clientX - startX > 80) handleBack();
      startX = 0;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [touch, focus, handleBack]);

  const searchHits = useMemo(() => {
    if (!searchQuery) return null;
    return searchNodes(searchQuery).hits;
  }, [searchQuery]);

  const camera = useMemo(() => {
    if (flyTarget && (focus !== "home" || searchOpen)) {
      return {
        scale: flyTarget.scale ?? 1.2,
        x: (flyTarget.x ?? 0) + (focus === "home" ? drag.x * 0.2 : 0),
        y: (flyTarget.y ?? 0) + (focus === "home" ? drag.y * 0.2 : 0),
      };
    }
    if (focus === "home") {
      // Constrain camera movement so the universe cannot drift off-screen on narrow
      // devices. Compute dynamic clamps based on viewport so it adapts to many sizes.
      const vw = typeof window !== "undefined" ? Math.max(320, window.innerWidth) : 360;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const rawX = drag.x + parallax.x * 20;
      const clamp = (v, a, b) => Math.max(Math.min(v, b), a);
      const limit = Math.max(28, Math.round(vw * 0.06));
      const mobileNudge = Math.min(72, Math.round(vh * 0.1));
      return {
        scale: zoom * (expanded ? 0.88 : 1),
        x: clamp(rawX, -limit, limit),
        // On mobile, apply a larger upward offset proportional to viewport height
        y: drag.y + parallax.y * 20 - (mobile ? mobileNudge : 36),
      };
    }
    return {
      scale: 1.15,
      x: 0,
      y: mobile ? -40 : -60,
    };
  }, [focus, zoom, drag, parallax, mobile, flyTarget, searchOpen, expanded]);

  const orbSize = mobile
    ? showMoons
      ? 88
      : 112
    : focus === "home"
      ? expanded
        ? 148
        : 168
      : showMoons
        ? 96
        : 72;

  const orbitScale = expanded ? 1.28 : 1;
  const showTagline = phase !== "boot" && focus === "home" && !searchOpen;

  const focusedNodeId = focus.startsWith("project-") ? "builds" : focus;
  const focusedKicker = focus !== "home" ? nodeContent[focusedNodeId]?.kicker : null;

  const onSatPositions = useCallback((positions) => {
    satPositions.current = positions;
  }, []);

  return (
    <div
      className={`engineering-universe mood-${activeMood} ${focus !== "home" ? "is-focused" : ""} ${expanded ? "is-expanded" : ""} ${showMoons ? "is-moons" : ""} ${searchOpen ? "is-searching" : ""} ${universeBreathing ? "is-breathing" : ""}`}
      onPointerDown={onPointerDownSpace}
      onPointerMove={onPointerMoveSpace}
      onPointerUp={onPointerUpSpace}
      onPointerCancel={onPointerUpSpace}
    >
      <UniverseBackground
        parallax={parallax}
        mood={activeMood === "home" ? "home" : activeMood}
      />
      {!touch && <CustomCursor />}

      <a href="#universe-main" className="sr-only skip-link">
        Skip to universe
      </a>

      <header className={`universe-chrome ${focus !== "home" ? "universe-chrome--focused" : ""}`}>
        {focus !== "home" ? (
          <div className="universe-chrome__nav">
            <button type="button" className="universe-back" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Return</span>
            </button>
            {focusedKicker && (
              <p className="universe-chrome__kicker">{focusedKicker}</p>
            )}
          </div>
        ) : (
          <div className="universe-brand">
            <span className="universe-brand__mark">{identity.short}</span>
            <span className="universe-brand__name">{identity.name}</span>
          </div>
        )}
        <div className="universe-chrome__actions">
          {compactHeader ? (
            <>
              <button
                type="button"
                className="universe-chip universe-chip--icon"
                onClick={() => dispatch({ type: "TOGGLE_SOUND" })}
                aria-label={soundMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {soundMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                className="universe-chip universe-chip--icon"
                onClick={() => dispatch({ type: "TOGGLE_SEARCH", open: true })}
                aria-label="Search nodes"
              >
                <SearchIcon className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="universe-chip"
                onClick={() => dispatch({ type: "TOGGLE_SOUND" })}
                aria-label={soundMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {soundMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                className="universe-chip"
                onClick={() => dispatch({ type: "TOGGLE_SEARCH", open: true })}
                aria-label="Search nodes"
              >
                Search
                <kbd>/</kbd>
              </button>
              {focus !== "home" && (
                <button type="button" className="universe-chip" onClick={goHome}>
                  Home
                </button>
              )}
            </>
          )}
        </div>
      </header>

      <SearchOverlay
        open={searchOpen}
        query={searchQuery}
        onQuery={(q) => dispatch({ type: "SEARCH", query: q })}
        onClose={() => {
          dispatch({ type: "TOGGLE_SEARCH", open: false });
          if (focus === "home") setFlyTarget(null);
        }}
        onSelect={(id) => {
          ignoreTypeUntil.current = Date.now() + 400;
          playOpen();
          const target = id.startsWith("project-") ? "builds" : id;
          const pos = satPositions.current.find((p) => p.id === target);
          const fly = pos
            ? { x: -pos.x * 0.55, y: -pos.y * 0.55, scale: 1.28 }
            : { x: 0, y: -48, scale: 1.2 };
          focusNode(id, fly);
        }}
      />

      <main id="universe-main" className="universe-viewport">
        <motion.div
          className="universe-camera"
          animate={{
            scale: reduced ? 1 : camera.scale,
            x: reduced ? 0 : camera.x,
            y: reduced ? 0 : camera.y,
          }}
          transition={reduced ? { duration: 0 } : springCamera}
          style={{
            transformStyle: "preserve-3d",
            filter:
              focus === "home" || showMoons
                ? "blur(0px)"
                : "blur(6px)",
            transition: "filter 0.5s ease",
          }}
        >
          <OrbitField
            nodes={nodes}
            phase={phase}
            focus={focus}
            hovered={hovered}
            expanded={expanded}
            searchHits={searchHits}
            parallax={parallax}
            onHover={handleHover}
            onSelect={handleSelect}
            onPull={setPull}
            onPositions={onSatPositions}
            orbitScale={orbitScale * (universeBreathing ? 1.02 : 1)}
            signalTarget={signalTarget}
          />

          <ProjectMoons
            moons={projectChildren}
            visible={showMoons && !focus.startsWith("project-")}
            hovered={moonHover}
            onHover={setMoonHover}
            onSelect={handleMoonSelect}
            connectionFromOrb
          />

          <div className="universe-orb-anchor">
            <Orb
              mood={activeMood === "home" ? "home" : activeMood}
              phase={phase}
              pull={focus === "home" ? pull : { x: 0, y: 0 }}
              size={orbSize}
              isTouch={touch}
              onHoldComplete={() => {
                playOpen();
                dispatch({ type: "EXPAND", value: true });
              }}
              onDoubleClick={goHome}
              onLongPress={goHome}
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {showTagline && (
            <motion.div
              className="universe-tagline"
              initial={{ opacity: 0, x: "-50%", y: 12 }}
              animate={{
                opacity: phase === "reveal" || phase === "explore" ? 1 : 0,
                x: "-50%",
                y: 0,
              }}
              exit={{ opacity: 0, x: "-50%", y: -8 }}
              transition={springSoft}
            >
              <h1>{landingMessage}</h1>
              {phase === "explore" && (
                <motion.span
                  className="universe-explore-cue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="universe-explore-cue__action">
                    <i aria-hidden="true" />
                    {mobile ? "Tap any satellite to explore" : "Click any satellite to explore"}
                  </span>
                  <span className="universe-explore-cue__detail">
                    {mobile
                      ? "Drag to explore the orbit · Pinch to zoom"
                      : "Hover a satellite for a preview · Press / to search"}
                  </span>
                  {/*
                  {mobile
                    ? "Tap a node · Swipe to return · Long-press Orb for home"
                    : "Hover satellites · Click to enter · Hold Orb to expand · Type to search"}
                  */}
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <NodeStage
          focus={focus}
          onBack={handleBack}
          onFocus={(id) => {
            playOpen();
            focusNode(id);
          }}
          reducedMotion={reduced}
        />
      </main>

      <Assistant
        open={assistantOpen}
        onToggle={(open) =>
          dispatch({
            type: "TOGGLE_ASSISTANT",
            open: typeof open === "boolean" ? open : undefined,
          })
        }
        onNavigate={(id) => {
          const intent = matchAssistantIntent(id) || id;
          playOpen();
          handleSelect(intent);
        }}
      />

      <div className="universe-sr-status" role="status" aria-live="polite">
        {focus === "home"
          ? expanded
            ? "Universe expanded. All nodes visible."
            : "Exploring the engineering universe home."
          : `Viewing ${focus.replace("project-", "project ")}.`}
      </div>
    </div>
  );
}

export default function EngineeringUniverse() {
  return (
    <UniverseProvider>
      <UniverseInner />
    </UniverseProvider>
  );
}
