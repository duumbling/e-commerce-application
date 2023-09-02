import { type Category } from "@commercetools/platform-sdk";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  allCategories: Category[];
  currentCategories: Category[];
}

const initialState: CategoryState = {
  allCategories: [],
  currentCategories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCurrentCategories(state, { payload }: PayloadAction<Category[]>) {
      state.currentCategories = payload;
    },
    setAllCategories(state, { payload }: PayloadAction<Category[]>) {
      state.allCategories = payload;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
