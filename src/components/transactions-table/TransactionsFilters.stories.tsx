import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TransactionsFilters from "./TransactionsFilters";
import { TransactionType } from "@/schemas/dataSchema";
import { Button } from "@/components/ui/button/button";

// Dados de exemplo
const sampleTransactions: TransactionType[] = [
  {
    id: 1,
    operation: "PIX",
    bank: "Banco Santander S.A.",
    amount: 1500,
    type: "entradas",
    description: "Salário",
    currency: "BRL",
    date: "2025-11-03",
  },
  {
    id: 2,
    operation: "Débito",
    bank: "Caixa Econômica Federal",
    amount: 200,
    type: "saidas",
    description: "Almoço",
    currency: "BRL",
    date: "2025-11-02",
  },
  {
    id: 3,
    operation: "Boleto bancário",
    bank: "Nu Pagamentos S.A.",
    amount: 300,
    type: "saidas",
    description: "Conta de luz",
    currency: "BRL",
    date: "2025-11-01",
  },
];

// Componente para storybook
const TransactionsFiltersStory = () => {
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionType[]>(sampleTransactions);
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpenFilters(true)}>Abrir Filtros</Button>
      <TransactionsFilters
        transactions={sampleTransactions}
        filteredTransactions={filteredTransactions}
        setFilteredTransactions={setFilteredTransactions}
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
      />
      <div className="mt-4 p-4 border rounded">
        <h4 className="font-bold">Transações Filtradas:</h4>
        <ul>
          {filteredTransactions.map((tx) => (
            <li key={tx.id}>
              {tx.operation} - {tx.bank} - {tx.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} - {tx.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof TransactionsFiltersStory> = {
  title: "Components/TransactionsFilters",
  component: TransactionsFiltersStory,
  tags: ["!autodocs"],
};

export default meta;

type Story = StoryObj<typeof TransactionsFiltersStory>;

export const Default: Story = {};
