import { useCallback } from "react";
import {
  ROULETTE_WHEEL_FILL_CONTAINER_SIZE,
  RouletteWheel,
  RouletteWheelArea,
  RouletteWheelViewport,
  useRouletteWheelSpin,
} from "@joker/design-system";
import "./JokerOriginalsRouletteGameSlotPreview.css";

const WHEEL_AREA_INSET_TOP = 96;
const WHEEL_VIEWPORT_OFFSET_Y = 28;

export function JokerOriginalsRouletteGameSlotPreview() {
  const {
    wheelRotation,
    ballPosition,
    ballBounceScale,
    ballBounceLift,
    showBall,
    isSpinning,
    targetPocket,
    spin,
  } = useRouletteWheelSpin({
    soundEnabled: false,
  });

  const handleSpin = useCallback(() => {
    spin();
  }, [spin]);

  return (
    <div
      className="joker-originals-roulette-game-slot-preview"
      aria-label="Interactive roulette game slot preview"
    >
      <button
        type="button"
        className={`joker-originals-roulette-game-slot-preview__tap-target${isSpinning ? " is-spinning" : ""}`}
        onClick={handleSpin}
        aria-label="Spin roulette wheel"
        aria-busy={isSpinning}
      >
        <div
          className="joker-originals-roulette-game-slot-preview__canvas joker-game-inner-canvas joker-game-shell-empty-stage"
          aria-label="Game area canvas"
        >
          <RouletteWheelArea insetTop={WHEEL_AREA_INSET_TOP}>
            <RouletteWheelViewport
              wheelSize={ROULETTE_WHEEL_FILL_CONTAINER_SIZE}
              offsetY={WHEEL_VIEWPORT_OFFSET_Y}
            >
              <RouletteWheel
                size={ROULETTE_WHEEL_FILL_CONTAINER_SIZE}
                wheelRotation={wheelRotation}
                ballPosition={ballPosition}
                ballBounceScale={ballBounceScale}
                ballBounceLift={ballBounceLift}
                showBall={showBall}
                targetPocket={targetPocket}
                performanceMode
              />
            </RouletteWheelViewport>
          </RouletteWheelArea>
        </div>
      </button>
      <span className="case-study-text__chip joker-originals-roulette-game-slot-preview__chip">
        Interactive
      </span>
    </div>
  );
}
