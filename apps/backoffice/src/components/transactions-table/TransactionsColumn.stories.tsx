import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/Table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import type { TransactionType } from "@/schemas/dataSchema";

/* -------------------------------------------
  Dados fictícios iniciais
------------------------------------------- */
const initialData: TransactionType[] = [
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
  TableButton — cabeçalho com ícone de ordenação
------------------------------------------- */
const TableButton: React.FC<{
  span: string;
  onClick?: () => void;
}> = ({ span, onClick }) => (
  <Button
    style={{ padding: 0 }}
    className="font-bold cursor-pointer hover:scale-102 active:scale-102 transition-transform duration-200"
    variant="ghost"
    onClick={onClick}
  >
    {span}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

/* -------------------------------------------
  Componente principal do Story
------------------------------------------- */
const TransactionsTableStory = () => {
  const [data, setData] = useState(initialData);

  /* Simula a reordenação asc/desc ao clicar no cabeçalho */
  const toggleSort = (key: keyof TransactionType) => {
    const sorted = [...data].sort((a, b) => {
      const av = (a as unknown as Record<keyof TransactionType, unknown>)[key];
      const bv = (b as unknown as Record<keyof TransactionType, unknown>)[key];

      if (av == null) return 1;
      if (bv == null) return -1;

      if (typeof av === "number" && typeof bv === "number") {
        return av - bv;
      }

      const asStr = String(av);
      const bsStr = String(bv);
      return asStr.localeCompare(bsStr, "pt-BR", { numeric: true });
    });
    /* Alterna entre ordem crescente e decrescente */
    if (JSON.stringify(data) === JSON.stringify(sorted)) {
      setData(sorted.reverse());
    } else {
      setData(sorted);
    }
  };

  return (
    <Table className="w-full border-collapse text-sm">
      <TableHeader>
        <TableRow className="bg-[var(--color-surface)]">
          <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
            <TableButton
              span="Tipo de pagamento"
              onClick={() => toggleSort("operation")}
            />
          </TableHead>
          <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
            <TableButton
              span="Categoria"
              onClick={() => toggleSort("category")}
            />
          </TableHead>
          <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
            <TableButton span="Valor" onClick={() => toggleSort("amount")} />
          </TableHead>
          <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
            <TableButton span="Data" onClick={() => toggleSort("date")} />
          </TableHead>
          <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            className="hover:bg-[var(--color-hover)] cursor-pointer transition-colors"
          >
            <TableCell className="p-2">{row.operation}</TableCell>
            <TableCell className="p-2">{row.category}</TableCell>
            <TableCell
              className={`p-2 ${
                row.type === "entradas" ? "text-green-500" : "text-red-500"
              }`}
            >
              {row.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell className="p-2">
              {new Date(row.date).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell className="p-2">
              <Pencil
                size={16}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 980 }}
    >
      <h1 style={{ fontSize: 26 }}>Tabela de Transações</h1>
      <p style={{ color: "#555", marginTop: 8 }}>
        Cabeçalhos interativos para ordenação em tabelas.
      </p>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Colunas</h2>
        <ul>
          <li>
            <strong>Tipo de pagamento</strong>: Operação realizada (PIX, Boleto,
            Crédito etc.)
          </li>
          <li>
            <strong>Nome/Instituição</strong>: Banco ou instituição financeira
          </li>
          <li>
            <strong>Valor</strong>: Valores em moeda BRL, verde para entradas e
            vermelho para saídas
          </li>
          <li>
            <strong>Data</strong>: Data da transação no formato{" "}
            <code>dd/mm/yyyy</code>
          </li>
          <li>
            <strong>Ações</strong>: Ícone de editar (simulação visual)
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🔎 Exemplo interativo</h2>
        <p style={{ color: "#555", marginTop: 6 }}>
          Clicar nos cabeçalhos simula a reordenação dos dados. Hover e ícones
          são apenas ilustrativos.
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
          <TransactionsTableStory />
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>É necessário clicar nos cabeçalhos para ordenar.</li>
          <li>Ordenação é simulada localmente no Storybook.</li>
        </ul>
      </section>
    </main>
  );
}

const meta: Meta<typeof TransactionsTableStory> = {
  title: "Components/Transactions/TransactionsColumn",
  component: TransactionsTableStory,
  parameters: {
    layout: "centered",
    docs: { page: () => <DocsPage /> },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionsColumn: Story = {
  render: () => <TransactionsTableStory />,
};
