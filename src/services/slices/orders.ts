import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false
};

export const loadingUsers = createAsyncThunk(
  'orders/loadUserOrders',
  async () => getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getordersRequest: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadingUsers.pending, (state) => {
        state.isLoading = true;
        console.log('Сработал loadingUsers.pending');
      })
      .addCase(loadingUsers.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(loadingUsers.rejected, (state) => {
        state.isLoading = false;
        console.log('Сработал loadingUsers.rejected');
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const ordersSliceName = ordersSlice.name;
export const { getOrders, getordersRequest } = ordersSlice.selectors;
