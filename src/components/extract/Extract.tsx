"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button/Button";

interface ExtractProps {
  children?: React.ReactNode;
}

export const Extract: React.FC<ExtractProps> = () => {
  const { user } = useUser();
  const router = useRouter();

  // Últimas transações
  const lastFiveTransactions = [...user.transactionList]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // mais recentes primeiro
    .slice(0, 5); // pega os 5 primeiros

  return (
    <aside
      className={cn(
        "w-full lg:w-[260px] flex-shrink-0",
        "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg",
        "overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border)] scrollbar-track-transparent",
        "rounded-[var(--radius-md)]",
        // Desktop
        "lg:sticky lg:top-[64px] lg:h-[calc(100vh-84px)]",
        "lg:m-[10px]",
        "flex flex-col justify-between"
      )}
    >
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Extrato
          </h2>
          <span className="text-xs">Últimas transações</span>
        </div>

        {lastFiveTransactions.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {lastFiveTransactions.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between items-center px-2 py-1 hover:rounded-md hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] transition-colors border-b border-[var(--color-border)] pb-1 cursor-pointer"
              >
                <div className="flex flex-col text-sm pb-2">
                  <span>{tx.bank}</span>
                  <span>{tx.operation}</span>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      tx.type === "entradas" ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {tx.type === "saidas" ? "- " : "+ "}
                    {formatCurrency(tx.amount)}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[--color-primary]">
                  {new Date(tx.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    timeZone: "UTC",
                  })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">
            Nenhum lançamento disponível.
          </p>
        )}

        {user.transactionList.length > 5 && (
          <div className="mt-4">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => router.push("/extract")}
            >
              Ver todas
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};
