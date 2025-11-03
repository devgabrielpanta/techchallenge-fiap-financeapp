import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CoverflowCarousel } from "./Carousel";
import CarouselItem from "./CarouselItem";

const meta = {
  title: "Components/Carousel",
  component: CoverflowCarousel,
  subcomponents: { CarouselItem },
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    background: "light",
  },
  tags: ["!autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CoverflowCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carousel: Story = {
  render: () => <CoverflowCarousel />,
};
