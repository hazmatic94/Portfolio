import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@joker/design-system";
import "./DesignSystemCodeRevealPanel.css";

/** Component card code panel grows ~220px in 180ms — match that pace over longer travel. */
const COMPONENT_CARD_CODE_TRAVEL_PX = 220;
const COMPONENT_CARD_CODE_DURATION_MS = 180;
const DEFAULT_SHELL_HEIGHT_PX = 400;
const FOOTER_HEIGHT_PX = 56;

function getRevealDurationMs(travelPx) {
  return Math.round(
    COMPONENT_CARD_CODE_DURATION_MS *
      (travelPx / COMPONENT_CARD_CODE_TRAVEL_PX),
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DesignSystemCodeRevealPanel({ children }) {
  const [phase, setPhase] = useState("idle");
  const phaseRef = useRef(phase);
  const shellRef = useRef(null);
  const [shellHeightPx, setShellHeightPx] = useState(DEFAULT_SHELL_HEIGHT_PX);
  const travelPx = Math.max(
    shellHeightPx - FOOTER_HEIGHT_PX,
    COMPONENT_CARD_CODE_TRAVEL_PX,
  );
  const durationMs = getRevealDurationMs(travelPx);

  phaseRef.current = phase;

  useLayoutEffect(() => {
    const shellEl = shellRef.current;
    if (!shellEl) {
      return undefined;
    }

    const syncShellHeight = () => {
      const height = shellEl.clientHeight;
      if (height > 0) {
        setShellHeightPx(height);
      }
    };

    syncShellHeight();
    const observer = new ResizeObserver(syncShellHeight);
    observer.observe(shellEl);

    return () => observer.disconnect();
  }, []);

  const handleOpen = () => {
    if (prefersReducedMotion()) {
      setPhase("open");
      return;
    }

    setPhase("opening");
  };

  const handleClose = () => {
    if (prefersReducedMotion()) {
      setPhase("idle");
      return;
    }

    setPhase("closing");
  };

  const handleVeilTransitionEnd = (event) => {
    if (event.propertyName !== "transform" || event.target !== event.currentTarget) {
      return;
    }

    if (phaseRef.current === "opening") {
      setPhase("open");
      return;
    }

    if (phaseRef.current === "closing") {
      setPhase("idle");
    }
  };

  const isOpen = phase === "open";
  const showViewCode = phase === "idle";
  const showFooter = phase === "opening" || phase === "open" || phase === "closing";

  return (
    <div
      className="ds-code-reveal-panel"
      data-phase={phase}
      style={{
        "--ds-code-reveal-duration": `${durationMs}ms`,
        "--ds-code-reveal-height": `${shellHeightPx}px`,
        "--ds-code-reveal-rest-height": `${FOOTER_HEIGHT_PX}px`,
      }}
    >
      <div ref={shellRef} className="ds-code-reveal-panel__shell">
        <div className="ds-code-reveal-panel__body code-body">
          {children}
        </div>
        <div
          className="code-reveal-overlay"
          aria-hidden={!showViewCode}
          onTransitionEnd={handleVeilTransitionEnd}
        >
          {showViewCode ? (
            <button
              type="button"
              className="code-toggle-button code-view-button"
              aria-expanded={isOpen}
              onClick={handleOpen}
            >
              <span>View Code</span>
            </button>
          ) : null}
        </div>
        {showFooter ? (
          <div
            className={`code-panel-footer ds-code-reveal-panel__footer${isOpen ? "" : " ds-code-reveal-panel__footer--dormant"}`}
          >
            <Button type="button" variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
