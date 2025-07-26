'use client';

import { useCallback } from 'react';

import { Loading, Widget } from '@/components';
import { useWidgets } from '@/hooks/useWidgets';
import { useWidgetUpdates } from '@/hooks/useWidgetUpdates';
import { WidgetData, WidgetUpdate } from '@/types/widget';
import { WS_BASE_URL } from '@/constants/network';

import styles from './WidgetGrid.module.scss';

export const WidgetGrid = () => {
  const { widgets, widgetValues, setWidgetValues } = useWidgets();

  const handleUpdate = useCallback(
    ({ id, value }: WidgetUpdate) => {
      setWidgetValues((prev) => {
        if (prev[id] === value) return prev;
        return { ...prev, [id]: value };
      });
    },
    [setWidgetValues],
  );

  useWidgetUpdates(WS_BASE_URL, handleUpdate);

  if (!widgets || widgets.length === 0) {
    return <Loading />;
  }

  return (
    <ul className={styles.grid}>
      {widgets.map(({ id, name, value }: WidgetData) => (
        <li className={styles.item} key={id}>
          <Widget name={name} value={widgetValues[id] ?? value} />
        </li>
      ))}
    </ul>
  );
};
