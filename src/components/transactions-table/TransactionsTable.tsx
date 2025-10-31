"use client";

import { useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactionModal } from "@/context/TransactionModalProvider";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { startEditTransaction } = useTransactionModal();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table className="w-full border-collapse text-sm">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="bg-[var(--color-surface)]">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className="border-b border-[var(--color-border)] p-2 w-[15%] text-left text-[var(--color-text-muted)]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="group border-b border-[var(--color-border)] 
                transition-colors duration-200 
                hover:bg-[var(--color-hover)]"
            >
              {row.getVisibleCells().map((cell, idx, arr) => {
                {
                  /** Se for a última célula da linha, adiciona o ícone de editar */
                }
                const isLast = idx === arr.length - 1;
                return (
                  <TableCell
                    key={cell.id}
                    className={`p-2 ${isLast ? "relative" : ""}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}

                    {isLast && (
                      <button
                        type="button"
                        aria-label="Edit row"
                        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 rounded opacity-0
                        group-hover:opacity-100 transition bg-[var(--color-surface)] hover:bg-[var(--color-hover)]
                        cursor-pointer
                        "
                        onClick={() =>
                          startEditTransaction(
                            (row.original as { id: number }).id
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
