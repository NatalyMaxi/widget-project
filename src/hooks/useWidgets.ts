import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setWidgets, selectWidgets } from '@/store/widgetsSlice';

import { WIDGETS_FETCH_ERROR } from '@/constants/errors';
import { apiFetch } from '@/utils/api';
import { WidgetData } from '@/types/widget';

export const useWidgets = () => {
  const dispatch = useAppDispatch();
  const widgets = useAppSelector(selectWidgets);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const data = await apiFetch<WidgetData[]>('/widgets');
        dispatch(setWidgets(data));
      } catch (error) {
        console.error(WIDGETS_FETCH_ERROR, error);
      }
    };
    fetchWidgets();
  }, [dispatch]);

  return { widgets };
};
