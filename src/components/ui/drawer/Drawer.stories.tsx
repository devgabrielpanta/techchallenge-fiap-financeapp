"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer";
import { Button } from "../button/Button"; // Supondo que você tenha um Button

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component:
          "Componente Drawer customizado usando Vaul, com overlay, cabeçalho e rodapé.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Story padrão
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Example</DrawerTitle>
          <DrawerDescription>
            Esse é um exemplo de Drawer para Storybook.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4">
          <p>Conteúdo do drawer aqui...</p>
          <p>Mais conteúdo para testar scroll se necessário.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
