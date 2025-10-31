"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  CreateTransactionType,
  transactionSample,
  TransactionType,
} from "@/schemas/dataSchema";
import { useUser } from "@/context/UserContext";

type TransactionAction = "create" | "edit" | null;

interface TransactionModalContextType {
  transactionAction: TransactionAction;
  setTransactionAction: (action: TransactionAction) => void;
  transactionData: CreateTransactionType | TransactionType | null;
  setTransactionData: (data: CreateTransactionType | null) => void;
  startCreateTransaction: () => void;
  cleanTransactionModal: () => void;
  startEditTransaction: (transactionId: number) => void;
}

const TransactionModalContext = createContext<
  TransactionModalContextType | undefined
>(undefined);

export const TransactionModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const transactionList = user.transactionList;
  const [transactionAction, setTransactionAction] =
    useState<TransactionAction>(null);
  const [transactionData, setTransactionData] = useState<
    CreateTransactionType | TransactionType | null
  >(null);

  const startCreateTransaction = () => {
    setTransactionAction("create");
    setTransactionData(transactionSample);
  };

  const cleanTransactionModal = () => {
    setTransactionAction(null);
    setTransactionData(null);
  };

  const startEditTransaction = (transactionId: number) => {
    const transaction = transactionList.find((t) => t.id === transactionId);
    if (!transaction) return;
    setTransactionAction("edit");
    setTransactionData(transaction);
  };

  return (
    <TransactionModalContext.Provider
      value={{
        transactionAction,
        setTransactionAction,
        transactionData,
        setTransactionData,
        startCreateTransaction,
        cleanTransactionModal,
        startEditTransaction,
      }}
    >
      {children}
    </TransactionModalContext.Provider>
  );
};

export const useTransactionModal = () => {
  const context = useContext(TransactionModalContext);
  if (!context)
    throw new Error(
      "useTransactionModal must be used within a TransactionModalProvider"
    );
  return context;
};
