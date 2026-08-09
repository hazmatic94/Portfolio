const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateBetRef(selectionId: string): string {
  let hash = 0;
  for (let i = 0; i < selectionId.length; i++) {
    hash = (hash * 31 + selectionId.charCodeAt(i)) >>> 0;
  }

  let suffix = '';
  for (let i = 0; i < 10; i++) {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    suffix += REF_CHARS[hash % REF_CHARS.length];
  }

  return `KJ${suffix}`;
}
