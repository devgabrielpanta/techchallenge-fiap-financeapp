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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{title}</p>

      {isLoading ? (
        <>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </>
      ) : (
        <>
          <p className="text-2xl font-bold">
            R$ {value.toLocaleString("pt-BR")}
          </p>

          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive
                ? "text-green-600"
                : isNegative
                  ? "text-red-600"
                  : "text-gray-500"
            }`}
          >
            {isPositive && <ArrowUp size={16} />}
            {isNegative && <ArrowDown size={16} />}
            {!isPositive && !isNegative && <ArrowRight size={16} />}

            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        </>
      )}
    </div>
  );
}
