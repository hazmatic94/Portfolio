import { useInViewOnce } from "../../hooks/useInViewOnce.js";
import { useRouteReady } from "../../hooks/useRouteReady.js";

export function CaseStudyRevealSection({
  as: Tag = "section",
  className = "",
  ariaLabel,
  reveal = "entry",
  children,
}) {
  const routeReady = useRouteReady();
  const [ref, inView] = useInViewOnce({
    requireUserScroll: reveal === "scroll",
  });
  const showReveal = routeReady && inView;

  return (
    <Tag
      ref={ref}
      className={`case-study-block case-study-block--reveal${showReveal ? " is-in-view" : ""}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
