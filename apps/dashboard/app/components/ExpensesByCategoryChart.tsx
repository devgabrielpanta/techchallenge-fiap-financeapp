import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
  ChartData,
  ChartDataset,
} from "chart.js";
import ChartSkeleton from "./ChartSkeleton";
import { useDashboardData } from "../hooks/useDashboardCharts";
import type { Period } from "../services/dashboardService";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  period: Period;
  showPercentage?: boolean;
};

export default function ExpensesByCategoryChart({
  period,
  showPercentage = true,
}: Props) {
  const periodLabelMap = {
    monthly: "Mensal",
    quarterly: "Trimestral",
    yearly: "Anual",
  } as const;

  const periodLabel = periodLabelMap[period];

  const { data: dashboardData, isLoading, error } = useDashboardData(period);

  const expensesByCategory = dashboardData?.charts.expensesByCategory ?? [];
  const hasData = expensesByCategory.length > 0;

  const chartData: ChartData<"doughnut", number[], string> = {
    labels: expensesByCategory.map((item) => item.category),
    datasets: [
      {
        label: "Despesas",
        data: expensesByCategory.map((item) => item.amount),
        backgroundColor: [
          "#6d28d9",
          "#ef4444",
          "#f59e0b",
          "#22c55e",
          "#6366f1",
          "#0ea5e9",
        ],
        borderWidth: 1,
      } as ChartDataset<"doughnut", number[]>,
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"doughnut">) => {
            const value = tooltipItem.raw as number;
            const label = tooltipItem.label ?? "";
            if (showPercentage && expensesByCategory.length > 0) {
              const total = expensesByCategory.reduce(
                (sum, item) => sum + item.amount,
                0,
              );
              const pct = ((value / total) * 100).toFixed(1);
              return `${label}: R$ ${value.toLocaleString("pt-BR")} (${pct}%)`;
            }
            return `${label}: R$ ${value.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
  };

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!hasData) {
    return (
      <p className="text-sm text-gray-500 text-center">
        Nenhum dado de despesas disponível
      </p>
    );
  }

  return (
    <section
      aria-labelledby="expenses-category-title"
      className="bg-[var(--color-surface)] p-4 rounded-[var(--radius-md)] shadow-sm border border-[var(--color-border)]"
      aria-label="Gráfico de despesas por categoria"
    >
      <h2 id="expenses-category-title" className="text-lg font-semibold mb-4">
        Despesas por Categoria ({periodLabel})
      </h2>

      <div className="relative h-[320px] flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
    </section>
  );
}
