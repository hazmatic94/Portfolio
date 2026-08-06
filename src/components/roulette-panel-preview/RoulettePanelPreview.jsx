import { RouletteBettingPanel } from "@joker/design-system";
import "./RoulettePanelPreview.css";

export function RoulettePanelPreview() {
  return (
    <div className="roulette-panel-preview">
      <div className="roulette-panel-preview__content">
        <RouletteBettingPanel
          className="roulette-panel-preview__panel"
          defaultBetAmount="50"
          defaultSelectedOddsValue="red"
          disablePlaceBetUntilBetAmount={false}
          submitLabel="Spin Wheel"
          onPlaceBet={() => {}}
        />
      </div>
      <div className="roulette-panel-preview__fade" aria-hidden="true" />
    </div>
  );
}
