import { useWindowWidth } from './useWindowWidth';
import { WIDGET_WIDTH, GAP, SCROLLBAR_WIDTH, WIDGET_HEIGHT } from '@/constants/layout';
import { getPagePadding } from '@/utils/getPagePadding';

interface GridDimensions {
  columnCount: number;
  rowCount: number;
  gridWidth: number;
  gridHeight: number;
}

/**
 * Хук для вычисления размеров и параметров сетки с виджетами.
 * Рассчитывает количество колонок, строк, ширину и высоту сетки,
 * учитывая ширину окна, паддинги, отступы и место под скролл.
 *
 * @param widgetsLength - Количество виджетов для отображения в сетке.
 * @returns {GridDimensions} - Объект с параметрами сетки:
 *   - columnCount: количество колонок
 *   - rowCount: количество строк
 *   - gridWidth: ширина контейнера сетки с учётом скролла
 *   - gridHeight: высота контейнера сетки
 */
export const useGridDimensions = (widgetsLength: number): GridDimensions => {
  const windowWidth = useWindowWidth();

  if (windowWidth === null) {
    return { columnCount: 0, rowCount: 0, gridWidth: 0, gridHeight: 0 };
  }

  const PAGE_PADDING = getPagePadding(windowWidth);

  const containerWidth = windowWidth - PAGE_PADDING;

  const scrollBarSpace = SCROLLBAR_WIDTH;

  const availableWidth = containerWidth - scrollBarSpace;

  const columnCount = Math.floor(availableWidth / (WIDGET_WIDTH + GAP));

  const baseGridWidth = columnCount * (WIDGET_WIDTH + GAP);

  const gridWidth = baseGridWidth + scrollBarSpace;

  const rowCount = Math.ceil(widgetsLength / columnCount);

  const minRowsVisible = 10;
  const calculatedGridHeight = minRowsVisible * (WIDGET_HEIGHT + GAP) - GAP;
  const gridHeight = Math.max(calculatedGridHeight, window.innerHeight - 40);

  return { columnCount, rowCount, gridWidth, gridHeight };
};
