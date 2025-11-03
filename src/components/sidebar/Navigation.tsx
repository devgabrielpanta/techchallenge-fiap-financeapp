"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const links = [
  { label: "Início", href: "/" },
  { label: "Extrato", href: "/extract" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const router = typeof window !== "undefined" ? useRouter() : null;

  const { setIsMenuOpen } = useUser();

  return (
    <nav className="flex flex-col gap-2 md:p-4 md:overflow-y-auto">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={() => {
            router && router.push(link.href);
            setIsMenuOpen(false);
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
  );
}
