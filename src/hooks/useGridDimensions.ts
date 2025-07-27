import { useWindowWidth } from './useWindowWidth';
import { WIDGET_WIDTH, GAP, SCROLLBAR_WIDTH, WIDGET_HEIGHT, PAGE_PADDING } from '@/constants/layout';
import { getGridConfig } from '@/utils/grid';

interface GridDimensions {
  columnCount: number;
  rowCount: number;
  gridWidth: number;
  gridHeight: number;
}

/**
 * Хук для вычисления размеров и параметров сетки с виджетами
 * @param widgetsLength - количество виджетов
 * @returns {GridDimensions} - конфигурация сетки: количество колонок, строк, ширина и высота сетки
 */
export const useGridDimensions = (widgetsLength: number): GridDimensions => {
  const windowWidth = useWindowWidth();

  if (windowWidth === null) {
    return { columnCount: 0, rowCount: 0, gridWidth: 0, gridHeight: 0 };
  }

  const effectiveWidth = windowWidth - PAGE_PADDING;
  const availableWidth = Math.max(effectiveWidth - SCROLLBAR_WIDTH, 0);
  const { columns: columnCount } = getGridConfig(availableWidth);

  const rowCount = Math.ceil(widgetsLength / columnCount);

  const baseGridWidth = WIDGET_WIDTH * columnCount + GAP * (columnCount - 1);
  const gridWidth = Math.min(availableWidth, baseGridWidth) + SCROLLBAR_WIDTH;

  const minRowsVisible = 10;
  const calculatedGridHeight = minRowsVisible * (WIDGET_HEIGHT + GAP) - GAP;
  const gridHeight = Math.max(calculatedGridHeight, window.innerHeight - 40);

  return { columnCount, rowCount, gridWidth, gridHeight };
};
