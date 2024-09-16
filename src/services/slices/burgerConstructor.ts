import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructor = {
  bun: TConstructorIngredient | null;
  ingridients: TConstructorIngredient[];
};

const initialState: TConstructor = {
  bun: null,
  ingridients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    addIngridient: {
      reducer: (
        state: TConstructor,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (state.bun?.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingridients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        return { payload: { ...ingredient, id: nanoid() } };
      }
    },
    removeIngridient: (state, action) => {
      state.ingridients = state.ingridients.filter((ingredient) => {
        ingredient.id != action.payload;
      });
    },
    clearIngridients: (state) => {
      state.ingridients = [];
      state.bun = null;
    },
    changeIngridient: (state, action) => {
      const element = state.ingridients[action.payload.initialIndex];
      state.ingridients[action.payload.initialIndex] =
        state.ingridients[action.payload.finishIndex];
      state.ingridients[action.payload.finishIndex] = element;
    }
  },
  selectors: {
    getIngridients: (state) => state
  }
});

export const constructorReducer = burgerConstructorSlice.reducer;
export const constructorName = burgerConstructorSlice.name;
export const { getIngridients } = burgerConstructorSlice.selectors;
export const {
  addIngridient,
  removeIngridient,
  clearIngridients,
  changeIngridient
} = burgerConstructorSlice.actions;
