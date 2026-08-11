import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  type ReactNode,
} from 'react';
import { applyPhaseAction, type BetSlipPhase, type BetSlipPhaseAction } from './phase';
import type { BetSlipSelection } from './types';
import { generateBetRef } from './betRef';

export type { BetSlipPhase } from './phase';

type BetSlipContextValue = {
  selections: BetSlipSelection[];
  phase: BetSlipPhase;
  stake: string;
  legStakes: Record<string, string>;
  betRefs: Record<string, string>;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  dispatchPhaseAction: (action: BetSlipPhaseAction) => void;
  setStake: (value: string) => void;
  setLegStake: (id: string, value: string) => void;
  placeBets: () => void;
  toggleSelection: (selection: BetSlipSelection) => void;
  removeSelection: (id: string) => void;
  clearSelections: () => void;
  lastAddedSelectionId: string | null;
};

const BetSlipContext = createContext<BetSlipContextValue | null>(null);

export function BetSlipProvider({
  children,
  maxSelections,
}: {
  children: ReactNode;
  maxSelections?: number;
}) {
  const [selections, setSelections] = useState<BetSlipSelection[]>([]);
  const [phase, setPhase] = useState<BetSlipPhase>('stakes');
  const [stake, setStake] = useState('');
  const [legStakes, setLegStakes] = useState<Record<string, string>>({});
  const [betRefs, setBetRefs] = useState<Record<string, string>>({});
  const [lastAddedSelectionId, setLastAddedSelectionId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const selectionsRef = useRef(selections);
  selectionsRef.current = selections;
  const maxSelectionsRef = useRef(maxSelections);
  maxSelectionsRef.current = maxSelections;

  useEffect(() => {
    if (maxSelections == null) return;
    const current = selectionsRef.current;
    if (current.length <= maxSelections) return;
    const trimmed = current.slice(0, maxSelections);
    const kept = new Set(trimmed.map((selection) => selection.id));
    setSelections(trimmed);
    setLegStakes((legs) => {
      const next: Record<string, string> = {};
      for (const id of kept) {
        if (legs[id] != null) next[id] = legs[id];
      }
      return next;
    });
    setExpanded(false);
  }, [maxSelections]);

  useEffect(() => {
    if (!lastAddedSelectionId) return;
    const timer = window.setTimeout(() => setLastAddedSelectionId(null), 480);
    return () => window.clearTimeout(timer);
  }, [lastAddedSelectionId]);

  const resetPhase = useCallback(() => {
    setPhase('stakes');
  }, []);

  const dispatchPhaseAction = useCallback((action: BetSlipPhaseAction) => {
    setPhase((current) => applyPhaseAction(current, action) ?? current);
  }, []);

  const setLegStake = useCallback((id: string, value: string) => {
    setLegStakes((current) => ({ ...current, [id]: value }));
  }, []);

  const toggleSelection = useCallback((next: BetSlipSelection) => {
    resetPhase();
    const existing = selectionsRef.current.find((item) => item.id === next.id);
    if (existing) {
      setLastAddedSelectionId(null);
      setSelections((current) => current.filter((item) => item.id !== next.id));
      return;
    }
    setLastAddedSelectionId(next.id);
    const cap = maxSelectionsRef.current;
    setSelections((current) => {
      if (cap === 1) {
        return [next];
      }
      if (cap != null && current.length >= cap) {
        return current;
      }
      return [...current, next];
    });
    if (maxSelectionsRef.current === 1) {
      setLegStakes({});
      setStake('');
    }
  }, [resetPhase]);

  const removeSelection = useCallback((id: string) => {
    setLastAddedSelectionId(null);
    resetPhase();
    setSelections((current) => current.filter((item) => item.id !== id));
    setLegStakes((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setBetRefs((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, [resetPhase]);

  const placeBets = useCallback(() => {
    setBetRefs((current) => {
      const next = { ...current };
      selections.forEach((selection) => {
        next[selection.id] = generateBetRef(selection.id);
      });
      return next;
    });
    dispatchPhaseAction('place');
  }, [dispatchPhaseAction, selections]);

  const clearSelections = useCallback(() => {
    setLastAddedSelectionId(null);
    setSelections([]);
    setStake('');
    setLegStakes({});
    setBetRefs({});
    setPhase('stakes');
    setExpanded(false);
  }, []);

  const value = useMemo(
    () => ({
      selections,
      phase,
      stake,
      legStakes,
      betRefs,
      expanded,
      setExpanded,
      dispatchPhaseAction,
      setStake,
      setLegStake,
      placeBets,
      toggleSelection,
      removeSelection,
      clearSelections,
      lastAddedSelectionId,
    }),
    [
      selections,
      phase,
      stake,
      legStakes,
      betRefs,
      expanded,
      lastAddedSelectionId,
      dispatchPhaseAction,
      setLegStake,
      placeBets,
      toggleSelection,
      removeSelection,
      clearSelections,
    ],
  );

  return <BetSlipContext.Provider value={value}>{children}</BetSlipContext.Provider>;
}

export function useBetSlip() {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error('useBetSlip must be used within BetSlipProvider');
  }
  return context;
}
