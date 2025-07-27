import { useEffect } from 'react';

import { updateWidgetValue } from '@/store/widgetsSlice';
import { useAppDispatch } from '@/store/store';

import { WS_CONNECTION_ERROR, WS_DATA_ERROR } from '@/constants/errors';
import type { WidgetUpdate } from '@/types/widget';

export const useWidgetUpdates = (wsUrl: string, onUpdate?: (update: { id: number; value: number }) => void) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data) as WidgetUpdate;
        dispatch(updateWidgetValue(data));
        if (onUpdate) onUpdate(data);
      } catch (error) {
        console.error(WS_DATA_ERROR, error, error);
      }
    };

    ws.onerror = (err) => {
      console.error(WS_CONNECTION_ERROR, err);
    };

    return () => {
      ws.close();
    };
  }, [wsUrl, dispatch, onUpdate]);
};
