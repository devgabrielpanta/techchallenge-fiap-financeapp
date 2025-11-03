"use client";
import { cn } from "@/lib/utils";
import Navigation from "@/components/sidebar/Navigation";
import BtnQuickAdd from "./BtnQuickAdd";

export default function SidebarDesktop() {
  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:justify-between",
        "sticky top-[64px] h-[calc(100vh-84px)] w-[260px] p-4",
        "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg",
        "rounded-[var(--radius-md)] m-[10px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border)] scrollbar-track-transparent"
      )}
    >
      <Navigation />
      <BtnQuickAdd />
    </aside>
  );
}
