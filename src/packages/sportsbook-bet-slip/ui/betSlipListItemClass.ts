export function betSlipListItemClass(
  index: number,
  total: number,
  styles: Record<'listItem' | 'listItemBordered', string>,
) {
  return index < total - 1 ? styles.listItemBordered : styles.listItem;
}
