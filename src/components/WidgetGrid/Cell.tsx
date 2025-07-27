'use client';

import { memo } from 'react';

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

  if (index >= widgets.length) return null;

  const widget = widgets[index];

  const adjustedStyle = {
    ...style,
    width: WIDGET_WIDTH,
  };

  return (
    <div style={adjustedStyle}>
      <Widget id={widget.id} name={widget.name} />
    </div>
  );
});
Cell.displayName = 'Cell';
