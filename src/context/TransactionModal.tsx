"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CreateTransactionType, transactionSample } from "@/schemas/dataSchema";

type TransactionAction = "create" | "edit" | null;

interface TransactionModalContextType {
  transactionAction: TransactionAction;
  setTransactionAction: (action: TransactionAction) => void;
  transactionData: CreateTransactionType | null;
  setTransactionData: (data: CreateTransactionType | null) => void;
  startCreateTransaction: () => void;
  cleanTransactionModal: () => void;
}

const TransactionModalContext = createContext<
  TransactionModalContextType | undefined
>(undefined);

export const TransactionModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactionAction, setTransactionAction] =
    useState<TransactionAction>(null);
  const [transactionData, setTransactionData] =
    useState<CreateTransactionType | null>(null);

  const startCreateTransaction = () => {
    setTransactionAction("create");
    setTransactionData(transactionSample);
  };

  const cleanTransactionModal = () => {
    setTransactionAction(null);
    setTransactionData(null);
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
