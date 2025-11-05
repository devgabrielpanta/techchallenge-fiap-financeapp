import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { X } from "lucide-react";

/* -------------------------------------------
  Componente Fake para Storybook
------------------------------------------- */
const TransactionModalFake = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div
            className="bg-white rounded-md w-full max-w-md p-6 relative shadow-lg z-50"
            style={{ backgroundColor: "white" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-lg font-semibold mb-2 text-black">
              Nova Transação
            </h2>
            <p className="text-gray-700">
              Modal estático para Storybook com fundo sólido.
            </p>

            {/* Corpo */}
            <div className="flex flex-col gap-4 mt-4">
              <p>Conteúdo do modal claramente legível.</p>
              <p>
                Você pode colocar campos, botões ou qualquer componente aqui.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={() => setIsOpen(false)}>Fechar</Button>
              <Button variant="primary">Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const codeUsage = `
    import { TransactionModal } from "@/components/transactionModal/TransactionModal";

    export default function Home() {
    return <TransactionModal />;
    }
    `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 980 }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>Transaction Modal</h1>
        <p style={{ color: "#555", marginTop: 8 }}>
          Modal para criar ou editar transações financeiras. Permite edição de
          dados, seleção de banco, tipo de operação e valor.
        </p>
      </header>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Quando usar</h2>
        <ul>
          <li>Adicionar nova transação rapidamente sem sair da página.</li>
          <li>Editar transações existentes.</li>
          <li>Exibir informações temporárias em um modal legível.</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🎛️ Estrutura interna</h2>
        <ul>
          <li>
            <strong>ModalContainer</strong>: div principal com fundo sólido e
            sombra.
          </li>
          <li>
            <strong>Header</strong>: título e botão fechar (<code>X</code>).
          </li>
          <li>
            <strong>Body</strong>: campos, textos e componentes.
          </li>
          <li>
            <strong>Footer</strong>: botões de ação (Salvar, Fechar).
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
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🔎 Exemplo interativo</h2>
        <p style={{ color: "#555", marginTop: 6 }}>
          Clique no botão abaixo para abrir o modal e visualizar seu conteúdo.
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
          <TransactionModalFake />
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>
            Esta versão é estática para Storybook, não depende de contextos
            reais.
          </li>
          <li>É possível colocar formulário dentro do modal.</li>
          <li>
            Para testar comportamento real, use o modal dentro do contexto{" "}
            <code>UserProvider</code>.
          </li>
        </ul>
      </section>
    </main>
  );
}

const meta: Meta<typeof TransactionModalFake> = {
  title: "Components/Transactions/TransactionModal",
  component: TransactionModalFake,
  parameters: {
    layout: "centered",
    docs: { page: () => <DocsPage /> },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionModal: Story = {
  render: () => <TransactionModalFake />,
};
