import { useId, useState } from "react";
import { CaseStudyFullWidthFrame } from "../case-study-full-width-frame/CaseStudyFullWidthFrame.jsx";
import { JokerOriginalsCoinflipStatesPreview } from "../joker-originals-coinflip-states-preview/JokerOriginalsCoinflipStatesPreview.jsx";
import { JokerOriginalsHiloStatesPreview } from "../joker-originals-hilo-states-preview/JokerOriginalsHiloStatesPreview.jsx";
import { JokerOriginalsMinesStatesPreview } from "../joker-originals-mines-states-preview/JokerOriginalsMinesStatesPreview.jsx";
import { JokerOriginalsRouletteStatesPreview } from "../joker-originals-roulette-states-preview/JokerOriginalsRouletteStatesPreview.jsx";
import { ADOPTION_GAMES } from "../product-adoption-games-grid/ProductAdoptionGamesGrid.jsx";
import "./JokerOriginalsGameplayPreview.css";

export const JOKER_ORIGALS_GAMEPLAY_TABS = [
  { key: "mines", label: "Mines" },
  { key: "hilo", label: "Hilo" },
  { key: "coin-flip", label: "Coinflip" },
  { key: "roulette", label: "Roulette" },
];

export function JokerOriginalsGameplayTabBar({
  baseId,
  activeKey,
  onChange,
  panelId,
  className = "",
}) {
  return (
    <div
      className={`joker-originals-gameplay-preview__tabs${className ? ` ${className}` : ""}`}
      role="tablist"
      aria-label="Original games"
    >
      {JOKER_ORIGALS_GAMEPLAY_TABS.map((tab) => {
        const selected = tab.key === activeKey;
        const tabId = `${baseId}-${tab.key}`;
        return (
          <div key={tab.key} className="joker-originals-gameplay-preview__tab">
            <button
              type="button"
              role="tab"
              id={tabId}
              className="joker-originals-gameplay-preview__tab-button"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.key)}
            >
              <span className="joker-originals-gameplay-preview__tab-label">
                {tab.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function JokerOriginalsGameplayPreview() {
  const baseId = useId();
  const [activeKey, setActiveKey] = useState(JOKER_ORIGALS_GAMEPLAY_TABS[0].key);
  const activeGame =
    ADOPTION_GAMES.find((game) => game.key === activeKey) ?? ADOPTION_GAMES[0];
  const panelId = `${baseId}-panel`;

  return (
    <div className="joker-originals-gameplay-preview">
      <JokerOriginalsGameplayTabBar
        baseId={baseId}
        activeKey={activeKey}
        onChange={setActiveKey}
        panelId={panelId}
      />

      <CaseStudyFullWidthFrame
        className={`joker-originals-gameplay-preview__visual${
          activeKey === "mines"
            ? " joker-originals-gameplay-preview__visual--mines"
            : activeKey === "coin-flip"
              ? " joker-originals-gameplay-preview__visual--coin-flip"
              : activeKey === "roulette"
                ? " joker-originals-gameplay-preview__visual--roulette"
                : ""
        }`}
      >
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${baseId}-${activeKey}`}
          aria-live="polite"
          className="joker-originals-gameplay-preview__panel"
        >
          {activeKey === "mines" ? (
            <JokerOriginalsMinesStatesPreview />
          ) : activeKey === "hilo" ? (
            <JokerOriginalsHiloStatesPreview key={activeKey} />
          ) : activeKey === "coin-flip" ? (
            <JokerOriginalsCoinflipStatesPreview key={activeKey} />
          ) : activeKey === "roulette" ? (
            <JokerOriginalsRouletteStatesPreview key={activeKey} />
          ) : (
            <img
              key={activeGame.key}
              className="joker-originals-gameplay-preview__image"
              src={activeGame.src}
              srcSet={activeGame.srcSet}
              sizes="(max-width: 800px) 100vw, 1000px"
              width={activeGame.width}
              height={activeGame.height}
              alt={activeGame.label}
              decoding="async"
            />
          )}
        </div>
      </CaseStudyFullWidthFrame>
    </div>
  );
}
