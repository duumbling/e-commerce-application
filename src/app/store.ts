import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "../features/AddressForm";
import { productsFilterReducer } from "../entities/products-filter";
import { searchKeywordsReducer } from "../entities/products-search";

export const store = configureStore({
  reducer: {
    addressReducer,
    productsFilterReducer,
    searchKeywordsReducer,
  },
});
