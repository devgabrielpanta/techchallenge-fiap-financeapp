"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          "Componente Table com header, body, footer, rows e células estilizadas.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table className="border rounded">
      <TableCaption>Exemplo de Tabela</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>João Silva</TableCell>
          <TableCell>joao@email.com</TableCell>
          <TableCell>Ativo</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Maria Souza</TableCell>
          <TableCell>maria@email.com</TableCell>
          <TableCell>Inativo</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total de registros: 2</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
