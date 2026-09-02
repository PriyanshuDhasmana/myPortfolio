import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { springSoft } from "./universeNodes";

const COMMANDS = [
  {
    label: "Show AI projects",
    action: "lab",
    match: /ai|agent|lab|automation/i,
  },
  {
    label: "Show frontend work",
    action: "builds",
    match: /front|react|ui|interface|project/i,
  },
  {
    label: "Explain architecture",
    action: "overview",
    match: /arch|overview|how you work|system/i,
  },
  {
    label: "Take me to Experience",
    action: "timeline",
    match: /experience|career|caterpillar|work history/i,
  },
  {
    label: "Open Contact",
    action: "contact",
    match: /contact|hire|email|talk/i,
  },
];

export function matchAssistantIntent(text) {
  const hit = COMMANDS.find((c) => c.match.test(text));
  return hit?.action ?? null;
}

export default function Assistant({ open, onToggle, onNavigate }) {
  const suggestions = useMemo(() => COMMANDS, []);
  const [query, setQuery] = useState("");
  const [miss, setMiss] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const intent = matchAssistantIntent(query);
    if (intent) {
      setMiss(false);
      onNavigate(intent);
      onToggle(false);
      setQuery("");
      return;
    }
    setMiss(true);
  };

  return (
    <>
      <button
        type="button"
        className="universe-assistant-fab"
        onClick={() => onToggle()}
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            className="universe-assistant"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={springSoft}
            aria-label="Universe navigator"
          >
            <p className="universe-assistant__title">Navigator</p>
            <p className="universe-assistant__hint">
              Ask to move through the universe — routes, not a chatbot.
            </p>
            <form className="universe-assistant__form" onSubmit={submit}>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setMiss(false);
                }}
                placeholder="Show frontend work…"
                aria-label="Navigator command"
              />
            </form>
            {miss && (
              <p className="universe-assistant__miss">No route matched — try a suggestion.</p>
            )}
            <ul>
              {suggestions.map((cmd) => (
                <li key={cmd.label}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(cmd.action);
                      onToggle(false);
                    }}
                  >
                    {cmd.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
