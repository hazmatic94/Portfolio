import { useSelectionAddedBump } from '../logic/useBumpOnIncrement';
import motion from './betSlipSelectionMotion.module.css';

type BetSlipCountBadgeProps = {
  count: number;
  addedId: string | null;
  className?: string;
};

export default function BetSlipCountBadge({ count, addedId, className }: BetSlipCountBadgeProps) {
  const { bump, onBumpEnd } = useSelectionAddedBump(addedId);

  return (
    <span
      className={[className, bump ? motion.countBump : ''].filter(Boolean).join(' ')}
      onAnimationEnd={bump ? onBumpEnd : undefined}
    >
      {count}
    </span>
  );
}
