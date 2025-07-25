import { WIDGET_COUNT, VALUE_MIN, VALUE_MAX } from './config.js';

export interface Widget {
  id: number;
  name: string;
  value: number;
}

export function generateMockData(count = WIDGET_COUNT): Widget[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `W ${i}`,
    value: Math.floor(Math.random() * (VALUE_MAX - VALUE_MIN + 1)) + VALUE_MIN,
  }));
}
