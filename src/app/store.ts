import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "../features/AddressForm";

const myReducer = (): number => 1;

export const store = configureStore({
  reducer: {
    myReducer,
    addressReducer,
  },
});
