import { useId, useState } from "react";
import { CaseStudySplitFrames } from "../case-study-split-frames/CaseStudySplitFrames.jsx";
import { SportsbookMobileHomePreview } from "../sportsbook-mobile-home-preview/SportsbookMobileHomePreview.jsx";
import { SportsbookUpcomingMatchesPreview } from "../sportsbook-upcoming-matches-preview/SportsbookUpcomingMatchesPreview.jsx";
import {
  SPORTSBOOK_EXPANSION_SPORTS,
  SPORTSBOOK_EXPANSION_TABS,
} from "../../data/sportsbookExpansionSports.js";
import "./SportsbookExpansionPreview.css";

function SportsbookExpansionTabBar({
  baseId,
  activeKey,
  onChange,
  panelId,
  className = "",
}) {
  return (
    <div
      className={`sportsbook-expansion-preview__tabs${className ? ` ${className}` : ""}`}
      role="tablist"
      aria-label="Sportsbook experiences"
    >
      {SPORTSBOOK_EXPANSION_TABS.map((tab) => {
        const selected = tab.key === activeKey;
        const tabId = `${baseId}-${tab.key}`;

        return (
          <div key={tab.key} className="sportsbook-expansion-preview__tab">
            <button
              type="button"
              role="tab"
              id={tabId}
              className="sportsbook-expansion-preview__tab-button"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.key)}
            >
              <span className="sportsbook-expansion-preview__tab-label">
                {tab.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function SportsbookExpansionPreview() {
  const baseId = useId();
  const [activeKey, setActiveKey] = useState(SPORTSBOOK_EXPANSION_TABS[0].key);
  const panelId = `${baseId}-panel`;
  const activeSport =
    SPORTSBOOK_EXPANSION_SPORTS[activeKey] ?? SPORTSBOOK_EXPANSION_SPORTS.soccer;

  return (
    <div className="sportsbook-expansion-preview">
      <SportsbookExpansionTabBar
        baseId={baseId}
        activeKey={activeKey}
        onChange={setActiveKey}
        panelId={panelId}
      />

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-${activeKey}`}
        aria-live="polite"
        className="sportsbook-expansion-preview__panel"
      >
        <CaseStudySplitFrames
          left={
            <SportsbookMobileHomePreview
              key={activeKey}
              game={activeSport.game}
              liveMatch={activeSport.liveMatch}
            />
          }
          right={
            <SportsbookUpcomingMatchesPreview
              key={activeKey}
              matches={activeSport.upcomingMatches}
            />
          }
          leftPanelClassName="case-study-split-frames__panel--fill"
          rightPanelClassName="case-study-split-frames__panel--fixed"
        />
      </div>
    </div>
  );
}
