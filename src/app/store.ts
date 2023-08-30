import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "../features/AddressForm";
import { productsFilterReducer } from "../entities/products-filter";

export const store = configureStore({
  reducer: {
    addressReducer,
    productsFilterReducer,
  },
});
