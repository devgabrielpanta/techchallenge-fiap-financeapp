import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import TransactionsFilters from "./TransactionsFilters";
import type { TransactionType } from "@/schemas/dataSchema";

/* -------------------------------------------
  Dados de exemplo
------------------------------------------- */
const transactionsExample: TransactionType[] = [
  {
    id: 1,
    category: "Category 1",
    type: "entradas",
    operation: "PIX",
    description: "Pagamento recebido",
    amount: 120.5,
    currency: "BRL",
    date: "2025-11-04",
  },
  {
    id: 2,
    category: "Category 2",
    type: "saidas",
    operation: "Boleto bancário",
    description: "Compra online",
    amount: 200,
    currency: "BRL",
    date: "2025-11-03",
  },
  {
    id: 3,
    category: "Category 3",
    type: "entradas",
    operation: "Crédito",
    description: "Transferência recebida",
    amount: 350.75,
    currency: "BRL",
    date: "2025-11-02",
  },
];

/* -------------------------------------------
  Fake component para Storybook
------------------------------------------- */
const TransactionsFiltersStory = () => {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState<TransactionType[]>([]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Filtros</Button>
      <TransactionsFilters
        transactions={transactionsExample}
        filteredTransactions={filtered}
        setFilteredTransactions={setFiltered}
        openFilters={open}
        setOpenFilters={setOpen}
      />
    </>
  );
};

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const codeUsage = `
    import TransactionsFilters from "@/components/transactionsFilters/TransactionsFilters";
    import { useState } from "react";

    export default function Example() {
      const [open, setOpen] = useState(false);
      const [filtered, setFiltered] = useState([]);

      return (
        <>
          <button onClick={() => setOpen(true)}>Abrir Filtros</button>
          <TransactionsFilters
            transactions={transactionsExample}
            filteredTransactions={filtered}
            setFilteredTransactions={setFiltered}
            openFilters={open}
            setOpenFilters={setOpen}
          />
        </>
      );
    }
      `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 980 }}
    >
      <h1 style={{ fontSize: 26 }}>Transactions Filters</h1>
      <p style={{ color: "#555", marginTop: 8 }}>
        Esse componente é feito com base no <code>Drawer</code> para filtrar transações por banco, tipo e operação.
      </p>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Quando usar</h2>
        <ul>
          <li>Filtrar listas de transações financeiras rapidamente.</li>
          <li>Permitir múltiplas seleções por tipo, banco ou operação.</li>
          <li>Drawer pode ser aberto/fechado sem sair da tela.</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🧾 Estrutura interna</h2>
        <ul>
          <li>
            <strong>Drawer</strong>: container do filtro.
          </li>
          <li>
            <strong>DrawerHeader</strong>: título e descrição.
          </li>
          <li>
            <strong>Checkboxes</strong>: filtros de banco, tipo e operação.
          </li>
          <li>
            <strong>DrawerFooter</strong>: botão fechar.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🔎 Uso</h2>
        <pre
          style={{
            background: "#0f1724",
            color: "#f8fafc",
            padding: 12,
            borderRadius: 6,
            overflowX: "auto",
          }}
        >
          <code>{codeUsage}</code>
        </pre>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🖥 Exemplo interativo</h2>
        <p style={{ color: "#555", marginTop: 6 }}>
          Clique no botão abaixo para abrir o drawer e visualizar os filtros.
        </p>
        <div
          style={{
            marginTop: 12,
            padding: 16,
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.06)",
            background: "#fff",
          }}
        >
          <TransactionsFiltersStory />
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>
            Este story é puramente visual, não depende de contextos reais.
          </li>
          <li>Checkboxes podem ser clicados, mas não afetam dados reais.</li>
        </ul>
      </section>
    </main>
  );
}

const meta: Meta<typeof TransactionsFiltersStory> = {
  title: "Components/Transactions/TransactionsFilters",
  component: TransactionsFiltersStory,
  parameters: {
    layout: "centered",
    docs: { page: () => <DocsPage /> },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionsFilter: Story = {
  render: () => <TransactionsFiltersStory />,
};
