import { useEffect, useRef, useState } from 'react';

/** Scale bump when a new selection is added (`addedId` changes to a new non-null id). */
export function useSelectionAddedBump(addedId: string | null) {
  const prevAddedId = useRef<string | null>(null);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (addedId && addedId !== prevAddedId.current) {
      setBump(true);
    }
    prevAddedId.current = addedId;
  }, [addedId]);

  const onBumpEnd = () => setBump(false);

  return { bump, onBumpEnd };
}
