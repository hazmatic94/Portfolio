import { GameInner } from "@joker/design-system";
import { HiLoBettingPanelPreview } from "../hilo-betting-panel-preview/HiLoBettingPanelPreview.jsx";
import "./ApplicationShellConstraintsPreview.css";

export function ApplicationShellConstraintsPreview() {
  return (
    <GameInner
      className="application-shell-constraints-preview"
      game={{ label: "Hi Lo", icon: "hi-lo" }}
      fairPlayLabel="Fair Play"
      bettingPanel={<HiLoBettingPanelPreview disabled />}
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
