import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Checkbox } from "./Checkbox";

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const usageCode = `
    import { Checkbox } from "@/components/ui/Checkbox";

    <Checkbox defaultChecked /> 
    <Checkbox /> 
    <Checkbox disabled /> 
      `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 900 }}
    >
      <header>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Checkbox</h1>
        <p style={{ color: "#444" }}>
          O <strong>Checkbox</strong> é um componente de seleção binária
          (marcado/desmarcado) baseado em Radix UI. Ele suporta estados:
        </p>
        <ul style={{ marginTop: 8, color: "#444" }}>
          <li style={{ listStyle: "none" }}>✅ Marcado / Desmarcado</li>
          <li style={{ listStyle: "none" }}>✅ Estado desabilitado</li>
          <li style={{ listStyle: "none" }}>✅ Indicador com ícone (CheckIcon)</li>
          <li style={{ listStyle: "none" }}>
            ✅ Classes Tailwind customizáveis via <code>className</code>
          </li>
        </ul>
      </header>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20 }}>📌 Como usar</h2>
        <pre
          style={{
            background: "#0f172a",
            color: "white",
            padding: 12,
            borderRadius: 6,
            marginTop: 10,
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          <code>{usageCode}</code>
        </pre>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20 }}>🔎 Exemplos Interativos</h2>
        <p style={{ color: "#444" }}>
          No menu lateral você pode testar o Checkbox com diferentes estados.
        </p>
      </section>
    </main>
  );
}

/* ---------------------------------------------------------
 ✅ Configuração do Storybook
--------------------------------------------------------- */
const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: () => <DocsPage />,
    },
  },
  argTypes: {
    disabled: { control: "boolean", description: "Desabilita o checkbox" },
    defaultChecked: {
      control: "boolean",
      description: "Define o estado inicial marcado",
    },
    className: { control: "text", description: "Classes Tailwind adicionais" },
    onCheckedChange: {
      action: "mudou estado",
      description: "Callback ao alterar o estado",
    },
  },
  args: {
    disabled: false,
    defaultChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------
 ✅ Stories interativos
--------------------------------------------------------- */
export const Default: Story = {
  name: "Padrão",
  args: {},
};

export const Checked: Story = {
  name: "Marcado",
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  name: "Desabilitado",
  args: { disabled: true },
};

export const CheckedDisabled: Story = {
  name: "Marcado e Desabilitado",
  args: { defaultChecked: true, disabled: true },
};
