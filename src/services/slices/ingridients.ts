import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IIngredientsState {
  ingridients: TIngredient[];
  loading: boolean;
  error?: string | null;
}
const initialState: IIngredientsState = {
  ingridients: [],
  loading: true
};

export const loadIngredients = createAsyncThunk(
  'burgerIngredients/loadIngredients',
  async () => getIngredientsApi()
);

const IngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: initialState,
  reducers: {},
  selectors: {
    addAllIngredients: (state) => state.ingridients,
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
        state.ingridients = action.payload;
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
