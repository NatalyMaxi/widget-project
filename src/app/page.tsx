'use client';

import { useEffect, useState } from 'react';

import { WidgetData, WidgetUpdate } from '@/types/widget';
import { apiFetch } from '@/utils/api';
import { WIDGETS_FETCH_ERROR } from '@/constants/errors';
import { WS_BASE_URL } from '@/constants/network';

import styles from './page.module.scss';

export default function Home() {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [widgetValues, setWidgetValues] = useState<Record<number, number>>({});

  const handleUpdate = ({ id, value }: WidgetUpdate) => {
    setWidgetValues((prev) => {
      if (prev[id] === value) return prev;
      return { ...prev, [id]: value };
    });
  };

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const data = await apiFetch<WidgetData[]>('/widgets');
        setWidgets(data);
        setWidgetValues(Object.fromEntries(data.map((w) => [w.id, w.value])));
      } catch (error) {
        console.error(WIDGETS_FETCH_ERROR, error);
      }
    };
    fetchWidgets();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(WS_BASE_URL);

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data) as WidgetUpdate;
        handleUpdate(data);
      } catch (error) {
        console.error('Ошибка при получении данных из WebSocket:', error);
      }
    };

    ws.onerror = (err) => {
      console.error('Ошибка WebSocket соединения:', err);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
          {widgets.map(({ id, name, value }: WidgetData) => (
            <li key={id}>{`${name} - ${widgetValues[id] ?? value}`}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
