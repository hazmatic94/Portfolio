import { useEffect, useState } from "react";

const GAMEPLAY_PREVIEW_MOBILE_MQ = "(max-width: 800px)";

export function useGameplayPreviewMobileCompact() {
  const [compact, setCompact] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(GAMEPLAY_PREVIEW_MOBILE_MQ).matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(GAMEPLAY_PREVIEW_MOBILE_MQ);
    const sync = () => setCompact(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return compact;
}
