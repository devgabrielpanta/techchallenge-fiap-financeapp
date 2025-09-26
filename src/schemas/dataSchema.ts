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

// BUSINESS UNITS
export const businessUnitsData = ["Custo de vida", "Negócios"] as const;
export const BusinessUnitSchema = z.enum(businessUnitsData);
export type BusinessUnitType = z.infer<typeof BusinessUnitSchema>;

// CATEGORIES
export const categoriesData = [
  { name: "Moradia", businessUnit: "Custo de vida" },
  { name: "Transporte", businessUnit: "Custo de vida" },
  { name: "Alimentação", businessUnit: "Custo de vida" },
  { name: "Receitas", businessUnit: "Negócios" },
  { name: "Custos", businessUnit: "Negócios" },
  { name: "Despesas", businessUnit: "Negócios" },
] as const;

export const CategorySchema = z.object({
  name: z.string(),
  businessUnit: BusinessUnitSchema,
});
export type CategoryType = z.infer<typeof CategorySchema>;

// SUBCATEGORIES
export const subcategoriesData = [
  { name: "Aluguel", category: "Moradia" },
  { name: "Água", category: "Moradia" },
  { name: "Luz", category: "Moradia" },
  { name: "Gasolina", category: "Transporte" },
  { name: "Pedágio", category: "Transporte" },
  { name: "Combustível", category: "Transporte" },
  { name: "Mercado", category: "Alimentação" },
  { name: "Restaurante", category: "Alimentação" },
  { name: "Delivery", category: "Alimentação" },
  { name: "Serviços de programação", category: "Receitas" },
  { name: "Serviços de consultoria", category: "Receitas" },
  { name: "Assinatura de software operacional", category: "Custos" },
  { name: "Infraestrutura de TI", category: "Custos" },
  { name: "Marketing", category: "Despesas" },
  { name: "Assinaturas administrativas", category: "Custos" },
] as const;

export const SubcategorySchema = z.object({
  name: z.string(),
  category: z
    .string()
    .refine((val) => categoriesData.some((cat) => cat.name === val), {
      message: "Categoria inválida",
    }),
});

export type SubcategoryType = z.infer<typeof SubcategorySchema>;

// TRANSACTIONS
export const TransactionSchema = z.object({
  id: z.number(),
  "business-unit": BusinessUnitSchema,
  category: z
    .string()
    .refine((val) => categoriesData.some((cat) => cat.name === val), {
      message: "Categoria inválida",
    }),
  subcategory: z
    .string()
    .refine((val) => subcategoriesData.some((sub) => sub.name === val), {
      message: "Subcategoria inválida",
    }),
  bank: BankSchema,
  type: z.enum(["saidas", "entradas"]),
  operation: OperationSchema,
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  date: z.iso.datetime(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;
