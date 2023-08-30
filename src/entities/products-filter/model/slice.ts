import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type FilterState } from "./types";

const initialState: FilterState = {
  brands: [],
  colors: [],
  sizes: [],
  prices: { min: 0, max: 0 },
};

export const filterSlice = createSlice({
  name: "products-filter",
  initialState,
  reducers: {
    updateAvailableFilterValues(
      state,
      { payload }: PayloadAction<Partial<FilterState>>,
    ) {
      if (payload.brands !== undefined) {
        state.brands = payload.brands;
      }
      if (payload.colors !== undefined) {
        state.colors = payload.colors;
      }
      if (payload.prices !== undefined) {
        state.prices = payload.prices;
      }
      if (payload.sizes !== undefined) {
        state.sizes = payload.sizes;
      }
    },
  },
});

export const productsFilterReducer = filterSlice.reducer;

export const { updateAvailableFilterValues } = filterSlice.actions;
