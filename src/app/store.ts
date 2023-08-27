import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "../features/AddressForm";
import { sortProductsReducer } from "../entities/products-sort-select/";
import { productsFilterReducer } from "../entities/products-filter";

export const store = configureStore({
  reducer: {
    addressReducer,
    sortProductsReducer,
    productsFilterReducer,
  },
});
