import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getCurrentCart } from "../api/cart";
import { getPriceValue } from "../../../shared/api/product";

interface CartState {
  totalPrice: number;
  ids: string[];
}

const initialState: CartState = {
  totalPrice: 0,
  ids: [],
};

export const loadCartData = createAsyncThunk(
  "cart",
  async (): Promise<CartState> => {
    const cart = await getCurrentCart();
    const productIds = cart.lineItems.map((item) => item.productId);
    return {
      totalPrice: getPriceValue(cart.totalPrice),
      ids: productIds,
    };
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(loadCartData.fulfilled, (state, { payload }) => {
      state.ids = payload.ids;
      state.totalPrice = payload.totalPrice;
    });
  },
});

export const cartReducer = cartSlice.reducer;
