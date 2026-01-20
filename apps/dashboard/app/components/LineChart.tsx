import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function LineChart() {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
    datasets: [
      {
        label: "Receitas",
        data: [12000, 15000, 14000, 18000, 20000],
        borderColor: "#22c55e",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
      },
      {
        label: "Despesas",
        data: [8000, 9000, 11000, 10000, 13000],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return <Line data={data} options={options} />;
}
