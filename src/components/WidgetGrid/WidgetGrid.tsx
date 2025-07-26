'use client';

import { Loading, Widget } from '@/components';
import { useWidgets } from '@/hooks/useWidgets';
import { useWidgetUpdates } from '@/hooks/useWidgetUpdates';
import { useChunkedRendering } from '@/hooks/useChunkedRendering';
import { WS_BASE_URL } from '@/constants/network';
import { WidgetData } from '@/types/widget';

import styles from './WidgetGrid.module.scss';

const CHUNK_SIZE = 1500;
const CHUNK_DELAY = 0;

export const WidgetGrid = () => {
  const { widgets } = useWidgets();
  useWidgetUpdates(WS_BASE_URL);

  const { visibleCount, allRendered } = useChunkedRendering({
    itemsLength: widgets.length,
    chunkSize: CHUNK_SIZE,
    chunkDelay: CHUNK_DELAY,
  });

  if (allRendered) {
    console.log('render WidgetGrid — all widgets rendered');
  }

  if (visibleCount === 0) {
    return <Loading />;
  }

  // Эта консоль отображает частоту ререндера WidgetGrid, показывает, что компонент не перерисовывается, если меняются значения у некоторых виджетов
  //console.log('render WidgetGrid');

  return (
    <ul className={styles.grid}>
      {widgets.slice(0, visibleCount).map(({ id, name }: WidgetData) => (
        <li className={styles.item} key={id}>
          <Widget name={name} id={id} />
        </li>
      ))}
    </ul>
  );
};
