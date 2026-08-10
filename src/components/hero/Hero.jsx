import { useEffect, useRef, useState } from "react";
import "./Hero.css";

function formatLocalTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function useHeroLogoAutoplay() {
  const frameRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video) {
      return undefined;
    }

    const tryPlay = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    };

    const onAnimationEnd = (event) => {
      if (event.animationName === "hero-logo-enter") {
        tryPlay();
      }
    };

    video.addEventListener("loadeddata", tryPlay);
    frame?.addEventListener("animationend", onAnimationEnd);

    const onPageShow = (event) => {
      if (event.persisted) {
        tryPlay();
      }
    };
    window.addEventListener("pageshow", onPageShow);

    tryPlay();

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      frame?.removeEventListener("animationend", onAnimationEnd);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return { frameRef, videoRef };
}

export function Hero() {
  const [time, setTime] = useState(() => formatLocalTime(new Date()));
  const { frameRef, videoRef } = useHeroLogoAutoplay();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatLocalTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__dot-grid" aria-hidden="true" />
      <div ref={frameRef} className="hero__video-frame">
        <video
          ref={videoRef}
          className="hero__video"
          src="/hmLogoV2.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-label="Harry Maher logo"
        />
      </div>
      <p className="hero__role">Senior Product Designer</p>
      <div className="hero__meta">
        <span>Gold Coast, Queensland</span>
        <time>{time}</time>
      </div>
    </section>
  );
}
