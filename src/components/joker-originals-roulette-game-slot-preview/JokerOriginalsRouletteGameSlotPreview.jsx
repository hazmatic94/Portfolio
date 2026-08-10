import { useCallback } from "react";
import {
  ROULETTE_WHEEL_FILL_CONTAINER_SIZE,
  RouletteWheel,
  RouletteWheelArea,
  RouletteWheelViewport,
  useRouletteWheelSpin,
} from "@joker/design-system";
import { GAMEPLAY_PREVIEW_MOBILE_FRAME_HEIGHT_PX } from "../joker-originals-gameplay-preview/gameplayPreviewTiming.js";
import { useGameplayPreviewMobileCompact } from "../joker-originals-gameplay-preview/useGameplayPreviewMobileCompact.js";
import "./JokerOriginalsRouletteGameSlotPreview.css";

const DESKTOP_PREVIEW_FRAME_HEIGHT_PX = 540;
const WHEEL_AREA_INSET_TOP = 96;
const WHEEL_VIEWPORT_OFFSET_Y = 28;

export function JokerOriginalsRouletteGameSlotPreview() {
  const mobileCompact = useGameplayPreviewMobileCompact();
  const frameScale = mobileCompact
    ? GAMEPLAY_PREVIEW_MOBILE_FRAME_HEIGHT_PX / DESKTOP_PREVIEW_FRAME_HEIGHT_PX
    : 1;
  const wheelSize = Math.round(ROULETTE_WHEEL_FILL_CONTAINER_SIZE * frameScale);
  const areaInsetTop = Math.round(WHEEL_AREA_INSET_TOP * frameScale);
  const viewportOffsetY = Math.round(WHEEL_VIEWPORT_OFFSET_Y * frameScale);

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
          <RouletteWheelArea insetTop={areaInsetTop}>
            <RouletteWheelViewport wheelSize={wheelSize} offsetY={viewportOffsetY}>
              <RouletteWheel
                size={wheelSize}
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
