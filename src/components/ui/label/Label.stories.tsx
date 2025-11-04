import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Label } from "./Label";

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const codeUsage = `
    import { Label } from "@/components/ui/label/Label";

    <Label htmlFor="input">Nome</Label>
    <input id="input" type="text" />

    <Label htmlFor="checkbox">Aceito os termos</Label>
    <input id="checkbox" type="checkbox" />
      `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 600 }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>Label</h1>
        <p style={{ color: "#555", marginTop: 8 }}>
          O <strong>Label</strong> é usado para associar textos a inputs,
          checkboxes e outros elementos de formulário, garantindo acessibilidade
          e consistência visual.
        </p>
      </header>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Exemplos de uso</h2>
        <ul>
          <li>Inputs de texto</li>
          <li>Checkboxes</li>
          <li>Qualquer elemento interativo que precise de label acessível</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🧾 Código de uso</h2>
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

        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Input de texto */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Label htmlFor="input1" className="text-black">
              Nome
            </Label>
            <input
              id="input1"
              type="text"
              placeholder="Digite seu nome"
              className="p-2 border rounded"
            />
          </div>

          {/* Checkbox */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input id="checkbox1" type="checkbox" />
            <Label htmlFor="checkbox1" className="text-black">
              Aceito os termos
            </Label>
          </div>

          {/* Input de email com estilo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Label htmlFor="input2" className="text-red-500">
              Email
            </Label>
            <input
              id="input2"
              type="email"
              placeholder="Digite seu email"
              className="p-2 border rounded"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

const meta: Meta<typeof Label> = {
  title: "Components/Form/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      page: () => <DocsPage />,
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Nome",
    htmlFor: "input1",
  },
};

export const RedLabel: Story = {
  args: {
    children: "Email",
    htmlFor: "input2",
    className: "text-red-500",
  },
};
