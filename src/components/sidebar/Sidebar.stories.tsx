import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------
  Links de exemplo no Storybook
--------------------------- */
const exampleLinks = [
  { label: "Home", href: "/" },
  { label: "Extrato", href: "/extract" },
];

/* ---------------------------
  Sidebar estática
--------------------------- */
const SidebarStatic: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  return (
    <>
      {/* Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div className="absolute inset-0 bg-[var(--color-background)]/70 backdrop-blur-[2px]" />
          <aside
            className={cn(
              "relative z-[70] w-[260px] h-full bg-[var(--color-surface)] shadow-xl flex flex-col transform transition-transform duration-300 rounded-r-[var(--radius-md)]"
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] rounded-t-[var(--radius-md)]">
              <h2 className="text-[var(--color-primary)] font-semibold text-lg">
                Menu
              </h2>
              <button
                className="text-[var(--color-text)] hover:text-[var(--color-primary)]"
                aria-label="Fechar menu"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col justify-between h-full">
              <nav className="flex flex-col gap-2 p-4 overflow-y-auto">
                {exampleLinks.map((link) => (
                  <div
                    key={link.href}
                    className={cn(
                      "block px-3 py-2 text-center border-b border-[var(--color-border)]",
                      "text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
                    )}
                  >
                    {link.label}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-[var(--color-border)]">
                <button className="w-full flex items-center justify-center gap-2 p-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded">
                  Nova transação
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:justify-between",
          "sticky top-[64px] h-[calc(100vh-84px)] w-[260px] p-4",
          "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg",
          "rounded-[var(--radius-md)] m-[10px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border)] scrollbar-track-transparent"
        )}
      >
        <nav className="flex flex-col gap-2">
          {exampleLinks.map((link) => (
            <div
              key={link.href}
              className={cn(
                "block px-3 py-2 text-center border-b border-[var(--color-border)]",
                "text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
              )}
            >
              {link.label}
            </div>
          ))}
        </nav>

        <div className="pt-4 border-t border-[var(--color-border)]">
          <button className="w-full flex items-center justify-center gap-2 p-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded">
            Nova transação
          </button>
        </div>
      </aside>
    </>
  );
};

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const usageCode = `
    <Sidebar 
      links={links}
      isOpen={isMenuOpen}
      onClose={() => setIsMenuOpen(false)} 
    />
      `.trim();

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 900 }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Sidebar</h1>
      <p style={{ color: "#444" }}>
        O <strong>Sidebar</strong> exibe links de navegação e um botão de nova
        transação.
      </p>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20 }}>📌 Quando usar</h2>
        <ul style={{ marginTop: 8, color: "#444" }}>
          <li style={{listStyle: "none"}}>✅ Navegação lateral fixa ou mobile</li>
          <li style={{listStyle: "none"}}>✅ Destaque de links ativos</li>
          <li style={{listStyle: "none"}}>✅ Botão de ação rápida (nova transação)</li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20 }}>🧾 Uso</h2>
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
        <h2 style={{ fontSize: 20 }}>🔎 Exemplo no Storybook</h2>
        <p style={{ color: "#444" }}>
          A visualização nos itens do menu lateral mostram a Sidebar no formato
          estático tanto para mobile quanto para desktop.
        </p>
      </section>
    </main>
  );
}

/* ---------------------------
  Meta do Storybook
--------------------------- */
const meta = {
  title: "Layout/Sidebar",
  component: SidebarStatic,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: () => <DocsPage /> },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
          type: "mobile",
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
          type: "desktop",
        },
      },
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof SidebarStatic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  render: (args) => <SidebarStatic {...args} />,
  args: { isOpen: true },
};

export const Desktop: Story = {
  render: (args) => <SidebarStatic {...args} />,
  args: { isOpen: true },
};
