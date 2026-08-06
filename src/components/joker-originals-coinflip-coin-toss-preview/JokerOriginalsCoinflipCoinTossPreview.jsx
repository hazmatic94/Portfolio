import { useCallback, useState } from "react";
import { Coin } from "@joker/design-system";
import "./JokerOriginalsCoinflipCoinTossPreview.css";

const COIN_SIZE = "clamp(160px, 22vw, 200px)";
const STAGE_SIZE = "clamp(280px, 38vw, 340px)";

export function JokerOriginalsCoinflipCoinTossPreview() {
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
            style={{
              "--coin-size": COIN_SIZE,
              "--coin-toss-stage-size": STAGE_SIZE,
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
