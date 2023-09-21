import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "../../features/AddressForm";
import { productsFilterReducer } from "../../entities/products-filter";
import { searchKeywordsReducer } from "../../entities/products-search";
import { categoriesReducer } from "../../entities/category";
import { cartReducer } from "../../entities/cart";

export const store = configureStore({
  reducer: {
    addressReducer,
    productsFilterReducer,
    searchKeywordsReducer,
    categoriesReducer,
    cartReducer,
  },
});
