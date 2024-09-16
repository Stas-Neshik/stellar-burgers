import { TUser } from '@utils-types';

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
