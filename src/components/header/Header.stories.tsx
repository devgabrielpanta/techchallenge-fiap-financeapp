import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./Header";
import { useState, useEffect } from "react";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    background: "light",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      options: ["light", "dark"],
      control: { type: "radio" },
      description: "Tema atual da aplicação (light ou dark mode)",
      defaultValue: "light",
    },
    toggleTheme: {
      action: "Theme toggled",
      description: "Função controladora do tema da aplicação",
    },
  },
  args: { theme: "light", toggleTheme: () => {} },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

function ThemeWrapper({
  args,
  updateArgs,
}: {
  args: any;
  updateArgs: (patch: Partial<typeof args>) => void;
}) {
  const initial = (args.theme as "light" | "dark") ?? "light";
  const [theme, setTheme] = useState<"light" | "dark">(initial);

  useEffect(() => {
    setTheme((args.theme as "light" | "dark") ?? "light");
  }, [args.theme]);

  const handleToggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    updateArgs({ theme: next });
  };

  return (
    <div className={`w-full h-30 ${theme}`}>
      <Header {...args} theme={theme} toggleTheme={handleToggle} />
    </div>
  );
}

export const Light: Story = {
  args: { theme: "light" },
  render: (args, context) => (
    <ThemeWrapper args={args} updateArgs={context.updateArgs} />
  ),
};

export const Dark: Story = {
  args: { theme: "dark" },
  render: (args, context) => (
    <ThemeWrapper args={args} updateArgs={context.updateArgs} />
  ),
};
