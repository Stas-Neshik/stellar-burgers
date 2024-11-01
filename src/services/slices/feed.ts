import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error?: string | null;
};

export const initialState: TFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const loadFeed = createAsyncThunk('getFeed', async () => getFeedsApi());

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state,
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.pending, () => {
        console.log('Сработал loadFeed.pending');
      })
      .addCase(loadFeed.fulfilled, (state, action) => {
        (state.orders = action.payload.orders),
          (state.total = action.payload.total),
          (state.totalToday = action.payload.totalToday);
      })
      .addCase(loadFeed.rejected, (state) => {
        state.error = 'Ошибка в получении заказа';
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const feedSliceName = feedSlice.name;
export const { getFeedState, getFeedOrders, getFeedTotal, getFeedTotalToday } =
  feedSlice.selectors;
