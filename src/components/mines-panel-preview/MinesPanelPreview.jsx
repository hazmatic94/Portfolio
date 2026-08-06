import { MinesBettingPanel } from "@joker/design-system";
import "./MinesPanelPreview.css";

export function MinesPanelPreview({
  minesCount,
  onMinesCountChange,
  layout = "desktop",
}) {
  const isMobile = layout === "mobile";

  return (
    <div
      className={`mines-panel-preview${isMobile ? " mines-panel-preview--mobile" : ""}`}
    >
      <div className="mines-panel-preview__content">
        <MinesBettingPanel
          className="mines-panel-preview__panel"
          layout={layout}
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
