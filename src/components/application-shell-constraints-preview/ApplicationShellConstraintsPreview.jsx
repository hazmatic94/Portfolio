import { GameInner } from "@joker/design-system";
import { HiLoBettingPanelPreview } from "../hilo-betting-panel-preview/HiLoBettingPanelPreview.jsx";
import "./ApplicationShellConstraintsPreview.css";

export function ApplicationShellConstraintsPreview() {
  return (
    <GameInner
      className="application-shell-constraints-preview"
      game={{ label: "Hi Lo" }}
      fairPlayLabel="Fair Play"
      bettingPanel={<HiLoBettingPanelPreview />}
      renderMobileBetting={false}
    >
      <div className="application-shell-constraints-preview__game-zone">
        <span className="application-shell-constraints-preview__zone-label">
          Game View
        </span>
      </div>
    </GameInner>
  );
}
