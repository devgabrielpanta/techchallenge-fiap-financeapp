import { createSlice } from "@reduxjs/toolkit";
import {
  CreateTransactionType,
  TransactionType,
  transactionSample,
} from "@/schemas/dataSchema";

interface TransactionState {
  transactionAction: "create" | "edit" | null;
  transactionData: CreateTransactionType | TransactionType | null;
}

const initialState: TransactionState = {
  transactionAction: null,
  transactionData: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    startCreateTransaction(state) {
      state.transactionAction = "create";
      state.transactionData = transactionSample;
    },
    cleanTransactionModal(state) {
      state.transactionAction = null;
      state.transactionData = null;
    },
    setTransactionAction(state, action) {
      state.transactionAction = action.payload;
    },
    setTransactionData(state, action) {
      state.transactionData = action.payload;
    },
    startEditTransaction(state, action) {
      state.transactionData = action.payload;
      state.transactionAction = "edit";
    },
    createCategoryTransaction(state, action) {
      const category = action.payload;
      state.transactionAction = "create";
      state.transactionData = { ...transactionSample, category };
    },
    cloneTransaction(state) {
      if (state.transactionData) {
        const currentTransaction = state.transactionData;
        state.transactionData = {
          ...currentTransaction,
          id: new Date().getTime(),
        };
        state.transactionAction = "create";
      }
    },
  },
});

export const {
  startCreateTransaction,
  cleanTransactionModal,
  setTransactionAction,
  setTransactionData,
  startEditTransaction,
  createCategoryTransaction,
  cloneTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
