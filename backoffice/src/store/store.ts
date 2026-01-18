import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "@/store/slices/globalSlice";
import transactionSlice from "@/store/slices/transactionSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    transaction: transactionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
