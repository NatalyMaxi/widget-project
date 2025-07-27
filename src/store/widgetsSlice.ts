import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { apiFetch } from '@/utils/api';
import { WIDGETS_FETCH_ERROR, WIDGETS_FETCH_UNKNOWN_ERROR } from '@/constants/errors';
import type { RootState } from './store';
import type { WidgetData } from '@/types/widget';

export interface WidgetsState {
  widgets: WidgetData[];
  widgetValues: Record<number, number>;
  loading: boolean;
  error?: string;
}

const initialState: WidgetsState = {
  widgets: [],
  widgetValues: {},
  loading: false,
  error: undefined,
};

export const fetchWidgets = createAsyncThunk<WidgetData[], void, { rejectValue: string }>(
  'widgets/fetchWidgets',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetch<WidgetData[]>('/widgets');
      return data;
    } catch (error) {
      console.error(WIDGETS_FETCH_ERROR, error);
      return rejectWithValue(WIDGETS_FETCH_ERROR);
    }
  },
);

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    updateWidgetValue: (state, action: PayloadAction<{ id: number; value: number }>) => {
      const { id, value } = action.payload;
      state.widgetValues[id] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidgets.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchWidgets.fulfilled, (state, action) => {
        state.loading = false;
        state.widgets = action.payload;
        state.widgetValues = Object.fromEntries(action.payload.map((w) => [w.id, w.value]));
      })
      .addCase(fetchWidgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || WIDGETS_FETCH_UNKNOWN_ERROR;
      });
  },
});

export const { updateWidgetValue } = widgetsSlice.actions;
export default widgetsSlice.reducer;

export const selectWidgets = (state: RootState) => state.widgets.widgets;
export const selectWidgetValues = (state: RootState) => state.widgets.widgetValues;
export const selectWidgetsLoading = (state: RootState) => state.widgets.loading;
export const selectWidgetsError = (state: RootState) => state.widgets.error;
export const selectWidgetValueById = (id: number) => (state: { widgets: WidgetsState }) =>
  state.widgets.widgetValues[id];
