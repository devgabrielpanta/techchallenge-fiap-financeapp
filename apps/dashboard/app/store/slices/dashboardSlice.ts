import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpenseCategory {
  category: string;
  amount: number;
}

interface DashboardState {
  totalRevenue: number;
  totalExpenses: number;
  selectedPeriod: "monthly" | "quarterly" | "yearly";
  revenueChange: number;
  expensesChange: number;
  expensesByCategory: ExpenseCategory[];
  isLoading: boolean;
}

const initialState: DashboardState = {
  totalRevenue: 0,
  totalExpenses: 0,
  selectedPeriod: "monthly",
  revenueChange: 0,
  expensesChange: 0,
  expensesByCategory: [],
  isLoading: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setRevenue: (state, action: PayloadAction<number>) => {
      state.totalRevenue = action.payload;
    },
    setExpenses: (state, action: PayloadAction<number>) => {
      state.totalExpenses = action.payload;
    },
    setPeriod: (
      state,
      action: PayloadAction<"monthly" | "quarterly" | "yearly">
    ) => {
      state.selectedPeriod = action.payload;
      state.isLoading = true;
    },

    setRevenueChange: (state, action: PayloadAction<number>) => {
      state.revenueChange = action.payload;
    },
    setExpensesChange: (state, action: PayloadAction<number>) => {
      state.expensesChange = action.payload;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    setExpensesByCategory: (
      state,
      action: PayloadAction<{ category: string; amount: number }[]>
    ) => {
      state.expensesByCategory = action.payload;
    },
  },
});

export const {
  setRevenue,
  setExpenses,
  setPeriod,
  setRevenueChange,
  setExpensesChange,
  setExpensesByCategory,
  finishLoading,
  startLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
