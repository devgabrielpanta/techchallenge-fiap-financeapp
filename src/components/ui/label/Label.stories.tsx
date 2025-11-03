"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Label } from "./label";
import { Checkbox } from "../checkbox/checkbox"; // Caso queira mostrar junto com um checkbox

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    docs: {
      description: {
        component: "Componente Label usando Radix UI, estilizado e acessível.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// Story padrão
export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="input-1">Label para input</Label>
      <input
        id="input-1"
        type="text"
        placeholder="Digite algo..."
        className="border p-2 rounded"
      />

      <Label htmlFor="checkbox-1" className="mt-4">
        <Checkbox id="checkbox-1" />
        Label para checkbox
      </Label>
    </div>
  ),
};
