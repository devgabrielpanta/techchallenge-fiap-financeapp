"use client";

import { ColumnDef, Column } from "@tanstack/react-table";
import { TransactionType } from "@/schemas/dataSchema";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button/Button";

interface TableButtonProps {
  column: Column<TransactionType, unknown>;
  span: string;
}

const TableButton: React.FC<TableButtonProps> = ({ column, span }) => (
  <Button
    style={{ padding: "0" }}
    className="font-bold cursor-pointer hover:scale-102 active:scale-102 transition-transform duration-200 hover:bg-transparent hover:text-[var(--color-primary)] hover:underline"
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {span}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export const columns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <TableButton column={column} span="Data" />;
    },
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <TableButton column={column} span="Categoria" />;
    },
  },
  {
    accessorKey: "operation",
    header: ({ column }) => {
      return <TableButton column={column} span="Tipo de pagamento" />;
    },
  },
  {
    id: "amount-income",
    accessorKey: "amount",
    header: ({ column }) => {
      return <TableButton column={column} span="Entradas" />;
    },
    cell: ({ getValue, row }) => {
      const amount = getValue() as number;
      const formattedAmount = amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return (
        <span
          className={row.original.type === "entradas" ? "text-green-500" : ""}
        >
          {row.original.type === "entradas" ? formattedAmount : "-"}
        </span>
      );
    },
  },
  {
    id: "amount-expense",
    accessorKey: "amount",
    header: ({ column }) => {
      return <TableButton column={column} span="Saídas" />;
    },
    cell: ({ getValue, row }) => {
      const amount = getValue() as number;
      const formattedAmount = amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return (
        <span className={row.original.type === "saidas" ? "text-red-500" : ""}>
          {row.original.type === "saidas" ? formattedAmount : "-"}
        </span>
      );
    },
  },
];
