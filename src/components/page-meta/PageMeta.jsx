import { useEffect } from "react";
import { toAbsoluteUrl } from "../../config/site.js";

function setMetaTag(attribute, key, content) {
  if (!content) {
    return;
  }

  let meta = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function setLinkTag(rel, href) {
  if (!href) {
    return;
  }

  let link = document.querySelector(`link[rel="${rel}"]`);

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

export function PageMeta({
  title,
  description,
  canonicalPath = "/",
  ogImage = "",
  ogType = "website",
}) {
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const ogImageUrl = toAbsoluteUrl(ogImage);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    setMetaTag("name", "description", description);
  }, [description]);

  useEffect(() => {
    setLinkTag("canonical", canonicalUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", ogImageUrl);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImageUrl);
  }, [title, description, canonicalUrl, ogImageUrl, ogType]);

  return null;
}
