"use client";

import { Button } from "@/components/ui/button/Button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ExtractCard from "./ExtractCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
interface ExtractProps {
  children?: React.ReactNode;
}

export const Extract: React.FC<ExtractProps> = () => {
  const user = useSelector((state: RootState) => state.global.user);
  const pathname = usePathname();
  const showExtract = !pathname?.includes("/extract");
  const router = useRouter();

  // Últimas transações
  const lastFiveTransactions = [...user.transactionList]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // mais recentes primeiro
    .slice(0, 5); // pega os 5 primeiros

  if (!showExtract) return null;
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
        "flex flex-col justify-between",
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
            {lastFiveTransactions.map((tx, index) => (
              <ExtractCard
                key={`transactionCard-${tx.id}-${index}`}
                transaction={tx}
              />
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
