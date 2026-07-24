import "./PortfolioImageMockup.css";

export function PortfolioImageMockup({
  src,
  srcSet,
  sizes,
  width,
  height,
  className = "",
  borderRadius,
  alt = "Case study preview",
}) {
  const style = {
    ...(borderRadius != null ? { borderRadius } : null),
  };

  return (
    <div className={`portfolio-image-mockup${className ? ` ${className}` : ""}`}>
      <div className="portfolio-image-mockup__frame" style={style}>
        <div className="portfolio-image-mockup__media">
          <img
            className="portfolio-image-mockup__image"
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            width={width}
            height={height}
            alt={alt}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
