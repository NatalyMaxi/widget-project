import { useEffect, useCallback } from 'react';

import { useAppDispatch } from '@/store/store';
import { fetchWidgets } from '@/store/widgetsSlice';

import { WIDGETS_FETCH_ERROR } from '@/constants/errors';

export const useFetchWidgets = (): (() => void) => {
  const dispatch = useAppDispatch();

  const retry = useCallback(() => {
    dispatch(fetchWidgets())
      .unwrap()
      .catch((err: unknown) => {
        let message = '';

        if (err instanceof Error) {
          message = err.message;
        } else {
          message = String(err);
        }
        console.error(`${WIDGETS_FETCH_ERROR} ${message}`);
      });
  }, [dispatch]);

  useEffect(() => {
    retry();
  }, [retry]);

  return retry;
};
