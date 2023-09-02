import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchKeywordsState {
  keywords: string[];
}

const initialState: SearchKeywordsState = {
  keywords: [],
};

export const searchKeywordsSlice = createSlice({
  name: "searchKeywords",
  initialState,
  reducers: {
    setKeywords(state, { payload }: PayloadAction<string[]>) {
      state.keywords = payload;
    },
  },
});

export const searchKeywordsReducer = searchKeywordsSlice.reducer;
