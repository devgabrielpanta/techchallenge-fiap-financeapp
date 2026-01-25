"use client";
import type { TransactionType } from "@/schemas/dataSchema";
import { formatCurrency, formatDateUTC } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { startEditTransaction } from "@/store/slices/transactionSlice";

export default function ExtractCard({
  transaction,
}: {
  transaction: TransactionType;
}) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <li key={transaction.id} className="w-full">
      <button
        type="button"
        onClick={() => dispatch(startEditTransaction(transaction))}
        className="group flex flex-col p-3 hover:rounded-md hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] transition-colors border-b border-[var(--color-border)] pb-1 cursor-pointer w-full text-left"
        aria-label={`Editar transação ${transaction.description}`}
      >
        <div className="flex flex-row justify-between items-start text-sm pb-2">
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-white)]">
              {formatDateUTC(transaction.date)}
            </span>
            <span className="text-xs font-light line-clamp-1">
              {transaction.operation}
            </span>
          </div>
          <span
            className={cn(
              "text-sm font-semibold min-w-fit",
              transaction.type === "entradas"
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {transaction.type === "saidas" ? "- " : "+ "}
            {formatCurrency(transaction.amount)}
          </span>
        </div>

        <div className="flex flex-row justify-between items-end text-sm pb-2">
          <span className="text-sm font-medium truncate">
            {transaction.description}
          </span>
          <span>{transaction.category}</span>
        </div>
      </button>
    </li>
  );
}
