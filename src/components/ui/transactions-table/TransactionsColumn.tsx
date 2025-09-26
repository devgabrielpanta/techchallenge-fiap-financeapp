"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TransactionType } from "@/schemas/dataSchema";

export const columns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "subcategory",
    header: "Subcategoria",
  },
  {
    accessorKey: "bank",
    header: "Banco",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "operation",
    header: "Operação",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "currency",
    header: "Moeda",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
];
