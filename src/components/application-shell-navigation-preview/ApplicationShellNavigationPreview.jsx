import { useRef, useState } from "react";
import { HiLoBettingPanelPreview } from "../hilo-betting-panel-preview/HiLoBettingPanelPreview.jsx";
import "./ApplicationShellNavigationPreview.css";

const PANEL_MIN = 280;
const PANEL_MAX = 360;
const PANEL_DEFAULT = 360;

function formatDimension(value) {
  return `${Math.round(value)}px`;
}

function clampPanelWidth(value) {
  return Math.min(PANEL_MAX, Math.max(PANEL_MIN, Math.round(value)));
}

function PanelResizeTab({
  panelWidth,
  onResizeStart,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}) {
  return (
    <button
      type="button"
      className="application-shell-navigation-preview__resize-tab"
      aria-label="Resize betting panel"
      aria-valuemin={PANEL_MIN}
      aria-valuemax={PANEL_MAX}
      aria-valuenow={panelWidth}
      onPointerDown={onResizeStart}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <svg
        className="application-shell-navigation-preview__resize-tab-icon"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12.5 15L7.5 10L12.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="application-shell-navigation-preview__resize-tab-icon"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function PanelWidthAnnotation({ value }) {
  return (
    <div
      className="application-shell-navigation-preview__width-annotation"
      aria-hidden="true"
    >
      <span className="application-shell-navigation-preview__width-annotation-side">
        <span
          className="application-shell-navigation-preview__width-annotation-arrow application-shell-navigation-preview__width-annotation-arrow--left"
          aria-hidden="true"
        />
        <span className="application-shell-navigation-preview__width-annotation-line" />
      </span>
      <span className="application-shell-navigation-preview__width-annotation-label">
        {value}
      </span>
      <span className="application-shell-navigation-preview__width-annotation-side application-shell-navigation-preview__width-annotation-side--end">
        <span className="application-shell-navigation-preview__width-annotation-line" />
        <span
          className="application-shell-navigation-preview__width-annotation-arrow application-shell-navigation-preview__width-annotation-arrow--right"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}

export function ApplicationShellNavigationPreview() {
  const [panelWidth, setPanelWidth] = useState(PANEL_DEFAULT);
  const [isResizing, setIsResizing] = useState(false);
  const dragStateRef = useRef(null);

  const handleResizeStart = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startWidth: panelWidth,
    };
    setIsResizing(true);
  };

  const handleResizeMove = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    setPanelWidth(clampPanelWidth(dragState.startWidth + deltaX));
  };

  const handleResizeEnd = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setIsResizing(false);
  };

  return (
    <div
      className={`application-shell-navigation-preview${isResizing ? " application-shell-navigation-preview--resizing" : ""}`}
      style={{ "--navigation-betting-panel-width": `${panelWidth}px` }}
    >
      <div className="application-shell-navigation-preview__betting-column">
        <div className="application-shell-navigation-preview__betting-panel">
          <HiLoBettingPanelPreview disabled />
        </div>
        <PanelResizeTab
          panelWidth={panelWidth}
          onResizeStart={handleResizeStart}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
          onPointerCancel={handleResizeEnd}
        />
        <PanelWidthAnnotation value={formatDimension(panelWidth)} />
      </div>
    </div>
  );
}
