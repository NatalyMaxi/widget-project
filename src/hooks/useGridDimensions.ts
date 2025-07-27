import { useWindowWidth } from './useWindowWidth';
import { useWindowHeight } from './useWindowHeight';
import { WIDGET_WIDTH, WIDGET_HEIGHT, GAP, SCROLLBAR_WIDTH, PAGE_PADDING_BLOCK } from '@/constants/layout';
import { getPagePadding } from '@/utils/getPagePadding';

interface GridDimensions {
  columnCount: number;
  rowCount: number;
  gridWidth: number;
  gridHeight: number;
}

/**
 * Хук для вычисления размеров и параметров сетки с виджетами.
 *
 * Вычисляет количество колонок и строк, ширину и высоту контейнера,
 * с учётом размеров окна, горизонтальных и вертикальных паддингов,
 * отступов между ячейками и запаса под горизонтальный скролл.
 *
 * - gridWidth ограничивает ширину контейнера и включает место под скролл.
 * - gridHeight ограничивает высоту, вмещающую видимые ряды.
 * - rowCount указывает общее число строк, необходимое для всех виджетов (включая те, что не помещаются).
 *
 * @param widgetsLength - Общее количество виджетов для отображения в сетке.
 * @returns {GridDimensions} - Объект с параметрами сетки:
 *   - columnCount: количество колонок
 *   - rowCount: общее количество строк (для виртуализации)
 *   - gridWidth: ширина контейнера сетки
 *   - gridHeight: высота контейнера сетки
 */
export const useGridDimensions = (widgetsLength: number): GridDimensions => {
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();

  if (windowWidth === null || windowHeight === null) {
    return { columnCount: 0, rowCount: 0, gridWidth: 0, gridHeight: 0 };
  }

  const PAGE_PADDING = getPagePadding(windowWidth);

  // --- Ширина сетки ---
  const containerWidth = windowWidth - PAGE_PADDING;
  const scrollBarSpace = SCROLLBAR_WIDTH;
  const availableWidth = containerWidth - scrollBarSpace;

  const columnCount = Math.floor(availableWidth / (WIDGET_WIDTH + GAP));
  const baseGridWidth = columnCount * (WIDGET_WIDTH + GAP);
  const gridWidth = baseGridWidth + scrollBarSpace;

  // --- Высота сетки ---
  const availableHeight = windowHeight - PAGE_PADDING_BLOCK * 2;
  const visibleRowCount = Math.floor(availableHeight / (WIDGET_HEIGHT + GAP));

  const rowCount = Math.ceil(widgetsLength / columnCount);
  const gridHeight = visibleRowCount * (WIDGET_HEIGHT + GAP);

  return { columnCount, rowCount, gridWidth, gridHeight };
};
