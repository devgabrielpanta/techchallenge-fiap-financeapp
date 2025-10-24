"use client";
import { TransactionType } from "@/schemas/dataSchema";
import { createContext, useContext } from "react";
import { useState } from "react";

interface User {
  name: string;
  avatar: string;
  lastName: string;
  date: Date;
  accountBalance: number;
  transactionList: TransactionType[];
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  user: User;
  children: React.ReactNode;
}> = ({ user: initialUser, children }) => {
  const [user, setUser] = useState<User>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
