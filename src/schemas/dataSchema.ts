import { z } from "zod";

// BANKS
export const banksData = [
  "Banco Santander S.A.",
  "Nu Pagamentos S.A.",
  "Caixa Econômica Federal",
] as const;
export const BankSchema = z.enum(banksData);
export type BankType = z.infer<typeof banksData>;

// OPERATIONS
export const operationsData = [
  "PIX",
  "Boleto bancário",
  "Débito",
  "Crédito",
  "Transferência",
] as const;
export const OperationSchema = z.enum(operationsData);
export type OperationType = z.infer<typeof OperationSchema>;

// TRANSACTIONS
export const TransactionSchema = z.object({
  id: z.number(),
  bank: BankSchema,
  type: z.enum(["saidas", "entradas"]),
  operation: OperationSchema,
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  date: z.iso.datetime(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;
