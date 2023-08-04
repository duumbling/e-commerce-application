import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";

const myReducer = (): number => 1;

export const store = configureStore({
  reducer: {
    myReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
