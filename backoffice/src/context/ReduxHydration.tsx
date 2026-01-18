"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserTransactions } from "@/store/slices/globalSlice";
import { AppDispatch } from "@/store/store";
import { TransactionType } from "@/schemas/dataSchema";

export function ReduxHydration({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const mappedTransactions = transactions.map((transaction) => ({
      ...transaction,
      date: new Date(transaction.date).toISOString(),
    }));
    dispatch(setUserTransactions(mappedTransactions));
  }, [dispatch, transactions]);

  return null;
}
