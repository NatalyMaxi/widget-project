import { useRef, useCallback, useEffect } from 'react';

export function useDebouncedCallback<Args extends unknown[] = unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  const timer = useRef<number | undefined>(undefined);

  const debouncedCallback = useCallback(
    (...args: Args) => {
      if (timer.current !== undefined) {
        clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timer.current !== undefined) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return debouncedCallback;
}
