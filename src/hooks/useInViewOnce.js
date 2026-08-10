import { useEffect, useRef, useState } from "react";

function isMeaningfullyVisible(entry, threshold) {
  const { top, height } = entry.boundingClientRect;
  const viewportHeight = window.innerHeight;

  if (height <= 0) return false;

  const visibleTop = Math.max(top, 0);
  const visibleBottom = Math.min(top + height, viewportHeight);
  const visibleHeight = visibleBottom - visibleTop;

  if (visibleHeight <= 0) return false;

  return visibleHeight / height >= threshold;
}

function waitForRouteReady(callback) {
  let frameId;
  let cancelled = false;

  frameId = requestAnimationFrame(() => {
    if (cancelled) return;
    frameId = requestAnimationFrame(() => {
      if (!cancelled) callback();
    });
  });

  return () => {
    cancelled = true;
    cancelAnimationFrame(frameId);
  };
}

export function useInViewOnce({
  threshold = 0.28,
  rootMargin = "0px 0px -8% 0px",
  settleFrames = 2,
  requireUserScroll = false,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [scrollUnlocked, setScrollUnlocked] = useState(!requireUserScroll);

  useEffect(() => {
    if (!requireUserScroll) return undefined;

    if (window.scrollY > 32) {
      setScrollUnlocked(true);
      return undefined;
    }

    const unlock = () => {
      if (window.scrollY > 32) {
        setScrollUnlocked(true);
      }
    };

    window.addEventListener("scroll", unlock, { passive: true });
    return () => window.removeEventListener("scroll", unlock);
  }, [requireUserScroll]);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView || !scrollUnlocked) return undefined;

    let observer;
    let frameId;
    let frame = 0;
    let cancelRouteReady;

    const startObserving = () => {
      if (document.documentElement.classList.contains("route-changing")) {
        frameId = requestAnimationFrame(startObserving);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (document.documentElement.classList.contains("route-changing")) {
            return;
          }

          if (!entry?.isIntersecting || !isMeaningfullyVisible(entry, threshold)) {
            return;
          }

          setInView(true);
          observer.disconnect();
        },
        { threshold, rootMargin },
      );

      observer.observe(node);
    };

    const waitForLayout = () => {
      frame += 1;
      if (frame < settleFrames) {
        frameId = requestAnimationFrame(waitForLayout);
        return;
      }

      startObserving();
    };

    cancelRouteReady = waitForRouteReady(() => {
      frameId = requestAnimationFrame(waitForLayout);
    });

    return () => {
      cancelRouteReady?.();
      cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, [inView, threshold, rootMargin, settleFrames, scrollUnlocked]);

  return [ref, inView];
}
