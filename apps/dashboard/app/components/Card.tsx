import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  value: number;
  change: number;
  isLoading?: boolean;
}

export default function Card({
  title,
  value,
  change,
  isLoading = false,
}: CardProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="bg-[var(--color-surface)] p-4 rounded-[var(--radius-md)] shadow-sm border border-[var(--color-border)]">
      <p className="text-sm text-[var(--color-text-muted)] mb-1">{title}</p>

      {isLoading ? (
        <>
          <div className="h-8 w-32 bg-[var(--color-border)] rounded animate-pulse mb-2" />
          <div className="h-4 w-20 bg-[var(--color-border)] rounded animate-pulse" />
        </>
      ) : (
        <>
          <p className="text-2xl font-bold text-[var(--color-text)]">
            R$ {value.toLocaleString("pt-BR")}
          </p>

          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive
                ? "text-[var(--color-success)]"
                : isNegative
                  ? "text-[var(--color-danger)]"
                  : "text-[var(--color-text-muted)]"
            }`}
          >
            {isPositive && <ArrowUp size={16} aria-hidden="true" />}
            {isNegative && <ArrowDown size={16} aria-hidden="true" />}
            {!isPositive && !isNegative && (
              <ArrowRight size={16} aria-hidden="true" />
            )}

            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        </>
      )}
    </div>
  );
}
