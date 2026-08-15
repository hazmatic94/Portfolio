import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@joker/design-system";
import "./DesignSystemCodeRevealPanel.css";

/** Component card code panel grows ~220px in 180ms — match that pace over longer travel. */
const COMPONENT_CARD_CODE_TRAVEL_PX = 220;
const COMPONENT_CARD_CODE_DURATION_MS = 180;
const DEFAULT_SHELL_HEIGHT_PX = 400;
const FOOTER_HEIGHT_PX = 56;
const IDLE_BUTTON_ANCHOR = 0.5;
const FILL_BLEND_START = 0.78;

function getRevealDurationMs(travelPx) {
  return Math.round(
    COMPONENT_CARD_CODE_DURATION_MS *
      (travelPx / COMPONENT_CARD_CODE_TRAVEL_PX),
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3;
}

function getButtonAnchor(progress) {
  if (progress <= 0) {
    return IDLE_BUTTON_ANCHOR;
  }

  if (progress >= 1) {
    return 1;
  }

  const trackStart = 0.12;
  if (progress < trackStart) {
    return IDLE_BUTTON_ANCHOR;
  }

  const trackProgress = (progress - trackStart) / (1 - trackStart);
  return IDLE_BUTTON_ANCHOR + trackProgress * (1 - IDLE_BUTTON_ANCHOR);
}

function getFillBlend(progress) {
  if (progress <= FILL_BLEND_START) {
    return 0;
  }

  return (progress - FILL_BLEND_START) / (1 - FILL_BLEND_START);
}

function getCtaAnchorPercent(progress, fillBlend, shellHeight) {
  const travelAnchor = getButtonAnchor(progress);
  const travelPx = travelAnchor * shellHeight;
  const footerCenterPx = shellHeight - FOOTER_HEIGHT_PX / 2;
  const blendedPx = travelPx + fillBlend * (footerCenterPx - travelPx);

  return (blendedPx / shellHeight) * 100;
}

function getCollapsedBodyHeight(shellHeight) {
  return Math.max(shellHeight - FOOTER_HEIGHT_PX, 220);
}

export function DesignSystemCodeRevealPanel({ children }) {
  const [phase, setPhase] = useState("idle");
  const phaseRef = useRef(phase);
  const panelRef = useRef(null);
  const shellRef = useRef(null);
  const progressRef = useRef(0);
  const shellHeightRef = useRef(DEFAULT_SHELL_HEIGHT_PX);
  const animationFrameRef = useRef(0);
  const prevPhaseRef = useRef("idle");
  const [durationMs, setDurationMs] = useState(
    getRevealDurationMs(DEFAULT_SHELL_HEIGHT_PX - FOOTER_HEIGHT_PX),
  );

  phaseRef.current = phase;

  const setPanelMotionVars = useCallback((progress, shellHeight) => {
    const panelEl = panelRef.current;
    if (!panelEl) {
      return;
    }

    const fillBlend = getFillBlend(progress);
    const collapsedHeight = getCollapsedBodyHeight(shellHeight);
    const expandedHeight = Math.max(shellHeight - FOOTER_HEIGHT_PX, collapsedHeight);
    const bodyHeight =
      collapsedHeight + progress * (expandedHeight - collapsedHeight);

    panelEl.style.setProperty("--reveal-progress", String(progress));
    panelEl.style.setProperty("--cta-blend", String(fillBlend));
    panelEl.style.setProperty(
      "--cta-anchor",
      `${getCtaAnchorPercent(progress, fillBlend, shellHeight)}%`,
    );
    panelEl.style.setProperty("--body-reveal-height", `${bodyHeight}px`);
    panelEl.style.setProperty("--body-reveal-opacity", "1");
    panelEl.style.setProperty("--veil-opacity", String(1 - fillBlend));
    panelEl.style.setProperty("--footer-fill-opacity", String(fillBlend));
  }, []);

  const syncDurationForShell = useCallback((shellHeight) => {
    const travelPx = Math.max(
      shellHeight - FOOTER_HEIGHT_PX,
      COMPONENT_CARD_CODE_TRAVEL_PX,
    );
    setDurationMs(getRevealDurationMs(travelPx));
  }, []);

  const settleAtProgress = useCallback(
    (progress) => {
      progressRef.current = progress;
      const shellHeight = shellRef.current?.clientHeight || shellHeightRef.current;
      setPanelMotionVars(progress, shellHeight);
      setPhase(progress <= 0 ? "idle" : "open");
    },
    [setPanelMotionVars],
  );

  const runRevealAnimation = useCallback(
    (opening) => {
      const shellEl = shellRef.current;
      if (!shellEl) {
        settleAtProgress(opening ? 1 : 0);
        return;
      }

      const shellHeight = shellEl.clientHeight || shellHeightRef.current;
      shellHeightRef.current = shellHeight;
      syncDurationForShell(shellHeight);

      const from = progressRef.current;
      const to = opening ? 1 : 0;
      const travelPx = Math.max(
        shellHeight - FOOTER_HEIGHT_PX,
        COMPONENT_CARD_CODE_TRAVEL_PX,
      );
      const animationDurationMs = getRevealDurationMs(travelPx);
      const startTime = performance.now();

      setPanelMotionVars(from, shellHeight);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const tick = (now) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / animationDurationMs);
        const eased = easeOutCubic(rawProgress);
        const progress = from + (to - from) * eased;

        progressRef.current = progress;
        setPanelMotionVars(progress, shellHeight);

        if (rawProgress < 1) {
          animationFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        animationFrameRef.current = 0;
        settleAtProgress(to);
      };

      animationFrameRef.current = requestAnimationFrame(tick);
    },
    [setPanelMotionVars, settleAtProgress, syncDurationForShell],
  );

  useLayoutEffect(() => {
    const panelEl = panelRef.current;
    const shellEl = shellRef.current;
    if (!panelEl || !shellEl) {
      return undefined;
    }

    panelEl.style.setProperty(
      "--ds-code-reveal-rest-height",
      `${FOOTER_HEIGHT_PX}px`,
    );

    const syncShellHeight = () => {
      const height = shellEl.clientHeight;
      if (height <= 0) {
        return;
      }

      shellHeightRef.current = height;

      const currentPhase = phaseRef.current;
      if (currentPhase === "idle" || currentPhase === "open") {
        syncDurationForShell(height);
        setPanelMotionVars(progressRef.current, height);
      }
    };

    syncShellHeight();
    const observer = new ResizeObserver(syncShellHeight);
    observer.observe(shellEl);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [setPanelMotionVars, syncDurationForShell]);

  useLayoutEffect(() => {
    panelRef.current?.style.setProperty(
      "--ds-code-reveal-duration",
      `${durationMs}ms`,
    );
  }, [durationMs]);

  useLayoutEffect(() => {
    const prevPhase = prevPhaseRef.current;
    prevPhaseRef.current = phase;

    if (phase === "opening" && prevPhase !== "opening") {
      runRevealAnimation(true);
      return;
    }

    if (phase === "closing" && prevPhase !== "closing") {
      runRevealAnimation(false);
    }
  }, [phase, runRevealAnimation]);

  const handleOpen = () => {
    if (phaseRef.current !== "idle") {
      return;
    }

    if (prefersReducedMotion()) {
      settleAtProgress(1);
      return;
    }

    setPhase("opening");
  };

  const handleClose = () => {
    if (phaseRef.current !== "open") {
      return;
    }

    if (prefersReducedMotion()) {
      settleAtProgress(0);
      return;
    }

    setPhase("closing");
  };

  const isOpen = phase === "open";

  return (
    <div
      ref={panelRef}
      className="ds-code-reveal-panel"
      data-phase={phase}
    >
      <div ref={shellRef} className="ds-code-reveal-panel__shell">
        <div className="ds-code-reveal-panel__body code-body">
          {children}
        </div>
        <div className="code-reveal-veil" aria-hidden="true" />
        <div className="code-reveal-cta">
          <button
            type="button"
            className="code-toggle-button code-view-button"
            aria-expanded={isOpen}
            aria-hidden={isOpen}
            tabIndex={isOpen ? -1 : 0}
            onClick={handleOpen}
          >
            <span>View Code</span>
          </button>
        </div>
        {phase !== "idle" ? (
          <div className="code-panel-footer ds-code-reveal-panel__footer">
            <Button
              type="button"
              variant="ghost"
              aria-hidden={!isOpen}
              tabIndex={isOpen ? 0 : -1}
              onClick={(event) => {
                event.stopPropagation();
                handleClose();
              }}
            >
              Close
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
