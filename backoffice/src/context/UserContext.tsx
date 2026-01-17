"use client";
import { createContext, useContext } from "react";
import { useState } from "react";
import type { User } from "@/utils/appUtils";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  user: User;
  children: React.ReactNode;
}> = ({ user: initialUser, children }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ user, setUser, isMenuOpen, setIsMenuOpen }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
