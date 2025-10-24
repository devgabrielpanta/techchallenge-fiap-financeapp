"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { TransactionModal } from "@/components/transactionModal/TransactionModal";

interface TransactionModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const TransactionModalContext = createContext<
  TransactionModalContextType | undefined
>(undefined);

export const TransactionModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <TransactionModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <TransactionModal isOpen={isOpen} onClose={closeModal} />
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
