export type Period = "monthly" | "quarterly" | "yearly";

export interface DashboardSummary {
  revenue: number;
  expenses: number;
  revenueChange: number;
  expensesChange: number;
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

/* ================= FUNÇÕES AUXILIARES ================= */

function randomVariation(base: number, variancePercent = 5): number {
  const variation = (Math.random() * 2 - 1) * (variancePercent / 100) * base;
  return Math.round(base + variation);
}

function generateMonthlyData(): DashboardCharts {
  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const baseRevenue = [4200, 4800, 5100, 4700, 5300, 5600];
  const baseExpenses = [3100, 3300, 3400, 3200, 3600, 3900];

  return {
    evolution: {
      labels,
      revenue: baseRevenue.map((r) => randomVariation(r, 8)),
      expenses: baseExpenses.map((e) => randomVariation(e, 8)),
    },
    expensesByCategory: [
      { category: "Moradia", amount: randomVariation(1800, 10) },
      { category: "Alimentação", amount: randomVariation(1000, 10) },
      { category: "Transporte", amount: randomVariation(650, 10) },
      { category: "Lazer", amount: randomVariation(500, 10) },
    ],
  };
}

function generateQuarterlyData(): DashboardCharts {
  const labels = ["Q1", "Q2", "Q3", "Q4"];
  const baseRevenue = [14500, 15800, 16200, 17000];
  const baseExpenses = [9800, 10400, 10900, 11500];

  return {
    evolution: {
      labels,
      revenue: baseRevenue.map((r) => randomVariation(r, 6)),
      expenses: baseExpenses.map((e) => randomVariation(e, 6)),
    },
    expensesByCategory: [
      { category: "Moradia", amount: randomVariation(5200, 8) },
      { category: "Alimentação", amount: randomVariation(3100, 8) },
      { category: "Transporte", amount: randomVariation(1800, 8) },
      { category: "Lazer", amount: randomVariation(1400, 8) },
    ],
  };
}

function generateYearlyData(): DashboardCharts {
  const labels = ["2021", "2022", "2023", "2024", "2025"];
  const baseRevenue = [52000, 58000, 63000, 69000, 72000];
  const baseExpenses = [39000, 42000, 46000, 49000, 51000];

  return {
    evolution: {
      labels,
      revenue: baseRevenue.map((r) => randomVariation(r, 5)),
      expenses: baseExpenses.map((e) => randomVariation(e, 5)),
    },
    expensesByCategory: [
      { category: "Moradia", amount: randomVariation(22000, 7) },
      { category: "Alimentação", amount: randomVariation(13500, 7) },
      { category: "Transporte", amount: randomVariation(9500, 7) },
      { category: "Lazer", amount: randomVariation(6000, 7) },
    ],
  };
}

/* ================= MOCKS DINÂMICOS ================= */

const mockChartsByPeriod: Record<Period, DashboardCharts> = {
  monthly: generateMonthlyData(),
  quarterly: generateQuarterlyData(),
  yearly: generateYearlyData(),
};

const mockSummaryByPeriod: Record<Period, DashboardSummary> = {
  monthly: {
    revenue:
      mockChartsByPeriod.monthly.evolution.revenue.reduce((a, b) => a + b, 0) /
      6,
    expenses:
      mockChartsByPeriod.monthly.evolution.expenses.reduce((a, b) => a + b, 0) /
      6,
    revenueChange: randomVariation(4, 30) / 10, // ex: ~4.0%
    expensesChange: randomVariation(2, 30) / 10, // ex: ~2.1%
  },
  quarterly: {
    revenue:
      mockChartsByPeriod.quarterly.evolution.revenue.reduce(
        (a, b) => a + b,
        0
      ) / 4,
    expenses:
      mockChartsByPeriod.quarterly.evolution.expenses.reduce(
        (a, b) => a + b,
        0
      ) / 4,
    revenueChange: randomVariation(6, 30) / 10,
    expensesChange: randomVariation(3, 30) / 10,
  },
  yearly: {
    revenue:
      mockChartsByPeriod.yearly.evolution.revenue[
        mockChartsByPeriod.yearly.evolution.revenue.length - 1
      ],
    expenses:
      mockChartsByPeriod.yearly.evolution.expenses[
        mockChartsByPeriod.yearly.evolution.expenses.length - 1
      ],
    revenueChange: randomVariation(12, 20) / 10,
    expensesChange: randomVariation(8, 20) / 10,
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
