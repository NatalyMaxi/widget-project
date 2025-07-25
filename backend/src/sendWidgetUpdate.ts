import { Widget } from './mockData.js';
import { VALUE_MAX, VALUE_MIN } from './config.js';

export function generateWidgetUpdate(widgetsData: Widget[]) {
  const widgetId = Math.floor(Math.random() * widgetsData.length);
  const widget = widgetsData[widgetId];

  let newValue = widget.value + (Math.random() > 0.5 ? 1 : -1);
  newValue = Math.max(Math.min(newValue, VALUE_MAX), VALUE_MIN);

  widget.value = newValue;

  return { id: widgetId, value: newValue };
}
