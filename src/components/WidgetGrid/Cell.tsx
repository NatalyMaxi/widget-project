'use client';

import { memo, useMemo } from 'react';

import { Widget } from '@/components';
import { WIDGET_WIDTH } from '@/constants/layout';
import type { GridChildComponentProps } from '@/types/grid';
import type { WidgetData } from '@/types/widget';

type CellProps = GridChildComponentProps & {
  widgets: WidgetData[];
  columnCount: number;
};

export const Cell = memo(({ columnIndex, rowIndex, style, widgets, columnCount }: CellProps) => {
  const index = rowIndex * columnCount + columnIndex;

  const isLastColumn = columnIndex === columnCount - 1;

  const adjustedStyle = useMemo(
    () => ({
      ...style,
      width: isLastColumn ? WIDGET_WIDTH : style.width,
    }),
    [style, isLastColumn],
  );

  if (index >= widgets.length) return null;

  const widget = widgets[index];

  return (
    <div style={adjustedStyle}>
      <Widget id={widget.id} name={widget.name} />
    </div>
  );
});
Cell.displayName = 'Cell';
