import { Button } from "@joker/design-system";
import "./ComponentCard.css";
import { ComponentCardCode } from "./ComponentCardCode.jsx";
import { CoinExample } from "./CoinExample.jsx";

export function ComponentCard({ className = "", showCode = false, children }) {
  return (
    <div className={`component-card-shell${className ? ` ${className}` : ""}`}>
      <div className="component-card__frame">
        <div
          className={`component-card${showCode ? "" : " component-card--preview-only"}`}
        >
          <div className="component-card__top">
            {children ?? <CoinExample />}
          </div>
          {showCode ? (
            <div className="component-card__bottom">
              <div className="component-card__bottom-inner">
                <ComponentCardCode />
              </div>
              <div className="component-card__bottom-overlay">
                <Button
                  variant="secondary"
                  className="component-card__view-code"
                >
                  View Code
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
