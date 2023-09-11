import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  itemsCount: number;
  totalPrice: number;
  discountPrice: number;
  ids: string[];
}

const initialState: CartState = {
  itemsCount: 0,
  totalPrice: 0,
  discountPrice: 0,
  ids: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateProductsIds(state, { payload }: PayloadAction<string | string[]>) {
      if (Array.isArray(payload)) {
        state.ids = payload;
        return;
      }
      if (state.ids.includes(payload)) {
        state.ids = state.ids.filter((id) => id !== payload);
      } else {
        state.ids.push(payload);
      }
    },
    updateTotalPrice(state, { payload }: PayloadAction<number>) {
      state.totalPrice = payload;
    },
    updateDiscountPrice(state, { payload }: PayloadAction<number>) {
      state.discountPrice = payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
