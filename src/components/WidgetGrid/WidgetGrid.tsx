'use client';

import { Loading, Widget } from '@/components';
import { useWidgets } from '@/hooks/useWidgets';
import { useWidgetUpdates } from '@/hooks/useWidgetUpdates';
import { WS_BASE_URL } from '@/constants/network';
import { WidgetData } from '@/types/widget';

import styles from './WidgetGrid.module.scss';

export const WidgetGrid = () => {
  const { widgets } = useWidgets();
  useWidgetUpdates(WS_BASE_URL);

  if (widgets.length === 0) {
    return <Loading />;
  }

  // Эта консоль отображает частоту ререндера WidgetGrid, показывает, что компонент не перерисовывается, если меняются значения у некоторых виджетов
  console.log('render WidgetGrid');

  return (
    <ul className={styles.grid}>
      {widgets.map(({ id, name }: WidgetData) => (
        <li className={styles.item} key={id}>
          <Widget name={name} id={id} />
        </li>
      ))}
    </ul>
  );
};
