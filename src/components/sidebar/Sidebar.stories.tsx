import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sidebar } from "@/components/sidebar/Sidebar";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  subcomponents: { SidebarDesktop, SidebarMobile },
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    background: "light",
  },
  tags: ["!autodocs"],
  argTypes: {
    variant: {
      options: ["desktop", "mobile"],
      control: { type: "select" },
      description: "Tipo de sidebar a ser exibida.",
      defaultValue: "desktop",
    },
  },
  args: { variant: "desktop" },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    variant: "desktop",
  },
};

export const Mobile: Story = {
  args: {
    variant: "mobile",
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => {
    return (
      <div className="relative h-screen min-h-screen w-[375px] bg-[var(--color-background)]">
        <SidebarMobile isMenuOpen={true} />
      </div>
    );
  },
};
