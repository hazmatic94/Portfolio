import { HiLoBettingPanel } from "@joker/design-system";
import "./HiloPanelPreview.css";

export function HiloPanelPreview() {
  return (
    <div className="hilo-panel-preview">
      <div className="hilo-panel-preview__content">
        <HiLoBettingPanel
          className="hilo-panel-preview__panel"
          defaultBetAmount="50"
          disablePlaceBetUntilBetAmount={false}
          lowerOdds="76.39%"
          higherOdds="30.76%"
          onPlaceBet={() => {}}
          onLowerSame={() => {}}
          onHigherSame={() => {}}
        />
      </div>
      <div className="hilo-panel-preview__fade" aria-hidden="true" />
    </div>
  );
}
