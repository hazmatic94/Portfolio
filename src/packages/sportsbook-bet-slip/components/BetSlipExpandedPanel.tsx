import { Button } from '@joker/design-system';
import type { BetSlipPhase } from '../logic/BetSlipContext';
import { allSelectionsHaveStakes } from '../logic/payout';
import type { BetSlipSelection } from '../logic/types';
import { useWallet } from '../logic/useWallet';
import BetSlipCountBadge from './BetSlipCountBadge';
import BetSlipExpandedLeg from './BetSlipExpandedLeg';
import BetSlipCoinAmount from '../ui/BetSlipCoinAmount';
import BetSlipIconButton from '../ui/BetSlipIconButton';
import BetSlipPanelShell from '../ui/BetSlipPanelShell';
import shellStyles from '../ui/BetSlipPanelShell.module.css';
import motion from './betSlipSelectionMotion.module.css';
import styles from './BetSlipExpandedPanel.module.css';

type BetSlipExpandedPanelProps = {
  selections: BetSlipSelection[];
  phase: BetSlipPhase;
  legStakes: Record<string, string>;
  lastAddedSelectionId: string | null;
  onLegStakeChange: (id: string, value: string) => void;
  onRemoveSelection: (id: string) => void;
  onCollapse: () => void;
  onContinue: () => void;
  onConfirm: () => void;
};

export default function BetSlipExpandedPanel({
  selections,
  phase,
  legStakes,
  lastAddedSelectionId,
  onLegStakeChange,
  onRemoveSelection,
  onCollapse,
  onContinue,
  onConfirm,
}: BetSlipExpandedPanelProps) {
  const { balance } = useWallet();
  const isConfirm = phase === 'confirm';
  const canContinue = allSelectionsHaveStakes(selections, legStakes);

  return (
    <BetSlipPanelShell
      getItemClassName={(index) =>
        selections[index]?.id === lastAddedSelectionId ? motion.legRowHighlight : undefined
      }
      header={
        <header className={styles.header}>
          <div className={styles.headerLeading}>
            {!isConfirm ? (
              <BetSlipCountBadge
                count={selections.length}
                addedId={lastAddedSelectionId}
                className={styles.countBadge}
              />
            ) : null}
            <span className={styles.title}>{isConfirm ? 'Confirm bet' : 'Selections'}</span>
          </div>
          <div className={styles.headerTrailing}>
            <div className={styles.balance}>
              <span className={styles.balanceLabel}>Balance</span>
              <BetSlipCoinAmount
                amount={balance}
                coinSize="sm"
                className={styles.balanceValue}
                valueClassName={styles.balanceValueText}
              />
            </div>
            <BetSlipIconButton label="Collapse selections" onClick={onCollapse} />
          </div>
        </header>
      }
      footer={
        <div className={styles.footer}>
          <Button
            type="button"
            variant="primary"
            fullWidth
            className={shellStyles.actionButton}
            disabled={!isConfirm && !canContinue}
            onClick={isConfirm ? onConfirm : onContinue}
          >
            {isConfirm ? 'Place bet' : 'Continue'}
          </Button>
        </div>
      }
    >
      {selections.map((selection) => (
        <BetSlipExpandedLeg
          key={selection.id}
          selection={selection}
          phase={isConfirm ? 'confirm' : 'stakes'}
          stake={legStakes[selection.id] ?? ''}
          onStakeChange={(value) => onLegStakeChange(selection.id, value)}
          onRemove={() => onRemoveSelection(selection.id)}
        />
      ))}
    </BetSlipPanelShell>
  );
}
