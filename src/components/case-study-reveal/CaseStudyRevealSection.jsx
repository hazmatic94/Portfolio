import { useInViewOnce } from "../../hooks/useInViewOnce.js";

export function CaseStudyRevealSection({
  as: Tag = "section",
  className = "",
  ariaLabel,
  children,
}) {
  const [ref, inView] = useInViewOnce();

  return (
    <Tag
      ref={ref}
      className={`case-study-block case-study-block--reveal${inView ? " is-in-view" : ""}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
