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
    className="font-bold cursor-pointer hover:scale-102 active:scale-102 transition-transform duration-200"
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {span}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export const columns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "operation",
    header: ({ column }) => {
      return <TableButton column={column} span="Tipo de pagamento" />;
    },
  },
  {
    accessorKey: "bank",
    header: ({ column }) => {
      return <TableButton column={column} span="Nome/Instituição" />;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <TableButton column={column} span="Valor" />;
    },
    cell: ({ getValue, row }) => {
      const amount = getValue() as number;
      const formattedAmount = amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return (
        <span
          className={`${
            row.original.type === "entradas" ? "text-green-500" : "text-red-500"
          }`}
        >
          {formattedAmount}
        </span>
      );
    },
  },
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
];
