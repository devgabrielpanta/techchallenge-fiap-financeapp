"use client";

import { useState } from "react";
import { Button } from "@/components/button/Button";
import { useUser } from "@/context/UserContext";
import { X } from "lucide-react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const bankOptions = [
  "Banco Santander S.A.",
  "Nu Pagamentos S.A.",
  "Caixa Econômica Federal",
] as const;
type Bank = (typeof bankOptions)[number];

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, setUser } = useUser();

  const [bank, setBank] = useState<Bank>("Banco Santander S.A.");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState<
    "PIX" | "Crédito" | "Débito" | "Boleto bancário" | "Transferência"
  >("PIX");

  const paymentOptions = [
    "PIX",
    "Crédito",
    "Débito",
    "Boleto bancário",
    "Transferência",
  ] as const;

  const handleSubmit = () => {
    if (!bank || !amount || !date) return;
    const numericAmount = Number(amount.replace(/\D/g, "")) / 100;

    const newTransaction = {
      id: user.transactionList.length + 1,
      bank,
      type: "saidas" as const,
      operation: paymentType,
      description: `Transação via ${paymentType}`,
      amount: numericAmount,
      currency: "BRL",
      date: new Date(date).toISOString(),
    };

    setUser({
      ...user,
      transactionList: [newTransaction, ...user.transactionList],
    });

    setBank("Banco Santander S.A.");
    setAmount("");
    setDate("");
    setPaymentType("PIX");
    onClose();
  };

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-md)] w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
          onClick={onClose}
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
              value={bank}
              onChange={(e) => setBank(e.target.value as Bank)}
              className="p-2 border border-[var(--color-border)] rounded-md w-full"
            >
              {bankOptions.map((b) => (
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
              value={amount}
              onChange={(e) => setAmount(formatCurrencyInput(e.target.value))}
              className="p-2 border border-[var(--color-border)] rounded-md w-full"
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              value={paymentType}
              onChange={(e) =>
                setPaymentType(
                  e.target.value as (typeof paymentOptions)[number]
                )
              }
              className="p-2 border border-[var(--color-border)] rounded-md w-full"
            >
              {paymentOptions.map((opt) => (
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
