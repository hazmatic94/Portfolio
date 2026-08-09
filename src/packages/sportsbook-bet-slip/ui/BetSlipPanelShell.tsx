import { Children, isValidElement, useRef, type ReactNode } from 'react';
import ScrollCue from './ScrollCue';
import { betSlipListItemClass } from './betSlipListItemClass';
import styles from './BetSlipPanelShell.module.css';

type BetSlipPanelShellProps = {
  header: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  getItemClassName?: (index: number) => string | undefined;
};

export default function BetSlipPanelShell({
  header,
  footer,
  children,
  getItemClassName,
}: BetSlipPanelShellProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  return (
    <div className={styles.root}>
      {header}

      <div className={styles.listSection}>
        <div className={styles.listFrame}>
          <div className={styles.list} ref={listRef}>
            {items.map((child, index) => {
              if (!isValidElement(child)) {
                return child;
              }

              return (
                <div
                  key={child.key ?? index}
                  className={[
                    betSlipListItemClass(index, items.length, {
                      listItem: styles.listItem,
                      listItemBordered: styles.listItemBordered,
                    }),
                    getItemClassName?.(index),
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {child}
                </div>
              );
            })}
          </div>
          <ScrollCue scrollerRef={listRef} />
        </div>
      </div>

      {footer}
    </div>
  );
}
