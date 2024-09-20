import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { AppDispatch } from '../store/store';

interface IAuthUserState {
  userData: TUser | null;
  isAuthChecked: boolean;
  requestLoginUser: boolean;
  registerError?: string;
  loginError?: string;
  updateError?: string;
}

const initialState: IAuthUserState = {
  userData: null,
  isAuthChecked: false,
  requestLoginUser: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    const response = await registerUserApi(userData);

    if (!response?.success) {
      return rejectWithValue(response);
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUserApi',
  async (loginData: TLoginData, { rejectWithValue }) => {
    const response = await loginUserApi(loginData);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPasswordApi',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPasswordApi',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const getUser = createAsyncThunk('user/getUserApi', async () =>
  getUserApi()
);

export const userAuth = () => (dispatch: AppDispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUser()).finally(() => {
      dispatch(authChecked());
    });
  } else {
    dispatch(authChecked());
  }
};

export const updateUser = createAsyncThunk(
  'user,updateUserApi',
  async (user: TRegisterData, { rejectWithValue }) => {
    const response = await updateUserApi(user);

    if (!response.success) {
      return rejectWithValue(null);
    }
    return response;
  }
);

export const logout = createAsyncThunk(
  'user/logoutApi',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();

    if (!response.success) {
      return rejectWithValue(null);
    }

    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    UserData: (state) => state.userData,
    UserChecked: (state) => state.isAuthChecked,
    RequestLoginUser: (state) => state.requestLoginUser,
    RegisterError: (state) => state.registerError,
    LoginError: (state) => state.loginError,
    UpdateError: (state) => state.updateError
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.requestLoginUser = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthChecked = true;
        state.requestLoginUser = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.loginError = 'Ошибка в получении доступа к личному кабинету';
        state.requestLoginUser = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestLoginUser = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.requestLoginUser = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerError = 'Ошибка в регистристрации пользователя';
        state.requestLoginUser = false;
      })
      .addCase(logout.pending, (state) => {
        state.requestLoginUser = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.requestLoginUser = false;
        state.userData = null;
        localStorage.clear();
        deleteCookie('accessToken');
      })
      .addCase(logout.rejected, (state) => {
        state.requestLoginUser = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestLoginUser = true;
        state.userData = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestLoginUser = false;
        state.userData = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestLoginUser = false;
        state.updateError = 'Ошибка в обновлении данных';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      });
  }
});

export const userReducer = userSlice.reducer;
export const userSliceName = userSlice.name;
export const {
  UserData,
  UserChecked,
  RequestLoginUser,
  RegisterError,
  LoginError,
  UpdateError
} = userSlice.selectors;
export const { authChecked } = userSlice.actions;
