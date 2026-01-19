import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/utils/appUtils";
import { user } from "@/utils/appUtils";

interface GlobalState {
  theme: "light" | "dark";
  isMenuOpen: boolean;
  user: User;
  feedback: {
    status: "success" | "error" | null;
    message: string;
  };
}

const initialState: GlobalState = {
  theme: "light",
  isMenuOpen: false,
  user,
  feedback: {
    status: null,
    message: "",
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setIsMenuOpen(state, action) {
      state.isMenuOpen = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserTransactions(state, action) {
      state.user.transactionList = action.payload;
    },
    setFeedbackSuccess(state, action) {
      state.feedback = {
        status: "success",
        message: action.payload,
      };
    },
    setFeedbackError(state, action) {
      state.feedback = {
        status: "error",
        message: action.payload,
      };
    },
    clearFeedback(state) {
      state.feedback = {
        status: null,
        message: "",
      };
    },
  },
});

export const {
  setTheme,
  setIsMenuOpen,
  setUser,
  setUserTransactions,
  setFeedbackSuccess,
  setFeedbackError,
  clearFeedback,
} = globalSlice.actions;
export default globalSlice.reducer;
