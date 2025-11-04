import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./Table";

const fakeData = [
  { name: "Maria", age: 25, city: "São Paulo" },
  { name: "João", age: 30, city: "Rio de Janeiro" },
  { name: "Ana", age: 22, city: "Belo Horizonte" },
];

/* -------------------------------------------
  Custom Docs Page
------------------------------------------- */
function DocsPage() {
  const codeUsage = `
    import {
      Table,
      TableHeader,
      TableBody,
      TableFooter,
      TableRow,
      TableHead,
      TableCell,
      TableCaption
    } from "@/components/ui/table/Table";

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Idade</TableHead>
          <TableHead>Cidade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>João</TableCell>
          <TableCell>30</TableCell>
          <TableCell>São Paulo</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Maria</TableCell>
          <TableCell>25</TableCell>
          <TableCell>Rio de Janeiro</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>2</TableCell>
          <TableCell>-</TableCell>
        </TableRow>
      </TableFooter>
      <TableCaption>Exemplo de tabela estática</TableCaption>
    </Table>
      `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 900 }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>Table</h1>
        <p style={{ color: "#555", marginTop: 8 }}>
          O componente <strong>Table</strong> permite exibir dados em grade, com
          suporte a cabeçalho, corpo, rodapé, linhas e células. É totalmente
          estilizável, acessível e responsivo.
        </p>
      </header>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>📌 Estrutura</h2>
        <p style={{ color: "#555" }}>
          A tabela é composta pelos seguintes slots:
        </p>
        <ul style={{ marginTop: 8 }}>
          <li>
            <strong>TableHeader</strong>: define o cabeçalho da tabela.
          </li>
          <li>
            <strong>TableBody</strong>: contém as linhas de dados.
          </li>
          <li>
            <strong>TableFooter</strong>: opcional, usado para totais ou
            sumários.
          </li>
          <li>
            <strong>TableRow</strong>: representa cada linha.
          </li>
          <li>
            <strong>TableHead</strong>: célula de cabeçalho.
          </li>
          <li>
            <strong>TableCell</strong>: célula de dados.
          </li>
          <li>
            <strong>TableCaption</strong>: descrição da tabela, opcional.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>✅ Quando usar</h2>
        <ul style={{ marginTop: 8 }}>
          <li>Exibir listas de dados tabulares.</li>
          <li>Mostrar informações resumidas em dashboards.</li>
          <li>Apresentar relatórios com cabeçalhos, corpo e rodapé.</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>🧾 Uso</h2>
        <p style={{ color: "#555", marginBottom: 6 }}>
          Exemplo de implementação:
        </p>
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
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>
          🔎 Exemplo no Storybook
        </h2>
        <p style={{ color: "#555", marginTop: 6 }}>
          A tabela abaixo é estática, apenas para visualização do layout e
          estilos.
        </p>

        <div
          style={{
            marginTop: 12,
            padding: 16,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#1e293b",
            color: "#f8fafc",
          }}
        >
          <Table className="w-full text-white rounded-md bg-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Cidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>João</TableCell>
                <TableCell>30</TableCell>
                <TableCell>São Paulo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maria</TableCell>
                <TableCell>25</TableCell>
                <TableCell>Rio de Janeiro</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>2</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableFooter>
            <TableCaption className="text-gray-300">
              Exemplo de tabela estática no Storybook
            </TableCaption>
          </Table>
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>Componente totalmente estático para Storybook.</li>
          <li>
            É possível estilizar cada slot individualmente via{" "}
            <code>className</code>.
          </li>
          <li>Ideal para dashboards, listas e relatórios.</li>
        </ul>
      </section>
    </main>
  );
}

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => <DocsPage />,
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Idade</TableHead>
          <TableHead>Cidade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fakeData.map((row, index) => (
          <TableRow
            key={row.name}
            className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
          >
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.age}</TableCell>
            <TableCell>{row.city}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
