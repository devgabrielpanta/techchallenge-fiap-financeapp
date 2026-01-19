import "./globals.css";
import { ReactNode } from "react";
import ReduxProvider from "@/context/ReduxProvider";
import { ReduxHydration } from "@/context/ReduxHydration";
import { getTransactions } from "@/utils/appUtils";
import ClientLayout from "./ClientLayout";

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
    <html lang="pt-BR" className="light">
      <body className="min-h-screen flex flex-col bg-[var(--color-background)] color-[var(--color-text)] transition-colors">
        <ReduxProvider>
          <ReduxHydration transactions={transactions} />
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
