import { useCallback } from "react"

type ChangeHandler<T> = (key: keyof T, value: T[keyof T]) => void

export function useChangeHandler<T>(
  setState: React.Dispatch<React.SetStateAction<Partial<T>>>
): ChangeHandler<T> {
  return useCallback((key: keyof T, value: T[keyof T]) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [setState])
}
