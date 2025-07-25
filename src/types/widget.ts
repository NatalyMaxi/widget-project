export interface WidgetData {
  id: number;
  name: string;
  value: number;
}
export type WidgetUpdate = Omit<WidgetData, 'name'>;
