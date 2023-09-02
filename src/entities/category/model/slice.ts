import { type Category } from "@commercetools/platform-sdk";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  allCategories: Category[];
  availableCategories: Category[];
  isUpdated: boolean;
  currentCategory?: Category;
}

const initialState: CategoryState = {
  allCategories: [],
  availableCategories: [],
  isUpdated: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCurrentCategories(state, { payload }: PayloadAction<Category[]>) {
      state.availableCategories = payload;
    },

    setAllCategories(state, { payload }: PayloadAction<Category[]>) {
      state.allCategories = payload;
    },

    setCategoriesIsUpdated(state, { payload }: PayloadAction<boolean>) {
      state.isUpdated = payload;
    },

    setCurrentCategory(
      state,
      { payload }: PayloadAction<Category | undefined>,
    ) {
      state.currentCategory = payload;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
