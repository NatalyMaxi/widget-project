import { useEffect, useState } from 'react';

export const useWindowHeight = (): number | null => {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight);

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return height;
};
