import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RequestStatus } from 'src/types';

interface IOrderState {
  info: TOrder[];
  orderRequest: boolean;
  error?: string;
}

const initialState: IOrderState = {
  info: [],
  orderRequest: false
};
