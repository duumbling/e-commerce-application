import { type Cart } from "@commercetools/platform-sdk";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  current?: Cart;
}

const initialState: CartState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCurrentCart(state, { payload }: PayloadAction<Cart>) {
      state.current = payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
