import { BetAmountInput, Button } from "@joker/design-system";
import jokerCoinSrc from "@joker/design-system/assets/jokerCoin.svg";
import "./HiLoBettingPanelPreview.css";

function CoinIcon() {
  return (
    <span
      className="hilo-betting-panel-preview__coin-icon"
      style={{
        WebkitMaskImage: `url(${jokerCoinSrc})`,
        maskImage: `url(${jokerCoinSrc})`,
      }}
      aria-hidden="true"
    />
  );
}

export function HiLoBettingPanelPreview({
  showDividers = true,
  showControlsZone = true,
}) {
  const className = [
    "hilo-betting-panel-preview",
    !showDividers ? "hilo-betting-panel-preview--no-dividers" : "",
    !showControlsZone ? "hilo-betting-panel-preview--no-controls" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={className} aria-label="HiLo betting panel preview">
      <div className="hilo-betting-panel-preview__fields">
        <BetAmountInput
          label="Bet amount"
          className="hilo-betting-panel-preview__bet-input live prefix full-width currency joker-bet-field"
          fullWidth
          leftIcon={<CoinIcon />}
          defaultValue="50"
          readOnly
          tabIndex={-1}
        />
      </div>

      {showDividers ? (
        <span
          className="hilo-betting-panel-preview__divider"
          aria-hidden="true"
        />
      ) : null}

      {showControlsZone ? (
        <div className="hilo-betting-panel-preview__controls-zone">
          <span className="hilo-betting-panel-preview__zone-label">
            Game Controls
          </span>
        </div>
      ) : null}

      {showDividers ? (
        <span
          className="hilo-betting-panel-preview__divider"
          aria-hidden="true"
        />
      ) : null}

      <div className="hilo-betting-panel-preview__submit">
        <Button
          variant="primary"
          fullWidth
          className="hilo-betting-panel-preview__place-bet joker-cta-preview default full-width joker-bet-submit"
          tabIndex={-1}
        >
          Place Bet
        </Button>
      </div>
    </aside>
  );
}
