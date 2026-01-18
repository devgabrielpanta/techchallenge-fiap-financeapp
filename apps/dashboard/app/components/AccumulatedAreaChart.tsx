"use client";

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

  const { data: dashboardData, isLoading, error } = useDashboardData(period);

  if (isLoading) return <ChartSkeleton />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!dashboardData)
    return <p className="text-gray-500 text-center">Nenhum dado disponível</p>;

  const { revenue, expenses } = dashboardData.charts.evolution;

  // Calcular acumulado
  const accumulatedRevenue = revenue.reduce<number[]>((acc, cur, idx) => {
    const prev = acc[idx - 1] ?? 0;
    acc.push(prev + cur);
    return acc;
  }, []);

  const accumulatedExpenses = expenses.reduce<number[]>((acc, cur, idx) => {
    const prev = acc[idx - 1] ?? 0;
    acc.push(prev + cur);
    return acc;
  }, []);

  const datasets: ChartDataset<"line", number[]>[] = [
    {
      label: "Receita Acumulada",
      data: accumulatedRevenue,
      borderColor: "#22C55E",
      backgroundColor: "rgba(34,197,94,0.15)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Despesa Acumulada",
      data: accumulatedExpenses,
      borderColor: "#EF4444",
      backgroundColor: "rgba(239,68,68,0.15)",
      tension: 0.4,
      fill: true,
    },
  ];

  const data = {
    labels: dashboardData.charts.evolution.labels,
    datasets,
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (tooltipItem: TooltipItem<"line">) => {
            const value = tooltipItem.raw as number;
            return `${tooltipItem.dataset.label}: R$ ${value.toLocaleString("pt-BR")}`;
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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-[350px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">
        Receita vs Despesa Acumulada ({periodLabel})
      </h2>
      <div className="flex-1 relative">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
