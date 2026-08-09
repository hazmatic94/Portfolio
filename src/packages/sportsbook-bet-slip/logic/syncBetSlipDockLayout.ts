import { BETSLIP_DOCK_MAX_WIDTH } from './constants';

const FOOTER_GAP_PX = 32;
const TOP_RAIL_GAP_PX = 42;

const TOP_RAIL_SELECTORS = [
  '.joker-game-header-rail',
  '.joker-top-rail-demo',
  '.joker-mobile-nav-trigger-bar',
] as const;

function findTopRails() {
  return TOP_RAIL_SELECTORS.map((selector) =>
    document.querySelector<HTMLElement>(selector),
  ).filter((node): node is HTMLElement => node != null);
}

function computeTopClearance() {
  const rails = findTopRails();
  if (rails.length === 0) {
    return TOP_RAIL_GAP_PX;
  }

  const maxBottom = Math.max(
    0,
    ...rails.map((rail) => rail.getBoundingClientRect().bottom),
  );
  return maxBottom + TOP_RAIL_GAP_PX;
}

function computeBottomAboveFooter(footer: HTMLElement) {
  const footerTop = footer.getBoundingClientRect().top;
  return Math.max(FOOTER_GAP_PX, window.innerHeight - footerTop + FOOTER_GAP_PX);
}

function findLayoutAnchor() {
  return (
    document.querySelector<HTMLElement>('.joker-game-inner') ??
    document.querySelector<HTMLElement>('.joker-game-inner-frame')
  );
}

function findScrollContainers() {
  return [
    document.querySelector<HTMLElement>('.joker-game-inner-canvas'),
    document.querySelector<HTMLElement>('.joker-navigation-mobile-content'),
  ].filter((node): node is HTMLElement => node != null);
}

export function syncBetSlipDockLayout(dock: HTMLElement, _shell: HTMLElement | null) {
  const footer = document.querySelector<HTMLElement>('.joker-game-footer-rail');
  const bottom = footer ? computeBottomAboveFooter(footer) : FOOTER_GAP_PX;

  dock.style.setProperty('--betslip-dock-bottom', `${bottom}px`);
  dock.style.setProperty('--betslip-dock-top-clearance', `${computeTopClearance()}px`);

  const anchor = findLayoutAnchor();
  if (anchor) {
    const rect = anchor.getBoundingClientRect();
    const width = Math.min(BETSLIP_DOCK_MAX_WIDTH, rect.width);
    const left = rect.left + rect.width / 2;
    dock.style.setProperty('--betslip-dock-left', `${left}px`);
    dock.style.setProperty('--betslip-dock-width', `${width}px`);
  } else {
    dock.style.removeProperty('--betslip-dock-left');
    dock.style.removeProperty('--betslip-dock-width');
  }
}

export function clearBetSlipDockLayout(dock: HTMLElement) {
  dock.style.removeProperty('--betslip-dock-bottom');
  dock.style.removeProperty('--betslip-dock-top-clearance');
  dock.style.removeProperty('--betslip-dock-left');
  dock.style.removeProperty('--betslip-dock-width');
}

export function observeBetSlipDockLayout(
  dock: HTMLElement,
  _shell: HTMLElement | null,
  onChange: () => void,
) {
  const run = () => {
    onChange();
  };

  run();

  const dockObserver = new ResizeObserver(run);
  dockObserver.observe(dock);

  const footer = document.querySelector<HTMLElement>('.joker-game-footer-rail');
  const anchor = findLayoutAnchor();
  const layoutObserver = new ResizeObserver(run);

  if (footer) layoutObserver.observe(footer);
  findTopRails().forEach((rail) => layoutObserver.observe(rail));
  if (anchor) layoutObserver.observe(anchor);

  window.addEventListener('resize', run, { passive: true });
  window.addEventListener('scroll', run, { passive: true, capture: true });

  const scrollContainers = findScrollContainers();
  scrollContainers.forEach((scroller) => {
    scroller.addEventListener('scroll', run, { passive: true });
  });

  return () => {
    dockObserver.disconnect();
    layoutObserver.disconnect();
    window.removeEventListener('resize', run);
    window.removeEventListener('scroll', run, { capture: true });
    scrollContainers.forEach((scroller) => {
      scroller.removeEventListener('scroll', run);
    });
    clearBetSlipDockLayout(dock);
  };
}
