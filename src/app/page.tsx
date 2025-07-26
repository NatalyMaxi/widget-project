'use client';

import { useCallback } from 'react';

import { Widget } from '@/components';
import { useWidgetUpdates } from '@/hooks/useWidgetUpdates';
import { useWidgets } from '@/hooks/useWidgets';
import { WidgetData, WidgetUpdate } from '@/types/widget';
import { WS_BASE_URL } from '@/constants/network';

import styles from './page.module.scss';

export default function Home() {
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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul className={styles.grid}>
          {widgets.map(({ id, name, value }: WidgetData) => (
            <li className={styles.item} key={id}>
              <Widget id={id} name={name} value={widgetValues[id] ?? value} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
