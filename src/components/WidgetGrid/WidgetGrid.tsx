'use client';

import { FixedSizeGrid } from 'react-window';

import { useAppSelector } from '@/store/store';
import { selectWidgets, selectWidgetsLoading, selectWidgetsError } from '@/store/widgetsSlice';

import { Loading } from '@/components';
import { Cell } from './Cell';
import { useWidgetUpdates } from '@/hooks/useWidgetUpdates';
import { useFetchWidgets } from '@/hooks/useFetchWidgets';
import { useGridDimensions } from '@/hooks/useGridDimensions';
import { WIDGET_WIDTH, GAP, WIDGET_HEIGHT } from '@/constants/layout';
import { WS_BASE_URL } from '@/constants/network';
import type { GridChildComponentProps } from '@/types/grid';

import styles from './WidgetGrid.module.scss';

export const WidgetGrid: React.FC = () => {
  useFetchWidgets();

  const widgets = useAppSelector(selectWidgets);
  const loading = useAppSelector(selectWidgetsLoading);
  const error = useAppSelector(selectWidgetsError);

  useWidgetUpdates(WS_BASE_URL);

  const { columnCount, rowCount, gridWidth, gridHeight } = useGridDimensions(widgets.length);

  if (loading) return <Loading />;
  if (error) return <div className={styles.error}>{error}</div>;
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
        overscanRowCount={10}
      >
        {(props: GridChildComponentProps) => <Cell {...props} widgets={widgets} columnCount={columnCount} />}
      </FixedSizeGrid>
    </div>
  );
};
