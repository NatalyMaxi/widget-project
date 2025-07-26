import { useEffect, useState } from 'react';

interface UseChunkedRenderingParams {
  itemsLength: number;
  chunkSize: number;
  chunkDelay?: number;
}

export function useChunkedRendering({ itemsLength, chunkSize, chunkDelay = 0 }: UseChunkedRenderingParams) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [allRendered, setAllRendered] = useState(false);

  useEffect(() => {
    if (itemsLength === 0) {
      setVisibleCount(0);
      setAllRendered(false);
      return;
    }

    let index = 0;
    setVisibleCount(0);
    setAllRendered(false);

    const renderChunk = () => {
      setVisibleCount((prev) => {
        const next = Math.min(prev + chunkSize, itemsLength);
        if (next === itemsLength) {
          setAllRendered(true);
        }
        return next;
      });

      index += chunkSize;
      if (index < itemsLength) {
        setTimeout(renderChunk, chunkDelay);
      }
    };

    renderChunk();
  }, [itemsLength, chunkSize, chunkDelay]);

  return { visibleCount, allRendered };
}
