'use client';

import { FixedSizeGrid } from 'react-window';

import { useAppSelector } from '@/store/store';
import { selectWidgets, selectWidgetsLoading, selectWidgetsError } from '@/store/widgetsSlice';

import { ErrorPage, Loading } from '@/components';
import { Cell } from './Cell';
import {
  useDebouncedCallback,
  useFetchWidgets,
  useGridDimensions,
  useOverscanRowCount,
  useWidgetUpdates,
} from '@/hooks';
import { WIDGET_WIDTH, GAP, WIDGET_HEIGHT } from '@/constants/layout';
import { WS_BASE_URL } from '@/constants/network';
import { reloadPage } from '@/utils/reloadPage';
import type { GridChildComponentProps } from '@/types/grid';

import styles from './WidgetGrid.module.scss';

export const WidgetGrid: React.FC = () => {
  const retry = useFetchWidgets();

  const widgets = useAppSelector(selectWidgets);
  const loading = useAppSelector(selectWidgetsLoading);
  const error = useAppSelector(selectWidgetsError);

  useWidgetUpdates(WS_BASE_URL);

  const { columnCount, rowCount, gridWidth, gridHeight } = useGridDimensions(widgets.length);

  const { overscanRowCount, updateOverscan } = useOverscanRowCount();

  const handleScroll = useDebouncedCallback<[{ scrollTop: number }]>(({ scrollTop }) => {
    updateOverscan(scrollTop);
  }, 100);

  if (loading) return <Loading />;
  if (error) {
    return <ErrorPage errorMessage={error} onRetry={retry} onReloadPage={reloadPage} />;
  }
  if (widgets.length === 0 || columnCount === 0) return null;

  return (
    <div className={styles.grid}>
      <FixedSizeGrid
        className={styles.gridInner}
        columnCount={columnCount}
        columnWidth={WIDGET_WIDTH + GAP}
        height={gridHeight}
        rowCount={rowCount}
        rowHeight={WIDGET_HEIGHT + GAP}
        width={gridWidth}
        overscanRowCount={overscanRowCount}
        onScroll={handleScroll}
      >
        {(props: GridChildComponentProps) => <Cell {...props} widgets={widgets} columnCount={columnCount} />}
      </FixedSizeGrid>
    </div>
  );
};
