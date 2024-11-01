import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string | null;
}
export const initialState: IIngredientsState = {
  ingredients: [],
  loading: true
};

export const loadIngredients = createAsyncThunk(
  'burgerIngredients/loadIngredients',
  async () => getIngredientsApi()
);

const IngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    addAllIngredients: (state) => state.ingredients,
    getIsLoading: (state) => state.loading,
    ingredientsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(loadIngredients.rejected, (state) => {
        state.loading = false;
        state.error = 'Ингридиент не найден';
      });
  }
});

export const ingredientsReducer = IngredientsSlice.reducer;
export const ingredientsSliceName = IngredientsSlice.name;
export const { addAllIngredients, getIsLoading, ingredientsError } =
  IngredientsSlice.selectors;
