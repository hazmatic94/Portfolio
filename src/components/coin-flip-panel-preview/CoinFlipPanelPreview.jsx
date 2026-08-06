import { CoinFlipBettingPanel } from "@joker/design-system";
import "./CoinFlipPanelPreview.css";

const COIN_FLIP_ODDS_OPTIONS = [
  { value: "heads", label: "Bet Heads", sideIcon: "heads" },
  { value: "tails", label: "Bet Tails", sideIcon: "tails" },
];

export function CoinFlipPanelPreview() {
  return (
    <div className="coin-flip-panel-preview">
      <div className="coin-flip-panel-preview__content">
        <CoinFlipBettingPanel
          className="coin-flip-panel-preview__panel"
          defaultBetAmount="50"
          defaultSelectedOddsValue="heads"
          oddsOptions={COIN_FLIP_ODDS_OPTIONS}
          disablePlaceBetUntilBetAmount={false}
          onPlaceBet={() => {}}
        />
      </div>
      <div className="coin-flip-panel-preview__fade" aria-hidden="true" />
    </div>
  );
}
