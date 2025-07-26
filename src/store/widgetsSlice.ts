import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WidgetData } from '@/types/widget';

export interface WidgetsState {
  widgets: WidgetData[];
  widgetValues: Record<number, number>;
}

const initialState: WidgetsState = {
  widgets: [],
  widgetValues: {},
};

const slice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    setWidgets: (state, action: PayloadAction<WidgetData[]>) => {
      state.widgets = action.payload;
      state.widgetValues = Object.fromEntries(action.payload.map((w) => [w.id, w.value]));
    },
    updateWidgetValue: (state, action: PayloadAction<{ id: number; value: number }>) => {
      const { id, value } = action.payload;
      state.widgetValues[id] = value;
    },
  },
});

export const { setWidgets, updateWidgetValue } = slice.actions;

export const widgetsReducer = slice.reducer;

export const selectWidgets = (state: { widgets: WidgetsState }) => state.widgets.widgets;
export const selectWidgetValueById = (id: number) => (state: { widgets: WidgetsState }) =>
  state.widgets.widgetValues[id];
