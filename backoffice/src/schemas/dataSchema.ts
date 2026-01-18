import { z } from "zod";

// BANKS
export const banksData = [
  "Banco Santander S.A.",
  "Nu Pagamentos S.A.",
  "Caixa Econômica Federal",
] as const;
export const BankSchema = z.enum(banksData);
export type BankType = z.infer<typeof BankSchema>;

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
  date: z.iso.date(),
  attachment: z
    .object({
      fileId: z.string(),
      fileName: z.string(),
      fileSize: z.number(),
    })
    .optional(),
});

export const CreateTransactionSchema = TransactionSchema.extend({
  id: z.number().optional(),
});

export const transactionSample: CreateTransactionType = {
  bank: "Banco Santander S.A.",
  type: "saidas",
  operation: "PIX",
  description: "Transação via PIX",
  amount: 100,
  currency: "BRL",
  date: new Date().toISOString().split("T")[0],
};

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>;
export type TransactionType = z.infer<typeof TransactionSchema>;
