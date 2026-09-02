import { createContext, useContext, useMemo, useReducer, useCallback } from "react";
import { universeNodes } from "./universeNodes";

const UniverseContext = createContext(null);

const initialState = {
  phase: "boot", // boot | reveal | explore
  focus: "home", // home | nodeId | project-*
  hovered: null,
  searchQuery: "",
  searchOpen: false,
  expanded: false,
  pointer: { x: 0, y: 0 },
  parallax: { x: 0, y: 0 },
  soundMuted: true,
  assistantOpen: false,
  flyTarget: null, // { x, y, scale } for spatial camera
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PHASE":
      return { ...state, phase: action.phase };
    case "FOCUS":
      return {
        ...state,
        focus: action.focus,
        hovered: null,
        searchOpen: false,
        assistantOpen: false,
        flyTarget: action.flyTarget ?? state.flyTarget,
      };
    case "FLY":
      return { ...state, flyTarget: action.flyTarget };
    case "HOVER":
      return { ...state, hovered: action.id };
    case "POINTER":
      return {
        ...state,
        pointer: action.pointer,
        parallax: action.parallax ?? state.parallax,
      };
    case "SEARCH":
      return {
        ...state,
        searchQuery: action.query,
        searchOpen: true,
      };
    case "TOGGLE_SEARCH":
      return {
        ...state,
        searchOpen: action.open ?? !state.searchOpen,
        searchQuery: action.open === false ? "" : state.searchQuery,
      };
    case "EXPAND":
      return { ...state, expanded: action.value ?? !state.expanded };
    case "TOGGLE_SOUND":
      return { ...state, soundMuted: !state.soundMuted };
    case "TOGGLE_ASSISTANT":
      return { ...state, assistantOpen: action.open ?? !state.assistantOpen };
    case "HOME":
      return {
        ...state,
        focus: "home",
        hovered: null,
        expanded: false,
        searchOpen: false,
        assistantOpen: false,
        flyTarget: null,
      };
    default:
      return state;
  }
}

export function UniverseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const goHome = useCallback(() => dispatch({ type: "HOME" }), []);
  const focusNode = useCallback(
    (id, flyTarget = null) => dispatch({ type: "FOCUS", focus: id, flyTarget }),
    []
  );
  const setHover = useCallback((id) => dispatch({ type: "HOVER", id }), []);
  const setPhase = useCallback((phase) => dispatch({ type: "SET_PHASE", phase }), []);
  const setFlyTarget = useCallback(
    (flyTarget) => dispatch({ type: "FLY", flyTarget }),
    []
  );

  const activeMood = useMemo(() => {
    if (state.focus === "home") return "home";
    const nodeId = state.focus.startsWith("project-") ? "builds" : state.focus;
    return universeNodes.find((n) => n.id === nodeId)?.mood ?? "home";
  }, [state.focus]);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
      goHome,
      focusNode,
      setHover,
      setPhase,
      setFlyTarget,
      activeMood,
      nodes: universeNodes,
    }),
    [state, goHome, focusNode, setHover, setPhase, setFlyTarget, activeMood]
  );

  return <UniverseContext.Provider value={value}>{children}</UniverseContext.Provider>;
}

export function useUniverse() {
  const ctx = useContext(UniverseContext);
  if (!ctx) throw new Error("useUniverse must be used within UniverseProvider");
  return ctx;
}
