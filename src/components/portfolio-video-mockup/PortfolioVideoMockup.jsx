import { useEffect, useRef } from "react";
import "./PortfolioVideoMockup.css";

export function PortfolioVideoMockup({
  src,
  className = "",
  width,
  height,
  borderRadius,
  playbackRate = 1,
  "aria-label": ariaLabel = "Case study preview",
}) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackRate;
  }, [src, playbackRate]);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.playbackRate = playbackRate;
          const playPromise = video.play();
          if (playPromise?.catch) {
            playPromise.catch(() => {});
          }
          return;
        }

        video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [src, playbackRate]);

  const style = {
    ...(width != null ? { width } : null),
    ...(height != null ? { height } : null),
    ...(borderRadius != null ? { borderRadius } : null),
  };

  return (
    <div
      ref={rootRef}
      className={`portfolio-video-mockup${className ? ` ${className}` : ""}`}
      style={style}
    >
      <video
        ref={videoRef}
        className="portfolio-video-mockup__video"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        aria-label={ariaLabel}
      />
    </div>
  );
}
