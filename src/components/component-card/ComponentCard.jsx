import { useState } from "react";
import "./ComponentCard.css";
import { ComponentCardCode } from "./ComponentCardCode.jsx";
import { CoinExample } from "./CoinExample.jsx";

export function ComponentCard({
  className = "",
  showCode = false,
  code = null,
  children,
}) {
  const [codeExpanded, setCodeExpanded] = useState(false);

  return (
    <div className={`component-card-shell${className ? ` ${className}` : ""}`}>
      <div className="component-card__frame">
        <div
          className={`component-card${showCode ? "" : " component-card--preview-only"}${codeExpanded ? " component-card--code-expanded" : ""}`}
        >
          <div className="component-card__top">
            {children ?? <CoinExample />}
          </div>
          {showCode ? (
            <div
              className="component-card__code-panel code-panel code-panel-collapsible"
              data-code-collapsible
              data-code-expanded={codeExpanded ? "true" : "false"}
            >
              <div className="code-body">
                {code ?? <ComponentCardCode />}
                <div className="code-reveal-overlay">
                  <button
                    type="button"
                    className="code-toggle-button code-view-button"
                    aria-expanded={codeExpanded}
                    onClick={(event) => {
                      event.stopPropagation();
                      setCodeExpanded((expanded) => !expanded);
                    }}
                  >
                    <span>{codeExpanded ? "Hide Code" : "View Code"}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
