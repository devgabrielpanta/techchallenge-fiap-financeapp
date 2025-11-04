// TransactionsTable.stories.tsx
"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DataTable } from "./TransactionsTable";
import { columns } from "./TransactionsColumn";
import { TransactionType } from "@/schemas/dataSchema";

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
];

// Storybook meta
const meta: Meta<typeof DataTable> = {
  title: "Components/TransactionsTable",
  component: DataTable,
  parameters: {
    // Isso vai exibir apenas a documentação Default
    docs: {
      description: {
        component: "Tabela de transações simples para documentação, sem edição de linhas.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

// Story Default exibindo apenas dados, sem funcionalidade de edição
export const Default: Story = {
  render: () => <DataTable columns={columns} data={sampleTransactions} />,
};
