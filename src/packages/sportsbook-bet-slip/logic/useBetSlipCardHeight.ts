import { useLayoutEffect, type RefObject } from 'react';
import { animateBetSlipCardHeight } from './animateBetSlipCardHeight';

export function useBetSlipCardHeight(
  cardRef: RefObject<HTMLDivElement | null>,
  dockRef: RefObject<HTMLElement | null>,
  fromHeightRef: RefObject<number | null>,
  trigger: unknown,
) {
  useLayoutEffect(() => {
    const card = cardRef.current;
    const fromHeight = fromHeightRef.current;
    if (!card || fromHeight == null) return;

    fromHeightRef.current = null;
    animateBetSlipCardHeight(card, fromHeight, dockRef.current?.clientHeight);
  }, [cardRef, dockRef, fromHeightRef, trigger]);
}
