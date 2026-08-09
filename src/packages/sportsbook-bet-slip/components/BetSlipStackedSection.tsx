import { Fragment } from 'react';
import type { BetSlipSelection } from '../logic/types';
import { formatStackedLeg } from '../logic/formatStackedLeg';
import { useSelectionAddedBump } from '../logic/useBumpOnIncrement';
import BetSlipCountBadge from './BetSlipCountBadge';
import motion from './betSlipSelectionMotion.module.css';
import styles from './BetSlipStackedSection.module.css';

const OVERFLOW_PILL_THRESHOLD = 2;

type BetSlipStackedSectionProps = {
  selections: BetSlipSelection[];
  lastAddedSelectionId: string | null;
  onExpandClick?: () => void;
};

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m6 14 6-6 6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function BetSlipStackedSection({
  selections,
  lastAddedSelectionId,
  onExpandClick,
}: BetSlipStackedSectionProps) {
  const overflowCount = selections.length - OVERFLOW_PILL_THRESHOLD;
  const { bump: overflowBump, onBumpEnd: onOverflowBumpEnd } =
    useSelectionAddedBump(overflowCount > 0 ? lastAddedSelectionId : null);

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.header}>
          <BetSlipCountBadge
            count={selections.length}
            addedId={lastAddedSelectionId}
            className={styles.countBadge}
          />
          <span className={styles.title}>Selections</span>
        </div>
        <p className={styles.summary}>
          <span className={styles.summaryText}>
            {selections.map((selection, index) => (
              <Fragment key={selection.id}>
                {index > 0 ? <span className={styles.summarySep}> • </span> : null}
                <span
                  className={
                    selection.id === lastAddedSelectionId ? motion.legHighlight : undefined
                  }
                >
                  {formatStackedLeg(selection)}
                </span>
              </Fragment>
            ))}
          </span>
          {overflowCount > 0 ? (
            <span
              className={[styles.overflowPill, overflowBump ? motion.overflowBump : '']
                .filter(Boolean)
                .join(' ')}
              onAnimationEnd={overflowBump ? onOverflowBumpEnd : undefined}
            >
              +{overflowCount}
            </span>
          ) : null}
        </p>
      </div>
      <button
        type="button"
        className={styles.expand}
        aria-label="Expand selections"
        onClick={onExpandClick}
      >
        <ChevronUpIcon />
      </button>
    </div>
  );
}
