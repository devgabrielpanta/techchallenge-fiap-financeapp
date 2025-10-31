"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button/Button";
import { useUser } from "@/context/UserContext";
import { X } from "lucide-react";
import { useTransactionModal } from "@/context/TransactionModal";
import {
  operationsData,
  OperationType,
  banksData,
  BankType,
} from "@/schemas/dataSchema";

const formatCurrencyInput = (value: string) => {
  // Remove tudo que não é número
  const numericValue = value.replace(/\D/g, "");
  // Converte para número com centavos
  const numberValue = Number(numericValue) / 100;

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const TransactionModal = () => {
  const { user, setUser } = useUser();
  const {
    transactionAction,
    setTransactionAction,
    transactionData,
    setTransactionData,
    cleanTransactionModal,
  } = useTransactionModal();

  const [displayAmount, setDisplayAmount] = useState(
    formatCurrencyInput(String(transactionData?.amount) || "0")
  );

  const handleSubmit = () => {
    if (!transactionData) return;

    const newTransaction = {
      id: user.transactionList.length + 1,
      ...transactionData,
    };

    setUser({
      ...user,
      transactionList: [newTransaction, ...user.transactionList],
    });

    cleanTransactionModal();
  };

  // toda vez que displayAmount muda → atualiza transactionData.amount (como número)
  useEffect(() => {
    if (!transactionData) return;
    if (displayAmount === "") {
      setTransactionData({ ...transactionData, amount: 0 });
      return;
    }

    // remove tudo que não for número ou vírgula
    const cleaned = displayAmount.replace(/[^\d,]/g, "");
    // substitui vírgula por ponto
    const normalized = cleaned.replace(",", ".");
    const parsed = parseFloat(normalized);

    setTransactionData({
      ...transactionData,
      amount: isNaN(parsed) ? 0 : parsed,
    });
  }, [displayAmount]); // eslint-disable-line react-hooks/exhaustive-deps

  if (transactionAction === null || transactionData === null) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-md)] w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
          onClick={() => setTransactionAction(null)}
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Nova Transação
          </h2>
          <p>Preencha os campos abaixo para adicionar uma nova transação</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* SELECT DE BANCO */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="bank"
              className="text-sm font-medium text-[var(--color-text)]"
            >
              Nome / Instituição
            </label>
            <select
              id="bank"
              value={transactionData.bank}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  bank: e.target.value as BankType,
                })
              }
              className="p-2 border border-[var(--color-border)] rounded-md w-full"
            >
              {banksData.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* VALOR */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-[var(--color-text)]"
            >
              Valor da transação
            </label>
            <input
              type="text"
              placeholder="Valor"
              className="p-2 w-full flex flex-row gap-2 items-center
                border border-[var(--color-border)] rounded-md"
              value={displayAmount}
              onChange={(e) =>
                setDisplayAmount(formatCurrencyInput(e.target.value))
              }
            />
          </div>

          {/* DATA */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="date"
              className="text-sm font-medium text-[var(--color-text)]"
            >
              Data
            </label>
            <input
              id="date"
              type="date"
              value={transactionData.date}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  date: e.target.value,
                })
              }
              className="p-2 border border-[var(--color-border)] rounded-md w-full"
            />
          </div>

          {/* TIPO DE PAGAMENTO */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="paymentType"
              className="text-sm font-medium text-[var(--color-text)]"
            >
              Tipo de pagamento
            </label>
            <select
              id="paymentType"
              value={transactionData.operation}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  operation: e.target.value as OperationType,
                })
              }
              className="p-2 border border-[var(--color-border)] rounded-md w-full"
            >
              {operationsData.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <Button variant="primary" onClick={handleSubmit}>
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};
