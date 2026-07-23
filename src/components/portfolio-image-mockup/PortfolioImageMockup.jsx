import "./PortfolioImageMockup.css";

export function PortfolioImageMockup({
  src,
  className = "",
  borderRadius,
  alt = "Case study preview",
}) {
  const style = {
    ...(borderRadius != null ? { borderRadius } : null),
  };

  return (
    <div
      className={`portfolio-image-mockup${className ? ` ${className}` : ""}`}
      style={style}
    >
      <img className="portfolio-image-mockup__image" src={src} alt={alt} />
    </div>
  );
}
