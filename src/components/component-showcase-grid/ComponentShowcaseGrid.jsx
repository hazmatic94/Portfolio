import { useEffect, useRef, useState } from "react";
import { BetAmountInput, Button, Coin, MinesTile, WinTile } from "@joker/design-system";
import jokerCoinSrc from "@joker/design-system/assets/jokerCoin.svg?url";
import {
  BetAmountInputComponentCardCode,
  ButtonComponentCardCode,
  CoinComponentCardCode,
  WinTileComponentCardCode,
} from "../component-card/ComponentCardCodes.jsx";
import { ComponentCard } from "../component-card/ComponentCard.jsx";
import "./ComponentShowcaseGrid.css";

function ButtonPreview() {
  return (
    <div className="component-showcase-grid__button-preview">
      <Button variant="primary">Place Bet</Button>
    </div>
  );
}

function CoinPreview() {
  return (
    <div className="component-showcase-grid__coin-preview">
      <Coin side="heads" className="component-showcase-grid__coin" />
    </div>
  );
}

function BetAmountPreview() {
  return (
    <BetAmountInput
      className="component-showcase-grid__bet-input"
      label="Bet amount"
      placeholder="0"
      prefix={<img src={jokerCoinSrc} alt="" />}
    />
  );
}

const WIN_TILE_OPENED_DELAY_MS = 720 + 220 + 1200;
const WIN_TILE_RESET_AFTER_OPENED_MS = 5000;

function WinTileFlipPreview() {
  const [coverFlipped, setCoverFlipped] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!revealed) {
      return;
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setRevealed(false);
      setCoverFlipped(false);
      setCycleKey((key) => key + 1);
    }, WIN_TILE_OPENED_DELAY_MS + WIN_TILE_RESET_AFTER_OPENED_MS);

    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, [revealed]);

  const revealGold = () => {
    if (coverFlipped) {
      return;
    }

    setCoverFlipped(true);
    window.setTimeout(() => setRevealed(true), 120);
  };

  return (
    <div
      className={`mines-gold-flip-demo component-showcase-grid__win-tile-flip${
        coverFlipped || revealed ? " is-active" : ""
      }`}
    >
      <div className="mines-gold-flip-demo__stack">
        <WinTile
          key={cycleKey}
          className="mines-gold-flip-demo__win component-showcase-grid__win-tile"
          revealed={revealed}
          multiplier="1.57x"
          soundOnReveal
        />
        <MinesTile
          className={`mines-gold-flip-demo__cover${coverFlipped ? " is-flipped" : ""}`}
          selected={!coverFlipped}
          playClickSound={!coverFlipped}
          role={coverFlipped ? undefined : "button"}
          tabIndex={coverFlipped ? -1 : 0}
          aria-hidden={coverFlipped || undefined}
          aria-label={coverFlipped ? undefined : "Flip tile to reveal gold"}
          onClick={coverFlipped ? undefined : revealGold}
          onKeyDown={(event) => {
            if (coverFlipped || (event.key !== "Enter" && event.key !== " ")) {
              return;
            }

            event.preventDefault();
            revealGold();
          }}
        />
      </div>
    </div>
  );
}

const COMPONENT_SHOWCASE_ITEMS = [
  {
    key: "button",
    code: <ButtonComponentCardCode />,
    preview: <ButtonPreview />,
  },
  {
    key: "coin",
    code: <CoinComponentCardCode />,
    preview: <CoinPreview />,
  },
  {
    key: "bet-amount",
    code: <BetAmountInputComponentCardCode />,
    preview: <BetAmountPreview />,
  },
  {
    key: "win-tile",
    code: <WinTileComponentCardCode />,
    preview: <WinTileFlipPreview />,
  },
];

export function ComponentShowcaseGrid() {
  return (
    <div className="component-showcase-grid">
      <div className="component-showcase-grid__grid">
        {COMPONENT_SHOWCASE_ITEMS.map((item) => (
          <div key={item.key} className="component-showcase-grid__tile">
            <ComponentCard showCode code={item.code}>
              {item.preview}
            </ComponentCard>
          </div>
        ))}
      </div>
    </div>
  );
}
