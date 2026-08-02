import { useEffect, useRef, useState } from "react";
import "./ApplicationShellBlueprintPreview.css";

const BLUEPRINT_SHELL_WIDTH_LABEL = "1200px";
const BLUEPRINT_RAIL_HEIGHT_LABEL = "52px";
const BLUEPRINT_BODY_HEIGHT_LABEL = "784px";
const BLUEPRINT_GAME_VIEW_WIDTH_LABEL = "874px";
const BLUEPRINT_BETTING_PANEL_WIDTH_LABEL = "360px";

function formatDimension(value) {
  return `${Math.round(value)}px`;
}

function BlueprintWidthAnnotation({ value, className = "", style }) {
  return (
    <div
      className={`application-shell-blueprint-preview__annotation application-shell-blueprint-preview__annotation--width${className ? ` ${className}` : ""}`}
      style={style}
    >
      <span className="application-shell-blueprint-preview__annotation-side">
        <span
          className="application-shell-blueprint-preview__annotation-arrow application-shell-blueprint-preview__annotation-arrow--left"
          aria-hidden="true"
        />
        <span className="application-shell-blueprint-preview__annotation-line application-shell-blueprint-preview__annotation-line--horizontal" />
      </span>
      <span className="application-shell-blueprint-preview__annotation-label">
        {value}
      </span>
      <span className="application-shell-blueprint-preview__annotation-side application-shell-blueprint-preview__annotation-side--end">
        <span className="application-shell-blueprint-preview__annotation-line application-shell-blueprint-preview__annotation-line--horizontal" />
        <span
          className="application-shell-blueprint-preview__annotation-arrow application-shell-blueprint-preview__annotation-arrow--right"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}

function BlueprintHeightAnnotation({
  value,
  className = "",
  style,
  hideArrows = false,
}) {
  return (
    <div
      className={`application-shell-blueprint-preview__annotation application-shell-blueprint-preview__annotation--height${className ? ` ${className}` : ""}`}
      style={style}
    >
      <span className="application-shell-blueprint-preview__annotation-side application-shell-blueprint-preview__annotation-side--vertical">
        {!hideArrows ? (
          <span
            className="application-shell-blueprint-preview__annotation-arrow application-shell-blueprint-preview__annotation-arrow--top"
            aria-hidden="true"
          />
        ) : null}
        <span className="application-shell-blueprint-preview__annotation-line application-shell-blueprint-preview__annotation-line--vertical" />
      </span>
      <span className="application-shell-blueprint-preview__annotation-label">
        {value}
      </span>
      <span className="application-shell-blueprint-preview__annotation-side application-shell-blueprint-preview__annotation-side--vertical application-shell-blueprint-preview__annotation-side--end">
        <span className="application-shell-blueprint-preview__annotation-line application-shell-blueprint-preview__annotation-line--vertical" />
        {!hideArrows ? (
          <span
            className="application-shell-blueprint-preview__annotation-arrow application-shell-blueprint-preview__annotation-arrow--bottom"
            aria-hidden="true"
          />
        ) : null}
      </span>
    </div>
  );
}

export function ApplicationShellBlueprintPreview() {
  const previewRef = useRef(null);
  const shellRef = useRef(null);
  const sidebarRef = useRef(null);
  const mainRef = useRef(null);
  const bodyRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    shellWidth: 0,
    sidebarWidth: 0,
    mainWidth: 0,
    bodyHeight: 0,
    bodyTop: 0,
  });

  useEffect(() => {
    const preview = previewRef.current;
    const shell = shellRef.current;
    const sidebar = sidebarRef.current;
    const main = mainRef.current;
    const body = bodyRef.current;

    if (!preview || !shell || !sidebar || !main || !body) {
      return undefined;
    }

    const measure = () => {
      const previewRect = preview.getBoundingClientRect();
      const shellRect = shell.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      const mainRect = main.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();

      setDimensions({
        shellWidth: shellRect.width,
        sidebarWidth: sidebarRect.width,
        mainWidth: mainRect.width,
        bodyHeight: bodyRect.height,
        bodyTop: bodyRect.top - previewRect.top,
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(preview);
    resizeObserver.observe(shell);
    resizeObserver.observe(sidebar);
    resizeObserver.observe(main);
    resizeObserver.observe(body);

    return () => resizeObserver.disconnect();
  }, []);

  const { shellWidth, sidebarWidth, mainWidth, bodyHeight, bodyTop } =
    dimensions;
  const hasDimensions = shellWidth > 0;

  return (
    <div
      ref={previewRef}
      className="application-shell-blueprint-preview"
      aria-hidden="true"
    >
      <div className="application-shell-blueprint-preview__figure">
        <div
          ref={shellRef}
          className="application-shell-blueprint-preview__shell"
        >
          <div className="application-shell-blueprint-preview__bar application-shell-blueprint-preview__bar--top application-shell-blueprint-preview__zone">
            <BlueprintHeightAnnotation
              value={BLUEPRINT_RAIL_HEIGHT_LABEL}
              className="application-shell-blueprint-preview__annotation--bar-height"
              hideArrows
            />
            <span className="application-shell-blueprint-preview__zone-label">
              Game Rail
            </span>
          </div>

          <div
            ref={bodyRef}
            className="application-shell-blueprint-preview__body"
          >
            <div
              ref={sidebarRef}
              className="application-shell-blueprint-preview__panel application-shell-blueprint-preview__panel--sidebar application-shell-blueprint-preview__zone"
            >
              <span className="application-shell-blueprint-preview__zone-label">
                Betting Panel
              </span>
              {hasDimensions ? (
                <BlueprintWidthAnnotation
                  value={BLUEPRINT_BETTING_PANEL_WIDTH_LABEL}
                  className="application-shell-blueprint-preview__annotation--panel"
                />
              ) : null}
            </div>
            <div
              ref={mainRef}
              className="application-shell-blueprint-preview__panel application-shell-blueprint-preview__panel--main application-shell-blueprint-preview__zone"
            >
              <span className="application-shell-blueprint-preview__zone-label">
                Game View
              </span>
              {hasDimensions ? (
                <BlueprintWidthAnnotation
                  value={BLUEPRINT_GAME_VIEW_WIDTH_LABEL}
                  className="application-shell-blueprint-preview__annotation--panel"
                />
              ) : null}
            </div>
          </div>

          <div className="application-shell-blueprint-preview__bar application-shell-blueprint-preview__bar--bottom application-shell-blueprint-preview__zone">
            <BlueprintHeightAnnotation
              value={BLUEPRINT_RAIL_HEIGHT_LABEL}
              className="application-shell-blueprint-preview__annotation--bar-height"
              hideArrows
            />
            <span className="application-shell-blueprint-preview__zone-label">
              Game Footer
            </span>
          </div>
        </div>
      </div>

      {hasDimensions ? (
        <>
          <BlueprintWidthAnnotation
            value={BLUEPRINT_SHELL_WIDTH_LABEL}
            className="application-shell-blueprint-preview__annotation--top"
            style={{ width: shellWidth }}
          />
          <BlueprintHeightAnnotation
            value={BLUEPRINT_BODY_HEIGHT_LABEL}
            className="application-shell-blueprint-preview__annotation--body-height"
            style={{
              top: bodyTop,
              left: shellWidth,
              height: bodyHeight,
            }}
          />
        </>
      ) : null}
    </div>
  );
}
