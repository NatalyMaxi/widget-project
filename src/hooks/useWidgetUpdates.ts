import { useEffect, useRef } from 'react';

import { WidgetUpdate } from '@/types/widget';
import { WS_CONNECTION_ERROR, WS_DATA_ERROR } from '@/constants/errors';

type Callback = (update: WidgetUpdate) => void;

export const useWidgetUpdates = (wsUrl: string, onUpdate: Callback) => {
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data) as WidgetUpdate;
        onUpdateRef.current(data);
      } catch (error) {
        console.error(WS_DATA_ERROR, error);
      }
    };

    ws.onerror = (err) => {
      console.error(WS_CONNECTION_ERROR, err);
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);
};
