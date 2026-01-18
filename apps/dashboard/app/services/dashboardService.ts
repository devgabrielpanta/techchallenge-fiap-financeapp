export type Period = "monthly" | "quarterly" | "yearly";

export interface DashboardSummary {
  revenue: number;
  expenses: number;
  revenueChange: number; // % variação
  expensesChange: number; // % variação
}

export interface DashboardCharts {
  evolution: {
    labels: string[];
    revenue: number[];
    expenses: number[];
  };
  expensesByCategory: {
    category: string;
    amount: number;
  }[];
}

export interface DashboardData {
  summary: DashboardSummary;
  charts: DashboardCharts;
}

/* ================= MOCKS ================= */

const mockSummaryByPeriod: Record<Period, DashboardSummary> = {
  monthly: {
    revenue: 5600,
    expenses: 3900,
    revenueChange: 4.2,
    expensesChange: 2.1,
  },
  quarterly: {
    revenue: 17000,
    expenses: 11500,
    revenueChange: 6.8,
    expensesChange: 3.9,
  },
  yearly: {
    revenue: 69000,
    expenses: 49000,
    revenueChange: 12.4,
    expensesChange: 8.7,
  },
};

const mockChartsByPeriod: Record<Period, DashboardCharts> = {
  monthly: {
    evolution: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      revenue: [4200, 4800, 5100, 4700, 5300, 5600],
      expenses: [3100, 3300, 3400, 3200, 3600, 3900],
    },
    expensesByCategory: [
      { category: "Moradia", amount: 1800 },
      { category: "Alimentação", amount: 950 },
      { category: "Transporte", amount: 620 },
      { category: "Lazer", amount: 530 },
    ],
  },
  quarterly: {
    evolution: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      revenue: [14500, 15800, 16200, 17000],
      expenses: [9800, 10400, 10900, 11500],
    },
    expensesByCategory: [
      { category: "Moradia", amount: 5200 },
      { category: "Alimentação", amount: 3100 },
      { category: "Transporte", amount: 1800 },
      { category: "Lazer", amount: 1400 },
    ],
  },
  yearly: {
    evolution: {
      labels: ["2021", "2022", "2023", "2024"],
      revenue: [52000, 58000, 63000, 69000],
      expenses: [39000, 42000, 46000, 49000],
    },
    expensesByCategory: [
      { category: "Moradia", amount: 21000 },
      { category: "Alimentação", amount: 13000 },
      { category: "Transporte", amount: 9000 },
      { category: "Lazer", amount: 6000 },
    ],
  },
};

/* ================= FUNÇÃO DE FETCH SIMULADA ================= */

export async function fetchDashboardData(
  period: Period,
  options?: { simulateError?: boolean }
): Promise<DashboardData> {
  return new Promise((resolve, reject) => {
    const delay = 800 + Math.random() * 400; // delay entre 0.8s e 1.2s
    setTimeout(() => {
      // simula erro ocasional (5% de chance)
      if (options?.simulateError && Math.random() < 0.05) {
        reject(new Error("Erro ao carregar dados do dashboard."));
        return;
      }

      resolve({
        summary: mockSummaryByPeriod[period],
        charts: mockChartsByPeriod[period],
      });
    }, delay);
  });
}
