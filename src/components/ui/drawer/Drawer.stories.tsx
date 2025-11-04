import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Button } from "@/components/ui/button/Button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./Drawer";
import { Button } from "../button/Button"; // Supondo que você tenha um Button

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: { page: () => <DocsPage /> },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DrawerExample: Story = {
  args: {} as never,
  render: () => (
    <Drawer>
      <DrawerTrigger>
        <Button>Abrir Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Exemplo de Drawer</DrawerTitle>
          <DrawerDescription>Conteúdo do Drawer</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Corpo principal do Drawer.</p>
          <p>
            Você pode colocar formulários, listas ou qualquer componente aqui.
          </p>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button>Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
