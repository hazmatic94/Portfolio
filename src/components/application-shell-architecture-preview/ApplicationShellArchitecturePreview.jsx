import { useEffect, useState } from "react";
import { useInViewOnce } from "../../hooks/useInViewOnce.js";
import "./ApplicationShellArchitecturePreview.css";

const ARCHITECTURE_PANEL_PATH =
  "M209.5 2 L408.5 117 Q412 119 408.5 121 L209.5 236 Q206 238 202.5 236 L3.5 121 Q0 119 3.5 117 L202.5 2 Q206 0 209.5 2 Z";

const STACK_STAGGER_MS = 1050;

const LAYERS = [
  {
    id: "design-system",
    label: "Design System",
  },
  {
    id: "shell",
    label: "Application Shell",
  },
  {
    id: "gameplay",
    label: "Gameplay",
  },
];

function PanelOutline() {
  return (
    <svg
      className="application-shell-architecture-preview__panel-outline"
      viewBox="0 0 412 238"
      width="412"
      height="238"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={ARCHITECTURE_PANEL_PATH} />
    </svg>
  );
}

export function ApplicationShellArchitecturePreview() {
  const [ref, inView] = useInViewOnce({ threshold: 0.35 });
  const [activeLabelIndex, setActiveLabelIndex] = useState(-1);
  const topLayerIndex = LAYERS.length - 1;
  const panelClip = `path("${ARCHITECTURE_PANEL_PATH}")`;

  useEffect(() => {
    if (!inView) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setActiveLabelIndex(topLayerIndex);
      return;
    }

    setActiveLabelIndex(0);

    const timers = LAYERS.slice(1).map((_, index) =>
      window.setTimeout(() => {
        setActiveLabelIndex(index + 1);
      }, (index + 1) * STACK_STAGGER_MS),
    );

    return () => timers.forEach(clearTimeout);
  }, [inView, topLayerIndex]);

  return (
    <div
      ref={ref}
      className={`application-shell-architecture-preview${inView ? " is-in-view" : ""}`}
    >
      <div className="application-shell-architecture-preview__stage">
        <div
          className="application-shell-architecture-preview__stack"
          style={{
            "--architecture-layer-count": LAYERS.length,
          }}
        >
          {LAYERS.map((layer, index) => (
            <div
              key={layer.id}
              className={`application-shell-architecture-preview__layer application-shell-architecture-preview__layer--${layer.id}`}
              style={{
                "--layer-index": index,
                "--layer-depth": topLayerIndex - index,
                clipPath: panelClip,
                WebkitClipPath: panelClip,
                zIndex: index + 1,
              }}
            >
              <div className="application-shell-architecture-preview__panel-glass">
                <div
                  className="application-shell-architecture-preview__panel-glass-center"
                  aria-hidden="true"
                />
              </div>
              <PanelOutline />
              <span
                className={`application-shell-architecture-preview__panel-label${
                  activeLabelIndex === index ? " is-active" : ""
                }`}
              >
                {layer.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
