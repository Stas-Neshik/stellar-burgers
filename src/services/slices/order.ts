import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RequestStatus } from 'src/types';

type IOrderState = {
  order: TOrder | null;
  loading: boolean;
};

const initialState: IOrderState = {
  order: null,
  loading: false
};

export const getOrderByNumber = createAsyncThunk(
  'order,getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ids: string[]) => orderBurgerApi(ids)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearInfo: (state) => (state = initialState)
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderRequest: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, () => {
        console.log('Сработал getOrderByNumber.pending');
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getOrderByNumber.rejected, () => {
        console.log('Сработал getOrderByNumber.rejected');
      })
      .addCase(createOrder.pending, () => {
        console.log('Сработал createOrder.pending');
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.loading = false;
      })
      .addCase(createOrder.rejected, () => {
        console.log('Сработал createOrder.rejected');
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const orderSliceName = orderSlice.name;
export const { getOrder, getOrderRequest } = orderSlice.selectors;
export const { clearInfo } = orderSlice.actions;
