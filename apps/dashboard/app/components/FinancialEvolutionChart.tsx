// FinancialEvolutionChart.tsx
import { Line } from "react-chartjs-2";
import { useDashboardData } from "../hooks/useDashboardCharts";
import type { Period } from "../services/dashboardService";
import { ChartDataset, TooltipItem } from "chart.js";
import ChartSkeleton from "./ChartSkeleton";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

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
  showBalanceLine?: boolean; // nova prop opcional
};

export default function FinancialEvolutionChart({
  period,
  showBalanceLine,
}: Props) {
  const { data: dashboardData, isLoading, error } = useDashboardData(period);

  if (isLoading)
    return <div className="h-[300px] bg-gray-100 animate-pulse rounded" />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!dashboardData) return null;

  const charts = dashboardData.charts;

  const periodLabelMap = {
    monthly: "Mensal",
    quarterly: "Trimestral",
    yearly: "Anual",
  } as const;

  const periodLabel = periodLabelMap[period];

  // Monta datasets padrão: receita e despesa
  const datasets: ChartDataset<"line", number[]>[] = [
    {
      label: "Receitas",
      data: charts.evolution.revenue,
      borderColor: "#22C55E",
      backgroundColor: "rgba(34,197,94,0.15)",
      tension: 0.4,
    },
    {
      label: "Despesas",
      data: charts.evolution.expenses,
      borderColor: "#EF4444",
      backgroundColor: "rgba(239,68,68,0.15)",
      tension: 0.4,
    },
  ];

  // 🔹 Aqui entra a linha de saldo, se a prop estiver ativa
  if (showBalanceLine && charts) {
    const saldo = charts.evolution.revenue.map(
      (rev, idx) => rev - charts.evolution.expenses[idx]
    );
    datasets.push({
      label: "Saldo",
      data: saldo,
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59,130,246,0.1)",
      borderDash: [5, 5],
      tension: 0.4,
    });
  }

  const data = {
    labels: charts.evolution.labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (tooltipItem: TooltipItem<"line">) {
            const value = tooltipItem.raw as number;
            return `${tooltipItem.dataset.label}: R$ ${value.toLocaleString("pt-BR")}`;
          },
          afterBody: function (tooltipItems: TooltipItem<"line">[]) {
            const receita =
              (tooltipItems.find((i) => i.dataset.label === "Receitas")
                ?.raw as number) ?? 0;
            const despesa =
              (tooltipItems.find((i) => i.dataset.label === "Despesas")
                ?.raw as number) ?? 0;
            const saldo = receita - despesa;
            return `Saldo: R$ ${saldo.toLocaleString("pt-BR")}`;
          },
        },
      },
    },
    scales: {
      x: { type: "category" as const },
      y: {
        type: "linear" as const,
        ticks: {
          callback: (value: unknown) =>
            `R$ ${Number(value).toLocaleString("pt-BR")}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-[350px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">
        Evolução Financeira ({periodLabel})
      </h2>

      <div className="flex-1 relative">
        {isLoading ? (
          <ChartSkeleton />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
}
