import type { ButtonHTMLAttributes, ReactNode } from 'react';
import BetSlipCloseIcon from './BetSlipCloseIcon';
import styles from './BetSlipIconButton.module.css';

type BetSlipIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children?: ReactNode;
};

export default function BetSlipIconButton({
  label,
  children,
  className,
  type = 'button',
  ...props
}: BetSlipIconButtonProps) {
  return (
    <button
      type={type}
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-label={label}
      {...props}
    >
      {children ?? <BetSlipCloseIcon />}
    </button>
  );
}
