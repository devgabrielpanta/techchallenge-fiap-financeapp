import { z } from "zod";

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
  category: z.string(),
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
  category: "",
  type: "saidas",
  operation: "PIX",
  description: "Transação via PIX",
  amount: 100,
  currency: "BRL",
  date: new Date().toISOString().split("T")[0],
};

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>;
export type TransactionType = z.infer<typeof TransactionSchema>;

export const NewCategorySchema = z
  .string()
  .min(3, "A categoria deve ter no mínimo 3 caracteres")
  .max(30, "A categoria deve ter no máximo 30 caracteres")
  .refine((value) => !/\d/.test(value), {
    message: "A categoria não pode conter números",
  })
  .refine((value) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/.test(value), {
    message: "A categoria não pode conter caracteres especiais",
  });

export type NewCategoryType = z.infer<typeof NewCategorySchema>;
