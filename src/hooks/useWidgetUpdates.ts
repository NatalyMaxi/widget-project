import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store/store';
import { updateWidgetValue } from '@/store/widgetsSlice';

import { WidgetUpdate } from '@/types/widget';
import { WS_CONNECTION_ERROR, WS_DATA_ERROR } from '@/constants/errors';

export const useWidgetUpdates = (wsUrl: string) => {
  const dispatch: AppDispatch = useDispatch();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const onOpen = () => {
      console.log('WebSocket connected');
    };

    const onMessage = (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data) as WidgetUpdate;
        dispatch(updateWidgetValue(data));
      } catch (error) {
        console.error(WS_DATA_ERROR, error);
      }
    };

    const onError = (err: Event) => {
      console.error(WS_CONNECTION_ERROR, err);
    };

    const onClose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = onOpen;
    ws.current.onmessage = onMessage;
    ws.current.onerror = onError;
    ws.current.onclose = onClose;

    return () => {
      ws.current?.close();
      ws.current = null;
    };
  }, [wsUrl, dispatch]);

  return ws.current;
};
