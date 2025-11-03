"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: "Componente Checkbox customizado usando Radix UI e Lucide Icons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Story padrão (unchecked)
export const Default: Story = {
  render: () => <Checkbox />,
};

// Story checked por padrão
export const Checked: Story = {
  render: () => <Checkbox defaultChecked />,
};

// Story disabled
export const Disabled: Story = {
  render: () => <Checkbox disabled />,
};

// Story mostrando vários estados juntos
export const Playground: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id="unchecked" />
        <label htmlFor="unchecked">Unchecked</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checked" defaultChecked />
        <label htmlFor="checked">Checked</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled">Disabled</label>
      </div>
    </div>
  ),
};
