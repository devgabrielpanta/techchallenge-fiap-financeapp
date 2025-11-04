import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Button } from "./Button";

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const usageCode = `
    import { Button } from "@/components/ui/Button";

    <Button>Botão Primário</Button>
    <Button variant="secondary">Botão Secundário</Button>
    <Button variant="danger">Botão de Alerta</Button>
    <Button variant="outline">Botão Outline</Button>
    <Button variant="ghost">Botão Ghost</Button>
      `.trim();

  const customizationCode = `
    <Button variant="primary" size="sm" className="extra-class">Pequeno</Button>
    <Button variant="secondary" size="md">Médio</Button>
    <Button variant="danger" size="lg">Grande</Button>
      `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 900 }}
    >
      <header>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Button</h1>
        <p style={{ color: "#444" }}>
          O <strong>Button</strong> é um componente reutilizável para ações de
          interface. <br />
          Ele suporta:
        </p>
        <ul style={{ marginTop: 8, color: "#444" }}>
          <li style={{ listStyle: "none" }}>
            ✅ Variantes visuais: primary, secondary, danger, outline, ghost
          </li>
          <li style={{ listStyle: "none" }}>✅ Tamanhos: sm, md, lg</li>
          <li style={{ listStyle: "none" }}>
            ✅ Estados de hover, focus e disabled
          </li>
          <li style={{ listStyle: "none" }}>
            ✅ Classes Tailwind adicionais via <code>className</code>
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
        <h2 style={{ fontSize: 20 }}>🎨 Customização</h2>
        <p style={{ color: "#444" }}>
          Você pode alterar <strong>variant</strong>, <strong>size</strong>,{" "}
          <strong>className</strong> e <strong>children</strong>:
        </p>
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
          <code>{customizationCode}</code>
        </pre>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20 }}>🔎 Exemplos Interativos</h2>
        <p style={{ color: "#444" }}>
          Nos itens do menu lateral você pode testar diferentes variantes e
          tamanhos do botão.
        </p>
      </section>
    </main>
  );
}

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: () => <DocsPage />,
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "outline", "ghost"],
      description: "Estilo visual do botão",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do botão",
    },
    children: {
      control: "text",
      description: "Conteúdo exibido dentro do botão",
    },
    disabled: {
      control: "boolean",
      description: "Desativa o botão",
    },
    className: {
      control: "text",
      description: "Classes adicionais TailwindCSS",
    },
    onClick: {
      action: "clicado",
      description: "Callback disparado ao clicar no botão",
    },
  },
  args: {
    children: "Clique Aqui",
    variant: "primary",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Primary",
  args: { variant: "primary", children: "Primário" },
};

export const Secondary: Story = {
  name: "Secondary",
  args: { variant: "secondary", children: "Secundário" },
};

export const Danger: Story = {
  name: "Danger",
  args: { variant: "danger", children: "Perigo" },
};

export const Outline: Story = {
  name: "Outline",
  args: { variant: "outline", children: "Outline" },
};

export const Ghost: Story = {
  name: "Ghost",
  args: { variant: "ghost", children: "Ghost" },
};

export const Sizes: Story = {
  name: "Tamanhos",
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} size="sm">
        Pequeno
      </Button>
      <Button {...args} size="md">
        Médio
      </Button>
      <Button {...args} size="lg">
        Grande
      </Button>
    </div>
  ),
};
