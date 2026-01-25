import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartDataset,
  TooltipItem,
} from "chart.js";
import ChartSkeleton from "./ChartSkeleton";
import { useDashboardData } from "../hooks/useDashboardCharts";
import type { Period } from "../services/dashboardService";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Props = {
  period: Period;
};

export default function RankingByCategoryChart({ period }: Props) {
  const periodLabelMap = {
    monthly: "Mensal",
    quarterly: "Trimestral",
    yearly: "Anual",
  } as const;
  const periodLabel = periodLabelMap[period];

  const { data: dashboardData, isLoading, error } = useDashboardData(period);
  const categories = dashboardData?.charts.expensesByCategory ?? [];
  const hasData = categories.length > 0;

  if (isLoading) return <ChartSkeleton />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!hasData)
    return <p className="text-gray-500 text-center">Nenhum dado disponível</p>;

  // Ordena do maior para o menor
  const sorted = [...categories].sort((a, b) => b.amount - a.amount);

  const chartData = {
    labels: sorted.map((c) => c.category),
    datasets: [
      {
        label: "Despesas",
        data: sorted.map((c) => c.amount),
        backgroundColor: [
          "#6d28d9",
          "#ef4444",
          "#f59e0b",
          "#6366f1",
          "#22c55e",
          "#0ea5e9",
        ],
      } as ChartDataset<"bar", number[]>,
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) => {
            const value = tooltipItem.raw as number;
            const total = categories.reduce((sum, c) => sum + c.amount, 0);
            const pct = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: R$ ${value.toLocaleString("pt-BR")} (${pct}%)`;
          },
        },
      },
    },
    scales: {
      x: { type: "category" },
      y: {
        type: "linear",
        ticks: {
          callback: (value) => `R$ ${Number(value).toLocaleString("pt-BR")}`,
        },
      },
    },
  };

  return (
    <section
      aria-labelledby="ranking-category-chart-title"
      className="bg-[var(--color-surface)] p-4 rounded-[var(--radius-md)] shadow-sm border border-[var(--color-border)] h-[400px] flex flex-col"
    >
      <h2
        id="ranking-category-chart-title"
        className="text-lg font-semibold mb-4"
      >
        Ranking de Categorias ({periodLabel})
      </h2>
      <div className="flex-1 relative">
        <Bar data={chartData} options={options} />
      </div>
    </section>
  );
}
