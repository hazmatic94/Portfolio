/** Shared beat across Mines / Hilo / Coinflip / Roulette gameplay previews. */
export const GAMEPLAY_PREVIEW_INITIAL_DELAY_MS = 480;
/** Gap after one step finishes before the next starts. */
export const GAMEPLAY_PREVIEW_BETWEEN_STEPS_MS = 160;
/** Win-chip / progression playback (enter + multiplier + ring). */
export const GAMEPLAY_PREVIEW_PLAYBACK_MS = 480 + 400 + 320;
/** Delay between step *starts* when chaining full playbacks. */
export const GAMEPLAY_PREVIEW_STEP_MS =
  GAMEPLAY_PREVIEW_PLAYBACK_MS + GAMEPLAY_PREVIEW_BETWEEN_STEPS_MS;
export const GAMEPLAY_PREVIEW_HOLD_MS = 2800;
/** Pause after the full reveal sequence before reset. */
export const GAMEPLAY_PREVIEW_WIN_HOLD_MS = 2000;
export const GAMEPLAY_PREVIEW_RESET_FADE_MS = 220;
export const GAMEPLAY_PREVIEW_RESET_SNAP_MS = 80;
