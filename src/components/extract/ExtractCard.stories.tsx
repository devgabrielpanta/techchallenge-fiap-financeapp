import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { TransactionType } from "@/schemas/dataSchema";
import ExtractCard from "./ExtractCard";

const mockTransaction: TransactionType = {
  id: 1,
  bank: "Nu Pagamentos S.A.",
  operation: "PIX",
  type: "entradas",
  amount: 2500,
  date: new Date("2024-10-01").toISOString(),
  description: "arroz",
  currency: "R$ 150,00",
};

const meta: Meta<typeof ExtractCard> = {
  title: "Components/ExtractCard",
  component: ExtractCard,
  tags: ["!autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    transaction: {
      description: "Objeto que representa uma transação bancária.",
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExtractCard>;

export const Entrada: Story = {
  args: {
    transaction: {
      ...mockTransaction,
      type: "entradas",
      amount: 2500,
      operation: "PIX",
    },
  },
};

export const Saida: Story = {
  args: {
    transaction: {
      ...mockTransaction,
      type: "saidas",
      amount: 150,
      operation: "PIX",
    },
  },
};
