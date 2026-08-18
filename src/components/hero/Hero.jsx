import { useEffect, useRef, useState } from "react";
import { mountAutoplayVideo } from "../../utils/autoplayVideo.js";
import "./Hero.css";

function formatLocalTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function useHeroLogoAutoplay() {
  const videoRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    return mountAutoplayVideo(videoRef.current, {
      onPlaying: () => {
        stageRef.current?.classList.add("hero__video-stage--playing");
      },
    });
  }, []);

  return { videoRef, stageRef };
}

export function Hero() {
  const [time, setTime] = useState(() => formatLocalTime(new Date()));
  const { videoRef, stageRef } = useHeroLogoAutoplay();

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
        <div ref={stageRef} className="hero__video-stage">
          <video
            ref={videoRef}
            className="hero__video autoplay-video"
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
