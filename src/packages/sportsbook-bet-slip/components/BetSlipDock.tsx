import { BetAmountInput, BetSlipRow, Button } from '@joker/design-system';
import jokerCoinSrc from '@joker/design-system/assets/jokerCoin.svg';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useBetSlip } from '../logic/BetSlipContext';
import { hasPositiveStake } from '../logic/payout';
import { useBetSlipCardHeight } from '../logic/useBetSlipCardHeight';
import { useBetSlipDockLayout } from '../logic/useBetSlipDockLayout';
import { useBetSlipView } from '../logic/useBetSlipView';
import BetSlipExpandedLeg from './BetSlipExpandedLeg';
import BetSlipExpandedPanel from './BetSlipExpandedPanel';
import BetSlipPlacedPanel from './BetSlipPlacedPanel';
import BetSlipStackedSection from './BetSlipStackedSection';
import styles from './BetSlipDock.module.css';

export type BetSlipDockPlacement = 'fixed' | 'embedded';

type BetSlipDockProps = {
  placement?: BetSlipDockPlacement;
};

export default function BetSlipDock({ placement = 'fixed' }: BetSlipDockProps) {
  const {
    selections,
    phase,
    dispatchPhaseAction,
    stake,
    setStake,
    legStakes,
    setLegStake,
    removeSelection,
    betRefs,
    placeBets,
    clearSelections,
    lastAddedSelectionId,
    expanded,
    setExpanded,
  } = useBetSlip();
  const dockRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const heightAnimFromRef = useRef<number | null>(null);
  const hasSelections = selections.length > 0;
  const singleSelection = selections.length === 1 ? selections[0] : null;
  const { view, isPlaced, isConfirm, isStacked } = useBetSlipView({
    selectionCount: selections.length,
    phase,
    expanded,
  });

  useEffect(() => {
    if (!isStacked) {
      setExpanded(false);
    }
  }, [isStacked, setExpanded]);

  const captureCardHeight = () => {
    const card = cardRef.current;
    if (card) {
      heightAnimFromRef.current = card.getBoundingClientRect().height;
    }
  };

  const handleExpand = () => {
    captureCardHeight();
    setExpanded(true);
  };

  const handleCollapse = () => {
    captureCardHeight();
    setExpanded(false);
    if (phase === 'confirm') {
      dispatchPhaseAction('back');
    }
  };

  const handleContinue = () => {
    captureCardHeight();
    dispatchPhaseAction('continue');
  };

  const handleConfirm = () => {
    captureCardHeight();
    placeBets();
  };

  const handleClosePlaced = () => {
    clearSelections();
  };

  const isEmbedded = placement === 'embedded';

  useBetSlipCardHeight(cardRef, dockRef, heightAnimFromRef, `${expanded}:${phase}`);
  useBetSlipDockLayout({
    dockRef,
    enabled: hasSelections && !isEmbedded,
    selectionCount: selections.length,
    expanded,
    phase,
  });

  if (!hasSelections) {
    return null;
  }

  const canContinueSingle = hasPositiveStake(stake);

  const dock = (
    <aside
      ref={dockRef}
      className={`${styles.dock} ${isEmbedded ? styles.dockEmbedded : ''}`}
      aria-label="Bet slip"
    >
      <div
        ref={cardRef}
        className={`${styles.card} ${expanded || isPlaced ? styles.cardExpanded : ''}`}
        data-betslip-view={view}
      >
        {isPlaced ? (
          <div className={styles.viewEnterExpanded}>
            <BetSlipPlacedPanel
              selections={selections}
              stake={stake}
              legStakes={legStakes}
              betRefs={betRefs}
              onClose={handleClosePlaced}
            />
          </div>
        ) : isStacked && expanded ? (
          <div className={styles.viewEnterExpanded}>
            <BetSlipExpandedPanel
              selections={selections}
              phase={phase}
              legStakes={legStakes}
              lastAddedSelectionId={lastAddedSelectionId}
              onLegStakeChange={setLegStake}
              onRemoveSelection={removeSelection}
              onCollapse={handleCollapse}
              onContinue={handleContinue}
              onConfirm={handleConfirm}
            />
          </div>
        ) : (
          <>
            <div
              className={`${styles.selectionSection} ${isStacked ? styles.selectionSectionStacked : ''} ${isConfirm ? styles.selectionSectionConfirm : ''}`}
            >
              {isConfirm && !isStacked ? (
                <div className={styles.confirmHeader}>
                  <span className={styles.confirmTitle}>Confirm bet</span>
                </div>
              ) : null}
              <div
                key={isStacked ? 'stacked' : isConfirm ? 'confirm' : 'single'}
                className={styles.viewEnter}
              >
                {isStacked ? (
                  <BetSlipStackedSection
                    selections={selections}
                    lastAddedSelectionId={lastAddedSelectionId}
                    onExpandClick={handleExpand}
                  />
                ) : isConfirm && singleSelection ? (
                  <BetSlipExpandedLeg
                    selection={singleSelection}
                    phase="confirm"
                    stake={stake}
                    onStakeChange={setStake}
                    onRemove={() => removeSelection(singleSelection.id)}
                  />
                ) : singleSelection ? (
                  <BetSlipRow
                    teamName={singleSelection.teamName}
                    odds={singleSelection.odds}
                    marketType={singleSelection.marketType}
                    selection={singleSelection.selection}
                    matchup={singleSelection.matchup}
                    onRemove={() => removeSelection(singleSelection.id)}
                  />
                ) : null}
              </div>
            </div>
            <div className={styles.actionsWrap} data-open={!isStacked}>
              <div className={styles.actions} data-confirm={isConfirm}>
                {!isConfirm ? (
                  <div className={styles.stakeCell}>
                    <BetAmountInput
                      className={styles.stakeField}
                      label=""
                      placeholder="Set stake"
                      prefix={<img src={jokerCoinSrc} alt="" />}
                      value={stake}
                      onValueChange={setStake}
                      fullWidth
                    />
                  </div>
                ) : null}
                <div className={styles.placeBetCell}>
                  <Button
                    type="button"
                    variant="primary"
                    fullWidth
                    className={styles.placeBet}
                    disabled={!isConfirm && !canContinueSingle}
                    onClick={isConfirm ? handleConfirm : handleContinue}
                  >
                    {isConfirm ? 'Place bet' : 'Continue'}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );

  if (isEmbedded) {
    return dock;
  }

  return createPortal(dock, document.body);
}
