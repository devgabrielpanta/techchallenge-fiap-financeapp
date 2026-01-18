"use client";

import Card from "./components/Card";
import FinancialEvolutionChart from "./components/FinancialEvolutionChart";
import ExpensesByCategoryChart from "./components/ExpensesByCategoryChart";
import PeriodSelector from "./components/PeriodSelector";
import { useDashboardData } from "./hooks/useDashboardCharts";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import RankingByCategoryChart from "./components/RankingByCategoryChart";
import AccumulatedAreaChart from "./components/AccumulatedAreaChart";

export default function DashboardRoot() {
  // 🔹 Hook unificado para todos os dados do dashboard
  const selectedPeriod = useSelector(
    (state: RootState) => state.dashboard.selectedPeriod
  );

  const { data, isLoading, error } = useDashboardData(selectedPeriod);

  const totalRevenue = data?.summary.revenue ?? 0;
  const totalExpenses = data?.summary.expenses ?? 0;
  const revenueChange = data?.summary.revenueChange ?? 0;
  const expensesChange = data?.summary.expensesChange ?? 0;

  const balance = totalRevenue - totalExpenses;

  // Média de despesas
  const averageExpense = data
    ? data.charts.expensesByCategory.reduce((a, b) => a + b.amount, 0) /
      data.charts.expensesByCategory.length
    : 0;

  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      {/* Header + Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>
          <p className="text-sm text-gray-500 mb-6">
            Visão geral das finanças por período
          </p>
        </div>

        <PeriodSelector aria-label="Selecionar período para atualização dos gráficos" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          tabIndex={0}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <Card
            title="Receitas"
            value={totalRevenue}
            change={revenueChange}
            isLoading={isLoading}
            aria-label={`Receitas totais: R$ ${totalRevenue.toLocaleString("pt-BR")}, mudança: ${revenueChange}%`}
          />
        </div>
        <div
          tabIndex={0}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <Card
            title="Despesas"
            value={totalExpenses}
            change={expensesChange}
            isLoading={isLoading}
            aria-label={`Despesas totais: R$ ${totalExpenses.toLocaleString("pt-BR")}, mudança: ${expensesChange}%`}
          />
        </div>
        <div
          tabIndex={0}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <Card
            title="Saldo"
            value={balance}
            change={revenueChange - expensesChange}
            isLoading={isLoading}
            aria-label={`Saldo: R$ ${balance.toLocaleString("pt-BR")}, mudança: ${revenueChange - expensesChange}%`}
          />
        </div>
        <div
          tabIndex={0}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <Card
            title="Despesa Média"
            value={averageExpense}
            change={0}
            isLoading={isLoading}
            aria-label={`Despesa Média: R$ ${averageExpense.toLocaleString("pt-BR")}`}
          />
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div
        tabIndex={0}
        role="img"
        aria-label={`Gráfico de evolução financeira mostrando receitas, despesas e saldo para o período ${selectedPeriod}.`}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <FinancialEvolutionChart period={selectedPeriod} showBalanceLine />

        {/* Texto para leitores de tela */}
        {data?.charts.evolution.labels.length && (
          <span className="sr-only">
            {data.charts.evolution.labels
              .map((label, idx) => {
                const receita = data.charts.evolution.revenue[idx];
                const despesa = data.charts.evolution.expenses[idx];
                const saldo = receita - despesa;
                return `${label}: Receita R$ ${receita.toLocaleString(
                  "pt-BR"
                )}, Despesa R$ ${despesa.toLocaleString(
                  "pt-BR"
                )}, Saldo R$ ${saldo.toLocaleString("pt-BR")}`;
              })
              .join(". ")}
          </span>
        )}
      </div>
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          tabIndex={0}
          role="img"
          aria-label={`Gráfico de pizza mostrando despesas por categoria para o período ${selectedPeriod}.`}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <ExpensesByCategoryChart period={selectedPeriod} showPercentage />

          {/* Texto para leitores de tela */}
          {data?.charts.expensesByCategory.length && (
            <span className="sr-only">
              {data.charts.expensesByCategory
                .map(
                  (item) =>
                    `${item.category}: R$ ${item.amount.toLocaleString(
                      "pt-BR"
                    )} (${(
                      (item.amount /
                        data.charts.expensesByCategory.reduce(
                          (a, b) => a + b.amount,
                          0
                        )) *
                      100
                    ).toFixed(1)}%)`
                )
                .join(", ")}
            </span>
          )}
        </div>
        <div
          tabIndex={0}
          aria-label={`Gráfico de barras mostrando despesas por categoria para o período ${selectedPeriod}.`}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <RankingByCategoryChart period={selectedPeriod} />

          {/* Texto para leitores de tela */}
          {data?.charts.expensesByCategory.length && (
            <span className="sr-only">
              {data.charts.expensesByCategory
                .map(
                  (item) =>
                    `${item.category}: R$ ${item.amount.toLocaleString(
                      "pt-BR"
                    )} (${(
                      (item.amount /
                        data.charts.expensesByCategory.reduce(
                          (a, b) => a + b.amount,
                          0
                        )) *
                      100
                    ).toFixed(1)}%)`
                )
                .join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Gráficos complementares */}
      <div
        tabIndex={0}
        aria-label={`Gráfico de área acumulada mostrando a evolução acumulada de receitas e despesas ao longo do período ${selectedPeriod}.`}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <AccumulatedAreaChart period={selectedPeriod} />

        {/* Texto para leitores de tela */}
        {data?.charts.evolution.labels.length && (
          <span className="sr-only">
            {data.charts.evolution.labels
              .map((label, idx) => {
                const receita = data.charts.evolution.revenue[idx];
                const despesa = data.charts.evolution.expenses[idx];
                const saldo = receita - despesa;
                return `${label}: Receita R$ ${receita.toLocaleString(
                  "pt-BR"
                )}, Despesa R$ ${despesa.toLocaleString(
                  "pt-BR"
                )}, Saldo R$ ${saldo.toLocaleString("pt-BR")}`;
              })
              .join(". ")}
          </span>
        )}
      </div>
    </div>
  );
}
