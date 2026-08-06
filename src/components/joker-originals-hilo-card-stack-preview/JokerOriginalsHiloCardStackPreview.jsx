import { GameCardFace, GameCardStack } from "@joker/design-system";
import "./JokerOriginalsHiloCardStackPreview.css";

export function JokerOriginalsHiloCardStackPreview() {
  return (
    <div
      className="joker-originals-hilo-card-stack-preview"
      aria-label="Interactive HiLo card stack preview"
    >
      <div className="joker-originals-hilo-card-stack-preview__stage">
        <GameCardStack className="joker-originals-hilo-card-stack-preview__stack">
          <GameCardFace rank="10" suit="spades" />
        </GameCardStack>
      </div>
      <span className="case-study-text__chip joker-originals-hilo-card-stack-preview__chip">
        Interactive
      </span>
    </div>
  );
}
