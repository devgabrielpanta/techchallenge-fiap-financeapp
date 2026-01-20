import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./Header";
import React, { useState, useEffect, createContext, useContext } from "react";

/* ---------------------------------------------------------
  Contexto mockado para o Header (usuário fictício)
--------------------------------------------------------- */
const UserContextMock = createContext({
  user: {
    name: "Usuário Demo",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  setIsMenuOpen: () => console.log("Menu aberto (mock Storybook)"),
});

// Hook que o Header usa — aqui não sobrescrevemos o app real
const useUserMock = () => useContext(UserContextMock);

function UserProviderInjector({ children }: { children: React.ReactNode }) {
  (globalThis as typeof globalThis & { useUser?: typeof useUserMock }).useUser =
    useUserMock;

  return (
    <UserContextMock.Provider
      value={{
        user: {
          name: "Usuário Demo",
          avatar: "https://i.pravatar.cc/100?img=12",
        },
        setIsMenuOpen: () => console.log("Menu abertooo (mock)"),
      }}
    >
      {children}
    </UserContextMock.Provider>
  );
}

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const usageCode = `
    import { Header } from "@/components/layout/Header";

    <Header
      theme="light"
      toggleTheme={() => {}}
    />
      `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 900 }}
    >
      <header>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Header</h1>

        <p style={{ color: "#444" }}>
          O <strong>Header</strong> é o cabeçalho da aplicação. Ele contém:
        </p>

        <ul style={{ marginTop: 8, color: "#444" }}>
          <li style={{ listStyle: "none" }}>✅ Logo da aplicação</li>
          <li style={{ listStyle: "none" }}>✅ Botão de menu no mobile</li>
          <li style={{ listStyle: "none" }}>
            ✅ Avatar do usuário (via contexto <em>mockado no Storybook</em>)
          </li>
          <li style={{ listStyle: "none" }}>
            ✅ Botão de alternância de tema (light/dark)
          </li>
        </ul>
      </header>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20 }}>📌 Como usar</h2>
        <pre
          style={{
            background: "#0f172a",
            color: "white",
            padding: 12,
            borderRadius: 6,
            marginTop: 10,
            overflowX: "auto",
          }}
        >
          <code>{usageCode}</code>
        </pre>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20 }}>🎨 Tema</h2>
        <p style={{ color: "#444" }}>O Header aceita dois temas:</p>

        <ul>
          <li>
            <strong>light</strong> — padrão
          </li>
          <li>
            <strong>dark</strong> — modo escuro
          </li>
        </ul>

        <p style={{ color: "#444" }}>
          A troca de tema é controlada externamente via prop{" "}
          <code>toggleTheme</code>.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20 }}>🔎 Exemplo interativo</h2>
        <p style={{ color: "#444" }}>
          Nos itens do menu você pode testar o Header com seus controles.
        </p>
      </section>
    </main>
  );
}

const meta = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => <DocsPage />,
    },
  },

  decorators: [
    (Story) => (
      <UserProviderInjector>
        <Story />
      </UserProviderInjector>
    ),
  ],

  argTypes: {
    theme: {
      control: "radio",
      options: ["light", "dark"],
      description: "Tema atual exibido no Header",
    },
    toggleTheme: {
      action: "Trocou tema",
      description: "Função acionada ao alternar tema",
    },
  },

  args: {
    theme: "light",
    toggleTheme: () => {},
    setIsMenuOpen: () => {},
  },
} satisfies Meta<typeof Header>;

export default meta;

type ThemeWrapperType = {
  theme: "light" | "dark";
  setIsMenuOpen: () => void;
};

/* ---------------------------------------------------------
 Wrapper para manter controle do tema no Storybook
--------------------------------------------------------- */
function ThemeWrapper({
  args,
  updateArgs,
}: {
  args: Partial<ThemeWrapperType>;
  updateArgs: (patch: Partial<ThemeWrapperType>) => void;
}) {
  const [theme, setTheme] = useState(args.theme);

  useEffect(() => {
    if(args.theme) {
      setTheme(args.theme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(args.theme);
    }
  }, [args.theme]);

  const handleToggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    updateArgs({ theme: next });

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
  };

  return (
    <div className="w-full h-[100px]">
      <Header />
    </div>
  );
}

type Story = StoryObj<typeof meta>;
export const Light: Story = {
  args: {
    theme: "light" as "light" | "dark",
    setIsMenuOpen: () => {},
  } as ThemeWrapperType,
  render: (args, ctx) => (
    <ThemeWrapper args={args} updateArgs={ctx.updateArgs} />
  ),
};

export const Dark: Story = {
  args: {
    theme: "dark" as "light" | "dark",
    setIsMenuOpen: () => {},
  } as ThemeWrapperType,
  render: (args, ctx) => (
    <ThemeWrapper args={args} updateArgs={ctx.updateArgs} />
  ),
};
