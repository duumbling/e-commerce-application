import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getCurrentCart } from "../api/cart";
import type { Cart } from "@commercetools/platform-sdk";
import { getCartState } from "../lib/helpers";
import type { CartState } from "./types";

const initialState: CartState = {
  totalPrice: 0,
  discountPrice: 0,
  count: 0,
  ids: [],
};

export const loadCartData = createAsyncThunk(
  "cart",
  async (): Promise<Cart> => {
    const cart = await getCurrentCart();
    return cart;
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartState(_, { payload }: PayloadAction<Cart>) {
      return getCartState(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCartData.fulfilled, (_, { payload }) => {
      return getCartState(payload);
    });
  },
});

export const cartReducer = cartSlice.reducer;
