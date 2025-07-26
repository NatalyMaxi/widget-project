import { useState, useEffect, useRef } from 'react';

import { apiFetch } from '@/utils/api';
import { WidgetData } from '@/types/widget';
import { WIDGETS_FETCH_ERROR } from '@/constants/errors';

export const useWidgets = () => {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [widgetValues, setWidgetValues] = useState<Record<number, number>>({});
  const idToIndexRef = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const data = await apiFetch<WidgetData[]>('/widgets');
        setWidgets(data);
        setWidgetValues(Object.fromEntries(data.map((w) => [w.id, w.value])));

        const idToIndex = new Map<number, number>();
        data.forEach((w, index) => idToIndex.set(w.id, index));
        idToIndexRef.current = idToIndex;
      } catch (error) {
        console.error(WIDGETS_FETCH_ERROR, error);
      }
    };
    fetchWidgets();
  }, []);

  return { widgets, widgetValues, setWidgetValues, idToIndexRef };
};
