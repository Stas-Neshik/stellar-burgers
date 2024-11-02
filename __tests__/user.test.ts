import { log } from 'console';
import {
  userReducer,
  authChecked,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout
} from '../src/services/slices/user';

describe('[userSlice] Проверка слайса', () => {
  const initialState = {
    userData: null,
    isAuthChecked: false,
    requestLoginUser: false
  };

  const userMock = {
    email: 'test@yandex.ru',
    name: 'Stasyan'
  };

  it('[1] Проверка авторизации', () => {
    const action = authChecked();
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(true);
  });
  describe('[2] Проверка Логина', () => {
    it('[2] логина pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.requestLoginUser).toBe(true);
    });

    it('[3] логина fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: userMock
      };
      const state = userReducer(initialState, action);

      expect(state.userData).toEqual(userMock);
      expect(state.isAuthChecked).toBe(true);
      expect(state.requestLoginUser).toBe(false);
    });

    it('[4] логина rejected', () => {
      const action = { type: loginUser.rejected.type };
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.loginError).toBe(
        'Ошибка в получении доступа к личному кабинету'
      );
      expect(state.requestLoginUser).toBe(false);
    });
  });
  describe('[3] Проверка регистрации', () => {
    it('[1] Проверка регистрации pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.requestLoginUser).toBe(true);
    });
    it('[2] Проверка регистрации fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: userMock
      };
      const state = userReducer(initialState, action);

      expect(state.userData).toEqual(userMock);
      expect(state.requestLoginUser).toBe(false);
    });
    it('[3] Проверка регистрации rejected', () => {
      const action = { type: registerUser.rejected.type };
      const state = userReducer(initialState, action);

      expect(state.requestLoginUser).toBe(false);
      expect(state.registerError).toBe('Ошибка в регистристрации пользователя');
    });
  });
  describe('[4] Проверка выхода', () => {
    it('[1] Проверка выхода pending', () => {
      const action = { type: logout.pending.type };
      const state = userReducer(initialState, action);

      expect(state.requestLoginUser).toBe(true);
    });
    it('[2] Проверка выхода fulfilled', () => {
      const action = { type: logout.fulfilled.type };
      const state = userReducer(
        {
          ...initialState,
          userData: userMock,
          requestLoginUser: true
        },
        action
      );

      expect(state).toEqual(initialState);
    });
    it('[3] Проверка выхода rejected', () => {
      const action = { type: logout.rejected.type };
      const state = userReducer(initialState, action);

      expect(state.requestLoginUser).toBe(false);
    });
  });
  describe('[5] Проверка обновления пользователя', () => {
    it('[1] Проверка обновления пользователя pending', () => {
      const action = {type: updateUser.pending.type};
      const state = userReducer(initialState, action);

      expect(state.requestLoginUser).toBe(true);
      expect(state.userData).toBe(null);
    });
    it('[2] Проверка обновления пользователя fulfilled', () => {

      const updatedUser = { ...userMock, name: 'Vasyan' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const state = userReducer(initialState, action);
      expect(state.requestLoginUser).toBe(false);
      expect(state.userData).toEqual(updatedUser);
    });
    it('[3] Проверка обновления пользователя rejected', () => {
      const action = {type: updateUser.rejected.type};
      const state = userReducer(initialState, action);

      expect(state.requestLoginUser).toBe(false);
      expect(state.updateError).toBe('Ошибка в обновлении данных');
    });
  });
  describe('[6] Проверка получения юзера', () => {
    it('[1] Проверка получения пользователя fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: {user: userMock},
      };
      const state = userReducer(initialState, action);
  
      expect(state.userData).toEqual(userMock);
    });
  });
});
