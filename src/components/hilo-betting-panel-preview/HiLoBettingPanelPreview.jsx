import { BetAmountInput, Button } from "@joker/design-system";
import jokerCoinSrc from "@joker/design-system/assets/jokerCoin.svg";
import "./HiLoBettingPanelPreview.css";

function CoinIcon() {
  return <img src={jokerCoinSrc} alt="" />;
}

export function HiLoBettingPanelPreview() {
  return (
    <aside
      className="hilo-betting-panel-preview"
      aria-label="HiLo betting panel preview"
    >
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

      <span
        className="hilo-betting-panel-preview__divider"
        aria-hidden="true"
      />

      <div className="hilo-betting-panel-preview__controls-zone">
        <span className="hilo-betting-panel-preview__zone-label">
          Game Controls
        </span>
      </div>

      <span
        className="hilo-betting-panel-preview__divider"
        aria-hidden="true"
      />

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
