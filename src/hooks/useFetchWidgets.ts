import { useEffect } from 'react';

import { useAppDispatch } from '@/store/store';
import { fetchWidgets } from '@/store/widgetsSlice';

import { WIDGETS_FETCH_ERROR } from '@/constants/errors';

export const useFetchWidgets = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWidgets())
      .unwrap()
      .catch((err) => {
        console.error(WIDGETS_FETCH_ERROR, err);
      });
  }, [dispatch]);
};
