import { useState, useRef, useCallback } from 'react';

export function useOverscanRowCount(initialValue = 10) {
  const [overscanRowCount, setOverscanRowCount] = useState(initialValue);
  const prevScrollTopRef = useRef(0);

  const updateOverscan = useCallback((scrollTop: number) => {
    setOverscanRowCount((current) => {
      if (scrollTop > prevScrollTopRef.current) {
        prevScrollTopRef.current = scrollTop;
        return current === 10 ? current : 10;
      } else {
        prevScrollTopRef.current = scrollTop;
        return current === 1 ? current : 1;
      }
    });
  }, []);

  return { overscanRowCount, updateOverscan };
}
