import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { columns } from "./TransactionsColumn";
import { TransactionType } from "@/schemas/dataSchema";

// Dados de exemplo
const sampleData: TransactionType[] = [
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

// Componente para renderizar a tabela
const TransactionsTable = () => {
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 max-w-4xl">
      <table className="min-w-full border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b px-4 py-2 text-left text-sm font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-b px-4 py-2 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const meta: Meta<typeof TransactionsTable> = {
  title: "Components/TransactionsColumn",
  component: TransactionsTable,
  tags: ["!autodocs"],
};

export default meta;

type Story = StoryObj<typeof TransactionsTable>;

export const Default: Story = {};
