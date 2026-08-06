import { MinesBettingPanel } from "@joker/design-system";
import "./MinesPanelPreview.css";

export function MinesPanelPreview({ minesCount, onMinesCountChange }) {
  return (
    <div className="mines-panel-preview">
      <div className="mines-panel-preview__content">
        <MinesBettingPanel
          className="mines-panel-preview__panel"
          defaultBetAmount="50"
          defaultMinesAmount="1"
          minesAmount={minesCount}
          onMinesAmountChange={onMinesCountChange}
          disablePlaceBetUntilBetAmount={false}
          onPlaceBet={() => {}}
        />
      </div>
      <div className="mines-panel-preview__fade" aria-hidden="true" />
    </div>
  );
}
