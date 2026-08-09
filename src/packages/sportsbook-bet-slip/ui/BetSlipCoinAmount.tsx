import jokerCoinSrc from '@joker/design-system/assets/jokerCoin.svg';
import styles from './BetSlipCoinAmount.module.css';

type BetSlipCoinAmountProps = {
  amount: string;
  coinSize?: 'sm' | 'md';
  className?: string;
  valueClassName?: string;
};

export default function BetSlipCoinAmount({
  amount,
  coinSize = 'md',
  className,
  valueClassName,
}: BetSlipCoinAmountProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <img
        src={jokerCoinSrc}
        alt=""
        className={coinSize === 'sm' ? styles.coinSm : styles.coinMd}
      />
      <span className={[styles.value, valueClassName].filter(Boolean).join(' ')}>{amount}</span>
    </div>
  );
}
