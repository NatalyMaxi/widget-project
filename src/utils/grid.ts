import { BASE_CONTAINER_WIDTH, COLUMN_STEP, BASE_COLUMNS, STEP_COLUMNS } from '@/constants/grid';

/**
 * Рассчитывает количество колонок по ширине контейнера (без учёта паддингов страницы и скролла)
 * @param containerWidth - ширина контейнера (без паддингов страницы и скролла)
 * @returns { columns: number }
 */
export const getGridConfig = (containerWidth: number) => {
  if (containerWidth <= BASE_CONTAINER_WIDTH) {
    return { columns: BASE_COLUMNS };
  }

  const steps = Math.floor((containerWidth - BASE_CONTAINER_WIDTH) / COLUMN_STEP);
  const columns = BASE_COLUMNS + steps * STEP_COLUMNS;

  return { columns };
};
