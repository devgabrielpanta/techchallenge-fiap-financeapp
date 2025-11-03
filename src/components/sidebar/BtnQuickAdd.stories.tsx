
import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BtnQuickAdd from "./BtnQuickAdd";
import { TransactionModalProvider } from "@/context/TransactionModalProvider";

const meta: Meta<typeof BtnQuickAdd> = {
  title: "Components/BtnQuickAdd",
  component: BtnQuickAdd,
  decorators: [
    (Story) => (
      <TransactionModalProvider>
        <div style={{ height: "300px", position: "relative" }}>
          <Story />
        </div>
      </TransactionModalProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BtnQuickAdd>;

export const Default: Story = {};
