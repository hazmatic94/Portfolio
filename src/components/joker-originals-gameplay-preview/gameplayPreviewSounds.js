import {
  playBombSound,
  playButtonClickSound,
  playCoinReceiverWinSound,
  playMineGoldSound,
  playShieldSound,
} from "@joker/design-system";

/** Matches `ROULETTE_WIN_CHIP_ENTER_MS` — chip / multiplier pop in the shared beat. */
export const GAMEPLAY_PREVIEW_CHIP_SOUND_DELAY_MS = 480;

export function playGameplayCardDealSound() {
  playButtonClickSound();
}

export function playGameplayWinChipSound() {
  playCoinReceiverWinSound();
}

export function playGameplayMineWinSound() {
  playMineGoldSound();
}

export function playGameplaySkipSound() {
  playShieldSound();
}

export function playGameplayLossSound() {
  playBombSound();
}
