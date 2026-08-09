function clearCardHeightStyles(card: HTMLElement) {
  card.style.height = '';
  card.style.overflow = '';
  card.style.transition = '';
}

export function animateBetSlipCardHeight(
  card: HTMLElement,
  fromHeight: number,
  maxHeight?: number,
): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  card.style.height = `${fromHeight}px`;
  card.style.overflow = 'hidden';

  card.style.height = 'auto';
  let toHeight = card.offsetHeight;
  card.style.height = `${fromHeight}px`;

  if (maxHeight != null) {
    toHeight = Math.min(toHeight, maxHeight);
  }

  if (Math.abs(toHeight - fromHeight) < 2) {
    clearCardHeightStyles(card);
    return;
  }

  requestAnimationFrame(() => {
    card.style.transition = 'height var(--motion-medium) var(--ease-out)';
    card.style.height = `${toHeight}px`;
  });

  const onEnd = (event: TransitionEvent) => {
    if (event.target !== card || event.propertyName !== 'height') return;
    clearCardHeightStyles(card);
    card.removeEventListener('transitionend', onEnd);
  };

  card.addEventListener('transitionend', onEnd);
}
