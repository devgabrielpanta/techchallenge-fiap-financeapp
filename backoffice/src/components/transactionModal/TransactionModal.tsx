"use client";

import { Button } from "@/components/ui/button/Button";
import {
  operationsData,
  OperationType,
  TransactionType,
} from "@/schemas/dataSchema";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setUser } from "@/store/slices/globalSlice";
import {
  setTransactionData,
  cleanTransactionModal,
} from "@/store/slices/transactionSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.global.user);
  const transactionAction = useSelector(
    (state: RootState) => state.transaction.transactionAction,
  );
  const transactionData = useSelector(
    (state: RootState) => state.transaction.transactionData,
  );

  const [displayAmount, setDisplayAmount] = useState(
    formatCurrencyInput(String(transactionData?.amount) || "0"),
  );
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!transactionData) return;

    let updatedTransactions: TransactionType[] | [] = user.transactionList;

    if (transactionAction === "create") {
      const newTransaction = {
        id: user.transactionList.length + 1,
        ...transactionData,
      };
      updatedTransactions = [newTransaction, ...user.transactionList];
    } else if (transactionAction === "edit") {
      updatedTransactions = user.transactionList.map((t) =>
        t.id === transactionData.id ? (transactionData as TransactionType) : t,
      );
    }

    // (serialização) Garantir que a data esteja no formato ISO antes de salvar
    updatedTransactions = updatedTransactions.map((t) => ({
      ...t,
      date: new Date(t.date).toISOString(),
    }));

    dispatch(
      setUser({
        ...user,
        transactionList: updatedTransactions,
      }),
    );

    handleCloseModal();
  };

  useEffect(() => {
    if (transactionAction === "edit" && transactionData) {
      setDisplayAmount(
        formatCurrencyInput(String(transactionData.amount * 100)),
      );
    }
  }, [transactionAction]); // eslint-disable-line react-hooks/exhaustive-deps

  // toda vez que displayAmount muda → atualiza transactionData.amount (como número)
  useEffect(() => {
    if (!transactionData) return;
    if (displayAmount === "") {
      dispatch(setTransactionData({ ...transactionData, amount: 0 }));
      return;
    }

    // remove tudo que não for número ou vírgula
    const cleaned = displayAmount.replace(/[^\d,]/g, "");
    // substitui vírgula por ponto
    const normalized = cleaned.replace(",", ".");
    const parsed = parseFloat(normalized);

    dispatch(
      setTransactionData({
        ...transactionData,
        amount: isNaN(parsed) ? 0 : parsed,
      }),
    );
  }, [displayAmount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!transactionData || transactionAction !== "edit") return;
    const originalTransaction = user.transactionList.find(
      (t) => t.id === transactionData.id,
    );
    if (!originalTransaction) return;

    // Verifica se houve mudanças comparando os campos
    const changed =
      originalTransaction.category !== transactionData.category ||
      originalTransaction.type !== transactionData.type ||
      originalTransaction.operation !== transactionData.operation ||
      originalTransaction.description !== transactionData.description ||
      originalTransaction.amount !== transactionData.amount ||
      originalTransaction.currency !== transactionData.currency ||
      new Date(originalTransaction.date).toISOString() !==
        new Date(transactionData.date).toISOString();
    setHasChanges(changed);
  }, [transactionData, transactionAction]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {
    if (!transactionData || transactionAction !== "edit") return;
    const updatedTransactions = user.transactionList.filter(
      (t) => t.id !== transactionData.id,
    );

    dispatch(
      setUser({
        ...user,
        transactionList: updatedTransactions,
      }),
    );

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setDisplayAmount(formatCurrencyInput("0"));
    dispatch(cleanTransactionModal());
  };

  if (transactionAction === null || transactionData === null) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
      onClick={handleCloseModal}
    >
      <div
        className="bg-[var(--color-surface)] rounded-[var(--radius-md)] w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()} // <- isso impede o fechamento ao clicar dentro
      >
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-md)] w-full max-w-md p-6 relative">
          <button
            className="absolute top-3 right-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
            onClick={handleCloseModal}
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
                htmlFor="category"
                className="text-sm font-medium text-[var(--color-text)]"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                value={transactionData.category}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "add-category") {
                    //setAddingCategory(true);
                    dispatch(
                      setTransactionData({
                        ...transactionData,
                        category: "",
                      }),
                    );
                  } else {
                    dispatch(
                      setTransactionData({
                        ...transactionData,
                        category: e.target.value,
                      }),
                    );
                  }
                }}
                className="p-2 border border-[var(--color-border)] rounded-md w-full"
              >
                <option disabled value="">
                  Selecione...
                </option>
                {Array.from(
                  new Set(user.transactionList.map((t) => t.category)),
                ).map((category) => (
                  <option key={`categoryOption-${category}`} value={category}>
                    {category}
                  </option>
                ))}
                <option
                  className="bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-secondary)] focus:ring-[var(--color-primary)]"
                  value="add-category"
                >
                  + Adicionar Categoria
                </option>
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
                value={transactionData.date.toLocaleString().split("T")[0]}
                onChange={(e) =>
                  dispatch(
                    setTransactionData({
                      ...transactionData,
                      date: e.target.value,
                    }),
                  )
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
                  dispatch(
                    setTransactionData({
                      ...transactionData,
                      operation: e.target.value as OperationType,
                    }),
                  )
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
            <div className="flex flex-row gap-2 justify-center items-center mt-4">
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={transactionAction === "edit" && !hasChanges}
                className="disabled:opacity-40"
              >
                {transactionAction === "create"
                  ? "Adicionar"
                  : "Salvar Alterações"}
              </Button>
              {transactionAction === "edit" && (
                <Button variant="danger" onClick={handleDelete}>
                  Excluir transação
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
