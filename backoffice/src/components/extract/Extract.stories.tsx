import type { Meta } from "@storybook/nextjs-vite";
import React from "react";

/* -------------------------------------------
  Versão static/fake do Extract para Storybook
------------------------------------------- */
export const Extract: React.FC = () => {
  const fakeUser = {
    transactionList: [
      {
        id: 1,
        date: "2025-11-01",
        description: "Compra supermercado",
        amount: 50,
        bank: "Banco Santander S.A." as const,
        type: "saidas" as const,
        operation: "Débito" as const,
        currency: "BRL",
      },
      {
        id: 2,
        date: "2025-11-02",
        description: "Pix recebido",
        amount: 200,
        bank: "Nu Pagamentos S.A." as const,
        type: "entradas" as const,
        operation: "PIX" as const,
        currency: "BRL",
      },
      {
        id: 3,
        date: "2025-10-30",
        description: "Assinatura streaming",
        amount: 30,
        bank: "Caixa Econômica Federal" as const,
        type: "saidas" as const,
        operation: "Débito" as const,
        currency: "BRL",
      },
    ],
  };

  return (
    <aside
      className="w-[350px] bg-gray-900 text-white p-4 rounded-md border border-gray-700"
      style={{
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-white font-semibold">Extrato</h2>
        <span className="text-xs text-gray-400">Últimas transações</span>
      </div>

      <ul className="flex flex-col gap-2">
        {fakeUser.transactionList.map((tx) => (
          <li
            key={tx.id}
            className="flex justify-between flex-col p-2 rounded bg-gray-800"
          >
            <div className="flex justify-between">
              <span className="text-white">{tx.description}</span>
              <span className="text-white">
                {tx.currency} {tx.amount}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{tx.bank}</span>
              <span>{tx.operation}</span>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 rounded p-2"
        onClick={() => {}}
      >
        Ver todas
      </button>
    </aside>
  );
};

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const codeUsage = `
    import { Extract } from "@/components/extract/Extract";

    export default function Home() {
      return <Extract />;
    }
  `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 980 }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>Extract</h1>
        <p style={{ color: "#555", marginTop: 8 }}>
          O <strong>Extract</strong> mostra as últimas transações do usuário em
          um painel lateral. Ideal para exibir informações financeiras
          resumidas, com visualização light/dark mode.
        </p>
      </header>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Quando usar</h2>
        <ul>
          <li>Exibir últimas transações do usuário</li>
          <li>Painel lateral fixo em dashboards financeiros</li>
          <li>Visualizar movimentações rapidamente sem abrir outra página</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🧾 Uso</h2>
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
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          🔎 Exemplo no Storybook
        </h2>
        <p style={{ color: "#555", marginTop: 6 }}>
          A visualização abaixo é o componente rodando no contexto do Storybook.
        </p>

        <div
          style={{
            marginTop: 12,
            padding: 16,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#111827",
          }}
        >
          <Extract />
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>
            Componente totalmente estático para Storybook — não usa hooks ou
            providers.
          </li>
          <li>
            Transações exibidas são mockadas em{" "}
            <code>fakeUser.transactionList</code>.
          </li>
          <li>
            Para testar outros dados, basta editar a lista dentro do componente.
          </li>
        </ul>
      </section>
    </main>
  );
}

const meta = {
  title: "Components/Extract",
  component: Extract,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => <DocsPage />,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Extract>;

export default meta;
