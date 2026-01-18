import "./globals.css";
import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { TransactionModal } from "@/components/transactionModal/TransactionModal";
import ReduxProvider from "@/context/ReduxProvider";
import { ReduxHydration } from "@/context/ReduxHydration";
import { getTransactions } from "@/utils/appUtils";
import Feedback from "@/components/feedback/Feedback";

// SSG - Static Site Generation - Gerar o HTML estaticamente em tempo de build
export const metadata = {
  generator: "Next.js",
  applicationName: "Baytebank Backoffice",
  title: "Bytebank",
  description:
    "App de gestão financeira desenvolvido para o Tech Challenge da FIAP.",
  keywords: ["Bytebank", "Tech Challenge", "FIAP", "Gestão Financeira"],
  authors: [
    { name: "David Cristian" },
    { name: "Gabriel Panta" },
    { name: "Henrique Xavier" },
    { name: "Tatiane Entler" },
    { name: "Vinicius Pretti" },
  ],
  openGraph: {
    title: "Bytebank Backoffice",
    description:
      "App de gestão financeira desenvolvido para o Tech Challenge da FIAP.",
    url: "https://github.com/devgabrielpanta/techchallenge-fiap-bytebank",
    siteName: "Bytebank Backoffice",
    locale: "pt-BR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // SSR - Server Side Rendering - Gerar o HTML em tempo de requisição
  const transactions = await getTransactions();

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-[var(--color-background)] color-[var(--color-text)] transition-colors">
        <ReduxProvider>
          <ReduxHydration transactions={transactions} />

          <Header />

          <div className="flex flex-1 w-full justify-center mt-[64px]">
            <div className="flex flex-col lg:flex-row w-full max-w-[1600px]">
              <Sidebar />

              {/* CONTEÚDO PRINCIPAL */}
              <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-y-auto gap-10">
                <main className="flex-1 p-4">{children}</main>

                <footer className="p-4 text-center text-sm color-[var(--color-text-muted)] border-t border-[var(--color-border)]">
                  © 2025 Bytebank - Tech Challenge FIAP
                </footer>
              </div>
            </div>
          </div>
          <Feedback />
          <TransactionModal />

          {/* Iframe oculto para pré-carregar o componente Angular */}
          <iframe
            src="http://localhost:4200/upload"
            className="hidden"
            title="Preload Upload Component"
            aria-hidden="true"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
