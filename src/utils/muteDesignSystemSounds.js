const DESIGN_SYSTEM_MP3 =
  /\/@joker\/design-system\/.*\.mp3(?:[?#]|$)|\/(?:bomb|shield|mineClick|mineGold|buttonClick|coinFlip|coinWhoosh|gameOver|winStreak|roulette-wheel-roll|roulette-marble-bounce)\.mp3(?:[?#]|$)/i;

function isDesignSystemSound(src) {
  return typeof src === "string" && DESIGN_SYSTEM_MP3.test(src);
}

/** Portfolio previews are visual-only — mute DS mp3 playback at the source. */
export function installDesignSystemSoundMute() {
  if (typeof window === "undefined" || window.__portfolioDsSoundsMuted) {
    return;
  }

  window.__portfolioDsSoundsMuted = true;

  const NativeAudio = window.Audio;

  function PatchedAudio(src, options) {
    const audio = new NativeAudio(src, options);

    if (isDesignSystemSound(src)) {
      audio.play = () => Promise.resolve();
      audio.pause = () => {};
    }

    return audio;
  }

  PatchedAudio.prototype = NativeAudio.prototype;
  window.Audio = PatchedAudio;
}
