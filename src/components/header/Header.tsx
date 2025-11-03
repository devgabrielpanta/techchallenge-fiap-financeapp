"use client";

import { Menu, Sun, Moon } from "lucide-react";
import Logo from "@/images/Logo.png";
import { useUser } from "@/context/UserContext";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { user, setIsMenuOpen } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] z-50 bg-[var(--color-background)]">
      <div className="flex items-center justify-between p-4 mx-auto w-full max-w-[1600px]">
        <div className="flex items-center gap-3">
          {/* Botão Menu do mobile */}
          <button
            className="lg:hidden p-2 rounded-md bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] transition-colors"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <h1 className="font-bold text-xl color-[var(--color-primary)]">
            <img src={Logo.src} alt="Bytebank" className="h-[32px] w-[145px]" />
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-[6px] flex items-center justify-center font-bold bg-[var(--color-primary)] text-[var(--color-white)]">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-[6px]"
            />
          </div>

          {/* Botão de tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors bg-[var(--color-background)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] color-[var(--color-text)] cursor-pointer"
            aria-label="Alternar tema"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
