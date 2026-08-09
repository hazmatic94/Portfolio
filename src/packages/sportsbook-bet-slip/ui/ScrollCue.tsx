import { useEffect, useState, type RefObject } from 'react';

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

type ScrollCueProps = {
  scrollerRef: RefObject<HTMLElement | null>;
};

export default function ScrollCue({ scrollerRef }: ScrollCueProps) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const canScroll = scroller.scrollHeight > scroller.clientHeight + 1;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
      setHidden(!canScroll || atBottom);
    };

    update();
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    const observer = new ResizeObserver(update);
    observer.observe(scroller);

    return () => {
      scroller.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [scrollerRef]);

  return (
    <div className={`joker-mobile-scroll-cue${hidden ? ' is-hidden' : ''}`} aria-hidden={hidden}>
      <span aria-hidden="true">
        <ChevronDownIcon />
      </span>
    </div>
  );
}
