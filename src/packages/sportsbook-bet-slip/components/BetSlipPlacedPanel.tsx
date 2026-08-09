import { Button } from '@joker/design-system';
import { computeBetSlipTotals } from '../logic/payout';
import { getStakeForSelection } from '../logic/stakes';
import type { BetSlipSelection } from '../logic/types';
import BetSlipExpandedLeg from './BetSlipExpandedLeg';
import BetSlipCoinAmount from '../ui/BetSlipCoinAmount';
import BetSlipIconButton from '../ui/BetSlipIconButton';
import BetSlipPanelShell from '../ui/BetSlipPanelShell';
import shellStyles from '../ui/BetSlipPanelShell.module.css';
import styles from './BetSlipPlacedPanel.module.css';

type BetSlipPlacedPanelProps = {
  selections: BetSlipSelection[];
  stake: string;
  legStakes: Record<string, string>;
  betRefs: Record<string, string>;
  onClose: () => void;
};

function PlacedCheckIcon() {
  return (
    <span className={styles.placedIcon} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="10" fill="var(--joker-green-400)" />
        <path
          d="m7.5 12.2 2.8 2.8 6.2-6.4"
          fill="none"
          stroke="var(--joker-black-900)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

export default function BetSlipPlacedPanel({
  selections,
  stake,
  legStakes,
  betRefs,
  onClose,
}: BetSlipPlacedPanelProps) {
  const stakeState = {
    stake,
    legStakes,
    selectionCount: selections.length,
  };
  const { totalStake, totalReturn } = computeBetSlipTotals(selections, stake, legStakes);

  return (
    <BetSlipPanelShell
      header={
        <header className={styles.header}>
          <div className={styles.headerLeading}>
            <PlacedCheckIcon />
            <span className={styles.title}>Bet Placed</span>
          </div>
          <BetSlipIconButton label="Close bet slip" onClick={onClose} />
        </header>
      }
      footer={
        <>
          <footer className={styles.summary}>
            <div className={styles.summaryCell}>
              <span className={styles.summaryLabel}>Stake</span>
              <BetSlipCoinAmount
                amount={totalStake}
                className={styles.summaryValue}
                valueClassName={styles.summaryValueText}
              />
            </div>
            <div className={styles.summaryCell}>
              <span className={styles.summaryLabel}>Total Potential Return</span>
              <BetSlipCoinAmount
                amount={totalReturn}
                className={styles.summaryValue}
                valueClassName={styles.summaryValueText}
              />
            </div>
          </footer>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="ghost"
              fullWidth
              className={shellStyles.actionButton}
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </>
      }
    >
      {selections.map((selection) => (
        <BetSlipExpandedLeg
          key={selection.id}
          selection={selection}
          phase="placed"
          stake={getStakeForSelection(selection.id, stakeState)}
          betRef={betRefs[selection.id] ?? ''}
        />
      ))}
    </BetSlipPanelShell>
  );
}
