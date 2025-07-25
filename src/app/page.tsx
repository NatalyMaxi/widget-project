'use client';

import { useEffect, useState } from 'react';

import { WidgetData } from '@/types/widget';
import { apiFetch } from '@/utils/api';
import { WIDGETS_FETCH_ERROR } from '@/constants/errors';

import styles from './page.module.scss';

export default function Home() {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const data = await apiFetch<WidgetData[]>('/widgets');
        setWidgets(data);
      } catch (error) {
        console.error(WIDGETS_FETCH_ERROR, error);
      }
    };
    fetchWidgets();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
          {widgets.map(({ id, name, value }: WidgetData) => {
            return <li key={id}>{`${name}-${value}`}</li>;
          })}
        </ul>
      </main>
    </div>
  );
}
