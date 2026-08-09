import { BetAmountInput } from '@joker/design-system';
import jokerCoinSrc from '@joker/design-system/assets/jokerCoin.svg';
import type { BetSlipPhase } from '../logic/BetSlipContext';
import { displayMarketType } from '../logic/displayMarketType';
import { formatStakeDisplay, potentialReturns } from '../logic/payout';
import type { BetSlipSelection } from '../logic/types';
import BetSlipCoinAmount from '../ui/BetSlipCoinAmount';
import BetSlipIconButton from '../ui/BetSlipIconButton';
import styles from './BetSlipExpandedLeg.module.css';

type BetSlipExpandedLegBaseProps = {
  selection: BetSlipSelection;
  stake: string;
};

type BetSlipExpandedLegEditableProps = BetSlipExpandedLegBaseProps & {
  phase: Extract<BetSlipPhase, 'stakes' | 'confirm'>;
  onStakeChange: (value: string) => void;
  onRemove: () => void;
};

type BetSlipExpandedLegPlacedProps = BetSlipExpandedLegBaseProps & {
  phase: 'placed';
  betRef: string;
};

type BetSlipExpandedLegProps = BetSlipExpandedLegEditableProps | BetSlipExpandedLegPlacedProps;

export default function BetSlipExpandedLeg(props: BetSlipExpandedLegProps) {
  const { selection, stake, phase } = props;
  const marketLabel = displayMarketType(selection.marketType);
  const isReview = phase === 'confirm' || phase === 'placed';
  const isPlaced = phase === 'placed';

  return (
    <div
      className={`${styles.root} ${isReview ? styles.rootConfirm : ''} ${isPlaced ? styles.rootPlaced : ''}`}
    >
      <div className={styles.body}>
        {isPlaced ? null : (
          <BetSlipIconButton
            className={styles.remove}
            label="Remove selection"
            onClick={props.onRemove}
          />
        )}
        <span className={styles.teamName}>{selection.teamName}</span>
        <span className={styles.odds}>{selection.odds}</span>
        <p className={styles.market}>
          <span>{marketLabel}</span>
          <span className={styles.marketDivider} aria-hidden="true" />
          <span>{selection.selection}</span>
        </p>
        <p className={styles.matchup}>{selection.matchup}</p>
      </div>
      {isReview ? (
        <>
          {!isPlaced ? (
            <>
              <BetSlipCoinAmount
                amount={formatStakeDisplay(stake)}
                coinSize="sm"
                className={styles.stakeDisplay}
                valueClassName={styles.stakeDisplayValue}
              />
              <div className={styles.returnsBlock}>
                <span className={styles.returnsLabel}>Potential Returns</span>
                <BetSlipCoinAmount
                  amount={potentialReturns(stake, selection.odds)}
                  coinSize="sm"
                  className={styles.returnsValue}
                  valueClassName={styles.returnsValueText}
                />
              </div>
            </>
          ) : null}
          {isPlaced && props.betRef ? <p className={styles.betRef}>Bet Ref: {props.betRef}</p> : null}
        </>
      ) : (
        <BetAmountInput
          className={styles.stakeField}
          label=""
          placeholder="0"
          prefix={<img src={jokerCoinSrc} alt="" />}
          value={stake}
          onValueChange={props.onStakeChange}
        />
      )}
    </div>
  );
}
