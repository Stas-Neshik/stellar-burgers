import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state: TConstructor,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
    changeIngredient: (state, action) => {
      const element = state.ingredients[action.payload.initialIndex];
      state.ingredients[action.payload.initialIndex] =
        state.ingredients[action.payload.finishIndex];
      state.ingredients[action.payload.finishIndex] = element;
    }
  },
  selectors: {
    getIngredients: (state) => state
  }
});

export const constructorReducer = burgerConstructorSlice.reducer;
export const constructorName = burgerConstructorSlice.name;
export const { getIngredients } = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  changeIngredient
} = burgerConstructorSlice.actions;
