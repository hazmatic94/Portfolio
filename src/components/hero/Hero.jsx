import { useEffect, useState } from "react";
import "./Hero.css";

function formatLocalTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function Hero() {
  const [time, setTime] = useState(() => formatLocalTime(new Date()));

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
        <video
          className="hero__video"
          src="/hmLogoV1.mp4"
          autoPlay
          loop
          muted
          playsInline
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
