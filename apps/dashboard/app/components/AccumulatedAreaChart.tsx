import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartDataset,
  TooltipItem,
} from "chart.js";
import { useDashboardData } from "../hooks/useDashboardCharts";
import type { Period } from "../services/dashboardService";
import ChartSkeleton from "./ChartSkeleton";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

type Props = {
  period: Period;
};

export default function AccumulatedAreaChart({ period }: Props) {
  const periodLabelMap = {
    monthly: "Mensal",
    quarterly: "Trimestral",
    yearly: "Anual",
  } as const;

  const periodLabel = periodLabelMap[period];
  const { data, isLoading, error } = useDashboardData(period);

  if (isLoading) return <ChartSkeleton />;
  if (error)
    return <p className="text-[var(--color-danger)] text-center">{error}</p>;
  if (!data)
    return (
      <p className="text-[var(--color-text-muted)] text-center">
        Nenhum dado disponível
      </p>
    );

  const { revenue, expenses, labels } = data.charts.evolution;

  const accumulatedRevenue = revenue.reduce<number[]>((acc, cur, idx) => {
    acc.push((acc[idx - 1] ?? 0) + cur);
    return acc;
  }, []);

  const accumulatedExpenses = expenses.reduce<number[]>((acc, cur, idx) => {
    acc.push((acc[idx - 1] ?? 0) + cur);
    return acc;
  }, []);

  const datasets: ChartDataset<"line", number[]>[] = [
    {
      label: "Receita Acumulada",
      data: accumulatedRevenue,
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.15)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Despesa Acumulada",
      data: accumulatedExpenses,
      borderColor: "#ef4444",
      backgroundColor: "rgba(239,68,68,0.15)",
      tension: 0.4,
      fill: true,
    },
  ];

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (item: TooltipItem<"line">) =>
            `${item.dataset.label}: R$ ${Number(item.raw).toLocaleString("pt-BR")}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `R$ ${Number(value).toLocaleString("pt-BR")}`,
        },
      },
    },
  };

  return (
    <div className="bg-[var(--color-surface)] p-4 rounded-[var(--radius-md)] shadow-sm border border-[var(--color-border)] h-[350px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-[var(--color-text)]">
        Receita vs Despesa Acumulada ({periodLabel})
      </h2>

      <div className="flex-1 relative">
        <Line data={{ labels, datasets }} options={options} />
      </div>
    </div>
  );
}
