import { configureStore } from "@reduxjs/toolkit";

const myReducer = (): number => 1;

export const store = configureStore({
  reducer: {
    myReducer,
  },
});
