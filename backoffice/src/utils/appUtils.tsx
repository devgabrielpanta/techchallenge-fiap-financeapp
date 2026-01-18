import { transactionList } from "@/utils/transactionsData";
import { TransactionType } from "@/schemas/dataSchema";

export interface User {
  name: string;
  avatar: string;
  lastName: string;
  date: Date;
  accountBalance: number;
  transactionList: TransactionType[];
}

export const user: User = {
  name: "Joana",
  lastName: "Silva",
  avatar: "https://i.pravatar.cc/150?img=47",
  date: new Date(),
  accountBalance: 2500,
  transactionList: transactionList,
};

export async function getTransactions(): Promise<TransactionType[]> {
  // Simula uma chamada assíncrona, como uma requisição a uma API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactionList);
    }, 100); // Simula um atraso de 100ms
  });
}