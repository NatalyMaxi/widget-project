import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';

import { HTTP_PORT } from './config.js';
import { generateMockData, Widget } from './mockData.js';
import { setupWebSocket } from './websocket.js';

const app = express();
app.use(cors());

const widgetsData: Widget[] = generateMockData();

app.get('/widgets', (req: Request, res: Response) => {
  res.json(widgetsData);
});

const httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP server listening on port ${HTTP_PORT}`);
});

setupWebSocket(widgetsData);
