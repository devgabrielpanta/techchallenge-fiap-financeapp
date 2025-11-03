"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, CirclePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransactionModal } from "@/context/TransactionModalProvider";
import { useRouter } from "next/navigation";

interface SidebarProps {
  links: { label: string; href: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ links, isOpen, onClose }) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const { startCreateTransaction } = useTransactionModal();
  const router = useRouter();

  return (
    <>
      {/* Sidebar Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div
            className="absolute inset-0 bg-[var(--color-background)]/70 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <aside
            className={cn(
              "relative z-[70] w-[260px] h-full bg-[var(--color-surface)] shadow-xl flex flex-col transform transition-transform duration-300 rounded-r-[var(--radius-md)]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] rounded-t-[var(--radius-md)]">
              <h2 className="text-[var(--color-primary)] font-semibold text-lg">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="text-[var(--color-text)] hover:text-[var(--color-primary)]"
                aria-label="Fechar menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="h-full w-full flex flex-col">
              {/* Navegação */}
              <nav className="flex flex-col gap-2 p-4 overflow-y-auto">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      router.push(link.href);
                      onClose();
                    }}
                    className={cn(
                      "block px-3 py-2 text-center transition-colors border-b border-[var(--color-border)] cursor-pointer",
                      isActive(link.href)
                        ? "text-[var(--color-secondary)] font-semibold"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Botão Nova Transação */}
              <div className="p-4 border-t border-[var(--color-border)] fixed bottom-0 w-[260px]">
                <Button
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={startCreateTransaction}
                >
                  <CirclePlus size={18} /> Nova transação
                </Button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Sidebar Desktop */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:justify-between",
          "sticky top-[64px] h-[calc(100vh-84px)] w-[260px] p-4",
          "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg",
          "rounded-[var(--radius-md)] m-[10px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border)] scrollbar-track-transparent"
        )}
      >
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              onClick={() => router.push(link.href)}
              className={cn(
                "block px-3 py-2 text-center transition-colors border-b border-[var(--color-border)] cursor-pointer",
                isActive(link.href)
                  ? "text-[var(--color-secondary)] font-semibold"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="pt-4 border-t border-[var(--color-border)]">
          <Button
            variant="primary"
            className="w-full flex items-center justify-center gap-2"
            onClick={startCreateTransaction}
          >
            <CirclePlus size={18} /> Nova transação
          </Button>
        </div>
      </aside>
    </>
  );
};
