import { getUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TUserState {
  isAuthChecked: boolean;
  data: null;
  requestStaatus: boolean;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStaatus: false
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});
// export const UserSlice = createSlice({});
