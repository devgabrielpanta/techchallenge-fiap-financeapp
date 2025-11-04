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

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const codeUsage = `
    import {
      Drawer,
      DrawerTrigger,
      DrawerContent,
      DrawerHeader,
      DrawerFooter,
      DrawerTitle,
      DrawerDescription,
      DrawerClose
    } from "@/components/drawer/Drawer";
    import { Button } from "@/components/ui/button";

    export default function Home() {
      return (
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
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button>Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }
  `.trim();

  const filePath = "src/components/drawer/Drawer.tsx";

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 980 }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>Drawer</h1>
        <p style={{ color: "#555", marginTop: 8 }}>
          O <strong>Drawer</strong> é um painel deslizante que pode aparecer em
          qualquer direção (top, bottom, left, right). Ideal para menus,
          formulários ou conteúdos temporários.
        </p>
      </header>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Quando usar</h2>
        <ul>
          <li>Menus laterais ou modais deslizantes</li>
          <li>Formulários ou painéis temporários</li>
          <li>Conteúdos complementares sem trocar de página</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          🎛️ Configurações internas
        </h2>
        <ul>
          <li>
            <strong>Drawer</strong>: raiz do drawer
          </li>
          <li>
            <strong>DrawerTrigger</strong>: botão que abre o drawer
          </li>
          <li>
            <strong>DrawerContent</strong>: conteúdo do painel
          </li>
          <li>
            <strong>DrawerHeader</strong>, <strong>DrawerTitle</strong>,{" "}
            <strong>DrawerDescription</strong>: topo do drawer
          </li>
          <li>
            <strong>DrawerFooter</strong>: rodapé, geralmente com ações
          </li>
          <li>
            <strong>DrawerClose</strong>: botão para fechar
          </li>
        </ul>
        <div
          style={{
            marginTop: 10,
            padding: 12,
            background: "#f3f3f3",
            borderRadius: 6,
            color: "#8c8c8c97",
          }}
        >
          <strong>Para alterar comportamento:</strong>
          <div style={{ marginTop: 8 }}>
            Edite o arquivo <code>{filePath}</code> e ajuste classes ou
            animações.
          </div>
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🧾 Uso</h2>
        <pre
          style={{
            background: "#0f1724",
            color: "#f8fafc",
            padding: 12,
            borderRadius: 6,
            overflowX: "auto",
          }}
        >
          <code>{codeUsage}</code>
        </pre>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          🔎 Exemplo no Storybook
        </h2>
        <p style={{ color: "#555", marginTop: 6 }}>
          A visualização abaixo é o drawer rodando no contexto do Storybook.
        </p>

        <div
          style={{
            marginTop: 12,
            padding: 16,
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.06)",
            background: "#fff",
          }}
        >
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
                  Você pode colocar formulários, listas ou qualquer componente
                  aqui.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button>Fechar</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>
            Drawer estático para Storybook — não usa lógica de estado real.
          </li>
          <li>
            Para testar diferentes conteúdos, edite o JSX dentro do
            DrawerContent.
          </li>
          <li>
            Suporta qualquer direção via prop <code>direction</code> no
            componente original.
          </li>
        </ul>
      </section>
    </main>
  );
};

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
