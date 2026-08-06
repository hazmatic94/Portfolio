import { MinesTile } from "@joker/design-system";
import "./JokerOriginalsMinesInteractivePreview.css";

export function JokerOriginalsMinesInteractivePreview() {
  return (
    <div
      className="joker-originals-mines-interactive-preview"
      aria-label="Interactive mines tile preview"
    >
      <MinesTile
        className="joker-originals-mines-interactive-preview__tile"
        selected
        playClickSound={false}
        role="button"
        tabIndex={0}
        aria-label="Mine tile"
      />
      <span className="case-study-text__chip joker-originals-mines-interactive-preview__chip">
        Interactive
      </span>
    </div>
  );
}
