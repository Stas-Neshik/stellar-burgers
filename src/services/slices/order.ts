import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
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
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const orderSliceName = orderSlice.name;
export const { getOrder, getOrderRequest } = orderSlice.selectors;
export const { clearInfo } = orderSlice.actions;
