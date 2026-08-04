import { useId, useState } from "react";
import { CaseStudyFullWidthFrame } from "../case-study-full-width-frame/CaseStudyFullWidthFrame.jsx";
import { ADOPTION_GAMES } from "../product-adoption-games-grid/ProductAdoptionGamesGrid.jsx";
import "./JokerOriginalsGameplayPreview.css";

const GAMEPLAY_TABS = [
  { key: "mines", label: "Mines" },
  { key: "hilo", label: "Hilo" },
  { key: "coin-flip", label: "Coinflip" },
  { key: "roulette", label: "Roulette" },
];

export function JokerOriginalsGameplayPreview() {
  const baseId = useId();
  const [activeKey, setActiveKey] = useState(GAMEPLAY_TABS[0].key);
  const activeGame =
    ADOPTION_GAMES.find((game) => game.key === activeKey) ?? ADOPTION_GAMES[0];

  return (
    <div className="joker-originals-gameplay-preview">
      <div
        className="joker-originals-gameplay-preview__tabs"
        role="tablist"
        aria-label="Original games"
      >
        {GAMEPLAY_TABS.map((tab) => {
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
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveKey(tab.key)}
              >
                <span className="joker-originals-gameplay-preview__tab-label">
                  {tab.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <CaseStudyFullWidthFrame className="joker-originals-gameplay-preview__visual">
        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-live="polite"
          className="joker-originals-gameplay-preview__panel"
        >
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
        </div>
      </CaseStudyFullWidthFrame>
    </div>
  );
}
