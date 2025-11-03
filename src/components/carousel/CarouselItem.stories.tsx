import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import CarouselItem from "./CarouselItem";
import { CreditCard, PiggyBank, DollarSign, Activity } from "lucide-react";

const iconMap = {
  CreditCard: <CreditCard size={36} className="text-white" />,
  PiggyBank: <PiggyBank size={36} className="text-white" />,
  DollarSign: <DollarSign size={36} className="text-white" />,
  Activity: <Activity size={36} className="text-white" />,
};

const meta = {
  title: "Components/Carousel",
  component: CarouselItem,
  parameters: {
    layout: "centered",
  },
  globals: {
    background: "light",
  },
  argTypes: {
    id: {
      control: { type: "number" },
      description: "Identificador do item",
    },
    title: {
      control: { type: "text" },
      description: "Título exibido no cartão",
    },
    description: {
      control: { type: "text" },
      description: "Descrição exibida no cartão",
    },
    bg: {
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
      control: { type: "select" },
      description: "Classe de background (Tailwind) do cartão",
    },
    // use Storybook mapping so we control the existing `icon` prop (no new prop added)
    icon: {
      control: { type: "select" },
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: "Escolha um ícone (será passado para a prop `icon`)",
    },
  },
} satisfies Meta<typeof CarouselItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
  args: {
    id: 1,
    icon: "CreditCard", // this key will be mapped to the actual React node by Storybook
    title: "Cartão de Crédito",
    description: "Controle seus gastos e aproveite benefícios exclusivos.",
    bg: "bg-blue-500",
  },
  render: (args: any) => {
    // args.icon will be the mapped React node because of `mapping` above
    return (
      <div style={{ padding: 20 }}>
        <CarouselItem
          id={args.id}
          icon={args.icon}
          title={args.title}
          description={args.description}
          bg={args.bg}
        />
      </div>
    );
  },
};
