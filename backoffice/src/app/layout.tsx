"use client";

import "./globals.css";
import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { Extract } from "@/components/extract/Extract";
import { UserProvider } from "@/context/UserContext";
import { TransactionModalProvider } from "@/context/TransactionModalProvider";
import { TransactionModal } from "@/components/transactionModal/TransactionModal";
import { usePathname } from "next/navigation";
import { user } from "@/utils/appUtils";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const showExtract =
    !pathname?.includes("/extract") && !pathname?.includes("/dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { label: "Início", href: "/" },
    { label: "Extrato", href: "/extract" },
    { label: "Upload", href: "/upload" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  // Aplica o tema
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <html lang="pt-BR" className="light">
      <body className="min-h-screen flex flex-col bg-[var(--color-background)] color-[var(--color-text)] transition-colors">
        <UserProvider user={user}>
          <TransactionModalProvider>
            <Header
              theme={theme}
              toggleTheme={toggleTheme}
              setIsMenuOpen={setIsMenuOpen}
            />

            <div className="flex flex-1 w-full justify-center mt-[64px]">
              <div className="flex flex-col lg:flex-row w-full max-w-[1600px]">
                <Sidebar
                  links={links}
                  isOpen={isMenuOpen}
                  onClose={() => setIsMenuOpen(false)}
                />

                {/* CONTEÚDO PRINCIPAL */}
                <div className="flex-1 flex flex-col h-[calc(100vh-64px)] min-h-0">
                  <main className="flex-1 min-h-0 p-4 overflow-y-auto">
                    {children}
                  </main>

                  {/* EXTRATO - MOBILE */}
                  {showExtract && (
                    <div className="block lg:hidden px-4 mb-6">
                      <Extract />
                    </div>
                  )}

                  <footer className="p-4 text-center text-sm color-[var(--color-text-muted)] border-t border-[var(--color-border)]">
                    © 2025 Bytebank - Tech Challenge FIAP
                  </footer>
                </div>

                {/* EXTRATO - DESKTOP */}
                {showExtract && (
                  <div className="hidden lg:block">
                    <Extract />
                  </div>
                )}
              </div>
            </div>
            <TransactionModal />
          </TransactionModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
