import {
  playBombSound,
  playButtonClickSound,
  playCoinReceiverWinSound,
  playMineGoldSound,
  playShieldSound,
} from "@joker/design-system";

export const GAMEPLAY_PREVIEW_SOUNDS_ENABLED = false;

/** Matches `ROULETTE_WIN_CHIP_ENTER_MS` — chip / multiplier pop in the shared beat. */
export const GAMEPLAY_PREVIEW_CHIP_SOUND_DELAY_MS = 480;

export function playGameplayCardDealSound() {
  if (!GAMEPLAY_PREVIEW_SOUNDS_ENABLED) return;
  playButtonClickSound();
}

export function playGameplayWinChipSound() {
  if (!GAMEPLAY_PREVIEW_SOUNDS_ENABLED) return;
  playCoinReceiverWinSound();
}

export function playGameplayMineWinSound() {
  if (!GAMEPLAY_PREVIEW_SOUNDS_ENABLED) return;
  playMineGoldSound();
}

export function playGameplaySkipSound() {
  if (!GAMEPLAY_PREVIEW_SOUNDS_ENABLED) return;
  playShieldSound();
}

export function playGameplayLossSound() {
  if (!GAMEPLAY_PREVIEW_SOUNDS_ENABLED) return;
  playBombSound();
}
