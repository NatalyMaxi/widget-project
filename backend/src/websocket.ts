import { WebSocketServer, WebSocket } from 'ws';

import { Widget } from './mockData.js';
import { generateWidgetUpdate } from './sendWidgetUpdate.js';
import { WS_PORT, WIDGET_UPDATE_INTERVAL_MS } from './config.js';

export function setupWebSocket(widgetsData: Widget[]) {
  const wss = new WebSocketServer({ port: WS_PORT });

  wss.on('connection', (ws: WebSocket) => {
    console.log('🟢 Клиент WebSocket подключён');

    const interval = setInterval(() => {
      const update = generateWidgetUpdate(widgetsData);
      ws.send(JSON.stringify(update));
    }, WIDGET_UPDATE_INTERVAL_MS);

    ws.on('close', () => {
      console.log('🔴 Клиент WebSocket отключён');
      clearInterval(interval);
    });
  });

  console.log(`✅ Сервер WebSocket запущен на порту ${WS_PORT}`);
}
