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
  video.setAttribute("autoplay", "");

  if (video.loop) {
    video.setAttribute("loop", "");
  }
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

export function mountAutoplayVideo(video, { onPlaying } = {}) {
  if (!video) return () => {};

  prepareAutoplayVideo(video);

  const markPlaying = () => {
    onPlaying?.();
  };

  const tryPlay = () => {
    void playAutoplayVideo(video).then(() => {
      if (!video.paused) {
        markPlaying();
      }
    });
  };

  const onCanPlay = () => {
    tryPlay();
  };

  const onPlayingEvent = () => {
    markPlaying();
  };

  const onPageShow = (event) => {
    if (event.persisted) {
      tryPlay();
    }
  };

  const onVisibilityChange = () => {
    if (!document.hidden) {
      tryPlay();
    }
  };

  video.addEventListener("canplay", onCanPlay);
  video.addEventListener("loadeddata", onCanPlay);
  video.addEventListener("playing", onPlayingEvent);
  window.addEventListener("pageshow", onPageShow);
  document.addEventListener("visibilitychange", onVisibilityChange);

  const unlock = bindAutoplayUnlock(video, tryPlay);

  tryPlay();
  if (!video.paused) {
    markPlaying();
  }

  return () => {
    video.removeEventListener("canplay", onCanPlay);
    video.removeEventListener("loadeddata", onCanPlay);
    video.removeEventListener("playing", onPlayingEvent);
    window.removeEventListener("pageshow", onPageShow);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    unlock();
  };
}
