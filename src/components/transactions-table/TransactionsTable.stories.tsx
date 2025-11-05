import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/Table";
import { Pencil } from "lucide-react";

interface Transaction {
  id: number;
  bank: string;
  transactionType: "Entrada" | "Saída";
  operationType: string;
  amount: number;
  date: string;
}

const data: Transaction[] = [
  {
    id: 1,
    bank: "Banco Santander",
    transactionType: "Entrada",
    operationType: "PIX",
    amount: 120.5,
    date: "04/11/2025",
  },
  {
    id: 2,
    bank: "Nu Pagamentos",
    transactionType: "Saída",
    operationType: "Boleto bancário",
    amount: 200,
    date: "03/11/2025",
  },
  {
    id: 3,
    bank: "Caixa Econômica",
    transactionType: "Entrada",
    operationType: "Crédito",
    amount: 350.75,
    date: "02/11/2025",
  },
];

/* -------------------------------------------
  Fake Component para Storybook
------------------------------------------- */
const TransactionTableStory = () => (
  <Table className="w-full border-collapse text-sm">
    <TableHeader>
      <TableRow className="bg-[#ccdddf]">
        <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
          Banco
        </TableHead>
        <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
          Tipo
        </TableHead>
        <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
          Operação
        </TableHead>
        <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
          Valor
        </TableHead>
        <TableHead className="border-b border-[var(--color-border)] p-2 text-left text-[var(--color-text-muted)]">
          Data
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
          className="hover:bg-[#ccdddf80] cursor-pointer transition-colors"
        >
          <TableCell className="p-2">{row.bank}</TableCell>
          <TableCell className="p-2">{row.transactionType}</TableCell>
          <TableCell className="p-2">{row.operationType}</TableCell>
          <TableCell className="p-2">
            {row.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </TableCell>
          <TableCell className="p-2">{row.date}</TableCell>
          <TableCell className="p-2 relative">
            <div className="absolute top-1/2 right-1/2 -translate-y-1/2 opacity-100 cursor-pointer">
              <Pencil size={16} className="text-blue-500 hover:text-blue-700" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

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
        Componente de tabela para exibir dados de transações financeiras. Este
        story é puramente visual.
      </p>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Quando usar</h2>
        <ul>
          <li>
            Essa tabela exibe todos os tipos de transações realizadas pelo
            usuário.
          </li>
          <li>
            O botão de &quot;Editar&quot; na última coluna abre um modal para
            editar ou excluir uma transação.
          </li>
          <li>
            É possível reordenar as colunas clicando no título/header das
            mesmas.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🔎 Exemplo interativo</h2>
        <p style={{ color: "#555", marginTop: 6 }}>
          Hover na linha e ícone de editar são ilustrativos.
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
          <TransactionTableStory />
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>Este story é apenas ilustrativo, sem lógica real.</li>
          <li>Valores são formatados como moeda BRL.</li>
          <li>
            Datas seguem o formato <code>dd/mm/yyyy</code>.
          </li>
          <li>Ícone de editar e hover são apenas visuais.</li>
        </ul>
      </section>
    </main>
  );
}

const meta: Meta<typeof TransactionTableStory> = {
  title: "Components/Transactions/TransactionTable",
  component: TransactionTableStory,
  parameters: {
    layout: "centered",
    docs: { page: () => <DocsPage /> },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionTable: Story = {
  render: () => <TransactionTableStory />,
};
