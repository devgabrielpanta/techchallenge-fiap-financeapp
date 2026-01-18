"use client";
import type { TransactionType } from "@/schemas/dataSchema";
import { formatCurrency } from "@/lib/utils";
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
    <li
      key={transaction.id}
      className="flex justify-between items-center px-2 py-1 hover:rounded-md hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] transition-colors border-b border-[var(--color-border)] pb-1 cursor-pointer"
      onClick={() => dispatch(startEditTransaction(transaction))}
    >
      <div className="flex flex-col text-sm pb-2">
        <span>{transaction.bank}</span>
        <span>{transaction.operation}</span>
        <span
          className={cn(
            "text-sm font-semibold",
            transaction.type === "entradas" ? "text-green-500" : "text-red-500",
          )}
        >
          {transaction.type === "saidas" ? "- " : "+ "}
          {formatCurrency(transaction.amount)}
        </span>
      </div>
      <span className="text-[10px] font-semibold text-[--color-primary]">
        {new Date(transaction.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          timeZone: "UTC",
        })}
      </span>
    </li>
  );
}
