const store = (await import("./store/store")).store;

declare type AppDispatch = typeof store.dispatch;
declare type RootState = ReturnType<typeof store.getState>;
declare type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
