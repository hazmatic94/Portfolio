export function prepareAutoplayVideo(video) {
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.disablePictureInPicture = true;
  video.controls = false;
  video.removeAttribute("controls");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
}

export function playAutoplayVideo(video) {
  if (!video) return Promise.resolve();

  prepareAutoplayVideo(video);

  const attempt = video.play();
  return attempt?.catch ? attempt.catch(() => {}) : Promise.resolve();
}

export function bindAutoplayUnlock(video, onUnlock) {
  if (!video) return () => {};

  const unlock = () => {
    onUnlock?.();
    window.removeEventListener("touchstart", unlock, true);
    window.removeEventListener("pointerdown", unlock, true);
  };

  window.addEventListener("touchstart", unlock, { capture: true, passive: true });
  window.addEventListener("pointerdown", unlock, { capture: true, passive: true });

  return unlock;
}
