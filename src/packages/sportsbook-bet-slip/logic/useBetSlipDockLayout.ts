import { useLayoutEffect, type RefObject } from 'react';
import { clearBetSlipDockLayout, observeBetSlipDockLayout, syncBetSlipDockLayout } from './syncBetSlipDockLayout';

type UseBetSlipDockLayoutInput = {
  dockRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  selectionCount: number;
  expanded: boolean;
  phase: string;
};

export function useBetSlipDockLayout({
  dockRef,
  enabled,
  selectionCount,
  expanded,
  phase,
}: UseBetSlipDockLayoutInput) {
  useLayoutEffect(() => {
    const dock = dockRef.current;
    const shell = document.querySelector<HTMLElement>('[data-sportsbook-shell]');

    if (!dock) return;

    if (!enabled || !shell) {
      clearBetSlipDockLayout(dock);
      return;
    }

    const sync = () => syncBetSlipDockLayout(dock, shell);
    return observeBetSlipDockLayout(dock, shell, sync);
  }, [dockRef, enabled, selectionCount, expanded, phase]);
}
