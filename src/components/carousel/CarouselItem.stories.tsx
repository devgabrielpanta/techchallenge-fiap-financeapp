import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import CarouselItem from "./CarouselItem";
import { CreditCard, PiggyBank, DollarSign, Activity } from "lucide-react";

// Ícones usados
const iconMap = {
  CreditCard: <CreditCard size={36} className="text-white" />,
  PiggyBank: <PiggyBank size={36} className="text-white" />,
  DollarSign: <DollarSign size={36} className="text-white" />,
  Activity: <Activity size={36} className="text-white" />,
};

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const codeExample = `
    import CarouselItem from "@/components/carousel/CarouselItem";
    import { CreditCard } from "lucide-react";

    <CarouselItem
      id={1}
      title="Cartão de Crédito"
      description="Gerencie seus gastos."
      icon={<CreditCard size={36} className='text-white' />}
      bg="bg-blue-500"
    />
      `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 900 }}
    >
      <header>
        <h1 style={{ fontSize: 26, marginBottom: 8 }}>
          CarouselItem — Cartão do Carousel
        </h1>
        <p style={{ color: "#555" }}>
          O <strong>CarouselItem</strong> é o componente que representa cada
          cartão individual dentro do <strong>CoverflowCarousel</strong>. Ele
          exibe:
        </p>
        <ul style={{ color: "#555", marginTop: 8 }}>
          <li style={{ listStyle: "none" }}>✅ Ícone (Lucide)</li>
          <li style={{ listStyle: "none" }}>✅ Título</li>
          <li style={{ listStyle: "none" }}>✅ Descrição</li>
          <li style={{ listStyle: "none" }}>✅ Cor de fundo (Tailwind)</li>
        </ul>
      </header>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18 }}>🎛️ Como utilizar</h2>

        <pre
          style={{
            background: "#0f1724",
            color: "#f8fafc",
            padding: 12,
            borderRadius: 6,
            overflowX: "auto",
            marginTop: 10,
          }}
        >
          <code>{codeExample}</code>
        </pre>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18 }}>🎨 Personalização</h2>
        <p style={{ color: "#555", marginTop: 6 }}>Você pode alterar:</p>
        <ul>
          <li>
            <strong>icon</strong> → qualquer ícone do Lucide
          </li>
          <li>
            <strong>bg</strong> → classes Tailwind de cor
          </li>
          <li>
            <strong>title</strong> → texto principal
          </li>
          <li>
            <strong>description</strong> → explicação do card
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18 }}>🔎 Exemplo interativo</h2>
        <p style={{ color: "#555" }}>
          Abaixo está o componente renderizado, com controles editáveis no
          painel lateral.
        </p>

        <div
          style={{
            marginTop: 16,
            padding: 20,
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 8,
            background: "#fff",
            display: "inline-block",
          }}
        >
          <CarouselItem
            id={1}
            title="Cartão de Crédito"
            description="Gerencie seus gastos."
            icon={iconMap.CreditCard}
            bg="bg-blue-500"
          />
        </div>
      </section>
    </main>
  );
}

const meta: Meta<typeof CarouselItem> = {
  title: "Components/Carousel/Item",
  component: CarouselItem,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",

    docs: {
      page: () => <DocsPage />,
    },
  },

  argTypes: {
    id: { control: { type: "number" }, description: "Identificador do item" },
    title: { control: "text", description: "Título exibido" },
    description: { control: "text", description: "Descrição exibida" },

    bg: {
      control: "select",
      options: [
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-orange-500",
        "bg-red-500",
        "bg-teal-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-lime-500",
      ],
      description: "Cor de fundo (classe Tailwind)",
    },

    icon: {
      control: "select",
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: "Ícone exibido (Lucide)",
    },
  },
};

export default meta;

/* -------------------------------------------
  Story principal
------------------------------------------- */
type Story = StoryObj<typeof meta>;

export const Item: Story = {
  name: "Item",
  args: {
    id: 1,
    icon: "CreditCard",
    title: "Cartão de Crédito",
    description: "Controle seus gastos e aproveite benefícios exclusivos.",
    bg: "bg-blue-500",
  },

  render: (args) => (
    <div style={{ padding: 20 }}>
      <CarouselItem
        id={args.id}
        title={args.title}
        description={args.description}
        icon={args.icon}
        bg={args.bg}
      />
    </div>
  ),
};
