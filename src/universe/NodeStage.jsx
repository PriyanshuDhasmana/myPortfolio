import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import StageAtmosphere from "./StageAtmosphere";
import { springSoft, nodeContent } from "./universeNodes";

const OverviewPanel = lazy(() => import("./panels/OverviewPanel"));
const ProjectsPanel = lazy(() => import("./panels/ProjectsPanel"));
const ExperiencePanel = lazy(() => import("./panels/ExperiencePanel"));
const LabPanel = lazy(() => import("./panels/LabPanel"));
const NotesPanel = lazy(() => import("./panels/NotesPanel"));
const BeyondPanel = lazy(() => import("./panels/BeyondPanel"));
const ContactPanel = lazy(() => import("./panels/ContactPanel"));
const ProjectDetailPanel = lazy(() => import("./panels/ProjectDetailPanel"));

const PANEL_MAP = {
  overview: OverviewPanel,
  builds: ProjectsPanel,
  timeline: ExperiencePanel,
  lab: LabPanel,
  philosophy: NotesPanel,
  beyond: BeyondPanel,
  contact: ContactPanel,
};

/**
 * Content stage. For Projects (builds) we keep a light header —
 * moons live in the camera layer. Project detail fills the stage.
 */
export default function NodeStage({ focus, onBack, onFocus, reducedMotion }) {
  const isHome = focus === "home";
  const [activeFocus, setActiveFocus] = useState(focus === "home" ? "builds" : focus);

  useEffect(() => {
    if (focus !== "home") setActiveFocus(focus);
  }, [focus]);

  const isProject = activeFocus?.startsWith("project-");
  const isBuildsHub = activeFocus === "builds";
  const nodeId = isProject ? "builds" : activeFocus;
  const Panel = !isProject && !isBuildsHub ? PANEL_MAP[nodeId] : null;
  const BuildsList = isBuildsHub ? PANEL_MAP.builds : null;
  const meta = nodeContent[nodeId];
  const showStage = !isHome;

  return (
    <motion.div
      className={`universe-stage ${showStage && isBuildsHub && !isProject ? "universe-stage--moons" : ""}`}
      initial={false}
      animate={{
        opacity: showStage ? 1 : 0,
        y: showStage ? 0 : 20,
        scale: showStage ? 1 : 0.98,
      }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
      }
      style={{ pointerEvents: showStage ? "auto" : "none" }}
      aria-hidden={!showStage}
      role="region"
      aria-label={meta?.heading || "Node detail"}
    >
      {showStage && <StageAtmosphere mood={nodeId} />}

      <motion.div
        className="universe-stage__body"
        key={activeFocus}
        initial={reducedMotion ? false : { y: 18, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ ...springSoft, delay: reducedMotion ? 0 : 0.05 }}
      >
        {showStage && (
          <Suspense
            fallback={
              <div className="universe-panel-loading" aria-live="polite">
                Loading…
              </div>
            }
          >
            {isProject && (
              <ProjectDetailPanel
                projectId={activeFocus.replace("project-", "")}
                onBack={onBack}
              />
            )}
            {isBuildsHub && (
              <div className="builds-hub">
                <header className="u-panel__header">
                  <h2 className="u-panel__heading">{meta.heading}</h2>
                  <p className="u-panel__intro">{meta.intro}</p>
                </header>
                {BuildsList && (
                  <BuildsList
                    data={meta}
                    onOpenProject={(id) => onFocus(`project-${id}`)}
                    compact
                  />
                )}
              </div>
            )}
            {Panel && (
              <Panel
                data={meta}
                onOpenProject={(id) => onFocus(`project-${id}`)}
                onNavigate={onFocus}
              />
            )}
          </Suspense>
        )}
      </motion.div>
    </motion.div>
  );
}
