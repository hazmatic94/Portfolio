import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useRouteReady() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setReady(false);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    let frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(() => {
        setReady(true);
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return ready;
}
