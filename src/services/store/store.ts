import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsReducer,
  ingredientsSliceName
} from '../slices/ingridients';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { feedReducer, feedSliceName } from '../slices/feed';
import {
  constructorName,
  constructorReducer
} from '../slices/burgerConstructor';
import { orderReducer, orderSliceName } from '../slices/order';
import { ordersReducer, ordersSliceName } from '../slices/orders';
import { userReducer, userSliceName } from '../slices/user';

const rootReducer = combineReducers({
  [ingredientsSliceName]: ingredientsReducer,
  [feedSliceName]: feedReducer,
  [constructorName]: constructorReducer,
  [orderSliceName]: orderReducer,
  [ordersSliceName]: ordersReducer,
  [userSliceName]: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
