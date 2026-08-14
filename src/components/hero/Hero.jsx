import { useEffect, useRef, useState } from "react";
import {
  bindAutoplayUnlock,
  playAutoplayVideo,
  prepareAutoplayVideo,
} from "../../utils/autoplayVideo.js";
import "./Hero.css";

function formatLocalTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function useHeroLogoAutoplay() {
  const videoRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    prepareAutoplayVideo(video);

    const tryPlay = () => {
      if (!videoRef.current) return;

      void playAutoplayVideo(videoRef.current).then(() => {
        if (!videoRef.current?.paused) {
          hasStartedRef.current = true;
        }
      });
    };

    const onCanPlay = () => {
      tryPlay();
    };

    const onPageShow = (event) => {
      if (event.persisted) {
        tryPlay();
      }
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onCanPlay);
    window.addEventListener("pageshow", onPageShow);

    const unlock = bindAutoplayUnlock(video, () => {
      if (!hasStartedRef.current) {
        tryPlay();
      }
    });

    tryPlay();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onCanPlay);
      window.removeEventListener("pageshow", onPageShow);
      unlock();
    };
  }, []);

  return { videoRef };
}

export function Hero() {
  const [time, setTime] = useState(() => formatLocalTime(new Date()));
  const { videoRef } = useHeroLogoAutoplay();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatLocalTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__dot-grid" aria-hidden="true" />
      <div className="hero__video-frame">
        <div className="hero__video-stage">
          <video
            ref={videoRef}
            className="hero__video"
            src="/hmLogoV2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-label="Harry Maher logo"
          />
          <div className="hero__video-reveal" aria-hidden="true" />
        </div>
      </div>
      <p className="hero__role">Senior Product Designer</p>
      <div className="hero__meta">
        <span>Gold Coast, Queensland</span>
        <time>{time}</time>
      </div>
    </section>
  );
}
