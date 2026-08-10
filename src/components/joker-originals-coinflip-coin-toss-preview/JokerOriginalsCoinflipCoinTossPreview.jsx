import { useCallback, useState } from "react";
import { Coin } from "@joker/design-system";
import { useGameplayPreviewMobileCompact } from "../joker-originals-gameplay-preview/useGameplayPreviewMobileCompact.js";
import "./JokerOriginalsCoinflipCoinTossPreview.css";

const COIN_SIZE_PX = 270;
const STAGE_SIZE_PX = 306;
const COIN_SIZE_PX_MOBILE = 200;
const STAGE_SIZE_PX_MOBILE = 248;

export function JokerOriginalsCoinflipCoinTossPreview() {
  const mobileCompact = useGameplayPreviewMobileCompact();
  const coinSizePx = mobileCompact ? COIN_SIZE_PX_MOBILE : COIN_SIZE_PX;
  const stageSizePx = mobileCompact ? STAGE_SIZE_PX_MOBILE : STAGE_SIZE_PX;
  const [side, setSide] = useState("heads");
  const [phase, setPhase] = useState("idle");
  const [outcome, setOutcome] = useState("heads");
  const [hintVisible, setHintVisible] = useState(true);

  const flip = useCallback(() => {
    if (phase === "tossing") return;
    setHintVisible(false);
    setOutcome(Math.random() > 0.5 ? "heads" : "tails");
    setPhase("tossing");
  }, [phase]);

  return (
    <div
      className="joker-originals-coinflip-coin-toss-preview"
      aria-label="Interactive coin toss preview"
    >
      <div className="joker-originals-coinflip-coin-toss-preview__stage">
        <button
          type="button"
          className="joker-coin-toss__tap-target"
          onClick={flip}
          disabled={phase === "tossing"}
          aria-label="Flip coin"
        >
          <Coin
            side={side}
            tossPhase={phase}
            tossOutcome={outcome}
            onTossEnd={() => {
              setSide(outcome);
              setPhase("idle");
              setHintVisible(true);
            }}
            tapHint="Tap to flip"
            tapHintVisible={hintVisible}
            soundEnabled={false}
            stageSizePx={stageSizePx}
            style={{
              "--coin-size": `${coinSizePx}px`,
              "--coin-toss-stage-size": `${stageSizePx}px`,
            }}
          />
        </button>
      </div>
      <span className="case-study-text__chip joker-originals-coinflip-coin-toss-preview__chip">
        Interactive
      </span>
    </div>
  );
}
