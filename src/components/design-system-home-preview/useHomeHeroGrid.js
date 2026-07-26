import { useEffect } from "react";
import { setupSeamlessVideoLoop } from "./setupSeamlessVideoLoop.js";

const SETTINGS = {
  dotSize: 1.4,
  gridStep: 4,
  dotAlpha: 0.44,
};

function parseHexColor(value, fallback) {
  const hex = (value || fallback).trim();
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((channel) => channel + channel)
          .join("")
      : normalized;

  if (!/^[0-9a-f]{6}$/i.test(expanded)) {
    return parseHexColor(fallback, "#171717");
  }

  return [
    Number.parseInt(expanded.slice(0, 2), 16),
    Number.parseInt(expanded.slice(2, 4), 16),
    Number.parseInt(expanded.slice(4, 6), 16),
  ];
}

function toRgbString(rgb, alpha = 1) {
  return `rgba(${rgb[0]} ${rgb[1]} ${rgb[2]} / ${alpha})`;
}

export function useHomeHeroGrid(heroEl, videoSrc) {
  useEffect(() => {
    const hero = heroEl;
    if (!hero) return undefined;

    const canvas = hero.querySelector("[data-home-hero-grid-canvas]");
    const videoWrap = hero.querySelector("[data-home-hero-video-wrap]");
    const video = hero.querySelector("[data-home-hero-grid-video]");
    if (!canvas || !videoWrap || !video) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const videoLoop = setupSeamlessVideoLoop(video, {
      container: videoWrap,
      readyKey: "homeHeroVideoLoopReady",
      activeClass: "ds-home-preview__hero-video--active",
      standbyClass: "ds-home-preview__hero-video--standby",
    });

    const styles = getComputedStyle(hero);
    const dotRgb = parseHexColor(
      styles.getPropertyValue("--joker-black-100"),
      "#5f5f5f",
    );
    const dotColor = toRgbString(dotRgb, SETTINGS.dotAlpha);

    let width = 0;
    let height = 0;

    const drawDots = () => {
      if (width <= 0 || height <= 0) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;

      const halfStep = SETTINGS.gridStep * 0.5;
      const halfDot = SETTINGS.dotSize * 0.5;
      const cols = Math.max(
        1,
        Math.floor((width - halfStep) / SETTINGS.gridStep) + 1,
      );
      const rows = Math.max(
        1,
        Math.floor((height - halfStep) / SETTINGS.gridStep) + 1,
      );

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = Math.min(col * SETTINGS.gridStep + halfStep, width - halfDot);
          const y = Math.min(row * SETTINGS.gridStep + halfStep, height - halfDot);
          const drawX = x - halfDot;
          const drawY = y - halfDot;
          if (drawX + SETTINGS.dotSize > width || drawY + SETTINGS.dotSize > height) {
            continue;
          }

          ctx.fillRect(drawX, drawY, SETTINGS.dotSize, SETTINGS.dotSize);
        }
      }
    };

    const resize = () => {
      const layoutWidth = hero.clientWidth;
      const layoutHeight = hero.clientHeight;
      if (layoutWidth <= 0 || layoutHeight <= 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(layoutWidth * dpr);
      canvas.height = Math.floor(layoutHeight * dpr);
      canvas.style.width = `${layoutWidth}px`;
      canvas.style.height = `${layoutHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      width = layoutWidth;
      height = layoutHeight;
      drawDots();
    };

    if (videoSrc && !video.getAttribute("src")) {
      video.src = videoSrc;
    }

    const resizeObserver = new ResizeObserver(() => resize());

    resizeObserver.observe(hero);
    resize();

    return () => {
      resizeObserver.disconnect();
      videoLoop.destroy();
    };
  }, [heroEl, videoSrc]);
}
