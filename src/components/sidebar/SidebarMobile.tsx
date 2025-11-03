"use client";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Navigation from "@/components/sidebar/Navigation";
import { useUser } from "@/context/UserContext";
import BtnQuickAdd from "./BtnQuickAdd";

export default function SidebarMobile({ isMenuOpen }: { isMenuOpen: boolean }) {
  const { setIsMenuOpen } = useUser();

  if (!isMenuOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex">
      <div
        className="absolute inset-0 bg-[var(--color-background)]/70 backdrop-blur-[2px]"
        onClick={() => setIsMenuOpen(false)}
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
            onClick={() => setIsMenuOpen(false)}
            className="text-[var(--color-text)] hover:text-[var(--color-primary)]"
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative h-full w-full flex flex-col">
          <Navigation />
          <BtnQuickAdd />
        </div>
      </aside>
    </div>
  );
}
