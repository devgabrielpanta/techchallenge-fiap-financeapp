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
import { useEffect } from "react";

export function useThemeSync() {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "SET_THEME") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(event.data.theme);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
}

export default function DashboardRoot() {
  useThemeSync();

  const selectedPeriod = useSelector(
    (state: RootState) => state.dashboard.selectedPeriod,
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
    <div className="w-full overflow-x-hidden grid grid-cols-1 gap-6 md:pr-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <header>
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            Dashboard Financeiro
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Visão geral das finanças por período
          </p>
        </header>

        <PeriodSelector aria-label="Selecionar período para atualização dos gráficos" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <section
          aria-label="Receitas"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <Card
            title="Receitas"
            value={totalRevenue}
            change={revenueChange}
            isLoading={isLoading}
            aria-label={`Receitas totais: R$ ${totalRevenue.toLocaleString("pt-BR")}, mudança: ${revenueChange}%`}
          />
        </section>
        <section
          aria-label="Despesas"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <Card
            title="Despesas"
            value={totalExpenses}
            change={expensesChange}
            isLoading={isLoading}
            aria-label={`Despesas totais: R$ ${totalExpenses.toLocaleString("pt-BR")}, mudança: ${expensesChange}%`}
          />
        </section>
        <section
          aria-label="Saldo"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <Card
            title="Saldo"
            value={balance}
            change={revenueChange - expensesChange}
            isLoading={isLoading}
            aria-label={`Saldo: R$ ${balance.toLocaleString("pt-BR")}, mudança: ${revenueChange - expensesChange}%`}
          />
        </section>
        <section
          aria-label="Despesa Média"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <Card
            title="Despesa Média"
            value={averageExpense}
            change={0}
            isLoading={isLoading}
            aria-label={`Despesa Média: R$ ${averageExpense.toLocaleString("pt-BR")}`}
          />
        </section>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <figure
        role="group"
        aria-labelledby="evolucao-title"
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <FinancialEvolutionChart period={selectedPeriod} showBalanceLine />

        <figcaption id="evolucao-title" className="sr-only">
          Gráfico de evolução financeira mostrando receitas, despesas e saldo
          para o período {selectedPeriod}.
        </figcaption>

        {/* Texto para leitores de tela */}
        {data?.charts.evolution.labels.length && (
          <span className="sr-only">
            {data.charts.evolution.labels
              .map((label, idx) => {
                const receita = data.charts.evolution.revenue[idx];
                const despesa = data.charts.evolution.expenses[idx];
                const saldo = receita - despesa;
                return `${label}: Receita R$ ${receita.toLocaleString(
                  "pt-BR",
                )}, Despesa R$ ${despesa.toLocaleString(
                  "pt-BR",
                )}, Saldo R$ ${saldo.toLocaleString("pt-BR")}`;
              })
              .join(". ")}
          </span>
        )}
      </figure>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <figure
          role="group"
          aria-labelledby="expenses-by-category-title"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <ExpensesByCategoryChart period={selectedPeriod} showPercentage />

          <figcaption id="expenses-by-category-title" className="sr-only">
            Gráfico de pizza mostrando despesas por categoria para o período $
            {selectedPeriod}.
          </figcaption>

          {/* Texto para leitores de tela */}
          {data?.charts.expensesByCategory.length && (
            <span className="sr-only">
              {data.charts.expensesByCategory
                .map(
                  (item) =>
                    `${item.category}: R$ ${item.amount.toLocaleString(
                      "pt-BR",
                    )} (${(
                      (item.amount /
                        data.charts.expensesByCategory.reduce(
                          (a, b) => a + b.amount,
                          0,
                        )) *
                      100
                    ).toFixed(1)}%)`,
                )
                .join(", ")}
            </span>
          )}
        </figure>
        <figure
          role="group"
          aria-labelledby="ranking-by-category-title"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <RankingByCategoryChart period={selectedPeriod} />

          <figcaption id="ranking-by-category-title" className="sr-only">
            Gráfico de barras mostrando despesas por categoria para o período $
            {selectedPeriod}.
          </figcaption>

          {/* Texto para leitores de tela */}
          {data?.charts.expensesByCategory.length && (
            <span className="sr-only">
              {data.charts.expensesByCategory
                .map(
                  (item) =>
                    `${item.category}: R$ ${item.amount.toLocaleString(
                      "pt-BR",
                    )} (${(
                      (item.amount /
                        data.charts.expensesByCategory.reduce(
                          (a, b) => a + b.amount,
                          0,
                        )) *
                      100
                    ).toFixed(1)}%)`,
                )
                .join(", ")}
            </span>
          )}
        </figure>
      </div>

      <figure
        role="group"
        aria-labelledby="accumulated-area-chart-title"
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <AccumulatedAreaChart period={selectedPeriod} />

        <figcaption id="accumulated-area-chart-title" className="sr-only">
          Gráfico de área acumulada mostrando a evolução acumulada de receitas e
          despesas ao longo do período ${selectedPeriod}.
        </figcaption>

        {/* Texto para leitores de tela */}
        {data?.charts.evolution.labels.length && (
          <span className="sr-only">
            {data.charts.evolution.labels
              .map((label, idx) => {
                const receita = data.charts.evolution.revenue[idx];
                const despesa = data.charts.evolution.expenses[idx];
                const saldo = receita - despesa;
                return `${label}: Receita R$ ${receita.toLocaleString(
                  "pt-BR",
                )}, Despesa R$ ${despesa.toLocaleString(
                  "pt-BR",
                )}, Saldo R$ ${saldo.toLocaleString("pt-BR")}`;
              })
              .join(". ")}
          </span>
        )}
      </figure>
    </div>
  );
}
