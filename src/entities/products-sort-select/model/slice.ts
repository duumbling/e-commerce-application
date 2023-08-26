import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type SortType, SortOptions, type SortValue } from "./types";

const initialState: SortType = {
  name: "NAME_ASC",
  value: "name.ru-RU asc",
};

export const sortProductsSlice = createSlice({
  name: "products-sort",
  initialState,
  reducers: {
    setSortOptionValue(state, { payload }: PayloadAction<string>) {
      switch (payload) {
        case SortOptions.NAME_DESC:
          state.name = "NAME_DESC";
          state.value = payload;
          break;
        case SortOptions.PRICE_ASC:
          state.name = "PRICE_ASC";
          state.value = payload;
          break;
        case SortOptions.PRICE_DESC:
          state.name = "PRICE_DESC";
          state.value = payload;
          break;
        default:
          state.name = "NAME_ASC";
          state.value = payload as SortValue;
      }
    },
  },
});

export const sortProductsReducer = sortProductsSlice.reducer;
