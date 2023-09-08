import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  itemsCount: number;
  totalPrice: number;
  ids: string[];
}

const initialState: CartState = {
  itemsCount: 0,
  totalPrice: 0,
  ids: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateItemsIds(state, { payload }: PayloadAction<string>) {
      if (state.ids.includes(payload)) {
        state.ids = state.ids.filter((id) => id !== payload);
      } else {
        state.ids.push(payload);
      }
    },
    updateTotalPrice(state, { payload }: PayloadAction<number>) {
      state.totalPrice = payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
