const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "";

export function getSiteUrl() {
  if (configuredSiteUrl) {
    return configuredSiteUrl;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

export function toAbsoluteUrl(path) {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
