export function beginRouteChange() {
  document.documentElement.classList.add("route-changing");
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
