import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getCurrentCart } from "../api/cart";
import type { Cart } from "@commercetools/platform-sdk";
import { getCartDiscountPrice, getCartTotalPrice } from "../lib/helpers";

interface CartState {
  totalPrice: number;
  discountPrice: number;
  itemsCount: number;
  ids: string[];
}

const initialState: CartState = {
  totalPrice: 0,
  discountPrice: 0,
  itemsCount: 0,
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
    updateCartState(state, { payload }: PayloadAction<Cart>) {
      state.ids = payload.lineItems.map(({ productId }) => productId);
      state.totalPrice = getCartTotalPrice(payload);
      state.discountPrice = getCartDiscountPrice(payload);
      state.itemsCount = payload.lineItems.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCartData.fulfilled, (state, { payload }) => {
      state.ids = payload.lineItems.map(({ productId }) => productId);
      state.totalPrice = getCartTotalPrice(payload);
      state.discountPrice = getCartDiscountPrice(payload);
      state.itemsCount = payload.lineItems.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );
    });
  },
});

export const cartReducer = cartSlice.reducer;
