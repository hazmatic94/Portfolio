export function ComponentCardMobilePreview({
  src,
  srcSet,
  alt,
  width = 390,
  height = 844,
}) {
  return (
    <div className="component-card__mobile-preview">
      <div className="component-card__mobile-frame">
        <img
          className="component-card__mobile-image"
          src={src}
          srcSet={srcSet}
          sizes="249px"
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="component-card__mobile-fade" aria-hidden="true" />
    </div>
  );
}
