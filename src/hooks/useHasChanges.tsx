import { isEqual } from "lodash";
import { useCallback, useRef } from "react";

export function useHasChanges<T>(initialData: T, currentData: T) {
  const initialDataRef = useRef<T>(initialData);

  const hasChanges = !isEqual(currentData, initialDataRef.current);

  const resetInitial = (data: T) => {
    initialDataRef.current = data;
  };

  return { hasChanges, resetInitial };
}
