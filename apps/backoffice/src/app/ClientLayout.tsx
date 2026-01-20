"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { TransactionModal } from "@/components/transactionModal/TransactionModal";
import Feedback from "@/components/feedback/Feedback";
import { ThemeBridge } from "@/components/theme/ThemeBridge";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const showExtract =
    !pathname?.includes("/extract") && !pathname?.includes("/dashboard");

  return (
    <>
      <ThemeBridge />
      <Header />

      <div className="flex flex-1 w-full justify-center mt-[64px]">
        <div className="flex flex-col lg:flex-row w-full max-w-[1600px]">
          <Sidebar />

          <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-y-auto gap-10">
            <main className="flex-1 p-4">{children}</main>

            <footer className="p-4 text-center text-sm border-t">
              © 2025 Bytebank - Tech Challenge FIAP
            </footer>
          </div>
        </div>
      </div>

      <Feedback />
      <TransactionModal />

      {/* Preload Angular */}
      <iframe
        src="http://localhost:4200/upload"
        className="hidden"
        title="Preload Upload Component"
        aria-hidden
      />
    </>
  );
}
