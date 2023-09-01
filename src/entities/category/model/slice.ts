import { type Category } from "@commercetools/platform-sdk";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  values: Category[];
  parentId?: string;
}

const initialState: CategoryState = {
  values: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCurrentCategories(state, { payload }: PayloadAction<Category[]>) {
      state.values = payload;
    },
    setCategoriesParentId(state, { payload }: PayloadAction<string>) {
      state.parentId = payload;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
