import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import type { TransactionType } from "@/schemas/dataSchema";

/* -------------------------------------------
  Versão static/fake do ExtractCard para Storybook
------------------------------------------- */
export const ExtractCardStatic: React.FC<{ transaction: TransactionType }> = ({
  transaction,
}) => {
  const isEntrada = transaction.type === "entradas";
  const color = isEntrada ? "text-green-400" : "text-red-400";

  return (
    <div className={`p-3 rounded bg-gray-800 flex flex-col gap-1 w-72`}>
      <div className="flex justify-between">
        <span>{transaction.description}</span>
        <span className={color}>
          {transaction.currency ?? `R$ ${transaction.amount}`}
        </span>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{transaction.bank}</span>
        <span>{transaction.operation}</span>
      </div>
    </div>
  );
};

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const codeUsage = `
    import { ExtractCardStatic } from "@/components/extract/ExtractCard";

    const transaction = {
      id: 1,
      bank: "Nu Pagamentos S.A.",
      operation: "PIX",
      type: "entradas",
      amount: 2500,
      date: "2024-10-01",
      description: "Arroz",
      currency: "R$ 150,00",
    };

    export default function Home() {
      return <ExtractCard transaction={transaction} />;
    }
  `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 980 }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>ExtractCard</h1>
        <p style={{ color: "#555", marginTop: 8 }}>
          O <strong>ExtractCard</strong> representa uma transação bancária,
          mostrando descrição, valor, banco e operação. Ideal para listar dentro
          do componente <strong>Extract</strong>.
        </p>
      </header>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Quando usar</h2>
        <ul>
          <li>Exibir transações individuais em uma lista</li>
          <li>Diferenciar entradas (verde) e saídas (vermelho)</li>
          <li>Visualização de informações resumidas da transação</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          🎛️ Configurações internas
        </h2>
        <ul>
          <li>
            <strong>transaction</strong>: objeto do tipo{" "}
            <code>TransactionType</code>
          </li>
          <li>
            Entradas: verde (<code>type === &quot;entradas&quot;</code>)
          </li>
          <li>
            Saídas: vermelho (<code>type === &quot;saidas&quot;</code>)
          </li>
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
          A visualização abaixo mostra o componente com exemplos de entrada e
          saída.
        </p>

        <div
          style={{
            marginTop: 12,
            padding: 16,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#111827",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <ExtractCardStatic
            transaction={{
              id: 1,
              bank: "Nu Pagamentos S.A.",
              operation: "PIX",
              type: "entradas",
              amount: 2500,
              date: "2024-10-01",
              description: "Arroz",
              currency: "R$ 150,00",
            }}
          />
          <ExtractCardStatic
            transaction={{
              id: 2,
              bank: "Banco Santander S.A.",
              operation: "Débito",
              type: "saidas",
              amount: 150,
              date: "2024-10-02",
              description: "Mercado",
              currency: "R$ 150,00",
            }}
          />
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>
            Componente estático para Storybook — não usa hooks ou providers.
          </li>
          <li>
            Para testar outros dados, basta alterar os objetos de transação.
          </li>
          <li>Entradas são verdes, saídas são vermelhas.</li>
        </ul>
      </section>
    </main>
  );
}

const meta: Meta<typeof ExtractCardStatic> = {
  title: "Components/Extract/ExtractCard",
  component: ExtractCardStatic,
  parameters: {
    layout: "centered",
    docs: {
      page: () => <DocsPage />,
    },
  },
  tags: ["autodocs"],
  excludeStories: ["ExtractCardStatic"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Entrada: Story = {
  args: {
    transaction: {
      id: 1,
      bank: "Nu Pagamentos S.A.",
      operation: "PIX",
      type: "entradas",
      amount: 2500,
      date: "2024-10-01",
      description: "Arroz",
      currency: "R$ 150,00",
    },
  },
};

export const Saida: Story = {
  args: {
    transaction: {
      id: 2,
      bank: "Banco Santander S.A.",
      operation: "Débito",
      type: "saidas",
      amount: 150,
      date: "2024-10-02",
      description: "Mercado",
      currency: "R$ 150,00",
    },
  },
};
