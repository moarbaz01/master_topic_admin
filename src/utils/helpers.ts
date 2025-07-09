type ChangeHandler<T> = (key: keyof T, value: T[keyof T]) => void;

export function createHandleChange<T>(setState: React.Dispatch<React.SetStateAction<Partial<T>>>): ChangeHandler<T> {
  return (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
}
